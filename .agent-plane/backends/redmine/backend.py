from __future__ import annotations

import difflib
import hashlib
import importlib.util
import json
import os
import re
import secrets
import sys
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import TYPE_CHECKING, cast
from urllib import error as urlerror
from urllib import parse as urlparse
from urllib import request as urlrequest

if TYPE_CHECKING:
    from types import ModuleType

JsonDict = dict[str, object]
TaskRecord = dict[str, object]
TaskList = list[TaskRecord]


def _ensure_task_list(value: object, *, label: str) -> TaskList:
    if not isinstance(value, list):
        raise TypeError(f"{label} must be a list")
    tasks: TaskList = []
    for index, task in enumerate(value):
        if not isinstance(task, dict):
            raise TypeError(f"{label}[{index}] must be an object")
        tasks.append(cast(TaskRecord, task))
    return tasks


def _coerce_int(value: object, default: int) -> int:
    if isinstance(value, int):
        return value
    if isinstance(value, float):
        return int(value)
    if isinstance(value, str):
        raw = value.strip()
        if raw:
            try:
                return int(raw)
            except ValueError:
                return default
    return default


def _coerce_float(value: object, default: float) -> float:
    if isinstance(value, float):
        return value
    if isinstance(value, int):
        return float(value)
    if isinstance(value, str):
        raw = value.strip()
        if raw:
            try:
                return float(raw)
            except ValueError:
                return default
    return default


class RedmineUnavailable(RuntimeError):
    pass


def now_iso_utc() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat()


def _load_local_backend_class() -> type[object]:
    module = _load_local_backend_module()
    backend_cls = cast(type[object] | None, getattr(module, "LocalBackend", None))
    if backend_cls is None:
        raise RuntimeError("LocalBackend class not found")
    return backend_cls


def _load_local_backend_module() -> ModuleType:
    local_path = Path(__file__).resolve().parents[1] / "local" / "backend.py"
    spec = importlib.util.spec_from_file_location("local_backend", local_path)
    if not spec or not spec.loader:
        raise RuntimeError(f"Unable to load local backend from {local_path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


class RedmineBackend:
    def __init__(self, settings: dict[str, object] | None = None) -> None:
        settings = settings if isinstance(settings, dict) else {}
        env_url = os.environ.get("CODEXSWARM_REDMINE_URL", "").strip()
        env_api_key = os.environ.get("CODEXSWARM_REDMINE_API_KEY", "").strip()
        env_project_id = os.environ.get("CODEXSWARM_REDMINE_PROJECT_ID", "").strip()
        env_assignee = os.environ.get("CODEXSWARM_REDMINE_ASSIGNEE_ID", "").strip()
        env_owner = (
            os.environ.get("CODEXSWARM_REDMINE_OWNER", "").strip()
            or os.environ.get("CODEXSWARM_REDMINE_OWNER_AGENT", "").strip()
        )

        self.base_url = (env_url or str(settings.get("url") or "")).rstrip("/")
        self.api_key = env_api_key or str(settings.get("api_key") or "").strip()
        self.project_id = env_project_id or str(settings.get("project_id") or "").strip()
        self.assignee_id = int(env_assignee) if env_assignee.isdigit() else None
        status_map_value = settings.get("status_map")
        self.status_map = cast(dict[str, object], status_map_value) if isinstance(status_map_value, dict) else {}
        custom_fields_value = settings.get("custom_fields")
        self.custom_fields = (
            cast(dict[str, object], custom_fields_value) if isinstance(custom_fields_value, dict) else {}
        )
        self.batch_size = _coerce_int(settings.get("batch_size"), 20)
        self.batch_pause = _coerce_float(settings.get("batch_pause"), 0.5)
        self.owner_agent = env_owner or str(settings.get("owner_agent") or "").strip() or "REDMINE"
        cache_dir = settings.get("cache_dir")
        self._issue_cache: dict[str, JsonDict] = {}

        if not self.base_url or not self.api_key or not self.project_id:
            raise ValueError("Redmine backend requires url, api_key, and project_id")

        local_module = _load_local_backend_module()
        local_backend_cls = getattr(local_module, "LocalBackend", None)
        if local_backend_cls is None:
            raise RuntimeError("LocalBackend class not found")
        self._id_alphabet = getattr(local_module, "ID_ALPHABET", "0123456789ABCDEFGHJKMNPQRSTVWXYZ")
        self._task_id_re = re.compile(rf"^\d{{12}}-[{self._id_alphabet}]{{4,}}$")
        self._doc_version = _coerce_int(getattr(local_module, "DOC_VERSION", 2), 2)
        self._doc_updated_by = str(getattr(local_module, "DOC_UPDATED_BY", "agentctl"))
        self.cache = None
        if cache_dir:
            self.cache = local_backend_cls({"dir": str(cache_dir)})

        self._reverse_status_map: dict[int, str] = {}
        if isinstance(self.status_map, dict):
            for key, value in self.status_map.items():
                if isinstance(value, int):
                    self._reverse_status_map[value] = str(key)

        if not (isinstance(self.custom_fields, dict) and self.custom_fields.get("task_id")):
            raise ValueError("Redmine backend requires custom_fields.task_id")

    def generate_task_id(self, *, length: int = 6, attempts: int = 1000) -> str:
        existing_ids: set[str] = set()
        try:
            existing_ids = {str(task.get("id") or "") for task in self._list_tasks_remote() if isinstance(task, dict)}
        except RedmineUnavailable:
            if not self.cache:
                raise
            existing_ids = {str(task.get("id") or "") for task in self.cache.list_tasks() if isinstance(task, dict)}
        return self._generate_task_id_from_existing(existing_ids, length=length, attempts=attempts)

    def _generate_task_id_from_existing(self, existing_ids: set[str], *, length: int, attempts: int) -> str:
        if length < 4:
            raise ValueError("length must be >= 4")
        for _ in range(attempts):
            timestamp = datetime.now(UTC).strftime("%Y%m%d%H%M")
            suffix = "".join(secrets.choice(self._id_alphabet) for _ in range(length))
            candidate = f"{timestamp}-{suffix}"
            if candidate not in existing_ids:
                return candidate
        raise RuntimeError("Failed to generate a unique task id")

    def list_tasks(self) -> TaskList:
        try:
            tasks = self._list_tasks_remote()
        except RedmineUnavailable:
            if not self.cache:
                raise
            return _ensure_task_list(self.cache.list_tasks(), label="cached tasks")
        for task in tasks:
            self._cache_task(task, dirty=False)
        return tasks

    def export_tasks_json(self, output_path: Path) -> None:
        tasks = sorted(self._list_tasks_remote(), key=lambda item: str(item.get("id") or ""))
        payload: JsonDict = {"tasks": tasks}
        canonical = json.dumps(payload, sort_keys=True, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        payload["meta"] = {
            "schema_version": 1,
            "managed_by": "agentctl",
            "checksum_algo": "sha256",
            "checksum": hashlib.sha256(canonical).hexdigest(),
        }
        output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    def get_task(self, task_id: str) -> TaskRecord | None:
        try:
            issue = self._find_issue_by_task_id(task_id)
            if issue is None:
                return None
            task = self._issue_to_task(issue)
            if task:
                self._cache_task(task, dirty=False)
            return task
        except RedmineUnavailable:
            if not self.cache:
                raise
            cached = self.cache.get_task(task_id)
            return cast(TaskRecord, cached) if isinstance(cached, dict) else None

    def get_task_doc(self, task_id: str) -> str:
        try:
            task = self.get_task(task_id)
            if task is None:
                raise KeyError(f"Unknown task id: {task_id}")
            return str(task.get("doc") or "")
        except RedmineUnavailable:
            if not self.cache:
                raise
            cached = self.cache.get_task(task_id)
            if not cached:
                raise KeyError(f"Unknown task id: {task_id}") from None
            return str(cached.get("doc") or "")

    def set_task_doc(self, task_id: str, doc: str) -> None:
        if not (isinstance(self.custom_fields, dict) and self.custom_fields.get("doc")):
            raise RuntimeError("Redmine backend requires custom_fields.doc to set task docs")
        try:
            issue = self._find_issue_by_task_id(task_id)
            if issue is None:
                raise KeyError(f"Unknown task id: {task_id}")
            issue_id = issue.get("id")
            if not issue_id:
                raise RuntimeError("Missing Redmine issue id for task")
            field_id = self.custom_fields.get("doc")
            task_doc: dict[str, object] = {"doc": doc}
            self._ensure_doc_metadata(task_doc, force=True)
            custom_fields: list[dict[str, object]] = []
            self._append_custom_field(custom_fields, "doc", task_doc.get("doc"))
            self._append_custom_field(custom_fields, "doc_version", task_doc.get("doc_version"))
            self._append_custom_field(custom_fields, "doc_updated_at", task_doc.get("doc_updated_at"))
            self._append_custom_field(custom_fields, "doc_updated_by", task_doc.get("doc_updated_by"))
            self._request_json(
                "PUT",
                f"issues/{issue_id}.json",
                payload={"issue": {"custom_fields": custom_fields}},
            )
            if field_id:
                self._set_issue_custom_field_value(issue, field_id, doc)
            for key in ("doc_version", "doc_updated_at", "doc_updated_by"):
                field_id = self.custom_fields.get(key)
                if field_id:
                    self._set_issue_custom_field_value(issue, field_id, task_doc.get(key))
            task = self._issue_to_task(issue, task_id_override=str(task_id))
            if task:
                self._cache_task(task, dirty=False)
        except RedmineUnavailable:
            if not self.cache:
                raise
            task = self.cache.get_task(task_id)
            if not isinstance(task, dict):
                raise KeyError(f"Unknown task id: {task_id}") from None
            task["doc"] = doc
            self._ensure_doc_metadata(task, force=True)
            self._cache_task(task, dirty=True)

    def touch_task_doc_metadata(self, task_id: str) -> None:
        try:
            issue = self._find_issue_by_task_id(task_id)
            if issue is None:
                raise KeyError(f"Unknown task id: {task_id}")
            issue_id = issue.get("id")
            if not issue_id:
                raise RuntimeError("Missing Redmine issue id for task")
            task_doc: dict[str, object] = {"doc": self._custom_field_value(issue, self.custom_fields.get("doc"))}
            self._ensure_doc_metadata(task_doc, force=True)
            custom_fields: list[dict[str, object]] = []
            self._append_custom_field(custom_fields, "doc_version", task_doc.get("doc_version"))
            self._append_custom_field(custom_fields, "doc_updated_at", task_doc.get("doc_updated_at"))
            self._append_custom_field(custom_fields, "doc_updated_by", task_doc.get("doc_updated_by"))
            if custom_fields:
                self._request_json(
                    "PUT",
                    f"issues/{issue_id}.json",
                    payload={"issue": {"custom_fields": custom_fields}},
                )
                for key in ("doc_version", "doc_updated_at", "doc_updated_by"):
                    field_id = self.custom_fields.get(key)
                    if field_id:
                        self._set_issue_custom_field_value(issue, field_id, task_doc.get(key))
                task = self._issue_to_task(issue, task_id_override=str(task_id))
                if task:
                    self._cache_task(task, dirty=False)
        except RedmineUnavailable:
            if not self.cache:
                raise
            task = self.cache.get_task(task_id)
            if not task:
                raise KeyError(f"Unknown task id: {task_id}") from None
            self._ensure_doc_metadata(task, force=True)
            self._cache_task(task, dirty=True)

    def write_task(self, task: dict[str, object]) -> None:
        task_id = str(task.get("id") or "").strip()
        if not task_id:
            raise ValueError("task.id is required")
        try:
            existing_issue: JsonDict | None = None
            self._ensure_doc_metadata(task, force=False)
            issue = self._find_issue_by_task_id(task_id)
            issue_id = issue.get("id") if issue else None
            existing_issue = issue
            if issue_id and existing_issue is None:
                existing_issue = self._issue_from_payload(self._request_json("GET", f"issues/{issue_id}.json"))
            payload = self._task_to_issue_payload(task, existing_issue=existing_issue)
            if issue_id:
                self._request_json("PUT", f"issues/{issue_id}.json", payload={"issue": payload})
            else:
                payload["project_id"] = self.project_id
                created = self._request_json("POST", "issues.json", payload={"issue": payload})
                created_issue = self._issue_from_payload(created)
                issue_id = created_issue.get("id") if created_issue else None
                if issue_id:
                    update_payload = dict(payload)
                    update_payload.pop("project_id", None)
                    self._request_json("PUT", f"issues/{issue_id}.json", payload={"issue": update_payload})
                    existing_issue = self._issue_from_payload(self._request_json("GET", f"issues/{issue_id}.json"))
            if issue_id:
                existing_comments: list[dict[str, object]] = []
                if isinstance(existing_issue, dict):
                    comments_val = self._custom_field_value(existing_issue, self.custom_fields.get("comments"))
                    existing_comments = self._normalize_comments(self._maybe_parse_json(comments_val))
                desired_comments = self._normalize_comments(task.get("comments"))
                self._append_comment_notes(
                    issue_id, existing_comments=existing_comments, desired_comments=desired_comments
                )
            task["dirty"] = False
            self._cache_task(task, dirty=False)
            self._issue_cache = {}
        except RedmineUnavailable:
            if not self.cache:
                raise
            task["dirty"] = True
            self._cache_task(task, dirty=True)

    def write_tasks(self, tasks: list[dict[str, object]]) -> None:
        for index, task in enumerate(tasks, start=1):
            self.write_task(task)
            if self.batch_pause and self.batch_size > 0 and index % self.batch_size == 0:
                time.sleep(self.batch_pause)

    def sync(
        self,
        direction: str = "push",
        conflict: str = "diff",
        *,
        quiet: bool = False,
        confirm: bool = False,
    ) -> None:
        if direction == "push":
            self._sync_push(conflict, quiet=quiet, confirm=confirm)
            return
        if direction == "pull":
            self._sync_pull(conflict=conflict, quiet=quiet)
            return
        raise ValueError(f"Unsupported direction: {direction}")

    def _sync_push(self, _conflict: str, quiet: bool, confirm: bool) -> None:
        if not self.cache:
            raise RuntimeError("Redmine cache is disabled; sync push is unavailable")
        tasks = self.cache.list_tasks()
        dirty = [task for task in tasks if bool(task.get("dirty"))]
        if not dirty:
            if not quiet:
                print("ℹ️ no dirty tasks to push")
            return
        if not confirm:
            for task in dirty:
                task_id = task.get("id")
                print(f"- pending push: {task_id}")
            raise RuntimeError("Refusing to push without --yes (preview above)")
        for index, task in enumerate(dirty, start=1):
            self.write_task(task)
            if self.batch_pause and self.batch_size > 0 and index % self.batch_size == 0:
                time.sleep(self.batch_pause)
        if not quiet:
            print(f"✅ pushed {len(dirty)} dirty task(s)")

    def _sync_pull(self, conflict: str, quiet: bool) -> None:
        if not self.cache:
            raise RuntimeError("Redmine cache is disabled; sync pull is unavailable")
        remote: dict[str, TaskRecord] = {}
        for task in self._list_tasks_remote():
            task_id = str(task.get("id") or "").strip()
            if not task_id:
                continue
            remote[task_id] = task
        local_tasks: dict[str, TaskRecord] = {}
        for task in _ensure_task_list(self.cache.list_tasks(), label="cached tasks"):
            task_id = str(task.get("id") or "").strip()
            if not task_id:
                continue
            local_tasks[task_id] = task
        for task_id, remote_task in remote.items():
            local_task = local_tasks.get(task_id)
            if local_task and bool(local_task.get("dirty")):
                if self._tasks_differ(local_task, remote_task):
                    self._handle_conflict(task_id, local_task, remote_task, conflict)
                    continue
                local_task["dirty"] = False
                self._cache_task(local_task, dirty=False)
                continue
            self._cache_task(remote_task, dirty=False)
        if not quiet:
            print(f"✅ pulled {len(remote)} task(s)")

    def _handle_conflict(
        self,
        task_id: str,
        local_task: dict[str, object],
        remote_task: dict[str, object],
        conflict: str,
    ) -> None:
        if conflict == "prefer-local":
            self.write_task(local_task)
            return
        if conflict == "prefer-remote":
            self._cache_task(remote_task, dirty=False)
            return
        diff = self._diff_tasks(local_task, remote_task)
        if conflict == "diff":
            print(diff)
            raise RuntimeError(f"Conflict detected for {task_id}")
        raise RuntimeError(f"Conflict detected for {task_id}")

    def _diff_tasks(self, local_task: dict[str, object], remote_task: dict[str, object]) -> str:
        local_text = json.dumps(local_task, indent=2, sort_keys=True, ensure_ascii=False).splitlines()
        remote_text = json.dumps(remote_task, indent=2, sort_keys=True, ensure_ascii=False).splitlines()
        return "\n".join(difflib.unified_diff(remote_text, local_text, fromfile="remote", tofile="local", lineterm=""))

    def _tasks_differ(self, local_task: dict[str, object], remote_task: dict[str, object]) -> bool:
        return json.dumps(local_task, sort_keys=True) != json.dumps(remote_task, sort_keys=True)

    def _cache_task(self, task: dict[str, object], dirty: bool) -> None:
        if not self.cache:
            return
        task["dirty"] = dirty
        self.cache.write_task(task)

    def _task_id_field_id(self) -> object:
        if isinstance(self.custom_fields, dict) and self.custom_fields.get("task_id"):
            return self.custom_fields.get("task_id")
        raise RuntimeError("Redmine backend requires custom_fields.task_id")

    def _set_issue_custom_field_value(self, issue: dict[str, object], field_id: object, value: object) -> None:
        fields = issue.get("custom_fields")
        if not isinstance(fields, list):
            fields = []
            issue["custom_fields"] = fields
        for field in fields:
            if isinstance(field, dict) and field.get("id") == field_id:
                field["value"] = value
                return
        fields.append({"id": field_id, "value": value})

    def _list_tasks_remote(self) -> TaskList:
        tasks: TaskList = []
        all_issues: list[JsonDict] = []
        offset = 0
        limit = 100
        task_id_field_id = self._task_id_field_id()
        self._issue_cache = {}
        while True:
            payload = self._request_json(
                "GET",
                "issues.json",
                params={
                    "project_id": self.project_id,
                    "limit": limit,
                    "offset": offset,
                    "status_id": "*",
                },
            )
            page_issues = payload.get("issues")
            if not isinstance(page_issues, list):
                break
            page_issues = [cast(JsonDict, issue) for issue in page_issues if isinstance(issue, dict)]
            all_issues.extend(page_issues)
            total = payload.get("total_count")
            total_int = _coerce_int(total, 0)
            if total_int == 0 or offset + limit >= total_int:
                break
            offset += limit
        existing_ids: set[str] = set()
        duplicates: set[str] = set()
        for issue in all_issues:
            task_id = self._custom_field_value(issue, task_id_field_id)
            if not task_id:
                continue
            task_id_str = str(task_id)
            if not self._task_id_re.match(task_id_str):
                continue
            if task_id_str in existing_ids:
                duplicates.add(task_id_str)
            existing_ids.add(task_id_str)
        if duplicates:
            sample = ", ".join(sorted(duplicates)[:5])
            raise RuntimeError(f"Duplicate task_id values found in Redmine: {sample}")
        for issue in all_issues:
            task_id = self._custom_field_value(issue, task_id_field_id)
            if not task_id or not self._task_id_re.match(str(task_id)):
                continue
            task = self._issue_to_task(issue, task_id_override=str(task_id))
            if task:
                self._issue_cache[str(task.get("id"))] = issue
                tasks.append(task)
        return tasks

    def _issue_from_payload(self, payload: JsonDict) -> JsonDict | None:
        issue = payload.get("issue")
        return cast(JsonDict, issue) if isinstance(issue, dict) else None

    def _find_issue_by_task_id(self, task_id: str) -> JsonDict | None:
        task_id_str = str(task_id or "").strip()
        if not task_id_str:
            return None
        cached = self._issue_cache.get(task_id_str)
        if isinstance(cached, dict):
            return cached

        task_field = self._task_id_field_id()
        payload = self._request_json(
            "GET",
            "issues.json",
            params={
                "project_id": self.project_id,
                "status_id": "*",
                f"cf_{task_field}": task_id_str,
                "limit": 100,
            },
        )
        candidates = payload.get("issues")
        if isinstance(candidates, list):
            for candidate_issue in candidates:
                if not isinstance(candidate_issue, dict):
                    continue
                val = self._custom_field_value(candidate_issue, task_field)
                if val and str(val) == task_id_str:
                    self._issue_cache[task_id_str] = candidate_issue
                    return candidate_issue

        self._list_tasks_remote()
        cached = self._issue_cache.get(task_id_str)
        if isinstance(cached, dict):
            return cached
        return None

    def _issue_to_task(
        self, issue: dict[str, object], *, task_id_override: str | None = None
    ) -> dict[str, object] | None:
        task_id = task_id_override or self._custom_field_value(issue, self.custom_fields.get("task_id"))
        if not task_id:
            return None
        status_val = issue.get("status")
        status_id = status_val.get("id") if isinstance(status_val, dict) else None
        status = self._reverse_status_map.get(int(status_id)) if isinstance(status_id, int) else "TODO"
        verify_val = self._custom_field_value(issue, self.custom_fields.get("verify"))
        commit_val = self._custom_field_value(issue, self.custom_fields.get("commit"))
        doc_val = self._custom_field_value(issue, self.custom_fields.get("doc"))
        comments_val = self._custom_field_value(issue, self.custom_fields.get("comments"))
        doc_version_val = self._custom_field_value(issue, self.custom_fields.get("doc_version"))
        doc_updated_at_val = self._custom_field_value(issue, self.custom_fields.get("doc_updated_at"))
        doc_updated_by_val = self._custom_field_value(issue, self.custom_fields.get("doc_updated_by"))
        priority_val = issue.get("priority")
        priority_name = str(priority_val.get("name") or "") if isinstance(priority_val, dict) else ""
        tags: list[str] = []
        tags_val = issue.get("tags")
        if isinstance(tags_val, list):
            for tag in tags_val:
                if not isinstance(tag, dict):
                    continue
                tag_name = tag.get("name")
                if tag_name:
                    tags.append(str(tag_name))
        task = {
            "id": str(task_id),
            "title": str(issue.get("subject") or ""),
            "description": str(issue.get("description") or ""),
            "status": status or "TODO",
            "priority": priority_name,
            "owner": self.owner_agent,
            "tags": tags,
            "depends_on": [],
            "verify": self._maybe_parse_json(verify_val),
            "commit": self._maybe_parse_json(commit_val),
            "comments": self._normalize_comments(self._maybe_parse_json(comments_val)),
            "id_source": "custom",
        }
        if doc_val:
            task["doc"] = doc_val
        doc_version = self._coerce_doc_version(doc_version_val)
        if doc_version is not None:
            task["doc_version"] = doc_version
        if doc_updated_at_val:
            task["doc_updated_at"] = doc_updated_at_val
        if doc_updated_by_val:
            task["doc_updated_by"] = doc_updated_by_val
        return task

    def _task_to_issue_payload(
        self, task: dict[str, object], existing_issue: dict[str, object] | None = None
    ) -> JsonDict:
        status = str(task.get("status") or "").strip().upper()
        payload: dict[str, object] = {
            "subject": str(task.get("title") or ""),
            "description": str(task.get("description") or ""),
        }
        if status and isinstance(self.status_map, dict) and status in self.status_map:
            payload["status_id"] = self.status_map[status]
        priority = task.get("priority")
        if isinstance(priority, int):
            payload["priority_id"] = priority
        existing_assignee = None
        if isinstance(existing_issue, dict):
            assigned_val = existing_issue.get("assigned_to")
            if isinstance(assigned_val, dict):
                existing_assignee = assigned_val.get("id")
        if self.assignee_id and not existing_assignee:
            payload["assigned_to_id"] = self.assignee_id
        start_date = self._start_date_from_task_id(str(task.get("id") or ""))
        if start_date:
            payload["start_date"] = start_date
        done_ratio = self._done_ratio_for_status(status)
        if done_ratio is not None:
            payload["done_ratio"] = done_ratio
        custom_fields: list[dict[str, object]] = []
        self._ensure_doc_metadata(task, force=False)
        self._append_custom_field(custom_fields, "task_id", task.get("id"))
        self._append_custom_field(custom_fields, "verify", task.get("verify"))
        self._append_custom_field(custom_fields, "commit", task.get("commit"))
        self._append_custom_field(custom_fields, "comments", task.get("comments"))
        self._append_custom_field(custom_fields, "doc", task.get("doc"))
        self._append_custom_field(custom_fields, "doc_version", task.get("doc_version"))
        self._append_custom_field(custom_fields, "doc_updated_at", task.get("doc_updated_at"))
        self._append_custom_field(custom_fields, "doc_updated_by", task.get("doc_updated_by"))
        if custom_fields:
            payload["custom_fields"] = custom_fields
        return payload

    def _append_custom_field(self, fields: list[dict[str, object]], key: str, value: object) -> None:
        field_id = None
        if isinstance(self.custom_fields, dict):
            field_id = self.custom_fields.get(key)
        if not field_id:
            return
        if isinstance(value, dict | list):
            value = json.dumps(value, ensure_ascii=False)
        fields.append({"id": field_id, "value": value})

    def _ensure_doc_metadata(self, task: dict[str, object], *, force: bool) -> None:
        if "doc" not in task and not force:
            return
        if force or task.get("doc_version") is None:
            task["doc_version"] = self._doc_version
        if force or not task.get("doc_updated_at"):
            task["doc_updated_at"] = now_iso_utc()
        if force or not task.get("doc_updated_by"):
            task["doc_updated_by"] = self._doc_updated_by

    def _coerce_doc_version(self, value: object) -> int | None:
        if value is None:
            return None
        if isinstance(value, int):
            return value
        raw = str(value).strip()
        if raw.isdigit():
            return int(raw)
        return None

    def _normalize_comments(self, value: object) -> list[dict[str, object]]:
        if isinstance(value, list):
            return [item for item in value if isinstance(item, dict)]
        if isinstance(value, dict):
            return [value]
        if isinstance(value, str) and value.strip():
            return [{"author": "redmine", "body": value.strip()}]
        return []

    def _comments_to_pairs(self, comments: list[dict[str, object]]) -> list[tuple[str, str]]:
        pairs: list[tuple[str, str]] = []
        for comment in comments:
            author = str(comment.get("author") or "").strip()
            body = str(comment.get("body") or "").strip()
            if not author and not body:
                continue
            pairs.append((author, body))
        return pairs

    def _format_comment_note(self, author: str, body: str) -> str:
        author_text = author or "unknown"
        body_text = body or ""
        return f"[comment] {author_text}: {body_text}".strip()

    def _append_comment_notes(
        self,
        issue_id: object,
        *,
        existing_comments: list[dict[str, object]],
        desired_comments: list[dict[str, object]],
    ) -> None:
        if not issue_id:
            return
        existing_pairs = self._comments_to_pairs(existing_comments)
        desired_pairs = self._comments_to_pairs(desired_comments)
        if not desired_pairs:
            return
        if len(desired_pairs) < len(existing_pairs):
            return
        if existing_pairs and desired_pairs[: len(existing_pairs)] != existing_pairs:
            return
        new_pairs = desired_pairs[len(existing_pairs) :]
        for author, body in new_pairs:
            note = self._format_comment_note(author, body)
            if note:
                self._request_json("PUT", f"issues/{issue_id}.json", payload={"issue": {"notes": note}})

    def _start_date_from_task_id(self, task_id: str) -> str | None:
        if not task_id or "-" not in task_id:
            return None
        prefix = task_id.split("-", 1)[0]
        if len(prefix) < 8 or not prefix[:8].isdigit():
            return None
        year = prefix[0:4]
        month = prefix[4:6]
        day = prefix[6:8]
        return f"{year}-{month}-{day}"

    def _done_ratio_for_status(self, status: str) -> int | None:
        if not status:
            return None
        if status == "DONE":
            return 100
        return 0

    def _custom_field_value(self, issue: dict[str, object], field_id: object) -> str | None:
        if not field_id:
            return None
        fields = issue.get("custom_fields")
        if not isinstance(fields, list):
            return None
        for field in fields:
            if isinstance(field, dict) and field.get("id") == field_id:
                return str(field.get("value") or "")
        return None

    def _maybe_parse_json(self, value: str | None) -> object:
        if value is None:
            return None
        raw = str(value).strip()
        if not raw:
            return None
        if raw.startswith(("{", "[")):
            try:
                return json.loads(raw)
            except json.JSONDecodeError:
                return raw
        return raw

    def _request_json(
        self,
        method: str,
        path: str,
        payload: dict[str, object] | None = None,
        params: dict[str, object] | None = None,
        *,
        attempts: int = 3,
        backoff: float = 0.5,
    ) -> dict[str, object]:
        url = f"{self.base_url}/{path.lstrip('/')}"
        if params:
            url += "?" + urlparse.urlencode(params)
        request_data = json.dumps(payload).encode("utf-8") if payload else None
        req = urlrequest.Request(
            url,
            data=request_data,
            method=method,
            headers={
                "Content-Type": "application/json",
                "X-Redmine-API-Key": self.api_key,
            },
        )
        raw: bytes = b""
        for attempt in range(1, max(1, attempts) + 1):
            try:
                with urlrequest.urlopen(req, timeout=10) as resp:
                    raw = resp.read()
                break
            except urlerror.HTTPError as exc:
                body = exc.read().decode("utf-8", errors="replace") if exc.fp else str(exc)
                if (exc.code == 429 or 500 <= exc.code < 600) and attempt < attempts:
                    time.sleep(backoff * attempt)
                    continue
                raise RuntimeError(f"Redmine API error: {exc.code} {body}") from exc
            except urlerror.URLError as exc:
                if attempt >= attempts:
                    raise RedmineUnavailable("Redmine unavailable") from exc
                time.sleep(backoff * attempt)
                continue
        if not raw:
            return {}
        try:
            parsed = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            return {}
        if not isinstance(parsed, dict):
            return {}
        return cast(JsonDict, parsed)

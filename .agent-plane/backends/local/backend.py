from __future__ import annotations

import hashlib
import json
import re
import secrets
from dataclasses import dataclass
from datetime import UTC, datetime
from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from collections.abc import Iterable

FRONTMATTER_BOUNDARY = "---"
DEFAULT_TASKS_DIR = Path(".agent-plane/tasks")
ID_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
TASK_ID_RE = re.compile(rf"^\d{{12}}-[{ID_ALPHABET}]{{4,}}$")
DOC_SECTION_HEADER = "## Summary"
AUTO_SUMMARY_HEADER = "## Changes Summary (auto)"
DOC_VERSION = 2
DOC_UPDATED_BY = "agentctl"


@dataclass
class FrontmatterDoc:
    frontmatter: dict[str, object]
    body: str


def _split_top_level(value: str, sep: str = ",") -> list[str]:
    parts: list[str] = []
    buf: list[str] = []
    depth = 0
    quote: str | None = None
    for ch in value:
        if quote:
            buf.append(ch)
            if ch == quote:
                quote = None
            continue
        if ch in ('"', "'"):
            buf.append(ch)
            quote = ch
            continue
        if ch in "[{(":
            depth += 1
            buf.append(ch)
            continue
        if ch in "]})":
            depth = max(0, depth - 1)
            buf.append(ch)
            continue
        if ch == sep and depth == 0:
            parts.append("".join(buf).strip())
            buf = []
            continue
        buf.append(ch)
    if buf:
        parts.append("".join(buf).strip())
    return [p for p in parts if p]


def _strip_quotes(value: str) -> str:
    if len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
        return value[1:-1]
    return value


def _parse_scalar(value: str) -> object:
    raw = value.strip()
    if not raw:
        return ""
    lowered = raw.lower()
    if lowered == "true":
        return True
    if lowered == "false":
        return False
    if lowered in {"null", "none"}:
        return None
    if raw[0] in ('"', "'") and raw[-1] == raw[0]:
        if raw[0] == '"':
            try:
                return json.loads(raw)
            except json.JSONDecodeError:
                return _strip_quotes(raw)
        return _strip_quotes(raw)
    if raw.isdigit():
        return int(raw)
    return raw


def _parse_inline_list(value: str) -> list[object]:
    inner = value.strip()[1:-1].strip()
    if not inner:
        return []
    items = _split_top_level(inner)
    return [_parse_scalar(item) for item in items]


def _parse_inline_dict(value: str) -> dict[str, object]:
    inner = value.strip()[1:-1].strip()
    if not inner:
        return {}
    entries = _split_top_level(inner)
    result: dict[str, object] = {}
    for entry in entries:
        if ":" not in entry:
            continue
        key, raw_val = entry.split(":", 1)
        key = _strip_quotes(key.strip())
        result[key] = _parse_value(raw_val.strip())
    return result


def _parse_value(value: str) -> object:
    raw = value.strip()
    if raw.startswith("[") and raw.endswith("]"):
        return _parse_inline_list(raw)
    if raw.startswith("{") and raw.endswith("}"):
        return _parse_inline_dict(raw)
    return _parse_scalar(raw)


def parse_frontmatter(text: str) -> FrontmatterDoc:
    lines = text.splitlines()
    if not lines or lines[0].strip() != FRONTMATTER_BOUNDARY:
        return FrontmatterDoc(frontmatter={}, body=text)
    end_idx = None
    for idx in range(1, len(lines)):
        if lines[idx].strip() == FRONTMATTER_BOUNDARY:
            end_idx = idx
            break
    if end_idx is None:
        return FrontmatterDoc(frontmatter={}, body=text)
    frontmatter_lines = lines[1:end_idx]
    body = "\n".join(lines[end_idx + 1 :]).lstrip("\n")
    frontmatter = _parse_frontmatter_lines(frontmatter_lines)
    return FrontmatterDoc(frontmatter=frontmatter, body=body)


def _parse_frontmatter_lines(lines: Iterable[str]) -> dict[str, object]:
    data: dict[str, object] = {}
    current_list_key: str | None = None
    for raw_line in lines:
        if not raw_line.strip():
            continue
        if raw_line.lstrip().startswith("#"):
            continue
        if raw_line.startswith("  - ") and current_list_key:
            item_text = raw_line.strip()[2:].strip()
            item: object
            if item_text.startswith("{") and item_text.endswith("}"):
                item = _parse_inline_dict(item_text)
            else:
                item = _parse_value(item_text)
            current = data.get(current_list_key)
            if isinstance(current, list):
                current.append(item)
            else:
                data[current_list_key] = [item]
            continue
        current_list_key = None
        if ":" not in raw_line:
            continue
        key, raw_val = raw_line.split(":", 1)
        key = key.strip()
        value = raw_val.strip()
        if not value:
            data[key] = []
            current_list_key = key
            continue
        data[key] = _parse_value(value)
    return data


def _format_scalar(value: object) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    if value is None:
        return "null"
    if isinstance(value, int):
        return str(value)
    text = str(value)
    return json.dumps(text, ensure_ascii=False)


def _format_inline_list(values: list[object]) -> str:
    return "[" + ", ".join(_format_scalar(v) for v in values) + "]"


def _format_inline_dict(values: dict[str, object]) -> str:
    parts = []
    for key, value in values.items():
        parts.append(f"{key}: {_format_scalar(value)}")
    return "{ " + ", ".join(parts) + " }"


def format_frontmatter(frontmatter: dict[str, object]) -> str:
    lines: list[str] = [FRONTMATTER_BOUNDARY]
    keys = [
        "id",
        "title",
        "status",
        "priority",
        "owner",
        "depends_on",
        "tags",
        "verify",
        "commit",
        "comments",
        "doc_version",
        "doc_updated_at",
        "doc_updated_by",
        "created_at",
    ]
    remaining = [k for k in frontmatter if k not in keys]
    ordered_keys = keys + sorted(remaining)
    for key in ordered_keys:
        if key not in frontmatter:
            continue
        value = frontmatter[key]
        if isinstance(value, list):
            if value and all(isinstance(item, dict) for item in value):
                lines.append(f"{key}:")
                lines.extend(f"  - {_format_inline_dict(item)}" for item in value)
            else:
                lines.append(f"{key}: {_format_inline_list(value)}")
            continue
        if isinstance(value, dict):
            lines.append(f"{key}: {_format_inline_dict(value)}")
            continue
        lines.append(f"{key}: {_format_scalar(value)}")
    lines.append(FRONTMATTER_BOUNDARY)
    return "\n".join(lines)


def now_iso_utc() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat()


def _normalize_doc(text: str) -> str:
    return "\n".join(line.rstrip() for line in (text or "").splitlines()).strip()


def _doc_changed(existing: str, updated: str) -> bool:
    return _normalize_doc(existing) != _normalize_doc(updated)


def _apply_doc_metadata(frontmatter: dict[str, object], *, updated_by: str | None = None) -> None:
    frontmatter["doc_version"] = DOC_VERSION
    frontmatter["doc_updated_at"] = now_iso_utc()
    frontmatter["doc_updated_by"] = updated_by or DOC_UPDATED_BY


def validate_task_id(task_id: str, *, source: Path | None = None) -> None:
    if not TASK_ID_RE.match(task_id):
        hint = f" in {source}" if source else ""
        raise ValueError(f"Invalid task id{hint}: {task_id}")


def extract_task_doc(body: str) -> str:
    if not body:
        return ""
    lines = body.splitlines()
    start_idx = None
    for idx, line in enumerate(lines):
        if line.strip() == DOC_SECTION_HEADER:
            start_idx = idx
            break
    if start_idx is None:
        return ""
    end_idx = len(lines)
    for idx in range(start_idx + 1, len(lines)):
        if lines[idx].strip() == AUTO_SUMMARY_HEADER:
            end_idx = idx
            break
    return "\n".join(lines[start_idx:end_idx]).rstrip()


def merge_task_doc(body: str, doc: str) -> str:
    doc_text = str(doc or "").strip("\n")
    if not doc_text:
        return body
    lines = body.splitlines() if body else []
    prefix_idx = None
    for idx, line in enumerate(lines):
        if line.strip() == DOC_SECTION_HEADER:
            prefix_idx = idx
            break
    prefix_text = ""
    if prefix_idx is not None:
        prefix_text = "\n".join(lines[:prefix_idx]).rstrip()
    auto_idx = None
    for idx, line in enumerate(lines):
        if line.strip() == AUTO_SUMMARY_HEADER:
            auto_idx = idx
            break
    auto_block = ""
    if auto_idx is not None:
        auto_block = "\n".join(lines[auto_idx:]).rstrip()
    parts: list[str] = []
    if prefix_text:
        parts.append(prefix_text)
        parts.append("")
    parts.append(doc_text.rstrip())
    if auto_block:
        parts.append("")
        parts.append(auto_block)
    return "\n".join(parts).rstrip() + "\n"


class LocalBackend:
    def __init__(self, settings: dict[str, object] | None = None) -> None:
        raw_dir = (settings or {}).get("dir") if isinstance(settings, dict) else None
        if raw_dir:
            self.root = Path(str(raw_dir)).resolve()
        else:
            self.root = DEFAULT_TASKS_DIR.resolve()

    def task_dir(self, task_id: str) -> Path:
        return self.root / task_id

    def task_readme_path(self, task_id: str) -> Path:
        return self.task_dir(task_id) / "README.md"

    def generate_task_id(self, *, length: int = 6, attempts: int = 1000) -> str:
        if length < 4:
            raise ValueError("length must be >= 4")
        for _ in range(attempts):
            timestamp = datetime.now(UTC).strftime("%Y%m%d%H%M")
            suffix = "".join(secrets.choice(ID_ALPHABET) for _ in range(length))
            task_id = f"{timestamp}-{suffix}"
            if not self.task_dir(task_id).exists():
                return task_id
        raise RuntimeError("Failed to generate a unique task id")

    def list_tasks(self) -> list[dict[str, object]]:
        if not self.root.exists():
            return []
        tasks: list[dict[str, object]] = []
        seen_ids: set[str] = set()
        for entry in sorted(self.root.iterdir()):
            if not entry.is_dir():
                continue
            readme = entry / "README.md"
            if not readme.exists():
                continue
            parsed = parse_frontmatter(readme.read_text(encoding="utf-8"))
            if parsed.frontmatter:
                task = dict(parsed.frontmatter)
                task_id = str(task.get("id") or "").strip()
                if task_id:
                    validate_task_id(task_id, source=readme)
                    if task_id in seen_ids:
                        raise ValueError(f"Duplicate task id in local backend: {task_id}")
                    seen_ids.add(task_id)
                doc = extract_task_doc(parsed.body)
                if doc:
                    task["doc"] = doc
                tasks.append(task)
        return tasks

    def get_task(self, task_id: str) -> dict[str, object] | None:
        readme = self.task_readme_path(task_id)
        if not readme.exists():
            return None
        parsed = parse_frontmatter(readme.read_text(encoding="utf-8"))
        task = dict(parsed.frontmatter)
        doc = extract_task_doc(parsed.body)
        if doc:
            task["doc"] = doc
        return task

    def get_task_doc(self, task_id: str) -> str:
        readme = self.task_readme_path(task_id)
        if not readme.exists():
            raise FileNotFoundError(f"Missing task README: {readme}")
        parsed = parse_frontmatter(readme.read_text(encoding="utf-8"))
        return extract_task_doc(parsed.body)

    def write_task(self, task: dict[str, object]) -> None:
        task_id = str(task.get("id") or "").strip()
        if not task_id:
            raise ValueError("Task id is required")
        validate_task_id(task_id)
        task_payload = dict(task)
        doc = task_payload.pop("doc", None)
        readme = self.task_readme_path(task_id)
        body = ""
        existing_frontmatter: dict[str, object] = {}
        existing_doc = ""
        if readme.exists():
            parsed = parse_frontmatter(readme.read_text(encoding="utf-8"))
            existing_frontmatter = dict(parsed.frontmatter or {})
            body = parsed.body
            existing_doc = extract_task_doc(parsed.body)
        for key in ("doc_version", "doc_updated_at", "doc_updated_by"):
            if key not in task_payload and key in existing_frontmatter:
                task_payload[key] = existing_frontmatter[key]
        if doc is not None:
            doc_text = str(doc)
            body = merge_task_doc(body, doc_text)
            if _doc_changed(existing_doc, doc_text):
                _apply_doc_metadata(task_payload)
        if task_payload.get("doc_version") != DOC_VERSION:
            task_payload["doc_version"] = DOC_VERSION
        if not task_payload.get("doc_updated_at") or not task_payload.get("doc_updated_by"):
            _apply_doc_metadata(task_payload)
        readme.parent.mkdir(parents=True, exist_ok=True)
        frontmatter_text = format_frontmatter(task_payload)
        content = frontmatter_text + "\n"
        if body:
            content += body.lstrip("\n") + "\n"
        readme.write_text(content, encoding="utf-8")

    def set_task_doc(self, task_id: str, doc: str) -> None:
        readme = self.task_readme_path(task_id)
        if not readme.exists():
            raise FileNotFoundError(f"Missing task README: {readme}")
        parsed = parse_frontmatter(readme.read_text(encoding="utf-8"))
        doc_text = str(doc or "")
        body = merge_task_doc(parsed.body, doc_text)
        frontmatter = dict(parsed.frontmatter)
        if _doc_changed(extract_task_doc(parsed.body), doc_text) or not frontmatter.get("doc_updated_at"):
            _apply_doc_metadata(frontmatter)
        if frontmatter.get("doc_version") != DOC_VERSION:
            frontmatter["doc_version"] = DOC_VERSION
        frontmatter_text = format_frontmatter(frontmatter)
        content = frontmatter_text + "\n"
        if body:
            content += body.lstrip("\n") + "\n"
        readme.write_text(content, encoding="utf-8")

    def touch_task_doc_metadata(self, task_id: str, *, updated_by: str | None = None) -> None:
        readme = self.task_readme_path(task_id)
        if not readme.exists():
            raise FileNotFoundError(f"Missing task README: {readme}")
        parsed = parse_frontmatter(readme.read_text(encoding="utf-8"))
        frontmatter = dict(parsed.frontmatter)
        _apply_doc_metadata(frontmatter, updated_by=updated_by)
        frontmatter_text = format_frontmatter(frontmatter)
        content = frontmatter_text + "\n"
        if parsed.body:
            content += parsed.body.lstrip("\n") + "\n"
        readme.write_text(content, encoding="utf-8")

    def write_tasks(self, tasks: list[dict[str, object]]) -> None:
        for task in tasks:
            if isinstance(task, dict):
                self.write_task(task)

    def export_tasks_json(self, output_path: Path) -> None:
        tasks = sorted(self.list_tasks(), key=lambda item: str(item.get("id") or ""))
        payload: dict[str, object] = {"tasks": tasks}
        canonical = json.dumps(payload, sort_keys=True, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        payload["meta"] = {
            "schema_version": 1,
            "managed_by": "agentctl",
            "checksum_algo": "sha256",
            "checksum": hashlib.sha256(canonical).hexdigest(),
        }
        output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    def normalize_tasks(self) -> int:
        tasks = self.list_tasks()
        self.write_tasks(tasks)
        return len(tasks)

#!/usr/bin/env python3
"""Minimal local server for tasks.html with backend status updates."""

from __future__ import annotations

import argparse
import contextlib
import json
import os
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import cast
from urllib.parse import urlparse


def resolve_repo_root() -> Path:
    cwd = Path.cwd()
    if (cwd / ".agent-plane" / "tasks.json").exists():
        return cwd
    return Path(__file__).resolve().parent


REPO_ROOT = resolve_repo_root()
RESOURCE_ROOT = Path(getattr(sys, "_MEIPASS", REPO_ROOT))
VIEWER_DIR = RESOURCE_ROOT / ".agent-plane" / "viewer"
TASKS_HTML = VIEWER_DIR / "tasks.html"
TASKS_JSON = REPO_ROOT / ".agent-plane" / "tasks.json"
AGENTS_DIR = REPO_ROOT / ".agent-plane" / "agents"
AGENTCTL = REPO_ROOT / ".agent-plane" / "agentctl.py"

STATUS_SET = {"TODO", "DOING", "BLOCKED", "DONE"}


def run_agentctl(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(AGENTCTL), *args],
        cwd=str(REPO_ROOT),
        check=False,
        capture_output=True,
        text=True,
    )


def export_tasks_json() -> tuple[bool, str]:
    proc = run_agentctl("task", "export", "--format", "json", "--out", ".agent-plane/tasks.json")
    if proc.returncode != 0:
        return False, (proc.stderr.strip() or "Failed to export tasks.json")
    return True, ""


def load_tasks_json() -> dict[str, object]:
    with TASKS_JSON.open("r", encoding="utf-8") as fh:
        return cast(dict[str, object], json.load(fh))


def mask(value: str, keep: int = 4) -> str:
    if not value:
        return ""
    if len(value) <= keep:
        return "*" * len(value)
    return "*" * (len(value) - keep) + value[-keep:]


class TasksHandler(BaseHTTPRequestHandler):
    server_version = "TasksServer/0.1"

    def log_message(self, fmt: str, *args: object) -> None:
        # Keep console output concise.
        message = fmt % args if args else fmt
        sys.stderr.write(f"{self.address_string()} - - [{self.log_date_time_string()}] {message}\n")

    def _send_json(self, payload: dict[str, object], status: int = 200) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        try:
            self.wfile.write(body)
        except (BrokenPipeError, ConnectionResetError):
            return

    def _send_text(self, text: str, status: int = 200, content_type: str = "text/plain; charset=utf-8") -> None:
        body = text.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self) -> dict[str, object]:
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length) if length else b""
        if not raw:
            return {}
        try:
            payload = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError as exc:
            raise ValueError(f"Invalid JSON body: {exc}") from exc
        if not isinstance(payload, dict):
            raise TypeError("Invalid JSON body: expected object")
        return cast(dict[str, object], payload)

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        if parsed.path in {"/", "/tasks.html"}:
            if not TASKS_HTML.exists():
                self._send_text("tasks.html not found", status=404)
                return
            content = TASKS_HTML.read_text(encoding="utf-8")
            self._send_text(content, content_type="text/html; charset=utf-8")
            return
        if parsed.path.startswith("/viewer/"):
            rel = parsed.path.replace("/viewer/", "", 1)
            target = (VIEWER_DIR / rel).resolve()
            if not str(target).startswith(str(VIEWER_DIR.resolve())) or not target.exists():
                self._send_text("Not found", status=404)
                return
            if target.suffix == ".html":
                ctype = "text/html; charset=utf-8"
            elif target.suffix == ".css":
                ctype = "text/css; charset=utf-8"
            elif target.suffix == ".js":
                ctype = "application/javascript; charset=utf-8"
            else:
                ctype = "application/octet-stream"
            self._send_text(target.read_text(encoding="utf-8"), content_type=ctype)
            return
        if parsed.path == "/api/health":
            self._send_json({"ok": True})
            return
        if parsed.path == "/api/diag":
            env_url = os.environ.get("CODEXSWARM_REDMINE_URL", "").strip()
            env_api_key = os.environ.get("CODEXSWARM_REDMINE_API_KEY", "").strip()
            env_project_id = os.environ.get("CODEXSWARM_REDMINE_PROJECT_ID", "").strip()
            payload = {
                "ok": True,
                "repo_root": str(REPO_ROOT),
                "tasks_json": {
                    "exists": TASKS_JSON.exists(),
                    "path": str(TASKS_JSON),
                    "bytes": TASKS_JSON.stat().st_size if TASKS_JSON.exists() else 0,
                },
                "redmine_env": {
                    "url_set": bool(env_url),
                    "api_key_set": bool(env_api_key),
                    "project_id_set": bool(env_project_id),
                    "url": env_url,
                    "project_id": env_project_id,
                    "api_key_masked": mask(env_api_key),
                },
            }
            self._send_json(payload)
            return
        if parsed.path == "/api/tasks":
            try:
                ok, err = export_tasks_json()
                if not ok and not TASKS_JSON.exists():
                    raise RuntimeError(err)
                data = load_tasks_json()
                if not ok:
                    meta_obj = data.get("meta")
                    meta = cast(dict[str, object], meta_obj) if isinstance(meta_obj, dict) else {}
                    meta["warning"] = err
                    data["meta"] = meta
            except Exception as exc:  # pragma: no cover - simple runtime guard
                self._send_json({"error": str(exc)}, status=500)
                return
            self._send_json(data)
            return
        if parsed.path == "/api/agents":
            agents = []
            if AGENTS_DIR.exists():
                for item in sorted(AGENTS_DIR.glob("*.json")):
                    try:
                        data = json.loads(item.read_text(encoding="utf-8"))
                        if isinstance(data, dict):
                            if "id" not in data:
                                data["id"] = item.stem
                            agents.append(data)
                    except Exception:
                        pass
            self._send_json({"ok": True, "agents": agents})
            return
        self._send_text("Not found", status=404)

    def do_POST(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/tasks/") and parsed.path.endswith("/status"):
            parts = parsed.path.strip("/").split("/")
            if len(parts) != 4:
                self._send_json({"error": "Invalid status endpoint"}, status=404)
                return
            _, _, task_id, _ = parts
            try:
                payload = self._read_json()
            except ValueError as exc:
                self._send_json({"error": str(exc)}, status=400)
                return
            status = str(payload.get("status", "")).upper().strip()
            if status not in STATUS_SET:
                self._send_json({"error": f"Invalid status: {status}"}, status=400)
                return
            proc = run_agentctl("task", "set-status", task_id, status)
            if proc.returncode != 0:
                self._send_json({"error": proc.stderr.strip() or "Status update failed"}, status=500)
                return
            try:
                export_tasks_json()
                data = load_tasks_json()
            except Exception as exc:
                self._send_json({"error": str(exc)}, status=500)
                return
            self._send_json({"ok": True, "data": data, "task_id": task_id, "status": status})
            return
        self._send_text("Not found", status=404)


def main() -> int:
    parser = argparse.ArgumentParser(description="Local tasks.html kanban server")
    parser.add_argument("--host", default="127.0.0.1", help="Bind host (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=5179, help="Bind port (default: 5179)")
    args = parser.parse_args()

    addr = f"http://{args.host}:{args.port}"
    print(f"Serving tasks.html at {addr} (Ctrl+C to stop)")
    httpd = ThreadingHTTPServer((args.host, args.port), TasksHandler)
    with contextlib.suppress(KeyboardInterrupt):
        httpd.serve_forever()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

"""Hermes plugin entrypoint for Agentplane-owned Kanban worker lanes.

This is a compatibility shim for Hermes builds where Kanban documents a
``spawn_fn`` contract but the gateway dispatcher does not expose a public lane
registry. The plugin patches ``hermes_cli.kanban_db.dispatch_once`` inside the
Hermes process and injects a spawn function for ``agentplane-*`` assignees.
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import re
import shutil
import subprocess
from typing import Any

logger = logging.getLogger(__name__)

_PATCHED = False
_TASK_ID_RE = re.compile(r"\b\d{12}-[A-Z0-9]{6}\b")


def register(ctx) -> None:
    """Register Hermes CLI commands and install the dispatcher shim."""
    _patch_dispatcher()
    ctx.register_cli_command(
        name="agentplane",
        help="Agentplane Hermes worker-lane integration",
        setup_fn=_setup_cli,
        handler_fn=_handle_cli,
        description="Inspect and exercise the Agentplane external worker lane shim.",
    )


def _setup_cli(parser: argparse.ArgumentParser) -> None:
    sub = parser.add_subparsers(dest="agentplane_cmd")

    doctor = sub.add_parser("doctor", help="Check Agentplane lane shim status")
    doctor.add_argument("--json", action="store_true")
    doctor.set_defaults(func=_handle_cli)

    spawn = sub.add_parser("spawn", help="Spawn one Agentplane worker process")
    spawn.add_argument("--task-id", required=True, help="Agentplane task id")
    spawn.add_argument("--repo", required=True, help="Repository root")
    spawn.add_argument("--hermes-task-id", default="")
    spawn.add_argument("--board", default="")
    spawn.add_argument("--run-id", default="")
    spawn.add_argument("--workspace", default="")
    spawn.add_argument("--json", action="store_true")
    spawn.set_defaults(func=_handle_cli)


def _handle_cli(args: argparse.Namespace) -> int:
    cmd = getattr(args, "agentplane_cmd", None)
    if cmd == "doctor" or cmd is None:
        payload = {
            "ok": True,
            "patched": _PATCHED,
            "agentplane_binary": _resolve_agentplane_binary(),
            "lane_prefix": _lane_prefix(),
            "lanes": sorted(_explicit_lanes()),
            "mode": "dispatch_once_spawn_fn_shim",
        }
        _emit(payload, json_enabled=getattr(args, "json", False))
        return 0

    if cmd == "spawn":
        proc = _spawn_agentplane_process(
            agentplane_task_id=args.task_id,
            repo=args.repo,
            workspace=args.workspace or args.repo,
            hermes_task_id=args.hermes_task_id,
            board=args.board,
            run_id=args.run_id,
            claim_lock="",
        )
        payload = {"pid": proc.pid, "task_id": args.task_id, "repo": args.repo}
        _emit(payload, json_enabled=getattr(args, "json", False))
        return 0

    raise SystemExit(f"unknown agentplane command: {cmd}")


def _patch_dispatcher() -> None:
    global _PATCHED
    if _PATCHED:
        return

    import hermes_cli.kanban_db as kanban_db

    original_dispatch_once = kanban_db.dispatch_once
    original_default_spawn = kanban_db._default_spawn

    def agentplane_spawn(task: Any, workspace: str, *, board: str | None = None) -> int | None:
        if not _is_agentplane_lane(getattr(task, "assignee", None)):
            return original_default_spawn(task, workspace, board=board)

        agentplane_task_id = _extract_agentplane_task_id(task)
        if not agentplane_task_id:
            raise ValueError(
                f"Agentplane lane task {getattr(task, 'id', '<unknown>')} does not include an Agentplane task id"
            )

        proc = _spawn_agentplane_process(
            agentplane_task_id=agentplane_task_id,
            repo=_repo_from_task(task, workspace),
            workspace=workspace,
            hermes_task_id=str(getattr(task, "id", "")),
            board=board or "",
            run_id=str(getattr(task, "current_run_id", "") or ""),
            claim_lock=str(getattr(task, "claim_lock", "") or ""),
        )
        return proc.pid

    def dispatch_once_with_agentplane(conn, *args, spawn_fn=None, **kwargs):
        if spawn_fn is not None:
            return original_dispatch_once(conn, *args, spawn_fn=spawn_fn, **kwargs)
        return original_dispatch_once(conn, *args, spawn_fn=agentplane_spawn, **kwargs)

    dispatch_once_with_agentplane.__agentplane_original__ = original_dispatch_once
    kanban_db.dispatch_once = dispatch_once_with_agentplane
    _patch_profile_exists()
    _PATCHED = True
    logger.info("Agentplane Hermes dispatcher shim installed")


def _patch_profile_exists() -> None:
    try:
        import hermes_cli.profiles as profiles
    except Exception:
        logger.debug("Agentplane lane shim could not import hermes_cli.profiles", exc_info=True)
        return

    original = getattr(profiles, "profile_exists", None)
    if original is None or getattr(original, "__agentplane_patched__", False):
        return

    def profile_exists_with_agentplane(name: str) -> bool:
        if _is_agentplane_lane(name):
            return True
        return bool(original(name))

    profile_exists_with_agentplane.__agentplane_patched__ = True
    profiles.profile_exists = profile_exists_with_agentplane


def _spawn_agentplane_process(
    *,
    agentplane_task_id: str,
    repo: str,
    workspace: str,
    hermes_task_id: str,
    board: str,
    run_id: str,
    claim_lock: str,
) -> subprocess.Popen:
    agentplane = _resolve_agentplane_binary()
    env = dict(os.environ)
    env.update(
        {
            "HERMES_KANBAN_TASK": hermes_task_id,
            "HERMES_KANBAN_BOARD": board,
            "HERMES_KANBAN_RUN_ID": run_id,
            "HERMES_KANBAN_WORKSPACE": workspace,
            "HERMES_KANBAN_CLAIM_LOCK": claim_lock,
        }
    )
    cmd = [agentplane, "hermes", "supervise", agentplane_task_id, "--root", repo, "--json"]
    return subprocess.Popen(cmd, cwd=repo, env=env)


def _resolve_agentplane_binary() -> str:
    configured = os.getenv("AGENTPLANE_BIN", "").strip()
    if configured:
        return configured
    return shutil.which("agentplane") or "agentplane"


def _repo_from_task(task: Any, workspace: str) -> str:
    body = str(getattr(task, "body", "") or "")
    for pattern in (
        r"(?im)^Repo:\s*(?P<repo>\S+)\s*$",
        r"(?im)^Repository:\s*(?P<repo>\S+)\s*$",
        r'"repo"\s*:\s*"(?P<repo>[^"]+)"',
    ):
        match = re.search(pattern, body)
        if match:
            return match.group("repo")
    return workspace


def _extract_agentplane_task_id(task: Any) -> str | None:
    for value in (
        getattr(task, "idempotency_key", None),
        getattr(task, "body", None),
        getattr(task, "title", None),
    ):
        match = _TASK_ID_RE.search(str(value or ""))
        if match:
            return match.group(0)
    return None


def _is_agentplane_lane(assignee: str | None) -> bool:
    if not assignee:
        return False
    name = str(assignee).strip()
    return name.startswith(_lane_prefix()) or name in _explicit_lanes()


def _lane_prefix() -> str:
    return os.getenv("AGENTPLANE_HERMES_LANE_PREFIX", "agentplane-")


def _explicit_lanes() -> set[str]:
    raw = os.getenv("AGENTPLANE_HERMES_LANES", "")
    return {item.strip() for item in raw.split(",") if item.strip()}


def _emit(payload: dict[str, Any], *, json_enabled: bool) -> None:
    if json_enabled:
        print(json.dumps(payload, indent=2, sort_keys=True))
        return
    for key, value in payload.items():
        print(f"{key}: {value}")

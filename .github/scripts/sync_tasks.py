#!/usr/bin/env python3
"""
Sync tasks.json with GitHub Issues AND ProjectV2 Status.

Source of truth: the configured tasks backend; `.agent-plane/tasks.json` is a
snapshot produced by `agentctl task export`.

For each task:
  - Ensure there is a GitHub Issue with label `task-id:<ID>`
  - Update title/body/labels and state (open/closed)
  - Ensure the Issue is present in ProjectV2
  - Set ProjectV2.Status according to task.status

Required env:
  GITHUB_TOKEN
  GITHUB_OWNER   (e.g. "basilisk-labs")
  GITHUB_REPO    (e.g. "agent-plane")
  GITHUB_PROJECT_NUMBER  (integer project number from URL)
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, cast

import requests

# ---------- Config & session ----------

ROOT = Path(__file__).resolve().parents[2]  # repo root
TASKS_PATH = ROOT / ".agent-plane" / "tasks.json"

GITHUB_API_REST = "https://api.github.com"
GITHUB_API_GRAPHQL = "https://api.github.com/graphql"

OWNER = os.environ["GITHUB_OWNER"]
REPO = os.environ["GITHUB_REPO"]
TOKEN = os.environ["GITHUB_TOKEN"]
PROJECT_NUMBER = int(os.environ["GITHUB_PROJECT_NUMBER"])

SESSION = requests.Session()
SESSION.headers.update(
    {
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
)


# ---------- Helpers ----------


def load_tasks() -> list[dict[str, Any]]:
    if not TASKS_PATH.exists():
        raise SystemExit("Missing .agent-plane/tasks.json. Run `python3 .agent-plane/agentctl.py task export` first.")
    data = cast(dict[str, Any], json.loads(TASKS_PATH.read_text(encoding="utf-8")))
    tasks = data.get("tasks")
    if not isinstance(tasks, list):
        raise TypeError("tasks.json missing tasks list")
    return cast(list[dict[str, Any]], tasks)


def coerce_str_list(value: object) -> list[str]:
    if not isinstance(value, list):
        return []
    return [item.strip() for item in value if isinstance(item, str) and item.strip()]


def build_labels(task: dict[str, Any]) -> list[str]:
    labels: list[str] = []
    labels.append(f"task-id:{task['id']}")

    labels.append(f"status:{task['status']}")
    labels.append(f"priority:{task.get('priority', 'med')}")
    labels.append(f"owner:{task.get('owner', 'unknown')}")

    labels.extend(coerce_str_list(task.get("tags")))
    return sorted(set(labels))


def build_title(task: dict[str, Any]) -> str:
    return f"[{task['id']}] {task['title']}"


def build_body(task: dict[str, Any]) -> str:
    lines: list[str] = []
    lines.append(f"Internal ID: `{task['id']}`\n")

    lines.append("**Description**")
    desc = task.get("description") or "_No description provided._"
    lines.append(desc)

    lines.append("\n**Meta**")
    lines.append(f"- Status: `{task['status']}`")
    lines.append(f"- Priority: `{task.get('priority', 'med')}`")
    lines.append(f"- Owner: `{task.get('owner', 'unknown')}`")
    tags = ", ".join(coerce_str_list(task.get("tags"))) or "none"
    lines.append(f"- Tags: `{tags}`")
    depends_on = ", ".join(coerce_str_list(task.get("depends_on"))) or "none"
    lines.append(f"- Depends on: `{depends_on}`")
    verify_cmds = coerce_str_list(task.get("verify"))
    if verify_cmds:
        lines.append(f"- Verify: `{'; '.join(verify_cmds)}`")

    commit = task.get("commit")
    if isinstance(commit, dict):
        h = str(commit.get("hash") or "").strip()
        msg = str(commit.get("message") or "").strip()
        if h:
            url = f"https://github.com/{OWNER}/{REPO}/commit/{h}"
            suffix = f" — {msg}" if msg else ""
            lines.append(f"- Commit: [`{h[:7]}`]({url}){suffix}")
    elif isinstance(commit, str):
        h = commit.strip()
        if h:
            url = f"https://github.com/{OWNER}/{REPO}/commit/{h}"
            lines.append(f"- Commit: [`{h[:7]}`]({url})")

    lines.append(
        "\n_This issue is synced from `.agent-plane/tasks.json` (exported snapshot). "
        "Change status and details in the backend and re-export, not here._"
    )
    return "\n".join(lines)


def find_issue_by_task_id(task_id: str) -> dict[str, Any] | None:
    """Search issue by label task-id:<id>. Returns first match or None."""
    label = f"task-id:{task_id}"
    url = f"{GITHUB_API_REST}/repos/{OWNER}/{REPO}/issues"
    params: dict[str, str | int] = {"labels": label, "state": "all", "per_page": 50}
    r = SESSION.get(url, params=params)
    r.raise_for_status()
    issues = cast(list[dict[str, Any]], r.json())
    return issues[0] if issues else None


def create_issue(task: dict[str, Any]) -> dict[str, Any]:
    url = f"{GITHUB_API_REST}/repos/{OWNER}/{REPO}/issues"
    data = {
        "title": build_title(task),
        "body": build_body(task),
        "labels": build_labels(task),
    }
    r = SESSION.post(url, json=data)
    r.raise_for_status()
    return cast(dict[str, Any], r.json())


def update_issue(issue: dict[str, Any], task: dict[str, Any]) -> dict[str, Any]:
    number = issue["number"]
    url = f"{GITHUB_API_REST}/repos/{OWNER}/{REPO}/issues/{number}"

    desired_state = "closed" if task["status"] == "DONE" else "open"

    data = {
        "title": build_title(task),
        "body": build_body(task),
        "labels": build_labels(task),
        "state": desired_state,
    }
    r = SESSION.patch(url, json=data)
    r.raise_for_status()
    return cast(dict[str, Any], r.json())


# ---------- GraphQL helpers ----------


def gql(query: str, variables: dict[str, Any]) -> dict[str, Any]:
    r = SESSION.post(
        GITHUB_API_GRAPHQL,
        json={"query": query, "variables": variables},
    )
    r.raise_for_status()
    payload = cast(dict[str, Any], r.json())
    errors = payload.get("errors")
    if errors:
        raise RuntimeError(errors)
    data = payload.get("data")
    if not isinstance(data, dict):
        raise TypeError("GraphQL response missing data")
    return cast(dict[str, Any], data)


def get_project_and_status_field() -> tuple[str, str, dict[str, str]]:
    """
    Returns:
      project_id: str
      status_field_id: str
      status_options_by_name: Dict[name, option_id]
    """
    query = """
    query($org: String!, $number: Int!) {
      organization(login: $org) {
        projectV2(number: $number) {
          id
          fields(first: 50) {
            nodes {
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
    """
    data = gql(query, {"org": OWNER, "number": PROJECT_NUMBER})
    project = data["organization"]["projectV2"]
    if not project:
        raise RuntimeError("ProjectV2 not found")

    project_id = project["id"]

    status_field = None
    for f in project["fields"]["nodes"]:
        if f and f["name"] == "Status":
            status_field = f
            break

    if status_field is None:
        raise RuntimeError("ProjectV2 field 'Status' not found")

    options_by_name = {opt["name"]: opt["id"] for opt in status_field["options"]}
    return project_id, status_field["id"], options_by_name


def find_project_item_by_task_id(project_id: str, task_id: str) -> str | None:
    """
    Use project items search by issue title: "[T-XXX] ..."
    Returns item_id or None.
    """
    search = f"[{task_id}]"
    query = """
    query($projectId: ID!, $search: String!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          items(first: 5, query: $search) {
            nodes {
              id
              content {
                ... on Issue {
                  number
                  title
                }
              }
            }
          }
        }
      }
    }
    """
    data = gql(query, {"projectId": project_id, "search": search})
    items = data["node"]["items"]["nodes"]
    if not items:
        return None
    item = items[0] if isinstance(items[0], dict) else None
    item_id = item.get("id") if item else None
    return str(item_id) if item_id else None


def add_issue_to_project(project_id: str, issue_node_id: str) -> str:
    """
    Add issue to ProjectV2 and return project item id.
    """
    mutation = """
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {
        projectId: $projectId,
        contentId: $contentId
      }) {
        item {
          id
        }
      }
    }
    """
    data = gql(mutation, {"projectId": project_id, "contentId": issue_node_id})
    item = data["addProjectV2ItemById"]["item"]
    return str(item["id"])


def set_project_status(
    project_id: str,
    item_id: str,
    field_id: str,
    status_name: str,
    options_by_name: dict[str, str],
) -> None:
    """
    status_name is the Status field option name in the project (for example, "Todo").
    """
    option_id = options_by_name.get(status_name)
    if not option_id:
        status_lower = status_name.lower()
        for name, option in options_by_name.items():
            if name.lower() == status_lower:
                option_id = option
                break
    if not option_id:
        print(f"[WARN] Status option '{status_name}' not found in project; skip")
        return

    mutation = """
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId,
        itemId: $itemId,
        fieldId: $fieldId,
        value: {
          singleSelectOptionId: $optionId
        }
      }) {
        projectV2Item {
          id
        }
      }
    }
    """
    gql(
        mutation,
        {
            "projectId": project_id,
            "itemId": item_id,
            "fieldId": field_id,
            "optionId": option_id,
        },
    )


STATUS_MAP = {
    "TODO": "Todo",
    "DOING": "In Progress",
    "BLOCKED": "Blocked",
    "DONE": "Done",
}


def sync() -> None:
    project_id, status_field_id, status_options_by_name = get_project_and_status_field()

    tasks = load_tasks()
    for task in tasks:
        task_id = task["id"]
        print(f"\n=== {task_id} ===")

        existing = find_issue_by_task_id(task_id)
        if existing is None:
            print("[+] create issue")
            issue = create_issue(task)
        else:
            print(f"[*] update issue #{existing['number']}")
            issue = update_issue(existing, task)

        issue_node_id = issue["node_id"]

        item_id = find_project_item_by_task_id(project_id, task_id)
        if item_id is None:
            print("[+] add issue to project")
            item_id = add_issue_to_project(project_id, issue_node_id)
        else:
            print(f"[*] project item {item_id}")

        task_status = task["status"]
        status_name = STATUS_MAP.get(task_status, "Todo")
        print(f"[*] set project Status -> {status_name}")
        set_project_status(
            project_id=project_id,
            item_id=item_id,
            field_id=status_field_id,
            status_name=status_name,
            options_by_name=status_options_by_name,
        )


if __name__ == "__main__":
    sync()

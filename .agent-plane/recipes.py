#!/usr/bin/env python3
"""Recipes helper CLI for Agent Plane.

Implements scan/show/compile/explain/refresh for recipe manifests and scenarios.
"""

from __future__ import annotations

import argparse
import fnmatch
import json
import os
import re
import sys
from datetime import UTC, datetime
from pathlib import Path
from typing import Any, cast

JsonDict = dict[str, object]
JsonList = list[object]

EXIT_INVALID_JSON = 2
EXIT_MISSING_PATH = 3
EXIT_SCHEMA_INVALID = 4
EXIT_ENV_MISSING = 5
EXIT_INPUTS_MISSING = 6
EXIT_CONTEXT_VIOLATION = 7

DEFAULT_EXCLUDE = [".env", ".git/**", ".agent-plane/tasks/**"]
DEFAULT_INLINE_POLICY = {"mode": "references_only", "inline_max_bytes": 20000, "snippet_lines": 80}
DEFAULT_LIMITS = {"max_files": 200, "max_total_bytes": 2_000_000, "max_file_bytes": 200_000}

BINARY_EXTENSIONS = {
    ".bin",
    ".bmp",
    ".gif",
    ".ico",
    ".jpg",
    ".jpeg",
    ".pdf",
    ".png",
    ".svg",
    ".tar",
    ".tif",
    ".tiff",
    ".zip",
}

TEMPLATE_PATTERN = re.compile(r"<([a-zA-Z0-9_-]+)>")
REPO_ROOT = Path(__file__).resolve().parent.parent
RECIPES_BUNDLE_VERSION = "recipes-bundle@1"
DEFAULT_BUNDLE_PATH = ".agent-plane/recipes/bundle.json"
DEFAULT_BUNDLE_CONTEXT_MODE = "inline_small"


class RecipeError(RuntimeError):
    def __init__(self, code: int, message: str) -> None:
        super().__init__(message)
        self.code = code


def fail(code: int, message: str) -> None:
    raise RecipeError(code, message)


def now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def read_json(path: Path) -> JsonDict:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        fail(EXIT_MISSING_PATH, f"Missing file: {path}")
    except json.JSONDecodeError as exc:
        fail(EXIT_INVALID_JSON, f"Invalid JSON in {path}: {exc}")
    if not isinstance(data, dict):
        fail(EXIT_SCHEMA_INVALID, f"Expected JSON object in {path}")
    return cast(JsonDict, data)


def write_json(path: Path, payload: JsonDict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")


def expect_dict(value: object, field: str) -> JsonDict:
    if not isinstance(value, dict):
        fail(EXIT_SCHEMA_INVALID, f"{field} must be an object")
    return cast(JsonDict, value)


def expect_list(value: object, field: str) -> JsonList:
    if not isinstance(value, list):
        fail(EXIT_SCHEMA_INVALID, f"{field} must be a list")
    return cast(JsonList, value)


def expect_str(value: object, field: str) -> str:
    if not isinstance(value, str) or not value.strip():
        fail(EXIT_SCHEMA_INVALID, f"{field} must be a non-empty string")
    return value.strip()


def optional_str(value: object) -> str | None:
    if isinstance(value, str) and value.strip():
        return value.strip()
    return None


def optional_str_list(value: object) -> list[str] | None:
    if value is None:
        return None
    if not isinstance(value, list):
        fail(EXIT_SCHEMA_INVALID, "Expected list of strings")
    items: list[str] = []
    for item in value:
        if not isinstance(item, str):
            fail(EXIT_SCHEMA_INVALID, "Expected list of strings")
        if item.strip():
            items.append(item.strip())
    return items


def coerce_inputs(value: object | None, field: str) -> JsonDict:
    if value is None:
        return {}
    if not isinstance(value, dict):
        fail(EXIT_SCHEMA_INVALID, f"{field} must be an object")
    return cast(JsonDict, value)


def normalize_relative_path(path_value: str, field: str) -> str:
    path = Path(path_value)
    if path.is_absolute() or ".." in path.parts or path_value.startswith("~"):
        fail(EXIT_SCHEMA_INVALID, f"{field} must be a relative path without '..' or '~'")
    normalized = path.as_posix()
    if not normalized:
        fail(EXIT_SCHEMA_INVALID, f"{field} must be a non-empty relative path")
    return normalized


def normalize_entrypoints(entrypoints: JsonDict) -> JsonDict:
    normalized = dict(entrypoints)
    cli = normalized.get("cli")
    if cli is not None:
        cli_dict = expect_dict(cli, "entrypoints.cli")
        cli_normalized = dict(cli_dict)
        if "command" not in cli_normalized:
            fail(EXIT_SCHEMA_INVALID, "entrypoints.cli.command is required")
        if "args_contract" not in cli_normalized:
            cli_normalized["args_contract"] = "json-file"
        normalized["cli"] = cli_normalized
    if "cli" not in normalized and "ide" not in normalized:
        fail(EXIT_SCHEMA_INVALID, "entrypoints must include at least one of ide or cli")
    return normalized


def normalize_outputs(outputs_value: object | None) -> list[JsonDict] | None:
    if outputs_value is None:
        return None
    outputs = expect_list(outputs_value, "scenario.outputs")
    normalized: list[JsonDict] = []
    for item in outputs:
        if not isinstance(item, dict):
            fail(EXIT_SCHEMA_INVALID, "scenario.outputs entries must be objects")
        entry = cast(JsonDict, item)
        output_id = expect_str(entry.get("id"), "scenario.outputs.id")
        path_template = expect_str(entry.get("path_template"), "scenario.outputs.path_template")
        output_entry: JsonDict = {"id": output_id, "path_template": path_template}
        description = optional_str(entry.get("description"))
        if description is not None:
            output_entry["description"] = description
        normalized.append(output_entry)
    return normalized


def normalize_scenario(entry: JsonDict) -> JsonDict:
    scenario_id = expect_str(entry.get("id"), "scenario.id")
    path_value = expect_str(entry.get("path"), "scenario.path")
    scenario: JsonDict = {"id": scenario_id, "path": normalize_relative_path(path_value, "scenario.path")}
    title = optional_str(entry.get("title"))
    if title is not None:
        scenario["title"] = title
    inputs_schema = optional_str(entry.get("inputs_schema"))
    if inputs_schema is not None:
        scenario["inputs_schema"] = normalize_relative_path(inputs_schema, "scenario.inputs_schema")
    outputs = normalize_outputs(entry.get("outputs"))
    if outputs is not None:
        scenario["outputs"] = outputs
    required_agents = optional_str_list(entry.get("required_agents"))
    if required_agents is not None:
        scenario["required_agents"] = required_agents
    return scenario


def normalize_tools(tools_value: object | None) -> list[JsonDict] | None:
    if tools_value is None:
        return None
    tools = expect_list(tools_value, "tools")
    normalized: list[JsonDict] = []
    for item in tools:
        if not isinstance(item, dict):
            fail(EXIT_SCHEMA_INVALID, "tools entries must be objects")
        entry = cast(JsonDict, item)
        tool_id = expect_str(entry.get("id"), "tools.id")
        tool_type = expect_str(entry.get("type"), "tools.type")
        command = expect_str(entry.get("command"), "tools.command")
        normalized_entry: JsonDict = {"id": tool_id, "type": tool_type, "command": command}
        for key in ("cwd", "reads", "writes", "network", "env", "how_to_run", "timeout_sec"):
            value = entry.get(key)
            if value is not None:
                normalized_entry[key] = value
        normalized.append(normalized_entry)
    return normalized


def normalize_manifest_v1(raw: JsonDict, slug: str) -> JsonDict:
    schema_version = expect_str(raw.get("schema_version"), "schema_version")
    if schema_version != "recipe-manifest@1":
        fail(EXIT_SCHEMA_INVALID, f"Unsupported schema_version: {schema_version}")
    manifest_slug = expect_str(raw.get("slug"), "slug")
    if manifest_slug != slug:
        fail(EXIT_SCHEMA_INVALID, f"Manifest slug '{manifest_slug}' does not match folder '{slug}'")
    name = expect_str(raw.get("name"), "name")
    summary = expect_str(raw.get("summary"), "summary")
    tags = optional_str_list(raw.get("tags"))
    if tags is None:
        fail(EXIT_SCHEMA_INVALID, "tags must be a non-empty list of strings")
    entrypoints = normalize_entrypoints(expect_dict(raw.get("entrypoints"), "entrypoints"))
    scenarios_raw = expect_list(raw.get("scenarios"), "scenarios")
    scenarios = [normalize_scenario(cast(JsonDict, item)) for item in scenarios_raw]
    if not scenarios:
        fail(EXIT_SCHEMA_INVALID, "scenarios must not be empty")
    normalized: JsonDict = {
        "schema_version": "recipe-manifest@1",
        "slug": manifest_slug,
        "name": name,
        "summary": summary,
        "tags": tags,
        "entrypoints": entrypoints,
        "scenarios": scenarios,
    }
    version = optional_str(raw.get("version"))
    if version is not None:
        normalized["version"] = version
    tools = normalize_tools(raw.get("tools"))
    if tools is not None:
        normalized["tools"] = tools
    env = optional_str_list(raw.get("env"))
    if env is not None:
        normalized["env"] = env
    for key in ("context", "requires", "safety"):
        value = raw.get(key)
        if value is not None:
            if not isinstance(value, dict):
                fail(EXIT_SCHEMA_INVALID, f"{key} must be an object")
            normalized[key] = value
    return normalized


def normalize_legacy_manifest(raw: JsonDict, slug: str) -> JsonDict:
    name = optional_str(raw.get("name")) or slug
    summary = optional_str(raw.get("summary")) or ""
    tags = optional_str_list(raw.get("tags")) or []
    entrypoint_raw = raw.get("entrypoint")
    if entrypoint_raw is None:
        fail(EXIT_SCHEMA_INVALID, "Legacy manifest requires entrypoint")
    entrypoint = expect_dict(entrypoint_raw, "entrypoint")
    command = expect_str(entrypoint.get("command"), "entrypoint.command")
    entrypoints: JsonDict = {"cli": {"command": command, "args_contract": "json-file"}}
    scenarios_value = raw.get("scenarios")
    scenarios: list[JsonDict] = []
    if scenarios_value is None:
        fail(EXIT_SCHEMA_INVALID, "Legacy manifest requires scenarios list")
    scenario_paths = expect_list(scenarios_value, "scenarios")
    response_template = optional_str(entrypoint.get("response"))
    for scenario_path in scenario_paths:
        if not isinstance(scenario_path, str):
            fail(EXIT_SCHEMA_INVALID, "scenarios must be a list of strings")
        normalized_path = normalize_relative_path(scenario_path, "scenarios[]")
        scenario_id = Path(normalized_path).stem
        scenario: JsonDict = {"id": scenario_id, "path": normalized_path}
        if response_template is not None:
            scenario["outputs"] = [{"id": "response", "path_template": response_template}]
        scenarios.append(scenario)
    normalized: JsonDict = {
        "schema_version": "recipe-manifest@1",
        "slug": slug,
        "name": name,
        "summary": summary,
        "tags": tags,
        "entrypoints": entrypoints,
        "scenarios": scenarios,
    }
    description = optional_str(entrypoint.get("description"))
    tool_entry: JsonDict = {"id": "run", "type": "shell", "command": command}
    if description is not None:
        tool_entry["how_to_run"] = description
    normalized["tools"] = [tool_entry]
    env_value = raw.get("env")
    if isinstance(env_value, dict):
        normalized["env"] = sorted(env_value.keys())
    elif isinstance(env_value, list):
        normalized["env"] = optional_str_list(env_value) or []
    return normalized


def load_manifest(manifest_path: Path, slug: str) -> JsonDict:
    raw = read_json(manifest_path)
    if raw.get("schema_version") == "recipe-manifest@1":
        normalized = normalize_manifest_v1(raw, slug)
    else:
        normalized = normalize_legacy_manifest(raw, slug)
    return normalized


def extract_markdown_title(path: Path) -> str | None:
    try:
        for line in path.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if stripped.startswith("# "):
                title = stripped[2:].strip()
                if title:
                    return title
    except FileNotFoundError:
        fail(EXIT_MISSING_PATH, f"Missing scenario file: {path}")
    return None


def ensure_scenario_titles(manifest: JsonDict, recipe_dir: Path) -> JsonDict:
    scenarios = expect_list(manifest.get("scenarios"), "scenarios")
    updated: list[JsonDict] = []
    for item in scenarios:
        scenario = cast(JsonDict, item)
        title = optional_str(scenario.get("title"))
        path_value = expect_str(scenario.get("path"), "scenario.path")
        scenario_path = recipe_dir / path_value
        if title is None:
            title = extract_markdown_title(scenario_path) or Path(path_value).stem
        updated_scenario = dict(scenario)
        updated_scenario["title"] = title
        updated.append(updated_scenario)
    updated_manifest = dict(manifest)
    updated_manifest["scenarios"] = updated
    return updated_manifest


def sanitize_path_value(value: str) -> str:
    sanitized = re.sub(r"\s+", "-", value.strip())
    sanitized = sanitized.replace("/", "-").replace("\\", "-")
    sanitized = re.sub(r"[^A-Za-z0-9._-]", "-", sanitized)
    sanitized = sanitized.replace("..", "-")
    sanitized = sanitized.strip("-")
    return sanitized


def substitute_template(text: str, variables: dict[str, str], pending: set[str], sanitize: bool) -> str:
    def replace(match: re.Match[str]) -> str:
        key = match.group(1)
        raw_value = variables.get(key)
        if raw_value is None or raw_value == "":
            pending.add(key)
            return match.group(0)
        value = sanitize_path_value(raw_value) if sanitize else raw_value
        if not value:
            pending.add(key)
            return match.group(0)
        return value

    return TEMPLATE_PATTERN.sub(replace, text)


def build_pending_actions(missing_inputs: set[str], missing_env: set[str]) -> list[str]:
    actions = [f"Provide input: {key}" for key in sorted(missing_inputs)]
    actions.extend(f"Set {key}" for key in sorted(missing_env))
    return actions


def matches_any(path_value: str, patterns: list[str]) -> bool:
    return any(fnmatch.fnmatch(path_value, pattern) for pattern in patterns)


def normalize_context_policy(context_value: object | None) -> JsonDict:
    if context_value is None:
        return {
            "include": [],
            "exclude": DEFAULT_EXCLUDE,
            "inline_policy": DEFAULT_INLINE_POLICY,
            **DEFAULT_LIMITS,
        }
    if not isinstance(context_value, dict):
        fail(EXIT_SCHEMA_INVALID, "context must be an object")
    context = dict(context_value)
    include = optional_str_list(context.get("include")) or []
    exclude = optional_str_list(context.get("exclude")) or []
    inline_policy = context.get("inline_policy") or {}
    if not isinstance(inline_policy, dict):
        fail(EXIT_SCHEMA_INVALID, "context.inline_policy must be an object")
    policy = dict(DEFAULT_INLINE_POLICY)
    policy.update(inline_policy)
    max_files = context.get("max_files", DEFAULT_LIMITS["max_files"])
    max_total_bytes = context.get("max_total_bytes", DEFAULT_LIMITS["max_total_bytes"])
    max_file_bytes = context.get("max_file_bytes", DEFAULT_LIMITS["max_file_bytes"])
    for label, value in (
        ("context.max_files", max_files),
        ("context.max_total_bytes", max_total_bytes),
        ("context.max_file_bytes", max_file_bytes),
    ):
        if value is not None and not isinstance(value, int):
            fail(EXIT_SCHEMA_INVALID, f"{label} must be an integer")
    return {
        "include": include,
        "exclude": DEFAULT_EXCLUDE + exclude,
        "inline_policy": policy,
        "max_files": max_files,
        "max_total_bytes": max_total_bytes,
        "max_file_bytes": max_file_bytes,
    }


def resolve_include_paths(repo_root: Path, include: list[str], warnings: list[str]) -> list[Path]:
    matched: set[Path] = set()
    for pattern in include:
        if pattern.startswith(("/", "~")) or ".." in Path(pattern).parts:
            warnings.append(f"Skipping unsafe include pattern: {pattern}")
            continue
        for path in repo_root.glob(pattern):
            if path.is_file():
                matched.add(path)
    return sorted(matched, key=lambda p: p.as_posix())


def build_context(policy: JsonDict, repo_root: Path) -> tuple[JsonDict, bool]:
    include = optional_str_list(policy.get("include")) or []
    exclude = optional_str_list(policy.get("exclude")) or []
    inline_policy = expect_dict(policy.get("inline_policy"), "context.inline_policy")
    warnings: list[str] = []
    matched_paths = resolve_include_paths(repo_root, include, warnings)
    files: list[JsonDict] = []
    violation = False
    max_files = policy.get("max_files")
    max_total_bytes = policy.get("max_total_bytes")
    max_file_bytes = policy.get("max_file_bytes")
    total_bytes = 0

    for path in matched_paths:
        relative = path.relative_to(repo_root).as_posix()
        if matches_any(relative, exclude):
            continue
        if isinstance(max_files, int) and len(files) >= max_files:
            warnings.append("Context max_files exceeded; additional files skipped.")
            violation = True
            break
        size = path.stat().st_size
        if isinstance(max_total_bytes, int) and total_bytes + size > max_total_bytes:
            warnings.append("Context max_total_bytes exceeded; additional files skipped.")
            violation = True
            break
        total_bytes += size
        try:
            file_bytes = path.read_bytes()
        except FileNotFoundError:
            fail(EXIT_MISSING_PATH, f"Missing context file: {path}")
        file_hash = _sha256_hex(file_bytes)
        entry: JsonDict = {"path": relative, "sha256": file_hash, "size": size}
        if isinstance(max_file_bytes, int) and size > max_file_bytes:
            warnings.append(f"Context max_file_bytes exceeded for {relative}")
            violation = True
            entry["mode"] = "reference"
            files.append(entry)
            continue
        is_binary_file = path.suffix.lower() in BINARY_EXTENSIONS or b"\0" in file_bytes[:1024]
        if is_binary_file:
            entry["mode"] = "reference"
            files.append(entry)
            continue
        mode = optional_str(inline_policy.get("mode")) or "references_only"
        inline_max = inline_policy.get("inline_max_bytes")
        snippet_lines = inline_policy.get("snippet_lines")
        if mode == "references_only":
            entry["mode"] = "reference"
        elif mode == "inline_small":
            if isinstance(inline_max, int) and size <= inline_max:
                entry["mode"] = "inline"
                entry["content"] = file_bytes.decode("utf-8", errors="replace")
            else:
                entry["mode"] = "reference"
        elif mode == "inline_with_snippets":
            if isinstance(inline_max, int) and size <= inline_max:
                entry["mode"] = "inline"
                entry["content"] = file_bytes.decode("utf-8", errors="replace")
            else:
                entry["mode"] = "snippet"
                entry["snippet"] = _snippet(file_bytes, snippet_lines)
        else:
            entry["mode"] = "reference"
        files.append(entry)

    context = {"policy": policy, "files": files, "warnings": warnings}
    return context, violation


def _sha256_hex(data: bytes) -> str:
    import hashlib

    return hashlib.sha256(data).hexdigest()


def _snippet(data: bytes, snippet_lines: object) -> str:
    text = data.decode("utf-8", errors="replace")
    if isinstance(snippet_lines, int) and snippet_lines > 0:
        return "\n".join(text.splitlines()[:snippet_lines])
    return "\n".join(text.splitlines()[:80])


def render_compiled_context(files: list[JsonDict]) -> str:
    if not files:
        return "No context files included."
    lines: list[str] = []
    for entry in files:
        path = expect_str(entry.get("path"), "context.files.path")
        mode = expect_str(entry.get("mode"), "context.files.mode")
        size = entry.get("size", 0)
        sha = entry.get("sha256", "")
        lines.append(f"- @{path} (mode={mode}, size={size}, sha256={sha})")
        if mode == "inline" and isinstance(entry.get("content"), str):
            lines.append("")
            lines.append("```text")
            lines.append(entry["content"])
            lines.append("```")
        if mode == "snippet" and isinstance(entry.get("snippet"), str):
            lines.append("")
            lines.append("```text")
            lines.append(entry["snippet"])
            lines.append("```")
    return "\n".join(lines)


def render_bundle_md(bundle: JsonDict) -> str:
    recipe = cast(JsonDict, bundle.get("recipe", {}))
    scenario = cast(JsonDict, bundle.get("scenario", {}))
    recipe_slug = recipe.get("slug")
    recipe_version = recipe.get("version")
    scenario_id = scenario.get("id")
    scenario_title = scenario.get("title")
    lines: list[str] = [
        "# Recipe Bundle",
        "",
        f"Recipe: {recipe_slug} ({recipe_version})",
        f"Scenario: {scenario_id} ({scenario_title})",
        "",
        "## Inputs",
        "```json",
        json.dumps(bundle.get("inputs", {}), indent=2, ensure_ascii=True),
        "```",
        "",
    ]
    env_missing = cast(list[str], bundle.get("env_missing", []))
    lines.append("## Env missing")
    lines.append("\n".join(f"- {key}" for key in env_missing) if env_missing else "- None")
    lines.append("")
    context = cast(JsonDict, bundle.get("context", {}))
    context_files = cast(list[JsonDict], context.get("files", []))
    lines.append("## Context")
    lines.append("\n".join(f"- @{entry.get('path')}" for entry in context_files) if context_files else "- None")
    lines.append("")
    lines.append("## Tool plan")
    tool_plan = cast(list[JsonDict], bundle.get("tool_plan", []))
    if tool_plan:
        for tool in tool_plan:
            lines.append(f"- {tool.get('tool_id')}: {tool.get('command')}")
            how = tool.get("how_to_run")
            if isinstance(how, str) and how:
                lines.append(f"  - {how}")
    else:
        lines.append("- None")
    lines.append("")
    outputs = cast(list[JsonDict], bundle.get("outputs_expected", []))
    lines.append("## Outputs")
    if outputs:
        for output in outputs:
            lines.append(f"- {output.get('id')}: {output.get('path_template')}")
    else:
        lines.append("- None")
    lines.append("")
    pending = cast(list[str], bundle.get("pending_actions", []))
    lines.append("## Pending Actions")
    lines.append("\n".join(f"- {item}" for item in pending) if pending else "- None")
    lines.append("")
    return "\n".join(lines)


def validate_inputs(schema: JsonDict, inputs: JsonDict) -> tuple[set[str], list[str]]:
    missing: set[str] = set()
    errors: list[str] = []
    if schema.get("type") not in (None, "object"):
        fail(EXIT_SCHEMA_INVALID, "inputs_schema.type must be 'object'")
    required = schema.get("required", [])
    if required:
        if not isinstance(required, list):
            fail(EXIT_SCHEMA_INVALID, "inputs_schema.required must be a list")
        for key in required:
            if not isinstance(key, str):
                fail(EXIT_SCHEMA_INVALID, "inputs_schema.required must be a list of strings")
            value = inputs.get(key)
            if value is None or (isinstance(value, str) and not value.strip()):
                missing.add(key)
    properties = schema.get("properties", {})
    if isinstance(properties, dict):
        for key, spec in properties.items():
            if key not in inputs:
                continue
            if not isinstance(spec, dict):
                continue
            expected = spec.get("type")
            if expected is None:
                continue
            value = inputs.get(key)
            if expected == "string" and not isinstance(value, str):
                errors.append(f"{key} must be string")
            if expected == "number" and not isinstance(value, (int, float)):
                errors.append(f"{key} must be number")
            if expected == "boolean" and not isinstance(value, bool):
                errors.append(f"{key} must be boolean")
    return missing, errors


def build_tool_plan(manifest: JsonDict, recipe_dir: Path) -> list[JsonDict]:
    tools_value = manifest.get("tools")
    if tools_value is None:
        return []
    tools = expect_list(tools_value, "tools")
    plan: list[JsonDict] = []
    for item in tools:
        tool = cast(JsonDict, item)
        entry: JsonDict = {
            "tool_id": tool.get("id"),
            "type": tool.get("type"),
            "command": tool.get("command"),
            "cwd": tool.get("cwd", str(recipe_dir)),
            "network": tool.get("network", "deny"),
            "writes_allowlist": tool.get("writes", []),
            "reads_allowlist": tool.get("reads", []),
            "timeout_sec": tool.get("timeout_sec"),
            "how_to_run": tool.get("how_to_run"),
        }
        plan.append(entry)
    return plan


def compile_bundle(
    slug: str,
    scenario_id: str,
    inputs_path: Path | None,
    out_path: Path,
    out_md_path: Path | None,
    stdout: bool,
    validate_env: bool,
    validate_inputs_flag: bool,
    strict: bool,
    context_mode: str | None,
    recipes_dir: Path,
    inputs_override: JsonDict | None = None,
) -> None:
    recipe_dir = recipes_dir / slug
    manifest_path = recipe_dir / "manifest.json"
    manifest = load_manifest(manifest_path, slug)
    manifest = ensure_scenario_titles(manifest, recipe_dir)
    scenarios = expect_list(manifest.get("scenarios"), "scenarios")
    scenario: JsonDict | None = None
    for item in scenarios:
        candidate = cast(JsonDict, item)
        if candidate.get("id") == scenario_id:
            scenario = candidate
            break
    if scenario is None:
        fail(EXIT_SCHEMA_INVALID, f"Scenario '{scenario_id}' not found for recipe '{slug}'")
    scenario_path = recipe_dir / expect_str(scenario.get("path"), "scenario.path")
    scenario_md = scenario_path.read_text(encoding="utf-8")
    inputs: JsonDict = {}
    if inputs_override is not None:
        inputs = coerce_inputs(inputs_override, "inputs")
    elif inputs_path is not None:
        inputs = read_json(inputs_path)
    missing_inputs: set[str] = set()
    input_errors: list[str] = []
    if validate_inputs_flag and "inputs_schema" in scenario:
        schema_path = recipe_dir / expect_str(scenario.get("inputs_schema"), "scenario.inputs_schema")
        schema = read_json(schema_path)
        missing_inputs, input_errors = validate_inputs(schema, inputs)
        if (missing_inputs or input_errors) and strict:
            fail(EXIT_INPUTS_MISSING, "Missing or invalid required inputs")
    env_required = optional_str_list(manifest.get("env")) or []
    missing_env = {key for key in env_required if not os.environ.get(key)}
    if missing_env and strict and validate_env:
        fail(EXIT_ENV_MISSING, "Missing required environment variables")
    context_policy = normalize_context_policy(manifest.get("context"))
    if context_mode is not None:
        context_policy = dict(context_policy)
        inline_policy = expect_dict(context_policy.get("inline_policy"), "context.inline_policy")
        inline_policy = dict(inline_policy)
        inline_policy["mode"] = context_mode
        context_policy["inline_policy"] = inline_policy
    context, violation = build_context(context_policy, REPO_ROOT)
    if violation:
        fail(EXIT_CONTEXT_VIOLATION, "Context policy violation")
    variables: dict[str, str] = {"slug": slug}
    version = optional_str(manifest.get("version"))
    if version is not None:
        variables["version"] = version
    for key, value in inputs.items():
        variables[key] = str(value)
    pending_vars: set[str] = set()
    compiled_prompt = substitute_template(scenario_md, variables, pending_vars, sanitize=False)
    outputs_expected = []
    outputs_value = scenario.get("outputs")
    if outputs_value is not None:
        outputs = expect_list(outputs_value, "scenario.outputs")
        for output in outputs:
            output_entry = cast(JsonDict, output)
            path_template = expect_str(output_entry.get("path_template"), "scenario.outputs.path_template")
            substituted = substitute_template(path_template, variables, pending_vars, sanitize=True)
            updated = dict(output_entry)
            updated["path_template"] = substituted
            outputs_expected.append(updated)
    missing_inputs.update(pending_vars)
    pending_actions = build_pending_actions(missing_inputs, missing_env if validate_env else set())
    compiled_context = render_compiled_context(cast(list[JsonDict], context.get("files", [])))
    compiled_prompt = compiled_prompt.rstrip() + "\n\n## Compiled Context\n" + compiled_context + "\n"
    bundle: JsonDict = {
        "bundle_version": "recipe-bundle@1",
        "generated_at": now_iso(),
        "recipe": {"slug": slug, "version": version},
        "scenario": {"id": scenario_id, "title": scenario.get("title"), "path": scenario.get("path")},
        "inputs": inputs,
        "env_required": env_required,
        "env_missing": sorted(missing_env),
        "context": context,
        "compiled_prompt_md": compiled_prompt,
        "tool_plan": build_tool_plan(manifest, recipe_dir),
        "outputs_expected": outputs_expected,
        "pending_actions": pending_actions,
        "safety": manifest.get(
            "safety",
            {"no_invented_inputs": True, "no_network_by_default": True, "writes_must_match_manifest": True},
        ),
    }
    write_json(out_path, bundle)
    if out_md_path is not None:
        out_md_path.parent.mkdir(parents=True, exist_ok=True)
        out_md_path.write_text(render_bundle_md(bundle), encoding="utf-8")
    if stdout:
        print(json.dumps(bundle, indent=2, ensure_ascii=True))


def scan_recipes(recipes_dir: Path, output_path: Path, strict: bool) -> None:
    manifests = sorted(recipes_dir.glob("*/manifest.json"))
    recipes: list[JsonDict] = []
    for manifest_path in manifests:
        slug = manifest_path.parent.name
        try:
            manifest = load_manifest(manifest_path, slug)
            manifest = ensure_scenario_titles(manifest, manifest_path.parent)
        except RecipeError as exc:
            if strict:
                raise
            print(f"Skipping {slug}: {exc}", file=sys.stderr)
            continue
        recipe_entry: JsonDict = {
            "slug": manifest.get("slug"),
            "name": manifest.get("name"),
            "summary": manifest.get("summary"),
            "tags": manifest.get("tags"),
            "version": manifest.get("version"),
            "entrypoints": manifest.get("entrypoints"),
            "scenarios": manifest.get("scenarios"),
            "tools": manifest.get("tools", []),
            "requires": manifest.get("requires", {}),
            "env": manifest.get("env", []),
        }
        recipes.append(recipe_entry)
    inventory: JsonDict = {"generated_at": now_iso(), "schema_version": "recipes-inventory@1", "recipes": recipes}
    write_json(output_path, inventory)


def show_manifest(slug: str, recipes_dir: Path, as_json: bool) -> None:
    manifest_path = recipes_dir / slug / "manifest.json"
    manifest = load_manifest(manifest_path, slug)
    manifest = ensure_scenario_titles(manifest, manifest_path.parent)
    if as_json:
        print(json.dumps(manifest, indent=2, ensure_ascii=True))
        return
    print(f"Recipe: {manifest.get('name')} ({manifest.get('slug')})")
    print(f"Summary: {manifest.get('summary')}")
    scenarios = cast(list[JsonDict], manifest.get("scenarios", []))
    if scenarios:
        print("Scenarios:")
        for scenario in scenarios:
            print(f"- {scenario.get('id')}: {scenario.get('title')}")


def explain_bundle(
    slug: str,
    scenario_id: str,
    inputs_path: Path | None,
    recipes_dir: Path,
    validate_env: bool,
    validate_inputs_flag: bool,
    strict: bool,
    context_mode: str | None,
) -> None:
    output = REPO_ROOT / ".agent-plane/.runs/explain.bundle.json"
    compile_bundle(
        slug=slug,
        scenario_id=scenario_id,
        inputs_path=inputs_path,
        out_path=output,
        out_md_path=None,
        stdout=False,
        validate_env=validate_env,
        validate_inputs_flag=validate_inputs_flag,
        strict=strict,
        context_mode=context_mode,
        recipes_dir=recipes_dir,
    )
    bundle = read_json(output)
    print(render_bundle_md(bundle))


def load_scenario_docs(scenario: JsonDict, recipe_dir: Path) -> JsonDict:
    scenario_id = expect_str(scenario.get("id"), "scenario.id")
    scenario_path_value = expect_str(scenario.get("path"), "scenario.path")
    scenario_path = recipe_dir / scenario_path_value
    prompt_md = scenario_path.read_text(encoding="utf-8")
    inputs_schema_path = optional_str(scenario.get("inputs_schema"))
    inputs_schema: JsonDict | None = None
    if inputs_schema_path is not None:
        inputs_schema = read_json(recipe_dir / inputs_schema_path)
    entry: JsonDict = {
        "id": scenario_id,
        "title": scenario.get("title"),
        "path": scenario_path_value,
        "prompt_md": prompt_md,
        "inputs_schema": inputs_schema,
        "outputs": scenario.get("outputs", []),
        "required_agents": scenario.get("required_agents", []),
    }
    return entry


def build_recipes_bundle(
    recipes_dir: Path,
    context_mode: str | None,
    strict: bool,
) -> JsonDict:
    manifests = sorted(recipes_dir.glob("*/manifest.json"))
    recipes: list[JsonDict] = []
    for manifest_path in manifests:
        slug = manifest_path.parent.name
        try:
            manifest = load_manifest(manifest_path, slug)
            manifest = ensure_scenario_titles(manifest, manifest_path.parent)
        except RecipeError as exc:
            if strict:
                raise
            print(f"Skipping {slug}: {exc}", file=sys.stderr)
            continue
        recipe_dir = manifest_path.parent
        context_policy = normalize_context_policy(manifest.get("context"))
        if context_mode is not None:
            inline_policy = expect_dict(context_policy.get("inline_policy"), "context.inline_policy")
            inline_policy = dict(inline_policy)
            inline_policy["mode"] = context_mode
            context_policy["inline_policy"] = inline_policy
        context, violation = build_context(context_policy, REPO_ROOT)
        if violation and strict:
            fail(EXIT_CONTEXT_VIOLATION, f"Context policy violation for recipe '{slug}'")
        scenarios = [
            load_scenario_docs(cast(JsonDict, item), recipe_dir)
            for item in expect_list(manifest.get("scenarios"), "scenarios")
        ]
        recipe_entry: JsonDict = {
            "slug": manifest.get("slug"),
            "name": manifest.get("name"),
            "summary": manifest.get("summary"),
            "tags": manifest.get("tags"),
            "version": manifest.get("version"),
            "entrypoints": manifest.get("entrypoints"),
            "env": manifest.get("env", []),
            "requires": manifest.get("requires", {}),
            "safety": manifest.get("safety", {}),
            "tools": manifest.get("tools", []),
            "tool_plan": build_tool_plan(manifest, recipe_dir),
            "context": context,
            "scenarios": scenarios,
        }
        recipes.append(recipe_entry)
    return {"bundle_version": RECIPES_BUNDLE_VERSION, "generated_at": now_iso(), "recipes": recipes}


def show_bundle_summary(bundle: JsonDict, as_json: bool) -> None:
    recipes_raw = expect_list(bundle.get("recipes"), "bundle.recipes")
    summaries: list[JsonDict] = []
    for item in recipes_raw:
        recipe = expect_dict(item, "bundle.recipes[]")
        scenarios_raw = expect_list(recipe.get("scenarios"), "recipe.scenarios")
        scenarios = []
        for scenario_item in scenarios_raw:
            scenario = expect_dict(scenario_item, "recipe.scenarios[]")
            scenarios.append(
                {
                    "id": scenario.get("id"),
                    "title": scenario.get("title"),
                }
            )
        summaries.append(
            {
                "slug": recipe.get("slug"),
                "name": recipe.get("name"),
                "summary": recipe.get("summary"),
                "tags": recipe.get("tags"),
                "scenarios": scenarios,
            }
        )
    if as_json:
        print(json.dumps({"recipes": summaries}, indent=2, ensure_ascii=True))
        return
    print(f"Recipes: {len(summaries)}")
    for recipe in summaries:
        slug = recipe.get("slug")
        name = recipe.get("name")
        summary = recipe.get("summary")
        print(f"- {slug}: {name}")
        if summary:
            print(f"  Summary: {summary}")
        tags = recipe.get("tags") or []
        if isinstance(tags, list) and tags:
            print(f"  Tags: {', '.join(str(t) for t in tags)}")
        scenarios = recipe.get("scenarios") or []
        if isinstance(scenarios, list) and scenarios:
            labels = ", ".join(
                f"{item.get('id')}: {item.get('title')}" for item in scenarios if isinstance(item, dict)
            )
            if labels:
                print(f"  Scenarios: {labels}")


def show_bundle_recipe(bundle: JsonDict, slug: str, as_json: bool) -> None:
    recipes_raw = expect_list(bundle.get("recipes"), "bundle.recipes")
    target: JsonDict | None = None
    for item in recipes_raw:
        recipe = expect_dict(item, "bundle.recipes[]")
        if recipe.get("slug") == slug:
            target = recipe
            break
    if target is None:
        fail(EXIT_SCHEMA_INVALID, f"Recipe '{slug}' not found in bundle")
    if as_json:
        print(json.dumps(target, indent=2, ensure_ascii=True))
        return
    print(f"Recipe: {target.get('name')} ({target.get('slug')})")
    print(f"Summary: {target.get('summary')}")
    tags = target.get("tags") or []
    if isinstance(tags, list) and tags:
        print(f"Tags: {', '.join(str(t) for t in tags)}")
    version = target.get("version")
    if version:
        print(f"Version: {version}")
    entrypoints = target.get("entrypoints")
    if entrypoints:
        print("Entrypoints:")
        print(json.dumps(entrypoints, indent=2, ensure_ascii=True))
    env = target.get("env") or []
    if isinstance(env, list) and env:
        print(f"Env: {', '.join(str(e) for e in env)}")
    tools = target.get("tools") or []
    if isinstance(tools, list) and tools:
        print("Tools:")
        for tool in tools:
            if not isinstance(tool, dict):
                continue
            print(f"- {tool.get('id')}: {tool.get('command')}")
    tool_plan = target.get("tool_plan") or []
    if isinstance(tool_plan, list) and tool_plan:
        print("Tool plan:")
        print(json.dumps(tool_plan, indent=2, ensure_ascii=True))
    context = target.get("context") or {}
    if isinstance(context, dict) and context:
        print("Context snapshot:")
        print(json.dumps(context, indent=2, ensure_ascii=True))
    scenarios = target.get("scenarios") or []
    if isinstance(scenarios, list) and scenarios:
        print("Scenarios:")
        for scenario in scenarios:
            if not isinstance(scenario, dict):
                continue
            print(f"## {scenario.get('id')} - {scenario.get('title')}")
            prompt = scenario.get("prompt_md")
            if isinstance(prompt, str) and prompt.strip():
                print(prompt.rstrip())
            schema = scenario.get("inputs_schema")
            if isinstance(schema, dict):
                print("Inputs schema:")
                print(json.dumps(schema, indent=2, ensure_ascii=True))
            outputs = scenario.get("outputs")
            if outputs:
                print("Outputs:")
                print(json.dumps(outputs, indent=2, ensure_ascii=True))
            required_agents = scenario.get("required_agents")
            if required_agents:
                print(f"Required agents: {', '.join(str(a) for a in required_agents)}")


def refresh_bundle(
    bundle_path: Path,
    out_path: Path | None,
    out_md_path: Path | None,
    recipes_dir: Path,
    validate_env: bool,
    validate_inputs_flag: bool,
    strict: bool,
    context_mode: str | None,
) -> None:
    bundle = read_json(bundle_path)
    recipe = expect_dict(bundle.get("recipe"), "bundle.recipe")
    slug = expect_str(recipe.get("slug"), "bundle.recipe.slug")
    scenario = expect_dict(bundle.get("scenario"), "bundle.scenario")
    scenario_id = expect_str(scenario.get("id"), "bundle.scenario.id")
    inputs = coerce_inputs(bundle.get("inputs"), "bundle.inputs")
    target_out = out_path or bundle_path
    target_md = out_md_path
    if target_md is None:
        candidate = bundle_path.with_suffix(".md")
        if candidate.exists():
            target_md = candidate
    compile_bundle(
        slug=slug,
        scenario_id=scenario_id,
        inputs_path=None,
        out_path=target_out,
        out_md_path=target_md,
        stdout=False,
        validate_env=validate_env,
        validate_inputs_flag=validate_inputs_flag,
        strict=strict,
        context_mode=context_mode,
        recipes_dir=recipes_dir,
        inputs_override=inputs,
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="recipes.py", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    subparsers = parser.add_subparsers(dest="command", required=True)

    scan_parser = subparsers.add_parser("scan", help="Scan recipes and generate inventory")
    scan_parser.add_argument("--recipes-dir", default=".agent-plane/recipes")
    scan_parser.add_argument("--output", default="docs/recipes-inventory.json")
    scan_parser.add_argument("--strict", action=argparse.BooleanOptionalAction, default=True)
    scan_parser.set_defaults(func=handle_scan)

    show_parser = subparsers.add_parser("show", help="Show normalized manifest")
    show_parser.add_argument("slug")
    show_parser.add_argument("--recipes-dir", default=".agent-plane/recipes")
    show_parser.add_argument("--json", action="store_true")
    show_parser.set_defaults(func=handle_show)

    compile_parser = subparsers.add_parser("compile", help="Compile scenario bundle")
    compile_parser.add_argument("slug")
    compile_parser.add_argument("--scenario", required=True)
    compile_parser.add_argument("--inputs")
    compile_parser.add_argument("--out", required=True)
    compile_parser.add_argument("--out-md")
    compile_parser.add_argument("--stdout", action="store_true")
    compile_parser.add_argument("--validate-env", action=argparse.BooleanOptionalAction, default=True)
    compile_parser.add_argument("--validate-inputs", action=argparse.BooleanOptionalAction, default=True)
    compile_parser.add_argument("--strict", action=argparse.BooleanOptionalAction, default=False)
    compile_parser.add_argument("--context-mode", choices=["references_only", "inline_small", "inline_with_snippets"])
    compile_parser.add_argument("--recipes-dir", default=".agent-plane/recipes")
    compile_parser.set_defaults(func=handle_compile)

    explain_parser = subparsers.add_parser("explain", help="Generate a human-readable explanation")
    explain_parser.add_argument("slug")
    explain_parser.add_argument("--scenario", required=True)
    explain_parser.add_argument("--inputs")
    explain_parser.add_argument("--validate-env", action=argparse.BooleanOptionalAction, default=True)
    explain_parser.add_argument("--validate-inputs", action=argparse.BooleanOptionalAction, default=True)
    explain_parser.add_argument("--strict", action=argparse.BooleanOptionalAction, default=False)
    explain_parser.add_argument("--context-mode", choices=["references_only", "inline_small", "inline_with_snippets"])
    explain_parser.add_argument("--recipes-dir", default=".agent-plane/recipes")
    explain_parser.set_defaults(func=handle_explain)

    refresh_parser = subparsers.add_parser("refresh", help="Refresh an existing bundle.json in place")
    refresh_parser.add_argument("--bundle", required=True)
    refresh_parser.add_argument("--out")
    refresh_parser.add_argument("--out-md")
    refresh_parser.add_argument("--validate-env", action=argparse.BooleanOptionalAction, default=True)
    refresh_parser.add_argument("--validate-inputs", action=argparse.BooleanOptionalAction, default=True)
    refresh_parser.add_argument("--strict", action=argparse.BooleanOptionalAction, default=False)
    refresh_parser.add_argument("--context-mode", choices=["references_only", "inline_small", "inline_with_snippets"])
    refresh_parser.add_argument("--recipes-dir", default=".agent-plane/recipes")
    refresh_parser.set_defaults(func=handle_refresh)

    bundle_parser = subparsers.add_parser("bundle", help="Build or show the global recipes bundle")
    bundle_sub = bundle_parser.add_subparsers(dest="bundle_command", required=True)

    bundle_build = bundle_sub.add_parser("build", help="Build the global recipes bundle")
    bundle_build.add_argument("--out", default=DEFAULT_BUNDLE_PATH)
    bundle_build.add_argument(
        "--context-mode",
        choices=["references_only", "inline_small", "inline_with_snippets"],
        default=DEFAULT_BUNDLE_CONTEXT_MODE,
    )
    bundle_build.add_argument("--recipes-dir", default=".agent-plane/recipes")
    bundle_build.add_argument("--strict", action=argparse.BooleanOptionalAction, default=True)
    bundle_build.set_defaults(func=handle_bundle_build)

    bundle_show = bundle_sub.add_parser("show", help="Show bundle summary or recipe documentation")
    bundle_show.add_argument("--bundle", required=True)
    show_mode = bundle_show.add_mutually_exclusive_group(required=True)
    show_mode.add_argument("--summary", action="store_true")
    show_mode.add_argument("--recipe")
    bundle_show.add_argument("--json", action="store_true")
    bundle_show.set_defaults(func=handle_bundle_show)

    return parser


def handle_scan(args: argparse.Namespace) -> None:
    scan_recipes(Path(args.recipes_dir), Path(args.output), args.strict)


def handle_show(args: argparse.Namespace) -> None:
    show_manifest(args.slug, Path(args.recipes_dir), args.json)


def handle_compile(args: argparse.Namespace) -> None:
    compile_bundle(
        slug=args.slug,
        scenario_id=args.scenario,
        inputs_path=Path(args.inputs) if args.inputs else None,
        out_path=Path(args.out),
        out_md_path=Path(args.out_md) if args.out_md else None,
        stdout=args.stdout,
        validate_env=args.validate_env,
        validate_inputs_flag=args.validate_inputs,
        strict=args.strict,
        context_mode=args.context_mode,
        recipes_dir=Path(args.recipes_dir),
    )


def handle_explain(args: argparse.Namespace) -> None:
    explain_bundle(
        slug=args.slug,
        scenario_id=args.scenario,
        inputs_path=Path(args.inputs) if args.inputs else None,
        recipes_dir=Path(args.recipes_dir),
        validate_env=args.validate_env,
        validate_inputs_flag=args.validate_inputs,
        strict=args.strict,
        context_mode=args.context_mode,
    )


def handle_refresh(args: argparse.Namespace) -> None:
    refresh_bundle(
        bundle_path=Path(args.bundle),
        out_path=Path(args.out) if args.out else None,
        out_md_path=Path(args.out_md) if args.out_md else None,
        recipes_dir=Path(args.recipes_dir),
        validate_env=args.validate_env,
        validate_inputs_flag=args.validate_inputs,
        strict=args.strict,
        context_mode=args.context_mode,
    )


def handle_bundle_build(args: argparse.Namespace) -> None:
    bundle = build_recipes_bundle(
        recipes_dir=Path(args.recipes_dir),
        context_mode=args.context_mode,
        strict=args.strict,
    )
    write_json(Path(args.out), bundle)


def handle_bundle_show(args: argparse.Namespace) -> None:
    bundle = read_json(Path(args.bundle))
    if args.summary:
        show_bundle_summary(bundle, bool(args.json))
    elif args.recipe:
        show_bundle_recipe(bundle, str(args.recipe), bool(args.json))


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        args.func(args)
    except RecipeError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return exc.code
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

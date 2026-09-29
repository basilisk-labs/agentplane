#!/usr/bin/env python3
"""Validate the roadmap bundle, not Agentplane source. No network or file writes."""
from __future__ import annotations
import argparse
import collections
import json
import re
from pathlib import Path
from typing import Any

def read_json(path: Path) -> Any:
    with path.open(encoding='utf-8') as stream:
        return json.load(stream)

def validate(root: Path) -> dict[str, Any]:
    catalog = read_json(root / 'tasks.json')
    tasks = catalog['tasks']
    by_id = {task['id']: task for task in tasks}
    if len(by_id) != len(tasks):
        raise ValueError('Duplicate task ID')
    releases = sorted({t['release'] for t in tasks}, key=lambda r: tuple(map(int, r.split('.'))))
    release_index = {r: n for n, r in enumerate(releases)}
    sources = read_json(root / 'source-evidence.json')
    coverage = read_json(root / 'coverage-map.json')
    graph = read_json(root / 'dependency-graph.json')
    required = ('id', 'release', 'title', 'context', 'change', 'delete_or_simplify',
                'code_areas', 'acceptance', 'negative', 'test_command', 'source_evidence',
                'safety_invariants', 'implementation_risk', 'compatibility_risk', 'required_context')
    counts: dict[str, int] = collections.Counter(t['release'] for t in tasks)
    indegree = {t['id']: 0 for t in tasks}
    children: dict[str, list[str]] = collections.defaultdict(list)
    for task in tasks:
        for field in required:
            if not task.get(field):
                raise ValueError(f"{task['id']}: empty {field}")
        if len(set(task['depends_on'])) != len(task['depends_on']):
            raise ValueError(f"Duplicate dependency on {task['id']}")
        for dependency in task['depends_on']:
            if dependency not in by_id:
                raise ValueError(f"Unknown dependency {dependency}")
            if release_index[by_id[dependency]['release']] > release_index[task['release']]:
                raise ValueError(f"Later-release prerequisite for {task['id']}")
            indegree[task['id']] += 1
            children[dependency].append(task['id'])
        for source in task['source_evidence']:
            if source not in sources['sources']:
                raise ValueError(f'Unknown source {source}')
        packet = (root / 'tasks' / f"{task['id']}.md").read_text(encoding='utf-8')
        if task['title'] not in packet or task['test_command'] not in packet:
            raise ValueError(f"Stale packet {task['id']}")
    queue = collections.deque(k for k, v in indegree.items() if v == 0)
    seen: list[str] = []
    while queue:
        item = queue.popleft()
        seen.append(item)
        for child in children[item]:
            indegree[child] -= 1
            if indegree[child] == 0:
                queue.append(child)
    if len(seen) != len(tasks):
        raise ValueError('Dependency cycle')
    def ancestors(task_id: str) -> set[str]:
        result: set[str] = set()
        pending = list(by_id[task_id]['depends_on'])
        while pending:
            value = pending.pop()
            if value not in result:
                result.add(value)
                pending.extend(by_id[value]['depends_on'])
        return result
    checks = {
        'migration_before_blueprint_cutover': 'BP-21' in ancestors('BP-22'),
        'migration_before_owner_cutover': 'LC-14' in ancestors('LC-15'),
        'public_callers_before_engine_deletion': 'BP-27' in ancestors('BP-25'),
        'cold_decoders_before_engine_deletion': 'BP-28' in ancestors('BP-25'),
        'candidate_before_quality_study': 'EV-11' in ancestors('EV-07'),
        'quality_and_economics_before_activation': {'EV-07', 'EV-11', 'EV-12'} <= ancestors('EV-13'),
        'jev_foundation_before_purpose_qualification': {'EV-14', 'EV-15', 'EV-16', 'EV-17', 'EV-18'} <= ancestors('EV-19'),
        'jev_development_quality_before_activation': {'EV-16', 'EV-17', 'EV-18', 'EV-19'} <= ancestors('EV-20'),
        'jev_candidate_before_false_skip_study': {'EV-21', 'EV-22', 'EV-23'} <= ancestors('EV-24'),
        'jev_quality_and_economics_before_evaluator_activation': {'EV-24', 'EV-25'} <= ancestors('EV-26'),
        'blueprint_not_dependent_on_adaptation_or_v2': all(
            not d.startswith(('PL-', 'RC-', 'EV-'))
            for t in tasks if t['release'] == '0.7.10' for d in ancestors(t['id'])),
    }
    if not all(checks.values()):
        raise ValueError(f'Ordering gate failed: {checks}')
    original = coverage['original_groups']
    if len(original) != 37 or not all(group['tasks'] for group in original.values()):
        raise ValueError('Incomplete original-group mapping')
    if set(original) != {old for t in tasks for old in t['supersedes']}:
        raise ValueError('Original-group mapping differs from cards')
    for old, value in original.items():
        if set(value['tasks']) != {t['id'] for t in tasks if old in t['supersedes']}:
            raise ValueError(f'Stale mapping for {old}')
    for finding in coverage['audit_findings'].values():
        if not finding['tasks'] or not set(finding['tasks']) <= set(by_id):
            raise ValueError('Invalid finding coverage')
    for case in coverage['negative_scenarios']:
        if not case['tasks'] or not set(case['tasks']) <= set(by_id):
            raise ValueError('Invalid negative coverage')
    main = (root / 'agentplane-0.7.9-0.7.14-roadmap-r2.md').read_text(encoding='utf-8')
    headings = re.findall(r'^### ((?:ST|BP|LC|PL|RC|EV)-\d+) —', main, re.M)
    if collections.Counter(headings) != collections.Counter(by_id.keys()):
        raise ValueError('Missing/duplicate main-document card')
    positions = {id: n for n, id in enumerate(headings)}
    if any(positions[d] > positions[t['id']] for t in tasks for d in t['depends_on']):
        raise ValueError('Main document is not dependency ordered')
    if graph['topological_order'] != headings:
        raise ValueError('Graph order differs from main document')
    expected_edges = {(d, t['id']) for t in tasks for d in t['depends_on']}
    if {(e['from'], e['to']) for e in graph['edges']} != expected_edges:
        raise ValueError('Edge list mismatch')
    for release in releases:
        text = (root / 'releases' / f'{release}.md').read_text(encoding='utf-8')
        found = re.findall(r'^### ((?:ST|BP|LC|PL|RC|EV)-\d+) —', text, re.M)
        if set(found) != {t['id'] for t in tasks if t['release'] == release}:
            raise ValueError(f'Wrong release file {release}')
    for md in root.rglob('*.md'):
        text = md.read_text(encoding='utf-8')
        used = set(re.findall(r'\[(S\d+)\](?!:)', text))
        defined = set(re.findall(r'^\[(S\d+)\]:', text, re.M))
        if not used <= defined:
            raise ValueError(f'Broken source references in {md.name}: {used - defined}')
        if re.search(r'CLI_PLACEHOLDER|\bTODO_FILL\b|\bINSERT_HERE\b', text):
            raise ValueError(f'Unresolved authoring placeholder in {md.name}')
    if any(f"/blob/{catalog['reviewed_sha']}/" not in s['url'] for s in sources['sources'].values()):
        raise ValueError('Unpinned source link')
    return {
        'status': 'pass', 'task_count': len(tasks), 'release_counts': counts,
        'original_groups_mapped': len(original), 'audit_findings_mapped': len(coverage['audit_findings']),
        'negative_scenarios_mapped': len(coverage['negative_scenarios']),
        'edges': len(expected_edges), 'source_files': len(sources['sources']),
        'ordering_checks': checks,
        'scope': 'Document/task/DAG consistency only. No Agentplane product tests or live experiments.',
    }

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', nargs='?', type=Path, default=Path(__file__).resolve().parent)
    args = parser.parse_args()
    try:
        result = validate(args.directory.resolve())
    except (ValueError, KeyError, TypeError, OSError, json.JSONDecodeError) as error:
        print(json.dumps({'status': 'fail', 'error': str(error)}, ensure_ascii=False, indent=2))
        return 1
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0

if __name__ == '__main__':
    raise SystemExit(main())

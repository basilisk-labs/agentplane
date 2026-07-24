import { describe, expect, it } from "vitest";

import {
  createCapabilityRegistry,
  getCapabilityEntries,
  listCapabilities,
  mergeCapabilityRegistries,
  resolveRecipeCapabilityRegistry,
  resolveRunnerAdapterCapabilityRegistry,
  resolveTaskBackendCapabilityRegistry,
} from "./index.js";

describe("runtime capability registry", () => {
  it("enumerates backend capabilities and marks disabled features unavailable", () => {
    const registry = resolveTaskBackendCapabilityRegistry({
      backend_id: "redmine",
      capabilities: {
        canonical_source: "remote",
        projection: "cache",
        projection_read_mode: "native",
        reads_from_projection_by_default: true,
        writes_task_readmes: false,
        supports_task_revisions: true,
        supports_revision_guarded_writes: true,
        may_access_network_on_read: true,
        may_access_network_on_write: false,
        supports_projection_refresh: true,
        supports_push_sync: false,
        supports_snapshot_export: true,
      },
    });

    expect(getCapabilityEntries(registry, "backend.redmine.canonical_source")[0]).toMatchObject({
      availability: "available",
      value: "remote",
      source: { id: "backend", detail: "redmine" },
    });
    expect(getCapabilityEntries(registry, "backend.redmine.writes_task_readmes")[0]).toMatchObject({
      availability: "unavailable",
      value: false,
    });
    expect(listCapabilities(registry, { availability: "available" })).toHaveLength(9);
  });

  it("marks recipe declarations outside the active scenario as blocked", () => {
    const registry = resolveRecipeCapabilityRegistry({
      entry: {
        id: "viewer",
        version: "1.2.3",
        manifest: {
          schema_version: "1",
          id: "viewer",
          version: "1.2.3",
          name: "Viewer",
          summary: "Viewer recipe",
          description: "Recipe for scenario routing tests.",
          agents: [
            {
              id: "coder",
              display_name: "Coder",
              role: "CODER",
              summary: "Implements changes",
              file: "agents/coder.md",
            },
            {
              id: "reviewer",
              display_name: "Reviewer",
              role: "REVIEWER",
              summary: "Reviews changes",
              file: "agents/reviewer.md",
            },
          ],
          skills: [
            {
              id: "fs.read",
              summary: "Read files",
              file: "skills/fs-read.md",
            },
          ],
          tools: [
            {
              id: "rg",
              summary: "ripgrep",
              runtime: "bash",
              entrypoint: "rg",
            },
          ],
          scenarios: [
            {
              id: "execute",
              name: "Execute",
              summary: "Runs the main path",
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["coder"],
              skills_used: ["fs.read"],
              tools_used: ["rg"],
              run_profile: { mode: "execute" },
              use_when: ["default"],
              file: "scenarios/execute.yaml",
            },
            {
              id: "review",
              name: "Review",
              summary: "Runs a review path",
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["reviewer"],
              skills_used: [],
              tools_used: [],
              run_profile: { mode: "review" },
              use_when: ["review"],
              file: "scenarios/review.yaml",
            },
          ],
        },
      },
      selection: {
        scenario_id: "execute",
        agents_involved: ["coder"],
        skills_used: ["fs.read"],
        tools_used: ["rg"],
      },
    });

    expect(getCapabilityEntries(registry, "recipe:viewer/scenario:execute")[0]).toMatchObject({
      availability: "available",
    });
    expect(getCapabilityEntries(registry, "recipe:viewer/scenario:review")[0]).toMatchObject({
      availability: "blocked",
      blocked_by: ["recipe:viewer/scenario:execute"],
    });
    expect(getCapabilityEntries(registry, "recipe:viewer/agent:reviewer")[0]).toMatchObject({
      availability: "blocked",
      blocked_by: ["recipe:viewer/scenario:execute"],
    });
  });

  it("marks unsupported runner fields unavailable and unsupported requests blocked", () => {
    const registry = resolveRunnerAdapterCapabilityRegistry({
      adapter_id: "custom",
      capabilities: {
        adapter_id: "custom",
        fields: {
          sandbox: {
            level: "wrapper",
            channel: "argv",
            supported_values: ["workspace-write"],
          },
          timeout: {
            level: "unsupported",
            channel: "none",
          },
        },
      },
      requested: {
        sandbox: "read-only",
      },
    });

    expect(getCapabilityEntries(registry, "runner.adapter.custom")[0]).toMatchObject({
      availability: "available",
    });
    expect(
      getCapabilityEntries(registry, "runner.adapter.custom.policy_field.sandbox")[0],
    ).toMatchObject({
      availability: "blocked",
      value: "read-only",
      blocked_by: ["runner.adapter.custom"],
      supported_values: ["workspace-write"],
    });
    expect(
      getCapabilityEntries(registry, "runner.adapter.custom.policy_field.timeout")[0],
    ).toMatchObject({
      availability: "unavailable",
    });
  });

  it("publishes inherited filesystem-effect containment as a typed adapter capability", () => {
    const registry = resolveRunnerAdapterCapabilityRegistry({
      adapter_id: "codex",
      capabilities: {
        adapter_id: "codex",
        fields: {},
        filesystem_effect_containment: {
          level: "native",
          supported_sandboxes: ["read-only", "workspace-write"],
          boundary: "workspace",
          descendant_inheritance: "enforced",
          lifetime_containment: "not_provided",
        },
      },
    });

    expect(
      getCapabilityEntries(registry, "runner.adapter.codex.filesystem_effect_containment")[0],
    ).toMatchObject({
      availability: "available",
      supported_values: ["read-only", "workspace-write"],
      metadata: {
        level: "native",
        boundary: "workspace",
        descendant_inheritance: "enforced",
        lifetime_containment: "not_provided",
      },
    });
  });

  it("deduplicates merged registries and supports filtered listing", () => {
    const left = createCapabilityRegistry([
      {
        id: "policy.approvals.plan",
        kind: "policy",
        availability: "available",
        source: { id: "policy", detail: "unit" },
      },
    ]);
    const right = createCapabilityRegistry([
      {
        id: "policy.approvals.plan",
        kind: "policy",
        availability: "available",
        source: { id: "policy", detail: "unit" },
      },
      {
        id: "policy.approvals.network",
        kind: "policy",
        availability: "blocked",
        source: { id: "policy", detail: "unit" },
      },
    ]);

    const merged = mergeCapabilityRegistries(left, right);

    expect(merged.entries).toHaveLength(2);
    expect(listCapabilities(merged, { availability: "blocked" })).toEqual([
      expect.objectContaining({ id: "policy.approvals.network" }),
    ]);
  });
});

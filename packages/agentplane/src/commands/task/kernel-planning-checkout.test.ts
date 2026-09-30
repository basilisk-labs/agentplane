import { beforeEach, describe, expect, it, vi } from "vitest";
import { gitRevParse } from "@agentplaneorg/core/git";
import {
  createTaskExecutionBaseIdentity,
  TASK_EXECUTION_CONTEXT_EXTENSION_KEY,
  taskKernel as k,
} from "@agentplaneorg/core/tasks";

import type { KernelRead } from "../../adapters/task-backend/kernel-record.js";
import type { CommandContext } from "../shared/task-backend.js";
import { findRouteWorktreePath } from "../shared/route-decision-workspace.js";
import { canonicalPlanningCheckoutBoundary } from "./kernel-planning-checkout.js";

vi.mock("@agentplaneorg/core/git", () => ({ gitRevParse: vi.fn() }));
vi.mock("../shared/route-decision-workspace.js", () => ({ findRouteWorktreePath: vi.fn() }));

const sha = "a".repeat(40);
const command = { resolvedProject: { gitRoot: "/repo" } } as CommandContext;
function read(): Extract<KernelRead, { kind: "canonical" }> {
  return {
    kind: "canonical",
    task: {
      execution_route: { repository_mode: "branch_pr" },
      extensions: {
        [TASK_EXECUTION_CONTEXT_EXTENSION_KEY]: createTaskExecutionBaseIdentity({
          base_ref: "development",
          base_sha: sha,
          source: "explicit",
          repository_identity: k.kernelDigest("repo"),
        }),
      },
    },
    record: { aggregate: { state: "PLANNING", authority_lineage: [] } },
  } as unknown as Extract<KernelRead, { kind: "canonical" }>;
}

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(findRouteWorktreePath).mockResolvedValue("/development");
  vi.mocked(gitRevParse).mockResolvedValue(sha);
});

describe("canonical planning checkout boundary", () => {
  it.each(["CAPTURED", "PLANNING", "AWAITING_PLAN_APPROVAL"] as const)(
    "routes an explicit base before issuing authority in %s",
    async (state) => {
      const planning = read();
      planning.record.aggregate.state = state;
      await expect(canonicalPlanningCheckoutBoundary({ command, read: planning })).resolves.toEqual(
        {
          kind: "external_wait",
          reason: "canonical_planning_checkout_required",
          must_run_from: "/development",
        },
      );
    },
  );

  it("continues in the exact frozen base checkout", async () => {
    vi.mocked(findRouteWorktreePath).mockResolvedValue("/repo");
    await expect(canonicalPlanningCheckoutBoundary({ command, read: read() })).resolves.toBeNull();
  });

  it.each(["missing", "moved", "unreadable"])("fails closed for a %s base", async (state) => {
    if (state === "missing") vi.mocked(findRouteWorktreePath).mockResolvedValue(null);
    if (state === "moved") vi.mocked(gitRevParse).mockResolvedValue("b".repeat(40));
    if (state === "unreadable") vi.mocked(gitRevParse).mockRejectedValue(new Error("unavailable"));
    await expect(
      canonicalPlanningCheckoutBoundary({ command, read: read() }),
    ).resolves.toMatchObject({
      kind: "human_required",
      reason: "canonical_planning_base_unavailable",
      base_sha: sha,
    });
  });

  it("does not reroute existing authority or bypass its drift validation", async () => {
    const existing = read();
    existing.record.aggregate.authority_lineage = [{}] as never;
    await expect(
      canonicalPlanningCheckoutBoundary({ command, read: existing }),
    ).resolves.toBeNull();
    expect(findRouteWorktreePath).not.toHaveBeenCalled();
  });

  it("leaves active task checkouts and direct tasks unchanged", async () => {
    const active = read();
    active.record.aggregate.state = "ACTIVE";
    await expect(canonicalPlanningCheckoutBoundary({ command, read: active })).resolves.toBeNull();
    const direct = read();
    direct.task.execution_route!.repository_mode = "direct";
    await expect(canonicalPlanningCheckoutBoundary({ command, read: direct })).resolves.toBeNull();
    expect(findRouteWorktreePath).not.toHaveBeenCalled();
  });
});

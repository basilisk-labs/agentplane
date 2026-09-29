import { describe, expect, it } from "vitest";

import { ensureBranchPrBaseCheckout } from "./branch-pr-context.js";

describe("branch_pr base checkout", () => {
  it.each(["origin/main", "refs/remotes/origin/main"])(
    "accepts local main as the checkout for %s",
    async (baseBranch) => {
      await expect(
        ensureBranchPrBaseCheckout({
          context: { baseBranch, currentBranch: "main" },
          gitRoot: "/repo",
          command: "work start",
        }),
      ).resolves.toBeUndefined();
    },
  );
});

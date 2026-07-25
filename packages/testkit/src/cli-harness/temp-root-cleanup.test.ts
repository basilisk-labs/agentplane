import { describe, expect, it, vi } from "vitest";

import { removeTempRoot, TEMP_ROOT_CLEANUP_OPTIONS } from "./temp-root-cleanup.js";

describe("testkit temporary-root cleanup", () => {
  it("uses bounded retries for transient cross-platform filesystem locks", async () => {
    const remover = vi.fn(() => Promise.resolve());

    await removeTempRoot("temporary-root", remover);

    expect(remover).toHaveBeenCalledWith("temporary-root", {
      force: true,
      maxRetries: 5,
      recursive: true,
      retryDelay: 100,
    });
    expect(TEMP_ROOT_CLEANUP_OPTIONS.maxRetries).toBeGreaterThan(0);
  });
});

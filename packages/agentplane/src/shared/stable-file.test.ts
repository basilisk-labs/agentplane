import { describe, expect, it } from "vitest";

import { isStableFileReadCollision } from "./stable-file.js";

describe("stable file read collision classification", () => {
  it("accepts only identity-collision messages for the exact file label", () => {
    const label = "runner phase-tool broker response";

    expect(
      isStableFileReadCollision(
        new Error(`${label} changed while it was being read: /tmp/response.json`),
        label,
      ),
    ).toBe(true);
    expect(
      isStableFileReadCollision(
        new Error(`different label changed while it was being read: /tmp/response.json`),
        label,
      ),
    ).toBe(false);
    expect(isStableFileReadCollision(new Error("response JSON is invalid"), label)).toBe(false);
  });
});

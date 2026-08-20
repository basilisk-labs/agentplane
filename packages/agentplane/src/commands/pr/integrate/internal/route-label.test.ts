import { describe, expect, it } from "vitest";

import { formatIntegrateRoute } from "./route-label.js";

describe("formatIntegrateRoute", () => {
  it.each([
    [false, "gitlab", "local"],
    [true, "github", "github-pr"],
    [true, "gitlab", "gitlab-mr"],
    [true, null, "github-pr"],
  ] as const)(
    "formats protected=%s provider=%s as %s",
    (protectedBaseRequiresPrMerge, provider, expected) => {
      expect(formatIntegrateRoute({ protectedBaseRequiresPrMerge, provider })).toBe(expected);
    },
  );
});

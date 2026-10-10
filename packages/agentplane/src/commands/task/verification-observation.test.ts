import { expect, it } from "vitest";
import { verificationRedactor } from "./verification-observation.js";

it("redacts credential forms and repository paths before rendering", () => {
  const redact = verificationRedactor({ API_TOKEN: 'quoted"secret' }, "/repo/private");
  expect(
    redact(
      'quoted"secret Bearer abc123 https://user:pass@example.org /repo/private/test.ts token=hidden',
    ),
  ).toBe(
    "[REDACTED] Bearer [REDACTED] https://[REDACTED]@example.org <repo>/test.ts token=[REDACTED]",
  );
});

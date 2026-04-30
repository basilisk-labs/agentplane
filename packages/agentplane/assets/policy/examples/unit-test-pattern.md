<!-- ap:fragment id="policy.examples.unit-test-pattern.example.example.unit.test.pattern" slot="example" mutability="replaceable" -->

# Example: Unit Test Pattern

```ts
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);

describe("policy routing check", () => {
  it("passes for current repository policy files", async () => {
    await expect(
      execFileAsync("node", ["scripts/check-policy-routing.mjs"], {
        cwd: process.cwd(),
      }),
    ).resolves.toBeDefined();
  });
});
```

<!-- /ap:fragment -->

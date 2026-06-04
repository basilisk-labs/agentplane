import { describe, expect, it } from "vitest";

import { cloudHttpErrorMessage } from "./cloud-backend-utils.js";

describe("cloud backend utilities", () => {
  it("wraps cloud 5xx responses with local fallback guidance", async () => {
    const message = await cloudHttpErrorMessage(
      Response.json({ error: "bad_gateway" }, { status: 502 }),
    );

    expect(message).toContain("Cloud backend request failed: HTTP 502");
    expect(message).toContain("Safe command: agentplane backend inspect cloud --yes");
    expect(message).toContain("Local fallback: .agentplane/tasks with backend id local");
  });
});

import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import path from "node:path";
import { digest } from "./internal/paired-m05/contract.mjs";
import { runSubscriptionSetup } from "./internal/paired-m05/subscription-setup-host.mjs";

const [packetPath, approvalFlag, approvedDigest, ...extra] = process.argv.slice(2);
assert.equal(approvalFlag, "--approved-packet-digest");
assert.equal(extra.length, 0);
assert.match(approvedDigest ?? "", /^sha256:[a-f0-9]{64}$/u);
const packet = JSON.parse(readFileSync(packetPath, "utf8"));
assert.equal(digest(packet), approvedDigest, "Reviewed authoring packet changed");
assert.equal(
  execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  packet.contract.target_sha,
);
assert.equal(
  "sha256:" + createHash("sha256").update(readFileSync(packet.runtime.codexBinary)).digest("hex"),
  packet.runtime_binary_digest,
);
writeFileSync(
  path.join(packet.host, "launch.json"),
  JSON.stringify({
    packet_digest: approvedDigest,
    started_at: new Date().toISOString(),
    mode: "prospective_setup_not_native_campaign",
  }) + "\n",
  { flag: "wx" },
);
const result = await runSubscriptionSetup({
  packet,
  authorize: async (value) => value === approvedDigest,
});
writeFileSync(path.join(packet.host, "result.json"), JSON.stringify(result, null, 2) + "\n", {
  flag: "wx",
});
console.log(
  JSON.stringify({
    packet_digest: approvedDigest,
    result_digest: digest(result),
    qualification: result.qualification,
    result_path: path.join(packet.host, "result.json"),
  }),
);

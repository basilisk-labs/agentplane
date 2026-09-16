import assert from "node:assert/strict";
import { test } from "node:test";

import {
  planStableChannelPromotion,
  stableVersionsFromGithubReleases,
} from "./stable-channel-policy.mjs";

test("advances stable aliases only when the candidate is not older", () => {
  assert.deepEqual(
    planStableChannelPromotion({
      candidate: "0.7.10",
      observed: [
        { source: "npm:agentplane", version: "0.7.9" },
        { source: "github-release:v0.6.30", version: "0.6.30" },
      ],
    }),
    {
      schemaVersion: 1,
      candidate: "0.7.10",
      highestObservedStable: "0.7.9",
      promotesStableChannel: true,
      npmTag: "latest",
      reasonCode: "candidate_advances_stable_channel",
      observations: [
        { source: "npm:agentplane", version: "0.7.9" },
        { source: "github-release:v0.6.30", version: "0.6.30" },
      ],
    },
  );
  assert.equal(
    planStableChannelPromotion({
      candidate: "0.7.9",
      observed: [{ source: "npm:agentplane", version: "0.7.9" }],
    }).reasonCode,
    "candidate_matches_stable_channel",
  );
});

test("publishes an older maintenance release without moving stable aliases", () => {
  const plan = planStableChannelPromotion({
    candidate: "0.6.31",
    observed: [
      { source: "npm:@agentplaneorg/core", version: "0.7.10" },
      { source: "npm:@agentplaneorg/recipes", version: "0.7.10" },
      { source: "npm:agentplane", version: "0.7.10" },
    ],
  });
  assert.equal(plan.promotesStableChannel, false);
  assert.equal(plan.npmTag, "release-v0.6.31");
  assert.equal(plan.reasonCode, "candidate_precedes_stable_channel");
  assert.equal(plan.highestObservedStable, "0.7.10");
});

test("filters GitHub releases and fails closed on malformed channel observations", () => {
  assert.deepEqual(
    stableVersionsFromGithubReleases([
      { tag_name: "v0.7.9", draft: false, prerelease: false },
      { tag_name: "v0.7.10-beta.1", draft: false, prerelease: true },
      { tag_name: "v0.6.31", draft: true, prerelease: false },
      { tag_name: "not-a-release", draft: false, prerelease: false },
    ]),
    ["0.7.9"],
  );
  assert.throws(
    () =>
      planStableChannelPromotion({
        candidate: "0.7.10",
        observed: [{ source: "npm:agentplane", version: "unexpected" }],
      }),
    /must be a stable SemVer/u,
  );
  assert.throws(
    () => planStableChannelPromotion({ candidate: "0.7.10-beta.1", observed: [] }),
    /must be a stable SemVer/u,
  );
});

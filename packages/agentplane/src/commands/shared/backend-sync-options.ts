import type { OptionSpec } from "../../cli/spec/spec.js";

export const SYNC_IDENTITY_TRANSITION_OPTIONS: readonly OptionSpec[] = [
  {
    kind: "boolean",
    name: "bootstrap-projection",
    default: false,
    description:
      "Explicitly bind a missing cloud checkpoint by pushing the confirmed local cache (requires push + conflict=fail).",
  },
  {
    kind: "boolean",
    name: "adopt-projection-identity",
    default: false,
    description:
      "Explicitly adopt the active cloud identity and remote projection (requires pull + conflict=prefer-remote).",
  },
];

# Independent Review Transport Recovery

The user authorized the operator recovery needed to release 0.7.12. This recovery changes review input transport only. It does not waive independent evaluation, validation, or publication gates.

The native Codex provider first returned an invalid evidence reference and then timed out. A separate readonly diagnostic failed with `bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted`. Ubuntu Bubblewrap reproduced the host namespace denial. The sandbox was not disabled.

The operator supplied all nine native frozen evidence items directly to independent Codex invocations. Each item was checked against its WorkOrder SHA-256 before invocation. The invocations retained `-a never`, `--ignore-user-config`, `--strict-config`, `--disable hooks`, `--ephemeral`, `--json`, `-s read-only`, and the native output schema. The reviewer was instructed to evaluate the complete embedded evidence without tools and to return blocked if evidence was insufficient. No verdict was prescribed.

The first inline invocation returned blocked because current workspace-state evidence was missing. Its unmodified typed result was recorded through `agentplane evaluator apply`. Native commit `49ab6762b6ce` preserved that review and the prior failures. A fresh native WorkOrder was prepared and committed at `c7e4a0c31e9ade51d26b0c450a221e1c10d15daf`.

The second inline invocation received the fresh complete packet and the separately captured readonly Git observation included here. Both Git commands exited 0 with empty output. The workspace was clean, and the implementation had not changed outside task artifacts since `c0b3be603d850883aae69d3117428609ce446761`. The wrapper also compared workspace status before and after the invocation and observed no change.

The second invocation returned pass. The unmodified result was submitted through `agentplane evaluator apply`, which validates frozen identities and evidence. No native provider-success receipt was fabricated. The native timeout receipt remains a failure.

Release task `202609282003-E81FJR` archived the raw JSONL files because the release artifact policy prohibits tracked volatile logs. Their exact bytes remain in Git history and the ignored operator archive:

- `kke9zn-inline-review.jsonl`: Git blob `d0fa38668bb2bd2b748b1a11eebe31395aef44e2`; SHA-256 `60fe59abe0264ba9107f105ee39c5685b170e9cec8ecbfe46ddcd80e94c2009b`.
- `kke9zn-inline-review-2.jsonl`: Git blob `b680f55ba351c3c3dc11dc71d65314ae1483a4c2`; SHA-256 `b546b75270f96a5dd859c6c2d6915a8bf86a9b33b084e05fcf80f6870325fe58`.

This review qualifies the implementation only. M04 remains NOT ESTABLISHED. It does not certify live-provider containment, hosted checks, release publication, or downstream distribution.

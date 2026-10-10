# Publish an immutable candidate before final acceptance

An operator can publish a reviewed Git candidate while its native implementation item remains open. This checkpoint grants only one publication to a new candidate ref. It does not commit working files, complete a WorkItem, pass final validation, open or merge a PR, or integrate a release.

The current task must have a genuine, live EXECUTOR WorkOrder with an authenticated native begin receipt and no implementation result. A blocked or stale task must first follow its supported recovery route. An EXECUTOR's denied Git or network authority does not authorize this operator checkpoint.

## Prepare and review

First create and independently review the immutable candidate commit under separate operator authority. If the reviewed handoff consists of dirty files, the operator can prepare that exact snapshot in an isolated checkout. Preserve the original checkout and unrelated files. Verify all intended file bytes, modes and deletions against the frozen handoff. This command does not prepare that commit or claim native evidence for an operator commit.

Run the checkpoint from the native WorkOrder's owning checkout. The immutable candidate objects must be available there. Unrelated dirty working files are not published or required to be clean. The manifest covers every tracked path changed from `base_commit` to `commit`, including deletions; it cannot omit another changed path in the candidate. The commit and tree pin all remaining tracked content.

Write a preparation input with these exact fields:

```json
{
  "work_order_digest": "sha256:<canonical retained WorkOrder digest>",
  "base_commit": "<full reviewed base commit OID>",
  "commit": "<full immutable candidate commit OID>",
  "frozen_files_digest": "sha256:<canonical reviewed file inventory digest>",
  "review_digest": "sha256:<retained independent candidate review digest>",
  "remote_url": "https://git.example.org/team/project.git",
  "candidate_ref": "refs/heads/agentplane-candidates/<unique-review-id>/<full-candidate-OID>"
}
```

The frozen inventory is a sorted array of `{path, mode, blob, content_digest}`. Paths are repository-relative. Regular modes are `100644` or `100755`; a symlink uses `120000` and its blob bytes are the link target. Deleted entries have all three value fields `null`. Content digests are `sha256:` plus the SHA-256 of immutable blob bytes. Inventory and WorkOrder digests use the native canonical JSON digest, not the pretty-printed file's raw hash. Changed submodules are rejected. Review the entire inventory before approving it.

```bash
ap task candidate prepare <task-id> --file preparation.json
```

Preparation is read-only and does not contact the remote. Its JSON contains the full `request`, its native task/plan/attempt/claim/WorkOrder/begin-receipt bindings, immutable Git identity and a separate `approval_digest`. Save only the exact `request` object as `request.json`. Inspect the complete request before approving.

Use a credential-free HTTPS or `ssh://git@host/path` URL. Credentials remain in the existing Git credential mechanism; never place them in the request. URL rewrite rules are rejected. The destination is a new unique candidate branch with an expected absent head, not a reusable development or protected main branch.

## Approve and publish

```bash
ap task candidate approve <task-id> --file request.json --by USER --approval-digest sha256:<exact-approval-digest> --ttl-minutes 15
ap task candidate publish <task-id> --request-digest sha256:<exact-request-digest>
```

Approval lasts 1–60 minutes and is stored separately in the Git common directory. It does not expand the semantic WorkOrder's rights. Publication revalidates the live native identity, immutable objects and separate approval before its journaled network operation. Ordinary non-force push requires an absent advertised remote ref; the Git server's atomic old-head comparison rejects a concurrent creation. Existing executable pre-push hooks still run and can reject publication. Symlinked or nonregular pre-push hooks are rejected.

The current Git invocation and original-hook execution each have a 120-second bound. A repository whose required hook cannot finish within that bound cannot use this checkpoint successfully as configured. Do not bypass its hook to obtain a receipt. A timeout after intent is an unresolved effect, not proof that nothing was published.

Success returns an exact commit/ref readback receipt with `qualification: "not_established"`. A separate authorized repository operator must protect the candidate branch and dispatch any required CI/image workflow. A push receipt does not establish protected-ref status, runner exclusivity, image identity, acceptance, or a final release. Keep the original acceptance item open until those real checks pass.

## Reconciliation and revocation

A repeated publish with the original valid approval only reconciles the exact retained remote commit and journal. It does not issue another push. A changed remote, missing remote after intent, expired/revoked approval, or stale native attempt fails closed.

```bash
ap task candidate revoke <task-id> --request-digest sha256:<exact-request-digest> --by USER
```

Revocation removes only this request's grant and retains its audit and journal. It can use the retained WorkOrder after the native attempt has changed. It does not undo a completed publication or cancel a Git operation already dispatched.

Do not blindly retry an unresolved absent effect or renew a grant over an existing journal. Preserve the old request, approval, intent, errors and remote observations. An operator must inspect the actual remote and any still-running process. If a genuinely new reviewed attempt is necessary, retain new review evidence, prepare its new request and separately approve it; the old publication remains unresolved until supported by actual evidence. A different approval cannot rewrite the old journal's authority identity. There is no command that declares an unknown old effect successful.

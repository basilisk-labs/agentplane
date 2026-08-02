import { createHash } from "node:crypto";

import { canonicalizeJson, parseTaskReadme, taskDocToSectionMap } from "@agentplaneorg/core/tasks";

import { isRecord } from "../../shared/guards.js";

export function contentSha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function canonicalEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(canonicalizeJson(left)) === JSON.stringify(canonicalizeJson(right));
}

function recordArray(value: unknown): Record<string, unknown>[] | null {
  if (!Array.isArray(value) || !value.every(isRecord)) return null;
  return value;
}

function requiredString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function exactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value).toSorted((left, right) => left.localeCompare(right));
  const expected = [...keys].toSorted((left, right) => left.localeCompare(right));
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function isWorkflowRouteBaseline(value: unknown): boolean {
  return (
    isRecord(value) &&
    exactKeys(value, ["version", "start_head_sha"]) &&
    value.version === 1 &&
    (value.start_head_sha === null || requiredString(value.start_head_sha) !== null)
  );
}

function withoutStartTransitionFields(
  frontmatter: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...frontmatter };
  delete result.status;
  delete result.revision;
  delete result.comments;
  delete result.events;
  delete result.doc_updated_at;
  delete result.doc_updated_by;
  delete result.extensions;
  return result;
}

function extensionFieldsWithoutBaseline(value: unknown): Record<string, unknown> | null {
  if (value === undefined) return {};
  if (!isRecord(value)) return null;
  const result = { ...value };
  delete result.workflow_route_baseline;
  return result;
}

export function validStartReadyTransition(opts: {
  foreignTaskId: string;
  replicaText: string;
  sourceText: string;
}): boolean {
  let replica;
  let source;
  try {
    replica = parseTaskReadme(opts.replicaText);
    source = parseTaskReadme(opts.sourceText);
  } catch {
    return false;
  }
  if (replica.body !== source.body) return false;

  const replicaFrontmatter = replica.frontmatter;
  const sourceFrontmatter = source.frontmatter;
  if (
    replicaFrontmatter.id !== opts.foreignTaskId ||
    sourceFrontmatter.id !== opts.foreignTaskId ||
    replicaFrontmatter.status !== "TODO" ||
    sourceFrontmatter.status !== "DOING" ||
    typeof replicaFrontmatter.revision !== "number" ||
    typeof sourceFrontmatter.revision !== "number" ||
    sourceFrontmatter.revision !== replicaFrontmatter.revision + 1
  ) {
    return false;
  }

  if (
    !canonicalEqual(
      withoutStartTransitionFields(replicaFrontmatter),
      withoutStartTransitionFields(sourceFrontmatter),
    )
  ) {
    return false;
  }

  const replicaExtensions = extensionFieldsWithoutBaseline(replicaFrontmatter.extensions);
  const sourceExtensions = extensionFieldsWithoutBaseline(sourceFrontmatter.extensions);
  if (
    !replicaExtensions ||
    !sourceExtensions ||
    !canonicalEqual(replicaExtensions, sourceExtensions)
  ) {
    return false;
  }
  const replicaBaseline = isRecord(replicaFrontmatter.extensions)
    ? replicaFrontmatter.extensions.workflow_route_baseline
    : undefined;
  const sourceBaseline = isRecord(sourceFrontmatter.extensions)
    ? sourceFrontmatter.extensions.workflow_route_baseline
    : undefined;
  if (
    !isWorkflowRouteBaseline(sourceBaseline) ||
    (replicaBaseline !== undefined && !canonicalEqual(replicaBaseline, sourceBaseline))
  ) {
    return false;
  }

  const replicaComments = recordArray(replicaFrontmatter.comments);
  const sourceComments = recordArray(sourceFrontmatter.comments);
  const replicaEvents = recordArray(replicaFrontmatter.events);
  const sourceEvents = recordArray(sourceFrontmatter.events);
  if (!replicaComments || !sourceComments || !replicaEvents || !sourceEvents) return false;
  if (
    sourceComments.length !== replicaComments.length + 1 ||
    sourceEvents.length !== replicaEvents.length + 1 ||
    !canonicalEqual(replicaComments, sourceComments.slice(0, -1)) ||
    !canonicalEqual(replicaEvents, sourceEvents.slice(0, -1))
  ) {
    return false;
  }

  const comment = sourceComments.at(-1);
  const event = sourceEvents.at(-1);
  const eventAt = event && requiredString(event.at);
  const eventAuthor = event && requiredString(event.author);
  const commentBody = comment && requiredString(comment.body);
  if (
    !comment ||
    !event ||
    !exactKeys(comment, ["author", "body"]) ||
    !exactKeys(event, ["type", "at", "author", "from", "to", "note"]) ||
    !requiredString(comment.author) ||
    !commentBody ||
    !commentBody.startsWith("Start:") ||
    event.type !== "status" ||
    event.from !== "TODO" ||
    event.to !== "DOING" ||
    event.note !== commentBody ||
    !eventAt ||
    !eventAuthor ||
    sourceFrontmatter.doc_updated_at !== eventAt ||
    sourceFrontmatter.doc_updated_by !== eventAuthor
  ) {
    return false;
  }
  return true;
}

function withoutHistoricalLifecycleFields(
  frontmatter: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...frontmatter };
  delete result.status;
  delete result.revision;
  delete result.result_summary;
  delete result.verification;
  delete result.quality_review;
  delete result.commit;
  delete result.comments;
  delete result.events;
  delete result.doc_updated_at;
  delete result.doc_updated_by;
  delete result.sections;
  return result;
}

function immutableTaskSections(value: Record<string, unknown>): Record<string, unknown> | null {
  const sections = value.sections;
  if (sections === undefined) return {};
  if (!isRecord(sections)) return null;
  const immutableSections = { ...sections };
  delete immutableSections.Verification;
  delete immutableSections.Findings;
  return immutableSections;
}

function immutableTaskBody(
  body: string,
): { kind: "raw"; value: string } | { kind: "sections"; value: Record<string, string> } {
  const sections = taskDocToSectionMap(body);
  if (Object.keys(sections).length === 0) return { kind: "raw", value: body };

  const immutableSections = { ...sections };
  delete immutableSections.Verification;
  delete immutableSections.Findings;
  return { kind: "sections", value: immutableSections };
}

function sameImmutableTaskBody(opts: {
  startedFrontmatter: Record<string, unknown>;
  startedBody: string;
  sourceFrontmatter: Record<string, unknown>;
  sourceBody: string;
}): boolean {
  const startedSections = immutableTaskSections(opts.startedFrontmatter);
  const sourceSections = immutableTaskSections(opts.sourceFrontmatter);
  if (!startedSections || !sourceSections || !canonicalEqual(startedSections, sourceSections)) {
    return false;
  }
  const started = immutableTaskBody(opts.startedBody);
  const source = immutableTaskBody(opts.sourceBody);
  return started.kind === source.kind && canonicalEqual(started.value, source.value);
}

export function validVerifiedDoneContinuation(opts: {
  foreignTaskId: string;
  startedText: string;
  sourceText: string;
}): boolean {
  let started;
  let source;
  try {
    started = parseTaskReadme(opts.startedText);
    source = parseTaskReadme(opts.sourceText);
  } catch {
    return false;
  }
  const startedFrontmatter = started.frontmatter;
  const sourceFrontmatter = source.frontmatter;
  if (
    startedFrontmatter.id !== opts.foreignTaskId ||
    sourceFrontmatter.id !== opts.foreignTaskId ||
    startedFrontmatter.status !== "DOING" ||
    sourceFrontmatter.status !== "DONE" ||
    typeof startedFrontmatter.revision !== "number" ||
    typeof sourceFrontmatter.revision !== "number" ||
    sourceFrontmatter.revision <= startedFrontmatter.revision ||
    !canonicalEqual(
      withoutHistoricalLifecycleFields(startedFrontmatter),
      withoutHistoricalLifecycleFields(sourceFrontmatter),
    ) ||
    !sameImmutableTaskBody({
      startedFrontmatter,
      startedBody: started.body,
      sourceFrontmatter,
      sourceBody: source.body,
    })
  ) {
    return false;
  }

  const verification = sourceFrontmatter.verification;
  const events = recordArray(sourceFrontmatter.events);
  if (!isRecord(verification) || verification.state !== "ok" || !events) return false;

  const verifiedEvent = events.find(
    (event) =>
      exactKeys(event, ["type", "at", "author", "state", "note"]) &&
      event.type === "verify" &&
      event.state === "ok" &&
      requiredString(event.at) !== null &&
      requiredString(event.author) !== null &&
      requiredString(event.note) !== null,
  );
  const doneEvent = events.find(
    (event) =>
      exactKeys(event, ["type", "at", "author", "from", "to", "note"]) &&
      event.type === "status" &&
      event.from === "DOING" &&
      event.to === "DONE" &&
      requiredString(event.at) !== null &&
      requiredString(event.author) !== null &&
      requiredString(event.note) !== null &&
      String(event.note).startsWith("Verified:"),
  );
  if (!verifiedEvent || !doneEvent) return false;

  return (
    verification.updated_at === verifiedEvent.at &&
    verification.updated_by === verifiedEvent.author &&
    verification.note === verifiedEvent.note
  );
}

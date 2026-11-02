import { lstat, mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
} from "../../shared/contained-stable-file.js";
import { publishNewStableRegularFileNoFollow } from "../../shared/stable-file.js";
import {
  assertRetirementRoot,
  retirementBytesDigest,
  retirementRefusal,
  retirementRequestSchema,
  readRetirementFile,
  type RetirementContext,
  type RetirementImages,
  type RetirementRequest,
} from "./stale-admission-retirement-validation.js";

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const imagesSchema = z.strictObject({
  source: digest,
  journal: digest,
  work_order: digest,
  exchange: digest,
  result: digest.nullable(),
});
const preparedSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("stale_admission_retirement_prepared"),
  request: retirementRequestSchema,
  before: imagesSchema,
  after_journal: digest,
  after_exchange: digest,
  prepared_digest: digest,
});
type Prepared = z.infer<typeof preparedSchema>;
export type PreparedRetirement = {
  record: Prepared;
  before: RetirementImages;
  after_journal: string;
  after_exchange: string;
};

/** Immutable, operation-keyed evidence. A different request cannot create another attempt. */
export class RetirementEvidence {
  readonly directory: string;
  constructor(
    private readonly ctx: RetirementContext,
    private readonly request: RetirementRequest,
  ) {
    retirementRequestSchema.parse(request);
    if (ctx.task_id !== request.task_id) retirementRefusal("foreign evidence Task.");
    this.directory = path.join(
      ctx.common_git_dir,
      "agentplane/stale-admission-retirements",
      request.task_id,
      request.operation_key.slice(7),
    );
  }

  private async read(file: string): Promise<string | null> {
    try {
      return await readRetirementFile(this.ctx.common_git_dir, file);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
  }

  private async put(file: string, text: string): Promise<void> {
    const root = this.ctx.common_git_dir;
    await assertRetirementRoot(root);
    const relative = path.relative(root, path.dirname(file));
    if (!relative || relative.startsWith("..") || path.isAbsolute(relative))
      retirementRefusal("invalid native evidence directory.");
    let parent = root;
    for (const segment of relative.split(path.sep)) {
      parent = path.join(parent, segment);
      await captureContainedPathChainIdentity({
        repository_root: root,
        file_path: parent,
        label: "retirement evidence directory",
        path_policy: { target_kind: "file_or_directory", allow_missing_ancestors: true },
      });
      try {
        await mkdir(parent, { mode: 0o700 });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      }
      const stats = await lstat(parent);
      if (!stats.isDirectory() || stats.isSymbolicLink())
        retirementRefusal("unsafe native evidence directory.");
    }
    const chain = await captureContainedPathChainIdentity({
      repository_root: root,
      file_path: path.dirname(file),
      label: "retirement evidence parent",
      path_policy: { target_kind: "file_or_directory" },
    });
    await assertRetirementRoot(root);
    await publishNewStableRegularFileNoFollow(file, text, "immutable retirement evidence");
    await assertContainedPathChainIdentityUnchanged(chain, "retirement evidence parent");
    if ((await this.read(file)) !== text) retirementRefusal("native evidence collision or tamper.");
  }

  private objectPath(hash: string): string {
    return path.join(this.directory, "objects", hash.slice(7) + ".source");
  }

  private async object(hash: string): Promise<string> {
    const text = await this.read(this.objectPath(hash));
    if (text === null || retirementBytesDigest(text) !== hash)
      retirementRefusal("native beforeimage or afterimage is missing or changed.");
    return text;
  }

  async readPrepared(): Promise<PreparedRetirement | null> {
    const intent = await this.read(path.join(this.directory, "intent.json"));
    if (intent !== null && intent !== JSON.stringify(this.request, null, 2) + "\n")
      retirementRefusal("the retained operation intent belongs to a different request.");
    const text = await this.read(path.join(this.directory, "prepared.json"));
    if (text === null) {
      if ((await this.read(path.join(this.directory, "receipt.json"))) !== null)
        retirementRefusal("the completed operation lost its prepared evidence.");
      return null;
    }
    if (intent === null) retirementRefusal("the prepared operation lost its intent.");
    const record = preparedSchema.parse(JSON.parse(text));
    const { prepared_digest: stored, ...payload } = record;
    if (
      k.kernelDigest(payload) !== stored ||
      k.kernelDigest(record.request) !== k.kernelDigest(this.request)
    )
      retirementRefusal("the prepared operation or request changed.");
    const before = {
      source: await this.object(record.before.source),
      journal: await this.object(record.before.journal),
      work_order: await this.object(record.before.work_order),
      exchange: await this.object(record.before.exchange),
      result: record.before.result === null ? null : await this.object(record.before.result),
    };
    return {
      record,
      before,
      after_journal: await this.object(record.after_journal),
      after_exchange: await this.object(record.after_exchange),
    };
  }

  async prepare(
    before: RetirementImages,
    afterJournal: string,
    afterExchange: string,
  ): Promise<PreparedRetirement> {
    await this.put(
      path.join(this.directory, "intent.json"),
      JSON.stringify(this.request, null, 2) + "\n",
    );
    const hashes = {} as z.infer<typeof imagesSchema>;
    for (const key of ["source", "journal", "work_order", "exchange", "result"] as const) {
      const text = before[key];
      const hash = text === null ? null : retirementBytesDigest(text);
      Object.assign(hashes, { [key]: hash });
      if (text !== null && hash !== null) await this.put(this.objectPath(hash), text);
    }
    const after = {
      after_journal: retirementBytesDigest(afterJournal),
      after_exchange: retirementBytesDigest(afterExchange),
    };
    await this.put(this.objectPath(after.after_journal), afterJournal);
    await this.put(this.objectPath(after.after_exchange), afterExchange);
    const payload = {
      schema_version: 1 as const,
      kind: "stale_admission_retirement_prepared" as const,
      request: this.request,
      before: imagesSchema.parse(hashes),
      ...after,
    };
    const record = preparedSchema.parse({ ...payload, prepared_digest: k.kernelDigest(payload) });
    await this.put(
      path.join(this.directory, "prepared.json"),
      JSON.stringify(record, null, 2) + "\n",
    );
    const stored = await this.readPrepared();
    if (!stored) retirementRefusal("prepared operation was not retained.");
    return stored;
  }

  async receipt(prepared: PreparedRetirement, publish: boolean) {
    const receipt = {
      schema_version: 1,
      kind: "stale_admission_retirement_receipt",
      task_id: this.request.task_id,
      operation_key: this.request.operation_key,
      request_digest: k.kernelDigest(this.request),
      prepared_digest: prepared.record.prepared_digest,
      journal_after_digest: prepared.record.after_journal,
      exchange_after_digest: prepared.record.after_exchange,
      disposition: "admission_retired",
      prior_effect_outcome: "unassessed",
    };
    const file = path.join(this.directory, "receipt.json");
    const text = JSON.stringify(receipt, null, 2) + "\n";
    const current = await this.read(file);
    if (current !== null && current !== text)
      retirementRefusal("native retirement receipt changed.");
    if (publish && current === null) await this.put(file, text);
    return { receipt, present: current !== null, path: file };
  }
}

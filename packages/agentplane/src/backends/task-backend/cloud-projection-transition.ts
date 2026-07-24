import { cloudProjectionApplyIncompleteError } from "./cloud-sync-identity.js";
import type {
  TaskBackendProjectionObservation,
  TaskBackendProjectionTransition,
  TaskBackendProjectionTransitionHooks,
} from "./shared.js";

type CloudProjectionState = {
  last_checked_at: string | null;
  pending_projection_apply: unknown;
  pending_push: { failed_at: string } | null;
  projection_identity_sha256: string | null;
};

export async function observeCloudProjection(opts: {
  readState: () => Promise<CloudProjectionState>;
  staleAfterSeconds: number | null;
  provider: string | null;
  projectId: string;
  projectionIdentitySha256: string;
}): Promise<TaskBackendProjectionObservation> {
  const state = await opts.readState();
  if (state.pending_projection_apply) throw cloudProjectionApplyIncompleteError();
  return {
    projection_revision: null,
    projection_freshness: {
      last_checked_at: state.last_checked_at,
      stale_after_seconds: opts.staleAfterSeconds,
      pending_push: state.pending_push ? { failed_at: state.pending_push.failed_at } : null,
    },
    remote_projection: {
      provider: opts.provider,
      project_id: opts.projectId || null,
      identity_sha256: opts.projectionIdentitySha256,
      checkpoint_identity_sha256: state.projection_identity_sha256,
    },
  };
}

export async function runCloudProjectionTransition<T>(opts: {
  hooks: TaskBackendProjectionTransitionHooks<T>;
  observe: () => Promise<TaskBackendProjectionObservation>;
  assertFresh: () => Promise<void>;
  writeAndPush: () => Promise<void>;
}): Promise<TaskBackendProjectionTransition<T>> {
  let before = await opts.hooks.capture(await opts.observe());
  await opts.hooks.assertBefore(before);
  await opts.assertFresh();
  before = await opts.hooks.capture(await opts.observe());
  await opts.hooks.assertBefore(before);
  await opts.writeAndPush();
  return { before, after: await opts.hooks.capture(await opts.observe()) };
}

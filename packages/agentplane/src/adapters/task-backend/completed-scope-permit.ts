import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { z } from "zod";
import type { TaskData } from "../../backends/task-backend.js";
import { scopeIntakeDigest } from "./kernel-scope-intake.js";

export const COMPLETED_SCOPE_ADMISSIONS = "agentplane.completed_scope_admissions";
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const permits = new WeakMap<object, string>();
function fail(reason: string): never {
  throw new Error(`Completed scope admission rejected (${reason})`);
}
export function completedScopeAdmissionIds(task: Pick<TaskData, "extensions">): string[] {
  const raw = task.extensions?.[COMPLETED_SCOPE_ADMISSIONS];
  if (raw === undefined) return [];
  const ids = z.array(digest).min(1).max(64).parse(raw);
  if (new Set(ids).size !== ids.length) fail("duplicate proof");
  return ids;
}
function binding(task: TaskData, repositoryIdentity: string) {
  return k.kernelDigest({
    repositoryIdentity,
    id: task.id,
    status: task.status,
    kernel: task.extensions?.task_kernel,
    base: task.extensions?.task_execution_context,
    route: task.execution_route,
    intake: scopeIntakeDigest(task.execution_contract),
    proofs: completedScopeAdmissionIds(task),
  });
}
export function hasCompletedScopePermit(task: TaskData, repositoryIdentity: string): boolean {
  return permits.get(task) === binding(task, repositoryIdentity);
}
/** Only an explicitly checked metadata projection may inherit an object-bound permit. */
export function transferCompletedScopePermit<T extends TaskData>(source: TaskData, next: T): T {
  const pin = permits.get(source);
  const identity = (source.extensions?.task_kernel as { repository_identity?: string } | undefined)
    ?.repository_identity;
  if (pin && identity && pin === binding(source, identity) && pin === binding(next, identity))
    permits.set(next, pin);
  return next;
}
/** The protected proof reader calls this only after authenticating native evidence. */
export function retainAuthenticatedCompletedScopePermit(task: TaskData, identity: string): void {
  permits.set(task, binding(task, identity));
}

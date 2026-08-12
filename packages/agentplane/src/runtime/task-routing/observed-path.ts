import {
  componentForVerificationPath,
  repositoryEffectsForPath,
  type TaskRepositoryEffect,
} from "@agentplaneorg/core/tasks";

export function structuralEffectsForPath(pathValue: string): TaskRepositoryEffect[] {
  return repositoryEffectsForPath(pathValue);
}

export function componentForPath(pathValue: string): string {
  return componentForVerificationPath(pathValue);
}

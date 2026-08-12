export type TaskVerificationEffects = {
  declaredRepositoryEffects: string[];
  declaredExternalEffects: string[];
  observedRepositoryEffects: string[];
  observedExternalEffects: string[];
  sourcePaths: string[];
};

export function readTaskVerificationEffects(
  changedFiles: string[],
  options?: { cwd?: string },
): TaskVerificationEffects;

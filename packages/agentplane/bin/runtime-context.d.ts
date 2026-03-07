export type FrameworkCheckout = {
  repoRoot: string;
  packageRoot: string;
  repoBin: string;
  repoCli: string;
};

export type FrameworkBinaryContext = {
  inFrameworkCheckout: boolean;
  isRepoLocalBinary: boolean;
  isRepoLocalRuntime: boolean;
  checkout: FrameworkCheckout | null;
  thisBin: string;
};

export function findFrameworkCheckout(startDir: string): FrameworkCheckout | null;

export function isPathInside(baseDir: string, targetPath: string): boolean;

export function resolveFrameworkBinaryContext(options: {
  cwd: string;
  thisBin: string;
}): FrameworkBinaryContext;

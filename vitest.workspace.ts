import { configDefaults, defineConfig, type UserWorkspaceConfig } from "vitest/config";

import { getVitestWorkspaceProjects } from "./scripts/lib/test-route-registry.mjs";
import baseConfig from "./vitest.config";

function project(
  name: string,
  test: NonNullable<UserWorkspaceConfig["test"]>,
): UserWorkspaceConfig {
  const { test: baseTest, ...baseProjectConfig } = baseConfig as UserWorkspaceConfig;
  const baseExclude = Array.isArray(baseTest?.exclude) ? baseTest.exclude : [];
  const projectExclude = Array.isArray(test.exclude) ? test.exclude : [];

  return {
    ...baseProjectConfig,
    test: {
      ...baseTest,
      ...test,
      exclude: [...configDefaults.exclude, ...baseExclude, ...projectExclude],
      name,
    },
  };
}

export default defineConfig({
  test: {
    projects: getVitestWorkspaceProjects().map((route) =>
      project(route.name, route.test as NonNullable<UserWorkspaceConfig["test"]>),
    ),
  },
});

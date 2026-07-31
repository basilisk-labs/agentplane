/* eslint-disable n/no-unsupported-features/node-builtins -- Node >=24 is enforced by the architecture runner. */
import { createRequire, registerHooks } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(new URL("../../package.json", import.meta.url));
const typescriptUrl = pathToFileURL(require.resolve("typescript")).href;
const typescriptPackageUrl = pathToFileURL(require.resolve("typescript/package.json")).href;

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "typescript") {
      return { shortCircuit: true, url: typescriptUrl };
    }
    if (specifier === "typescript/package.json") {
      return { shortCircuit: true, url: typescriptPackageUrl };
    }
    return nextResolve(specifier, context);
  },
});

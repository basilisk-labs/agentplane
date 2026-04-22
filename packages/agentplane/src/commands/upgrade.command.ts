import type { CommandHandler } from "../cli/spec/spec.js";
import { cmdUpgradeParsed } from "./upgrade.js";
import type { UpgradeParsed } from "./upgrade.spec.js";

export { upgradeSpec } from "./upgrade.spec.js";

export const runUpgrade: CommandHandler<UpgradeParsed> = (ctx, flags) =>
  cmdUpgradeParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, flags });

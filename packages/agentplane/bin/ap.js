#!/usr/bin/env node
process.env.AGENTPLANE_CLI_ALIAS = "ap";
process.env.AGENTPLANE_AGENT_MODE = "1";
process.env.AGENTPLANE_PROMPTS ??= "plain";
process.env.AGENTPLANE_NO_UPDATE_CHECK ??= "1";

await import("./agentplane.js");

import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "node:http";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { createBrokeredAppServer } from "./brokered-app-server.mjs";
import { writeIsolationPolicy } from "./isolation.mjs";

test(
  "real app-server dispatches only brokered workers with no native environment or auth access",
  { timeout: 20_000 },
  async (t) => {
    const root = mkdtempSync(path.join(os.tmpdir(), "m05-broker-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const runtime = path.join(root, "runtime");
    const subject = path.join(root, "subject");
    mkdirSync(runtime);
    mkdirSync(subject);
    const bypass = path.join(root, "mcp-bypass");
    writeFileSync(
      path.join(runtime, "config.toml"),
      `[mcp_servers.unapproved]\ncommand = "/usr/bin/python3"\nargs = ["-I", "-c", ${JSON.stringify(`open(${JSON.stringify(bypass)}, "w").write("bypass")`)}]\n`,
    );
    const poisonConfig = readFileSync(path.join(runtime, "config.toml"), "utf8");
    const secret = path.join(runtime, "credential-sentinel");
    writeFileSync(secret, "NOT_A_REAL_CREDENTIAL");
    const policyPath = path.join(root, "policy.json");
    writeIsolationPolicy(policyPath, {
      cwd: subject,
      readOnly: [subject],
      writable: [subject],
      network: "deny",
    });
    const binary = realpathSync(
      execFileSync("python3", ["-I", "-c", "import shutil;print(shutil.which('codex'))"], {
        encoding: "utf8",
      }).trim(),
    );
    let requests = 0;
    let offered;
    let toolResult;
    const worker = `import os,socket\ntry: open(${JSON.stringify(secret)}).read(); raise RuntimeError('auth readable')\nexcept PermissionError: pass\ntry: socket.socket(socket.AF_INET); raise RuntimeError('network allowed')\nexcept PermissionError: pass\nos.mkdir('.codex')\nopen('.codex/config.toml','w').write(${JSON.stringify(poisonConfig)})\nopen('proof','w').write('isolated')`;
    const script = `if (ALL_TOOLS.some(t => !['m05_exec','clock__curr_time','create_goal','get_goal','update_goal'].includes(t.name))) throw Error('unexpected tool: '+ALL_TOOLS.map(t=>t.name).join(',')); for (const name of ['exec_command','apply_patch','view_image','web__run']) { if (typeof tools[name] !== 'undefined') throw Error('native bypass exposed'); } text(await tools.m05_exec({argv:${JSON.stringify(["/usr/bin/python3", "-I", "-c", worker])}}));`;
    const server = createServer(async (req, res) => {
      let data = "";
      for await (const chunk of req) data += chunk;
      const body = JSON.parse(data);
      requests++;
      if (requests > 1) toolResult = body.input.slice(-1);
      if (requests === 1) offered = body.input.filter((item) => item.type === "additional_tools");
      const output =
        requests === 1
          ? [
              {
                type: "custom_tool_call",
                id: "tool_1",
                call_id: "call_1",
                name: "exec",
                namespace: "functions",
                input: script,
              },
            ]
          : [];
      res.writeHead(200, { "content-type": "text/event-stream" });
      for (const item of output) {
        res.write(
          `data: ${JSON.stringify({ type: "response.output_item.added", output_index: 0, item })}\n\n`,
        );
        res.write(
          `data: ${JSON.stringify({ type: "response.output_item.done", output_index: 0, item })}\n\n`,
        );
      }
      res.end(
        `data: ${JSON.stringify({ type: "response.completed", response: { id: `mock_${requests}`, object: "response", status: "completed", output, usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 } } })}\n\n`,
      );
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    t.after(() => {
      server.closeAllConnections();
      server.close();
    });
    const auditPath = path.join(root, "effects.jsonl");
    const options = {
      policyPath,
      auditPath,
      codexBinary: binary,
      cwd: subject,
      env: { PATH: process.env.PATH, HOME: runtime, CODEX_HOME: runtime },
      timeoutMs: 12_000,
      offlineProvider: `http://127.0.0.1:${server.address().port}/v1`,
    };
    await assert.rejects(createBrokeredAppServer(options), /Unreviewed ambient configuration/u);
    assert.equal(existsSync(bypass), false);
    const safeConfig = 'model_reasoning_effort="medium"\n';
    writeFileSync(path.join(runtime, "config.toml"), safeConfig);
    options.approvedConfigDigests = {
      [path.join(runtime, "config.toml")]:
        `sha256:${createHash("sha256").update(safeConfig).digest("hex")}`,
    };
    const port = await createBrokeredAppServer(options);
    t.after(() => port.close());

    const threadOptions = await port.threadOptions();
    assert.equal(threadOptions.cwd, runtime);
    const thread = await port.request("thread/start", {
      ...(await port.threadOptions()),
      model: "gpt-6-astra",
      approvalPolicy: "never",
      ephemeral: true,
    });
    let timer;
    const completed = new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new Error("Offline turn deadline")), 12_000);
      port.subscribe((event) => {
        if (event.method === "turn/completed") {
          clearTimeout(timer);
          resolve(event);
        }
      });
    });
    t.after(() => clearTimeout(timer));
    await port.request("turn/start", {
      threadId: thread.thread.id,
      input: [{ type: "text", text: "Offline mock qualification only." }],
      ...(await port.turnOptions()),
    });
    await completed;
    assert.equal(requests, 2);
    assert.equal(existsSync(bypass), false);
    assert.ok(existsSync(path.join(subject, "proof")), JSON.stringify(toolResult));
    assert.equal(readFileSync(path.join(subject, "proof"), "utf8"), "isolated");
    assert.equal(readFileSync(secret, "utf8"), "NOT_A_REAL_CREDENTIAL");
    const namespaces = offered.flatMap((item) => item.tools).map((tool) => tool.name);
    assert.ok(!namespaces.includes("collaboration"));
    const records = readFileSync(auditPath, "utf8")
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));
    assert.deepEqual(
      records.map((record) => record.state),
      ["intent", "result"],
    );
    assert.equal(records[1].status, 0);
    assert.equal(records[0].thread_id, thread.thread.id);
    writeFileSync(path.join(runtime, "config.toml"), safeConfig + "# changed\n");
    await assert.rejects(
      port.request("thread/start", { ...(await port.threadOptions()), model: "gpt-6-astra" }),
      /Reviewed configuration changed/u,
    );
    writeFileSync(path.join(runtime, "config.toml"), safeConfig);
    const later = await port.request("thread/start", {
      ...(await port.threadOptions()),
      model: "gpt-6-astra",
      approvalPolicy: "never",
      ephemeral: true,
    });
    const laterDone = new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new Error("Second offline turn deadline")), 12_000);
      const off = port.subscribe((event) => {
        if (event.method === "turn/completed" && event.params.threadId === later.thread.id) {
          clearTimeout(timer);
          off();
          resolve();
        }
      });
    });
    await port.request("turn/start", {
      threadId: later.thread.id,
      input: [{ type: "text", text: "Recheck after task-side configuration mutation." }],
      ...(await port.turnOptions()),
    });
    await laterDone;
    assert.equal(requests, 3);
    assert.equal(existsSync(bypass), false);
  },
);

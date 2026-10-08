import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, symlinkSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { runIsolated, writeIsolationPolicy } from "./isolation.mjs";

test("Landlock denies hidden oracle reads/writes and escapes in inherited descendants", (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-isolation-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const subject = path.join(root, "subject");
  const source = path.join(subject, "src");
  mkdirSync(source, { recursive: true });
  const oracle = path.join(root, "hidden-oracle");
  writeFileSync(oracle, "SENTINEL");
  const visible = path.join(subject, "visible.txt");
  writeFileSync(visible, "visible");
  symlinkSync(oracle, path.join(source, "escape"));
  const policy = path.join(root, "policy.json");
  writeIsolationPolicy(policy, { cwd: subject, readOnly: [subject], writable: [source] });
  const script = `import fs from 'node:fs'; import {spawnSync} from 'node:child_process';
const denied=[]; for (const [name, action] of Object.entries({read:()=>fs.readFileSync(${JSON.stringify(oracle)}),write:()=>fs.writeFileSync(${JSON.stringify(oracle)},'bad'),symlink:()=>fs.readFileSync('src/escape'),visibleWrite:()=>fs.writeFileSync('visible.txt','bad'),proc:()=>fs.readFileSync('/proc/self/environ')})) {try{action();throw Error('allowed '+name)}catch(e){if(e.code!=='EACCES'&&e.code!=='EPERM')throw e;denied.push(name)}};
fs.writeFileSync('src/allowed.txt','allowed');
const child=spawnSync(process.execPath,['--input-type=module','-e',"import fs from 'node:fs';try{fs.readFileSync("+JSON.stringify(${JSON.stringify(oracle)})+");process.exit(9)}catch(e){process.exit(e.code==='EACCES'?0:8)}"],{encoding:'utf8'});
if(child.status!==0)throw Error(child.stderr||'descendant bypass');console.log(JSON.stringify({denied,visible:fs.readFileSync('visible.txt','utf8')}));`;
  const result = runIsolated(policy, [process.execPath, "--input-type=module", "-e", script]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).denied, [
    "read",
    "write",
    "symlink",
    "visibleWrite",
    "proc",
  ]);
  assert.equal(readFileSync(oracle, "utf8"), "SENTINEL");
  assert.equal(readFileSync(path.join(source, "allowed.txt"), "utf8"), "allowed");
});

test("isolation blocks host sockets, process-memory interfaces and offline networking", (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-ipc-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const policy = path.join(root, "policy.json");
  writeIsolationPolicy(policy, { cwd: root, readOnly: [root] });
  const result = runIsolated(policy, [
    "/usr/bin/python3",
    "-I",
    "-c",
    `import socket,ctypes,os,json
results=[]
for family in [socket.AF_UNIX,socket.AF_INET]:
 try: socket.socket(family); raise RuntimeError('socket allowed')
 except PermissionError: results.append('denied')
libc=ctypes.CDLL(None,use_errno=True)
for number in [101,109,112,310,311,438,62,424,425]:
 assert libc.syscall(number,0,0,0,0,0,0)==-1
 assert ctypes.get_errno()==1
print(json.dumps(results))`,
  ]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), ["denied", "denied"]);
});

test("restricted children receive no ambient environment or preload options", (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-env-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const policy = path.join(root, "policy.json");
  writeIsolationPolicy(policy, { cwd: root, readOnly: [root] });
  const result = runIsolated(
    policy,
    [process.execPath, "-e", "console.log(JSON.stringify(process.env))"],
    { env: { M05_ORACLE_SENTINEL: "secret", NODE_OPTIONS: "--require=missing" } },
  );
  assert.equal(result.status, 0, result.stderr);
  const env = JSON.parse(result.stdout);
  assert.equal(env.M05_ORACLE_SENTINEL, undefined);
  assert.equal(env.NODE_OPTIONS, undefined);
});

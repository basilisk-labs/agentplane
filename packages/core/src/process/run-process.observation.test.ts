import { expect, it } from "vitest";
import { runProcess } from "./run-process.js";

it("observes output while preserving managed executable and buffer enforcement", async () => {
  const chunks: string[] = [];
  const result = await runProcess({
    command: "node",
    args: ["-e", "process.stdout.write('first'); setTimeout(()=>process.stderr.write('last'),30)"],
    reject: false,
    maxBuffer: 1024,
    onStdout: (chunk) => chunks.push(`out:${String(chunk)}`),
    onStderr: (chunk) => chunks.push(`err:${String(chunk)}`),
  });
  expect(result.exitCode).toBe(0);
  expect(result.stdout).toBe("first");
  expect(result.stderr).toBe("last");
  expect(chunks).toEqual(["out:first", "err:last"]);
  await expect(
    runProcess({
      command: "unadmitted-executable",
      onStdout: (chunk) => chunks.push(String(chunk)),
    }),
  ).rejects.toThrow("allowed executable");
  const capped = await runProcess({
    command: "node",
    args: ["-e", "process.stdout.write('x'.repeat(40000))"],
    maxBuffer: 1024,
    reject: false,
    onStdout: (chunk) => chunks.push(String(chunk)),
  });
  expect(capped.failed).toBe(true);
});

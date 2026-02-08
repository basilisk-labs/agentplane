import { generateTaskId as generateTaskIdCore } from "@agentplaneorg/core";

import { TASK_ID_RE } from "./constants.js";

type GenerateTaskId = (opts: {
  length: number;
  attempts: number;
  isAvailable?: (taskId: string) => boolean | Promise<boolean>;
  date?: Date;
}) => Promise<string>;

export const generateTaskId: GenerateTaskId = generateTaskIdCore;

export function validateTaskId(taskId: string): void {
  if (TASK_ID_RE.test(taskId)) return;
  throw new Error(`Invalid task id: ${taskId} (expected YYYYMMDDHHMM-XXXX)`);
}

export function missingTaskIdMessage(): string {
  return "Missing task id (expected non-empty value)";
}

export function unknownTaskIdMessage(taskId: string): string {
  return `Unknown task id: ${taskId}`;
}

export function invalidLengthMessage(value: number, min: number): string {
  return `Invalid length: ${value} (expected >= ${min})`;
}

import { z } from "zod";

import { ISO_UTC_TIMESTAMP, NON_EMPTY_STRING } from "./task-artifact-schema.shared.js";

const TASK_EVENT_TYPE_VALUES = ["status", "comment", "verify"] as const;

export const DOC_VERSION_SCHEMA = z.literal(3);
export const TASK_SECTIONS_SCHEMA = z.record(z.string(), z.string());

export const TASK_COMMENT_SCHEMA = z
  .object({
    author: NON_EMPTY_STRING,
    body: NON_EMPTY_STRING,
  })
  .strict();

export const TASK_EVENT_SCHEMA = z
  .object({
    type: z.enum(TASK_EVENT_TYPE_VALUES),
    at: ISO_UTC_TIMESTAMP,
    author: NON_EMPTY_STRING,
    from: z.string().optional(),
    to: z.string().optional(),
    state: z.string().optional(),
    note: z.string().optional(),
    body: z.string().optional(),
  })
  .passthrough();

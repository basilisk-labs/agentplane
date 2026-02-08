import { TASK_ID_ALPHABET } from "@agentplaneorg/core";

export const TASK_ID_RE = new RegExp(String.raw`^\d{12}-[${TASK_ID_ALPHABET}]{4,}$`);
export const DEFAULT_DOC_UPDATED_BY = "agentplane";
export const DOC_VERSION = 2;

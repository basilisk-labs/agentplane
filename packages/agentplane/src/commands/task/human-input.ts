import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";

const HUMAN_INPUT_EXTENSION_KEY = "agentplane.human_input";

export type HumanInputQuestion = {
  id: string;
  question: string;
  askedAt: string;
  askedBy: string;
  previousStatus: string;
};

export type HumanInputState = {
  openQuestion: HumanInputQuestion | null;
  history: {
    id: string;
    question: string;
    askedAt: string;
    askedBy: string;
    answeredAt: string;
    answeredBy: string;
    answer: string;
    previousStatus: string;
  }[];
};

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function normalizeHistory(value: unknown): HumanInputState["history"] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!isRecord(item)) return null;
      const id = readString(item.id);
      const question = readString(item.question);
      const askedAt = readString(item.askedAt);
      const askedBy = readString(item.askedBy);
      const answeredAt = readString(item.answeredAt);
      const answeredBy = readString(item.answeredBy);
      const answer = readString(item.answer);
      const previousStatus = readString(item.previousStatus);
      if (
        !id ||
        !question ||
        !askedAt ||
        !askedBy ||
        !answeredAt ||
        !answeredBy ||
        !answer ||
        !previousStatus
      ) {
        return null;
      }
      return { id, question, askedAt, askedBy, answeredAt, answeredBy, answer, previousStatus };
    })
    .filter((item): item is HumanInputState["history"][number] => item !== null);
}

export function getHumanInputState(task: Pick<TaskData, "extensions">): HumanInputState {
  const raw = isRecord(task.extensions?.[HUMAN_INPUT_EXTENSION_KEY])
    ? task.extensions[HUMAN_INPUT_EXTENSION_KEY]
    : null;
  const openRaw = isRecord(raw?.openQuestion) ? raw.openQuestion : null;
  const id = readString(openRaw?.id);
  const question = readString(openRaw?.question);
  const askedAt = readString(openRaw?.askedAt);
  const askedBy = readString(openRaw?.askedBy);
  const previousStatus = readString(openRaw?.previousStatus);
  return {
    openQuestion:
      id && question && askedAt && askedBy && previousStatus
        ? { id, question, askedAt, askedBy, previousStatus }
        : null,
    history: normalizeHistory(raw?.history),
  };
}

export function setHumanInputState(
  task: TaskData,
  state: HumanInputState,
): NonNullable<TaskData["extensions"]> {
  return {
    ...(isRecord(task.extensions) ? task.extensions : {}),
    [HUMAN_INPUT_EXTENSION_KEY]: state,
  };
}

export function humanInputAnswerCommand(taskId: string): string {
  return `agentplane task answer ${taskId} --by USER --body "..."`;
}


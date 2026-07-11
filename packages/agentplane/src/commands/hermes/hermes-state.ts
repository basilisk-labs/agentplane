import { readFile } from "node:fs/promises";
import { isRecord } from "../../shared/guards.js";
import type { HermesLocalProjection } from "./hermes-runtime.js";

function hermesCardAgentplaneTaskId(card: Record<string, unknown>): string | null {
  const direct = card.agentplane_task_id ?? card.agentplaneTaskId;
  if (typeof direct === "string" && direct.trim().length > 0) return direct.trim();
  const metadata = isRecord(card.metadata) ? card.metadata : null;
  const agentplane = metadata && isRecord(metadata.agentplane) ? metadata.agentplane : null;
  for (const key of ["task_id", "taskId", "id"]) {
    const value = agentplane?.[key];
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return null;
}

export async function loadHermesStateSnapshot(path: string) {
  const parsed = JSON.parse(await readFile(path, "utf8")) as unknown;
  if (Array.isArray(parsed)) return parsed.filter(isRecord);
  if (isRecord(parsed)) {
    const cards = parsed.cards ?? parsed.tasks ?? parsed.items;
    if (Array.isArray(cards)) return cards.filter(isRecord);
    return [parsed];
  }
  return [];
}

export function reconcileHermesState(
  localProjection: HermesLocalProjection | null,
  cards: Record<string, unknown>[],
  taskId: string | null,
) {
  const relevantCards = taskId
    ? cards.filter((card) => hermesCardAgentplaneTaskId(card) === taskId)
    : cards;
  const findings: { code: string; severity: "info" | "warn"; message: string }[] = [];
  if (taskId && relevantCards.length === 0) {
    findings.push({
      code: "missing_hermes_card",
      severity: "warn",
      message: `No Hermes card in state snapshot maps to Agentplane task ${taskId}.`,
    });
  }
  const duplicateGroups = new Map<string, number>();
  for (const card of relevantCards) {
    const cardTaskId = hermesCardAgentplaneTaskId(card);
    if (!cardTaskId) continue;
    duplicateGroups.set(cardTaskId, (duplicateGroups.get(cardTaskId) ?? 0) + 1);
  }
  for (const [cardTaskId, count] of duplicateGroups) {
    if (count <= 1) continue;
    findings.push({
      code: "duplicate_hermes_cards",
      severity: "warn",
      message: `${count} Hermes cards map to Agentplane task ${cardTaskId}.`,
    });
  }
  const first = relevantCards[0];
  const rawStatus = first?.status ?? first?.state;
  const status = typeof rawStatus === "string" ? rawStatus.trim().toLowerCase() : "";
  if (
    localProjection?.terminal.hermes_root_complete_allowed === true &&
    status &&
    !["done", "complete", "completed"].includes(status)
  ) {
    findings.push({
      code: "agentplane_done_hermes_open",
      severity: "warn",
      message: "Agentplane is terminal and verified, but the Hermes card is not complete.",
    });
  }
  if (
    localProjection?.terminal.hermes_root_complete_allowed === false &&
    ["done", "complete", "completed"].includes(status)
  ) {
    findings.push({
      code: "hermes_complete_agentplane_open",
      severity: "warn",
      message: "Hermes card is complete, but Agentplane task truth is not terminal verified.",
    });
  }
  return {
    state_card_count: cards.length,
    matched_card_count: relevantCards.length,
    matched_cards: relevantCards.map((card) => ({
      id: typeof card.id === "string" ? card.id : null,
      status: typeof card.status === "string" ? card.status : (card.state ?? null),
      assignee: typeof card.assignee === "string" ? card.assignee : null,
      agentplane_task_id: hermesCardAgentplaneTaskId(card),
    })),
    findings,
  };
}

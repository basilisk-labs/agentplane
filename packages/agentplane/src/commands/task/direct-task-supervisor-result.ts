import type { SupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

export type JournalProjection = {
  path: string;
  status: SupervisorExecutionEpisodeJournal["status"];
  cursor: SupervisorExecutionEpisodeJournal["cursor"];
  usage: SupervisorExecutionEpisodeJournal["usage"];
  stop: SupervisorExecutionEpisodeJournal["stop"];
  digest: SupervisorExecutionEpisodeJournal["digest"];
};

export function journalProjection(
  journal: SupervisorExecutionEpisodeJournal,
  pathValue: string,
): JournalProjection {
  return {
    path: pathValue,
    status: journal.status,
    cursor: journal.cursor,
    usage: journal.usage,
    stop: journal.stop,
    digest: journal.digest,
  };
}

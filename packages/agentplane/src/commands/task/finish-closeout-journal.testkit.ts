export function openFinishCloseoutJournal() {
  return Promise.resolve({ path: "/tmp/finish-closeout.json", journal: { state: "prepared" } });
}

export function advanceFinishCloseoutJournal({
  journal,
  state,
}: {
  journal: Record<string, unknown>;
  state: string;
}) {
  return Promise.resolve({ ...journal, state });
}

export function markFinishCloseoutRecoveryRequired(): Promise<void> {
  return Promise.resolve();
}

export type RunnerTerminationCause = "cancel" | "timeout" | "exit";
type SignalTerminationCause = Exclude<RunnerTerminationCause, "exit">;

export function createRunnerTerminationArbiter() {
  let reservation: SignalTerminationCause | null = null;
  let committed: RunnerTerminationCause | null = null;

  return {
    reserve(cause: SignalTerminationCause): boolean {
      if (committed || reservation) return false;
      reservation = cause;
      return true;
    },

    commit(cause: SignalTerminationCause): boolean {
      if (committed || reservation !== cause) return false;
      reservation = null;
      committed = cause;
      return true;
    },

    release(cause: SignalTerminationCause): void {
      if (!committed && reservation === cause) reservation = null;
    },

    claimExit(): boolean {
      if (committed || reservation) return false;
      committed = "exit";
      return true;
    },

    cause(): RunnerTerminationCause | null {
      return committed;
    },
  };
}

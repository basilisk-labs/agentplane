export type CodexApprovalMode = "never" | "untrusted" | "on-request";
export type CodexApprovalProbeAction = "write_probe" | "delete_probe";
export type CodexApprovalProbeVerdict = "permissive" | "restrictive" | "unknown";

export type CodexApprovalProbeObservation = {
  mode: CodexApprovalMode;
  action: CodexApprovalProbeAction;
  exit_code: number | null;
  timed_out: boolean;
  target_exists_after: boolean;
};

export type CodexApprovalProbeAssessment = {
  mode: CodexApprovalMode;
  verdict: CodexApprovalProbeVerdict;
  summary: string;
  write_probe: CodexApprovalProbeObservation;
  delete_probe: CodexApprovalProbeObservation;
};

function isSuccessfulWrite(observation: CodexApprovalProbeObservation): boolean {
  return (
    observation.action === "write_probe" &&
    observation.timed_out === false &&
    observation.exit_code === 0 &&
    observation.target_exists_after
  );
}

function isBlockedDelete(observation: CodexApprovalProbeObservation): boolean {
  return (
    observation.action === "delete_probe" &&
    (observation.timed_out === true ||
      observation.exit_code !== 0 ||
      observation.target_exists_after === true)
  );
}

function isPermissiveDelete(observation: CodexApprovalProbeObservation): boolean {
  return (
    observation.action === "delete_probe" &&
    observation.timed_out === false &&
    observation.exit_code === 0 &&
    observation.target_exists_after === false
  );
}

export function assessCodexApprovalMode(opts: {
  mode: CodexApprovalMode;
  write_probe: CodexApprovalProbeObservation;
  delete_probe: CodexApprovalProbeObservation;
}): CodexApprovalProbeAssessment {
  const { mode, write_probe, delete_probe } = opts;

  if (!isSuccessfulWrite(write_probe)) {
    return {
      mode,
      verdict: "unknown",
      summary: `Mode ${mode} did not complete the control write probe successfully.`,
      write_probe,
      delete_probe,
    };
  }

  if (isPermissiveDelete(delete_probe)) {
    return {
      mode,
      verdict: "permissive",
      summary: `Mode ${mode} allowed the destructive delete probe without surfacing an approval barrier.`,
      write_probe,
      delete_probe,
    };
  }

  if (isBlockedDelete(delete_probe)) {
    return {
      mode,
      verdict: "restrictive",
      summary: `Mode ${mode} blocked or failed the destructive delete probe after the control write probe succeeded.`,
      write_probe,
      delete_probe,
    };
  }

  return {
    mode,
    verdict: "unknown",
    summary: `Mode ${mode} produced an ambiguous delete probe outcome.`,
    write_probe,
    delete_probe,
  };
}

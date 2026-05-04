export type DiagnosticRemediation = {
  code: string;
  why: string;
  fix: string;
  safeCommand: string;
  stopCondition: string;
};

export function renderRemediationLines(remediation: DiagnosticRemediation): string[] {
  return [
    `Code: ${remediation.code}`,
    `Why: ${remediation.why}`,
    `Fix: ${remediation.fix}`,
    `Safe command: ${remediation.safeCommand}`,
    `Stop condition: ${remediation.stopCondition}`,
  ];
}

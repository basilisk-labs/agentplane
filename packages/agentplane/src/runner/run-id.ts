export function createRunnerRunId(date: Date = new Date()): string {
  return date.toISOString().replaceAll(":", "-").replaceAll(".", "-");
}

export type LifecycleControlEvent = {
  schema_version: 1;
  kind: "agentplane.lifecycle_control_command";
  observed_at: string;
  command: string;
  pid?: number;
  phase?: string;
  mode?: string;
  argv?: string[];
};

export const LIFECYCLE_CONTROL_EVENT_KIND: LifecycleControlEvent["kind"];
export function recordLifecycleControlCommand(
  eventLogPath: string | null | undefined,
  event: Omit<LifecycleControlEvent, "schema_version" | "kind" | "observed_at"> &
    Partial<Pick<LifecycleControlEvent, "schema_version" | "kind" | "observed_at">>,
): LifecycleControlEvent | null;
export function readLifecycleControlEvents(eventLogPath: string): LifecycleControlEvent[];
export function evaluateLifecycleControlBudget(
  events: LifecycleControlEvent[],
  maximum?: number,
): {
  schema_version: 1;
  kind: "agentplane.lifecycle_control_budget";
  provenance: "observed_command_events";
  call_count: number;
  maximum: number;
  commands: string[];
  ok: boolean;
};

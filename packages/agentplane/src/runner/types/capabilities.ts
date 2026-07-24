export type RunnerCapabilityLevel = "native" | "wrapper" | "advisory" | "unsupported";

export type RunnerCapabilityChannel = "argv" | "env" | "result" | "none";

export type RunnerCapabilityDescriptor = {
  level: RunnerCapabilityLevel;
  channel: RunnerCapabilityChannel;
  supported_values?: string[];
  note?: string;
};

type RunnerFilesystemEffectContainmentCapability = {
  level: RunnerCapabilityLevel;
  supported_sandboxes: string[];
  boundary: "workspace";
  descendant_inheritance: "enforced" | "not_enforced";
  lifetime_containment: "not_provided";
  note?: string;
};

export type RunnerAdapterCapabilities = {
  adapter_id: string;
  fields: Record<string, RunnerCapabilityDescriptor>;
  filesystem_effect_containment?: RunnerFilesystemEffectContainmentCapability;
};

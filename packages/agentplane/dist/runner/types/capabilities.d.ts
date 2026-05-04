export type RunnerCapabilityLevel = "native" | "wrapper" | "advisory" | "unsupported";
export type RunnerCapabilityChannel = "argv" | "env" | "result" | "none";
export type RunnerCapabilityDescriptor = {
    level: RunnerCapabilityLevel;
    channel: RunnerCapabilityChannel;
    supported_values?: string[];
    note?: string;
};
export type RunnerAdapterCapabilities = {
    adapter_id: string;
    fields: Record<string, RunnerCapabilityDescriptor>;
};
//# sourceMappingURL=capabilities.d.ts.map
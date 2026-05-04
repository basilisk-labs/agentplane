import type { AgentplaneCapabilityEntry, AgentplaneCapabilityFilter, AgentplaneCapabilityRegistry } from "./model.js";
export declare function createCapabilityRegistry(entries?: readonly AgentplaneCapabilityEntry[]): AgentplaneCapabilityRegistry;
export declare function mergeCapabilityRegistries(...registries: readonly (AgentplaneCapabilityRegistry | null | undefined)[]): AgentplaneCapabilityRegistry;
export declare function listCapabilities(registry: AgentplaneCapabilityRegistry, filter?: AgentplaneCapabilityFilter): AgentplaneCapabilityEntry[];
export declare function getCapabilityEntries(registry: AgentplaneCapabilityRegistry, id: string): AgentplaneCapabilityEntry[];
//# sourceMappingURL=registry.d.ts.map
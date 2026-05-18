export type ReferenceSource = {
  id: string;
  title: string;
  author: string;
  url: string;
  category: string;
  useOn: readonly string[];
};

export const referenceSources = [
  {
    id: "martin-fowler-harness-engineering",
    title: "Harness engineering for coding agent users",
    author: "Birgitta Bockeler / Martin Fowler site",
    url: "https://martinfowler.com/articles/harness-engineering.html",
    category: "harness-engineering",
    useOn: ["/docs/concepts/harness-engineering", "/docs/concepts/context-engineering"],
  },
  {
    id: "oreilly-agent-harness-engineering",
    title: "Agent Harness Engineering",
    author: "O'Reilly Radar",
    url: "https://www.oreilly.com/radar/agent-harness-engineering/",
    category: "harness-engineering",
    useOn: ["/docs/concepts/harness-engineering"],
  },
  {
    id: "anthropic-building-effective-agents",
    title: "Building Effective AI Agents",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    category: "agent-workflows",
    useOn: ["/docs/concepts/agent-workflows", "/docs/concepts/harness-engineering"],
  },
  {
    id: "openai-routines-handoffs",
    title: "Orchestrating Agents: Routines and Handoffs",
    author: "OpenAI Cookbook",
    url: "https://developers.openai.com/cookbook/examples/orchestrating_agents",
    category: "agent-workflows",
    useOn: ["/docs/concepts/agent-workflows"],
  },
  {
    id: "langchain-context-engineering",
    title: "Context Engineering",
    author: "LangChain",
    url: "https://www.langchain.com/blog/context-engineering-for-agents",
    category: "context-engineering",
    useOn: ["/docs/concepts/context-engineering", "/docs/user/local-context"],
  },
  {
    id: "karpathy-llm-wiki",
    title: "LLM Wiki",
    author: "Andrej Karpathy",
    url: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
    category: "context-engineering",
    useOn: ["/docs/user/local-context", "/docs/concepts/context-engineering"],
  },
  {
    id: "opentelemetry-traces",
    title: "OpenTelemetry Traces",
    author: "OpenTelemetry",
    url: "https://opentelemetry.io/docs/concepts/signals/traces/",
    category: "tracing",
    useOn: ["/docs/concepts/traces", "/docs/reference/trace-schema"],
  },
  {
    id: "anthropic-writing-tools-for-agents",
    title: "Writing effective tools for AI agents",
    author: "Anthropic",
    url: "https://www.anthropic.com/engineering/writing-tools-for-agents",
    category: "tools",
    useOn: ["/docs/concepts/harness-engineering", "/docs/guides/tools"],
  },
] as const satisfies readonly ReferenceSource[];

export function getReferenceSources(ids: readonly string[]): ReferenceSource[] {
  return ids.map((id) => {
    const source = referenceSources.find((entry) => entry.id === id);
    if (!source) {
      throw new Error(`Unknown reference source: ${id}`);
    }
    return source;
  });
}


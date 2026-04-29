import type { PromptModuleMutability, PromptModuleSlot } from "../prompt-modules/index.js";
import type {
  ParsedPromptMarkdownFragments,
  PromptMarkdownFragment,
  PromptMarkdownSegment,
} from "./model.js";
import {
  generatedWholeFileFragmentId,
  validatePromptFragmentId,
  validatePromptFragmentMutability,
  validatePromptFragmentSlot,
} from "./validation.js";

const MARKER_RE = /<!--\s*(\/?ap:fragment)([^>]*)-->/g;
const ATTR_RE = /([A-Za-z_][A-Za-z0-9_-]*)="([^"]*)"/g;

export type ParsePromptMarkdownFragmentsOptions = {
  source_ref?: string;
  fallback_id?: string;
  fallback_slot?: PromptModuleSlot;
  fallback_mutability?: PromptModuleMutability;
};

export type RenderPromptMarkdownFragmentsOptions = {
  preserve_markers?: boolean;
};

type ParsedMarkerAttrs = {
  id: string;
  slot: PromptModuleSlot;
  mutability: PromptModuleMutability;
};

function parseMarkerAttrs(raw: string, offset: number): ParsedMarkerAttrs {
  const attrs = new Map<string, string>();
  let consumed = "";
  ATTR_RE.lastIndex = 0;

  for (const match of raw.matchAll(ATTR_RE)) {
    const [source, key, value] = match;
    if (attrs.has(key)) {
      throw new Error(`Duplicate ap:fragment attribute "${key}" at offset ${offset}`);
    }
    attrs.set(key, value);
    consumed += source;
  }

  const withoutAttrs = raw.replaceAll(ATTR_RE, "").trim();
  if (withoutAttrs) {
    throw new Error(`Invalid ap:fragment attributes at offset ${offset}`);
  }

  if (!consumed && raw.trim()) {
    throw new Error(`Invalid ap:fragment attributes at offset ${offset}`);
  }

  const allowedAttrs = new Set(["id", "slot", "mutability"]);
  for (const key of attrs.keys()) {
    if (!allowedAttrs.has(key)) {
      throw new Error(`Unsupported ap:fragment attribute "${key}" at offset ${offset}`);
    }
  }

  return {
    id: validatePromptFragmentId(attrs.get("id"), "ap:fragment id"),
    slot: validatePromptFragmentSlot(attrs.get("slot"), "ap:fragment slot"),
    mutability: validatePromptFragmentMutability(attrs.get("mutability"), "ap:fragment mutability"),
  };
}

function markerPrefix(fragment: PromptMarkdownFragment): string {
  return `<!-- ap:fragment id="${fragment.id}" slot="${fragment.slot}" mutability="${fragment.mutability}" -->`;
}

function fallbackFragment(
  source: string,
  opts: ParsePromptMarkdownFragmentsOptions,
): PromptMarkdownFragment {
  return {
    id: validatePromptFragmentId(
      opts.fallback_id ?? generatedWholeFileFragmentId(opts.source_ref),
      "fallback fragment id",
    ),
    id_source: opts.fallback_id ? "declared" : "generated",
    slot: opts.fallback_slot ?? "file",
    text: source,
    mutability: opts.fallback_mutability ?? "replaceable",
    source: {
      kind: "markdown_whole_file",
      source_ref: opts.source_ref,
      index: 0,
    },
  };
}

export function parsePromptMarkdownFragments(
  source: string,
  opts: ParsePromptMarkdownFragmentsOptions = {},
): ParsedPromptMarkdownFragments {
  const segments: PromptMarkdownSegment[] = [];
  const fragments: PromptMarkdownFragment[] = [];
  const ids = new Set<string>();
  let cursor = 0;
  let matched = false;

  MARKER_RE.lastIndex = 0;
  while (true) {
    const open = MARKER_RE.exec(source);
    if (!open) break;

    const markerKind = open[1];
    if (markerKind === "/ap:fragment") {
      throw new Error(`Unexpected closing ap:fragment marker at offset ${open.index}`);
    }

    matched = true;
    if (open.index > cursor) {
      segments.push({ kind: "text", text: source.slice(cursor, open.index) });
    }

    const attrs = parseMarkerAttrs(open[2] ?? "", open.index);
    if (ids.has(attrs.id)) {
      throw new Error(`Duplicate prompt fragment id "${attrs.id}"`);
    }
    ids.add(attrs.id);

    const bodyStart = MARKER_RE.lastIndex;
    const close = MARKER_RE.exec(source);
    if (!close) {
      throw new Error(`Unclosed ap:fragment marker "${attrs.id}"`);
    }
    if (close[1] !== "/ap:fragment") {
      throw new Error(`Nested ap:fragment marker "${attrs.id}" at offset ${close.index}`);
    }

    const fragment: PromptMarkdownFragment = {
      id: attrs.id,
      id_source: "declared",
      slot: attrs.slot,
      text: source.slice(bodyStart, close.index),
      mutability: attrs.mutability,
      source: {
        kind: "markdown_marker",
        source_ref: opts.source_ref,
        index: fragments.length,
      },
    };
    fragments.push(fragment);
    segments.push({ kind: "fragment", fragment });
    cursor = MARKER_RE.lastIndex;
  }

  if (!matched) {
    const fragment = fallbackFragment(source, opts);
    return {
      source,
      source_ref: opts.source_ref,
      fragments: [fragment],
      segments: [{ kind: "fragment", fragment }],
      has_markers: false,
    };
  }

  if (cursor < source.length) {
    segments.push({ kind: "text", text: source.slice(cursor) });
  }

  return {
    source,
    source_ref: opts.source_ref,
    fragments,
    segments,
    has_markers: true,
  };
}

export function renderPromptMarkdownFragments(
  parsed: ParsedPromptMarkdownFragments,
  opts: RenderPromptMarkdownFragmentsOptions = {},
): string {
  return parsed.segments
    .map((segment) => {
      if (segment.kind === "text") return segment.text;
      if (!opts.preserve_markers) return segment.fragment.text;
      return `${markerPrefix(segment.fragment)}${segment.fragment.text}<!-- /ap:fragment -->`;
    })
    .join("");
}

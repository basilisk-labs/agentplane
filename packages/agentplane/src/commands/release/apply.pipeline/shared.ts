import { createCliEmitter, emitCommandResult } from "../../../cli/output.js";

const output = createCliEmitter();

export function emitReleaseLine(text: string): void {
  emitCommandResult(output, { kind: "line", text });
}

import type { ClockPort } from "../../ports/index.js";

export class SystemClockAdapter implements ClockPort {
  nowIso(): string {
    return new Date().toISOString();
  }
}

import type { ClockPort } from "../../ports/clock-port.js";

export class SystemClockAdapter implements ClockPort {
  nowIso(): string {
    return new Date().toISOString();
  }
}

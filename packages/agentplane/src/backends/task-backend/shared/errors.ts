/**
 * Backend-local task-backend error surface.
 */
export class BackendError extends Error {
  code: "E_BACKEND" | "E_NETWORK";
  reasonCode?: string;
  constructor(message: string, code: "E_BACKEND" | "E_NETWORK", opts?: { reasonCode?: string }) {
    super(message);
    this.code = code;
    this.reasonCode = opts?.reasonCode;
  }
}

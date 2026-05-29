/**
 * Backend-local task-backend error surface.
 */
export class BackendError extends Error {
  code: "E_BACKEND" | "E_NETWORK";
  constructor(message: string, code: "E_BACKEND" | "E_NETWORK") {
    super(message);
    this.code = code;
  }
}

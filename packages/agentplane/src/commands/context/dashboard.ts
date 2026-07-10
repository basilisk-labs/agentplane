import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import path from "node:path";

import { dashboardHtml } from "./dashboard-html.js";
import { buildContextDashboardSnapshot } from "./dashboard-snapshot.js";

export { buildContextDashboardSnapshot } from "./dashboard-snapshot.js";

type DashboardParsed = {
  host: string;
  port: string;
  open: boolean;
  dumpJson: boolean;
};

function writeJson(res: ServerResponse, value: unknown): void {
  res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
}

function writeText(res: ServerResponse, code: number, value: string): void {
  res.writeHead(code, { "content-type": "text/plain; charset=utf-8" });
  res.end(value);
}

function openBrowser(url: string): void {
  if (process.platform === "darwin") {
    spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
  }
}

export async function cmdContextDashboard(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: DashboardParsed;
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  await access(root);
  const snapshot = await buildContextDashboardSnapshot(root);
  if (opts.parsed.dumpJson) {
    process.stdout.write(`${JSON.stringify(snapshot, null, 2)}\n`);
    return 0;
  }
  const host = opts.parsed.host || "127.0.0.1";
  const port = Number.parseInt(opts.parsed.port || "0", 10);
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = req.url ?? "/";
    if (url === "/" || url === "/index.html") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(dashboardHtml());
      return;
    }
    if (url === "/api/graph") return writeJson(res, snapshot);
    if (url === "/api/metrics") return writeJson(res, snapshot.metrics);
    if (url === "/api/health") return writeJson(res, { ok: true, projection: snapshot.projection });
    writeText(res, 404, "not found\n");
  });
  await new Promise<void>((resolve) => server.listen({ host, port }, resolve));
  const address = server.address();
  const actualPort = typeof address === "object" && address ? address.port : port;
  const url = `http://${host}:${actualPort}/`;
  process.stdout.write(`context dashboard: ${url}\n`);
  process.stdout.write(
    `snapshot: nodes=${snapshot.nodes.length} edges=${snapshot.edges.length} projection_rows=${snapshot.projection.rows}\n`,
  );
  if (opts.parsed.open) openBrowser(url);
  await new Promise<void>((resolve) => {
    const shutdown = () => {
      server.close(() => resolve());
    };
    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  });
  return 0;
}

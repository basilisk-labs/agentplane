import http from "node:http";
import https from "node:https";
import { readFile } from "node:fs/promises";

function assertNonEmpty(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    throw new Error(`Missing required ${label}.`);
  }
  return text;
}

function normalizeWorkflowRun(run) {
  return {
    id: run.id,
    name: typeof run.name === "string" ? run.name : "",
    status: typeof run.status === "string" ? run.status : "",
    conclusion: typeof run.conclusion === "string" ? run.conclusion : null,
    url: typeof run.html_url === "string" ? run.html_url : "",
    headSha: typeof run.head_sha === "string" ? run.head_sha : "",
    event: typeof run.event === "string" ? run.event : "",
    createdAt: typeof run.created_at === "string" ? run.created_at : "",
    workflowPath: typeof run.path === "string" ? run.path : "",
  };
}

export function resolveGithubApiBase() {
  return (process.env.AGENTPLANE_GITHUB_API_BASE_URL ?? "https://api.github.com").replace(
    /\/+$/u,
    "",
  );
}

export function resolveGithubToken(token = process.env.GITHUB_TOKEN) {
  return assertNonEmpty(token, "GITHUB_TOKEN");
}

export function resolveGithubRepo(repo = process.env.GITHUB_REPOSITORY) {
  return assertNonEmpty(repo, "repository slug");
}

function requestJson(url, token) {
  const fixturePath = process.env.AGENTPLANE_GITHUB_API_FIXTURES;
  if (typeof fixturePath === "string" && fixturePath.trim()) {
    return readGithubApiFixture(fixturePath, url);
  }
  return new Promise((resolve, reject) => {
    const targetUrl = new URL(url);
    const transport = targetUrl.protocol === "http:" ? http : https;
    const request = transport.get(
      url,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "User-Agent": "agentplane-release-check",
        },
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          const statusCode = response.statusCode ?? 0;
          if (statusCode < 200 || statusCode >= 300) {
            reject(new Error(`GitHub API request failed (${statusCode}): ${body.trim()}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      },
    );
    request.on("error", reject);
  });
}

async function readGithubApiFixture(fixturePath, url) {
  const raw = await readFile(fixturePath, "utf8");
  const fixtures = JSON.parse(raw);
  const entry = fixtures?.[url];
  if (!entry) {
    throw new Error(`Missing GitHub API fixture for ${url}`);
  }
  const statusCode =
    typeof entry.status === "number" && Number.isFinite(entry.status) ? entry.status : 200;
  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(`GitHub API request failed (${statusCode}): ${JSON.stringify(entry.body)}`);
  }
  return entry.body;
}

export async function listWorkflowRuns({
  apiBase = resolveGithubApiBase(),
  repo = resolveGithubRepo(),
  workflow,
  headSha,
  event,
  token = resolveGithubToken(),
}) {
  const workflowId = encodeURIComponent(assertNonEmpty(workflow, "workflow file or id"));
  const params = new URLSearchParams({ per_page: "20" });
  if (typeof headSha === "string" && headSha.trim()) {
    params.set("head_sha", headSha.trim());
  }
  if (typeof event === "string" && event.trim()) {
    params.set("event", event.trim());
  }
  const url = `${apiBase}/repos/${repo}/actions/workflows/${workflowId}/runs?${params.toString()}`;
  const payload = await requestJson(url, token);
  const runs = Array.isArray(payload?.workflow_runs) ? payload.workflow_runs : [];
  return runs.map((run) => normalizeWorkflowRun(run));
}

export async function readWorkflowRun({
  apiBase = resolveGithubApiBase(),
  repo = resolveGithubRepo(),
  runId,
  token = resolveGithubToken(),
}) {
  const id = assertNonEmpty(String(runId ?? ""), "workflow run id");
  const url = `${apiBase}/repos/${repo}/actions/runs/${encodeURIComponent(id)}`;
  const payload = await requestJson(url, token);
  return normalizeWorkflowRun(payload ?? {});
}

export async function listWorkflowRunArtifacts({
  apiBase = resolveGithubApiBase(),
  repo = resolveGithubRepo(),
  runId,
  token = resolveGithubToken(),
}) {
  const id = assertNonEmpty(String(runId ?? ""), "workflow run id");
  const url = `${apiBase}/repos/${repo}/actions/runs/${encodeURIComponent(id)}/artifacts?per_page=100`;
  const payload = await requestJson(url, token);
  const artifacts = Array.isArray(payload?.artifacts) ? payload.artifacts : [];
  return artifacts.map((artifact) => ({
    id: artifact.id,
    name: typeof artifact.name === "string" ? artifact.name : "",
    sizeInBytes: typeof artifact.size_in_bytes === "number" ? artifact.size_in_bytes : 0,
    expired: Boolean(artifact.expired),
    createdAt: typeof artifact.created_at === "string" ? artifact.created_at : "",
    url: typeof artifact.archive_download_url === "string" ? artifact.archive_download_url : "",
  }));
}

export function selectLatestRun(runs) {
  return (
    [...runs].toSorted((left, right) => {
      const leftTime = Date.parse(left.createdAt ?? "") || 0;
      const rightTime = Date.parse(right.createdAt ?? "") || 0;
      return rightTime - leftTime;
    })[0] ?? null
  );
}

export function classifyWorkflowState(run) {
  if (!run) return "missing";
  if (run.status === "completed") {
    return run.conclusion === "success" ? "success" : "completed_not_success";
  }
  const status = typeof run.status === "string" ? run.status.trim() : "";
  return status || "missing";
}

export async function readLatestWorkflowStatus({ apiBase, repo, workflow, headSha, token }) {
  const runs = await listWorkflowRuns({
    apiBase,
    repo,
    workflow,
    headSha,
    token,
  });
  const latestRun = selectLatestRun(runs);
  return {
    state: classifyWorkflowState(latestRun),
    run: latestRun,
  };
}

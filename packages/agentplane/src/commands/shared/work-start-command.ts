export type WorkStartCommandTask = {
  id: string;
  owner: string;
  title: string;
};

function taskWorkSlug(task: Pick<WorkStartCommandTask, "id" | "title">): string {
  const fromTitle = task.title
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .replaceAll(/-{2,}/g, "-")
    .slice(0, 48)
    .replaceAll(/-+$/g, "");
  if (fromTitle) return fromTitle;
  const suffix =
    task.id
      .split("-")
      .pop()
      ?.toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-") ?? "";
  return suffix || "work";
}

export function workStartCommand(task: WorkStartCommandTask): string {
  return `agentplane work start ${task.id} --agent ${task.owner} --slug ${taskWorkSlug(task)} --worktree`;
}

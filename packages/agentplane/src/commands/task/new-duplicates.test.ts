import { describe, expect, it } from "vitest";
import { makeTaskFixture } from "@agentplane/testkit/task";
import { listOpenTaskDuplicates } from "./new-duplicates.js";

describe("Unicode task duplicate detection", () => {
  it.each([
    ["Workspace 启动", "Workspace 停止"],
    ["Workspace 起動", "Workspace 停止"],
    ["Workspace 시작", "Workspace 중지"],
    ["Workspace بدء", "Workspace وقف"],
    ["Workspace चालू", "Workspace बंद"],
    ["Workspace on", "Workspace off"],
    ["Workspace ١", "Workspace ٢"],
  ])("preserves distinguishing tokens in %s", (title, other) => {
    const task = makeTaskFixture({ title, status: "TODO" });
    expect(listOpenTaskDuplicates([task], other)).toEqual([]);
    expect(listOpenTaskDuplicates([task], title)).toMatchObject([
      { severity: "exact", score: 1 },
    ]);
  });

  it("does not discard distinct Russian intent around shared English words", () => {
    const tasks = [
      "Диагностика Workspace до изменения runtime",
      "Проверять Workspace до остановки runtime",
    ].map((title) => makeTaskFixture({ title, status: "TODO" }));
    expect(
      listOpenTaskDuplicates(
        tasks,
        "Workspace: согласовать запись и обновление runtime-инструкций",
      ),
    ).toEqual([]);
    expect(listOpenTaskDuplicates([tasks[0]!], tasks[1]!.title)).toEqual([]);
  });

  it("detects exact Unicode titles with canonical composition and punctuation normalization", () => {
    const task = makeTaskFixture({ title: "Проверить Café runtime", status: "TODO" });
    expect(listOpenTaskDuplicates([task], "  ПРОВЕРИТЬ Cafe\u0301: runtime  ")).toMatchObject([
      { severity: "exact", score: 1 },
    ]);
  });

  it("keeps reordered words advisory even with complete token overlap", () => {
    const task = makeTaskFixture({ title: "Runtime проверяет Workspace", status: "TODO" });
    expect(listOpenTaskDuplicates([task], "Workspace проверяет Runtime")).toMatchObject([
      { severity: "similar", score: 1 },
    ]);
  });
});

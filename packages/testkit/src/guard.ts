import { vi, type Mock } from "vitest";

type GitPathListMock = Mock<() => Promise<string[]>>;
type GitStageMock = Mock<(paths: string[]) => Promise<void>>;
type GitCommitMock = Mock<
  (input: { env?: Record<string, string>; message: string }) => Promise<void>
>;
type GitCommitAmendNoEditMock = Mock<(input?: { env?: Record<string, string> }) => Promise<void>>;
type GitHeadHashSubjectMock = Mock<() => Promise<{ hash: string; subject: string }>>;
type GitInvalidateStatusMock = Mock<() => void>;

export type GuardCommandContextFixture = {
  resolvedProject: { gitRoot: string };
  config: {
    paths: { tasks_path: string; workflow_dir: string };
    workflow_mode?: string;
    close_commit?: { direct_dirty_policy?: string };
  };
  git: {
    statusChangedPaths: GitPathListMock;
    statusStagedPaths: GitPathListMock;
    stage: GitStageMock;
    commit: GitCommitMock;
    commitAmendNoEdit: GitCommitAmendNoEditMock;
    headHashSubject: GitHeadHashSubjectMock;
    invalidateStatus: GitInvalidateStatusMock;
  };
};

export function createGuardCommandContext(): GuardCommandContextFixture {
  return {
    resolvedProject: { gitRoot: "/repo" },
    config: { paths: { tasks_path: ".agentplane/tasks.json", workflow_dir: ".agentplane/tasks" } },
    git: {
      statusChangedPaths: vi.fn().mockResolvedValue([]),
      statusStagedPaths: vi.fn().mockResolvedValue([]),
      stage: vi.fn(() => Promise.resolve()),
      commit: vi.fn(() => Promise.resolve()),
      commitAmendNoEdit: vi.fn(() => Promise.resolve()),
      headHashSubject: vi.fn().mockResolvedValue({ hash: "abcdef123456", subject: "subject" }),
      invalidateStatus: vi.fn(),
    },
  };
}

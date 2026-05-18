import { type ReactNode, useState } from "react";
import styles from "./CommandBlock.module.css";

type CommandBlockProps = {
  command: string;
  label?: string;
  eventName?: string;
  prompt?: boolean;
};

function trackCommandEvent(eventName: string | undefined): void {
  if (!eventName || globalThis.window === undefined) return;
  const gtag = (globalThis.window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", eventName, { event_category: "command" });
}

export default function CommandBlock({
  command,
  label = "Command",
  eventName,
  prompt = false,
}: CommandBlockProps): ReactNode {
  const [copied, setCopied] = useState(false);
  const renderedCommand = prompt
    ? command
        .split("\n")
        .map((line) => `$ ${line}`)
        .join("\n")
    : command;

  async function copyCommand(): Promise<void> {
    await navigator.clipboard.writeText(command);
    trackCommandEvent(eventName);
    setCopied(true);
    globalThis.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <button
          className={styles.copy}
          type="button"
          onClick={() => {
            void copyCommand();
          }}
          aria-label={`Copy command: ${command}`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={styles.pre}>
        <code className={styles.code}>{renderedCommand}</code>
      </pre>
    </div>
  );
}

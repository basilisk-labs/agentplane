import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

export async function sha256EvidenceFile(filePath: string): Promise<`sha256:${string}`> {
  const hash = createHash("sha256");
  return await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (chunk: Buffer) => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(`sha256:${hash.digest("hex")}`));
  });
}

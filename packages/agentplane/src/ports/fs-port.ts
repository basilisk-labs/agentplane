export type PathKind = "file" | "dir" | "symlink";

export type FileStat = {
  kind: PathKind;
  mtimeMs: number;
};

export type FileSystemPort = {
  readFileText(path: string): Promise<string>;
  readFileBytes(path: string): Promise<Buffer>;
  writeFileText(path: string, text: string): Promise<void>;
  writeFileBytes(path: string, bytes: Buffer): Promise<void>;
  mkdirp(path: string): Promise<void>;
  readdir(path: string): Promise<string[]>;
  lstat(path: string): Promise<FileStat>;
  rm(path: string): Promise<void>;
  readlink(path: string): Promise<string>;
  symlink(target: string, path: string): Promise<void>;
};

export type LocalVerificationReceipt = {
  schema_version: 1;
  kind: "local_verification_receipt";
  ok: true;
  created_at: string;
  head_sha: string;
  mode: string;
  route: string;
  changed_files_digest: string;
  contract_digest: string;
};

export function writeLocalVerificationReceipt(input: {
  cwd?: string;
  mode: string;
  changedFiles: string[];
  route: string;
  contractDigest: string;
}): LocalVerificationReceipt | null;

export function readReusableLocalVerificationReceipt(input: {
  cwd?: string;
  mode: string;
  changedFiles: string[];
  headShas: string[];
}): LocalVerificationReceipt | null;

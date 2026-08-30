/** The storage owner must fence every writer of a Task record with the same serialization key. */
export interface TaskRecordSerialization {
  run<T>(taskId: string, operation: () => Promise<T>): Promise<T>;
}

import { z } from "zod";

/** Preserve the timestamp contract that predates Zod 4.6: seconds are optional. */
export function isoTimestampSchema(options: { offset?: boolean } = {}) {
  const date = z.regexes.date.source.slice(1, -1);
  const time = String.raw`(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?`;
  const zone = options.offset ? String.raw`Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)` : "Z";
  return z.stringFormat("datetime", new RegExp(`^${date}T(?:${time}(?:${zone}))$`));
}

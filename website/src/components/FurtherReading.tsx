import { type ReactNode } from "react";
import { getReferenceSources } from "../data/referenceSources";

type FurtherReadingProps = {
  ids: readonly string[];
};

export default function FurtherReading({ ids }: FurtherReadingProps): ReactNode {
  const sources = getReferenceSources(ids);

  return (
    <section>
      <h2>Further reading</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.id}>
            <a href={source.url}>{source.title}</a> - {source.author}
          </li>
        ))}
      </ul>
    </section>
  );
}

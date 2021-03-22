import { getUniqueID } from "../../utils/helperFunctions";
import Metric from "./repoMetric";

export default function Repo({ repoDetails }) {
  const { name, url, isFork, parent, description, ...rest } = repoDetails;
  return (
    <article className="repo-cont" key={getUniqueID()}>
      <a
        className="repo-name"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>

      {isFork && (
        <p className="text-gray-500">
          Forked from{" "}
          <a
            className=""
            href={parent.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {parent.name}
          </a>
        </p>
      )}
      <p className="text-gray-500 text-sm pt-2">{description}</p>
      <div className="repo-metrics">
        <Metric details={{ ...rest }} />
      </div>
    </article>
  );
}

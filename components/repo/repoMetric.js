export default function Metric({ details }) {
  const { languages, forkCount, updatedAt, license, stargazerCount } = details;
  return (
    <>
      {languages.nodes.length > 0 && (
        <div className="metric">
          <span
            style={{
              width: "0.5rem",
              height: "0.5rem",
              backgroundColor: languages.nodes[0].color,
              marginRight: "0.5rem",
            }}
          ></span>
          <p>{languages.nodes[0].name}</p>
        </div>
      )}
      {stargazerCount > 0 && (
        <div className="metric">
          {icons.stargazers}
          <p>{stargazerCount}</p>
        </div>
      )}
      {forkCount > 0 && (
        <div className="metric">
          {icons.fork}
          <p>{forkCount}</p>
        </div>
      )}
      {license && (
        <div className="metric">
          {icons.license}
          <p>{license}</p>
        </div>
      )}
      {updatedAt && (
        <div className="metric">
          {icons.updatedAt}
          <p>updated {DJ().to(DJ(updatedAt))}</p>
        </div>
      )}
    </>
  );
}

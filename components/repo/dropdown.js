import { useEffect } from "react";

export default function Dropdown({ dropDownProps }) {
  const {
    foundList,
    setFoundList,
    hasNextPage,
    handleLoadMore,
  } = dropDownProps;

  const searchServer = (e) => {
    e.preventDefault();
    console.log("server called");
    handleLoadMore();
  };
  useEffect(() => {
    return () => setFoundList([]);
  }, []);
  return (
    <div
      className={`${foundList.length > 0 && "divide-y"} dropDown-cont`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1" role="none">
        {foundList.map(({ name, url }, i) => (
          <a
            key={`srch_${i}`}
            onMouseDown={(e) => e.preventDefault()}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            {name}
          </a>
        ))}
      </div>

      <div className="py-8 px-8 flex justify-end align-middle" role="none">
        <p>Not finding your repo?</p>
        <button
          disabled={!hasNextPage}
          className={`btn-sm btn-pri ml-4 ${
            !hasNextPage && "cursor-not-allowed"
          } disabled:opacity-40`}
          onMouseDown={(e) => searchServer(e)}
        >
          Load more
        </button>
      </div>
    </div>
  );
}

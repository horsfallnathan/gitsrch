import { useContext, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { SearchIcon } from "../icons";
import { getRepos } from "../../utils/apiService";

/** some other package already installed lodash, might as well use it*/
import debounce from "lodash/debounce";
import { ErrorLoadingRepo, LoadingRepo } from "../layout/tempComponents";
import Dropdown from "./dropdown";
import Repo from "./repoComponent";
import { getUniqueID } from "../../utils/helperFunctions";
import { UserContext } from "../../utils/context";

export const RepoList = () => {
  const { user } = useContext(UserContext);

  /**
   * Fetches paginated repo data
   */
  const { status, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["repos", user],
    getRepos,
    {
      onSuccess: (data) => {
        /**
         * flatten the page into the `filterData` array when there is a new page
         * so that this isn't done every time the list is searched
         */
        collateData(data);
      },
      getNextPageParam: (lastPage) => lastPage?.pageInfo?.endCursor ?? false,
    }
  );

  /**
   * To store flattened pages for filtering
   */
  const filterData = useRef([]);

  /**
   *
   * @param {object} newData new page from query containing repo nodes
   * @returns void
   */
  const collateData = (newData) => {
    /** Dont attempt search if no pages */
    if (!newData.pages) return;

    /** temp store for collation */
    const collationArray = [];
    newData.pages.forEach((page) => {
      collationArray.push(page.nodes);
    });

    /** update ref with flattened array*/
    filterData.current = collationArray.flat();
  };

  /** State variables to store filtered pages*/
  const [foundList, setFoundList] = useState([]);

  /** State variables to control dropdown visibility */
  const [isSearching, setIsSearching] = useState(false);

  /** State variables to store input text */
  const [searchString, setSearchString] = useState("");

  /**
   * filter function to find repos matching search string
   * @param {string} searchString
   */
  const filterRepo = (searchString) => {
    /** clear found list when input is cleared*/
    if (searchString.length < 1) {
      setFoundList([]);
    } else {
      const filteredData = filterData.current.filter((repo) =>
        repo.name.toLowerCase().includes(searchString)
      );
      setFoundList(filteredData);
    }
  };

  /**
   * prevent filtering with every key stroke
   */
  const debouncedFilter = useRef(
    debounce((searchString) => filterRepo(searchString), 300)
  ).current;

  /**
   * Trim text input and start debounced filter
   * @param {SyntheticEvent} e
   */
  const handleSearch = (e) => {
    /** remove white spaces*/
    let text = e.target.value.trim();
    /** Updates search string*/
    setSearchString(text.toLowerCase());

    /** Filter at intervals */
    debouncedFilter(text.toLowerCase());
  };

  return (
    <>
      {status === "loading" && <LoadingRepo />}
      {status === "error" && <ErrorLoadingRepo />}
      {status === "success" && data.pages && (
        <div className="repoList-cont">
          <div className="sticky">
            <form className="searchBar-form" onSubmit={(e) => handleSubmit(e)}>
              <input
                className="searchBar"
                type="search"
                placeholder="Search repository list"
                onChange={(e) => handleSearch(e)}
                onFocus={(e) => setIsSearching(true)}
                onBlur={(e) => setIsSearching(false)}
              />
              <button type="submit" className="searchBar-btn">
                <SearchIcon />
              </button>
            </form>
            <div className="dropdownCont relative">
              {isSearching ? (
                <Dropdown
                  dropDownProps={{
                    foundList,
                    setFoundList,
                    hasNextPage,
                    fetchNextPage,
                  }}
                />
              ) : null}
            </div>
          </div>
          <div className="repoList">
            {data.pages.map((page) => {
              return (
                <div key={getUniqueID()}>
                  {page.nodes.map((repo, i) => {
                    return <Repo repoDetails={repo} />;
                  })}
                </div>
              );
            })}

            <button
              disabled={!hasNextPage}
              className={`btn-sm btn-pri mt-8 ml-4 ${
                !hasNextPage && "cursor-not-allowed"
              } disabled:opacity-40`}
              onClick={() => fetchNextPage()}
            >
              load more
            </button>
          </div>
        </div>
      )}
    </>
  );
};

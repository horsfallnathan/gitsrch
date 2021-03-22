import { useState } from "react";
import { SearchIcon } from "../icons";

export const RepoList = () => {
  const [isSearching, setIsSearching] = useState(false);
  const handleSearch = (e) => {
    let text = e.target.value.trim();
    setSrchStr(text.toLowerCase());
    debouncedFilter(text.toLowerCase());
  };

  return (
    <div className="p-8">
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
    </div>
  );
};

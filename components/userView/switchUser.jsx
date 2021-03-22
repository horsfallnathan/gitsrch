import { forwardRef, useState } from "react";

export const SwitchUser = forwardRef(({ changeUser, handleSwitch }, ref) => {
  const [searchString, setSearchString] = useState("");

  const handleInput = (e) => {
    const text = e.target.value.trim();
    setSearchString(text);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    changeUser(searchString);
    handleSwitch();
  };
  return (
    <div ref={ref} className="userCont hasTransition switchUser">
      <div className="userCard">
        <p className=" mb-4">Enter their github username</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="searchBar"
            type="text"
            placeholder="enter username"
            onChange={(e) => handleInput(e)}
          />
        </form>
        <button
          type="submit"
          className="btn-sm btn-pri mt-4"
          onClick={(e) => handleSubmit(e)}
        >
          Change User
        </button>
      </div>
    </div>
  );
});

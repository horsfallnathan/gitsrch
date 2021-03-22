import { useContext, useState } from "react";
import { UserContext } from "../../utils/context";
import { AddUserIcon } from "../icons";

export const SwitchUser = ({ handleSwitch, message }) => {
  const { setUser } = useContext(UserContext);
  const [searchString, setSearchString] = useState("");

  const handleInput = (e) => {
    const text = e.target.value.trim();
    setSearchString(text);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(searchString);
    handleSwitch("usermode");
  };
  return (
    <div className="switch">
      <div className="userCont">
        <div className="userCard">
          {message && <p>{message}</p>}
          <button
            className="switchIconBtn"
            onClick={() => handleSwitch()}
          ></button>
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
    </div>
  );
};

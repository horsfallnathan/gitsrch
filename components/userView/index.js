import { useContext } from "react";
import { useQuery } from "react-query";
import Metric from "./metric";
import { getUser } from "../../utils/apiService";
import { ErrorLoadingUser, LoadingUser } from "../layout/tempComponents";
import { UserContext } from "../../utils/context";
import { SwitchUser } from "./switchUser";

export const UserView = ({ handleSwitch }) => {
  const { user } = useContext(UserContext);

  /** Destructure results from api call*/
  const { data: userData, status: userStatus } = useQuery(
    ["user", user],
    getUser
  );
  return (
    <div className="switch">
      <div className="userCard-cont">
        <button
          onClick={() => handleSwitch("inputmode")}
          className="switchIconBtn"
        ></button>
        {userStatus === "loading" && <LoadingUser />}
        {userStatus === "error" && (
          <SwitchUser
            handleSwitch={handleSwitch}
            message={"Error: user not found"}
          />
        )}
        {userStatus === "success" && userData && (
          <div className="userCont hasTransition">
            <div className="userImgCont">
              <span href="" className="block relative">
                <img
                  src={userData.avatarUrl}
                  alt="user avatar"
                  srcSet=""
                  className="userImg"
                  lazy
                />
              </span>
            </div>
            <div className="userCard">
              <div className="details">
                <p className="user-name">{userData.name}</p>
                <p className="user-handle">{userData.bio}</p>
                <div className="userMetrics">
                  <Metric
                    details={{
                      count: userData.followers.totalCount,
                      icon: "stargazers",
                    }}
                  />
                  <Metric
                    details={{
                      count: userData.followers.totalCount,
                      icon: "followers",
                      description: "followers.",
                    }}
                  />
                  <Metric
                    details={{
                      count: userData.following.totalCount,
                      icon: "followers",
                      description: "following",
                    }}
                  />
                  {userData.email && (
                    <div className="metric">
                      <svg
                        className="metricIcon"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"
                        ></path>
                      </svg>
                      <a href={`mailto:${userData.email}`}>{userData.email}</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

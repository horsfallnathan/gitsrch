import { UserView } from "../components/userView/index";
import { RepoList } from "../components/repo/index";
import { Layout } from "../components/layout";
import { useRef, useState } from "react";
import { SwitchUser } from "../components/userView/switchUser";
import { UserContext } from "../utils/context";
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";

export default function Index() {
  const [user, setUser] = useState("ben");
  const [userMode, setUserMode] = useState(true);
  const value = { user, setUser };

  const handleSwitch = (e) => {
    console.log("called", userMode);
    setUserMode((userMode) => !userMode);
  };
  return (
    <Layout>
      <section className="headerSection"></section>
      <section className="pageContainer mt-24">
        <div className="mainGrid">
          <UserContext.Provider value={value}>
            <div className="stickyCont">
              <div className="sticky">
                <SwitchTransition>
                  <CSSTransition
                    key={userMode ? "usermode" : "changemode"}
                    timeout={500}
                    addEndListener={(node, done) => {
                      node.addEventListener("transitionend", done, false);
                    }}
                    classNames="switch"
                  >
                    {userMode === true ? (
                      <UserView handleSwitch={handleSwitch} />
                    ) : (
                      <SwitchUser
                        changeUser={setUser}
                        handleSwitch={handleSwitch}
                      />
                    )}
                  </CSSTransition>
                </SwitchTransition>
              </div>
            </div>
            <RepoList />
          </UserContext.Provider>
        </div>
      </section>
    </Layout>
  );
}

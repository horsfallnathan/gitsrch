import { UserView } from "../components/userView/index";
import { RepoList } from "../components/repo/index";
import { Layout } from "../components/layout";
import { useState } from "react";
import { SwitchUser } from "../components/userView/switchUser";
import { UserContext } from "../utils/context";
import { SwitchTransition, CSSTransition } from "react-transition-group";

export default function Index() {
  const [user, setUser] = useState("ben");
  const [userMode, setUserMode] = useState("usermode");
  const value = { user, setUser };

  const handleSwitch = (usermode) => {
    setUserMode(usermode);
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
                    key={userMode === "usermode" ? "usermode" : "changemode"}
                    timeout={500}
                    addEndListener={(node, done) => {
                      node.addEventListener("transitionend", done, false);
                    }}
                    classNames="switch"
                  >
                    {userMode === "usermode" ? (
                      <UserView handleSwitch={handleSwitch} />
                    ) : (
                      <SwitchUser handleSwitch={handleSwitch} />
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

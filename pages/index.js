import { UserView } from "../components/userView/index";
import { RepoList } from "../components/repo/index";
import { Layout } from "../components/layout";
import { useRef, useState } from "react";
import { SwitchUser } from "../components/userView/switchUser";
import { UserContext } from "../utils/context";

export default function Index() {
  const [user, setUser] = useState("ben");
  const [userMode, setUserMode] = useState(true);
  const value = { user, setUser };

  const switchCardRef = useRef();
  const userCardRef = useRef();

  const handleSwitch = () => {
    // normally i'd use cssTransition group + css animations or gsap but...
    if (userMode) {
      setTimeout(() => {
        userCardRef.current.style.display = "none";
        switchCardRef.current.style.display = "block";
      }, 400);
      setUserMode(false);
    } else {
      switchCardRef;
      setTimeout(() => {
        switchCardRef.current.style.display = "none";
        userCardRef.current.style.display = "block";
      }, 400);
      setUserMode(true);
    }
  };
  return (
    <Layout>
      <section className="headerSection"></section>
      <section className="pageContainer mt-24">
        <div className="mainGrid">
          <UserContext.Provider value={value}>
            <div className="stickyCont">
              <div className="sticky">
                <SwitchUser
                  ref={switchCardRef}
                  changeUser={setUser}
                  handleSwitch={handleSwitch}
                />
                <UserView ref={userCardRef} />
                <button
                  className="mt-4 btn-sm btn-pri"
                  onClick={(e) => handleSwitch(e)}
                >
                  switch user
                </button>
              </div>
            </div>
            <RepoList />
          </UserContext.Provider>
        </div>
      </section>
    </Layout>
  );
}

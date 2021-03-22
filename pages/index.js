import { UserView } from "../components/userView/index";
import { RepoList } from "../components/repo/index";
import { Layout } from "../components/layout";
import { useRef } from "react";

export default function Index() {
  const userRef = useRef();
  return (
    <Layout>
      <section className="headerSection"></section>
      <section className="pageContainer mt-24">
        <div className="mainGrid">
          <UserView ref={userRef} />
          <RepoList />
        </div>
      </section>
    </Layout>
  );
}

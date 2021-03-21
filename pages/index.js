import { UserView } from "../components/userView/index";
import { RepoList } from "../components/repo/index";

export default function Index() {
  return (
    <div>
      <UserView />
      <RepoList />
    </div>
  );
}

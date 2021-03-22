/**
 * Component to show during repo loading state
 * @returns react component
 */
export const LoadingRepo = () => (
  <div className="repoList-cont animate-pulse">
    <div className="space-y-4 mt-8">
      <div className="h-4 loading-bg rounded w-5/6"></div>
      <div className="h-4 loading-bg rounded"></div>
      <div className="h-4 loading-bg rounded w-5/6"></div>
    </div>
  </div>
);

/**
 * Component to show when error in fetching repo occurs
 * @returns react component
 */
export const ErrorLoadingRepo = () => (
  <div className="repoList-cont animate-pulse">
    <div className="space-y-4 mt-8">
      <div className="h-4 loading-bg rounded w-5/6"></div>
      <div className="p-8">Error... Repo not found</div>
      <div className="h-4 loading-bg rounded w-5/6"></div>
    </div>
  </div>
);

/**
 * Component to show during repo loading state
 * @returns react component
 */
export const LoadingUser = () => (
  <div className="userCont">
    <div className="userImgCont">
      <div className="block animate-pulse relative">
        <div className="userImg loading-bg "></div>
      </div>
      <div className="userCard">
        <div className="details">
          <div className="animate-pulse">
            <div className="space-y-4 mt-8">
              <div className="h-4 loading-bg rounded w-5/6"></div>
              <div className="h-4 loading-bg rounded"></div>
              <div className="h-4 loading-bg rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Component to show when error in fetching user occurs
 * @returns react component
 */
export const ErrorLoadingUser = () => (
  <div className="userCont">
    <div className="userImgCont">
      <div className="block animate-pulse relative">
        <div className="userImg loading-bg ">
          <div className="userImg"></div>
        </div>
      </div>
      <div className="userCard">
        <div className="details">
          <div className="animate-pulse">
            <div className="space-y-4 mt-8">
              <div className="h-4 loading-bg rounded w-5/6"></div>
              <div className="p-8  ">Error... User not found</div>
              <div className="h-4 loading-bg rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

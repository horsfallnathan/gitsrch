import { GraphQLClient, gql } from "graphql-request";

/** Github v4 api url */
const GH_API_ENDPOINT = "https://api.github.com/graphql";

const graphQLClient = new GraphQLClient(GH_API_ENDPOINT, {
  /** A personal token is needed for authorization: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token  */
  headers: {
    authorization: `Bearer ${process.env.GH_PERSONAL_TOKEN}`,
  },
});
const query = gql`
  query($endCursor: String, $user: String!) {
    user(login: $user) {
      repositories(
        first: 10
        orderBy: { field: CREATED_AT, direction: DESC }
        after: $endCursor
      ) {
        nodes {
          name
          stargazerCount
          updatedAt
          url
          description
          isFork
          forkCount
          languages(first: 1) {
            nodes {
              name
              color
            }
          }
          parent {
            name
            url
          }
          licenseInfo {
            name
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          endCursor
          startCursor
          hasPreviousPage
        }
      }
    }
  }
`;

export default async (req, res) => {
  const {
    /**
     * sent from the queryClient and helps caching the response from an array:
     * - index 0 contains the query key for this route (not needed)
     * - index 1 contains user name
     */
    queryKey,

    /**
     * other variables to be passed to graphql query
     * - endCursor ID in this case
     */
    pageParam = null,
  } = req.body;

  await graphQLClient
    .request(query, { endCursor: pageParam, user: queryKey[1] })
    .then((data) => {
      res.status(200).json(data.user?.repositories);
    })
    .catch((err) => {
      res.status(503).json({ msg: "error fetching data", err });
    });
};

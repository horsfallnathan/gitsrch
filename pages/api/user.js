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
  query($user: String!) {
    user(login: $user) {
      avatarUrl
      bio
      login
      name
      # email
      following {
        totalCount
      }
      followers {
        totalCount
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
     */ queryKey,
  } = req.body;

  await graphQLClient
    .request(query, { user: queryKey[1] })
    .then((data) => {
      res.status(200).json(data.user);
    })
    .catch((err) => {
      res.status(503).json({ msg: "error fetching data", err });
    });
};

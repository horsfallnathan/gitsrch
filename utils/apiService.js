/**
 *
 * @param {string} link api route
 * @param {object} body request body
 * @returns api response or throws error
 */
const fetcher = async (link, body) => {
  return await fetch(link, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      /** best to check for errors using res.ok in fetch, this is thrown and handled in the catch block */
      if (!res.ok) {
        throw Error(res.statusText);
      }
      const data = res.json();
      return data;
    })
    .catch((err) => {
      throw Error(err);
    });
};

/**
 * handles queries to the user route
 * @param {object} pageParam sent by react query function
 * @returns response from api call
 */
const getUser = async (pageParam = {}) => fetcher("/api/user", pageParam);

/**
 * handles queries to the repositories route
 * @param {object} pageParam sent by react query function
 * @returns response from api call
 */
const getRepos = (pageParam = {}) => fetcher("/api/repos", pageParam);

module.exports = { getUser, getRepos };

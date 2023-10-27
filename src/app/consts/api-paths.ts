export const DOMAIN: string = 'http://localhost:8080';
export const BASE_URL: string = `${DOMAIN}/api`;

export const API_PATHS = {
  USER_REPOSITORY: {
    GET_USERS_INFO: (uids: bigint[]): string => `${BASE_URL}/user-repository/?ids=${uids.join(',')}`,
  },
  NEWS_FEED: {
    GET_NEWS_FEED: (uid: bigint): string => `${BASE_URL}/news-feed/${uid}`,
  },
};

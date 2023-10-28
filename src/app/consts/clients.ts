export const DOMAIN: string = 'http://localhost:8080';
export const BASE_URL: string = `${DOMAIN}/api`;

export const CLIENTS = {
  USER_REPOSITORY: {
    GET_USERS_INFO: (uids: bigint[]): string => `${BASE_URL}/user-repository/?ids=${uids.join(',')}`,
  },
  NEWS_FEED: {
    GET_NEWS_FEED: (uid: bigint): string => `${BASE_URL}/news-feed/${uid}`,
  },
  USER_TO_FRIEND_REPOSITORY: {
    GET_FRIENDS: (uid: bigint): string => `${BASE_URL}/user-to-friend-repository/${uid}`,
  },
  API_PROXY: {
    REGISTER: (): string => `${BASE_URL}/register`,
  }
};

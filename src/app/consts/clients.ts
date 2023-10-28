export const DOMAIN: string = 'http://localhost:8080';
export const BASE_URL: string = `${DOMAIN}/api`;

export const CLIENTS = {
  USER_REPOSITORY: {
    GET_USERS_INFO: (uids: bigint[]): string => `${BASE_URL}/user-repository?ids=${uids.join(',')}`,
  },
  NEWS_REPOSITORY: {
    GET_NEWS: (ids: bigint[]): string => `${BASE_URL}/news-repository?ids=${ids.join(',')}`,
  },
  NEWS_FEED: {
    GET_NEWS_FEED: (uid: bigint): string => `${BASE_URL}/news-feed/${uid}`,
  },
  USER_TO_FRIEND_REPOSITORY: {
    GET_FRIENDS: (uid: bigint): string => `${BASE_URL}/user-to-friend-repository/${uid}`,
  },
  USER_TO_NEWS_REPOSITORY: {
    GET_NEWS_LIST: (uid: bigint): string => `${BASE_URL}/user-to-news-repository/${uid}`,
  },
  API_PROXY: {
    REGISTER: (): string => `${BASE_URL}/register`,
    LOGIN: (): string => `${BASE_URL}/login`,
    GET_USER_SELF_INFO: (): string => `${BASE_URL}/get-info`,
    GET_USER_INFO: (uid: bigint): string => `${BASE_URL}/get-info/${uid}`,
  }
};

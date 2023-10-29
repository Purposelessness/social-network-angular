export const DOMAIN: string = 'http://localhost:8080';
export const BASE_URL: string = `${DOMAIN}/api`;

export const CLIENTS = {
  USER_REPOSITORY: {
    GET_USERS_INFO: (uids: bigint[]): string => `${BASE_URL}/user-repository?ids=${uids.join(',')}`,
    GET_ALL_USERS: (): string => `${BASE_URL}/user-repository`,
  },
  NEWS_REPOSITORY: {
    GET_NEWS: (ids: bigint[]): string => `${BASE_URL}/news-repository?ids=${ids.join(',')}`,
    ADD_NEWS: (): string => `${BASE_URL}/news-repository`,
  },
  NEWS_FEED: {
    GET_NEWS_FEED: (uid: bigint): string => `${BASE_URL}/news-feed/${uid}`,
  },
  USER_TO_FRIEND_REPOSITORY: {
    GET_FRIENDS: (uid: bigint): string => `${BASE_URL}/user-to-friend-repository/${uid}`,
    ADD_FRIEND: (): string => `${BASE_URL}/user-to-friend-repository/`,
  },
  USER_TO_NEWS_REPOSITORY: {
    GET_NEWS_LIST: (uid: bigint): string => `${BASE_URL}/user-to-news-repository/${uid}`,
  },
  API_PROXY: {
    REGISTER: (): string => `${BASE_URL}/register`,
    LOGIN: (): string => `${BASE_URL}/login`,
    GET_USER_SELF_INFO: (): string => `${BASE_URL}/get-info`,
    GET_USER_INFO: (uid: bigint): string => `${BASE_URL}/get-info/${uid}`,
  },
  CHAT_REPOSITORY: {
    GET_USER_CHATS: (uid: bigint): string => `${BASE_URL}/chat-repository/user/${uid}`,
    GET_CHATS: (chatId: bigint[]): string => `${BASE_URL}/chat-repository/?ids=${chatId.join(',')}`,
    CREATE_CHAT: (): string => `${BASE_URL}/chat-repository`,
    ADD_MESSAGE_TO_CHAT: (chatId: bigint): string => `${BASE_URL}/chat-repository/${chatId}`,
  },
};

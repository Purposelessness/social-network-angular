export interface Message {
  id: bigint;
  chatId: bigint;
  authorId: bigint;
  authorName: string;
  text: string;
  date: string;
}

export interface Chat {
  id: bigint;
  members: bigint[];
  messages: Message[];
}

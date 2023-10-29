export interface Message {
  id: number;
  chatId: number;
  authorId: number;
  authorName: string;
  text: string;
  date: string;
}

export interface Chat {
  id: number;
  members: number[];
  messages: Message[];
}

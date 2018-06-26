import { Message } from './message';
export class Discussion {
    discussion_key: string;
    discussion_topic: string;
    votes: string;
    discussion_email: string;
    discussion_question: string;
    messages: Message[];
    status: string;
    username: string;
}

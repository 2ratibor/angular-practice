export interface MessageData {
	type: string;
	text: string;
}

// tslint:disable-next-line
export interface Message extends MessageData {}

export class Message {}

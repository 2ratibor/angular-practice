export interface MessageData {
	text: string;
	type: string;
}

// tslint:disable-next-line
export interface Message extends MessageData {}

export class Message {}

export interface IAvitoMessages {
	messages: IAvitoMessage[];
}
export interface IAvitoMessage {
	type: string;
	id: string;
	author_id: string;
	content: Content;
}
interface Content {
	text?: string;
	image?: Image;
	voice?: Voice;
}

interface Voice {
	voice_id: string;
}
interface Image {
	sizes: object;
}

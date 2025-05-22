import { Axios } from 'axios';
import qs from 'qs';
import { IAvitoToken } from './avito/auth';
import { IAvitoMessages } from './avito/messages';
import FormData from 'form-data';
class Api extends Axios {
	constructor(basePath: string) {
		super();
		this.defaults.baseURL = basePath;
	}

	Authorization = (token: string): string => {
		return `Bearer ${token}`;
	};
	async messageAddWebHook(token: string, url: string) {
		return await this.post(
			`/messenger/v3/webhook`,
			JSON.stringify({
				url: url,
			}),
			{
				headers: {
					Authorization: this.Authorization(token),
					'Content-Type': 'application/json',
				},
			},
		);
	}

	async getMessages(token: string, userId: string, chatId: string): Promise<IAvitoMessages> {
		return await this.get(`/messenger/v3/accounts/${userId}/chats/${chatId}/messages/`, {
			headers: {
				Authorization: this.Authorization(token),
			},
		}).then((e) => JSON.parse(e.data));
	}

	async messageRemoveWebBook(token: string, url: string) {
		return await this.post(
			`/messenger/v1/webhook/unsubscribe`,
			JSON.stringify({
				url: url,
			}),
			{
				headers: {
					Authorization: this.Authorization(token),
					'Content-Type': 'application/json',
				},
			},
		);
	}

	async getToken(clientId: string, clientSecret: string): Promise<IAvitoToken> {
		return await this.post(
			'/token',
			qs.stringify({
				client_id: clientId,
				client_secret: clientSecret,
				grant_type: 'client_credentials',
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		).then((e) => JSON.parse(e.data));
	}

	async getVoiceMessage(token: string, voiceId: string, userId: string): Promise<any> {
		return await this.get(
			`https://api.avito.ru/messenger/v1/accounts/${userId}/getVoiceFiles?voice_ids=${voiceId}`,
			{
				headers: {
					Authorization: this.Authorization(token),
				},
			},
		).then((e) => JSON.parse(e.data));
	}

	async uploadImage(token: string, userId: string, file: Buffer, fileName: string) {
		const formData = new FormData();
		formData.append('file', file, {
			filename: fileName,
			contentType: 'image/png', // можно уточнить, если известно
		});

		return await this.post(
			`https://api.example.com/messenger/v1/accounts/ ${userId}/uploadImages`,
			formData,
			{
				headers: {
					Authorization: this.Authorization(token),
				},
			},
		).then((e) => e.data);
	}

	async readChat(token: string, userId: string, chatId: string) {
		return await this.post(`/messenger/v1/accounts/${userId}/chats/${chatId}/read`, '', {
			headers: {
				Authorization: this.Authorization(token),
			},
		}).then((e) => e.data);
	}
	async sendMessage(token: string, userId: string, chatId: string, message: string) {
		const res = await this.post(
			`/messenger/v1/accounts/${userId}/chats/${chatId}/messages`,
			JSON.stringify({
				message: {
					text: message,
				},
				type: 'text',
			}),
			{
				headers: {
					Authorization: this.Authorization(token),
				},
			},
		);
		console.log(res);
		return JSON.parse(res.data);
	}
	async sendPhotoImage(token: string, userId: string, chatId: string, imageId: string) {
		return await this.post(
			`/messenger/v1/accounts/${userId}/chats/${chatId}/messages/image`,
			JSON.stringify({
				image_id: imageId,
			}),
			{
				headers: {
					Authorization: this.Authorization(token),
				},
			},
		).then((e) => e.data);
	}
}

export const AvitoApi: Api = new Api('https://api.avito.ru/');

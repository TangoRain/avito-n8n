import { AvitoApi } from '../../src/Api';
import { IAvitoToken } from '../../src/avito/auth';
const api = AvitoApi;
let token: IAvitoToken;
describe('Auth', () => {
	beforeAll(async () => {
		token = await api.getToken('5AfKXdtw3zB852lw_tOQ', '0OKt6bURroYxwjKmKhHGeg1K6cXRU5phAxeXwpk_');
	});
	it('test gen token', async () => {
		let token = await api.getToken(
			'5AfKXdtw3zB852lw_tOQ',
			'0OKt6bURroYxwjKmKhHGeg1K6cXRU5phAxeXwpk_',
		);
		console.log(token);
		expect(token.access_token).not.toBe(null);
	});
	it('test add webhook ', async () => {
		let res = await api.messageAddWebHook(
			token.access_token,
			'https://081730327d8b6df60963404ee4b48150.serveo.net/avito',
		);

		console.log(res.data);
		//
	});
	it('remove webhook', async () => {
		await api.messageRemoveWebBook(
			token.access_token,
			'https://7a6fc6ded5ead3ab41106441b7e0140d.serveo.net/avito',
		);
	});
	it('get_messages', async () => {
		let messages = await api.getMessages(
			token.access_token,
			`357206631`,
			`u2i-lk4DlPt1uAKg3wzkBWVpEg`,
		);
		console.log(messages.messages);
	});
	it('get voice message', async () => {
		let r = await api.getVoiceMessage(
			token.access_token,
			'464d4ad6-6ef8-4c2f-be55-736e5a06dc9b',
			'357206631',
		);
		console.log(r);
	});
	it('send Message', async () => {
		let res = await api.sendMessage(
			token.access_token,
			'357206631',
			'u2i-lk4DlPt1uAKg3wzkBWVpEg',
			'ok',
		);
		console.log(res);
	});
	it('read chat', async () => {
		let rc = await api.readChat(token.access_token, '357206631', 'u2i-lk4DlPt1uAKg3wzkBWVpEg');
		console.log(rc);
	});
});

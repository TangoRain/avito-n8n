import type {
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class HandleAvitoMessage implements INodeType {
	description: INodeTypeDescription = {
		version: 1,

		defaults: {
			name: 'Test',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'avitoCredentialsApi',
			},
		],
		displayName: 'Avito Handle Message',
		name: 'HandlesAvitoMessage',
		group: ['trigger', 'avito'],
		description: '',
		icon: {
			dark: 'file:logo.svg',
			light: 'file:logo.svg',
		},
		properties: [],

		webhooks: [
			{
				httpMethod: 'GET',
				name: 'default',
				path: '/sdfs',
			},
		],
	};
	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		let res = this.getResponseObject();
		let credo = await this.getCredentials('avitoCredentialsApi');
		res.status(200).send(JSON.stringify(credo));
		const ret: IWebhookResponseData = {
			webhookResponse: 'ok',
			workflowData: [
				this.helpers.returnJsonArray({
					test: 'test',
				}),
			],
		};
		return ret;
	}
}

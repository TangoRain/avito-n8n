import {
	IExecuteFunctions,
	INodeExecutionData,
	NodeConnectionType,
	NodeExecutionWithMetadata,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { AvitoApi } from '../../src/Api';

export class AddAvitoWebhook implements INodeType {
	//
	description: INodeTypeDescription = {
		version: 0,
		defaults: {
			name: 'Avito add webhook',
		},
		icon: {
			dark: 'file:logo.svg',
			light: 'file:logo.svg',
		},
		credentials: [
			{
				required: true,
				name: 'avitoCredentialsApi',
				displayName: 'Avito Token',
			},
		],
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				name: 'avito_webhook',
				default: 'ZERO',
				type: 'string',
				displayName: 'Avito Webhook',
				required: true,
			},
			{
				name: 'barer_token',
				default: 'ZERO',
				type: 'string',
				displayName: 'User Token',
				required: true,
			},
		],
		displayName: ' Avito Add Webhook',
		name: 'AddAvitoWebhook',
		group: ['avito'],
		description: 'des',
	};

	async execute(
		this: IExecuteFunctions,
	): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const url = this.getNodeParameter('avito_webhook', 0);
		const token = this.getNodeParameter('barer_token', 0);
		console.log(url, token);
		const api = AvitoApi;
		await api.messageAddWebHook(token!.toString(), url!.toString());
		return [
			this.helpers.returnJsonArray({
				status: 'ok',
			}),
		];
	}
}

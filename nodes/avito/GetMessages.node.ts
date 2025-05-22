import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeExecutionWithMetadata,
} from 'n8n-workflow';
import { AvitoApi } from '../../src/Api';

export class GetMessages implements INodeType {
	description: INodeTypeDescription = {
		version: 0,
		icon: {
			dark: 'file:logo.svg',
			light: 'file:logo.svg',
		},
		defaults: {
			name: 'Avito Get Message',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				default: '',
				name: 'userId',
				required: true,
				type: 'string',
				displayName: ' User id',
			},
			{
				default: '',
				name: 'chatId',
				required: true,
				type: 'string',
				displayName: 'Chat id',
			},
			{
				default: '',
				name: 'token',
				required: true,
				type: 'string',
				displayName: 'Token',
			},
		],
		displayName: 'Avito Get Messages',
		name: 'getMessage',
		group: ['avito'],
		description: '',
	};
	async execute(
		this: IExecuteFunctions,
	): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const api = AvitoApi;
		const token = this.getNodeParameter('token', 0);
		const chatId = this.getNodeParameter('chatId', 0);
		const userId = this.getNodeParameter('userId', 0);
		let messages = await api.getMessages(token!.toString(), userId!.toString(), chatId!.toString());
		return [this.helpers.returnJsonArray({ messages: messages.messages })];
	}
}

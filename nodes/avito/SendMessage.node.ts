import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeExecutionWithMetadata,
} from 'n8n-workflow';
import { AvitoApi } from '../../src/Api';

export class SendMessage implements INodeType {
	description: INodeTypeDescription = {
		version: 0,
		defaults: {
			name: 'Avito Send Message',
		},
		icon: {
			dark: 'file:logo.svg',
			light: 'file:logo.svg',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		displayName: 'Avito Send Message',
		name: 'sendMessage',
		group: ['avito'],
		description: '',
		properties: [
			{
				name: 'token',
				default: '',
				displayName: 'Token',
				type: 'string',
			},
			{
				name: 'userId',
				default: '',
				displayName: 'User Id',
				type: 'string',
			},
			{
				name: 'chatId',
				default: '',
				displayName: 'Chat Id',
				type: 'string',
			},
			{
				name: 'message',
				default: '',
				displayName: 'Message',
				type: 'string',
			},
		],
	};
	async execute(
		this: IExecuteFunctions,
	): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const token = this.getNodeParameter('token', 0)!.toString();
		const userId = this.getNodeParameter('userId', 0)!.toString();
		const chatId = this.getNodeParameter('chatId', 0)!.toString();
		const message = this.getNodeParameter('message', 0)!.toString();
		const res = await AvitoApi.sendMessage(token, userId, chatId, message);
		return [this.helpers.returnJsonArray(res)];
	}
}

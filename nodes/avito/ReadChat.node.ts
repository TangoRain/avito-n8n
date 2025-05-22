import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeExecutionWithMetadata,
} from 'n8n-workflow';
import { AvitoApi } from '../../src/Api';

export class ReadChat implements INodeType {
	description: INodeTypeDescription = {
		version: 0,
		defaults: {
			name: 'Avito Read Chat',
		},
		icon: {
			dark: 'file:logo.svg',
			light: 'file:logo.svg',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				name: 'token',
				default: '',
				type: 'string',
				displayName: 'Token',
			},
			{
				name: 'userId',
				default: '',
				type: 'string',
				displayName: 'User Id',
			},
			{
				name: 'chatId',
				default: '',
				type: 'string',
				displayName: 'Chat Id',
			},
		],
		displayName: 'Avito Read chat',
		name: 'readChat',
		group: ['avito'],
		description: '',
	};
	async execute(
		this: IExecuteFunctions,
	): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const token = this.getNodeParameter('token', 0)!.toString();
		const userId = this.getNodeParameter('userId', 0)!.toString();
		const chatId = this.getNodeParameter('chatId', 0)!.toString();
		let r = await AvitoApi.readChat(token, userId, chatId);
		return [this.helpers.returnJsonArray(r)];
	}
}

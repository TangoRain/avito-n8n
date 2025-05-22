import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	jsonParse,
	NodeConnectionType,
	NodeExecutionWithMetadata,
} from 'n8n-workflow';
import { AvitoApi } from '../../src/Api';

export class GetVoiceMessage implements INodeType {
	description: INodeTypeDescription = {
		version: 0,
		icon: {
			dark: 'file:logo.svg',
			light: 'file:logo.svg',
		},
		defaults: {
			name: 'Avito get voice message',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				name: 'token',
				default: '',
				displayName: 'Token',
				type: 'string',
			},
			{
				name: 'voiceId',
				default: '',
				displayName: 'voice id',
				type: 'string',
			},
			{
				name: 'userId',
				default: '',
				displayName: 'user id',
				type: 'string',
			},
		],
		displayName: 'Avito Get Voice Message',
		name: 'getVoiceMessage',
		group: ['avito'],
		description: '',
	};
	async execute(
		this: IExecuteFunctions,
	): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const api = AvitoApi;
		let voice = await api.getVoiceMessage(
			this.getNodeParameter('token', 0)!.toString(),
			this.getNodeParameter('voiceId', 0)!.toString(),
			this.getNodeParameter('userId', 0)!.toString(),
		);
		return [this.helpers.returnJsonArray(voice)];
	}
}

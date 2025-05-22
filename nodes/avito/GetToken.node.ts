import {
	IExecuteFunctions,
	INodeExecutionData,
	NodeConnectionType,
	NodeExecutionWithMetadata,
	NodeOperationError,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { AvitoApi } from '../../src/Api';

export class GetToken implements INodeType {
	description: INodeTypeDescription = {
		version: 0,
		defaults: {
			name: 'Avito Token',
		},

		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [],

		displayName: ' Avito Get Token',
		name: 'getToken',
		group: ['avito'],
		icon: {
			dark: 'file:logo.svg',
			light: 'file:logo.svg',
		},
		credentials: [
			{
				name: 'avitoCredentialsApi',
				required: true,
			},
		],
		description: '',
	};
	async execute(
		this: IExecuteFunctions,
	): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const api = AvitoApi;
		const { clientId, clientSecret, bytebridgeApi } =
			await this.getCredentials('avitoCredentialsApi');
		if (bytebridgeApi != 'bb') {
			throw new NodeOperationError(this.getNode(), "CAN'T USE API WITHOUT BYTEBRIDGE TOKEN");
		}
		const res = await api.getToken(clientId!.toString(), clientSecret!.toString());
		return [
			this.helpers.returnJsonArray({
				token: res.access_token,
			}),
		];
	}
}

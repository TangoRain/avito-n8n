import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeExecutionWithMetadata,
} from 'n8n-workflow';
import { AvitoApi } from '../../src/Api';

export class UploadImage implements INodeType {
	description: INodeTypeDescription = {
		version: 0,
		defaults: {
			name: 'Avito Upload image',
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
				displayName: 'Token',
				default: '',
				type: 'string',
				required: true,
			},
			{
				name: 'userId',
				displayName: 'User Id',
				default: '',
				type: 'string',
				required: true,
			},

			{
				name: 'file',
				displayName: 'file',
				default: '',
				type: 'string',
				required: true,
				description: 'use Base64',
			},
			{
				name: 'fileName',
				displayName: 'file Name',
				default: '',
				type: 'string',
				required: true,
			},
		],

		displayName: 'Avito Upload Image',
		name: 'uploadImage',
		group: ['avito'],
		description: '',
	};
	async execute(
		this: IExecuteFunctions,
	): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		const token = this.getNodeParameter('token', 0)!.toString();
		const userId = this.getNodeParameter('userId', 0)!.toString();
		const file = this.getNodeParameter('file', 0)!.toString();
		const fileName = this.getNodeParameter('fileName', 0)!.toString();
		let res = await AvitoApi.uploadImage(token, userId, Buffer.from(file, 'base64'), fileName);
		return [this.helpers.returnJsonArray(res)];
	}
}

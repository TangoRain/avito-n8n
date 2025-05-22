import { ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class AvitoCredentials implements ICredentialType {
	name = 'avitoCredentialsApi';
	displayName = 'Avito AvitoCredentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Client Id',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Client secret',
			name: 'clientSecret',
			type: 'string',
			default: '',
			required: true,
		},

		{
			displayName: 'ByteBridge API',
			name: 'bytebridgeApi',
			type: 'string',
			default: '',
			required: true,
		},
	];
}

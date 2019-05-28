export type QoS = 0 | 1 | 2;

export class IMqttClient {
	constructor(options: {
		clientId: string;
		host: string;
		port: number;
		protocol: string;
		uri: string;
	})
	on(event: 'closed', cb: (msg: string) => void): void
	on(event: 'error', cb: (msg: string) => void): void
	on(event: 'message', cb: (msg: {
		data: string;
		qos: QoS;
		retain: boolean;
		topic: string;
	}) => void): void
	on(event: 'connect', cb: (msg: { reconnect: boolean; }) => void): void
	connect(): void;
	disconnect(): void;
	subscribe(topic: string, qos: QoS): void;
	unsubscribe(topic: string): void;
	publish(topic: string, payload: string, qos: QoS, retain: boolean): void;
	reconnect(): void;
	isConnected(): Promise<boolean>;
}

declare namespace mqtt {
	function createClient(options: { uri: string, clientId?: string }): Promise<IMqttClient>;
	function removeClient(client: IMqttClient): void;
	function disconnectAll(): void;
}

export default mqtt;

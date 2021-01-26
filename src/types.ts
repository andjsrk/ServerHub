import { Client, Message } from 'discord.js'

type ObjectValue<T> = {
	[x: string]: T
}

interface Command {
	readonly type: 'equals' | 'starts'
	readonly content: string
	run(client: Client, msg: Message): void
}

export {
	Command as CommandInterface,
	ObjectValue
}
import { Client, Message } from 'discord.js'
import Bot from './class/Bot'

type ObjectValue<T> = {
	[x: string]: T
}

interface Command {
	readonly type: 'equals' | 'starts'
	readonly content: string
	run(bot: Bot, msg: Message): void
}

export {
	Command as CommandInterface,
	ObjectValue
}

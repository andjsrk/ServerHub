import { Client, Message } from 'discord.js'
import { CommandInterface } from '../types'

export default class CommandExecuter {
	private static prefix = ''
	static bindPrefix(prefix: string) {
		CommandExecuter.prefix = prefix
	}
	static execute(command: CommandInterface, client: Client, msg: Message) {
		switch (command.type) {
			case 'equals':
				if (msg.content === `${CommandExecuter.prefix}${command.content}`) {
					command.run(client, msg)
				}
				break
			case 'starts':
				if (msg.content.startsWith(`${CommandExecuter.prefix}${command.content}`)) {
					command.run(client, msg)
				}
				break
		}
	}
}
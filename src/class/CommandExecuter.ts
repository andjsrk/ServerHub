import { Message } from 'discord.js'
import Bot from './Bot'
import { CommandInterface } from '../types'

export default class CommandExecuter {
	private static prefix = ''
	static bindPrefix(prefix: string) {
		CommandExecuter.prefix = prefix
	}
	static execute(command: CommandInterface, bot: Bot, msg: Message) {
		switch (command.type) {
			case 'equals':
				if (msg.content === `${CommandExecuter.prefix}${command.content}`) {
					command.run(bot, msg)
				}
				break
			case 'starts':
				if (msg.content.startsWith(`${CommandExecuter.prefix}${command.content}`)) {
					command.run(bot, msg)
				}
				break
		}
	}
}

import { ClientUser, TextChannel } from 'discord.js'

import Bot from './class/Bot_'
import Embed from './class/Embed'
import { bold, emoji } from './markdown'
import { DEVELOPER, PREFIX, TOKEN } from './config'

const bot = new Bot(TOKEN)

bot.once('ready', () => {
	bot.bindPrefix(PREFIX)
	bot.setActivity('testing', 'PLAYING')
	Embed.bindDeveloper(bot.getUser(DEVELOPER)!)
	console.log('ready')
})

bot.on('message', msg => {
	if (msg.author.id === bot.id) return
	if (msg.guild === null) {
		msg.channel.send(
			new Embed(
				emoji('exclamation') + bold('DM에서는 이용할 수 없는 봇입니다.')
			).get()
		)
		return
	}
	if (!(msg.channel as TextChannel).permissionsFor(bot.user as ClientUser)!.has('SEND_MESSAGES')) return
	bot.runCommandsOnDir('command', msg)
})

bot.login()
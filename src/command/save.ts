import { Message } from 'discord.js'
import * as DB from 'quick.db'
import Bot from '../class/Bot'
import Embed from '../class/Embed'
import Data from '../class/Data'
import Util from '../util'
import { bold, emoji } from '../markdown'
import { CommandInterface, ObjectValue } from '../types'

module.exports = {
	type: 'equals',
	content: '저장',
	run(bot: Bot, msg: Message) {
		if (msg.guild === null) return
		if (msg.member!.id !== msg.guild.owner!.id) {
			msg.channel.send(
				new Embed(
					emoji('exclamation') + bold('서버의 오너만 사용할 수 있습니다.')
				).get()
			)
			return
		}
		if (!msg.guild.me!.hasPermission('ADMINISTRATOR')) {
			msg.channel.send(
				new Embed(
					emoji('exclamation') + bold('관리자 권한이 필요합니다.')
				).get()
			)
			return
		}
		if (msg.guild.roles.highest.id !== msg.guild.roles.cache.find(role => role.name === '서버 백업기' && role.managed)!.id) {
			msg.channel.send(
				new Embed(
					emoji('exclamation') + bold('봇 역할이 제일 높은 위치에 있어야 합니다.')
				).get()
			)
			return
		}
		const id = Util.makeId(9, Object.keys(DB.get('saved') as ObjectValue<Data>))
		DB.set(`saved.${id}`, new Data(new Date().getTime(), msg.guild))
		msg.channel.send(
			new Embed(
				emoji('inbox_tray') + bold('저장을 완료했습니다.')
			)
			.addField('id', id)
			.addFooterContent('id는 저장해놓은 정보를 로드할 때 필요합니다.')
			.get()
		)
	}
} as CommandInterface

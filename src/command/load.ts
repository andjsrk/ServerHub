import { Message } from 'discord.js'
import * as DB from 'quick.db'
import Bot from '../class/Bot'
import Embed from '../class/Embed'
import Data from '../class/Data'
import { bold, emoji } from '../markdown'
import { CommandInterface } from '../types'

module.exports = {
	type: 'starts',
	content: '로드',
	async run(bot: Bot, msg: Message) {
		if (msg.guild === null) return
		const id = msg.content.split(/ /).slice(1).join(' ')
		const data: Data | null = DB.get(`saved.${id}`)
		if (data === null) {
			msg.channel.send(
				new Embed(
					emoji('x') + bold(`id ${id}에 해당하는 저장본이 없습니다.`)
				).get()
			)
			return
		}
		if (msg.member!.id !== msg.guild.owner!.id || msg.guild.owner!.id !== data.requesterId) {
			msg.channel.send(
				new Embed(
					emoji('exclamation') + bold('서버에서 오너이며 정보를 저장한 유저만 사용할 수 있습니다.')
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
		const guildData = data.guild
		msg.guild.roles.cache.filter(role => role.editable && role.id !== msg.guild!.roles.everyone.id).forEach(async role => await role.delete())
		msg.guild.emojis.cache.filter(emoji => emoji.deletable).forEach(async emoji => await emoji.delete())
		msg.guild.channels.cache.forEach(async channel => await channel.delete())
		for (const role of guildData.roles.sort((a, b) => a.position - b.position)) {
			if (role.everyone) {
				await msg.guild.roles.everyone.setPermissions(role.permissions)
				role.made = msg.guild.roles.everyone
				continue
			}
			role.made = await msg.guild.roles.create({
				data: {
					name: role.name,
					color: role.color,
					position: role.position,
					permissions: role.permissions,
					hoist: role.hoist,
					mentionable: role.mentionable
				}
			})
		}
		for (const emoji of guildData.emojis) {
			msg.guild.emojis.create(emoji.url, emoji.name).catch(e => console.log(e))
		}
		for (const categoryData of guildData.categories.sort((a, b) => a.position - b.position)) {
			categoryData.made = await msg.guild!.channels.create(categoryData.name, {
				type: 'category'
			})
			categoryData.made.setPosition(categoryData.position)
		}
		for (const channelData of guildData.textChannels.sort((a, b) => a.position - b.position)) {
			channelData.made = await msg.guild!.channels.create(channelData.name, {
				type: 'text',
				position: channelData.position,
				parent: channelData.parent !== null ? guildData.categories.find(category => category.id === channelData.parent!.id)!.made!.id : undefined,
				topic: channelData.topic || undefined,
				permissionOverwrites: channelData.permissions.map(permission => ({
					id: guildData.roles.find(role => role.id === permission.id)!.made!.id,
					type: 'role',
					allow: permission.allow,
					deny: permission.deny
				}))
			})
		}
		for (const channelData of guildData.voiceChannels.sort((a, b) => a.position - b.position)) {
			channelData.made = await msg.guild!.channels.create(channelData.name, {
				type: 'voice',
				position: channelData.position,
				parent: channelData.parent !== null ? guildData.categories.find(category => category.id === channelData.parent!.id)!.made!.id : undefined,
				permissionOverwrites: channelData.permissions.map(permission => (console.log(permission, guildData.roles.map(r => r.id)), ({
					id: guildData.roles.find(role => role.id === permission.id)!.made!.id,
					type: 'role',
					allow: permission.allow,
					deny: permission.deny
				})))
			})
		}
		msg.guild.setName(guildData.name)
		if (guildData.iconURL !== null) msg.guild.setIcon(guildData.iconURL)
		msg.guild.setRegion(guildData.region)
		msg.guild.setVerificationLevel(guildData.verificationLevel)
		msg.guild.setExplicitContentFilter(guildData.explicitContentFilter)
		msg.guild.setDefaultMessageNotifications(guildData.defaultMessageNotifications)
		if (guildData.afkChannel !== null) msg.guild.setAFKChannel(guildData.voiceChannels.find(voiceChannel => voiceChannel.id === guildData.afkChannel)!.made!.id)
		msg.guild.setAFKTimeout(guildData.afkTimeout)
	}
} as CommandInterface

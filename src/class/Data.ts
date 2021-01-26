import { Guild } from 'discord.js'
import GuildClass from './Guild'

export default class Data {
	readonly timestamp: number
	readonly requesterId: string
	readonly guild: GuildClass
	constructor(timestamp: number, guild: Guild) {
		this.timestamp = timestamp
		this.requesterId = guild.owner!.id
		this.guild = new GuildClass(guild)
	}
}
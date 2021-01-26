import { GuildChannel } from 'discord.js'
import BaseClass from './Base'
import ChannelPermission from './ChannelPermission'

export default abstract class ChannelClass extends BaseClass {
	readonly position: number
	readonly permissions: ChannelPermission[]
	readonly parent: GuildChannel | null
	made: GuildChannel | null
	constructor(channel: GuildChannel) {
		super(channel)
		this.position = channel.position
		this.permissions = channel.permissionOverwrites.filter(permission => permission.type === 'role' && channel.guild.roles.cache.get(permission.id)!.editable).array().map(permission => new ChannelPermission(permission))
		if (channel.parent !== null) this.parent = channel.parent
		else this.parent = null
		this.made = null
	}
}
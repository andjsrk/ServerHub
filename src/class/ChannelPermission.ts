import { PermissionOverwrites, PermissionString } from 'discord.js'

export default class ChannelPermissionClass {
	readonly id: string
	readonly allow: PermissionString[]
	readonly deny: PermissionString[]
	constructor(permission: PermissionOverwrites) {
		this.id = permission.id
		this.allow = permission.allow.toArray(false)
		this.deny = permission.deny.toArray(false)
	}
}
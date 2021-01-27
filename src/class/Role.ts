import { Role, PermissionString } from 'discord.js'
import BaseClass from './Base'

export default class RoleClass extends BaseClass {
	readonly color: number
	readonly position: number
	readonly permissions: PermissionString[]
	readonly hoist: boolean
	readonly managed: boolean
	readonly mentionable: boolean
	readonly editable: boolean
	readonly everyone: boolean
	made: Role | null
	constructor(role: Role) {
		super(role)
		this.color = role.color
		this.position = role.position
		this.permissions = role.permissions.toArray(false)
		console.log(this.permissions)
		this.hoist = role.hoist
		this.managed = role.managed
		this.mentionable = role.mentionable
		this.editable = role.editable
		this.everyone = role.id === role.guild.roles.everyone.id
		this.made = null
	}
}

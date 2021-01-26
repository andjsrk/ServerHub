import * as fs from 'fs'
import { Client, ClientEvents, Message, MessageEmbed } from 'discord.js'
import CommandExecuter from './CommandExecuter'
import { CommandInterface } from '../types'

export default class Bot {
	private readonly client: Client
	token: string
	constructor(token: string) {
		if (!token) throw new Error('no token provided')
		this.client = new Client
		this.token = token
	}
	get readied() {
		return this.client.uptime !== null
	}
	get id() {
		if (!this.readied) throw new Error('bot wasn\'t ready.')
		return this.client.user!.id
	}
	bindPrefix(prefix: string) {
		CommandExecuter.bindPrefix(prefix)
	}
	runCommandsOnDir(path: string, msg: Message) {
		const commandPaths = fs.readdirSync(path, 'utf-8')
		commandPaths.forEach(commandPath => {
			const command: CommandInterface = require(`../${path}${path.endsWith('/') ? '' : '/'}${commandPath}`)
			CommandExecuter.execute(command, this.client, msg)
		})
	}
	setActivity(name: string, type: 'PLAYING' | 'WATCHING' | 'STREAMING' | 'LISTENING' = 'PLAYING') {
		if (!this.readied) throw new Error('bot wasn\'t ready.')
		this.client.user!.setActivity({ name, type })
	}
	on<K extends keyof ClientEvents>(eventName: K, listener: (...args: ClientEvents[K]) => void): this {
		this.client.on(eventName, listener)
		return this
	}
	once<K extends keyof ClientEvents>(eventName: K, listener: (...args: ClientEvents[K]) => void): this {
		this.client.once(eventName, listener)
		return this
	}
	get(type: 'user' | 'guild' | 'channel' | 'emoji', id: string) {
		switch (type) {
			case 'user':
				const user = this.client.users.cache.get(id)
				if (user === undefined) return null
				else return user
			case 'guild':
				const guild = this.client.guilds.cache.get(id)
				if (guild === undefined) return null
				else return guild
			case 'channel':
				const channel = this.client.channels.cache.get(id)
				if (channel === undefined) return null
				else return channel
			case 'emoji':
				const emoji = this.client.emojis.cache.get(id)
				if (emoji === undefined) return null
				else return emoji
			default:
				throw new Error(`Unexpected type: ${type}`)
		}
	}
	login() {
		return this.client.login(this.token)
	}
}
new Client().guilds
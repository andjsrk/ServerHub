import { TextChannel } from 'discord.js'
import ChannelClass from './Channel'

export default class TextChannelClass extends ChannelClass {
	readonly topic: string | null
	constructor(channel: TextChannel) {
		super(channel)
		this.topic = channel.topic
	}
}

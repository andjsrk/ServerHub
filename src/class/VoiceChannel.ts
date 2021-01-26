import { VoiceChannel } from 'discord.js'
import ChannelClass from './Channel'

export default class VoiceChannelClass extends ChannelClass {
	constructor(channel: VoiceChannel) {
		super(channel)
	}
}
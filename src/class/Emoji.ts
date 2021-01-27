import { GuildEmoji } from 'discord.js'
import BaseClass from './Base'

export default class EmojiClass extends BaseClass {
	readonly url: string
	constructor(emoji: GuildEmoji) {
		super(emoji)
		this.url = emoji.url
	}
}

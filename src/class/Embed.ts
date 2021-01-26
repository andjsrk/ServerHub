import { MessageEmbed, User } from 'discord.js'

export default class Embed {
	private embed: MessageEmbed
	constructor(title: string) {
		this.embed = new MessageEmbed
		this.embed.setDescription(title)
		if (Embed.developer !== null) this.embed.setFooter(Embed.developer.tag, Embed.developer.avatarURL() as string)
	}
	static developer: User | null = null
	static bindDeveloper(user: User) {
		Embed.developer = user
	}
	get() {
		return this.embed
	}
	addContent(content: string) {
		this.embed.setDescription(`${this.embed.description}\n\n${content}`)
		return this
	}
	addField(name: string, value: string, inline?: boolean) {
		this.embed.addField(name, value, inline)
		return this
	}
	addFooterContent(content: string) {
		if (this.embed.footer === null) this.embed.setFooter(content)
		else this.embed.setFooter(`${content}\n${this.embed.footer!.text}`)
		return this
	}
}
import {
	Guild,
	CategoryChannel,
	TextChannel,
	VoiceChannel,
	SystemChannelFlagsString,
	VerificationLevel,
	ExplicitContentFilterLevel,
	DefaultMessageNotifications,
	GuildWidget
} from 'discord.js'
import BaseClass from './Base'
import CategoryClass from './Category'
import RoleClass from './Role'
import EmojiClass from './Emoji'
import TextChannelClass from './TextChannel'
import VoiceChannelClass from './VoiceChannel'
import WebhookClass from './Webhook'

export default class GuildClass extends BaseClass {
	readonly guild: Guild
	readonly iconURL: string | null
	readonly region: string
	readonly afkChannel: string | null
	readonly afkTimeout: number
	readonly systemChannel: string | null
	readonly systemChannelFlags: SystemChannelFlagsString[]
	readonly defaultMessageNotifications: number | DefaultMessageNotifications
	readonly verificationLevel: VerificationLevel
	readonly explicitContentFilter: ExplicitContentFilterLevel
	readonly publicUpdateChannel: string | null
	readonly rulesChannel: string | null
	readonly roles: RoleClass[]
	readonly emojis: EmojiClass[]
	readonly categories: CategoryClass[]
	readonly textChannels: TextChannelClass[]
	readonly voiceChannels: VoiceChannelClass[]
	readonly widgetEnabled: boolean | null
	widget: GuildWidget | null
	webhooks: WebhookClass[] | null
	constructor(guild: Guild) {
		super(guild)
		this.guild = guild
		this.iconURL = guild.iconURL()
		this.region = guild.region
		if (guild.afkChannel !== null) this.afkChannel = guild.afkChannel.id
		else this.afkChannel = null
		this.afkTimeout = guild.afkTimeout
		if (guild.systemChannel !== null) this.systemChannel = guild.systemChannel.id
		else this.systemChannel = null
		this.systemChannelFlags = guild.systemChannelFlags.toArray()
		this.defaultMessageNotifications = guild.defaultMessageNotifications
		this.verificationLevel = guild.verificationLevel
		this.explicitContentFilter = guild.explicitContentFilter
		if (guild.publicUpdatesChannel !== null) this.publicUpdateChannel = guild.publicUpdatesChannel.id
		else this.publicUpdateChannel = null
		if (guild.rulesChannel !== null) this.rulesChannel = guild.rulesChannel.id
		else this.rulesChannel = null
		this.roles = guild.roles.cache.filter(role => role.editable).array().map(role => new RoleClass(role))
		this.emojis = guild.emojis.cache.array().map(emoji => new EmojiClass(emoji))
		this.categories = guild.channels.cache.filter(channel => channel.type === 'category').array().map(category => new CategoryClass(category as CategoryChannel))
		this.textChannels = guild.channels.cache.filter(channel => channel.type === 'text').array().map(channel => new TextChannelClass(channel as TextChannel))
		this.voiceChannels = guild.channels.cache.filter(channel => channel.type === 'voice').array().map(channel => new VoiceChannelClass(channel as VoiceChannel))
		this.widgetEnabled = guild.widgetEnabled
		this.widget = null
		this.webhooks = null
		this.updateWebhooks()
	}
	updateWebhooks() {
		return new Promise(async resolve => {
			const webhooks = await this.guild.fetchWebhooks()
			this.webhooks = webhooks.array().map(webhook => new WebhookClass(webhook))
			resolve(this.webhooks)
		})
	}
}
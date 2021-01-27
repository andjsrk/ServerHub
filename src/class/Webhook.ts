import { Webhook } from 'discord.js'
import BaseClass from './Base'

export default class WebhookClass extends BaseClass {
	constructor(webhook: Webhook) {
		super(webhook)
		webhook
	}
}

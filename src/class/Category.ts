import { CategoryChannel } from 'discord.js'
import BaseClass from './Base'

export default class CategoryClass extends BaseClass {
	readonly position: number
	made: CategoryChannel | null
	constructor(category: CategoryChannel) {
		super(category)
		this.position = category.position
		this.made = null
	}
}

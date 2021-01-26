export default abstract class BaseClass {
	readonly id: string
	readonly name: string
	constructor(data: {
		id: string
		name: string
	}) {
		this.id = data.id
		this.name = data.name
	}
}
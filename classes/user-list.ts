import { User } from './user';

export class UserList {
	private list: User[] = [];

	constructor() {}

	public add(user: User) {
		this.list.push(user);
		// console.log(this.list);
		return this.list;
	}

	public updateUserName(id: string, name: string) {
		// const user = this.list.find(u => u.id === id);
		const user = this.getUserById(id);

		if (user) {
			user.name = name;
		}

		// console.log(this.list);
	}

	public getList() {
		return this.list.filter(u => u.name !== 'sin-nombre');
	}

	public getUserById(id: string) {
		return this.list.find(u => u.id === id);
	}

	public getUserByRoom(room: string) {
		return this.list.filter(u => u.room === room);
	}

	public deleteUser(id: string) {
		const tmpUser = this.getUserById(id);
		this.list = this.list.filter(u => u.id !== id);
		return tmpUser;
	}
}

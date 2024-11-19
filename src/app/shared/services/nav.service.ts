import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];

}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false
	public fullScreen = false;

	constructor() {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	public get userRoles(): string[] {
		const userRoles: string[] = JSON.parse(localStorage.getItem('currentUser')).userrole.map(a => {
			return a.name
		})

		return userRoles
	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = []

	// MENUITEMS: Menu[] = [


	// 	{
	// 		title: 'Dashboard', icon: 'home', type: 'sub', badgeType: 'primary', badgeValue: 'new', active: false, children: [
	// 			{ path: '/map/google', title: 'Map View', type: 'link' },
	// 			{ path: 'detailDashboard', title: 'Stats View', type: 'link' },

	// 		]
	// 	},
	// 	{
	// 		title: 'Forms Indicator', icon: 'list', type: 'sub', badgeType: 'primary', active: false, children: [
	// 			{ path: '/formsindicator', title: 'Forms Indicator', type: 'link' },
	// 			{ path: '/formsindicatorlist', title: 'Forms Indicator List', type: 'link' },


	// 		]
	// 	},
	// 	{
	// 		title: 'User Management', icon: 'settings', type: 'sub', badgeType: 'primary', active: false, children: [
	// 			{ path: '/register', title: 'Create User', type: 'link' },
	// 			{ path: '/roles', title: 'Create Role', type: 'link' },
	// 			{ path: '/userList', title: 'Assign Role', type: 'link' },

	// 		]
	// 	},
	// 	{
	// 		title: 'Campaign Management', icon: 'list', type: 'sub', badgeType: 'primary', active: false, children: [
	// 			{ path: '/event', title: 'Create Campaign', type: 'link' },


	// 		]
	// 	},
	// 	{
	// 		title: 'Reporting', icon: 'file', type: 'sub', badgeType: 'primary', active: false, children: [
	// 			{ path: '/reporting', title: 'Generate Report', type: 'link' },


	// 		]
	// 	},



	// ]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}

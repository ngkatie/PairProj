import { registerRoutes } from "./routeBuilder";

export const routes = registerRoutes({
	home: "/",
	login: "/login",
	users: {
		profile: "/users/:id",
	},
	projects: {
		search: "/projects/search",
		project: "/projects/:id",
		editor: "text-editor",	// subject to change once project page is up
	},
});

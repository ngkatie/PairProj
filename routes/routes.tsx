import { registerRoutes } from "./routeBuilder";

export const routes = registerRoutes({
	login: "/login",
	users: {
		profile: "/users/:id",
	},
	projects: {
		search: "/projects/search",
		project: "/projects/:id",
	},
});

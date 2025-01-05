import { registerRoutes } from "./routeBuilder";

export const routes = registerRoutes({
	home: "/home",
	about: "/about",
	login: "/login",
	projects: {
		list: "/projects/list",
		search: "/projects/search",
		project: "/projects/:id",
		contributor: "/projects/:projectId/contributor/:contributorId",
	},
});

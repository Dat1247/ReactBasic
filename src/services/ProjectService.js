import { baseService } from "./baseService";

export class ProjectService extends baseService {
	constructor() {
		super();
	}

	signinCyberBugs = (userLogin) => {
		return this.post(`/Users/signin`, userLogin);
	};

	getAllProjectCategory = () => {
		return this.get(`/ProjectCategory`);
	};

	createProject = (newProject) => {
		return this.post(`/Project/createProject`, newProject);
	};

	createProjectAuthorization = (newProject) => {
		return this.post(`/Project/createProjectAuthorize`, newProject);
	};

	getListProject = () => {
		return this.get(`/Project/getAllProject`);
	};

	updateProject = (projectUpdate) => {
		return this.put(
			`/Project/updateProject?projectId=${projectUpdate.id}`,
			projectUpdate
		);
	};

	deleteProject = (id) => {
		return this.delete(`/Project/deleteProject?projectId=${id}`);
	};
}

export const projectService = new ProjectService();

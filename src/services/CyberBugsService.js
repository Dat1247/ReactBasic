import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";

export class CyberbugsService {
	constructor() {}

	signinCyberBugs = (userLogin) => {
		return Axios({
			url: `${DOMAIN_CYBERBUG}/Users/signin`,
			method: "POST",
			data: userLogin,
		});
	};
	getAllProjectCategory = () => {
		return Axios({
			url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
			method: "GET",
		});
	};

	createProject = (newProject) => {
		return Axios({
			url: `${DOMAIN_CYBERBUG}/Project/createProject`,
			method: "POST",
			data: newProject,
		});
	};

	createProjectAuthorization = (newProject) => {
		return Axios({
			url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
			method: "POST",
			data: newProject,
			headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
		});
	};

	getListProject = () => {
		return Axios({
			url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
			method: "GET",
			//Token yêu càu từ back-end chứng minh user đã đăng nhập
			headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
		});
	};

	updateProject = (projectUpdate) => {
		return Axios({
			url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
			method: "PUT",
			data: projectUpdate,
			headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
		});
	};
}

export const cyberbugsService = new CyberbugsService();

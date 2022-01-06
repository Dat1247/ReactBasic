import { baseService } from "./baseService";

export class UserService extends baseService {
	constructor() {
		super();
	}

	getUser = (keyWord) => {
		return this.get(`Users/getUser?keyword=${keyWord}`);
	};

	assignUserProject = (userProject) => {
		return this.post(`Project/assignUserProject`, userProject);
	};

	deleteUserFromProject = (userProject) => {
		return this.post(`Project/removeUserFromProject`, userProject);
	};

	getUserByProjectId = (projectId) => {
		return this.get(`Users/getUserByProjectId?idProject=${projectId}`);
	};

	deleteUser = (userId) => {
		return this.delete(`Users/deleteUser?id=${userId}`);
	};

	editUser = (userEdit) => {
		return this.put(`Users/editUser`, userEdit);
	};

	signUpUser = (userSignUp) => {
		return this.post(`Users/signup`, userSignUp);
	};
}

export const userService = new UserService();

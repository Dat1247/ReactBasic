import Axios from "axios";
import { DOMAIN_CYBERBUG } from "../util/constants/settingSystem";

export class CyberbugsService {
	constructor() {}

	signinCyberBugs = (userLogin) => {
		return Axios({
			url: `${DOMAIN_CYBERBUG}/Users/signin`,
			method: "POST",
			data: userLogin,
		});
	};
}

export const cyberbugsService = new CyberbugsService();

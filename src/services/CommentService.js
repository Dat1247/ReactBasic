import { baseService } from "./baseService";

class CommentService extends baseService {
	constructor() {
		super();
	}

	getAllComment = (taskId) => {
		return this.get(`/Comment/getAll?taskId=${taskId}`);
	};

	addComment = (objComment) => {
		return this.post(`/Comment/insertComment`, objComment);
	};

	updateComment = (updateComment) => {
		return this.put(
			`/Comment/updateComment?id=${updateComment.id}&contentComment=${updateComment.contentComment}`,
			updateComment
		);
	};

	deleteComment = (idComment) => {
		return this.delete(`/Comment/deleteComment?idComment=${idComment}`);
	};
}

export const commentService = new CommentService();

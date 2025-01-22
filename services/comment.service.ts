import type {
  Comment,
  CommentFilterParams,
  CommentStatus,
} from "~/models/comments/Comment";
import type { FilterResult } from "~/models/Filterresult";
import { CustomFetch } from "~/utils/CustomFetch";

export const getComments = (filterParams: CommentFilterParams) => {
  return CustomFetch<FilterResult<Comment>>("/comment", {
    query: filterParams,
  });
};
export const deleteComment = (id: number) => {
  return CustomFetch(`/comment/${id}`, {
    method: "DELETE",
  });
};
export const changeCommentStatus = (id: number, status: CommentStatus | number) => {
  return CustomFetch(`/comment/changeStatus`, {
    method: "PUT",
    body: { status, id },
  });
};

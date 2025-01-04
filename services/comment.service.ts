import type { CommentFilterParams } from "~/models/comments/Comment";
import type { FilterResult } from "~/models/Filterresult";
import { CustomFetch } from "~/utils/CustomFetch";

export const getComments = (filterParams: CommentFilterParams) => {
  return CustomFetch<FilterResult<Comment>>("/comment", {
    query: filterParams,
  });
};

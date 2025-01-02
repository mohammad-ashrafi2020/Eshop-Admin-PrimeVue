import type { BaseFilterParams } from "../BaseFilterParams";

export interface Comment {
  id: number;
  creationDate: string;
  productId: number;
  userId: number;
  userFullName: string;
  productTitle: string;
  text: string;
  status: CommentStatus;
  rate: number;
  disadvantages: string[];
  advantages: string[];
  userRecommendedStatus: UserRecommendedStatus;
}
export enum CommentStatus {
  Pending,
  Accepted,
  Rejected,
}
export enum UserRecommendedStatus {
  پیشنهاد_میکنم,
  پیشنهاد_نمی_کنم,
  مطمئن_نیستم,
}
export interface CommentFilterParams extends BaseFilterParams {
  commentStatus: CommentStatus | undefined;
  userId: number | undefined;
  productId: number | undefined;
}

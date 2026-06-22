export type CreateReviewRequestDto = {
  resourceId: number;
  userId: number;
  text: string;
  rating: number;
};
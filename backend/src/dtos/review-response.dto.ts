export interface ReviewResponseDto {
  id: number;
  resourceId: number;
  userId: number;
  text: string;
  rating: number;
  createdAt: string;
}
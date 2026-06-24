export interface ResourceDto {
    title: string;
    author: string;
    type: string;
    rating: number;
    comment: string;
}

export interface Resource {
    id: number;
    title: string;
    author: string;
    type: string;
    rating: number;
    comment: string;
    createdAt?: string;
}

export interface ResourcesResponse {
    items: Resource[];
    total: number;
}
export interface Resource extends ResourceDto {
  id: number;
}
export interface Review {
  id: number;
  resourceId: number;
  userId: number;
  text: string;
  rating: number;
  createdAt: string;
}

export interface ReviewDto {
  resourceId: number;
  userId: number;
  text: string;
  rating: number;
}
export interface ReviewsResponse {
    items: Review[];
}
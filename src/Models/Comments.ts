export interface CommentsDB {
  id: string;
  creator_id: string;
  post_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export class Comments {
  constructor() {}
}

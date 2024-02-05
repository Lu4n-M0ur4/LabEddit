export interface likeOrDislike {
  user_id: string;
  post_id: string;
  like: number;
}

export enum POST_LIKE {
  ALREADY_LIKED = "ALREADY LIKED",
  ALREADY_DISLIKED = "ALREADY DISLIKED",
}

export interface PostDB {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
 
}

export interface PostDBAndCreator {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
  creator_name: string;
}

export interface PostModelForCratorName {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: {
    creatorId: string;
    creatorName: string;
  };
}
export interface PostModel {
  id: string;
  creatorId: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}

export class Post {
  constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorName:string

  ) {}

  public getId(): string {
    return this.id;
  }
  public setId(value: string): void {
    this.id = value;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }
  public setCreatorId(value: string): void {
    this.creatorId = value;
  }

  public getContent(): string {
    return this.content;
  }
  public setContent(value: string): void {
    this.content = value;
  }

  public getLikes(): number {
    return this.likes;
  }
  public setLikes(value: number): void {
    this.likes = value;
  }

  public getDislikes(): number {
    return this.dislikes;
  }
  public setDislikes(value: number): void {
    this.dislikes = value;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }
  public setCreatedAt(value: string) {
    this.createdAt = value;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }
  public setUpdatedAt(value: string) {
    this.updatedAt = value;
  }
  public getCreatorName(): string {
    return this.creatorName ;
  }
  public setCreatorName(value: string) {
    this.creatorName = value;
  }

  public addLike = (): void => {
    this.likes++
  }

  public removeLike = (): void => {
    this.likes--
  }

  public addDislike = (): void => {
    this.dislikes++
  }

  public removeDislike = (): void => {
    this.dislikes--
  }

}

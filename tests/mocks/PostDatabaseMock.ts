import { string } from "zod";
import { BaseDatabase } from "../../src/dataBase/BaseDatabase";
import { CommentModelByPost, CommentsDB } from "../../src/Models/Comment";
import {
  likeOrDislike,
  POST_LIKE,
  PostDB,
  PostDBAndCreator,
  PostModelForCratorName,
} from "../../src/Models/Post";

const PostMock: PostDB[] = [
  {
    id: "id-mock",
    creator_id: "id-mock-fulano",
    content: "Conteudo do post MOCK",
    likes: 0,
    dislikes: 0,
    created_at: expect.any(String),
    updated_at: expect.any(String),
  },
];

const PostMockDBAndCreator: PostDBAndCreator[] = [
  {
    id: "id-mock",
    creator_id: "id-mock-fulano",
    content: "Conteudo do post MOCK",
    likes: 0,
    dislikes: 0,
    created_at: expect.any(String),
    updated_at: expect.any(String),
    creator_name: "Fulano",
  },
];

const commentModelByPostMock:CommentModelByPost = {
  post:{
  id:"id-mock",
  content: "Conteudo do post MOCK",
  likes: 0,
  dislikes: 0,
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  creator: {
    creatorId: "id-mock-fulano",
    creatorName:"Fulano"
  },
},
  comments:
  [{
    id: "id-mock",
    postId: "id-mock",
    content: "Conteudo do comment Mock",
    likes: 0,
    dislikes: 0,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    creator: {
      idCreator: "id-mock-fulano",
      creatorName: "Fulano",
    }
  }]


}


const postMockDBAndCreatorName:PostModelForCratorName = {
    id: "id-mock",
    content: "Conteudo do post MOCK",
    likes: 0,
    dislikes: 0,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    quantityComments: 10,
    creator: {
      creatorId: "id-mock-fulano",
      creatorName:"Fulano"
    }
  }

const likeOrDislike: likeOrDislike = 
  {
    user_id: "id-mock-fulano",
    post_id: "id-mock",
    like: 0,
  }


export class PostDatabaseMock extends BaseDatabase {
  public getAllPosts = async (): Promise<PostDBAndCreator[] | undefined> => {
    const output = PostMockDBAndCreator;
    return output;
  };


  public getLengthByPost = async (id:string):Promise<number> => {
    const output:number =  await commentModelByPostMock.comments.length
      

      if(output < 1){
        return 0
      }else{
        return output
      }
  
    return output;
  };


  public updatePost = async (PostMock: PostDB): Promise<void> => {};

  public insertPost = async (newPost: PostDB): Promise<void> => {};

  public findPost = async (
    id: string
  ): Promise<PostDBAndCreator | undefined> => {
    const [output] = PostMockDBAndCreator;

    return output;
  };

  public findPostLikedDisliked = async (
    likeDislikeExist: likeOrDislike
  ): Promise<POST_LIKE | undefined> => {
    const [res]: likeOrDislike[] | undefined = [
      {
        user_id: "id-mock-fulano",
        post_id: "id-mock",
        like: 1,
      },
    ]

    if (res === undefined) {
      return undefined;
    } else if (res.like === 1) {
      return POST_LIKE.ALREADY_LIKED;
    } else {
      return POST_LIKE.ALREADY_DISLIKED;
    }
  };

  public insertLikeOrDislike = async (
    likeDislikeExist: likeOrDislike
  ): Promise<void> => {};

  public updateLikeOrDislike = async (
    likeDislikeExist: likeOrDislike
  ): Promise<void> => {};

  public deleteLikeOrDislike = async (
    likeDislikeExist: likeOrDislike
  ): Promise<void> => {};

  public deletePost = async (id: string): Promise<void> => {};
  
}

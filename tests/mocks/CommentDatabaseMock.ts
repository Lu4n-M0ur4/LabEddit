import { PostModelForCratorName } from "../../src/Models/Post";
import {
  COMMENT_LIKE,
  CommentModel,
  CommentsDB,
  CommentsDBAndCreator,
  likeOrDislikeComment,
} from "../../src/Models/Comment";
import { CommentModelByPost } from "../../src/Models/Comment";
import { BaseDatabase } from "../../src/dataBase/BaseDatabase";

const commentModelMock: CommentModel = {
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
  },
};

const PostMockDBAndCreatorName:PostModelForCratorName = {
  id: "id-mock",
  content: "Conteudo do post MOCK",
  likes: 0,
  dislikes: 0,
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  creator: {
    creatorId: "id-mock-fulano",
    creatorName:"Fulano"
  }
}

const commentDBMock: CommentsDB[] = [
  {
    id: "id-mock",
    creator_id: "id-mock-fulano",
    post_id: "id-mock",
    content: "Conteudo do comment Mock",
    likes: 0,
    dislikes: 0,
    created_at: expect.any(String),
    updated_at: expect.any(String),
  },
];
const commentDBAndCreatorMock: CommentsDBAndCreator[] = [
  {
    id: "id-mock",
    creator_id: "id-mock-fulano",
    post_id: "id-mock",
    content: "Conteudo do comment Mock",
    likes: 0,
    dislikes: 0,
    created_at: expect.any(String),
    updated_at: expect.any(String),
    creator_name: "Fulano",
  },
];


const CommentModelByPostMock:CommentModelByPost = {
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


export class CommentDatabaseMock extends BaseDatabase {
  public getAllComment = async (
    id: string
  ): Promise<CommentsDB[] | undefined> => {
    const output: CommentsDB[] | undefined = commentDBMock;

    return output;
  };

  public findCommentsForCreator = async (
    id: string
  ): Promise<CommentsDBAndCreator[]> => {
    const output: CommentsDBAndCreator[] = commentDBAndCreatorMock;

    return output;
  };

  public insertComment = async (newComment: CommentsDB): Promise<void> => {};

  public updateComment = async (updateComment: CommentsDB): Promise<void> => {};

  public findComment = async (
    id: string
  ): Promise<CommentsDBAndCreator | undefined> => {
    const [output] = commentDBAndCreatorMock;

    return output;
  };

  public findCommentLikeDisliked = async (
    likeDislikeExist: likeOrDislikeComment
  ): Promise<COMMENT_LIKE | undefined> => {
    const [output]: Array<likeOrDislikeComment | undefined> = [
      {
        user_id: "id-mock-fulano",
        comments_id: "id-mock",
        like: 0,
      },
    ];

    if (output === undefined) {
      return undefined;
    } else if (output.like === 1) {
      return COMMENT_LIKE.ALREADY_LIKED;
    } else {
      return COMMENT_LIKE.ALREADY_DISLIKED;
    }
  };

  public deleteLikeOrDislikeComment = async (
    likeDislikeExist: likeOrDislikeComment
  ): Promise<void> => {};

  public updateLikeOrDislikeComment = async (
    likeDislikeExist: likeOrDislikeComment
  ): Promise<void> => {};

  public insertLikeDislikeComment = async (
    likeDislikeExist: likeOrDislikeComment
  ): Promise<void> => {};
}

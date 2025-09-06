import { createContext,useReducer} from "react";


export const PostList=createContext({
  postList:[],
  addPost:()=>{},
  deletePost:()=>{},
});  


const postListReducer=(currPostList,action)=>{
  let newPostList=currPostList;
  if(action.type=='DELETE_POST'){
    newPostList=currPostList.filter((post)=>post.id!==action.payload.postID);

  }
  else if(action.type=='ADD_POST'){
            newPostList=[action.payload,...currPostList]
         }
  return newPostList;
}

const PostListProvider=({children})=>{
     const[postList,dispatchPostList]=useReducer(postListReducer,DEFAULT_POST_LIST);

     const deletePost=(postID)=>{
      dispatchPostList({
        type:'DELETE_POST',
        payload:{
          postID,

        },
      });

     };
     
     const addPost=(userId,postTitle,postBody,reactions,tags)=>{
      dispatchPostList({
        type:'ADD_POST',
        payload:{
  id:Date.now(),
  title:postTitle,
  body:postBody,
  reactions:reactions,
  userID:userId,
  tags:tags,
  },
      });
      

     }

  return(
    <PostList.Provider value={
      {postList,addPost,deletePost,}
    }>
      {children}
    </PostList.Provider>

  );

};

const DEFAULT_POST_LIST=[
  {
  id:'1',
  title:'Going to London',
  body:'hy I am Going for a trip to London',
  reactions:2,
  userID:'user-9',
  tags:['#vacation','#London','#photography'],
  },
  {
  id:'2',
  title:'Graduated',
  body:'finally made it hard to believe time goes fast',
  reactions:20,
  userID:'user-12',
  tags:['#clg-life','#Graduated','#Btech'],
  },

];


export default PostListProvider;
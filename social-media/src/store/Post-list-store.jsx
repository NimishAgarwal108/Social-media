import { createContext,useReducer,useState,useEffect} from "react";


export const PostList=createContext({
  postList:[],
  addPost:()=>{},
  deletePost:()=>{},
  fetching:false,
});  


const postListReducer=(currPostList,action)=>{
  let newPostList=currPostList;
  if(action.type=='DELETE_POST'){
    newPostList=currPostList.filter((post)=>post.id!==action.payload.postID);

  }
  else if(action.type=='ADD_INITIAL_POSTS'){
    newPostList=action.payload.posts;
             
  }
  else if(action.type=='ADD_POST'){
            newPostList=[action.payload,...currPostList]
                                  }
  return newPostList;
}

const PostListProvider=({children})=>{
     const[postList,dispatchPostList]=useReducer(postListReducer,[]);
     const [fetching,setFetching]=useState(false);




     const deletePost=(postID)=>{
      dispatchPostList({
        type:'DELETE_POST',
        payload:{
          postID,

        },
      });

     };
     
     const addPost=(post)=>{
      dispatchPostList({
        type:'ADD_POST',
        payload:post,
      });  
     };

     const addInitialPosts=(posts)=>{
      dispatchPostList({
        type:'ADD_INITIAL_POSTS',
        payload:{
                posts,
               },
      });
     }

      useEffect(()=>{
          setFetching(true);
          const controller=new AbortController();
          fetch('https://dummyjson.com/posts', { signal: controller.signal })
          .then(res => res.json())
          .then(data=>{
            addInitialPosts(data.posts);
            setFetching(false);
                })

          .catch((error) => {
        if (error.name === "AbortError") {
          // ignore fetch aborts
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching posts:", error);
          setFetching(false);
        }
      });

          return ()=>{
            controller.abort();
          };

          },[]);



     

  return(
    <PostList.Provider value={
      {postList,addPost,deletePost,fetching}
    }>
      {children}
    </PostList.Provider>

  );

};

// const DEFAULT_POST_LIST=[
//   {
//   id:'1',
//   title:'Going to London',
//   body:'hy I am Going for a trip to London',
//   reactions:2,
//   userID:'user-9',
//   tags:['#vacation','#London','#photography'],
//   },
//   {
//   id:'2',
//   title:'Graduated',
//   body:'finally made it hard to believe time goes fast',
//   reactions:20,
//   userID:'user-12',
//   tags:['#clg-life','#Graduated','#Btech'],
//   },

// ];


export default PostListProvider;
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./routes/App.jsx";
import CreatePost from "./components/CreatePost.jsx";
import PostList  from "./components/PostList.jsx";

const router=createBrowserRouter([
  {path:"/",element:<App/>,children:
    [{path:"/",element:<PostList/>},//u can add a loader
  {path:"/create-post",element:<CreatePost/>}],//u can add a action
    },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

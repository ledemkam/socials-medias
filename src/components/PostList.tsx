import { ReactElement } from "react"
import { useGetPost } from "../service/queries";
import PostItem from "./PostItem";


const PostList = ():ReactElement => {

    const{data:posts} = useGetPost()

   

    console.log(posts);
    
    
  return (
    <div className="flex flex-wrap justify-center">
      { posts?.map((post) =>(
       
         <PostItem key={post.id} post={post}/>
       
      ))}
    </div>
  )
}
export default PostList
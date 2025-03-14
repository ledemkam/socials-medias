import { Post, PostInput } from "../types";
import { supabase } from "./superbase-client";


// CREATE POST
export const createPost = async (post: PostInput,imageFile : File) => {

    const filePath = `${post.title}-${Date.now()}-${imageFile.name}`

    const {error: uploadError} = await supabase.storage.from('post-images').upload(filePath,imageFile);

    if(uploadError) throw new Error(uploadError.message);

      const {data: publicURLData} = supabase.storage.from("post-images").getPublicUrl(filePath)
     
    const {data, error} = await supabase.from("posts").insert({...post, image_url: publicURLData.publicUrl})

    if(error) throw new Error(error.message);
    return data;
}

// GET POST

export const fetchtPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
       .from("posts")
       .select("*")
       .order("created_at", { ascending: false });
   if(error) throw new Error(error.message);
   return data as Post[];
};




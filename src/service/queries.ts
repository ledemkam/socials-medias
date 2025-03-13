import { useMutation, useQuery} from "@tanstack/react-query";
import { createPost, fetchtPosts} from "./api";
import { Post, PostInput } from "../types";

export const useCreatePost = () => {
    return useMutation ({
        mutationFn: ({ post, imageFile }: { post: PostInput; imageFile: File }) => createPost(post, imageFile)
    })
}


export const useGetPost = () => {
    return useQuery<Post[], Error>({
        queryKey: ["posts"],
        queryFn: fetchtPosts
    })
}



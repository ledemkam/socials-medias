import { useMutation } from "@tanstack/react-query";
import { createPost } from "./api";
import { PostInput } from "../types";


export const useCreatePost = () => {
    return useMutation ({
        mutationFn: ({ post, imageFile }: { post: PostInput; imageFile: File }) => createPost(post, imageFile)
    })
}
import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { useCreatePost } from '../service/queries';

const CreatePost = (): ReactElement => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null)


  const {mutateAsync: createPost,isPending: postLoading,isError: postError}= useCreatePost();


  const handleSubmit = async(event: FormEvent) =>{
    event.preventDefault();
    try {
        await createPost({
            post: {
                title,
                content,
            },
            imageFile: selectedImage as File
        })
        setTitle('')
        setContent('')
    } catch (error) {
        console.log(error)
      }
    }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      setSelectedImage(e.target.files[0])

    }

  }
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
    <div>
      <label htmlFor="title" className="block mb-2 font-medium">
        Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-white/10 bg-transparent p-2 rounded"
        required
      />
    </div>
    <div>
      <label htmlFor="content" className="block mb-2 font-medium">
        Content
      </label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border border-white/10 bg-transparent p-2 rounded"
        rows={5}
        required
      />
    </div>

    <div>
      <label htmlFor="image" className="block mb-2 font-medium">
        Upload Image
      </label>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full text-gray-200"
      />
    </div>
    <button
      type="submit"
      className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
    >
      {postLoading? "Creating..." : "Create Post"}
    </button>

    {postError && <p className="text-red-500"> Error creating post.</p>}
  </form>
  );
};
export default CreatePost;

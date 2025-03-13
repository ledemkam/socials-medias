import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { CommunityPage, ComunitiesPage, CreateCommunutyPage, CreatePostPage, PostPage } from "./pages";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100 transition-opacity duration-700 pt-20">
        <Navbar />
        <div className="container mx-auto px-4">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/community/create" element={<CreateCommunutyPage />} />
            <Route path="/communities" element={<ComunitiesPage />} />
            <Route path="/community/:id" element={<CommunityPage />} />
            <Route path="/post/:id" element={<PostPage />} />
         </Routes>
        </div>
    </div>
  )
}
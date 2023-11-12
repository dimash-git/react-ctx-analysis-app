import Navbar from "../../components/navbar";
import PostAddForm from "../../components/post/post-add-form";
import PostSearchBar from "../../components/post/post-search-bar";
import Posts from "../../components/post/posts";
import { PostProvider } from "../../providers/PostsProvider";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <PostProvider>
        <div className="dashboard-wrapper">
          <PostAddForm />
          <PostSearchBar />

          <Posts />
        </div>
      </PostProvider>
    </>
  );
};

export default Dashboard;

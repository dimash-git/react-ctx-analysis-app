import usePosts from "../../hooks/usePosts";
import Post from "./post";

const Posts = () => {
  const { posts, isLoading } = usePosts();

  return (
    <div className="posts">
      {isLoading ? (
        <div>Загрузка записей</div>
      ) : (
        <>
          {posts.length > 0 ? (
            posts.map((post, idx) => <Post key={idx} post={post} />)
          ) : (
            <div>Записей нету</div>
          )}
        </>
      )}
    </div>
  );
};

export default Posts;

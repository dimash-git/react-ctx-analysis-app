import { useContext, useState } from "react";
import DotsIcon from "../../assets/icons/three-dots.svg?react";
import { formatDate } from "../../utils/date";
import DropdownMenu from "../dropdown-menu";
import apiClient from "../../utils/apiClient";
import usePosts from "../../hooks/usePosts";
import PostEditForm from "./post-edit-form";
import { PostContext } from "../../providers/PostsProvider";

const triggerStyles = {
  borderRadius: "50px",
  padding: ".4rem",
};

const Post = ({ post }) => {
  const [isChanging, setIsChanging] = useState(false);
  const { setPosts } = usePosts();
  const { search } = useContext(PostContext);

  const handleDelete = async (postId) => {
    await apiClient.delete("/posts/" + postId);
    setPosts((prev) =>
      prev.filter((anotherPost) => anotherPost.id !== post.id)
    );
  };

  return (
    <div className="post-card">
      <div className="header">
        <div>
          {isChanging ? (
            <PostEditForm
              setPosts={setPosts}
              setIsChanging={setIsChanging}
              post={post}
            />
          ) : (
            <>
              <h2 className="title">{post.title}</h2>
              <p className="date">{post.date && formatDate(post.date)}</p>
            </>
          )}
        </div>
        <div className="action-icon">
          <DropdownMenu
            triggerContent={<DotsIcon width={14} height={14} />}
            triggerStyles={triggerStyles}
          >
            <div
              className="dropdown-item sm"
              onClick={() => setIsChanging((prev) => !prev)}
            >
              Изменить
            </div>
            <div
              className="dropdown-item sm"
              onClick={() => handleDelete(post.id)}
            >
              Удалить
            </div>
          </DropdownMenu>
        </div>
      </div>
      {!isChanging && (
        <p className="description">
          {post?.description &&
            post.description.split(" ").map((word) => (
              <>
                <span
                  style={
                    word.includes(search) && search.length > 2
                      ? { backgroundColor: "yellow" }
                      : {}
                  }
                >
                  {word}
                </span>
                <i>&nbsp;</i>
              </>
            ))}
        </p>
      )}
    </div>
  );
};

export default Post;

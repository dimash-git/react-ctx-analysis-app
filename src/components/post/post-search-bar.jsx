import { useContext } from "react";
import { PostContext } from "../../providers/PostsProvider";

const PostSearchBar = () => {
  const { search, setSearch } = useContext(PostContext);
  return (
    <div>
      <input
        type="text"
        placeholder="Поиск ключевых слов"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default PostSearchBar;

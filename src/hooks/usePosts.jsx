import { useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { PostContext } from "../providers/PostsProvider";

const usePosts = () => {
  const { posts, setPosts } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get("/posts", {
          params: {
            skip: 0,
            limit: 100,
          },
        });
        const { data } = response;
        console.log(data);

        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!posts) {
      getPosts();
    } else {
      setIsLoading(false);
    }
  }, [posts, setPosts]);

  return { posts, setPosts, isLoading };
};

export default usePosts;

import { createContext, useState } from "react";

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState();
  const [search, setSearch] = useState("");

  return (
    <PostContext.Provider value={{ posts, setPosts, search, setSearch }}>
      {children}
    </PostContext.Provider>
  );
};

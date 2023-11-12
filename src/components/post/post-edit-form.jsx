import { useState } from "react";
import apiClient from "../../utils/apiClient";

const PostEditForm = ({ setPosts, setIsChanging, post }) => {
  const [formData, setFormData] = useState({
    title: post?.title ?? "",
    description: post?.description ?? "",
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put("/posts/" + post.id, formData);

      if (response.status !== 200) {
        throw new Error("Editing Post failed.");
      }

      const { data } = response;
      const updatedPost = data;
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));
      setIsChanging(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleEdit}>
      <div className="input-wrapper">
        <label htmlFor="title">
          Название
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-wrapper">
        <label htmlFor="description">
          Описание
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="edit-footer-btns">
        <button type="submit">Сохранить</button>
        <button type="button" onClick={() => setIsChanging(false)}>
          Отменить
        </button>
      </div>
    </form>
  );
};

export default PostEditForm;

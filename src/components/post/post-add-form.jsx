import { useState } from "react";
import PlusIcon from "../../assets/icons/plus.svg?react";
import MinusIcon from "../../assets/icons/minus.svg?react";
import apiClient from "../../utils/apiClient";
import usePosts from "../../hooks/usePosts";

const PostAddForm = () => {
  const { setPosts } = usePosts();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/posts", formData);

      if (response.status !== 201) {
        throw new Error("Adding new Post failed.");
      }

      const { data } = response;
      setPosts((prev) => [...prev, data]);
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <h2 className="text-center flex justify-center align-center">
        Заметки
        <span className="post-form-toggle-icon" onClick={toggleFormVisibility}>
          {isFormVisible ? (
            <MinusIcon width={16} height={16} />
          ) : (
            <PlusIcon width={16} height={16} />
          )}
        </span>
      </h2>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="post-form">
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
          <button type="submit" className="btn btn-primary">
            Создать
          </button>
        </form>
      )}
    </>
  );
};

export default PostAddForm;

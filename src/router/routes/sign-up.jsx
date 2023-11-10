import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, passwordConfirm } = formData;

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/register",
        {
          name,
          email,
          password,
          password_confirm: passwordConfirm,
        }
      );

      if (response.status !== 201) {
        throw new Error("Credentials are not valid");
      }

      setIsUserCreated(true);
    } catch (error) {
      console.error(error);
      const { response } = error;
      const { status, data } = response;

      if (status === 422) {
        setError("Passwords do not match");
      } else {
        setError(data?.detail);
      }
    }
  };

  return (
    <div className="auth-form-wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Регистрация</h2>
        {isUserCreated ? (
          <div className="auth-success-message">
            <span>Регистрация прошла успешно!</span>
            <Link to="/sign-in">Перейти к авторизации</Link>
          </div>
        ) : (
          <div>
            <label className="input-wrapper">
              Имя
              <input
                name="name"
                type="text"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className="input-wrapper">
              Email адрес
              <input
                name="email"
                type="email"
                placeholder="Почта"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label className="input-wrapper">
              Пароль
              <input
                name="password"
                type="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <label className="input-wrapper">
              Повторите пароль
              <input
                name="passwordConfirm"
                type="password"
                placeholder="Пароль"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </label>
            {error && <span className="auth-error-message">{error}</span>}
            <button type="submit" className="auth-button">
              Регистрация
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;

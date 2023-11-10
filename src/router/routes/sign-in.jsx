import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        throw new Error("Credentials are not valid");
      }

      const { data } = response;
      console.log(data?.message);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Авторизация</h2>
        <label className="input-wrapper">
          Email адрес
          <input ref={emailRef} type="email" placeholder="Почта" />
        </label>
        <label className="input-wrapper">
          Пароль
          <input ref={passwordRef} type="password" placeholder="Пароль" />
        </label>
        <button type="submit" className="auth-button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default SignIn;

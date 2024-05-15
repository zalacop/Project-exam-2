import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginUser from "../../components/API/Auth/Login";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submitForm(event) {
    event.preventDefault();

    try {
      const userData = await LoginUser(email, password);
      console.log(userData);
      localStorage.setItem("accessToken", userData.data.accessToken);
      // localStorage.setItem("manager", userData.venueManager);

      navigate("/profile", { state: { refresh: true } });
    } catch (error) {
      setError("Invalid email or password!");
      console.log(error);
    }
  }

  return (
    <>
      <form
        className="form mx-auto my-5 flex flex-col items-center justify-center gap-2 border border-dark py-5"
        onSubmit={submitForm}
      >
        <h2>Log in</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="register_input mb-3">
          <label htmlFor="email" className="mb-2 text-lg">
            Email
          </label>
          <input
            type="email"
            id="login_email"
            className="form-control"
            autoComplete="off"
            placeholder=""
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register_input mb-3">
          <label htmlFor="password" className="mb-2 text-lg">
            Password
          </label>
          <input
            type="password"
            id="login_password"
            className="form-control"
            minLength="8"
            autoComplete="off"
            placeholder=""
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          to="/profile"
          className="btn btn-outline-dark cta px-5 py-1 text-lg"
          onClick={submitForm}
        >
          Log in
        </button>
        <div className="new-account m-3 flex items-center gap-2">
          <p className="text-base">New?</p>
          <Link to="/register" className="text-blue-500 text-lg">
            Create An Account
          </Link>
        </div>
      </form>
    </>
  );
}

export default Login;

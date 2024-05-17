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
      localStorage.setItem("accessToken", userData.data.accessToken);
      localStorage.setItem("name", userData.data.name);

      navigate("/profile", { state: { refresh: true } });
    } catch (error) {
      setError("Invalid email or password!");
      console.log(error);
    }
  }

  return (
    <div className="mx-auto my-20 flex pt-20">
      <form
        className="mx-auto flex w-1/2 flex-col justify-center gap-3 border bg-background py-20 shadow-md"
        onSubmit={submitForm}
      >
        <h2 className="my-5 flex justify-center text-2xl font-bold">Log in</h2>

        {error && <p className="mx-auto text-xl text-orange">{error}</p>}

        {/* Email */}
        <div className="mx-auto mb-4 w-1/2">
          <label htmlFor="login_email" className="mb-2 block text-lg">
            Email
          </label>
          <input
            type="email"
            id="login_email"
            className="form-input h-8 w-full
            border pl-4 focus:outline-none"
            autoComplete="off"
            placeholder=""
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mx-auto mb-4 w-1/2">
          <label htmlFor="login_password" className="mb-2 block text-lg">
            Password
          </label>
          <input
            type="password"
            id="login_password"
            className="form-input h-8 w-full
            border pl-4 focus:outline-none"
            minLength="8"
            autoComplete="off"
            placeholder=""
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={submitForm}
          to="/profile"
          className="mx-auto border px-8 py-1 font-bold"
        >
          Log in
        </button>
        <div className="new-account m-3 mx-auto flex items-center gap-2">
          <p className="text-base">New?</p>
          <Link to="/register" className="text-lg underline">
            Create An Account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

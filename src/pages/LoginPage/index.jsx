import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginUser from '../../components/API/Auth/Login';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function submitForm(event) {
        event.preventDefault();
    
        try {
            const userData = await LoginUser(email, password);
            console.log(userData)
            localStorage.setItem("accessToken", userData.data.accessToken);
            
            navigate("/profile", { state: { refresh: true } });
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    }

    return (
        <>
            <form className="flex flex-col justify-center items-center gap-2 mx-auto py-5 border border-dark my-5 form" onSubmit={submitForm}>
                <h2>Log in</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-3 register_input">
                    <label htmlFor="email" className="mb-2 text-lg">Email</label>
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
                <div className="mb-3 register_input">
                    <label htmlFor="password" className="mb-2 text-lg">Password</label>
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
                <button to="/profile" className="btn btn-outline-dark px-5 py-1 text-lg cta" onClick={submitForm}>Log in</button>
                <div className="flex items-center gap-2 new-account m-3">
                    <p className="text-base">New?</p>
                    <Link to="/register" className="text-lg text-blue-500">Create An Account</Link>
                </div>
            </form>
        </>
    );
}

export default Login;



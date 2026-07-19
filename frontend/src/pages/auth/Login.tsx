import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import { setToken } from "../../utils/token";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {

    try {

      const data = await loginUser(
        email,
        password
      );

      console.log("Login successful:", data);

      setToken(data.access_token);

console.log(
  "Token saved:",
  localStorage.getItem("access_token")
);

window.location.href = "/dashboard";

    } catch(error) {

      console.error("Login failed:", error);

    }

  };


  return (
    <div>

      <h1>Login</h1>


      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


      <button onClick={handleLogin}>
        Login
      </button>


    </div>
  );
}


export default Login;
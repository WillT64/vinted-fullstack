import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles/auth.scss";

const Register = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //TODO
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email,
          username,
          password,
          newsletter,
        }
      );
      console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log("catchErrorRegister", error);
    }
  };

  return (
    <div className="auth--form">
      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label htmlFor="username">Username</label>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label htmlFor="newsletter">S'abonner à la newsletter ?</label>
          <input
            type="checkbox"
            name="newsletter"
            value={newsletter}
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};
export default Register;

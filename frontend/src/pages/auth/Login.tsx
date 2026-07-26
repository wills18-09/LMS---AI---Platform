import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/auth.service";
import { setToken } from "../../utils/token";
import { loginSuccess } from "../../store/authSlice";
import api from "../../services/axios";

import "../../styles/Login.css";


function Login() {


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [error,setError] = useState("");

  const [loading,setLoading] = useState(false);



  const dispatch = useDispatch();

  const navigate = useNavigate();




  const handleLogin = async()=>{


    try{


      setLoading(true);
      setError("");



      const data = await loginUser(
        email,
        password
      );



      setToken(
        data.access_token
      );



      const userResponse =
        await api.get("/auth/me");



      const user =
        userResponse.data;



      dispatch(

        loginSuccess({

          user,

          token:data.access_token

        })

      );




      if(user.role==="instructor"){

        navigate(
          "/instructor/dashboard"
        );

      }
      else if(user.role==="student"){

        navigate(
          "/dashboard"
        );

      }
      else{

        navigate(
          "/dashboard"
        );

      }



    }
    catch(error:any){


      console.error(error);


      setError(
        "Invalid email or password"
      );


    }
    finally{

      setLoading(false);

    }


  };





  return (


    <div className="login-page">


      <div className="login-card">


        <div className="logo">

          🎓

        </div>



        <h1>

          LearnAI LMS

        </h1>



        <p className="subtitle">

          Login to continue your learning journey

        </p>




        {
          error && (

            <div className="error">

              {error}

            </div>

          )
        }





        <input

          type="email"

          placeholder="Email address"

          value={email}

          onChange={
            e=>setEmail(e.target.value)
          }

        />





        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={
            e=>setPassword(e.target.value)
          }

        />






        <button
          onClick={handleLogin}
          disabled={loading}
        >


          {
            loading
            ?
            "Logging in..."
            :
            "Login"
          }


        </button>




        <p className="footer-text">

          AI powered learning platform 🚀

        </p>



      </div>


    </div>


  );

}


export default Login;
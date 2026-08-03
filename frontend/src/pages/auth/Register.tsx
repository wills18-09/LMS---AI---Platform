import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/auth.service";

import "../../styles/Login.css";


function Register() {


    const [full_name,setFullName] = useState("");

    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);


    const navigate = useNavigate();




    const handleRegister = async()=>{


        try{


            setLoading(true);

            setError("");



            await registerUser(
                full_name,
                email,
                password
            );



            navigate("/login");


        }
        catch(error:any){


            console.error(error);


            setError(
                "Registration failed"
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

                    Create Account

                </h1>




                <p className="subtitle">

                    Join LearnAI LMS

                </p>





                {
                    error && (

                        <div className="error">

                            {error}

                        </div>

                    )
                }







                <input

                    type="text"

                    placeholder="Full Name"

                    value={full_name}

                    onChange={
                        e=>setFullName(e.target.value)
                    }

                />







                <input

                    type="email"

                    placeholder="Email"

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

                    onClick={handleRegister}

                    disabled={loading}

                >


                    {

                        loading

                        ?

                        "Creating account..."

                        :

                        "Register"

                    }


                </button>







                <p className="footer-text">


                    Already have an account?{" "}


                    <span

                        onClick={()=>navigate("/login")}

                        style={{
                            cursor:"pointer",
                            color:"#818cf8"
                        }}

                    >

                        Login

                    </span>


                </p>





            </div>


        </div>


    );


}


export default Register;
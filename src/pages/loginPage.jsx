import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin({
        onSuccess: (response)=>{
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/google-login",{
                token : response.access_token
            }).then(
                (response)=>{
                    console.log(response.data)
                    localStorage.setItem("token",response.data.token)
                    toast.success("Login successful")
                    if(response.data.role == "admin"){
                        navigate("/admin")
                    }else if(response.data.role == "user"){
                        navigate("/")
                    }
                }
            ).catch(
                ()=>{
                    toast.error("google login failed")
                }
            )
        }
    })

    function login(){
        console.log(email, password)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token",response.data.token)

                // const token = localStorage.getItem("token")
                toast.success("login successful")
                if(response.data.role == "admin"){

                    //window.location.href = "/admin"
                    navigate("/admin")

                }else if(response.data.role == "user"){

                    //window.location.href = "/"
                    navigate("/")

                }
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Login Failed")
            }
        )
    }

	return (
		<div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-center items-center">
			<div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl rounded-[30px] relative gap-[20px] text-white flex flex-col items-center justify-center">
				<h1 className="absolute top-[20px] text-2xl font-bold text-center my-5">Login</h1>
                <div className="w-[350px]  flex flex-col    ">
                    <span className="text-lg ">Email</span>
                    <input 
                        onChange={
                            (e)=>{
                                setEmail(e.target.value)
                            }
                        }
                    type="text" className="w-[350px] h-[40px] border border-white rounded-xl"/>
                </div>
                <div className="w-[350px]  flex flex-col    ">
                    <span className="text-lg ">Password</span>

                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    } type="password" className="w-[350px] h-[40px] border border-white rounded-xl"/>

                </div>
                <button onClick={login} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
                    Login
                </button>
                <button onClick={googleLogin} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
                    Google Login
                </button>
                <p>Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link> from here</p>
                <p>Forget Password? <Link to="/forget" className="text-blue-500">reset password</Link> from here</p>
                
			</div>
		</div>
	);
}

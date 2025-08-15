import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
	const [emailSent, setEmailSent] = useState(false);
	const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function sendOTP(){
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/send-otp", { email:email });
            toast.success("OTP sent successfully");
            setEmailSent(true);
        }catch{
            toast.error("Failed to send OTP");
        }
    }
    async function resetPassword(){
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/reset-password", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password reset successfully");
        }catch{
            toast.error("Failed to reset password");
        }
    }
	return (
		<div className="w-full h-full flex justify-center items-center text-secondary">
			{!emailSent&&<div className="bg-primary w-[500px] h-[500px] shadow-2xl flex flex-col items-center justify-center gap-[20px] rounded-[30px]">
				<h1 className="text-2xl font-bold">Reset Password</h1>
				<input
					type="email"
					placeholder="Enter your email"
					className="w-[350px] h-[40px] border border-white rounded-xl text-center"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button onClick={sendOTP} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
					Send OTP
				</button>
			</div>}
            {
                emailSent&& <div className="bg-primary w-[500px] h-[500px] shadow-2xl flex flex-col items-center justify-center gap-[20px] rounded-[30px]">
                    <h1 className="text-2xl font-bold">Verify OTP</h1>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={resetPassword} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
                        Reset Password
                    </button>
                </div>
            }
		</div>
	);
}

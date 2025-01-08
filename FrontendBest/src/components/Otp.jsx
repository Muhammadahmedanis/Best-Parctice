import axios from 'axios';
import React, { useActionState, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Otp = () => {
    const navigate = useNavigate()
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const[disable, setDisable] = useState(false);

  const[user, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const otpNum = otp.join('');
    console.log(otpNum);
    try {
        let res = await axios.post("/api/v1/auth/verifyEmail", otpNum);
        toast.success("OTP verified successfully")
        console.log(res);
        navigate("/signin");
    } catch (error) {
        toast.error("OTP is invalid")
    }
    setOtp(["", "", "", "","",""])
})

  const handleChange = (e, index) => {
    const value = e.target.value;
    // if (/[^0-9]/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      // Move focus to the next input when a digit is entered
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    index == 5 && setDisable(true)
};

const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
        // Move focus to the previous input when backspace is pressed and the current input is empty
        if (index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
        <p className="text-[16px] text-slate-500">
          Enter the 4-digit verification code that was sent to your email.
        </p>
      </header>
      <form action={submitAction} id="otp-form">
        <div className="flex items-center justify-center gap-3">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              name='otp'
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              inputMode="numeric"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type='submit'
            disabled={isPending}  
            className={`w-full inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-lg ${!disable ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'} px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150`}>
                <div className='text-[17px]'> Verify Otp</div>
                { isPending && <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> } 
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{' '}
        <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0"> Resend </a>
      </div>
    </div>
    </div>
  );
};

export default Otp;

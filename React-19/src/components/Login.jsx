import React, { useActionState, useState } from 'react';
import SubmitButton from './Button';

function Login() {
    // const[userName, setUserName] = useState("");
    // const[password, setPassword] = useState("");
    // const [user, submitAction, isPending] = useActionState(handleSubmit, {
    //     error: null,
    //     data: null,
    // })
    // const[user, setUser] = useState(null);
    // const[error, setError] = useState(null);
    // const[isPending, setIsPending] = useState(false);

    // const handleSubmit = async(prevState, formData) => {
    //     // e.preventDefault();
    //     // setIsPending(true);
    //     // setUser(null);
    //     // setError(null);
    //     const username = formData.get("userName");
    //     const pass = formData.get("password");


    //     try {
    //         console.log(username, pass);
    //         // const response = await Login();
    //         // return {data: response.data, error: null}
    //     } catch (error) {
    //         // return {data: null, error: error}
    //         // setError(error)
    //     }finally{
    //         // setIsPending(false);
    //     }
    // }


    const [user, submitAction, isPending] = useActionState(login, {
        error: null,
        data: null,
    });
    async function login(previousState, formData) {
        const username = formData.get("userName");
        const pass = formData.get("password");

        try {
            console.log(username, pass);
            // const response = await Login();
            // return {data: response.data, error: null}
        } catch (error) {
            // return {...previousState, error: error}
        }
    }
  return (
    // <form onSubmit={handleSubmit}>
    //     <div>
    //         <label htmlFor="">username</label>
    //         <input type="text"
    //         //  value={userName} onChange={(e) => setUserName(e.target.value)} 
    //          required/>
    //     </div>
    //     <div>
    //         <label htmlFor="">Password</label>
    //         <input type="text" 
    //         // value={password} onChange={(e) => setPassword(e.target.value)} 
    //         required/>
    //     </div>
    //     <button type='submit' >
    //         {isPending ? "Logging in ..." : "Login"}
    //     </button>
    //     {userName === "ali" ? <p>Loggd in: {userName}</p> : <p>{error}</p>}
    //     {/* // {error && <p>{error}</p>} */}
    // </form>
    <form action={submitAction}>
        <div>
            <label htmlFor="">username</label>
            <input name='userName' type="text"
             required/>
        </div>
        <div>
            <label htmlFor="">Password</label>
            <input name='password' type="text" 
            required/>
        </div>
        <SubmitButton />
        {!user ? <p>Loggd in: {''}</p> : <p>{"error"}</p>}
    </form>
  )
}

export default Login
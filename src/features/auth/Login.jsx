import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"


const Login = () =>{
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(()=>{
        userRef.current.focus()
    }, [])

    useEffect(()=>{
        setErrMsg('')
    },[username,password])

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const userData = await login({username,password}).unwrap()
            dispatch(setCredentials({...userData, username}))
            setUsername('')
            setPassword('')
            navigate('/welcome')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
            
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <main className="login">
            <div className="logo_container">
                <img src="https://github.com/nnfromthewindow/imagentest/blob/main/assets/img/logoficticio.png?raw=true" alt="Imagen Logo" />
            </div>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <div className="login_inputs_container">
                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="login_container">
                    <div className="login_labels">
                        <label htmlFor="username" >Username:</label>
                        <label htmlFor="password" >Password:</label>
                    </div>
                    <div className="login_inputs">
                        <input type="text"  id="username" ref={userRef} value={username} onChange={handleUserInput} autoComplete="off" required/>
                        <input type="password"  id="pasword" onChange={handlePwdInput} value={password} required/>
                    </div>
                    </div>
                    
                    <button className="loginBtn" type="submit">Login</button>
                </form>
            </div>
        </main>
        )
    return content

}
export default Login
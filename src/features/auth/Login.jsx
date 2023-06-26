import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import { TextField, Button ,InputLabel} from "@mui/material"
import { ColorRing } from "react-loader-spinner"

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

    const content = isLoading ? <div className="spinner">
        <ColorRing
  visible={true}
  height="200"
  width="200"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div>
    
     : (
        <main className="login">
            <div className="logo_container">
                <img src="https://github.com/nnfromthewindow/imagentest/blob/main/assets/img/logoficticio.png?raw=true" alt="Imagen Logo" />
            </div>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <div className="login_inputs_container">
                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="login_container">
                    <div className="login_labels">
                    <InputLabel id="username-label" htmlFor="username" sx={{color:'black', fontFamily:'Dosis',  fontSize:'1.2em'}}>Username:</InputLabel>
                    <InputLabel id="password-label" htmlFor="password" sx={{color:'black', fontFamily:'Dosis', fontSize:'1.2em'}}>Password:</InputLabel>
                    </div>
                    <div className="login_inputs">
                    <TextField autoFocus name="username-input" className="login_textfield" label="Username" variant="filled" type="text" color="secondary" id="username" ref={userRef} value={username} onChange={handleUserInput} autoComplete="off" required/>
                    <TextField name="password-input" className="login_textfield"  label="Password" variant="filled" type="password" color="secondary" id="password" onChange={handlePwdInput} value={password} required/>
                        
                    </div>
                    </div>
                    <div className="loginBtn_container">
                    <Button className="loginBtn" variant="contained" type="submit" color="success">Login</Button>
                    </div>
                  
                </form>
            </div>
        </main>
        )
    return content

}
export default Login
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import  TextField from "@mui/material/TextField"
import  Button  from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import { ColorRing } from "react-loader-spinner"
import usePersist from "../hooks/usePersist"
import useTitle from "../hooks/useTitle"


const Login = () =>{

    useTitle('Roomy - Login')

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
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
    const handleToggle = () => setPersist(prev => !prev)

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
                <h1>Roomy</h1>
            </div>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <div className="login_inputs_container">
                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="login_container">
                    <div className="login_labels">
                    <InputLabel id="username-label" htmlFor="username" sx={{color:'white', fontFamily:'Dosis',  fontSize:'1.2em', textShadow:'2px 2px 8px black'}}>Username:</InputLabel>
                    <InputLabel id="password-label" htmlFor="password" sx={{color:'white', fontFamily:'Dosis', fontSize:'1.2em', textShadow:'2px 2px 8px black'}}>Password:</InputLabel>
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
                <div style={{display:"flex", justifyContent:'center'}}>
                    <label htmlFor="persist" className="trust-device" style={{fontFamily:'Dosis', color:'white'}}>
                            <input
                                type="checkbox"
                                id="persist"
                                onChange={handleToggle}
                                checked={persist}
                            />
                            Trust This Device
                    </label>
                </div>  
            </div>
        </main>
        )
    return content

}
export default Login
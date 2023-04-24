

const Login = () =>{

    const content = (
        <main className="login">
            <div className="logo_container">
                <img src="https://github.com/nnfromthewindow/imagentest/blob/main/assets/img/logoficticio.png?raw=true" alt="Imagen Logo" />
            </div>
            <div className="login_inputs_container">
                <form action="/auth" method="POST">
                    <label htmlFor="username" className="login_label">Username:</label>
                    <input type="text" className="login_input" id="username" required/>
                    <label htmlFor="password" className="login_input">Password:</label>
                    <input type="password" className="login_input" required/>
                    <button className="loginBtn" type="submit">Login</button>
                </form>
            </div>
        </main>
        )
    return content

}
export default Login
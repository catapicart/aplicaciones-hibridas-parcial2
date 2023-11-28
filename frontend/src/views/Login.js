import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Components
import Header from '../components/Header'

const host = 'http://127.0.0.1:3000';

function Login(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const endpoint = `${host}/auth`;

    function handleLogin(e){
        e.preventDefault();
        const data = {
            email,
            password
        }

        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(data)
        }

        fetch(endpoint, config).then(resp => resp.json())
        .then(json =>{
            console.log(json)
            console.log(json.id)
            localStorage.setItem("token", json.token);
            
            let id = json.id;
            localStorage.setItem("user_id", id);
            navigate('/classes/teacher/' + id)
        })
    }

    return(
        <>
            <Header></Header>
            <main>
                <div className="container w-50 mt-5">
                    <h1 className="h4">Iniciando sesión</h1>
                    <form className="container" onSubmit={handleLogin}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Tu correo electrónico</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={ (e)=> setEmail(e.target.value) } aria-describedby="emailHelp" required />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={ (e)=> setPassword(e.target.value) } required/>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Entrar</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login;
import { useState } from "react";
//Components
import Header from '../components/Header'
const host = 'http://127.0.0.1:3000';
function Register(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const endpoint = `${host}/register`;

    function handleRegister(e){
        e.preventDefault();
        const data = {
            username,
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
        })
    }

    return(
        <>
            <Header></Header>
            <main>
                <div className="container w-50 mt-5">
                    <h1 className="h4">Creando una cuenta</h1>
                    <form className="container" onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre de usuario</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={ (e)=> setUsername(e.target.value) } aria-describedby="username" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Tu correo electrónico</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={ (e)=> setEmail(e.target.value) } aria-describedby="emailHelp" required />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={ (e)=> setPassword(e.target.value) } required/>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Crear</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register;
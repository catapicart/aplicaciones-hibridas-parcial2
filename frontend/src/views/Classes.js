import {  useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

//Components
import Header from '../components/Header'
import Class from '../components/Class'


function Classes(){
    const { user_id } = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        if(user_id === 'null'){
            navigate('/login')
        }
    }, [user_id, navigate])
    

    let token = '';
    token = localStorage.getItem('token');

    return(
        <>
            <Header></Header>
            <main>
                <div>
                    <div>
                        <h1 className="ms-4 mt-4 ">My classes</h1>
                        <Link to={'/class/create'} className='btn btn-secondary ms-4 mt-2'>Add +</Link>
                    </div>
                    <div className="row flex-wrap">
                    <Class token={token} user_id={user_id}></Class>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Classes;
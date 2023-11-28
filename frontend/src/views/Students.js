import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

//Components
import Header from '../components/Header'
const host = 'http://127.0.0.1:3000';

function Students(){
    
    const [cards, setCards] = useState(null);

    let user_id = localStorage.getItem("user_id");
    const { class_id } = useParams()
    const navigate = useNavigate();

    let token = '';
    token = localStorage.getItem('token');

    const endpoint = `${host}/students/class/${class_id}`;

    const config = {
        method: 'GET',
        headers: {
          authorization: `bearer ${token}` 
        }
    }
    useEffect(()=>{
        if(user_id === 'null'){
            navigate('/login')
        }else{
            let ignore = false;
            fetch(endpoint, config)
            .then(resp => resp.json())
            .then(json =>{
                if(!ignore){
                    if(json.result === false){
                        setCards()
                    }else{
                        let  array_students = [...json.students];
                        setCards(array_students)
                    }
                } 
                return () => {ignore= true} //para evitar lop
                })
                }
    }, [user_id, navigate])
    



    return(
        <>
            <Header></Header>
            <main>
                <div>
                    <div>
                        <h1 className="ms-4 mt-4 ">My students</h1>
                        <div className="row flex-wrap">{ cards && cards.map((c)=>
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item card-title"><span>Name:</span> {c.name}</li>
                                <li className="list-group-item"><span>Year: </span>{c.year}</li>
                                <li className="list-group-item"><span>Age: </span>{c.age}</li>
                                <li className="my-1"><Link to={'/students/' + c._id} className="btn btn-secondary mx-2 my-1">Details</Link><Link to={'/students/edit/' + c._id} className="btn btn-secondary mx-2 my-1">Edit</Link><Link to={'/students/delete/' + c._id} className="btn btn-danger mx-2 my-1">Delete</Link></li>
                               
                            </ul> 
                        </div> 
                        )}</div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Students;
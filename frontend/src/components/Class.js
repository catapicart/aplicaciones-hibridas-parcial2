import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Components
const host = 'http://127.0.0.1:3000';

function Class({user_id, token}){

    const [cards, setCards] = useState(null);

    const endpoint = `${host}/classes/teacher/${user_id}`;

    const config = {
        method: 'GET',
        headers: {
          authorization: `bearer ${token}` 
        }
    }


    useEffect(()=>{
        let ignore = false;

        fetch(endpoint, config)
        .then(resp => resp.json())
        .then(json =>{
            if(!ignore){
                if(json.result === false){
                    setCards()
                }else{
                    console.log(json.classes)
                    let  array_classes = [...json.classes];
                    setCards(array_classes)
                }           
            } 
        return () => {ignore= true} //para evitar lop
        })
    }, [])
    
    return(
            <>
                {cards && cards.map((c) => 
                <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item card-title"><span>Name:</span> {c.name}</li>
                    <li className="list-group-item"><span>Year: </span>{c.year}</li>
                    <li className="list-group-item"><span>Book: </span>{c.book}</li>
                    <li className="list-group-item"><span>Workbook: </span>{c.workbook}</li>
                    <li className="list-group-item"><span>Novel: </span>{c.novel}</li>
                    <li className="list-group-item"><Link to={'/students/class/' + c._id}>Students </Link></li>
                    <li className="my-1"><Link to={'/student/create/' + c._id} className="btn btn-secondary mx-2 my-1">+ Student</Link><Link to={'/class/edit/' + c._id} className="btn btn-secondary mx-2 my-1">Edit</Link><Link to={'/class/delete/' + c._id} className="btn btn-danger mx-2 my-1">Delete</Link></li>
                </ul> 
                </div>)}
           </>
        
    )
}

export default Class;
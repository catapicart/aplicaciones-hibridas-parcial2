import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";

//Components
import Header from '../components/Header'
const host = 'http://127.0.0.1:3000';

function StudentFile(){
    const { student_id } = useParams()
    const endpointGET = `${host}/student/${student_id}`;
    let token = '';
    token = localStorage.getItem('token');

    const [result, setResult] = useState('');

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [year, setYear] = useState('');
    const [classId, setClassId] = useState('');

    const config = {
        method: 'GET',
        headers: {
          authorization: `bearer ${token}` 
        }
    }

    useEffect(()=>{
        let ignore = false;

        fetch(endpointGET, config)
        .then(resp => resp.json())
        .then(json =>{
            if(!ignore){
                if(json.result === false){
                    setResult(false)
                }else{
                    setResult(true)
                    setName(json.data[0].name)
                    setAge(json.data[0].age)
                    setYear(json.data[0].year)
                    setClassId(json.data[0].class)
                }
            } 

        return () => {ignore= true} //para evitar lop
        })
    }, [])
    
    return(
        <>
            <Header></Header>
            <main>

                <div className="container">
                    <h1 className="ms-4 mt-4 ">Student File</h1>
                    
                    {
                        result ? <div className="card">
                                    <ul className="list-group list-group-flush">
                                    <li className="list-group-item card-title"><span>Name:</span> {name && name}</li>
                                    <li className="list-group-item"><span>Age: </span>{age && age}</li>
                                    <li className="list-group-item"><span>Year: </span>{year && year}</li>
                                    <li className="list-group-item"><Link to={'/student/report/' + student_id}>Reports </Link></li>
                                    <li className="list-group-item"><Link to={'/students/report/' + student_id} className="btn btn-secondary mx-2 my-1">Add report</Link></li>
                                    </ul>  
                                </div>
                        : ''
                    }
                    
               
                </div>
            </main>
        </>
    )
}

export default StudentFile;
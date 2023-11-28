import { useState, useEffect} from "react";
import { useNavigate, useParams  } from "react-router-dom";
//Components
import Header from '../components/Header'
const host = 'http://127.0.0.1:3000';

function DeleteStudent(){

    const { student_id } = useParams()
    let user_id = localStorage.getItem("user_id");
    let token = '';
    token = localStorage.getItem('token');
    
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [year, setYear] = useState('');
    const [classId, setClassId] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const endpointGET = `${host}/student/${student_id}`;
    const endpointDELETE = `${host}/student/delete/${student_id}`;
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
                setName(json.data[0].name)
                setAge(json.data[0].age)
                setYear(json.data[0].year)
                setClassId(json.data[0].class)
            } 
        return () => {ignore= true} //para evitar lop
        })
    }, [])

    function handleDeleteStudent(e){
       
    
        const config = {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8', authorization: `bearer ${token}` }
        }

        fetch(endpointDELETE, config).then(resp => resp.json())
        .then(json =>{
            console.log(json)
            navigate('/classes/teacher/' + user_id)
        }).catch(error => setErrorMsg(<div><p>An error has occurred. Please, try again later</p></div>))
    }

    return(
        <>
            <Header></Header>
            <main>
                <div className=" mt-5 card p-3">
                    <p className="fw-medium card-title">Deleting student file</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item "><span>Name:</span> {name}</li>
                        <li className="list-group-item"><span>Age: </span>{age}</li>
                        <li className="list-group-item"><span>Year: </span>{year}</li>
                    </ul>
                    <button onClick={()=>handleDeleteStudent()}className="btn btn-danger w-50 mt-3">Confirm</button>
                </div>
            </main>
        </>
    )
}

export default DeleteStudent;
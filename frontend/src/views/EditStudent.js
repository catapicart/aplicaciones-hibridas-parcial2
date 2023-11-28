import { useState, useEffect} from "react";
import { useNavigate, useParams  } from "react-router-dom";
//Components
import Header from '../components/Header'
const host = 'http://127.0.0.1:3000';

function EditStudent(){

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
    const endpointPUT = `${host}/student/edit/${student_id}`;
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


    function handleEditStudent(e){
           
        e.preventDefault();
        const data = {
            name,
            age,
            year,
            class: classId
        }

        const config = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8', authorization: `bearer ${token}` },
            body: JSON.stringify(data)
        }

        fetch(endpointPUT, config).then(resp => resp.json())
        .then(json =>{
            console.log(json)
            navigate('/classes/teacher/' + user_id)
        }).catch(error => setErrorMsg(<div><p>An error has ocurred. Try again later.</p></div>))
    }

    return(
        <>
            <Header></Header>
            <main>
                <div className="container w-50 mt-5">
                    <h1 className="h4">Updating Stuent File</h1>
                    <form className="container" onSubmit={handleEditStudent}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Students name</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={ (e)=> setName(e.target.value) } required  placeholder="Nahuel Saitti"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" className="form-control" name="age" value={age} onChange={ (e)=> setAge(e.target.value) } required placeholder="15"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input type="text" className="form-control" name="year" value={year} onChange={ (e)=> setYear(e.target.value) } required placeholder="Teens 3"/>
                        </div>
                        
                        <button type="submit" className="btn btn-primary w-100">Edit</button>
                    </form>
                    <div className="text-danger ms-2 fs-5">{errorMsg}</div>
                </div>
            </main>
        </>
    )
}

export default EditStudent;
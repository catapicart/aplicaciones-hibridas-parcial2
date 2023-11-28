import { useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
//Components
import Header from '../components/Header'
const host = 'http://127.0.0.1:3000';
function CreateStudent(){

    let user_id = localStorage.getItem("user_id");
    let token = '';
    token = localStorage.getItem('token');
    
    const navigate = useNavigate();

    const { class_id } = useParams()

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [year, setYear] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const endpoint = `${host}/student/create/${class_id}`;

    //for error handling
    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [yearError, setYearError] = useState(''); 


    function handleCreateStudent(e){
        
        e.preventDefault();
        const data = {
            name,
            age,
            year,
            classId: class_id
        }

        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8', authorization: `bearer ${token}` },
            body: JSON.stringify(data)
        }

        fetch(endpoint, config).then(resp => resp.json())
        .then(json =>{
            if(json.validation === false){
                if(json.input === 'nameInput'){
                    setNameError(json.msg )
               }else if(json.input === 'age'){
                   setAgeError(json.msg)
               }else if(json.input === 'year'){
                   setYearError(json.msg)
               }
            }else{
                navigate('/students/class/' + class_id)
            }
            
            
        }).catch(error => setErrorMsg(<div><p>An error has occurred. Please, try again laterr</p></div>))
    }

    return(
        <>
            <Header></Header>
            <main>
                <div className="container w-50 mt-5">
                    <h1 className="h4">Adding Student</h1>
                    <form className="container" onSubmit={handleCreateStudent}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Complete name</label>
                            <input type="text" className="form-control" name="name" required value={name} onChange={ (e)=> setName(e.target.value) }  placeholder="Camila Rios"/>
                            <p className="text-danger">{ nameError && nameError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" className="form-control" name="age" value={age} onChange={ (e)=> setAge(e.target.value) } required placeholder="15"/>
                            <p className="text-danger">{ ageError && ageError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input type="text" className="form-control" name="year" value={year} onChange={ (e)=> setYear(e.target.value) } required placeholder="Teens 3"/>
                            <p className="text-danger">{ yearError && yearError }</p>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Create</button>
                    </form>
                    <div>{errorMsg}</div>
                </div>
            </main>
        </>
    )
}

export default CreateStudent;
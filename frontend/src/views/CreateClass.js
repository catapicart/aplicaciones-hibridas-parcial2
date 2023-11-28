import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Components
import Header from '../components/Header'
const host = 'http://127.0.0.1:3000';
function CreateClass(){

    let user_id = localStorage.getItem("user_id");
    let token = '';
    token = localStorage.getItem('token');
    
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [book, setBook] = useState('');
    const [workbook, setWorkbook] = useState('');
    const [novel, setNovel] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const endpoint = `${host}/class/create`;

    function handleCreateClass(e){
       
        
        e.preventDefault();
        const data = {
            name,
            year,
            book,
            workbook,
            novel,
            teacherId: user_id
        }

        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8', authorization: `bearer ${token}` },
            body: JSON.stringify(data)
        }

        fetch(endpoint, config).then(resp => resp.json())
        .then(json =>{
            console.log(json)
            navigate('/classes/teacher/' + user_id)
        }).catch(error => setErrorMsg(<div><p>Ha ocurrido un error</p></div>))
    }

    return(
        <>
            <Header></Header>
            <main>
                <div className="container w-50 mt-5">
                    <h1 className="h4">Agregando una clase</h1>
                    <form className="container" onSubmit={handleCreateClass}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Class name</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={ (e)=> setName(e.target.value) } required  placeholder="Teens 3 A Afternoon"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input type="text" className="form-control" name="year" value={year} onChange={ (e)=> setYear(e.target.value) } required placeholder="Teens 3"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="book" className="form-label">Book</label>
                            <input type="text" className="form-control" name="book" value={book} onChange={ (e)=> setBook(e.target.value) } required placeholder="Eyes Open 4"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="workbook" className="form-label">Workbook</label>
                            <input type="text" className="form-control" name="workbook" value={workbook} onChange={ (e)=> setWorkbook(e.target.value) } required placeholder="Eyes Open 4"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="novel" className="form-label">Novel</label>
                            <input type="text" className="form-control" name="novel" value={novel} onChange={ (e)=> setNovel(e.target.value) } required placeholder="Eyes Open 4"/>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Crear</button>
                    </form>
                    <div>{errorMsg}</div>
                </div>
            </main>
        </>
    )
}

export default CreateClass;
import { useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
//Components
import Header from '../components/Header'
const host = 'http://127.0.0.1:3000';
function CreateReport(){

    let user_id = localStorage.getItem("user_id");
    let token = '';
    token = localStorage.getItem('token');
    
    const navigate = useNavigate();

    //for error handling
    const [absencesError, setAbsencesError] = useState('');
    const [dateError, setDateError] = useState('');
    const [unitError, setUnitError] = useState(''); 
    const [oralError, setOralError] = useState(''); 
    const [grammarError, setGrammarError] = useState(''); 
    const [writingError, setWritingError] = useState(''); 
    const [listeningError, setListeningError] = useState(''); 
    const [homeworkError, setHomeworkError] = useState(''); 
    const [readingError, setReadingError] = useState(''); 
    const [commentError, setCommentError] = useState(''); 

    const { student_id } = useParams()

    const [absences, setAbsences] = useState('');
    const [date, setDate] = useState('');
    const [unit, setUnit] = useState('');
    const [oral, setOral] = useState('');
    const [grammar, setGrammar] = useState('');
    const [writing, setWriting] = useState('');
    const [listening, setListening] = useState('');
    const [homework, setHomework] = useState('');
    const [reading, setReading] = useState('');
    const [comment, setComment] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    ///report/create/:studentId
    const endpoint = `${host}/report/create/${student_id}`;

    function handleCreateReport(e){
       
        
        e.preventDefault();
        const data = {
            student_id: student_id,
            absences,
            date,
            unit,
            oral,
            grammar,
            writing,
            listening,
            homework,
            reading,
            comment
        }

        const config = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8', authorization: `bearer ${token}` },
            body: JSON.stringify(data)
        }

        fetch(endpoint, config).then(resp => resp.json())
        .then(json =>{
            if(json.validation === false){
                if(json.input === 'absences'){
                    setAbsencesError(json.msg )
               }else if(json.input === 'date'){
                   setDateError(json.msg)
               }else if(json.input === 'unit'){
                   setUnitError(json.msg)
               }else if(json.input === 'oral'){
                   setOralError(json.msg)
               }else if(json.input === 'grammar'){
                   setGrammarError(json.msg)
               }else if(json.input === 'writing'){
                   setWritingError(json.msg)
               }else if(json.input === 'listening'){
                   setListeningError(json.msg)
               }else if(json.input === 'homework'){
                   setHomeworkError(json.msg)
               }else if(json.input === 'reading'){
                   setReadingError(json.msg)
               }else if(json.input === 'comment'){
                   setCommentError(json.msg)
               }
            }else{
                console.log(json)
                navigate('/classes/teacher/' + user_id)
            }
            
        }).catch(error => setErrorMsg(<div><p>An error has occurred. Please, try again laterr</p></div>))
    }

    return(
        <>
            <Header></Header>
            <main>
                <div className="container w-50 mt-5">
                    <h1 className="h4">Adding Report</h1>
                    <form className="container" onSubmit={handleCreateReport}>
                        <div className="mb-3">
                            <label htmlFor="absences" className="form-label">Absences</label>
                            <input type="number" className="form-control" name="absences" value={absences} onChange={ (e)=> setAbsences(e.target.value) } required  placeholder="2"/>
                            <p className="text-danger mt-2">{ absencesError && absencesError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input type="date" className="form-control" name="date" value={date} onChange={ (e)=> setDate(e.target.value) } required  placeholder="9"/>
                            <p className="text-danger mt-2">{ dateError && dateError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unit" className="form-label">Unit</label>
                            <input type="number" className="form-control" name="unit" value={unit} onChange={ (e)=> setUnit(e.target.value) } required  placeholder="9"/>
                            <p className="text-danger mt-2">{ unitError && unitError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="oral" className="form-label">Oral</label>
                            <input type="number" className="form-control" name="oral" value={oral} onChange={ (e)=> setOral(e.target.value) } required  placeholder="9"/>
                            <p className="text-danger mt-2">{ oralError && oralError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="grammar" className="form-label">Grammar</label>
                            <input type="number" className="form-control" name="grammar" value={grammar} onChange={ (e)=> setGrammar(e.target.value) } required  placeholder="9"/>
                            <p className="text-danger mt-2">{ grammarError && grammarError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="writing" className="form-label">Writing</label>
                            <input type="number" className="form-control" name="writing" value={writing} onChange={ (e)=> setWriting(e.target.value) } required  placeholder="9"/>
                            <p className="text-danger mt-2">{ writingError && writingError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="listening" className="form-label">Listening</label>
                            <input type="number" className="form-control" name="listening" value={listening} onChange={ (e)=> setListening(e.target.value) } required placeholder="9"/>
                            <p className="text-danger mt-2">{ listeningError && listeningError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="homework" className="form-label">Homework</label>
                            <input type="number" className="form-control" name="homework" value={homework} onChange={ (e)=> setHomework(e.target.value) } required  placeholder="9"/>
                            <p className="text-danger mt-2">{ homeworkError && homeworkError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reading" className="form-label">Reading</label>
                            <input type="number" className="form-control" name="reading" value={reading} onChange={ (e)=> setReading(e.target.value) } required  placeholder="9"/>
                            <p className="text-danger mt-2">{ readingError && readingError }</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Comment</label>
                            <input type="text" className="form-control" name="comment" value={comment} onChange={ (e)=> setComment(e.target.value) } required  placeholder="Great job!"/>
                            <p className="text-danger mt-2">{ commentError && commentError }</p>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Add</button>
                    </form>
                    <div>{errorMsg}</div>
                </div>
            </main>
        </>
    )
}

export default CreateReport;
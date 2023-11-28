import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom"

//Components
import Header from '../components/Header'
const host = 'http://127.0.0.1:3000';

function Reports(){
    const { student_id } = useParams()
    const endpointGET = `${host}/reports/student/${student_id}`;
    let token = '';
    token = localStorage.getItem('token');

    const [result, setResult] = useState('');
    const [reports, setReports] = useState('');

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
                    let reports = [...json.reports]
                    setReports(reports)
                }
            } 

        return () => {ignore= true} //para evitar lop
        })
    }, [])
    
    return(
        <>
            <Header></Header>
            <main>
                <div>
                    <div>
                        <h1 className="ms-4 mt-4 ">Report</h1>
                        <div className="row flex-wrap">{ reports && reports.map((c)=>
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item card-title"><span>Date:</span> {c.date}</li>
                                <li className="list-group-item"><span>Absences: </span>{c.absences}</li>
                                <li className="list-group-item"><span>Unit: </span>{c.unit}</li>
                                <li className="list-group-item"><span>Oral: </span>{c.oral}</li>
                                <li className="list-group-item"><span>Grammar: </span>{c.grammar}</li>
                                <li className="list-group-item"><span>Writing: </span>{c.writing}</li>
                                <li className="list-group-item"><span>Listening: </span>{c.listening}</li>
                                <li className="list-group-item"><span>Homework: </span>{c.homework}</li>
                                <li className="list-group-item"><span>Comment: </span>{c.comment}</li>
                                
                            </ul> 
                        </div> 
                        )}</div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Reports;
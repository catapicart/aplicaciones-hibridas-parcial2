import { Link } from "react-router-dom"
import { useRouteError } from "react-router-dom"

export default function Error(){
    const error = useRouteError();
    return (
        <div className="alert alert-danger" role="alert">
            <h2> Recurso no encontrado { error.statusText } </h2>
            <Link to={'/'} > Regresar Al inicio </Link>
        </div>
    )
}
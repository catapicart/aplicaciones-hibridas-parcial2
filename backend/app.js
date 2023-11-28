const express = require('express');
const db = require('./database');

const teacherController = require('./controllers/teacherController.js');

const studentController = require('./controllers/studentController.js');

const classController = require('./controllers/classController.js');

const reportController = require('./controllers/reportController');

const reminderController = require('./controllers/reminderController')
const jwt = require('jsonwebtoken');
const clave = 'appKey';
const app = express();
var cors = require('cors')
const port = 3000;


app.use(express.json()); //soporte para JSON
app.use(cors({origin:'http://localhost:3001', credentials : true}));
// Utilidad para varificar el token
function validarToken(  req, res, next ){

    let token = req.headers.authorization; //consigo el token a traves del header

    if( !token){ //si no hay token, error 401
        return res.status(401).json({ msg: 'No se paso el token'})
    }
    console.log(token)
    token = token.split(' ')[1];

    jwt.verify(token, clave, (error, decoded) => {

        if( error) { //si ocurrio un error
            console.log('error', error.JsonWebTokenError); 
            return res.status(403).json({ msg: 'Token invalido'}) //403 = el usuario no tiene acceso
        }
        // Retorno el id del usuario
        req.userId = decoded.userId;
        console.log(req.userId)
        
        next();
    })
    
}



//conexion a la db
db.on('error', ()=> {
    console.error('Error de conexion con la base');
});

db.once('open', ()=> {
    console.log('Conexion exitosa')
})

app.get('/', (req, res)=>{
    res.send("<h1>Teacher's helper</h1>")
})

//ruta para ver todas las clases
//app.get('/classes', classController.getClasses)
//ruta para ver mi perfil
app.post('/auth', teacherController.auth);

app.post('/register', teacherController.crear );

//ruta para ver todas las clases
app.get('/classes', validarToken, classController.getClasses)
//ruta para ver todas las clases de un profesor
app.get('/classes/teacher/:id', validarToken, classController.getClassesbyTeacherId)
//ruta para ver una clase especifica
app.get('/class/:id', validarToken, classController.getClassbyId);
//ruta para agregar clase
app.post('/class/create', validarToken, classController.create);
//editar clase /api/class/edit/:id
app.put('/class/edit/:id', validarToken, classController.edit); 
//borrar clase
app.delete('/class/delete/:id', validarToken, classController.delete)


//ruta para ver todos los alumnos
app.get('/students', validarToken, studentController.getStudents);
//ruta para ver todos los alumnos x clase
app.get('/students/class/:classId', validarToken, studentController.getStudentsbyClass);
//ruta para ver detalles de un alumno
app.get('/student/:id', validarToken, studentController.getStudentById)
//ruta para agregar alumno y ubicarlo en una clase
app.post('/student/create/:classId', validarToken, studentController.create)
//ruta para editar alumno
app.put('/student/edit/:id', validarToken, studentController.edit)
//ruta para borrar alumno
app.delete('/student/delete/:id', validarToken, studentController.delete)

//ruta para ver todos los boletines
app.get('/reports', validarToken, reportController.getReports)
//ruta para ver todos los boletines de un alumno
app.get('/reports/student/:studentId', validarToken, reportController.getReportsByStudent)
//ruta para ver un boletin
app.get('/report/:id', validarToken, reportController.getReportById)
//ruta para crear boletin de alumno
app.post('/report/create/:studentId', validarToken, reportController.create);
//ruta para editarlo
app.put('/report/edit/:reportId', validarToken, reportController.edit);
//ruta para borrarlo
app.delete('/report/delete/:reportId', validarToken, reportController.delete);


//ruta para traer todos los recordatorios
app.get('/reminders', validarToken, reminderController.getReminders);
//ruta para ver detalle de un recordatorio
app.get('/reminder/:id', validarToken, reminderController.getReminderById);
//agregar recordatorio
app.post('/reminder/create/:classId', validarToken, reminderController.create)
//editarlo
app.put('/reminder/edit/:id', validarToken, reminderController.edit);
//borrarlo
app.delete('/reminder/delete/:id', validarToken, reminderController.delete);


app.listen(port, ()=>{
    console.log('Escuchando el puerto', port)
});

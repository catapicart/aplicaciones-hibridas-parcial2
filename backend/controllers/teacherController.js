const teacherModel = require('../models/teacherModel');
const bcrypt = require('bcrypt');
const salt = 10; //nivel de encriptacion
const jwt = require('jsonwebtoken');
const clave = 'appKey';

// Autenticación
exports.auth = async (req, res) => {

    const { email, password} = req.body;
    
    const user = await teacherModel.findOne( {email} );

    if( !user ){
        res.status(401).json({
            status: 401,
            msg: 'Wrong email or password. Try again.'});
    } 
    
    const passwordValido = await bcrypt.compare(  password, user.password );
    if( !passwordValido ){
        res.status(401).json({
            status: 401,
            msg: 'Wrong email or password. Try again.'});
    }
    
    const token = jwt.sign( {user: email }, clave, { expiresIn: '4h'} );
    const id = user._id
    console.log(id)
    
    res.status(201).json({
        status: 201,
        id,
        token
    })

}

// Creo el controlador del usuario
exports.crear = async( req, res ) => {
    try {
        const { username, email, password } = req.body

        if( username == '' || !isNaN(username)){
            res.json({validation: false, input: "username", msg: 'Username is required and it can not be a number'})
        }else if( email == '' || email.length < 6){
            res.json({validation: false, input: "email", msg: 'Email is required and it must be a valid email address'})
        }else if( password == '' || password.length < 6 || password.length > 14){
            res.json({validation: false, input: "password", msg: 'Password is required and it must be between 6 and 14 characters'})
        }else{
            const passHash = await bcrypt.hash( password, salt );
            const teacher = new teacherModel({
                username,
                email,
                password: passHash
            });
        
            await teacher.save();

            res.status(201).json({
                status: 201, 
                id: teacher._id 
            });
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json( {
            status: 500,
            msg: 'Unexpected error'
    })
}
}

// Actualizar usuario
exports.actualizar = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json( { 
            status: 500,
            msg: 'Unexpected error'
         } )
    }
}

// Eliminar
exports.eliminar = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Error en el servidor' } )
    }
}
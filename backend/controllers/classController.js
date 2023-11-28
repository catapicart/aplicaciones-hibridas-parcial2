const classModel = require('../models/classModel');
const mongoose = require('mongoose')

//Class

exports.create = async (req, res)=>{

    try{
        //validar
        const data = req.body;

        if(data.name == '' || isNaN(data.name)){
            res.json({validation: false, input: "name", msg: 'Name of the class is required and it can not be a number'});
        }else if( data.year == '' || isNaN(data.year)){
            res.json({validation: false, input: "year", msg: 'Year is required and it can not be a number'});
        }else if( data.book == '' || isNaN(data.book)){
            res.json({validation: false, input: "book", msg: 'Book is required and it can not be a number'});
        }else if( data.workbook == '' || isNaN(data.workbook)){
            res.json({validation: false, input: "workbook", msg: 'Workbook is required and it can not be a number'});
        }else if( data.novel == '' || isNaN(data.novel)){
            res.json({validation: false, input: "novel", msg: 'Novel is required and it can not be a number'});
        }else{
            const newClass = new classModel(data);

                await newClass.save();

                res.status(201).json({
                    status: 201,
                    newClass
                })
        }

        }catch(err){
            console.log(err);
            res.status(500).json({
                status: 500,
                msg: 'Unexpected error'
            });
        }
};

exports.getClasses = async (req,res)=>{
    try{
        const classes = await classModel.find({});

        /*let list = '';

        classes.forEach(c =>{
            list += `${c.name}  <a href='/class/${c.id}'>Ver detalle</a> <a href='/class/edit/${c.id}'>Editar</a> <a href='/student/create/${c.id}'>Agregar alumno a la clase</a> <a href='/reminder/create/${c.id}'>Agregar recordatorio</a>`
            
        })*/
        if(classes != ''){
            res.json({
                results: true,
                classes
            })
        }else{
            res.json({
                results:false, 
                msg: "Couldn't find any classes"
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: 'Unexpected error'
        });
    }
}
exports.getClassesbyTeacherId = async (req,res)=>{
    try{
        const { id } = req.params;
        //let id = req.teacherId
        //console.log(req.userId)
        const classes = await classModel.find({teacherId: id});

        if(classes != ''){
            res.json({
                results: true,
                classes})
        }else{
            res.json({
                results:false, 
                msg: "Couldn't find any classes"
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: 'Unexpected error'
        });
    }
}

exports.getClassbyId = async (req,res)=>{
    try{
        const { id } = req.params;

        const classObj = await classModel.find({_id: id});
        res.json({
            results: true,
            data: classObj
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: 'Unexpected error'
        });
    }
}

 exports.edit = async (req, res)=>{
     try{
         const { id } = req.params;
         const data = req.body;


         if(data.name == '' || !isNaN(data.name)){
            res.json({validation: false, input: "name", msg: 'Name of the class is required and it can not be a number'});
        }else if( data.year == '' || !isNaN(data.year)){
            res.json({validation: false, input: "year", msg: 'Year is required and it can not be a number'});
        }else if( data.book == '' || !isNaN(data.book)){
            res.json({validation: false, input: "book", msg: 'Book is required and it can not be a number'});
        }else if( data.workbook == '' || !isNaN(data.workbook)){
            res.json({validation: false, input: "workbook", msg: 'Workbook is required and it can not be a number'});
        }else if( data.novel == '' || !isNaN(data.novel)){
            res.json({validation: false, input: "novel", msg: 'Novel is required and it can not be a number'});
        }else{

            classModel.updateOne({ _id: id }, {
                name: data.name,
                year: data.year,
                book: data.book,
                workbook: data.workbook,
                novel: data.novel
            }).then(function(){
                console.log("Class updated"); // Success
             }).catch(function(error){
                console.log(error); // Failure
             });

            res.json({
                status: 201,
                msg: 'Class updated correctly'
            });
            }
     }catch(err){
         console.log(err)
         res.status(500).json({
            status: 500,
             msg: 'Unexpected error'
         });
     }
 }

exports.delete = async (req, res)=>{
    try{
         const { id } = req.params;

        classModel.deleteOne({ _id: id }).then(function(){
            console.log("Class deleted"); // Success
         }).catch(function(error){
            console.log(error); // Failure
         });


        res.json({
            deleted: true,
            msg: 'Class deleted correctly'
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: 'Unexpected error'
        });
    }
       
};
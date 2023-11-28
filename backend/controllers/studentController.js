const studentModel = require('../models/studentModel');

exports.create = async (req, res)=>{

    try{
        const data = req.body;
        const {classId} = req.params;
        data.class = classId;

        if(data.name == '' || !isNaN(data.name) || data.name.split(" ").length <= 1 || data.name.split(" ").length > 5){
            res.json({validation: false, input: "nameInput", msg: 'Name must not be empty or be a number. It should be between 2 and 4 words long'})
            datosCorrectos = false;

        }else if(data.age == '' || isNaN(data.age) || data.age < 5 || data.age > 90){
            res.json({validation: false, input: "age", msg: 'Age must not be empty. It has to be a number between 5 and 90'});
            datosCorrectos = false;

        }else if(data.year == '' || !isNaN(data.year) || data.year.split(" ").length < 2){
            res.json({validation: false, input: "year", msg: 'Year must not be empty or be a number, it should be longer than one word'});
            datosCorrectos = false;
        }else{
            const newStudent = new studentModel(data);

            await newStudent.save();

            res.status(201).json({
                msg: 'Student file created successfully'
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

exports.getStudents = async (req, res)=>{
    try{
        const students = await studentModel.find({});

        let list = '';

        students.forEach(s =>{
            list += `Student: ${s.name}  <a href='/student/${s.id}'>Read detail</a> <a href='/student/edit/${s.id}'>Edit</a> <a href='/report/create/${s.id}'>Add report</a><br><a href='/student/delete/${s.id}'>DELETE Student</a>`
        })

        if(list != ''){
            res.json({list})
        }else{
            res.json({results:false, msg: "Couldn't find any students"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: 'Unexpected error'
        });
    }
}

exports.getStudentsbyClass = async (req,res)=>{
    try{
        const { classId } = req.params;
        //let id = req.teacherId
        //console.log(req.userId)
        const students = await studentModel.find({class: classId});

        if(students != ''){
            res.json({
                result:true,
                students})
        }else{
            res.json({
                result: false,
                msg: 'No students found'
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

exports.getStudentById = async (req, res)=>{
    try{
        const {id } = req.params;

        const student = await studentModel.find({_id: id});

        if(student){
            res.json({
            result: true,
            data: student
        })
        }else{
            res.json({
                result: false,
                msg: "Couldn't find any students with that ID"
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

exports.edit = async (req, res)=>{
    try{
        const {id} = req.params;
        const data = req.body;

        if(data.name == '' || !isNaN(data.name) || data.name.split(" ").length <= 1 || data.name.split(" ").length > 5){
            res.json({validation: false, input: "nameInput", msg: 'Name must not be empty or be a number. It should be between 2 and 4 words long'})
            datosCorrectos = false;

        }else if(data.age == '' || isNaN(data.age) || data.age < 5 || data.age > 90){
            res.json({validation: false, input: "age", msg: 'Age must not be empty. It has to be a number between 5 and 90'});
            datosCorrectos = false;

        }else if(data.year == '' || !isNaN(data.year) || data.year.split(" ").length < 2){
            res.json({validation: false, input: "year", msg: 'Year must not be empty or be a number, it should be longer than one word'});
            datosCorrectos = false;
        }else{

            datosCorrectos = true;
            studentModel.updateOne({ _id: id }, {
                name: data.name,
                age: data.age,
                year: data.year,
                class: data.class
            }).then(function(){
                console.log("Student updated"); // Success
             }).catch(function(error){
                console.log(error); // Failure
             });
        }

        res.status(201).json({
            status: 201,
            msg: 'Student file updated successfully'
        })

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

        studentModel.deleteOne({ _id: id }).then(function(){
            console.log("Student file deleted"); // Success
         }).catch(function(error){
            console.log(error); // Failure
         });


        res.json({
            deleted: true,
            msg: 'Student file deleted correctly'
        });

    }catch(err){
        console.log(err)
        res.status(500).json({
            status: 500,
            msg: 'Unexpected error'
        });
    }
};
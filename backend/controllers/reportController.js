const reportModel = require('../models/reportModel');

exports.create = async (req, res)=>{
    try{
        const data = req.body;
        const {studentId} = req.params;
        data.student_id = studentId;

        if(data.absences == '' || isNaN(data.absences)){
            res.json({validation: false, input: "absences", msg: 'The absences must be of type number, if the student was not absent, indicate it with a 0'});
        }else if(data.date == ''){
            res.json({validation: false, input: "date", msg:'Date must not be empty'})
        }else if(data.unit == '' || isNaN(data.unit) || data.unit > 20){
            res.json({validation: false, input: "unit", msg:'Unit of the test must be a number bewteen 1 to 20 and it can not be empty. '})
        }else if(data.oral == '' || isNaN(data.oral) || data.oral > 10 ){
            res.json({validation: false, input: "oral", msg:'Mark of the oral test must be of type number and it can not be empty or above 10'})
        }else if(data.grammar == '' || isNaN(data.grammar) || data.grammar > 10 ){
            res.json({validation: false, input: "grammar", msg:'Mark of the grammar test must be of type number and it can not be empty or above 10'})
        }else if(data.writing == '' || isNaN(data.writing) ||data.writing > 10 ){
            res.json({validation: false, input: "writing", msg: 'Mark of the writing test must be of type number and it can not be empty or above 10'})
        }else if(data.listening == '' || isNaN(data.listening) || data.listening > 10 ){
            res.json({validation: false, input: "listening", msg: 'Mark of the listening test must be of type number and it can not be empty or above 10'})
        }else if(data.homework == '' || isNaN(data.homework) || data.homework > 10 ){
            res.json({validation: false, input: "year", msg: 'Homework mark must be of type number and it can not be empty or above 10'})
        }else if(data.reading == '' || isNaN(data.reading) || data.reading > 10 ){
            res.json({validation: false, input: "reading", msg: 'Reading mark must be of type number and it can not be empty or above 10'})
        }else if(data.comment == '' || !isNaN(data.comment) || data.comment.length > 10){
            res.json({validation: false, input: "comment", msg: 'Comment for the report must be of type string and can not be longer than 10 words'})
        }else{
            const newReport = new reportModel(data);
            await newReport.save();

            res.status(201).json({
                msg: 'Student report created successfully'
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

exports.getReports = async (req, res)=>{
    try{
        const reports = await reportModel.find({});

        /*let list = '';

        reports.forEach(r =>{
            list += `Student: ${r.student_id} <a href='/report/${r.id}'>Read details</a> <a href='/report/edit/${r.id}'>Edit</a>`
        });*/

        if(reports != ''){
            res.json({reports})
        }else{
            res.json({results:false, msg: "Couldn't find any reports"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: 'Unexpected error'
        });
    }
};

exports.getReportById = async(req, res)=>{
    try{
        const { id } = req.params;

        const report = await reportModel.find({_id: id});

        res.json({
            result: true,
            data: report
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: 'Unexpected error'
        });
    }
}

exports.getReportsByStudent = async(req, res)=>{
    try{
        const { studentId } = req.params;

        const reports = await reportModel.find({student_id: studentId});

        if(reports != ''){
            res.json({
            result: true,
            reports
        })
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

exports.edit = async (req, res)=>{
    try{
        const {reportId} = req.params;
        const data = req.body;

        if(data.absences == '' || isNaN(data.absences)){
            res.send('The absences must be of type number, if the student was not absent, indicate it with a 0');
        }else if(data.date == ''){
            res.send('Date must not be empty')
        }else if(data.unit == '' || isNaN(data.unit)){
            res.send('Unit of the test must be of type number and it can not be empty')
        }else if(data.oral == '' || isNaN(data.oral)){
            res.send('Mark of the oral test must be of type number and it can not be empty')
        }else if(data.grammar == '' || isNaN(data.grammar)){
            res.send('Mark of the grammar test must be of type number and it can not be empty')
        }else if(data.writing == '' || isNaN(data.writing)){
            res.send('Mark of the writing test must be of type number and it can not be empty')
        }else if(data.listening == '' || isNaN(data.listening)){
            res.send('Mark of the listening test must be of type number and it can not be empty')
        }else if(data.homework == '' || isNaN(data.homework)){
            res.send('Homework mark must be of type number and it can not be empty')
        }else if(data.reading == '' || isNaN(data.reading)){
            res.send('Reading mark must be of type number and it can not be empty')
        }else if(data.comment == '' || !isNaN(data.comment) || data.comment.length > 80){
            res.send('Comment for the report must be of type string and can not be longer than 10 words')
        }else{
            reportModel.updateOne({_id: reportId},{
                absences: data.absences,
                unit: data.unit,
                oral: data.oral,
                grammar: data.grammar,
                writing: data.writing,
                listening: data.listening,
                homework: data.homework,
                reading: data.reading,
                comment: data.comment
            }).then(function(){
                console.log("Report updated"); // Success
             }).catch(function(error){
                console.log(error); // Failure
             });
        }

        res.status(201).json({
            status: 201,
            msg: 'Student report updated successfully'
        })
        }catch(err){
            console.log(err)
            res.status(500).json({
                status: 500,
                msg: 'Unexpected error'
            });
        }
};

exports.delete = async (req, res)=>{
    try{
        const {reportId} = req.params;

        reportModel.deleteOne({_id: reportId}).then(function(){
            console.log("Report deleted"); // Success
         }).catch(function(error){
            console.log(error); // Failure
         });

         res.json({
            deleted: true,
            msg: 'Student report deleted correctly'
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            status: 500,
            msg: 'Unexpected error'
        });
    }
};
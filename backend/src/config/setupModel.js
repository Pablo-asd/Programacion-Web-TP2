const {getSeqInstance} = require('./setupDb');
const Students=require('../model/students');

const setupModel = async()=>{
    const instanceDb= await getSeqInstance();
    const students = Students.init(instanceDb)
};

setupModel()
const { getSeqInstance } = require('./setupDb');
const Student = require('../model/students');

const setupModel = async () => {
    const instanceDb = await getSeqInstance();
    Student.initModel(instanceDb); // Llamada correcta al método de inicialización
};

setupModel();
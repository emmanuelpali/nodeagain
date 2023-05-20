const data = {};

data.employees = require('../model/employees.json');

const getAllEmployees = (req,res) => {
    res.json(data.employees);
}

const createEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });       
}

const updateEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const deleteEmployee = (req,res) => {
    res.json({ "id": req.body.id})
}

const getEmployee = (req, res) => {
    res.json({"id": req.body.id});
}

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
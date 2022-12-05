const express = require("express")
const mongoose = require("mongoose")

const EmployeeModel = require("../models/Employees")
const routes = express.Router()

//Get All employees
routes.get("/employees", async (req, res) => {
    try {
        const employees = await EmployeeModel.find()
        res.status(200).send(employees)
    } catch (error) {
        res.status(400).send(error)
    }
})
/*
    {
    "first_name": "Askar",
    "last_name": "Bul",
    "email": "asa@dsa.ru",
    "gender": "male",
    "salary": 34.75
    }

 */
//Add NEW employee
routes.post("/employee", async (req, res) => {
    try {
        const newEmployee = new EmployeeModel(req.body)
        const employee = await newEmployee.save()
        res.status(201).send(employee)
        } catch (error) {
        res.status(400).send(error)
    }
})

//Update existing employee By id
routes.put("/employees/:employeeid", async (req, res) => {
    try {
        const newEmployee = await EmployeeModel.findByIdAndUpdate(req.params.employeeid, req.body)
        res.status(201).send(newEmployee)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Delete employee By ID
routes.delete("/employees/:employeeid", async (req, res) => {
    try {
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.employeeid)
        if(!deletedEmployee){
            res.status(400).send({message: "No Employee to Delete"})
        }
        res.status(201).send(deletedEmployee)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Get employee By ID
routes.get("/employees/:employeeid", async (req, res) => {
    try {
        const employees = await EmployeeModel.findById(req.params.employeeid)
        res.status(200).send(employees)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = routes
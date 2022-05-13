const express = require('express');
const Employee = require('../../models/employeeModel');
const {Success,CreateSuccess,BadRequest,Forbidden,NotFound,InternalError} = require('../../util/response');

const router = express.Router();

//get all employees
router.get('/', async(request,response) => {
    try{
        const employees = await Employee.find();
        if(employees?.length > 0){
            Success(response, employees);
        }else {
            NotFound(response, []);
        }
    }catch(err){
        InternalError(response, err);
    }
});

//get employee by id
router.get('/:id',getEmployee, async(request,response) => {
     Success(response, response.employee)
});

//create employee
router.post('/', async(request,response) => {
    const employee = new Employee({
        basicInformation: request.body.basicInformation,
        addressInformation: request.body.addressInformation,
        skills: request.body.skills,
    })

    try{
        const newEmployee = await employee.save();
        if(newEmployee){
            CreateSuccess(response, newEmployee)
        }else {
            BadRequest(response, []);
        }
    }catch(err){
        InternalError(response, err)
    }
});

//update employee
router.patch('/:id',getEmployee, async (request,response) => {
      if (request.body.basicInformation != null) {
        response.employee.basicInformation = request.body.basicInformation
      }
      if (request.body.addressInformation != null) {
        response.employee.addressInformation = request.body.addressInformation
      }
      if (request.body.skills != null) {
        response.employee.skills = request.body.skills
      }

      try {
        const updatedEmployee = await response.employee.save()
        if(updatedEmployee) {
            Success(response, updatedEmployee)
        }else {
            BadRequest(response, []);
        }
      } catch (err) {
        InternalError(response, err)
      }
});

//delete employee
router.delete('/:id',getEmployee, async(request,response) => {
    try {
        await response.employee.remove();
        Success(response, []);
      } catch (err) {
        InternalError(response, err)
      }
});

async function getEmployee(request, response, next) {
    let employee;
    try {
        employee = await Employee.findById(request.params.id);
        if (employee === null) {
            return NotFound(response, []) 
        }
    } catch (err) {
      return InternalError(response, err)
    }
    response.employee = employee
    next()
  }

module.exports = router;
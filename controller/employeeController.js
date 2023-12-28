const employeeModel = require("../models/employeeModel");

exports.createEmployee = async (req, res)=>{
    try {
        const {name,email,role} = req.body;
        //validation
        if(!name || !email || !role){
            return res.status(400).send({success: false, message: 'All fileds are required'});
        }
        //creating employee
        const createEmp = await employeeModel.create({name,email,role});
        return res.status(201).send({success: true, message: 'Employee Added', createEmp});

        
    } catch (error) {
        return res.status(500).send({success: false, message: `Error while Creating Employee ${error}`})
        
    }
}

//find single employee
exports.singleEmployee = async (req,res)=>{
    try {
        const {id} = req.params;
        const singleEmp = await employeeModel.findById(id);
        if(!singleEmp){
            return res.status(404).send({success:false, message: 'single employee not found'})
        }
        return res.status(200).send({success: true, message: 'Single employee found Successfully !',singleEmp});
        
    } catch (error) {
        return res.status(500).send({success: false, message: `Error while finding single Employee ${error}`})
        
    }
}

//get all employee

exports.getAllEmployee = async (req,res)=>{
    try {
        const getAllEmployee = await employeeModel.find({});
        if(!getAllEmployee){
            return res.status(404).send({success:false, message: 'employee not found'})
        }
        return res.status(200).send({success: true, message: 'Find all employee', getAllEmployee});
        
    } catch (error) {
        return res.status(500).send({success: false, message: `Error while finding single Employee ${error}`})
        
    }
}


//update employee
exports.updateEmployee = async (req, res)=>{
    try {
        const {id} = req.params;
        const {name, email, role} = req.body;
        const updateEmployee = await employeeModel.findByIdAndUpdate(id,{name,email,role}, {new:true});
        res.status(200).send({success: true, message: 'employee Updated Successfully', updateEmployee});
        
    } catch (error) {
        return res.status(500).send({success: false, message: `Error while updating Employee ${error}`})
        
    }
}


//delete employee
exports.deleteEmployee = async (req ,res)=>{
    try {
        const {id} = req.params;
        const deleteEmp = await employeeModel.findByIdAndDelete(id);
        return res.status(200).send({success: true, message: 'employee deleted successfully'})
        
    } catch (error) {
        return res.status(500).send({success: false, message: `Error while deleting Employee ${error}`})
        
    }
}




// get all employees with optional search by name
exports.getAllEmployee = async (req, res) => {
    try {
      const { name } = req.query;
      const query = name ? { name: new RegExp(name, 'i') } : {};
      const getAllEmployee = await employeeModel.find(query);
  
      if (!getAllEmployee.length) {
        return res.status(404).send({ success: false, message: 'No employees found' });
      }
  
      return res.status(200).send({ success: true, message: 'Find all employees', getAllEmployee });
    } catch (error) {
      return res.status(500).send({ success: false, message: `Error while finding employees: ${error}` });
    }
  };
  
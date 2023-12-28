const express = require ("express");
const router = express.Router();
const controller = require ("../controller/employeeController");

router.post("/createEmployee", controller.createEmployee);
router.get("/singleEmployee/:id", controller.singleEmployee);
router.get("/getAllEmployee", controller.getAllEmployee);
router.put("/updateEmployee/:id", controller.updateEmployee);
router.delete("/deleteEmployee/:id", controller.deleteEmployee);



module.exports = router;
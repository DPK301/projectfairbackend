//import express

const express = require('express')

const userContorller = require('../Controller/userController')
const projectController = require('../Controller/projectController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const multerConfig = require("../Middlewares/multerMiddleware")
// create a router object of epress to define routes
const router = new express.Router()

//using route object to define path


//register API routes - localhost:4000/register

router.post('/register',userContorller.register)
router.post('/login',userContorller.login)

router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.adduserproject)

router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)

router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

router.get('/project/home-project',projectController.getHomeProject)

router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

router.delete('/project/delete-project/:id',jwtMiddleware,projectController.deleteProject)

module.exports = router
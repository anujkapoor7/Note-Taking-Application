const {check, body, validationResult} = require('express-validator')
const express = require('express')

let params = [
    body('title', 'Title does not exists').exists().bail(),
    body('title', 'Title is empty! Please  Provide a valid value').notEmpty().bail(),
    body('title', 'Title is not a String! please provide a valid string title').isString().bail(),
    body('body', 'Body Does not exists').exists().bail(),
    body('body', 'Body is empty! Please  Provide a valid value').notEmpty().bail(),
    body('body', 'Body is not a String! please provide a valid string body').isString().bail(),

]

let paramstitle = [
    body('title', 'Title does not exists').exists().bail(),
    body('title', 'Title is empty! Please  Provide a valid value').notEmpty().bail(),
    body('title', 'Title is not a String! please provide a valid string title').isString().bail(),
]

const errorMsg =(req, res, next)=>{
    try{
    const err = validationResult(req)
    if(!err.isEmpty())
    {
        return res.status(400).send(err.errors[0])
    }
    next()
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    params: params,
    paramstitle: paramstitle,
    errorMsg: errorMsg
}
const {check, validationResult} = require('express-validator')
const express = require('express')

var params = [
    check('title', 'Title does not exists').exists().bail(),
    check('title', 'Title is empty! Please  Provide a valid value').notEmpty().bail(),
    check('title', 'Title is not a String! please provide a valid string title').isString().bail(),
    check('body', 'Body Does not exists').exists().bail().notEmpty().bail().isString(),
    check('body', 'Body is empty! Please  Provide a valid value').notEmpty().bail(),
    check('body', 'Body is not a String! please provide a valid string body').isString().bail(),
]

var paramstitle = [
    check('title', 'Title does not exists').exists().bail(),
    check('title', 'Title is empty! Please  Provide a valid value').notEmpty().bail(),
    check('title', 'Title is not a String! please provide a valid string title').isString().bail(),
]

const errorMsg =(req, res, next)=>{
    const err = validationResult(req)
    if(!err.isEmpty())
    {
        return res.status(400).send(err.errors[0])
    }
    next()
}

module.exports = {
    params: params,
    paramstitle: paramstitle,
    errorMsg: errorMsg
}
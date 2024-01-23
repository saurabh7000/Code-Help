const errorResponse = require("../utils/erroResponse")

const errorHandler = (err, req,res,next) =>{
  let error = {...err}
 if(error.message !== undefined) error.message = err.message

  //mongoose Error

  if(error.name === 'castError'){
    const message = 'Resurces not found'
    error = new errorResponse(message,404)
  }

  //duplicate key error
   
  if(error.code === 11000){
    const message = 'Duplicate field value entered'
    error = new errorResponse(message,400)
  }

  //mongoose validation

  if(error.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message )
    error = new errorResponse(message, 400)
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server Error'
    })
  }

}

module.exports = errorHandler


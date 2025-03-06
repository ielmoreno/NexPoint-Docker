import { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = (err,req, res, next) => {

    if(err){
        console.log(err)
        res.status(500).json({
            error: "Erro no servidor, tente novamente!"
        })
    }
}

export default errorHandler
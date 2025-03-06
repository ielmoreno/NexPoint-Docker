import { NextFunction, Request, Response } from "express"

const welcome = (req: Request, res: Response) => { 
    res.json({message: "Bem vindo a API de POIs"})
}

export default welcome
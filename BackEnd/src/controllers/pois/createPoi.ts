import { Request, Response, NextFunction } from "express";
import { create, validatePoisToCreate } from "../../models/poiModel";

const createPoi = async (req: Request,res: Response,next: NextFunction): Promise <any> =>{
    try{
        const poi = req.body
        const poiValidated = validatePoisToCreate(poi)

        if(poiValidated?.error){
            return res.status(400).json({
                    error: "Erro ao criar POI, verifique os dados!",
                    fieldErrors: poiValidated.error.flatten().fieldErrors
            })
        }

        const result = await create(poiValidated.data)

        if(!result){
            return res.status(500).json({
                error: "Erro ao criar POI, tente novamente mais tarde!"
            })
        }

        return res.status(200).json({
            success: "POI criado com sucesso!",
            poi: result
        })
    }catch(error){
        console.log(error)
        next(error)
    }
}

export default createPoi
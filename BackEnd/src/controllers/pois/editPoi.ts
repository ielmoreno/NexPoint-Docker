import { Request, Response, NextFunction } from "express"
import { update, validatePois } from "../../models/poiModel"
import { Prisma } from ".prisma/client"

const editPoi = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const {id} = req.params
        const poi = req.body
        const poiValidated = validatePois(poi)

        if(!poiValidated){
            return res.status(400).json({
                error: "Favor verificar os campos enviados, campo(s) inválido(s)!"
            })
        }

        const result = await update({
            id: +id,
            ...poi
        })

        res.status(200).json({
            message: "POI atualizado com sucesso!",
            result
        })

    }catch(error){
        console.log(error)
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error?.code === 'P2025'){
                return res.status(404).json({
                    error: "POI não encontrado"
                })
            }
            next(error)
        }
    }
}

export default editPoi
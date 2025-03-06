import { Request, Response, NextFunction } from "express";
import { getAll, pois } from "../../models/poiModel";

const poisByNear = async (req:Request, res:Response, next:NextFunction): Promise<any> =>{
    try{   
        const camposInvalidos = []
        const coordinateX = parseInt(req.query.coordinateX as string);
        const coordinateY = parseInt(req.query.coordinateY as string);
        const distance = parseInt(req.query.distance as string);

        (isNaN(coordinateX) && camposInvalidos.push("coordinateX"));
        (isNaN(coordinateY) && camposInvalidos.push("coordinateY"));
        (isNaN(distance) && camposInvalidos.push("distance"));
        if(camposInvalidos.length > 0) {
            return res.status(400).json({
                error: `Favor validar os campos enviados, campo${ camposInvalidos.length == 1 ?
                    " '" + camposInvalidos[0] + "' inválido" :
                    "s '" + camposInvalidos.join("', '") + "' inválidos"
                }!`
            })
        }
        console.log(coordinateX, coordinateY, distance)
        const poisList = await getAll()
        if(!poisList){
            return res.status(500).json({
                error:"Erro ao buscar listagem de POIs, tente novamente mais tarde!"
            })
        }

        const result = poisList.filter(
            pos => gerLiteralDistance(+coordinateX, +coordinateY, pos.coordinateX, pos.coordinateY) <= distance);
        
            if(result.length === 0){
                return res.status(404).json({
                    error:"Nenhum POI encontrado nas proximidades exigidas!"
                })
            }
            return res.status(200).json({
                message: "POIs encontrados com sucesso!",
                result: result.sort((a, b) => {
                    let distanceA = gerLiteralDistance(+coordinateX, +coordinateY, a.coordinateX, a.coordinateY);
                    let distanceB = gerLiteralDistance(+coordinateX, +coordinateY, b.coordinateX, b.coordinateY);
                    return distanceA - distanceB;
                })
            })

    }catch(error){
        console.log(error);
        next(error);
    }
}

function gerLiteralDistance(inputPositionX: number, inputPositionY: number, positionX: number, positionY: number){

    return Math.sqrt(Math.pow(inputPositionX - positionX, 2) + Math.pow(inputPositionY - positionY, 2))

}

export default poisByNear;
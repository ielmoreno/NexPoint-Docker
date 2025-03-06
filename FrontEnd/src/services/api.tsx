import axios from 'axios';


const baseUrl = 'http://localhost:4000/';

export type pois = {
    id: number,
    nome: string,
    coordinateX: number,
    coordinateY: number,
    ativo: number,
    created_at: Date
}

export function getAllPois(){
    return new Promise<pois[]>(async (resolve,reject) => {
        await axios.get(`${baseUrl}pois`).then((resp) => {
            resolve(resp.data)
        }).catch((rej) => {
            console.log(rej)
            reject(rej)
        })
    })
}

export function getNearPois(coordinateX: number, coordinateY: number, distance: number) {
    return new Promise<pois[]>(async (resolve, reject) => {
        const config = {
            params: {
                "coordinateX": coordinateX,
                "coordinateY": coordinateY,
                "distance": distance
            }
        }

        await axios.get(`${baseUrl}pois/near`, config).then((resp)=>{
            resolve(resp.data.result)
        }).catch((rej)=>{
            reject(rej)
        })
    })
}

export function getPoisActivos(ativo: number){
    return new Promise<pois[]>(async (resolve,reject) => {
        await axios.get(`${baseUrl}pois/ativo/${ativo}`).then((resp)=>{
            resolve(resp.data.result)
        }).catch((rej)=>{
            reject(rej)
        })
    })
}

export function getPoiById(id: number){
    return new Promise<pois>(async (resolve,reject) => {
        await axios.get(`${baseUrl}pois/${id}`).then((resp)=>{
            resolve(resp.data)
        }).catch((rej)=>{
            reject(rej)
        })
    })
}

export function createPoi(nome:string, coordinateX:number, coordinateY:number, ativo:number){
    return new Promise<pois>(async (resolve,reject) =>{
        const dados = {
            "nome":nome,
            "coordinateX":coordinateX,
            "coordinateY":coordinateY,
            "ativo": ativo
        }

        await axios.post(`${baseUrl}pois/`,dados).then((resp)=>{
            resolve(resp.data)
        }).catch((rej)=>{
            console.log(rej)
            reject(rej)
        })
    })
}

export function updatePoi(id:number, nome:string, coordinateX:number, coordinateY:number, ativo:number){
    return new Promise<pois>(async (resolve,reject) =>{
        const dados = {
            "id":id,
            "nome":nome,
            "coordinateX":coordinateX,
            "coordinateY":coordinateY,
            "ativo":ativo,
        }
        await axios.put(`${baseUrl}pois/${id}`,dados).then((resp)=>{
            console.log(resp)
            resolve(resp.data)
        }).catch((rej)=>{
            console.log(rej.response)
            reject(rej)
        })
    })
}

export function deletePoi(id: number){
    return new Promise<pois>(async (resolve,reject) => {
        await axios.delete(`${baseUrl}pois/${id}`).then((resp)=>{
            resolve(resp.data)
        }).catch((rej)=>{
            reject(rej)
        })
    })
}

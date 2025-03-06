'use client'
import { MapPin, List, Plus, Map } from "lucide-react";
import { useState, useEffect } from "react";
import * as api from '../services/api'
import { Checkbox, Modal } from "@mui/material";
import { green, grey, indigo } from "@mui/material/colors";


export default function Home() {

  const [select, setSelect] = useState("All");
  const [pois, setPois] = useState<api.pois[]>([]);
  const [change, setChange] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)
  const [name, setName] = useState("");
  const [errorName,setErrorName] = useState<boolean>(false)
  const [coordinateX, setCoordinateX] = useState<number>(0)
  const [coordinateY, setCoordinateY] = useState<number>(0)
  const [errorCoordX,setErrorCoordX] = useState<boolean>(false)
  const [errorCoordY,setErrorCoordY] = useState<boolean>(false)
  const [nearCoordX, setNearCoordX] = useState<number>(0)
  const [nearCoordY, setNearCoordY] = useState<number>(0)
  const [distance, setDistance] = useState<number>(0)
  const [createAt, setCreateAt] = useState("")
  const [editModal, setEditModal] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [check, setCheck] = useState<boolean>(true)
  const [createCheck, setCreateCheck] = useState<boolean>(true)
  const [cancelEditModal, setCancelEditModal] = useState<boolean>(false)


  useEffect(() => {
    getAll()
  }, [select])

  useEffect(() => {
    teste()
  }, [change])


  function getAll() {
    api.getAllPois().then((resp) => {
      setPois(resp)
      setChange(false)
    }).catch((rej) => {
      console.log("Rejeição", rej)
    })
  }

  function getNear() {
    api.getNearPois(nearCoordX, nearCoordY, distance).then((resp) => {
      setPois(resp)
      setChange(!change)
    }).catch((rej) => {
      console.log("Rejeição", rej.response.data)
      alert(`Erro ${rej.response.status}: \n${rej.response.data.error}`)
    })
  }

  function mountModal(pois: api.pois) {
    cancelError()
    console.log(pois)
    const data = pois.created_at.toString();
    const dataFormatada = data.split("T")[0].split('-');
    const dataFormat = `${dataFormatada[1]}/${dataFormatada[2]}/${dataFormatada[0]}`
    setId(pois.id)
    setName(pois.nome)
    setCoordinateX(pois.coordinateX)
    setCoordinateY(pois.coordinateY)
    setCheck((pois.ativo === 0))
    setCreateAt(dataFormat)
    setEditModal(true)
  }

  function cancelEdit() {
    cancelError()
    setEdit(false)
    setName("")
    setCoordinateX(0)
    setCoordinateY(0)
    setCheck(true)
  }

  function cancelError(){
    setErrorCoordX(false)
    setErrorCoordY(false)
    setErrorName(false)
  }

  function cancelCreate() {
    cancelError()
    setName("")
    setCoordinateX(0)
    setCoordinateY(0)
    setCreateCheck(true)
  }

  function saveEdit() {
    if (name.length >= 3 && name.length <= 255 && !isNaN(coordinateX) && Number.isInteger(coordinateX) && coordinateX >= 0 && !isNaN(coordinateY) && Number.isInteger(coordinateY) && coordinateY >= 0) {
      api.updatePoi(id, name, coordinateX, coordinateY, check ? 0 : 1).then(() => {
        alert("Ponto de Interesse editado com sucesso")
        cancelEdit()
        setEditModal(false)
        getAll()
      }).catch((rej) => {
        alert(`Erro ao salvar edição ${rej}`)
      })

    } else {
      alert("Verifique os dados e tente novamente")
    }
  }

  function cadastrar() {
    if (name.length >= 3 && name.length <= 255 && !isNaN(coordinateX) && Number.isInteger(coordinateX) && coordinateX >= 0 && !isNaN(coordinateY) && Number.isInteger(coordinateY) && coordinateY >= 0) {
      api.createPoi(name, coordinateX, coordinateY, createCheck ? 0 : 1).then(() => {
        alert("Ponto de Interesse criado com sucesso")
        cancelCreate()
        getAll()
      }).catch((rej) => {
        alert(`Erro ao salvar cadastro ${rej}`)
      })

    } else {
      alert("Verifique os dados e tente novamente")
    }
  }

  function teste() {
    if (pois.length > 0) {
      return (
        <div className={select == "Add" ? "hidden" : select == "Near" ? "w-full h-auto min-h-[60vh] border-2 border-sky-950 rounded-lg m-8" : "w-full h-auto min-h-[67vh] border-2 border-sky-950 rounded-lg m-8"}>
          <div className="flex flex-row w-full h-[4.5vh] px-5 grid grid-cols-4 bg-sky-950 rounded-t-sm">
            <div className="flex items-center justify-center">
              <p className="text-white text-lg">Ponto de Interesse</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-white text-lg">Coordenada X</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-white text-lg">Coordenada Y</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-white text-lg">Status</p>
            </div>
          </div>
          {pois.map(poi => {
            return (
              <div key={poi.id}>
                <div className="flex flex-row w-full px-5 h-7.5 grid grid-cols-4 cursor-pointer" onClick={() => mountModal(poi)}>
                  <div className="flex items-center justify-center">
                    <p className="text-black">{poi.nome}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-black">{poi.coordinateX}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-black">{poi.coordinateY}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    {poi.ativo == 0 ?
                      <div className="flex bg-green-700 w-20 justify-center items-center rounded-full">
                        <p className="text-white text-xs font-bold">Ativo</p>
                      </div>
                      :
                      <div className="flex bg-red-700 w-20 justify-center items-center rounded-full">
                        <p className="text-white text-xs font-bold">Inativo</p>
                      </div>
                    }
                  </div>
                </div>
                <div className="border-b-[1px] border-gray-200 w-9/10 m-auto" />
              </div>
            )
          })}
        </div>
      )
    }
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p className="text-black">Nenhum Ponto de Interesse encontrado</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-w-screen min-h-screen">
      <header className="mb-8 bg-sky-950 h-[15vh]">
        <div className="flex items-center justify-between mx-5 h-full">
          <div className="flex items-center gap-2">

            <MapPin className="h-10 w-10 text-primary" />
            <div className="flex flex-col mt-2">
              <h1 className="text-3xl font-bold">NexPoint</h1>
              <p className="text-xs ml-7">Um passo do ponto ideal</p>
            </div>
          </div>
          <p className="text-muted-foreground">Sistema de Cadastro e Consulta de Pontos de Interesse</p>
        </div>
      </header>
      <div className="w-full h-full px-[5vw]">
        <div className="bg-sky-950 grid w-full grid-cols-3 h-16 rounded-md">
          <button className="flex items-center justify-center cursor-pointer" onClick={() => {
            getAll()
            setSelect("All")
          }}>
            <div className={select === "All" ? "flex flex-row w-4/5 h-4/5 justify-center items-center rounded-sm bg-gray-100" : "flex flex-row w-4/5 h-4/5 justify-center items-center rounded-sm"}>
              <List color={select === "All" ? '#000' : '#FFF'} className="h-4 w-4 mr-1" />
              <span className={select === "All" ? "text-black" : "text-white"}>Todos os Pontos</span>
            </div>
          </button>
          <div className="flex items-center justify-center cursor-pointer" onClick={() => setSelect("Add")}>
            <div className={select === "Add" ? "flex flex-row w-4/5 h-4/5 justify-center items-center rounded-sm bg-gray-100" : "flex flex-row w-4/5 h-4/5 justify-center items-center rounded-sm"}>
              <Plus color={select === "Add" ? '#000' : '#FFF'} className="h-4 w-4 mr-1" />
              <span className={select === "Add" ? "text-black" : "text-white"}>Adicionar Ponto</span>
            </div>
          </div>
          <div className="flex items-center justify-center cursor-pointer" onClick={() => {
            setSelect("Near")
          }}>
            <div className={select === "Near" ? "flex flex-row w-4/5 h-4/5 justify-center items-center rounded-sm bg-gray-100" : "flex flex-row w-4/5 h-4/5 justify-center items-center rounded-sm"}>
              <Map color={select === "Near" ? '#000' : '#FFF'} className="h-4 w-4 mr-1" />
              <span className={select === "Near" ? "text-black" : "text-white"}>Pontos Próximos</span>
            </div>
          </div>
        </div>
      </div>
      <main className="w-[90vw] ml-[3.3vw]">
        <div className={select == "Add" ? "flex flex-col ml-[1.7vw] w-full h-auto my-4 items-center" : "hidden"}>
          <h1 className={"text-sky-950 font-extrabold text-xl"}>Criação de Ponto de Interesse</h1>
          <div className="flex w-full px-[10vw] justify-around items-center my-2">
            <div className="flex flex-col w-md">
              <p className={errorName?"text-red-500 px-2":"text-black px-2"}>Nome</p>
              <input type={"text"} placeholder={"Insira a nome do ponto"} value={name} className={errorName? "w-sm border-3 rounded-md border-red-500 text-black px-2 placeholder-gray-400":"w-sm border-2 rounded-md border-black text-black px-2 placeholder-gray-400"} onChange={(e) => { setName(e.target.value) }} onBlur={() => {
                if (name.length < 3 || name.length > 255) {
                  setErrorName(true)
                }else{
                  setErrorName(false)
                }
              }} />
              <p className={errorName? "text-xs h-4 text-red-500":"hidden text-xs h-4 text-red-500"}>O campo nome deve ter entre 3 a 255 caracteres</p>
            </div>
            <div className="flex flex-col items-center justify-center w-md">
              <label className="text-black px-2">Ativo</label>
              <Checkbox sx={{ color: indigo[900], '&.Mui-checked': { color: green[800] } }} checked={createCheck} onChange={() => setCreateCheck(!createCheck)} />
            </div>
          </div>
          <div className="flex w-full px-[10vw] justify-around items-center my-2">
            <div className="flex flex-col w-md">
              <p className={errorCoordX?"text-red-500 px-2":"text-black px-2"}>Coordernada X</p>
              <input type={"number"} placeholder={"Insira a posição X"} value={coordinateX} className={errorCoordX?"w-sm border-3 rounded-md border-red-500 text-black px-2 placeholder-gray-400":"w-sm border-2 rounded-md border-black text-black px-2 placeholder-gray-400"} onChange={(e) => { setCoordinateX(e.target.valueAsNumber) }} onBlur={() => {
                    if (isNaN(coordinateX)) {
                      setCoordinateX(0)
                    } else {
                      if (!Number.isInteger(coordinateX) || coordinateX < 0) {
                        setErrorCoordX(true)
                      }
                      else{
                        setErrorCoordX(false)
                      }
                    }
                  }} />
                  <p className={errorCoordX? "text-xs h-4 text-red-500":"hidden text-xs h-4 text-red-500"}>A coordenada X deve ser inteira e maior que zero</p>
            </div>
            <div className="flex flex-col w-md">
              <p className={errorCoordY?"text-red-500 px-2":"text-black px-2"}>Coordernada Y</p>
              <input type={"number"} placeholder={"Insira a posição Y"} value={coordinateY} className={errorCoordY? "w-sm border-3 rounded-md border-red-500 text-black px-2 placeholder-gray-400":"w-sm border-2 rounded-md border-black text-black px-2 placeholder-gray-400"} onChange={(e) => { setCoordinateY(e.target.valueAsNumber) }} onBlur={() => {
                    if (isNaN(coordinateY)) {
                      setCoordinateY(0)
                    } else {
                      if (!Number.isInteger(coordinateY) || coordinateY < 0) {
                        setErrorCoordY(true)
                      }else{
                        setErrorCoordY(false)
                      }

                    }
                  }}/>
              <p className={errorCoordY? "text-xs h-4 text-red-500":"hidden text-xs h-4 text-red-500"}>A coordenada Y deve ser inteira e maior que zero</p>
            </div>
          </div>
          <div className="flex w-full px-[10vw] justify-around items-center my-[6vh]">
            <div className="w-md flex items-center justify-center">
              <button className={"bg-red-700 w-[7vw] h-8 rounded-lg font-bold text-white cursor-pointer"} onClick={() => {
                cancelCreate()
              }}>Cancelar</button>
            </div>
            <div className="w-md flex items-center justify-center">
              <button className={"bg-sky-800 w-[7vw] h-8 rounded-lg font-bold text-white cursor-pointer"} onClick={() => {
                cadastrar()
              }}>Cadastrar</button>
            </div>
          </div>
        </div>
        <div className={select === "Near" ? "ml-[1.7vw] w-full h-auto my-4 grid grid-cols-4" : "hidden ml-[1.7vw] w-full h-5 bg-amber-300"}>
          <div className="flex flex-col w-full px-2">
            <p className="text-black px-2">Coordernada X</p>
            <input type={"number"} placeholder={"Insira a posição X"} value={nearCoordX} className="w-full border-2 rounded-md border-black text-black px-2 placeholder-gray-400" onChange={(e) => { setNearCoordX(e.target.valueAsNumber) }} onBlur={() => {
                    if (isNaN(nearCoordX)) {
                      setCoordinateY(0)
                    } else {
                      if (!Number.isInteger(nearCoordX) && nearCoordX < 0) {
                        alert("Favor informar o valor da coordenada Y \nEste valor deve ser inteiro e maior que 0")
                      } else {
                        if (!Number.isInteger(nearCoordX)) {
                          alert("Favor informar o valor da coordenada Y \nEste valor deve ser inteiro")
                        }
                        if (nearCoordX < 0) {
                          alert("Favor informar o valor da coordenada Y \nEste valor deve ser maior que 0")
                        }
                      }
                    }
                  }}/>
          </div>
          <div className="flex flex-col w-full px-2">
            <p className="text-black px-2">Coordernada Y</p>
            <input type={"number"} placeholder={"Insira a posição Y"} value={nearCoordY} className="w-full border-2 rounded-md border-black text-black px-2 placeholder-gray-400" onChange={(e) => { setNearCoordY(e.target.valueAsNumber) }} onBlur={() => {
                    if (isNaN(nearCoordY)) {
                      setCoordinateY(0)
                    } else {
                      if (!Number.isInteger(nearCoordY) && nearCoordY < 0) {
                        alert("Favor informar o valor da coordenada Y \nEste valor deve ser inteiro e maior que 0")
                      } else {
                        if (!Number.isInteger(nearCoordY)) {
                          alert("Favor informar o valor da coordenada Y \nEste valor deve ser inteiro")
                        }
                        if (nearCoordY < 0) {
                          alert("Favor informar o valor da coordenada Y \nEste valor deve ser maior que 0")
                        }
                      }
                    }
                  }}/>
          </div>
          <div className="flex flex-col w-full px-2">
            <p className="text-black px-2">Distancia</p>
            <input type={"number"} placeholder={"Insira a distância"} value={distance} className="w-full border-2 rounded-md border-black text-black px-2 placeholder-gray-400" onChange={(e) => { setDistance(e.target.valueAsNumber) }} onBlur={() => {
                    if (isNaN(distance)) {
                      setCoordinateY(0)
                    } else {
                      if (!Number.isInteger(distance) && distance < 0) {
                        alert("Favor informar o valor da coordenada Y \nEste valor deve ser inteiro e maior que 0")
                      } else {
                        if (!Number.isInteger(distance)) {
                          alert("Favor informar o valor da coordenada Y \nEste valor deve ser inteiro")
                        }
                        if (distance < 0) {
                          alert("Favor informar o valor da coordenada Y \nEste valor deve ser maior que 0")
                        }
                      }
                    }
                  }}/>
          </div>
          <div className="flex justify-center items-center w-full">
            <button className=" bg-sky-800 w-[7vw] h-8 rounded-lg font-bold text-white cursor-pointer" onClick={() => {
              if (isNaN(distance) || distance<0 || !Number.isInteger(distance) || isNaN(nearCoordY) || nearCoordY<0 || !Number.isInteger(nearCoordY) || isNaN(nearCoordX) || nearCoordX<0 || !Number.isInteger(nearCoordX)) {
                alert("Necessário informar Coodenadas X, Y e a distância \nTodos os valores tem de ser inteiro e maior que 0")
              } else {
                console.log("entrou no near")
                getNear()
              }
            }}>Buscar</button>
          </div>
        </div>
        {teste()}
        <Modal
          open={editModal}
          onClose={() => {
            cancelEdit()
            setEditModal(!editModal)
          }}
        >
          <div className="absolute top-1/4 left-3/10 w-2/5 h-1/2 bg-gray-100 border-sky-950 border-4 rounded-2xl shadow-2xl flex flex-col justify-around">

            <div className="flex w-full px-3 justify-around items-center m-2">
              <h1 className="text-2xl font-bold text-sky-950">Editar Ponto de Interesse</h1>
            </div>
            <div>
              <div className="flex w-full px-3 justify-between items-center m-2">
                <div className="flex w-1/2">
                  <p className="text-sky-950 font-bold">ID:</p>
                  <p className="text-sky-950 font-bold px-2">{id}</p>
                </div>
                <div className="flex w-1/2">
                  <p className="text-sky-950 font-bold">Inserido em:</p>
                  <p className="text-sky-950 font-bold px-2">{createAt}</p>
                </div>
              </div>
              <div className="flex w-full px-3 justify-around items-center my-2">
                <div className="flex flex-col w-2/3">
                  <p className={errorName?"text-red-500 font-bold px-2":"text-sky-950 font-bold px-2"}>Nome</p>
                  <input type={"text"} disabled={!edit} placeholder={"Insira a nome do ponto"} value={name} className={edit ? errorName? "w-full border-4 rounded-md border-red-500 text-black px-2 placeholder-gray-400":"w-full border-2 rounded-md border-sky-950 text-black px-2 placeholder-gray-400" :"w-full border-2 bg-gray-300 rounded-md border-black text-gray-600 px-2 placeholder-gray-400"} onChange={(e) => { setName(e.target.value) }} onBlur={() => {
                    if (name.length < 3 || name.length > 255) {
                      setErrorName(true)
                    }else{
                      setErrorName(false)
                    }
                  }} />
                  <p className={errorName? "text-xs h-4 text-red-500":"hidden text-xs h-4 text-red-500"}>O campo nome deve ter entre 3 a 255 caracteres</p>
                </div>
                <div className="flex flex-col w-1/3 items-center justify-center">
                  <label className="text-sky-950 font-bold px-2">Ativo</label>
                  <Checkbox sx={edit ? { color: indigo[900], '&.Mui-checked': { color: green[800] } } : { color: grey[600], '&.Mui-checked': { color: grey[600] } }} disabled={!edit} checked={check} onChange={() => setCheck(!check)} />
                  {/* <input type={"checkbox"} value={active} className="bg-sky-950"  onChange={(e) => { setActive(e.target.checked ? 0:1) }} /> */}
                </div>
              </div>
              <div className="flex w-full justify-around items-center my-2">
                <div className="flex flex-col w-1/2 px-3">
                  <p className={errorCoordX?"text-red-500 font-bold px-2":"text-sky-950 font-bold px-2"}>Coordernada X</p>
                  <input type={"number"} disabled={!edit} placeholder={"Insira a posição X"} value={coordinateX} className={edit ? errorCoordX? "w-full border-4 rounded-md border-red-500 text-black px-2 placeholder-gray-400":"w-full border-2 rounded-md border-sky-950 text-black px-2 placeholder-gray-400" : "w-full border-2 bg-gray-300 rounded-md border-black text-gray-600 px-2 placeholder-gray-400"} onChange={(e) => { setCoordinateX(e.target.valueAsNumber) }} onBlur={() => {
                    if (isNaN(coordinateX)) {
                      setCoordinateX(0)
                    } else {
                      if (!Number.isInteger(coordinateX) || coordinateX < 0) {
                        setErrorCoordX(true)
                      }
                      else{
                        setErrorCoordX(false)
                      }
                    }
                  }} />
                  <p className={errorCoordX? "text-xs h-4 text-red-500":"hidden text-xs h-4 text-red-500"}>A coordenada X deve ser inteira e maior que zero</p>
                </div>
                <div className="flex flex-col w-1/2 px-3">
                  <p className={errorCoordY?"text-red-500 font-bold px-2":"text-sky-950 font-bold px-2"}>Coordernada Y</p>
                  <input type={"number"} disabled={!edit} placeholder={"Insira a posição Y"} value={coordinateY} className={edit ? errorCoordY? "w-full border-4 rounded-md border-red-500 text-black px-2 placeholder-gray-400":"w-full border-2 rounded-md border-sky-950 text-black px-2 placeholder-gray-400" : "w-full border-2 bg-gray-300 rounded-md border-black text-gray-600 px-2 placeholder-gray-400"} onChange={(e) => { setCoordinateY(e.target.valueAsNumber) }} onBlur={() => {
                    if (isNaN(coordinateY)) {
                      setCoordinateY(0)
                    } else {
                      if (!Number.isInteger(coordinateY) || coordinateY < 0) {
                        setErrorCoordY(true)
                      }else{
                        setErrorCoordY(false)
                      }

                    }
                  }}/>
              <p className={errorCoordY? "text-xs h-4 text-red-500":"hidden text-xs h-4 text-red-500"}>A coordenada Y deve ser inteira e maior que zero</p>
                </div>
              </div>
            </div>
            <div className="w-full flex py-3 mb-2">
              <div className="w-1/2 flex items-center justify-center">
                <button className={edit ? "bg-red-700 w-[7vw] h-8 rounded-lg font-bold text-white cursor-pointer" : "hidden"} onClick={() => {
                  setEditModal(false)
                  setCancelEditModal(true)
                }}>Cancelar</button>
              </div>
              <div className="w-1/2 flex items-center justify-center">
                <button className={!edit ? "bg-sky-800 w-[7vw] h-8 rounded-lg font-bold text-white cursor-pointer" : "hidden"} onClick={() => setEdit(true)}>Editar</button>
                <button className={edit ? "bg-sky-800 w-[7vw] h-8 rounded-lg font-bold text-white cursor-pointer" : "hidden"} onClick={() => saveEdit()}>Salvar</button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={cancelEditModal}
          onClose={() => setCancelEditModal(!cancelEditModal)}
        >
          <div className="absolute top-30/100 left-32/100 w-2/6 h-1/4 bg-gray-100 border-sky-950 border-4 rounded-2xl shadow-2xl flex flex-col justify-around">
            <div className="flex w-full px-3 justify-around items-center m-2">
              <h1 className="text-2xl font-bold text-sky-950">Deseja realmente cancelar a edição?</h1>
            </div>
            <div className="w-full flex py-3 mb-2">
              <div className="w-1/2 flex items-center justify-center">
                <button className={edit ? "bg-red-700 w-[7vw] h-8 rounded-lg font-bold text-white cursor-pointer" : "hidden"} onClick={() => {
                  setCancelEditModal(false)
                  setEditModal(true)
                }}>Não</button>
              </div>
              <div className="w-1/2 flex items-center justify-center">
                <button className={"bg-sky-800 w-[7vw] h-8 rounded-lg font-bold text-white cursor-pointer"} onClick={() => {
                  cancelEdit()
                  setCancelEditModal(false)
                }}>Sim</button>
              </div>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}

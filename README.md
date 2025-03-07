# NexPoint-docker
##### Por Gabriel Moreno Medeiros

### O que é a NexPoint?
O NexPoint é uma plataforma de criação e pesquisa de pontos de interesse baseando-se em uma coordenada simples (Números inteiros e positivos), onde através desses dados mais a distância que deseja percorrer será apresentado os pontos de interesse que se encontram nesse raio. Vale lembrar que como é uma aplicação meramente acadêmica não foi utilizado nenhuma estrutura de validação de acesso ou complexidade excessiva.

### Qual o objetivo do projeto?
O NexPoint é uma aplicação teste de unificação do **FrontEnd**, **BackEnd** e **Database** MySQL com o intuito de aprendizado e melhoria das capacidades de integração, facilitando a utilização dos componentes por meio de **Docker**.

# Índice

1. [Testar](https://github.com/ielmoreno/NexPoint-Docker/blob/main/README.md#Testar)
2. [FrontEnd](https://github.com/ielmoreno/NexPoint-Docker/blob/main/README.md#FrontEnd)
3. [Prints](https://github.com/ielmoreno/NexPoint-Docker/blob/main/README.md#Prints)
4. [BackEnd](https://github.com/ielmoreno/NexPoint-Docker/blob/main/README.md#BackEnd)

## Testar

Caso tenha ficado interessado em realizar algum teste de usabilidade para entender melhor o conceito tanto da unificação por meio da Docker quanto do NexPoint e suas funcionalidades, te convido a testar os componentes.

### Como faço para testar?
Na realidade é bem simples, basta baixar este repositório em um computador que já tenha a Docker previamente instalada (Caso não tenha é só [baixar aqui](https://www.docker.com)) e rodar o comando a baixo que a própria ferramenta se incumbe de montar, instalar e buildar o projeto já com uma base teste.

#### Comando para build da docker:

```
docker-compose up --build
```

Após o termino da build, será necessário somente acessar o local para visualizar o FrontEnd funcional através do seguinte endereço:

```
http://localhost:3000
```

## FrontEnd

O FrontEnd foi desenvolvido utilizando Next.JS com TypeScript + Tailwinds.css.

Foi estruturado de forma simples para atender aos requisitos mínimos de um ***CRUD***, sendo assim não foi utilizado nenhuma estrutura de roteamento para outras páginas, sendo assim sobrando somente uma estrutura de estados para que fosse apresentado o conteúdo.

## Prints

#### Tela inicial
![Image](https://github.com/user-attachments/assets/fe97b541-48e9-4128-825a-8751958d5d86)

#### Tela de cadastro
![Image](https://github.com/user-attachments/assets/a973f9e8-2218-44bf-a4a2-f945c3a34a57)

#### Tela de busca por proximidade
![Image](https://github.com/user-attachments/assets/034e5783-609d-4e99-8f40-a334c4f78c29)

#### Modal de edição
![Image](https://github.com/user-attachments/assets/0f29f70c-a92e-42ca-ae9f-cfa2d0d71029)

## BackEnd

Para a estrutura de BackEnd, foi utilizado o Node.JS com Express para a criação de uma ***API REST***, onde os dados são validados através da biblioteca ***ZOD*** e se comunica com o banco de dados através do *ORM* **PRISMA**.

Para a estruturação dos arquivos foi adotado uma arquitetura onde cada *EndPoint* é alocado na pasta de sua rota, facilitando a organização e manutenção do código.

#### Estrutura de rotas

```TypeScript
router.post('/', createPoi)
router.get('/', poisList)
router.get('/near', poisByNear)
router.get('/ativo/:ativo', poisByActive)
router.get('/:id', poiById)
router.put('/:id', editPoi)
router.delete('/:id', deletePoi) 
```

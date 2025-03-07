# NexPoint-docker
##### Por Gabriel Moreno Medeiros

### O que é a NexPoint?
O NexPoint é uma plataforma de criação e pesquisa de pontos de interesse baseando-se em uma coordenada simples (Números inteiros e positivos), onde através desses dados mais a distância que deseja percorrer será apresentado os pontos de interesse que se encontram nesse raio. Vale lembrar que como é uma aplicação meramente acadêmica não foi utilizado nenhuma estrutura de validação de acesso ou complexidade excessiva.

### Qual o objetivo do projeto?
O NexPoint é uma aplicação teste de unificação do **FrontEnd**, **BackEnd** e **Database** MySQL com o intuito de aprendizado e melhoria das capacidades de integração, facilitando a utilização dos componentes por meio de **Docker**.

# Índice

1. [Testar](https://github.com/ielmoreno/NexPoint-Docker.git/README.md#testar)
2. [FrontEnd](https://github.com/ielmoreno/NexPoint-Docker.git/README.md#frontend)

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


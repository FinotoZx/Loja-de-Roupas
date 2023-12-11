//importando o fastify
import { fastify } from 'fastify'
//importanto database memory
import { DatabaseMemory } from './database-memory.js'
const database = new DatabaseMemory()
//criando nosso servidor
const server = fastify()
// criando uma calca
server.post('/calca', (resquest, reply) => {
    const {tamanho, tecido, cor} = resquest.body

    database.create({
        tamanho: tamanho,
        tecido: tecido,
        cor: cor,
    })
    //vamos listar ele
    console.log(database.list())
    //retomando o status da rota
    return reply.status(201).send()
})
// ler calcas cadastradas
server.get('/calca', (resquest) => {
    const search = resquest.query.search
    console.log(search)
    //return 'Ler'
    //acessando database
    const calca = database.list(search)
    //console.log(calca)
    //retomando calca
    return calca
})
//atualizar calças, lembre-se de passar o Route Parameter
server.put('/calca/:id', (request, reply) => {
    //return 'Atualizar!'
    //passando id da calca
    const calcaId = request.params.id
    //passando o restante dos atributos
    const {tamanho, tecido, cor} = request.body
    const calca = database.update(calcaId, {
        tecido: tecido,
        tamanho: tamanho,
        cor:cor,
    })
    return reply.status(204).send()
})
// apagar uma calça, lembre-se de passar o Route Parameter
server.delete('/calca/:id', (request, reply) => {
    const calcaId = request.params.id
    database.delete(calcaId)
    return reply.status(204).send()
})
//passando a porta com objecto
server.listen({
    port: 3333,
})
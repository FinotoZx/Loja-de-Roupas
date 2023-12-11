//importando randomUUID
import { randomUUID } from "node:crypto"
export class DatabaseMemory{
    #calca = new Map()

    list(search){
        return Array.from(this.#calca.entries()).map((calcaArray) => {
            const id = calcaArray[0]

            const data = calcaArray[1]

            return{
                id,
                ...data,
            }
        })
        .filter(calca => {
            if(search) {
                return calca.tamanho.includes(search)
            }
            return true
        })
    }
    //criando livro
    create(calca){
        const calcaId = randomUUID()
        this.#calca.set(calcaId, calca)
    }
    update(id, calca){
        this.#calca.set(id, calca)
    }
    delete(id){
        this.#calca.delete(id)
    }
}
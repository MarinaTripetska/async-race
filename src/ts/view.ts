import { StoreI } from './interfaces/storeI'
import { garageView, header, pagination, winnersView } from './templates'

class View {
    store: StoreI
    root: HTMLDivElement

    constructor(store: StoreI) {
        this.store = { ...store }
        this.root = document.createElement('div')
        this.root.classList.add('container')
    }

    render = async () => {
        const html = `
            ${header()}
            <div class="wrapper">
                ${garageView(this.store)}
                ${winnersView(this.store)}
            </div>
            ${pagination()}
            `

        this.root.innerHTML = html
        document.body.append(this.root)
    }
}

export default View

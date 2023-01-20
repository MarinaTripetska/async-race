import { StoreI } from '../interfaces/storeI'
import { winnersContent } from './winnersContent'

export const winnersView = (store: StoreI) => {
    return `<div id="winners-view" >
                ${winnersContent(store)}
            </div>`
}

import { StoreI } from '../interfaces/storeI'

export const winnersView = (store: StoreI) => {
    return `<div id="winners-view" >

                {renderWinners(stor)}

            </div>`
}

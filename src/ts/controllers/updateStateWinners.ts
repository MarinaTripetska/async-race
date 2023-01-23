import API from '../api'
import { StoreI, WinnerAndCarI } from '../interfaces'

export const updateStateWinners = async (store: StoreI) => {
    const { winnersPage, limit, sortBy, sortOrder } = store
    const { items, totalCount } = await API.getWinners(winnersPage, limit, sortBy, sortOrder)

    store.winners = <WinnerAndCarI[]>items
    store.winnersCount = totalCount

    // ;(<HTMLInputElement>document.getElementById('next')).disabled = !(
    //     store.winnersPage * Limits.WinnersOnPage <
    //     store.winnersCount
    // )
    // ;(<HTMLInputElement>document.getElementById('prev')).disabled = !(store.winnersPage > 1)
}

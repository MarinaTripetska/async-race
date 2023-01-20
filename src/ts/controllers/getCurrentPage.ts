import { Limits, StoreI } from '../interfaces'

export const getCurrentPage = ({
    // isRace,
    view,
    carsPage,
    carsCount,
    winnersCount,
    winnersPage,
}: StoreI) => {
    // if (!isRace) {
    const isGarage = view === 'garage'
    const countOnPage = isGarage ? Limits.CarsOnPage : Limits.WinnersOnPage
    const countItems = isGarage ? carsCount : winnersCount
    const pageNum = isGarage ? carsPage : winnersPage

    ;(<HTMLInputElement>document.getElementById('next')).disabled = !(
        pageNum * countOnPage <
        countItems
    )
    ;(<HTMLInputElement>document.getElementById('prev')).disabled = !(pageNum > 1)
    // }
}

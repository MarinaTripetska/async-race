import { GetCarsI, GetWinnersI, Limits, StoreI } from './interfaces'
import Listener from './listener'
import View from './view'

class App {
    store: StoreI

    view: View

    listener: Listener

    constructor(cars: GetCarsI, winners: GetWinnersI) {
        this.store = {
            carsPage: 1,
            cars: cars.items,
            carsCount: cars.totalCount,
            animation: {},
            winnersPage: 1,
            winners: winners.items,
            winnersCount: winners.totalCount,
            view: 'garage',
            sortBy: 'id',
            sortOrder: 'ASC',
            limit: Limits.CarsOnPage,
            isRace: false,
        }
        this.view = new View(this.store)
        this.listener = new Listener(this.store)
    }

    async start() {
        this.view.render()
        this.listener.addEventListeners()
        // ?
        // window.addEventListener('click', () => console.log(this.store))
        // ?
    }
}

export default App

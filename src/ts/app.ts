import { GetCarsI, GetWinnersI } from './interfaces/apiInterface'
import { StoreI } from './interfaces/storeI'

class App {
    store: StoreI

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
            limit: 10,
            isRace: false,
        }
    }

    async start() {
        // render
        // listeners => controllers inside
    }
}

export default App

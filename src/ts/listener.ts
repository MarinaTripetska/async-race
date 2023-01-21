import GarageActions from './actions/garageActions'
import NavigationActions from './actions/navigationActions'
import { StoreI } from './interfaces'

class Listener {
    private store: StoreI

    private nav: NavigationActions

    private garage: GarageActions

    constructor(store: StoreI) {
        this.store = store
        this.nav = new NavigationActions(this.store)
        this.garage = new GarageActions(this.store)
    }

    public addEventListeners() {
        this.nav.addListeners()
        this.garage.addListeners()
    }
}

export default Listener

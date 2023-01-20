import NavigationActions from './actions/navigationActions'
import { StoreI } from './interfaces'

class Listener {
    private store: StoreI

    private nav: NavigationActions

    constructor(store: StoreI) {
        this.store = store
        this.nav = new NavigationActions(this.store)
    }

    public addEventListeners() {
        this.nav.addListeners()
    }
}

export default Listener

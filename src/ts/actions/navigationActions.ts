import { getCurrentPage, updateStateWinners } from '../controllers'
import { StoreI, NavTargets } from '../interfaces'
import { winnersContent } from '../templates'

class NavigationActions {
    private store: StoreI

    constructor(store: StoreI) {
        this.store = store
    }

    public addListeners() {
        const garageBtn = <HTMLButtonElement>document.querySelector(`#${NavTargets.GARAGE}`)
        const winnersBtn = <HTMLButtonElement>document.querySelector(`#${NavTargets.WINNERS}`)

        garageBtn.addEventListener('click', this.onGarageClick)
        winnersBtn.addEventListener('click', this.onWinnersClick)
    }

    private onGarageClick = () => {
        this.store.view = 'garage'
        ;(<HTMLElement>document.getElementById('garage-view')).style.order = '-1'
        ;(<HTMLElement>document.getElementById('winners-view')).style.order = ''
        getCurrentPage(this.store)
        ;(<HTMLElement>document.querySelector('.message-wrap')).style.display = 'block'
    }

    private onWinnersClick = async () => {
        this.store.view = 'winners'
        ;(<HTMLElement>document.querySelector('.message-wrap')).style.display = 'none'
        ;(<HTMLElement>document.getElementById('garage-view')).style.order = ''
        ;(<HTMLElement>document.getElementById('winners-view')).style.order = '-1'
        await updateStateWinners(this.store)
        getCurrentPage(this.store)
        ;(<HTMLElement>document.getElementById('winners-view')).innerHTML = winnersContent(
            this.store
        )
    }
}

export default NavigationActions

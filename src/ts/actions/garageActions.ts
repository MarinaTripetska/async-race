import API from '../api'
import { startDriving, stopDriving } from '../controllers'
import { GarageTargets, StoreI } from '../interfaces'

class GarageActions {
    private store: StoreI

    constructor(store: StoreI) {
        this.store = store
    }

    public addListeners() {
        const startBtnList = <NodeListOf<HTMLButtonElement>>(
            document.querySelectorAll(`.${GarageTargets.START}`)
        )
        const stopBtnList = <NodeListOf<HTMLButtonElement>>(
            document.querySelectorAll(`.${GarageTargets.STOP}`)
        )

        startBtnList.forEach((el) => {
            el.addEventListener('click', this.onStartClick)
        })
        stopBtnList.forEach((el) => {
            el.addEventListener('click', this.onStopClick)
        })
    }

    private async onStartClick(e: MouseEvent) {
        const id = +(<HTMLElement>e.target).id.split('start-engine-car-')[1]
        await startDriving(id)
        console.log('start')
    }

    private async onStopClick(e: MouseEvent) {
        const id = +(<HTMLElement>e.target).id.split('stop-engine-car-')[1]
        console.log(id)
        await stopDriving(id)
        console.log('stop')
    }
}

export default GarageActions

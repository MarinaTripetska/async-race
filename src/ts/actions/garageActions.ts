import API from '../api'
import { startDriving, stopDriving } from '../controllers'
import { CarI, StoreI } from '../interfaces'
import utils from '../utils'

class GarageActions {
    private store: StoreI
    selectedCar: null | CarI

    constructor(store: StoreI) {
        this.store = store
        this.selectedCar = null
    }

    public addListeners() {
        const { startBtnList, stopBtnList, selectCarBtnList } = utils.findCarListsButtons()

        startBtnList.forEach((el) => {
            el.addEventListener('click', this.onStartClick)
        })
        stopBtnList.forEach((el) => {
            el.addEventListener('click', this.onStopClick)
        })
        selectCarBtnList.forEach((el) => {
            el.addEventListener('click', this.onSelectCarClick)
        })
    }

    private async onStartClick(e: MouseEvent) {
        const id = +(<HTMLElement>e.target).id.split('start-engine-car-')[1]
        await startDriving(id)
    }

    private async onStopClick(e: MouseEvent) {
        const id = +(<HTMLElement>e.target).id.split('stop-engine-car-')[1]
        await stopDriving(id)
    }

    private async onSelectCarClick(e: MouseEvent) {
        const targetBtn = <HTMLElement>e.target
        const currentCarId = +targetBtn.id.split('select-cars')[1]
        const { nameEl, colorEl, submitEl } = utils.findUpdateFormEl()

        this.selectedCar = await API.getCar(currentCarId)

        if (this.selectedCar) {
            nameEl.value = this.selectedCar.name
            colorEl.value = this.selectedCar.color
            nameEl.disabled = false
            colorEl.disabled = false
            submitEl.disabled = false
        }
    }
}

export default GarageActions

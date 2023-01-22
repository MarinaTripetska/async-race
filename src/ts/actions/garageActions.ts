import API from '../api'
import { startDriving, stopDriving, updateStateGarage } from '../controllers'
import { CarI, GarageTotalTargets, StoreI } from '../interfaces'
import utils from '../utils'

class GarageActions {
    private store: StoreI
    private selectedCar: null | CarI

    constructor(store: StoreI) {
        this.store = store
        this.selectedCar = null
    }

    public addListeners() {
        const { startBtnList, stopBtnList, selectCarBtnList, deleteCarBtnList } =
            utils.findCarListsButtons()

        startBtnList.forEach((el) => {
            el.addEventListener('click', this.onStartClick)
        })
        stopBtnList.forEach((el) => {
            el.addEventListener('click', this.onStopClick)
        })
        selectCarBtnList.forEach((el) => {
            el.addEventListener('click', this.onSelectCarClick)
        })
        deleteCarBtnList.forEach((el) => {
            el.addEventListener('click', (e: MouseEvent) => this.onDeleteCarClick(e, this.store))
        })
    }

    private async onStartClick(e: MouseEvent) {
        const id = utils.getCarIdFromElement(<HTMLElement>e.target, 'start-engine-car-')
        await startDriving(id)
    }

    private async onStopClick(e: MouseEvent) {
        const id = utils.getCarIdFromElement(<HTMLElement>e.target, 'stop-engine-car-')
        await stopDriving(id)
    }

    private async onSelectCarClick(e: MouseEvent) {
        const targetBtn = <HTMLElement>e.target
        targetBtn.textContent = `Loading...`
        const currentCarId = utils.getCarIdFromElement(targetBtn, 'select-car-')
        const { nameEl, colorEl, submitEl } = utils.findUpdateFormEl()

        this.selectedCar = await API.getCar(currentCarId)

        if (this.selectedCar) {
            targetBtn.textContent = `Select`
            nameEl.value = this.selectedCar.name
            colorEl.value = this.selectedCar.color
            nameEl.disabled = false
            colorEl.disabled = false
            submitEl.disabled = false
        }
    }

    private async onDeleteCarClick(e: MouseEvent, store: StoreI) {
        const targetBtn = <HTMLElement>e.target
        targetBtn.textContent = `Loading...`
        const id = +targetBtn.id.split('remove-car-')[1]
        const carEl = <HTMLElement>document.getElementById(`car-item${id}`)
        const totalCountEl = <HTMLElement>(
            document.getElementById(`${GarageTotalTargets.TotalCount}`)
        )

        await API.deleteCar(id)
        await API.deleteWinner(id)
        await updateStateGarage(store)

        totalCountEl.textContent = `Garage (${store.carsCount} cars)`
        carEl.remove()
    }
}

export default GarageActions

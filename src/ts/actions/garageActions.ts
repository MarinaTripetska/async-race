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
        const { generatorBtn, raceBtn, resetBtn } = utils.findRaceControlsButtons()

        startBtnList.forEach((el) => {
            el.addEventListener('click', this.onStartClick)
        })
        stopBtnList.forEach((el) => {
            el.addEventListener('click', this.onStopClick)
        })
        selectCarBtnList.forEach((el) => {
            el.addEventListener('click', this.onSelectClick)
        })
        deleteCarBtnList.forEach((el) => {
            el.addEventListener('click', (e) => this.onDeleteClick(e, this.store))
        })
        generatorBtn.addEventListener('click', (e) => this.onGeneratorClick(e, this.store))
    }

    private async onStartClick(e: MouseEvent) {
        const id = utils.getCarIdFromElement(<HTMLElement>e.target, 'start-engine-car-')
        await startDriving(id)
    }

    private async onStopClick(e: MouseEvent) {
        const id = utils.getCarIdFromElement(<HTMLElement>e.target, 'stop-engine-car-')
        await stopDriving(id)
    }

    private async onSelectClick(e: MouseEvent) {
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

    private async onDeleteClick(e: MouseEvent, store: StoreI) {
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

    private async onGeneratorClick(e: MouseEvent, store: StoreI) {
        const targetBtn = <HTMLButtonElement>e.target
        const totalCountEl = <HTMLElement>(
            document.getElementById(`${GarageTotalTargets.TotalCount}`)
        )

        targetBtn.textContent = `Generating cars...`
        targetBtn.disabled = true

        const cars = utils.generateRandomCars()

        await Promise.all(cars.map(async (car) => await API.createCar(car)))
        await updateStateGarage(store)
        const { items, totalCount } = await API.getCars(1)

        this.store.cars = items
        this.store.carsCount = totalCount

        targetBtn.textContent = `Generate cars`
        targetBtn.disabled = false
        totalCountEl.textContent = `Garage (${store.carsCount} cars)`
    }
}

export default GarageActions

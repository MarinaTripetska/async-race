import API from '../api'
import { startDriving, stopDriving, updateStateGarage, updateStateWinners } from '../controllers'
import { CarI, GarageTotalTargets, StoreI } from '../interfaces'
import { carList } from '../templates/carList'
import utils from '../utils'

class GarageActions {
    private store: StoreI
    private selectedCar: null | CarI

    constructor(store: StoreI) {
        this.store = store
        this.selectedCar = null
    }

    public addListeners() {
        this.addListenersOnCarItem()

        const { generatorBtn, raceBtn, resetBtn } = utils.findRaceControlsButtons()
        generatorBtn.addEventListener('click', (e) => this.onGeneratorClick(e))
        raceBtn.addEventListener('click', (e) => this.onRaceClick(e))
    }

    private addListenersOnCarItem = () => {
        const [startBtnList, stopBtnList, selectCarBtnList, deleteCarBtnList] =
            utils.findCarListsButtons()

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
            el.addEventListener('click', (e) => this.onDeleteClick(e))
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

    private async onDeleteClick(e: MouseEvent) {
        const targetBtn = <HTMLElement>e.target
        targetBtn.textContent = `Loading...`
        const id = +targetBtn.id.split('remove-car-')[1]
        const totalCountEl = <HTMLElement>(
            document.getElementById(`${GarageTotalTargets.TotalCount}`)
        )
        const carsListEl = <HTMLElement>document.getElementById(`${GarageTotalTargets.GarageList}`)

        await API.deleteCar(id)
        const isCarInWinners = this.store.winners.find((el) => el.id === id)
        if (isCarInWinners) {
            await API.deleteWinner(id)
        }

        await updateStateGarage(this.store)

        totalCountEl.textContent = `Garage (${this.store.carsCount} cars)`
        carsListEl.innerHTML = carList(this.store.cars)
        this.addListenersOnCarItem()
    }

    private async onGeneratorClick(e: MouseEvent) {
        const targetBtn = <HTMLButtonElement>e.target
        const totalCountEl = <HTMLElement>(
            document.getElementById(`${GarageTotalTargets.TotalCount}`)
        )
        const carsListEl = <HTMLElement>document.getElementById(`${GarageTotalTargets.GarageList}`)

        targetBtn.textContent = `Generating cars...`
        targetBtn.disabled = true

        const cars = utils.generateRandomCars()
        await Promise.all(cars.map(async (car) => await API.createCar(car)))
        await updateStateGarage(this.store)

        targetBtn.textContent = `Generate cars`
        targetBtn.disabled = false
        totalCountEl.textContent = `Garage (${this.store.carsCount} cars)`
        carsListEl.innerHTML = carList(this.store.cars)
        this.addListenersOnCarItem()
    }

    private async onRaceClick(e: MouseEvent) {
        const messageEl = <HTMLElement>document.getElementById(GarageTotalTargets.Message)
        const targetBtn = <HTMLButtonElement>e.target
        const carsListEl = <HTMLElement>document.getElementById(`${GarageTotalTargets.GarageList}`)

        targetBtn.disabled = true
        this.store.isRace = true

        utils.findCarListsButtons().forEach((list) => {
            list.forEach((el) => {
                el.disabled = true
            })
        })
        utils.findSubmitButtons().forEach((el) => {
            el.disabled = true
        })

        const promises = this.store.cars.map((car: CarI) => startDriving(car.id))
        const responses = await Promise.all(promises)
        const winner = responses
            .filter((el) => el.status === 200)
            .sort((a, b) => a.time - b.time)[0]
        await API.saveWinner(winner.id, winner.time)
        const winnerCar = await API.getCar(winner.id)
        await updateStateWinners(this.store)

        messageEl.innerHTML = `${winnerCar.name} went first (${utils.getTimeInSeconds(
            winner.time
        )}s)!`
        messageEl.classList.add('visible')
        utils.findSubmitButtons().forEach((el) => {
            el.disabled = false
        })
        targetBtn.disabled = false
        this.store.isRace = false

        setTimeout(() => {
            messageEl.classList.remove('visible')
            carsListEl.innerHTML = carList(this.store.cars)
            this.addListenersOnCarItem()
        }, 5000)
    }
}

export default GarageActions

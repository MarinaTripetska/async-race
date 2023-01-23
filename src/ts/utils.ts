import { marks, models } from './data'
import {
    GarageControlsTargets,
    GarageCreateTargets,
    GarageTargets,
    GarageUpdateTargets,
} from './interfaces'

const getTimeInSeconds = (milSec: number) => +(milSec / 1000).toFixed(2)

const getCarIdFromElement = (el: HTMLElement, targetName: string) => +el.id.split(targetName)[1]

const getSortOrder = (sort: string, order: string) => {
    if (sort && order) {
        return `&_sort=${sort}&_order=${order}`
    }
    return ''
}

const findCarElem = (id: number) => {
    const stopButton = <HTMLButtonElement>document.getElementById(`stop-engine-car-${id}`)
    const startButton = <HTMLButtonElement>document.getElementById(`start-engine-car-${id}`)
    const car = <HTMLElement>document.getElementById(`car-${id}`)

    return { car, startButton, stopButton }
}

const findUpdateFormEl = () => {
    const nameEl = <HTMLInputElement>document.getElementById(GarageUpdateTargets.NAME)
    const colorEl = <HTMLInputElement>document.getElementById(GarageUpdateTargets.COLOR)
    const submitEl = <HTMLButtonElement>document.getElementById(GarageUpdateTargets.SUBMIT)

    return {
        nameEl,
        colorEl,
        submitEl,
    }
}

const findCreateFormEl = () => {
    const nameEl = <HTMLInputElement>document.getElementById(GarageCreateTargets.NAME)
    const colorEl = <HTMLInputElement>document.getElementById(GarageCreateTargets.COLOR)
    const submitEl = <HTMLButtonElement>document.getElementById(GarageCreateTargets.SUBMIT)

    return {
        nameEl,
        colorEl,
        submitEl,
    }
}

const findSubmitButtons = () => {
    const submitCreateEl = <HTMLButtonElement>document.getElementById(GarageCreateTargets.SUBMIT)
    const submitUpdateEl = <HTMLButtonElement>document.getElementById(GarageUpdateTargets.SUBMIT)
    return [submitCreateEl, submitUpdateEl]
}

const findCarListsButtons = () => {
    const startBtnList = <NodeListOf<HTMLButtonElement>>(
        document.querySelectorAll(`.${GarageTargets.START}`)
    )
    const stopBtnList = <NodeListOf<HTMLButtonElement>>(
        document.querySelectorAll(`.${GarageTargets.STOP}`)
    )
    const selectCarBtnList = <NodeListOf<HTMLButtonElement>>(
        document.querySelectorAll(`.${GarageTargets.SELECT}`)
    )
    const deleteCarBtnList = <NodeListOf<HTMLButtonElement>>(
        document.querySelectorAll(`.${GarageTargets.REMOVE}`)
    )

    return [startBtnList, stopBtnList, selectCarBtnList, deleteCarBtnList]
}

const findRaceControlsButtons = () => {
    const generatorBtn = <HTMLButtonElement>(
        document.getElementById(`${GarageControlsTargets.GENERATE}`)
    )
    const raceBtn = <HTMLButtonElement>document.getElementById(`${GarageControlsTargets.RACE}`)
    const resetBtn = <HTMLButtonElement>document.getElementById(`${GarageControlsTargets.RESET}`)

    return {
        generatorBtn,
        raceBtn,
        resetBtn,
    }
}

const getRandomName = () => {
    const randomModel = models[Math.floor(Math.random() * models.length)]
    const randomName = marks[Math.floor(Math.random() * marks.length)]
    return `${randomModel} ${randomName}`
}

const getRandomColor = () => {
    const letters = '0123456789abcdef'
    let color: string = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)]
    }
    return color
}

const generateRandomCars = (count: number = 100) =>
    new Array(count).fill(1).map((_) => ({ name: getRandomName(), color: getRandomColor() }))

export default {
    getTimeInSeconds,
    getCarIdFromElement,
    getSortOrder,
    findCarElem,
    findUpdateFormEl,
    findCreateFormEl,
    findSubmitButtons,
    findCarListsButtons,
    findRaceControlsButtons,
    generateRandomCars,
}

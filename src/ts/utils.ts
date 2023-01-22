import { GarageTargets, GarageUpdateTargets } from './interfaces'

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

    return { startBtnList, stopBtnList, selectCarBtnList }
}

export default {
    getSortOrder,
    findCarElem,
    findUpdateFormEl,
    findCarListsButtons,
}

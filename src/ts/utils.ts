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

export default {
    getSortOrder,
    findCarElem,
}

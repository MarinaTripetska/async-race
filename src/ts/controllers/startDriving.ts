import API from '../api'
import utils from '../utils'

export const startDriving = async (id: number) => {
    const { car, startButton, stopButton } = utils.findCarElem(id)

    startButton.disabled = true
    startButton.classList.toggle('enabling', true)

    const { velocity, distance } = await API.startEngine(id)
    const time = Math.round(distance / velocity)

    startButton.classList.toggle('enabling', false)
    stopButton.disabled = false

    car.style.animationDuration = `${(time / 1000).toFixed(2)}s`
    car.classList.add('drive')

    const driveResp = await API.drive(id)
    const status = driveResp.status
    if (driveResp.status !== 200) {
        car.classList.add('crash')
    }

    return { status, id, time }
}

import API from '../api'
import utils from '../utils'

export const stopDriving = async (id: number) => {
    const { car, startButton, stopButton } = utils.findCarElem(id)

    stopButton.disabled = true
    stopButton.classList.toggle('enabling', true)

    await API.stopEngine(id)

    stopButton.classList.toggle('enabling', false)
    startButton.disabled = false

    car.classList.remove('crash')
    car.classList.remove('drive')
    car.style.animationPlayState = 'initial'
}

import App from './ts/app'
import './global.css'
import API from './ts/api'

const cars = await API.getCars()
const winners = await API.getWinners()

const app = new App(cars, winners)
app.start()

import { CarI } from '../interfaces'
import { carItem } from './carItem'

export const carList = (cars: CarI[]) => cars.map((car) => carItem(car, false)).join('')

import { CarI } from './carI'

export interface WinnerI {
    id: number
    wins: number
    time: number
}

export interface WinnerAndCar extends WinnerI {
    car: CarI[] | []
}

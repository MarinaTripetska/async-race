import { CarI } from './carI'

export interface WinnerI {
    id: number
    wins: number
    time: number
}

export interface WinnerAndCarI extends WinnerI {
    car: CarI
}

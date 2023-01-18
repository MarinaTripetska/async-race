import { CarI } from './carI'
import { WinnerAndCar } from './winnerI'

export interface GetCarsI {
    items: CarI[]
    totalCount: number
}

export interface GetWinnersI {
    items: WinnerAndCar[]
    totalCount: number
}

export interface DriveI {
    success: boolean
}

export interface StartStopI {
    velocity: number
    distance: number
}

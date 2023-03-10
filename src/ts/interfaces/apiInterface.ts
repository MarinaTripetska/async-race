import { CarI } from './carI'
import { WinnerAndCarI } from './winnerI'

export interface GetCarsI {
    items: CarI[]
    totalCount: number
}

export interface GetWinnersI {
    items: WinnerAndCarI[]
    totalCount: number
}

export interface DriveI {
    status: number
    data?: Promise<any>
}

export interface StartStopI {
    velocity: number
    distance: number
}

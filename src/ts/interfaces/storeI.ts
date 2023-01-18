import { CarI } from './carI'
import { WinnerAndCarI } from './winnerI'

export interface StoreI {
    carsPage: number
    cars: CarI[]
    carsCount: number
    winnersPage: number
    animation: {}
    winners: WinnerAndCarI[]
    winnersCount: number
    view: string
    sortBy: string
    sortOrder: string
    limit: number
    isRace: boolean
}

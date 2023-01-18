import { DriveI, GetCarsI, GetWinnersI, StartStopI } from './interfaces/apiInterface'
import { CarI } from './interfaces/carI'
import EngineStatus from './interfaces/engineStatus'
import { WinnerI } from './interfaces/winnerI'
import utils from './utils'

class API {
    protected static base = 'http://127.0.0.1:3000'

    protected static garage = `${API.base}/garage`

    protected static engine = `${API.base}/engine`

    protected static winners = `${API.base}/winners`

    static async getCars(page = 1, limit = 7): Promise<GetCarsI> {
        const resp = await fetch(`${API.garage}?_page=${page}&_limit=${limit}`)
        const items = await resp.json()
        const totalCount = Number(resp.headers.get('X-Total-Count'))
        return { items, totalCount }
    }

    static async getCar(id: number): Promise<CarI[] | []> {
        const resp = await fetch(`${API.garage}/?id=${id}`)
        return resp.json()
    }

    static async createCar(body: Pick<CarI, 'name' | 'color'>): Promise<CarI> {
        const resp = await fetch(API.garage, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return resp.json()
    }

    static async updateCar(id: number, body: Pick<CarI, 'name' | 'color'>): Promise<CarI> {
        const resp = await fetch(`${API.garage}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return resp.json()
    }

    static async deleteCar(id: number): Promise<{}> {
        const resp = await fetch(`${API.garage}/${id}`, { method: 'DELETE' })
        return resp.json()
    }

    static async getWinners(page = 1, limit = 10, sort = '', order = ''): Promise<GetWinnersI> {
        const resp = await fetch(
            `${API.winners}?_page=${page}&_limit=${limit}${utils.getSortOrder(sort, order)}`
        )
        const winners: WinnerI[] = await resp.json()
        const winnerAndCar = await Promise.all(
            winners.map(async (winner) => ({
                ...winner,
                car: await API.getCar(winner.id),
            }))
        )
        const totalCount = Number(resp.headers.get('X-Total-Count'))
        return {
            items: winnerAndCar,
            totalCount,
        }
    }

    static async getWinner(id: number): Promise<WinnerI> {
        const resp = await fetch(`${API.winners}/${id}`)
        return resp.json()
    }

    private static async getWinnerStatus(id: number) {
        const resp = await fetch(`${API.winners}/${id}`)
        return resp.status
    }

    private static async createWinner(body: WinnerI): Promise<WinnerI> {
        const resp = await fetch(API.winners, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return resp.json()
    }

    private static async updateWinner(
        id: number,
        body: Pick<WinnerI, 'wins' | 'time'>
    ): Promise<WinnerI> {
        const resp = await fetch(`${API.winners}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return resp.json()
    }

    static async saveWinner(id: number, time: number): Promise<WinnerI> {
        const winnerStatus = await API.getWinnerStatus(id)
        if (winnerStatus === 404) {
            return API.createWinner({
                id,
                wins: 1,
                time,
            })
        }
        const winner = await API.getWinner(id)
        return API.updateWinner(id, {
            wins: winner.wins + 1,
            time: time < winner.time ? time : winner.time,
        })
    }

    static async deleteWinner(id: number): Promise<{}> {
        const resp = await fetch(`${API.winners}/${id}`, { method: 'DELETE' })
        return resp.json()
    }

    static async startEngine(id: number): Promise<StartStopI> {
        const resp = await fetch(`${API.engine}?id=${id}&status=${EngineStatus.START}`, {
            method: 'PATCH',
        })
        return resp.json()
    }

    static async stopEngine(id: number): Promise<StartStopI> {
        const resp = await fetch(`${API.engine}?id=${id}?status=${EngineStatus.STOP}`, {
            method: 'PATCH',
        })
        return resp.json()
    }

    static async drive(id: number): Promise<DriveI> {
        const res = await fetch(`${API.engine}?id=${id}&status=${EngineStatus.DRIVE}`, {
            method: 'PATCH',
        })
        return res.json()
    }
}

export default API

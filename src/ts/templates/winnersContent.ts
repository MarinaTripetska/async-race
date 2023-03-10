import { StoreI } from '../interfaces/storeI'
import utils from '../utils'

export const winnersContent = ({
    winnersCount,
    winnersPage,
    sortBy,
    sortOrder,
    winners,
}: StoreI) => {
    return `<h1>Winners (${winnersCount})</h1>
            <p>Page #${winnersPage}</p>

                <table class='table' cellspacing="0" border="0" cellpadding="0">
                    <thead>
                        <th>Number</th>
                        <th>Car name</th>
                        <th class="table-button table-wins
                            ${sortBy === 'wins' ? sortOrder : ''}"
                            id="sort-by-wins">
                            Wins
                        </th>
                        <th class="table-button table-time
                            ${sortBy === 'time' ? sortOrder : ''}"
                            id="sort-by-time">
                            Best time
                        </th>
                    </thead>
                    <tbody>
                        ${winners
                            .map(
                                ({ car, wins, time }, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${car.name}</td>
                                <td>${wins}</td>
                                <td>${utils.getTimeInSeconds(time)}</td>
                            </tr>
                        `
                            )
                            .join('')}
                    </tbody>
                </table>`
}

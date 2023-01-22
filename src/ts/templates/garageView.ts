import { StoreI } from '../interfaces/storeI'
import { carItem } from './carItem'
import { carList } from './carList'
import { formCreateCar } from './formCreateCar'
import { formUpdateCar } from './formUpdateCar'
import { message } from './message'
import { raceControls } from './raceControls'

export const garageView = (store: StoreI) => {
    return `<div id="garage-view">
                <div>
                    ${formCreateCar()}
                    ${formUpdateCar()}
                 </div>

                ${raceControls()}

                <div id="garage">
                    <h1 id="garage-cars-count">Garage (${store.carsCount} cars)</h1>
                    <p>Page #${store.carsPage}</p>
                    <ul class="garage">
                    ${carList(store.cars)}
                    </ul>
                </div>
                ${message()}
            </div>`
}

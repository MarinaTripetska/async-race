import { StoreI } from '../interfaces/storeI'
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

                        {renderGarage(stor)}

                    </div>
                    ${message()}
                </div>`
}

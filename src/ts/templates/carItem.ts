import { CarI } from '../interfaces/carI'
import { carImage } from './carImage'

export const carItem = ({ id, name, color }: CarI, isEngineActive: boolean) => {
    return `<li id="car-item${id}">
                <div class="general-buttons">
                    <button type="button" class="select-button" id="select-car-${id}">Select</button>
                    <button type="button" class="remove-button" id="remove-car-${id}">Remove</button>
                </div>

                <h3 class="car-name">${name}</h3>

                <div class="road">
                    <div class="launch-pad">
                        <div class="control-panel">
                            <button type="button"
                                    class="icon start-engine-button"
                                    id="start-engine-car-${id}"
                                    ${isEngineActive ? 'disabled' : ''}>
                                    A
                            </button>
                            <button type="button"
                                    class="icon stop-engine-button"
                                    id="stop-engine-car-${id}"
                                    ${!isEngineActive ? 'disabled' : ''}>
                                    B
                            </button>
                        </div>

                        <div class="car" id="car-${id}">
                            ${carImage(color)}
                        </div>
                    </div>

                    <div class="flag" id="flag-${id}">&#9873;</div>
                </div>
            </li>
    `
}

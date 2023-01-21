import API from '../api'
import { StoreI } from '../interfaces'

export const updateStateGarage = async (store: StoreI) => {
    const { items, totalCount } = await API.getCars(store.carsPage)
    store.cars = items
    store.carsCount = totalCount
    // (<HTMLInputElement>document.getElementById('next')).disabled = !(
    //       st.carsPage * 7 <
    //       st.carsCount
    //   )
    //   ;(<HTMLInputElement>document.getElementById('prev')).disabled = !(st.carsPage > 1)
}

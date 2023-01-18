export const formUpdateCar = () => {
    return `<form class="form" id="update">
                <input class="input" type="text" name="name" id="update-name" disabled>
                <input class="input" type="color" value="#ffffff" name="color" id="update-color" disabled>
                <button class="button" type="submit" >Update</button>
            </form>`
}

export const formUpdateCar = () => {
    return `<form class="form" id="update">
                <input type="text" name="name" id="update-name" disabled>
                <input type="color" value="#ffffff" name="color" id="update-color" disabled>
                <button type="submit" id="update-submit">Update</button>
            </form>`
}

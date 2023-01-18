import API from './api'

class App {
    test: string

    constructor() {
        this.test = 'test'
    }

    async start() {
        this.test = 'test2'
        await API.getCars()
    }
}

export default App

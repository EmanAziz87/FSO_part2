import axios from 'axios'

const baseUrl = import.meta.env.VITE_BACKEND_URL

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/notes`)
    return request.then(response => {

        console.log("RESPONSE.DATA", response.data)
        return response.data
    })
}

const create = newObject => {
    const request = axios.post(`${baseUrl}/api/notes`, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/api/notes/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update
}
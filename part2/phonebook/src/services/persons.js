import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
	return axios.get(baseUrl)
}

const add = newPerson => {
	return axios.post(baseUrl, newPerson)
}

const remove = id => {
	return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newPerson) => {
	return axios.put(`${baseUrl}/${id}`, newPerson)
}

export default { getAll, add, remove, update }
import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
	return axios.get(url)
}

const add = newPerson => {
	return axios.post(url, newPerson)
}

const remove = id => {
	return axios.delete(`${url}/${id}`)
}

const update = (id, newPerson) => {
	return axios.put(`${url}/${id}`, newPerson)
}

export default { getAll, add, remove, update }
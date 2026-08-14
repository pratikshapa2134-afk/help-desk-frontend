import axios from 'axios'

const API = axios.create({ 
  baseURL: 'https://help-desk-backend.onrender.com/api' // Render cha URL
})

export default API
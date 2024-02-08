import axios from "axios"
// import type { Stats } from "../util/types"
const baseUrl = "/api/stats"

const getAllStats = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const exports = { getAllStats }
export default exports

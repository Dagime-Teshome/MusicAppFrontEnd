import axios from "axios"
import type { SearchType } from "../util/types"
// import type { Stats } from "../util/types"
const baseUrl = "/api/filter"

const filterSongs = async (searchTerms: SearchType) => {
  const response = await axios.post(baseUrl, searchTerms)
  return response.data
}
const getGenres = async () => {
  const response = await axios.get(`${baseUrl}/genres`)
  return response.data
}
const exports = { filterSongs, getGenres }
export default exports

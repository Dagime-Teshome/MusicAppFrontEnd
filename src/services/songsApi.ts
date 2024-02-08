import axios from "axios"
import type { Song } from "../util/types"
const baseUrl = "/api/songs"

const getAllSongs = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const createSong = async (song: Song) => {
  const response = await axios.post(baseUrl, song)
  return response.data
}

const deleteSong = async (id: string) => {
  await axios.delete(`${baseUrl}/${id}`)
}
const updateSong = async (id: string, updatedSong: Song) => {
  await axios.put(`${baseUrl}/${id}`, updatedSong)
}
const exports = { getAllSongs, createSong, deleteSong, updateSong }
export default exports

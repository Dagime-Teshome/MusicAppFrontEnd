import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getStats, stat } from "./statslice"

export const Stats: React.FC = () => {
  const labelMap: Record<string, string> = {
    totalSongs: "Total Songs",
    totalArtists: "Total Artists",
    totalAlbums: "Total Albums",
    totalGenres: "Number of Genres",
    popularArtist: "Popular Artist",
    popularGenre: "Popular Genre",
    leastPopularArtist: "Least Popular Artist",
    leastPopularGenre: "Least Popular Genre",
  }
  const dispatch = useAppDispatch()
  const statObj = useAppSelector(stat)
  useEffect(() => {
    dispatch(getStats())
  }, [])
  return (
    <div className="statContainer">
      <h2 className="heading">Stats</h2>
      <div className="stats-grid">
        {Object.entries(statObj).map(([key, value]) => (
          <div key={key} className="stat-item">
            <h3 className="stat-label">{labelMap[key]}</h3>
            {/* Check if value is an object */}
            {typeof value === "object" && value !== null ? (
              <div className="sub-stats">
                <p className="sub-stat">{value._id}</p>
                <p className="sub-stat">Songs: {value.totalSongs}</p>
              </div>
            ) : (
              <p className="stat-value">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

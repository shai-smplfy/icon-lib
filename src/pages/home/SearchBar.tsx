import { useState } from 'react'

type SearchBarProps = {
  onSearch: (searchText: string) => Promise<void>
}
const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('')
  const [showError, setShowError] = useState(false)

  const handleSearch = async () => {
    if (!searchText) {
      setShowError(true)
      return
    }
    setShowError(false)
    await onSearch(searchText)
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Search for icons"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {showError && (
            <label style={{ color: 'red' }}>
              Please enter a valid search text
            </label>
          )}
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </>
  )
}
export { SearchBar }

import { useState } from 'react'
import { SearchBar } from './SearchBar'
import {
  IconDefinition,
  fas,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import copy from 'clipboard-copy'

const allIcons = Object.keys(fas).map((n) => fas[n])

const HomePage = () => {
  const [icons, setIcons] = useState<IconDefinition[] | undefined>(undefined)
  const handleSearch = async (searchText: string) => {
    setIcons(
      allIcons.filter((i) =>
        i.iconName.toLowerCase().includes(searchText.toLowerCase()),
      ),
    )
  }

  const handleClipboard = async (icon: IconDefinition) => {
    const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="${icon.icon[4]}" /></svg>`
    await copy(svgCode)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {icons &&
        icons.map((icon, idx) => {
          // Add pagination
          return (
            <div key={`icon-${idx}`}>
              <label>{icon.iconName}</label>
              <FontAwesomeIcon icon={icon} size="2x" />
              <button onClick={() => handleClipboard(icon)}>
                <FontAwesomeIcon icon={faClipboard} />
              </button>
            </div>
          )
        })}
      {icons && icons.length === 0 && <label>No icons found</label>}
    </>
  )
}

export default HomePage

import { useState,useEffect } from 'react'
import './styles/App.css'
import { fetchAllSpecies, fetchCharacters } from './utils/api'
import CharacterFilters from './components/CharacterFilters'
import CharacterCard from './components/CharacterCard'
import Pagination from './components/Pagination'
import { sortCharacters } from './utils/sortCharacters'

function App() {
  //Statelarin tanımla
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [allSpecies, setAllSpecies] = useState([])
  const [speciesFilter, setSpeciesFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [searchText, setSearchText] = useState('')
  const [charPerPage, setCharPerPage] = useState(20)
  const [selectedCharacterId, setSelectedCharacterId] = useState(null)
  const [sortOption, setSortOption] = useState("default")
  //Verileri filtrlelere göre sortla
  const sortedCharacters = sortCharacters(characters, sortOption);

  const handleCardSelect = (id) => {
    setSelectedCharacterId((prevId) => (prevId === id ? null : id))
  }
//Sayfa başına karakter değiştiğinde otomatik olarak ilk sayfaya dön
useEffect(() => {
  setPage(1)
}, [charPerPage])

//api.js'te karakter verilerini çeken fonksiyonu çağır
  useEffect(() => {
  const getCharacters = async () => {
    try {
      const { characters, totalCount } = await fetchCharacters({
        page,
        charPerPage,
        searchText,
        speciesFilter,
        statusFilter,
        genderFilter,
      })

      const maxPage = Math.ceil(totalCount / charPerPage)

      // Eğer seçili sayfa geçersizse 1. sayfaya dön
      if (page > maxPage) {
        setPage(1)
        return
      }

      setCharacters(characters)
      setTotalPages(maxPage)
    } catch (err) {
      console.error("Failed to fetch characters", err)
      setCharacters([])
    }
  }
  getCharacters()
}, [page, charPerPage, searchText, speciesFilter, statusFilter, genderFilter])
//api.js'te species(türler)'i çeken fonksiyonu çağır
useEffect(() => {
  const loadSpecies = async () => {
    try {
      const speciesList = await fetchAllSpecies()
      setAllSpecies(speciesList)
    } catch (err) {
      console.error('Species list could not be loaded', err)
    }
  }
  loadSpecies()
}, [])

  return(
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand mb-0 h1">Rick and Morty Characters</span>
      </nav>
      {/* // */}

      {/* Filtre Bileşenleri*/}
      <CharacterFilters
        searchText={searchText}
        setSearchText={setSearchText}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        charPerPage={charPerPage}
        setCharPerPage={setCharPerPage}
        sortOption={sortOption}
        setSortOption={setSortOption}
        allSpecies={allSpecies}
        
      />
      {/* // */}

      {/*Karakter Listesi (Boşsa Sonuç Alınamadı Mesajı Döndür) */}
      {sortedCharacters.length === 0 ? (
        <div className="character-row d-flex align-items-center justify-content-between p-3 border rounded">
          <div className="d-flex align-items-center gap-3">
            <div>
              <h5 className="mb-0">No Characters Found</h5>
              <small>Try adjusting your search or filters.</small>
            </div>
          </div>
        </div>
      ) : (
        sortedCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedCharacterId === character.id}
            onSelect={handleCardSelect}
          />
        )))
      }
      {/* // */}

      {/* Sayfa Geçiş Butonları */}
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default App

import React from "react";
// Tüm filtreleri ekle
const CharacterFilters = ({
    searchText,
    setSearchText,
    speciesFilter,
    setSpeciesFilter,
    statusFilter,
    setStatusFilter,
    genderFilter,
    setGenderFilter,
    charPerPage,
    setCharPerPage,
    sortOption,
    setSortOption,
    allSpecies,
}) => {
    return(
        <div className="blur-overlay d-flex flex-wrap align-items-center gap-3 justify-content-center">
            {/* Karakterleri isimleriyle filtreleyebildiğimiz textbox */}
            <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Search Character..."
            style={{ maxWidth: '200px' }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            />
            {/* // */}

            {/* Tür(Species) filtresi */}
            <select
            className="form-select rounded-pill"
            style={{ maxWidth: '200px' }}
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            >
                <option value="">All Species</option>
                {allSpecies.map((sp) => (
                    <option key={sp} value={sp}>
                    {sp.charAt(0).toUpperCase() + sp.slice(1)}
                </option>
                ))}
            </select>
            {/* // */}

            {/* Durum(status) filtresi */}
            <select
            className="form-select rounded-pill"
            style={{ maxWidth: '200px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="">All Status</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
            </select>
            {/* // */}

            {/* Cinsiyet(gender) filtresi */}
            <select
            className="form-select rounded-pill"
            style={{maxWidth: '150px'}}
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
            </select>
            {/* // */}

            {/* Sıralama(sort) seçenekleri */}
            <select
            className="form-select rounded-pill"
            value={sortOption}
            style={{maxWidth: '200px'}}
            onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="default">Default (No Sorting)</option>
                <option value="name-asc">Name (A → Z)</option>
                <option value="name-desc">Name (Z → A)</option>
            </select>
            {/* // */}

            {/* Sayfa başına karakter sayısı seçenekleri (Değiştirmek için value kısmını ve iç yazısını değiştimek yeterli) */}
            <select 
            className="form-select rounded-pill"
            style={{maxWidth: '150px'}}
            value={charPerPage}
            onChange={(e) => setCharPerPage(Number(e.target.value))}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
              <option value={250}>250 per page</option>
            </select>
            {/* // */}
        </div>
    )
}
export default CharacterFilters
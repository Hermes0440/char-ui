const BASE_URL = "https://rickandmortyapi.com/api"

//Karakterleri filtrelere göre API'den çek
export const fetchCharacters = async ({
    page,
    charPerPage,
    searchText,
    speciesFilter,
    statusFilter,
    genderFilter,
}) => {
    const results = []

    const startIndex = (page - 1) * charPerPage
    const endIndex = startIndex + charPerPage

    const firstApiPage = Math.floor(startIndex / 20) + 1
    const lastApiPage = Math.floor((endIndex - 1) / 20) + 1

    let totalFilteredCount = 0
    // Filtre Kontrolü
    for(let i = firstApiPage; i <= lastApiPage; i++){
        const params = new URLSearchParams()
        params.append('page',i)
        if (searchText?.trim()) params.append("name", searchText.trim())
        if (speciesFilter?.trim()) params.append("species", speciesFilter.trim())
        if (statusFilter?.trim()) params.append("status", statusFilter.trim())
        if (genderFilter?.trim()) params.append("gender", genderFilter.trim())

        const res = await fetch(`${BASE_URL}/character?${params}`)
        const data = await res.json()

        if (!data.results || data.error) break

        if(i === firstApiPage && data.info?.count) {
            totalFilteredCount = data.info.count
        }

        results.push(...data.results)
    }

    const globalStartIndex = startIndex - (firstApiPage - 1) * 20
    const slicedResults = results.slice(globalStartIndex, globalStartIndex + charPerPage)

    return{
        characters: slicedResults,
        totalCount: totalFilteredCount,
    }
}
// Filtre için türler(species) kısmını API'den çek
export const fetchAllSpecies = async () => {
    const speciesSet = new Set()
    let page = 1
    while(true){
        const res = await fetch(`${BASE_URL}/character?page=${page}`)
        const data = await res.json()

        if(!data.results) break

        data.results.forEach((char) => speciesSet.add(char.species))

        if (!data.info?.next) break;

        page++
    }
    return Array.from(speciesSet)
}
//Karakterlerin son görüldüğü bölümleri API'den çek
export const fetchEpisodeName = async (episodeUrl) => {
    try{
        const res = await fetch(episodeUrl)
        if (!res.ok) throw new Error("Failed to fetch episode")
        const data = await res.json()
    return data.name
    } catch (err) {
        console.error("Error fetching episode", err)
        return "Unknown"
    }
}
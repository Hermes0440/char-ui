//Verileri isime göre sortla
export const sortCharacters = (characters, sortOption) => {
    if (sortOption === "default") return characters;
    
    return [...characters].sort((a,b) => {
        switch(sortOption) {
            case "name-asc":
                return a.name.localeCompare(b.name)
            case "name-desc":
                return b.name.localeCompare(a.name)
            default:
                return 0
        }
    })
}
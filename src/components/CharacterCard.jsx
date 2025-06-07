import React, {useEffect, useRef, useState} from "react";
import { fetchEpisodeName } from "../utils/api";
{/*Karakter kartlarının yapısı, açıklamaları ve işlevlerini yazdır */}
const CharacterCard = ({ character, isSelected, onSelect }) => {
    const [lastEpisodeName, setLastEpisodeName] = useState("")
    //Karakterin son görüldüğü bölümü api.js'te bulunan fonksiyon ile çek
    useEffect(() => {
        const getLastEpisodeName = async () => {
            if (isSelected && character.episode.length > 0){
                const lastEpUrl = character.episode[character.episode.length - 1]
                const name = await fetchEpisodeName(lastEpUrl)
                setLastEpisodeName(name)
            }
        }
        getLastEpisodeName()
    },[isSelected, character])

    return(
        <div className="mb-3 character-box">
            <div
            className="character-row d-flex align-items-center justify-content-between p-3 border rounded"
            onClick={() => onSelect(character.id)}
            >   
                {/*Kapalı karakter kartı*/}
                {!isSelected && (
                    <div className="d-flex align-items-center gap-3">
                        <img src={character.image} alt={character.name} width={60} height={60} className="rounded-circle" />
                        <div>
                            <h5 className="mb-0">{character.name}</h5>
                            <small>{character.species} - {character.status}</small>
                        </div>
                    </div>
                )}
                {/* // */}

                {/*Karakterin detaylı açıklaması*/}
                {isSelected && (
                    <div className="character-description horizontal-layout">
                        <img src={character.image} alt={character.name} />
                        <div className="details">
                            <h5>{character.name}</h5>
                            <p><strong>Species:</strong> {character.species}</p>
                            <p><strong>Status:</strong> {character.status}</p>
                            <p><strong>Gender:</strong> {character.gender}</p>
                            <p><strong>Origin:</strong> {character.origin.name}</p>
                            <p><strong>Last Known Location:</strong> {character.location.name}</p>
                            <p><strong>Last Seen In:</strong> {lastEpisodeName}</p>
                        </div>
                    </div>
                )}
                {/* // */}
            </div>
        </div>
    )
}
export default CharacterCard
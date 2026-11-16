import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState({
        "title": "Aasan Nahin Yahan",
        "url": "https://ik.imagekit.io/opbhardwaj/cohort2/moodify/songs/Aasan_Nahin_Yahan_gWF18fA9T.mp3",
        "posterUrl": "https://ik.imagekit.io/opbhardwaj/cohort2/moodify/posters/Aasan_Nahin_Yahan_Odm5ks8V8.jpeg",
        "mood": "sad",
    }); {
        // Add your song-related data here
    }

    const [loading, setLoading] = useState(false); {
        // Add your loading state logic here
    }

    return (
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    );
};
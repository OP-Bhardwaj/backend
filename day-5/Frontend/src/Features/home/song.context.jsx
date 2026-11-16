import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState(null);{
    // Add your song-related data here
  }

  const [loading, setLoading] = useState(false);{
    // Add your loading state logic here
  }

    return (
      <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
        {children}
      </SongContext.Provider>
    ); 
};
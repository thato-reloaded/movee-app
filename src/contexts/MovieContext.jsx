import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites");

        if (storedFavs) setFavourites(JSON.parse(storedFavs))
    }, []);

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev, movie]);
    }

    const removeFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId);
    }

    const value = {
        favourites,
        addToFavourites,
        removeFavourites,
        isFavourite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}

// export const MovieProvider = ({ children }) => {
//     const [favourites, setFavourites] = useState(() => {
//         const savedFavourites = localStorage.getItem("favouriteMovies");
//         return savedFavourites ? JSON.parse(savedFavourites) : [];
//     });
//     const [watchLater, setWatchLater] = useState(() => {
//         const savedWatchLater = localStorage.getItem("watchLaterMovies");
//         return savedWatchLater ? JSON.parse(savedWatchLater) : [];
//     });

//     useEffect(() => {
//         localStorage.setItem("favouriteMovies", JSON.stringify(favourites));
//     }, [favourites]);
//     useEffect(() => {
//         localStorage.setItem("watchLaterMovies", JSON.stringify(watchLater));
//     }, [watchLater]);

//     const addToFavourites = (movie) => {
//         setFavourites((prevFavourites) => {
//             if (!prevFavourites.find((fav) => fav.id === movie.id)) {
//                 return [...prevFavourites, movie];
//             }
//             return prevFavourites;
//         });
//     };
//     const removeFromFavourites = (movieId) => {
//         setFavourites((prevFavourites) =>
//             prevFavourites.filter((movie) => movie.id !== movieId)
//         );
//     };

//     const addToWatchLater = (movie) => {
//         setWatchLater((prevWatchLater) => {
//             if (!prevWatchLater.find((wl) => wl.id === movie.id)) {
//                 return [...prevWatchLater, movie];
//             }
//             return prevWatchLater;
//         });
//     };

//     const removeFromWatchLater = (movieId) => {
//         setWatchLater((prevWatchLater) =>
//             prevWatchLater.filter((movie) => movie.id !== movieId)
//         );
//     };

// }  

 

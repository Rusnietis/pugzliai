import { createContext, useReducer, useState } from 'react';
import useStories from '../Hooks/useStories';
import storiesReducer from '../Reducers/storiesReducer';

export const Stories = createContext();

export const StoriesProvider = ({ children }) => {

    // pagrindinis kur laikome visus autorius yra reduceris
    const [stories, dispatchStories] = useReducer(storiesReducer, []);
    const [deleteStory, setDeleteStory] = useState(null);
    const [editStory, setEditStory] = useState(null);

    console.log('stories', stories)

    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    useStories(dispatchStories);



    return (
        <Stories.Provider value={{
            stories,
            dispatchStories
        }}>
            {children}
        </Stories.Provider>
    );
}
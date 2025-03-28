import * as  constants from '../Constants/heroes';

export function getHeroes(heroes) {

    return {
        
        type: constants.GET_HEROES_FROM_SERVER,
        payload: heroes
    }
}

export function storeHeroAsTemp(hero) {
    return {
        type: constants.CREATE_HERO,
        payload: hero
    }
}

export function storeHeroAsReal(response) {
    return {
        type: constants.CREATE_HERO_REAL,
        payload: response
    }
}

export function storeHeroAsUndo(hero) {
    return {
        type: constants.CREATE_HERO_UNDO,
        payload: hero
    }
}

export function deleteHeroAsTemp(hero) {
    return {
        type: constants.DELETE_HERO,
        payload: hero
    }
}

export function deleteHeroAsReal(response) {
    return {
        type: constants.DELETE_HERO_REAL,
        payload: response
    }
}

export function deleteHeroAsUndo(hero) {
    return {
        type: constants.DELETE_HERO_UNDO,
        payload: hero
    }
}

export function updateHeroAsTemp(hero) {
    return {
        type: constants.UPDATE_HERO,
        payload: hero
    }
}
    


export function updateHeroAsReal(response) {
    return {
        type: constants.UPDATE_HERO_REAL,
        payload: response
    }
}

export function updateHeroAsUndo(hero) {
    return {
        type: constants.UPDATE_HERO_UNDO,
        payload: hero
    }
}


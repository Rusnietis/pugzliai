import * as  constants from '../Constants/stories';

export function getStories(stories) {

    return {

        type: constants.GET_STORIES_FROM_SERVER,
        payload: stories
    }
}

export function addStory(story) {

    return {

        type: constants.ADD_STORY,
        payload: story
    }
}

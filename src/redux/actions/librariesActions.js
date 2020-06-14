export const LIBRARIES_LOADING = "LIBRARIES_LOADING"
export const LIBRARIES_DOWNLOADED = "LIBRARIES_DOWNLOADED"


export const setLibsLoadingAction = () => ({ type: LIBRARIES_LOADING });
export const librariesLoadedAction = (payload) => ({
         type: LIBRARIES_DOWNLOADED,
         payload
});
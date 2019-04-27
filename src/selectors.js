const getCoords = (state) => state.coords
export const getCoordsById = (id) => (state) => getCoords(state)[id]

const getcomponentById = (state) => state.componentById
export const getComponentById = (id) => (state) => getcomponentById(state)[id]
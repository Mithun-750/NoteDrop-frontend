export default (state = `Email`, { type, payload }) => {
  switch (type) {

    case `email`:
      return payload;

    default:
      return state
  }
}

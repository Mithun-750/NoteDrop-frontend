export default (state = ``, { type, payload }) => {
  switch (type) {

    case `since`:
      return payload;

    default:
      return state
  }
}

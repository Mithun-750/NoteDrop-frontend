export default (state = `Name`, { type, payload }) => {
  switch (type) {

    case `name`:
      return payload;

    default:
      return state
  }
}

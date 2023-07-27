export default (state = false, { type, payload }) => {
  switch (type) {

    case `statusbool`:
      return payload;

    default:
      return state
  }
}

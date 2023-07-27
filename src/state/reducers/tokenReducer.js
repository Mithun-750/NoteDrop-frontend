export default (state = (localStorage.getItem('token') ? localStorage.getItem('token') : ''), { type, payload }) => {
  switch (type) {

    case `token`:
      return payload;

    default:
      return state
  }
}

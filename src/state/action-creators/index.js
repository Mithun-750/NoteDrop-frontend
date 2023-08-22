export const loginStatus = (status) => {
  return (dispatch) => {
    dispatch({
      type: 'statusbool',
      payload: status,
    })
  }
}

export const NameValue = (name) => {
  return (dispatch) => {
    dispatch({
      type: 'name',
      payload: name,
    })
  }
}

export const EmailValue = (email) => {
  return (dispatch) => {
    dispatch({
      type: 'email',
      payload: email,
    })
  }
}
export const SinceValue = (since) => {
  return (dispatch) => {
    dispatch({
      type: 'since',
      payload: since,
    })
  }
}
export const authToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: 'token',
      payload: token,
    })
  }
}

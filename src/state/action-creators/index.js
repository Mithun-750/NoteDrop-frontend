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

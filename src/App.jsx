import React, { Component, useContext, useState } from 'react'

const appContext = React.createContext(null)

export const App = () => {
  const [state, setState] = useState({
    user: { name: 'mize', age: 20 }
  })

  const contextValue = { state, setState }

  console.log(contextValue)

  return (
    <appContext.Provider value={contextValue}>
      <A />
      <B />
      <C />
    </appContext.Provider>
  )
}

const A = () => <section>A <User /></section>
const B = () => <section>B <UserModifier name='Input' /> </section>
const C = () => <section>C <User /></section>
const User = () => {
  const contextValue = useContext(appContext)
  return <div>User: {contextValue.state.user.name}</div>
}

const reducer = (state, { type, payload }) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: { ...state.user, ...payload }
    }
  } else {
    return state
  }
}

const connect = (Component) => (props) => {
  const { state, setState } = useContext(appContext)
  const dispatch = (action) => {
    setState(reducer(state, action))
  }
  return <Component {...props} dispatch={dispatch} state={state} />
}

const UserModifier = connect(({ dispatch, state, ...rest }) => {
  const onChange = (e) => {
    // 1. 
    // state.user.name = e.target.value
    // setState({ ...state })
    // 2. 
    // setState(reducer(state, { type: 'updateUser', payload: { name: e.target.value } }))
    // Now
    dispatch({ type: 'updateUser', payload: { name: e.target.value } })
  }
  return (
    <>
      {console.log(rest)}
      <input value={state.user.name} onChange={onChange}></input>
    </>
  )
})
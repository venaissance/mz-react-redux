import React, { useContext } from 'react'
import { store, connect, appContext } from './redux'

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <A />
      <B />
      <C />
    </appContext.Provider>
  )
}

const A = () => <section>A <UserA /></section>
const B = () => <section>B <UserModifier name='Input' /> </section>
const C = () => <section>C <UserC /> </section>

const UserA = connect(({ state, dispatch }) => {
  console.log('A Update', Math.random())
  return <div>User: {state.user.name}</div>
})

const UserC = () => {
  console.log('C Update', Math.random())
  const { state } = useContext(appContext)
  return <div>User: {state.user.name}</div>
}

const UserModifier = connect(({ dispatch, state, ...rest }) => {
  console.log('B Update', Math.random())
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
      <input value={state.user.name} onChange={onChange}></input>
    </>
  )
})
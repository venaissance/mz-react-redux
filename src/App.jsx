import React, { useContext, useState } from 'react'

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
const B = () => <section>B <UserModifier /> </section>
const C = () => <section>C <User /></section>
const User = () => {
  const contextValue = useContext(appContext)
  return <div>User: {contextValue.state.user.name}</div>
}

const UserModifier = () => {
  const { state, setState } = useContext(appContext)

  const onChange = (e) => {
    state.user.name = e.target.value
    setState({ ...state })
  }
  return (
    <input value={state.user.name} onChange={onChange}></input>
  )
}

// const UserModifier = () => {
//   const { appState, setAppState } = useContext(appContext)

//   const onChange = (e) => {
//     appState.user.name = e.target.value;
//     setAppState({ ...appState })
//   }

//   return <div>
//     <input value={appState.user.name} onChange={onChange} />
//   </div>
// }
/**
 * 一、什么是useReducer？
 *    React本身不提供状态管理功能，需要引入外部库Redux。
 *    Redux的核心概念是，组件发出action与状态管理器通信。状态管理器收到action以后，
 *    使用Reducer函数算出新的state，Reducer函数形式是(state, action) => newState
 *    useReducer用来引入Reducer功能
 * 
 * 二、useReducer语法
 *    const [state, dispatch] = useReducer(reducer, initialState)
 *    useReducer函数接受两个参数，分别是reducer函数和初始state
 *    useReducer返回一个数组，2个元素分别为state和dispatch方法。
 *    dispatch 方法接受一个参数，执行对应的 action。dispatch 执行后，对应的 state 会改变，组件会 rerender，来展示最新的状态。
 * 
 * 三、reducer函数
 *    reducer函数里面可以存放state的各种操作，它类似状态管理器，
 *    通过dispatch函数传递action，可以触发reducer函数内部业务代码，并返回新的state
 */

import React, { useReducer, createContext, useContext } from "react"
const Context = createContext()

const reducer1 = (state, action) => {
  if (action.type === 'add') {
    return {n: state.n + 1}
  } else if (action.type === 'sub') {
    return {n: state.n - 1}
  }
}

const reducer2 = (state, action) => {
  if (action.type === 'change') {
    return {...state, ...action.formData}
  } else if (action.type === 'reset') {
    return {name: '', age: '', love: ''}
  }
}

const store = {
  user: null,
  age: null,
  movies: null
}

// const reducer3 = (state, action) => {
//   switch (action.type) {
//     case 'setUser':
//       return {...state, user: action.user}
//     case 'setAge':
//       return {...state, age: action.age}
//     case 'setMovies':
//       return {...state, movies: action.movies}
//     default:
//       break;
//   }
// }

/**
 * 结构编程， 对reducer3 优化
 * 这种方法比较适合模块化开发，因为对象是可以合并的，当模块化后可以通过...运算符将不同逻辑运算的对象合并到一个表对象里，类似与
 * const objFn = {
 *    ...objFn1,
 *    ...objFn2
 * }
 */
const fnObj = {
  setUser: (state, action) => {
    return { ...state, user: action.user };
  },
  setAge: (state, action) => {
    return { ...state, age: action.age };
  },
  setMovies: (state, action) => {
    return { ...state, movies: action.movies };
  }
}

function reducer3(state, action) {
  const fn = fnObj[action.type];
  if (fn) {
    return fn(state, action);
  } else {
    throw new Error("这是不对的");
  }
}

const UseReducer = () => {
  const initialState = {n: 1}
  const [state, dispatch] = useReducer(reducer1, initialState)

  const [state1, dispatch1] = useReducer(reducer2, {name: '', age: '', love: ''})
  const onClick = () => {
    alert(`姓名是${state1.name}，年龄是${state1.age}，爱好是${state1.love}`)
  }

  const [state2, dispatch2] = useReducer(reducer3, store)

  return (
    <div>
      <h1>useReducer使用</h1>
      <div>
        <h3>一、useReducer简单使用</h3>
        <h5>state.n的值：{state.n}</h5>
        <button onClick={() => dispatch({type: 'add'})}>点击+</button>
        <button onClick={() => dispatch({type: 'sub'})}>点击-</button>
        <hr />
        <div>ps：dispatch()是发出 Action 的唯一方法。它发出action后使reducer执行，并返回一个新的state</div>
        <h4>小结</h4>
        <p>- 先定义一个initialValue</p>
        <p>- 定义一个reducer函数，把所有操作方法都丢进去</p>
        <p>- 把initialValue跟reducer通过useReducer关联起来，并返回一个当前state和dispatch</p>
        <p>- 当需要计算时，使用dispatch传递一个action值，触发reducer函数执行，返回一个新的state</p>
      </div>
      <div>
        <h3>二、使用了action传递更多的属性来进行更多的计算可能性</h3>
        <form>
          <div>姓名：</div>
          <input onInput={e => dispatch1({type: 'change', formData: {name: e.target.value}})} />
          <div>年龄：</div>
          <input onInput={e => dispatch1({type: 'change', formData: {age: e.target.value}})} />
          <div>喜欢：</div>
          <input onInput={e => dispatch1({type: 'change', formData: {love: e.target.value}})} />
          <br />
          <br />
          <button type='reset'>重置</button>
          <button type='button' onClick={onClick}>确认</button>
        </form>
      </div>
      <div>
        <h3>三、使用useReducer配合useContext替代redux</h3>
        <Context.Provider value={{state: state2, dispatch: dispatch2}}>
          <User />
          <Age />
          <Movies />
        </Context.Provider>
      </div>
    </div>
  )
}

const User = () => {
  const {state, dispatch} = useContext(Context)
  return (
    <div>
      <p>user: {state.user}</p>
      <button onClick={() => dispatch({type: 'setUser', user: 'shawlee'})}>设置User</button>
    </div>
  )
}
const Age = () => {
  const {state, dispatch} = useContext(Context)
  return (
    <div>
      <p>age: {state.age}</p>
      <button onClick={() => dispatch({type: 'setAge', age: '30'})}>设置User</button>
    </div>
  )
}
const Movies = () => {
  const {state, dispatch} = useContext(Context)
  return (
    <div>
      <p>movies: {state.movies}</p>
      <button onClick={() => dispatch({type: 'setMovies', movies: '海大鱼'})}>设置User</button>
    </div>
  )
}

export default UseReducer
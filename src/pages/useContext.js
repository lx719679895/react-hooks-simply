/**
 * 一、什么是context
 *    context（上下文）可以看成是扩大版的props，它可以将全局的数据通过provider接口传递value给子组件，让包围在provider中的子组件可以获取到全局数据的读写接口。
 *    全局变量可以看成是全局的上下文
 *    而上下文则是局部的全局变量，因为只有包围在provider中的组件才可以获取到这些全局变量的读写接口
 * 二、用法
 *    - 创建context
 *    - 设置provider并通过value接口传递state
 *    - 局部组件获取读写接口
 */

import React, {createContext, useContext, useState} from 'react'
const initialState = {m:100, n:50} //定义初始state
const X = createContext() // 创建Context对象
let a = 0
const UseContext = () => {
  console.log(`render了${a}次`); //用来检查执行App函数多少次
  const [state, setState] = useState(initialState)
  a += 1
  return (
    <div>
      <h1>UseContext使用</h1>
      <X.Provider value={{state, setState}}>
        <Father />
      </X.Provider>
    </div>
  )
}

const Father = () => {
  const {state, setState} = useContext(X)
  const addN = () => {
    setState(state => {
      return {...state, n: state.n+1}
    })
  }
  const addM = () => {
    setState(state => {
      return {...state, m: state.m+1}
    })
  }
  return (
    <div>
      <div>父组件</div>
      <div>n：{state.n}</div>
      <Child />
      <button onClick={addN}>设置n</button>
      <button onClick={addM}>设置m</button>
    </div>
  )
}

const Child = () => {
  const { state } = useContext(X)
  return (
    <div>
      <div>子组件</div>
      <div>m:{state.m}</div>
    </div>
  )
}

/**
 * 每次点击按钮后，会触发UseContext函数并更新页面，说明react下使用context来修改数据的时候，都会重新进行全局执行，而不是数据响应式的。
 * 总结：
 * 通过上面的小案例总结得出context的使用方法：
 *  - 使用createContext创建上下文
 *  - 设置provider并通过value接口传递state数据
 *  - 局部组件从value接口中传递的数据对象中获取读写接口
 */

export default UseContext
import React,{useState} from 'react'

// // 一、setState异步更新
// // 点击之后视图上只加了1，但是log了两次，说明setNum是异步的，不能立即更新，
// // 而是把所有同步代码执行完之后，再执行视图更新，而这时候入参的n还是旧的值，并没有被更新。
// const UseState = () => {
//   const initialValue = 0
//   const [num, setNum] = useState(initialValue)
//   const add = () => {
//     setNum(num + 1)
//     console.log(num);
//     setNum(num + 1)
//     console.log(num);
//   }
//   return (
//     <div>
//       useState使用<br/>
//       num的值：{num}<br />
//       <button onClick={add}>点击+1</button>
//     </div>
//   )
// }

// // 二、setN是可以传递函数的，它的参数是旧的n，返回新的value。如果可以的话，推荐优先使用函数。
// const UseState = () => {
//   const initialValue = 0
//   const [num, setNum] = useState(initialValue)
//   const add = () => {
//     setNum((oldN)=>{
//       console.log(oldN);
//       return oldN + 1
//     })
//     setNum((oldN)=>{
//       console.log(oldN);
//       return oldN + 1
//     })
//   }
//   return (
//     <div>
//       useState使用<br/>
//       num的值：{num}<br />
//       <button onClick={add}>点击+1</button>
//     </div>
//   )
// }

// 三、state可以是对象
// 当useState为对象时，调用相应的setState有一些要注意的地方，useState不会自动合并对象，
// 你可以用函数式的setState结合展开运算符来达到合并更新对象的效果
const UseState = () => {
  const initialValue = {n: 0, m:0}
  const [val, setVal] = useState(initialValue)
  const addN = () => {
    setVal(val => {
      return {...val,n: val.n+1}
    })
  }
  const addM = () => {
    setVal(val => {
      return {...val,m: val.m+1}
    })
  }
  return (
    <div>
      useState使用<br/>
      n的值：{val.n}<br />
      m的值：{val.m}<br />
      <button onClick={addN}>点击n+1</button>
      <button onClick={addM}>点击m+1</button>
    </div>
  )
}

/**
 * 总结：
 *    - useState返回一对数组，第一个值是初始值，第二个值是state的setter方法
 *    - 如果state是对象的话，需要我们手动合并
 *    - setState时，可以传值也可以传函数，如果依赖于旧的state，最好使用函数形式。
 */

export default UseState
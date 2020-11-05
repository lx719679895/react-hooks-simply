import React, {useRef, useState, useEffect, forwardRef} from 'react'

const UseRef = () => {
  const r = useRef(0)
  console.log('r',r);
  const add = () => {
    r.current += 1
    console.log(`r.current：${r.current}`);
  }

  const m = useRef(0)
  const [n, setN] = useState(0)
  useEffect(()=>{
    m.current += 1
    if (m.current > 1) {
      console.log('m.current：' + m.current);
      console.log('n：' + n);
    }
  })

  const textInput = useRef(null)
  console.log('textInput', textInput);
  const handleClick = () => {
    textInput.current.focus()
  }

  const childRef = useRef(null)
  console.log('childInput', childRef);
  const handleClick2 = () => {
    console.log('childInput', childRef);
    childRef.current.focus()
  }

  return (
    <div>
      <h1>一、useRef的使用</h1>
      <div>
        <h3>useRef简单示例</h3>
        <h5>r的current：{r.current}</h5>
        <button onClick={add}>点击+1</button>
        <div>注意：从上面的例子可以看出，useRef变化不会主动使页面渲染</div>
      </div>
      <div>
        <h3>二、使用useRef配合useEffect模拟一个ComponentDidUpdate</h3>
        <h5>n：{n}</h5>
        <h5>m.current：{m.current}</h5>
        <button onClick={() => {setN(n+1)}}>{" "}+1</button>
      </div>
      <div>
        <h3>三、useRef配合ref使用示例</h3>
        <input type='text' placeholder='input' ref={textInput} />
        <input type='button' value='Focus the text input' onClick={handleClick} />
      </div>
      <div>
        <h3>四、子组件使用ref，需要配合forwardRef使用，否则拿不到子组件DOM</h3>
        <Child ref={childRef} placeholder='子组件placeholder' />
        <input type='button' value='Focus the text input' onClick={handleClick2} />
      </div>
    </div>
  )
}

const Child = forwardRef((props, ref)=>{
  return <input type="text" placeholder={props.placeholder} ref={ref} />
})

export default UseRef
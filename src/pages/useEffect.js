import React, { useEffect, useState } from "react";

/**
 * 一、什么是Effect？
 *    effect（副作用）是react函数组件用来替代生命周期的函数，
 *    可以把useEffect Hook看做 componentDidMount、componentDidUpdate、componentWillUnmount三个函数的结合
 * 二、用法
 *    语法：useEffect(callback[,[]])
 *    第一个参数：接受一个callback回调函数，里面可以写业务代码
 *    第二个参数：可选参数，接受一个数组，可以是空数组，也可以是state数据
 * 三、使用说明
 *    1、当不传递第二个参数时，每次render都会执行一遍callback函数，相当于componentDidMount、componentDidUpdate的结合
 *    2、当第二个参数传递空数组时，只有第一次render才会执行callback，类似于componentDidMount
 *    3、不管是否传递第二个参数，只要在callback中return一个函数，函数中的代码会在组件即将挂掉时执行，类似于componentWillUnmount
 */

const UseEffect = () => {
  const [n, setN] = useState(0);
  const [m, setM] = useState(0);
  const [o, setO] = useState(0);
  const [a, setA] = useState(true);

  // useEffect(() => {
  //   console.log('每一次都调用');
  // })

  useEffect(() => {
    console.log("第一次render了");
  }, []);

  useEffect(() => {
    console.log("m发生了变化", m);
  }, [m]);

  return (
    <div>
      <h1>useEffect使用</h1>
      <div>
        <h3>1、模拟componentDidMount</h3>
        <h5>n的值：{n}</h5>
        <button onClick={() => setN((n) => n + 1)}>点击+1</button>
      </div>
      <div>
        <h3>2、模拟componentDidUpdate</h3>
        <h5>m的值：{m}</h5>
        <h5>o的值：{o}</h5>
        <button onClick={() => setO((o) => o + 1)}>点击o+1</button>
        <button onClick={() => setM((m) => m + 1)}>点击m+1</button>
      </div>
      <div>
        <h3>3、模拟componentWillUnMount</h3>
        <h5>a的值：{String(a)}</h5>
        {!a ? null : <Child />}
        <button onClick={() => setA((val) => !val)}>
          {a ? "隐藏" : "显示"}
        </button>
      </div>
    </div>
  );
};

const Child = () => {
  useEffect(() => {
    console.log('子组件挂载');
    return () => {
      console.log("子组件将被销毁");
    };
  }, []);
  return <div>子组件</div>;
};

export default UseEffect;

import { createElement, render, useState } from '../src'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <div>Hello React! { count + 10 }</div>
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    )
}

render(<App />, document.body)
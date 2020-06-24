import { createElement, render, useState } from '../src'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <div>Hello React!</div>
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    )
}

render(<App />, document.body)
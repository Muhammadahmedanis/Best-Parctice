import React, { useOptimistic, useState } from 'react'

function Opotimistic() {
    const[todos, setTodos] = useState([]);

    const[optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (oldTodos, newTodos) => [
        ...oldTodos, {text: newTodos, pending: true}
    ])

    const handleTodo = async(formData) => {
        const newTodo = formData.get("todo");

        setOptimisticTodos(newTodo);

        await new Promise((resolve => setTimeout(resolve, 1000)));

        setTodos(currentTodo => [
            ...currentTodo, {text: newTodo, pending: false}
        ])
    }

  return (
    <div>
        <form action={handleTodo}>
            <input type="text" name='todo' />
            <button type='submit'>Add todo</button>
        </form>
        <ul>
            {optimisticTodos.map((val, ind) => {
                return <li key={ind}>{val.text}{val.pending && <span>(Adding...)</span>}</li>
            })}
        </ul>
    </div>
  )
}

export default Opotimistic;
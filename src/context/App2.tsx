import { useReducer } from 'react'
import type { MouseEventHandler } from 'react'
import { List } from "react-virtualized";
import axios from 'axios'
import "./app2.css";

interface ITodo {
    id: number,
    title: string,
    userId: number,
    completed: boolean
}

type State = {
    value: number;
    todos: ITodo[];
    loading: boolean;
}

enum ActionKind {
    Increase = 'INCREASE',
    Decrease = 'DECREASE',
    Call_API = 'CALL_API',
    Set_loading = 'SET_LOADING'
}

type Action = {
    type: ActionKind,
    payload: any
}

type ACTIONTYPE =
  | { type: ActionKind.Increase; payload: number }
  | { type: ActionKind.Decrease; payload: number }
  | { type: ActionKind.Call_API; payload: ITodo[] }
  | { type: ActionKind.Set_loading; payload: boolean }

const initialCounterState: State = {
    value: 0,
    todos: [],
    loading: false
}

const increaseAction: Action = {
    type: ActionKind.Increase,
    payload: 1
}

const decreaseAction: Action = {
    type: ActionKind.Decrease,
    payload: 1
}

function counterReducer(state: State, action: ACTIONTYPE): State {
    const { type, payload } = action;
    switch (type) {
        case ActionKind.Increase:
            return {
                ...state,
                value: state.value + payload
            }
        case ActionKind.Decrease:
            return {
                ...state,
                value: state.value - payload
            }
        case ActionKind.Call_API:
            return {
                ...state,
                todos: payload
            }
        case ActionKind.Set_loading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state;
    }
}

const App2 = (): JSX.Element => {

    const [state, dispatch] = useReducer(counterReducer, initialCounterState);

    
    const handleClick: MouseEventHandler<HTMLButtonElement> = async (): Promise<void> => {
        // function of js to repeat an array 100 times
        function repeatArray(arr: ITodo[], times: number) {
            return arr.reduce((acc, cur): any => [...acc, ...Array(times).fill(cur)], []);
        }
        dispatch({ type: ActionKind.Set_loading, payload: true })
        const { data } = await axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
        console.log(repeatArray(data,100))
        dispatch({ 
            type: ActionKind.Call_API, 
            payload:[...repeatArray(data,100)]
        })
        dispatch({ type: ActionKind.Set_loading, payload: false })
    }

    function rowRenderer({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style // Style object to be applied to row (to position it)
      }: any) {
        return (
          <div key={key} style={style} className="row">
            {state.todos[index].title}
          </div>
        );
      }

    return (
        <>
            <div>
                Count: {state.value}
                <button onClick={() => dispatch(decreaseAction)}>
                    -
                </button>
                <button onClick={() => dispatch(increaseAction)}>
                    +
                </button>
                <button
                    onClick={handleClick}>
                    Call API
                </button>
            </div>
            <div>

                {state.loading && <h2>Loading...</h2>}

                {/* render duration: 87ms */}
                {/* {state.todos.map((todo, i) => (
                    <h5 key={i}>{todo.title}</h5>
                ))} */}

                {/* render duration: 2ms */}
                <List
                    width={700}   // Width of the list
                    height={100}  // Height of the list
                    rowCount={state.todos.length}  // Number of rows in list
                    rowHeight={20}    // Each row height 
                    rowRenderer={rowRenderer}   // Function responsible for rendering a row
                    className="List"  // Adding css
                />

            </div>
        </>
    )
}

export default App2
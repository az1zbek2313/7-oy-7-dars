import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem('todos')?JSON.parse(localStorage.getItem('todos')):[],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    todoAdd: (state, action) => {
      state.value.push(action.payload)
    },
    todoRemove: (state, action) => {
      state.value = state.value.filter(el => el.id != action.payload);
    },
    todoEdit: (state, action) => {
      state.value = state.value.map(el => {
        if (el.id == action.payload.id) {
            el.name = action.payload.name;
            el.age = action.payload.age;
            el.desc = action.payload.desc;
        }
        return el;
      })
    },
  },
})

export const { todoAdd, todoEdit, todoRemove } = counterSlice.actions

export default counterSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
import uuid from 'uuid/v4';

export const todos = createSlice({
  name: 'todos',
  initialState: [
    {
      id: 1,
      text: 'Item 1',
      createdAt: '2017-12-29T15:14:51.733Z',
      pinned: false,
      completed: false
    },
    {
      id: 2,
      text: 'Item 2',
      createdAt: '2019-01-13T13:14:51.733Z',
      pinned: false,
      completed: false
    },
    {
      id: 3,
      text: 'Item 3',
      createdAt: '2019-11-14T19:50:13.556Z',
      pinned: true,
      completed: false
    },
    {
      id: 4,
      text: 'Item 4',
      createdAt: '2019-12-14T19:50:13.556Z',
      pinned: false,
      completed: true
    },
    {
      id: 5,
      text: 'Item 5',
      createdAt: '2020-01-01T14:14:51.733Z',
      pinned: false,
      completed: false
    },
    {
      id: 6,
      text: 'Item 6',
      createdAt: '2020-01-14T19:50:13.556Z',
      pinned: true,
      completed: true
    }
  ],
  reducers: {
    addTodo: {
      reducer(state, action) {
        const { id, text, createdAt } = action.payload;
        state.push({ id, text, createdAt, pinned: false, completed: false });
      },
      prepare({ text }) {
        return {
          payload: {
            text,
            id: uuid(),
            createdAt: new Date().toISOString()
          }
        };
      }
    },
    removeTodo: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearAllTodos: (state, action) => {
      return [];
    },
    clearCompletedTodo: (state, action) => {
      return state.filter(item => item.completed === false);
    },
    toggleCompleted: (state, action) => {
      const { id } = action.payload.todo;
      const todo = state.find(todo => todo.id === id);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    togglePinned: (state, action) => {
      const { id } = action.payload.todo;
      const todo = state.find(todo => todo.id === id);

      if (todo) {
        todo.pinned = !todo.pinned;
      }
    }
  }
});

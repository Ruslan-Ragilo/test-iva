import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  getItemLocalstorage,
  getTagLocalstorage,
} from '../localstorage/localstorage'
import { actionEdit, IItem, state } from '../types/types'

const initialState: state = {
  listBookmarks: getItemLocalstorage || [],
  listTags: getTagLocalstorage || [],
  isEdit: false,
  editData: [],
  tagForInput: '',
  isTagForInput: false,
  valueRegExp: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<IItem>) => {
      state.listBookmarks.push(action.payload)
      state.valueRegExp = ''
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.listBookmarks = state.listBookmarks.filter(
        (el) => el.id !== action.payload
      )
    },
    editBookmark: (state, action: PayloadAction<actionEdit>) => {
      state.isEdit = true
      state.editData.push(action.payload)
      state.tagForInput = ''
    },
    addEditBookmark: (state, action: PayloadAction<string>) => {
      state.editData[0].value = action.payload
      state.listBookmarks.splice(state.editData[0].index, 1, {
        id: state.editData[0].id,
        value: state.editData[0].value,
      })
      state.editData.splice(0, 1)
      state.isEdit = false
    },
    addTag: (state, action: PayloadAction<IItem>) => {
      state.listTags.push(action.payload)
    },
    isTagOnInput: (state, action: PayloadAction<boolean>) => {
      state.isTagForInput = action.payload
    },
    addTagOnInput: (state, action: PayloadAction<string>) => {
      state.tagForInput = action.payload
    },
    removeTag: (state, action: PayloadAction<IItem>) => {
      state.listTags = state.listTags.filter(
        (el) => el.id !== action.payload.id
      )

      state.listBookmarks = state.listBookmarks.filter(
        (el) => !el.value.includes(action.payload.value)
      )
    },
    //inspect on regExp
    isRegExp: (state, action: PayloadAction<string>) => {
      const regExp = new RegExp(/#[\w]*(\S*)/)
      const arrEx = regExp.exec(action.payload)
      arrEx ? (state.valueRegExp = arrEx[0]) : null
    },
  },
})

export const {
  addBookmark,
  removeBookmark,
  editBookmark,
  addEditBookmark,
  addTag,
  removeTag,
  addTagOnInput,
  isTagOnInput,
  isRegExp,
} = appSlice.actions

export default appSlice.reducer

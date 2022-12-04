import { IItem } from '../types/types'

export let getItemLocalstorage: IItem[]

try {
  getItemLocalstorage = JSON.parse(localStorage.getItem('listBookmarks') || '')
} catch (err) {
  console.log('error', err)
}

export const setItemLocalstorage = (name: string, items: IItem[]) => {
  localStorage.setItem(name, JSON.stringify(items))
}

export let getTagLocalstorage: IItem[]

try {
  getTagLocalstorage = JSON.parse(localStorage.getItem('listTags') || '')
} catch (err) {
  console.log('error', err)
}

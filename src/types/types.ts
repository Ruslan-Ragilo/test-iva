export type TBookmark = {
  id: number
  value: string
}

export type TTag = {
  id: number
  value: string
}

export type TData = {
  dataBookmark: TBookmark[]
  dataTag: TTag[]
}

export type TAction = {
  type: string
  payload: TBookmark
}

export interface IItem {
  id: number
  value: string
}

export interface actionEdit {
  index: number
  id: number
  value: string
}

export interface state {
  listBookmarks: IItem[]
  listTags: IItem[]
  isEdit: boolean
  editData: actionEdit[]
  tagForInput: string
  isTagForInput: boolean
  valueRegExp: string | null
}

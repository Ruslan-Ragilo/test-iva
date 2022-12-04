import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItemLocalstorage } from '../../localstorage/localstorage'
import {
  addBookmark,
  addEditBookmark,
  addTag,
  isRegExp,
  isTagOnInput,
} from '../../slices/appSlice'
import { RootState } from '../../store/store'

const From: FC = () => {
  const [value, setValue] = useState('')
  const state = useSelector((state: RootState) => state.appSlice)
  const dispatch = useDispatch()
  let isTagInput = useRef<Boolean>(false)

  state.valueRegExp ? (isTagInput.current = true) : (isTagInput.current = false)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const inspectSymbol = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isTagInput.current && e.key === '#' && value.includes('#')) {
      e.preventDefault()
    }
  }

  const addItem = () => {
    if (value !== '') {
      dispatch(isTagOnInput(false))
      dispatch(isRegExp(value))
      if (state.valueRegExp) {
        if (
          state.valueRegExp &&
          !state.listTags.join('').includes(state.valueRegExp) //inspect is valueRegExp in list
        ) {
          let tag: string = state.valueRegExp
          dispatch(addTag({ id: Date.now(), value: tag }))

          dispatch(
            addBookmark({
              id: Date.now(),
              value: value,
            })
          )
          setValue('')
        }
      } else {
        dispatch(isTagOnInput(false))
        dispatch(addBookmark({ id: Date.now(), value }))
        setValue('')
      }
    }
  }

  const editItem = () => {
    if (state.isEdit && value !== '') {
      isTagInput.current = false
      dispatch(addEditBookmark(value))
      setValue('')
    }
  }

  useEffect(() => {
    if (value) {
      dispatch(isRegExp(value))
    }
  }, [value])

  //add tag in input after click on tag

  useEffect(() => {
    setValue((prev) => prev + state.tagForInput)
  }, [state.tagForInput])

  //localstorage

  useEffect(() => {
    setItemLocalstorage('listBookmarks', state.listBookmarks)
  }, [state.listBookmarks])

  useEffect(() => {
    setItemLocalstorage('listTags', state.listTags)
  }, [state.listTags])

  //add focus on input if editData[0]

  useEffect(() => {
    if (state.editData[0]) {
      setValue('')
      setValue(state.editData[0].value)
      document.querySelector('input')?.focus()
    }
  }, [state.editData])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        value={value}
        onKeyDown={(e) => inspectSymbol(e)}
        onChange={(e) => onChangeInput(e)}
        placeholder="Введите что-нибудь...."
        type="text"
      />
      {state.isEdit ? (
        <button onClick={() => editItem()} className="btnAddItem">
          Edit
        </button>
      ) : (
        <button onClick={() => addItem()} className="btnAddItem">
          Add
        </button>
      )}
    </form>
  )
}

export default From

import { FC, useEffect } from 'react'
import { Pen, Trash } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setItemLocalstorage } from '../../../localstorage/localstorage'
import { editBookmark, removeBookmark } from '../../../slices/appSlice'
import { RootState } from '../../../store/store'
import DOMPurify from 'dompurify'

interface IItemBookmarkProps {
  value: string
  id: number
  i: number
}

const ItemBookmark: FC<IItemBookmarkProps> = ({ i, id, value }) => {
  const dispath = useDispatch()
  let arrItems = useSelector((state: RootState) => state.appSlice.listBookmarks)

  const state = useSelector((state: RootState) => state.appSlice.listTags)

  const filterTag = state.filter((el) => value.includes(el.value))

  const visibleTag =
    filterTag.length > 0
      ? value.replace(
          filterTag[0].value,
          `<b className='l'>${filterTag[0].value}</b>`
        )
      : value

  const removeItem = () => {
    dispath(removeBookmark(id))
  }

  const editItem = (index: number, id: number, value: string) => {
    dispath(editBookmark({ index, id, value }))
  }

  useEffect(() => {
    setItemLocalstorage('listBookmarks', arrItems)
  }, [arrItems])

  return (
    <li>
      <span
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(visibleTag) }}
      />
      <span>
        <Pen onClick={() => editItem(i, id, value)} color="blue" size={20} />
      </span>
      <span>
        <Trash onClick={() => removeItem()} color="red" size={26} />
      </span>
    </li>
  )
}

export default ItemBookmark

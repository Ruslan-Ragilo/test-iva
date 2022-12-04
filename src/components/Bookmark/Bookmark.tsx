import { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import ItemBookmark from './ItemBookmark/ItemBookmark'

interface IBookmarkProps {}

const Bookmark: FC<IBookmarkProps> = (props) => {
  let arrItems = useSelector((state: RootState) => state.appSlice.listBookmarks)

  return (
    <ul className="listBookmark">
      {arrItems.length > 0 &&
        arrItems.map((el, i) => (
          <ItemBookmark value={el.value} id={el.id} i={i} key={el.id} />
        ))}
    </ul>
  )
}

export default Bookmark

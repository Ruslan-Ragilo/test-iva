import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { addTagOnInput, removeTag } from '../../../slices/appSlice'

interface IItemTagProps {
  id: number
  value: string
}

const ItemTag: FC<IItemTagProps> = ({ id, value }) => {
  const dispatch = useDispatch()

  return (
    <li>
      <span onClick={() => dispatch(addTagOnInput(value))} className="titleTag">
        {value}
      </span>
      <span
        onClick={() => dispatch(removeTag({ id, value }))}
        className="btnRemoveTag"
      >
        X
      </span>
    </li>
  )
}

export default ItemTag

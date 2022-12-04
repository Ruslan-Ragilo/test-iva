import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { IItem } from '../../types/types'
import ItemTag from './ItemTag/ItemTag'

interface IListTagsProps {}

const ListTags: React.FunctionComponent<IListTagsProps> = (props) => {
  const state = useSelector((state: RootState) => state.appSlice)

  const [listTagsRender, setListTagsRender] = useState<IItem[]>([])

  useEffect(() => {
    setListTagsRender(state.listTags)
  }, [state.listTags, state.isTagForInput])

  return (
    <div className="wrapperTags">
      <h2>Список тегов</h2>
      <ul className="ListTags">
        {listTagsRender.length > 0 &&
          !state.isTagForInput &&
          listTagsRender.map((el) => (
            <ItemTag key={el.id} id={el.id} value={el.value} />
          ))}
      </ul>
    </div>
  )
}

export default ListTags

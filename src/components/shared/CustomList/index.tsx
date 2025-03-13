import { FC, memo } from "react"

import "./index.css"

type ListData<T> = {
    id: number,
    value: T,
}

type TextListData = ListData<string>

type CustomListProps = {
    listData: TextListData[],
    handleClick: (id: number) => void,
}

const CustomList: FC<CustomListProps> = ({listData, handleClick}) => {
    const listItems = listData.map((itemData) => {
        return (
            <li
                className="taro-custom-list__item"
                key={itemData.id}
                onClick={() => handleClick(itemData.id)}
            >
                {itemData.value}
            </li>
        )
    })

    return (
        <div className="taro-custom-list">
            <ul className="taro-custom-list__inner">
                {listItems}
            </ul>
        </div>
    )
}

export default memo(CustomList)

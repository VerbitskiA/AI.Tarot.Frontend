import { FC, memo, useRef } from "react"

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

// TODO: add p, m, border props, realize getWidth
const getWidth = (listData: TextListData[]) => {
    // const padding = 10
    // const border = 1
    // const margin = 2

    return {width: `${2855}px`}
}

const CustomList: FC<CustomListProps> = ({listData, handleClick}) => {
    const innerBlockWidth = useRef(getWidth(listData))
    
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
            <ul className="taro-custom-list__inner" style={innerBlockWidth.current}>
                {listItems}
            </ul>
        </div>
    )
}

export default memo(CustomList)

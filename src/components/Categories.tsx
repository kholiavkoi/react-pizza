import React from 'react'

type CategoriesProps = {
    categoryId: number
    onClickCategory: (id: number) => void
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export const Categories: React.FC<CategoriesProps> = React.memo(({categoryId, onClickCategory}) => {

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li key={`${categoryName}_${i}`} onClick={() => onClickCategory(i)} className={categoryId === i ? 'active' : ''}>{categoryName}</li>
                ))}
            </ul>
        </div>
    )
})

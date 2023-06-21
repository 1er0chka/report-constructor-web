import React, {useState} from "react";
import style from "./Buttons.module.css";

const ColumnsButton = ({tableColumns, isColumnsRelevant, setColumnsRelevant, activateAddButton}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState('Не выбрано');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const selectColumn = (columnName) => {
        setColumnsRelevant(true);
        setSelectedColumn(columnName);
        toggleDropdown();
        activateAddButton(columnName);
    }

    return (
        <div className={style.dropdown}>
            <button className={style.dropdownToggle}>{isColumnsRelevant ? selectedColumn : 'Не выбрано'}</button>
            <ul className={style.dropdownMenu}>
                {Object.keys(tableColumns).map((key, index) => (
                    <li key={index} onClick={() => selectColumn(key)}>
                        {key}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColumnsButton;
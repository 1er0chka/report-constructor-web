import React, {useState} from "react";
import style from "./Buttons.module.css";

const ColumnsButton = ({tableColumns}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState('Не выбрано');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const selectColumn = (columnName) => {
        setSelectedColumn(columnName);
        toggleDropdown();
    }

    return (
        <div className={style.dropdown}>
            <button className={style.dropdownToggle}>{selectedColumn || 'Не выбрано'}</button>
            <ul className={style.dropdownMenu}>
                {tableColumns.map((columnName, index) => (
                    <li key={index} onClick={() => selectColumn(columnName)}>
                        {columnName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColumnsButton;
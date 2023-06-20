import React, {useState} from "react";
import style from "./Buttons.module.css";

const TableButton = ({tableNames, getTableColumns}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState('Не выбрано');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const selectTable = (tableName) => {
        setSelectedTable(tableName);
        toggleDropdown();
        getTableColumns(tableName);
    }

    return (
        <div className={style.dropdown}>
            <button className={style.dropdownToggle}>{selectedTable}</button>
            <ul className={style.dropdownMenu}>
                {tableNames.map((tableName, index) => (
                    <li key={index} onClick={() => selectTable(tableName)}>
                        {tableName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TableButton;
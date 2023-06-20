import React, {useState} from "react";
import style from "./Buttons.module.css";

const TableButton = ({tableNames}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState('Не выбрано');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }


    const selectTable = (tableName) => {
        setSelectedTable(tableName);
        toggleDropdown();
        fetch(`http://localhost:2006/report-create/${tableName}`)
            .then((response) => response.json())
            .then((data) => {
                // Обработка успешного ответа
                console.log("GET запрос выполнен успешно");
                console.log("Ответ сервера:", data);
            })
            .catch((error) => {
                // Обработка ошибки
                console.error("Ошибка при выполнении GET запроса:", error);
            });
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
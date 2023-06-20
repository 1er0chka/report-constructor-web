import React from "react";
import style from "./Buttons.module.css";

const ColumnsButton = () => {
    return (
        <div className={style.dropdown}>
            <button className={style.dropdownToggle}>Не выбрано </button>
            <ul className={style.dropdownMenu}>
                <li>Пункт 1</li>
                <li>Пункт 1</li>
                <li>Пункт 1</li>
            </ul>
        </div>
    )
}

export default ColumnsButton;
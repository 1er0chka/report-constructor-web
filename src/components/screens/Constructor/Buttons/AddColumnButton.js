import React from "react";
import style from "./Buttons.module.css";

const AddColumnButton = ({isActive, addColumn}) => {
    console.log(isActive)
    return (
        <div>
            <button className={`${style.button} ${isActive ? style.active : ""}`} disabled={!isActive} onClick={() => addColumn()}>
                Добавить данные в таблицу
            </button>
        </div>
    )
}

export default AddColumnButton;
import React, {useEffect, useState} from "react";
import style from './Constructor.module.css'
import TableButton from "./Buttons/TablesButton";
import ColumnsButton from "./Buttons/ColumnsButton";

const Constructor = () => {
    const [tableNames, setTableNames] = useState([]);

    useEffect(() => {
        getTableNames();
    }, []);

    function getTableNames() {
        fetch(`http://localhost:2006/report-create/`)
            .then(response => response.json())
            .then(data => {
                console.log("GET request completed successfully");
                console.log("Server response:", data);
                setTableNames(data.tables);
            })
            .catch((error) => {
                // Обработка ошибки
                console.error("Error occurred during GET request:", error);
            });
    }

    return (
        <div>
            <div className={style.headLine}></div>
            <div className={style.header}>
                <div className={style.container}>
                    <div className={style.title}>
                        Конструктор отчетов
                    </div>
                </div>
            </div>
            <div className={style.header}>
                <div className={style.selectMenu}>
                    <div>
                        <div className={style.text}>
                            Выберите таблицу
                        </div>
                        <div>
                            <TableButton tableNames={tableNames}/>
                        </div>
                    </div>
                    <div>
                        <div className={style.text}>
                            Выберите поле
                        </div>
                        <div>
                            <ColumnsButton/>
                        </div>
                    </div>
                    <div className={style.text}>
                        Кнопка го
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Constructor;
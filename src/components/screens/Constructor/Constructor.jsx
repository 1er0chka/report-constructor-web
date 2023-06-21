import React, {useEffect, useState} from "react";
import * as XLSX from 'xlsx'
import style from './Constructor.module.css';
import TableButton from "./Buttons/TablesButton";
import ColumnsButton from "./Buttons/ColumnsButton";
import AddColumnButton from "./Buttons/AddColumnButton";
import Table from "./Table/Table";

const Constructor = () => {
    const [tableNames, setTableNames] = useState([]);
    const [tableColumns, setTableColumns] = useState({});
    const [selectedTable, setSelectedTable] = useState("");
    const [isColumnsRelevant, setColumnsRelevant] = useState([true]);
    const [selectedColumn, setSelectedColumn] = useState("");
    const [isAddButtonActive, setAddButtonActive] = useState(false);
    const [tableColumnsValues, setTableColumnsValues] = useState({});

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
                console.error("Error occurred during GET request:", error);
            });
    }

    function getTableColumns(tableName) {
        fetch(`http://localhost:2006/report-create/${tableName}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("GET request completed successfully");
                console.log("Server response:", data);
                setTableColumns(data.columns);
                setSelectedTable(tableName);
                setColumnsRelevant(false);
                setAddButtonActive(false);
                //setTableColumnsValues({});
            })
            .catch((error) => {
                console.error("Error occurred during GET request:", error);
            });
    }

    function activateAddButton(selectedColumn) {
        setSelectedColumn(selectedColumn);
        setAddButtonActive(tableColumns[selectedColumn]);
    }

    function addColumn() {
        fetch(`http://localhost:2006/report-create/${selectedTable}/${tableColumns[selectedColumn]}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("GET request completed successfully");
                console.log("Server response:", data);
                setTableColumnsValues(prevTableColumnsValues => ({
                    ...prevTableColumnsValues,
                    [selectedColumn]: data.rows
                }));
            })
            .catch((error) => {
                console.error("Error occurred during GET request:", error);
            });
    }
    function getCurrentData() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = String(currentDate.getFullYear()).slice(2);
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        return `${day}${month}${year}-${hours}${minutes}`;
    }

    function exportToExcel(tableData) {
        const worksheet = XLSX.utils.table_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'report_' + getCurrentData() + '.xlsx');
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
                            <TableButton tableNames={tableNames} getTableColumns={getTableColumns}/>
                        </div>
                    </div>
                    <div>
                        <div className={style.text}>
                            Выберите поле
                        </div>
                        <div>
                            <ColumnsButton
                                tableColumns={tableColumns}
                                isColumnsRelevant={isColumnsRelevant}
                                setColumnsRelevant={setColumnsRelevant}
                                activateAddButton={activateAddButton}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <AddColumnButton isActive={isAddButtonActive} addColumn={addColumn}/>
                        </div>
                    </div>
                </div>
            </div>
            <Table columnsWithRows={tableColumnsValues} exportToExcel={exportToExcel}/>
        </div>
    );
};

export default Constructor;

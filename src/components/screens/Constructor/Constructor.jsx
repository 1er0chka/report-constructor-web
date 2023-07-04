import React, {useEffect, useState} from "react";
import * as XLSX from 'xlsx'
import style from './Constructor.module.css';
import TableButton from "./Buttons/TablesButton";
import ColumnsButton from "./Buttons/ColumnsButton";
import AddColumnButton from "./Buttons/AddColumnButton";
import Table from "./Table/Table";

const Constructor = () => {
    const [allChoosingTables, setAllChoosingTables] = useState({}); // названия таблиц, которые есть в итоговой таблице
    const [tableNames, setTableNames] = useState([]); // названия таблиц, доступных для выбора
    const [tableColumns, setTableColumns] = useState({}); // названия всех колонок выбранной таблицы
    const [selectedTable, setSelectedTable] = useState("");
    const [isColumnsRelevant, setColumnsRelevant] = useState(true);
    const [selectedColumn, setSelectedColumn] = useState("");
    const [isAddButtonActive, setAddButtonActive] = useState(false);
    const [tableColumnsValues, setTableColumnsValues] = useState({}); // итоговая таблица

    useEffect(() => {
        getTable();
    }, []);

    function getTable() {
        if (Object.keys(allChoosingTables).length === 0 && selectedColumn === "") {
            getFirstColumn();
        } else {
            getMoreColumns();
        }
    }

    function getFirstColumn() {
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

    function getMoreColumns() {
        let copy = {...allChoosingTables};
        if (copy.hasOwnProperty(selectedTable)) {
            copy[selectedTable].push(tableColumns[selectedColumn]);
        } else {
            copy[selectedTable] = [tableColumns[selectedColumn]];
        }
        const data = {
            tables: copy
        }
        if (allChoosingTables.hasOwnProperty(selectedTable)) {
            allChoosingTables[selectedTable].push(tableColumns[selectedColumn]);
        } else {
            allChoosingTables[selectedTable] = [tableColumns[selectedColumn]];
        }
        fetch(`http://localhost:2006/report-create/getTable/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (Object.keys(data).includes("error")) {
                    throw new Error();
                }
                console.log("GET request completed successfully");
                console.log("Server response:", data);
                setTableNames(data.tables);
                console.log(data.data);
                setTableColumnsValues(data.data);
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
            })
            .catch((error) => {
                console.error("Error occurred during GET request:", error);
            });
        console.log(allChoosingTables);
    }

    function activateAddButton(selectedColumn) {
        setSelectedColumn(selectedColumn);
        setAddButtonActive(tableColumns[selectedColumn]);
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
                            <AddColumnButton isActive={isAddButtonActive} addColumn={getTable}/>
                        </div>
                    </div>
                </div>
            </div>
            <Table columnsWithRows={tableColumnsValues} exportToExcel={exportToExcel}/>
        </div>
    );
};

export default Constructor;

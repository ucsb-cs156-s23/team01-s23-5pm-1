import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useNavigate } from "react-router-dom";
import { courseUtils } from "main/utils/courseUtils";

const showCell = (cell) => JSON.stringify(cell.row.values);


const defaultDeleteCallback = async (cell) => {
    console.log(`deleteCallback: ${showCell(cell)})`);
    courseUtils.del(cell.row.values.id);
}

export default function CourseTable({
    courses,
    deleteCallback = defaultDeleteCallback,
    showButtons = true,
    testIdPrefix = "CourseTable" }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        console.log(`editCallback: ${showCell(cell)})`);
        navigate(`/courses/edit/${cell.row.values.id}`)
    }

    const detailsCallback = (cell) => {
        console.log(`detailsCallback: ${showCell(cell)})`);
        navigate(`/courses/details/${cell.row.values.id}`)
    }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },

        {
            Header: 'Course Title',
            accessor: 'title',
        },
        {
            Header: 'Course Number',
            accessor: 'courseNumber',
        },
        {
            Header: 'Department',
            accessor: 'Department',
        }
    ];

    const buttonColumns = [
        ...columns,
        ButtonColumn("Details", "primary", detailsCallback, testIdPrefix),
        ButtonColumn("Edit", "primary", editCallback, testIdPrefix),
        ButtonColumn("Delete", "danger", deleteCallback, testIdPrefix),
    ]

    const columnsToDisplay = showButtons ? buttonColumns : columns;

    return <OurTable
        data={courses}
        columns={columnsToDisplay}
        testid={testIdPrefix}
    />;
};

export { showCell };
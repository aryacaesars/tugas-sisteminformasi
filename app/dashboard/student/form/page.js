"use client";
import React from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as XLSX from "xlsx";

const ReportTemplate = () => {
    const generateDocx = () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun("This is a sample .docx report template."),
                                new TextRun({
                                    text: " Generated using docx library.",
                                    bold: true,
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "report-template.docx");
        });
    };

    const generateXlsx = () => {
        const worksheet = XLSX.utils.json_to_sheet([
            { Name: "John Doe", Age: 25, Grade: "A" },
            { Name: "Jane Smith", Age: 22, Grade: "B" },
        ]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([xlsxData], { type: "application/octet-stream" });
        saveAs(blob, "report-template.xlsx");
    };

    return (
        <div>
            <h1>Report Template Generator</h1>
            <button onClick={generateDocx}>Generate .docx Template</button>
            <button onClick={generateXlsx}>Generate .xlsx Template</button>
        </div>
    );
};

export default ReportTemplate;

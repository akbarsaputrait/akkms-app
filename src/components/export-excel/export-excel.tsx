import { Button } from "@material-tailwind/react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const ExportExcel = ({ disabled = false, excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(file, fileName + fileExtension);
  };

  return (
    <Button disabled={disabled} onClick={exportToExcel}>
      Unduh Excel
    </Button>
  );
};

export default ExportExcel;

import * as XLSX from 'xlsx';

export class ExcelExportService {
  constructor() {}

  exportToExcel(jsonData: any[], columnMapping: { [key: string]: string }, fileName: string): void {
    const mappedData = jsonData.map((item) => {
      const mappedItem: { [key: string]: any } = {};
      Object.keys(columnMapping).forEach((key) => {
        mappedItem[columnMapping[key]] = item[key];
      });
      return mappedItem;
    });
    const worksheet = XLSX.utils.json_to_sheet(mappedData);
    const workbook = {
      Sheets: {
        'data': worksheet
      },
      SheetNames: ['data'],
      Workbook: {
        Views: [
          { RTL: true }
        ]
      }
    };
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}

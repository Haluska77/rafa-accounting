import { Component } from '@angular/core';
import { CsvParserService } from '../_service/csv-parser.service';

interface FilterRule {
  column: number;
  filter: (csvValue: string, filterValue: string) => boolean;
}

interface Header {
  nodeName: string;
  name: string;
  nodeType: string;
  validate?: (value: string) => boolean;
}

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrl: './accounting.component.css'
})
export class AccountingComponent {
  constructor(private csvParcerService: CsvParserService) { }

  csvData: string[][] = [];
  filteredData: any[][] = [];
  activeFilters: { [key: string]: string } = {};

  headers: Header[] = [
    { nodeName: 'datum', name: 'Dátum', nodeType: '', validate: (value) => this.csvParcerService.isDateValid(value) === false },
    { nodeName: 'zdroj', name: 'Zdroj', nodeType: 'select' },
    { nodeName: 'pohyb', name: 'Pohyb', nodeType: 'select' },
    { nodeName: 'suma', name: 'Suma', nodeType: '', validate: (value) => this.csvParcerService.isNumberValid(value) === false },
    { nodeName: 'polozka', name: 'Položka', nodeType: 'select' },
    { nodeName: 'popis', name: 'Popis', nodeType: '' },
    { nodeName: 'ucel', name: 'Účel', nodeType: 'select' },
  ];

  filteringRuleMap = new Map<string, FilterRule>([
    ['dateFrom', { column: 0, filter: (csvValue, filterValue) => new Date(this.csvParcerService.convertStringToUTCDate(csvValue)).getTime() >= new Date(filterValue).getTime() }],
    ['dateTo', { column: 0, filter: (csvValue, filterValue) => new Date(this.csvParcerService.convertStringToUTCDate(csvValue)).getTime() <= new Date(filterValue).getTime() }],
    ['zdroj', { column: 1, filter: (csvValue, filterValue) => csvValue === filterValue }],
    ['pohyb', { column: 2, filter: (csvValue, filterValue) => csvValue === filterValue }],
    ['polozka', { column: 4, filter: (csvValue, filterValue) => csvValue === filterValue }],
    ['ucel', { column: 6, filter: (csvValue, filterValue) => csvValue === filterValue }]
  ]);

  fromDateFilter: Date | null = null;
  toDateFilter: Date | null = null;
  invalidFieldCount: number = 0;

  DELIMITER: string = ';';
  NEWLINE: string = '\r\n';

  uploadFile(event: any): void {
    const file = event.target.files[0];

    if (file && file.type === 'text/csv') {
      this.parseCsv(file);
    } else {
      this.csvParcerService.openAlert('Invalid file type', 'Please upload a CSV file.')
    }
  }

  private parseCsv(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;

      this.csvData = content.split(this.NEWLINE)
        .filter((line: any) => line.trim() !== "")
        .map((line) => line.split(this.DELIMITER));

      this.filteredData = this.validateData(this.csvData);
    };

    reader.readAsText(file);

  }

  validateData(data: any[][]): any[][] {
    this.invalidFieldCount = 0;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const invalidFieldIndex: number[] = [];
      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        if (j >= this.headers.length) {
          invalidFieldIndex.push(j);
          this.invalidFieldCount++;
        }
        if (this.headers[j]?.validate && this.headers[j]?.validate?.(value)) {
          invalidFieldIndex.push(j);
          this.invalidFieldCount++;
        }
      }
      row.push(invalidFieldIndex);
    }
    return data;
  }

  calculateSum(columnIndex: number): number {
    const rawSum = this.filteredData.reduce(

      (sum, row) => sum + parseFloat(row[columnIndex] || '0'), 0);

    return rawSum;
  }

  createSelect(header: string): string[] {
    const columnIndex = this.headers.findIndex(item => item.nodeName === header);
    return this.getUniqueValues(columnIndex);
  }

  private getUniqueValues(columnIndex: number): string[] {
    const valuesSet = new Set<string>();
    this.csvData.forEach((row) => valuesSet.add(row[columnIndex]));
    return Array.from(valuesSet);
  }

  eventToString(event: any): string {
    return (event.target as HTMLInputElement).value;
  }

  onChange(header: string, selectedValue: any): void {

    if (selectedValue != '-' && selectedValue != '') {
      this.activeFilters[header] = selectedValue;
    } else {
      delete this.activeFilters[header];
    }
    this.filteredData = this.applyAllFilters();
  }

  private applyAllFilters(): string[][] {

    return this.csvData.filter(row => {
      return Object.entries(this.activeFilters).every(([header, value]) => {
        const columnIndex = this.filteringRuleMap.get(header)?.column;

        if (columnIndex == undefined) {
          return true;
        } else {
          return this.filteringRuleMap.get(header)?.filter(row[columnIndex], value);
        }
      });
    });
  }

  uploadBankPaymentsFile(event: any): void {
    const file = event.target.files[0];

    if (file && file.type === 'text/csv') {
      this.parseCsv(file);
    } else {
      this.csvParcerService.openAlert('Invalid file type', 'Please upload a CSV file.')
    }
  }

  private parseBankPaymentCsv(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;

      this.csvData = content.split(this.NEWLINE)
        .filter((line: any) => line.trim() !== "")
        .map((line) => line.split(this.DELIMITER));

      this.filteredData = this.validateData(this.csvData);
    };

    reader.readAsText(file);

  }
}

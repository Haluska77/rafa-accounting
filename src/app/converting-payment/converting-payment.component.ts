import { Component } from '@angular/core';
import { CsvParserService } from '../_service/csv-parser.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-converting-payment',
  templateUrl: './converting-payment.component.html',
  styleUrl: './converting-payment.component.css'
})

export class ConvertingPaymentComponent {
  constructor(
    private csvParcerService: CsvParserService,
  private clipboard: Clipboard  ) { }

  DELIMITER: string = ';';
  NEWLINE: string = '\r\n';

  csvData: string[][] = [];
  filteredData: string = '';

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
        .map((line) => line.split(this.DELIMITER))
        .slice(1);

      this.filteredData = this.adjustCsv(this.csvData);
    };

    reader.readAsText(file);

  }

  private trimData(data: string): string {
    if (data.startsWith("\"")) {
      data = data.slice(1);
    }
    if (data.endsWith("\"")) {
      data = data.slice(0, -1);
    }
    return data;
  }

  private adjustCsv(data: string[][]): string {
    let myCsv: string[] = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      let rowCsv: string[] = [];
      rowCsv.push(this.trimData(row[0]));
      rowCsv.push('Banka');
      rowCsv.push(this.trimData(row[1]).startsWith('-') ? 'V' : 'P');
      rowCsv.push(this.trimData(row[1]).replace(",", "."));
      rowCsv.push('2%');
      let description = this.trimData(row[4]);
      if (description === ' ' || description === '') {
        description = this.trimData(row[3]);
      } 
      rowCsv.push(description);
      let rowText = rowCsv.join(this.DELIMITER);
      myCsv.push(rowText);
    }
    let csvText = myCsv.join(this.NEWLINE);
    return csvText;
  }

  copyToClipboard(data: string) {
    const content = document.getElementById('content').innerHTML;
    this.clipboard.copy(data);
  }
}

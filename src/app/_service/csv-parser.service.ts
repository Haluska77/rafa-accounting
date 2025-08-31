import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvParserService {
  constructor(
    // private dialog: MatDialog
  ) {}

  openAlert(title: string, message: string): void {
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '300px';
    // dialogConfig.height = '200px';
    // dialogConfig.panelClass = 'alert-dialog-container';
    // dialogConfig.data = {
    //   title: title,
    //   message: message,
    // };
  
    // this.dialog.open(AlertComponent, dialogConfig);
  }

  convertStringToUTCDate(csvDate: string): Date {
    const dateComponents = csvDate.split('.');
    const day = parseInt(dateComponents[0], 10);
    const month = parseInt(dateComponents[1], 10) - 1; // Months are zero-based in JavaScript
    const year = parseInt(dateComponents[2], 10);

    return new Date(Date.UTC(year, month, day));
  }
  
  isDateValid(csvDate: string): boolean {
    const dateComponents = csvDate.split('.');
    const formattedDate = new Date(`${dateComponents[2]}/${dateComponents[1]}/${dateComponents[0]}`);

    return !isNaN(formattedDate.getTime());
  }

  isNumberValid(csvNumber: string): boolean {
    const regex = /^-?\d*\.?\d+$/;
    return regex.test(csvNumber);
  }

}

import { Injectable } from '@angular/core';
import { ToastService } from '@client/core/services/toast.service';
import { saveAs } from 'file-saver';

export interface IWorksheetColumn {
  key: string;
  header: string;
}

@Injectable({
  providedIn: 'root'
})

export class ExportService {

  constructor(private toastService: ToastService) { }

  public pdf(data: ArrayBuffer, fileName: string) {
    this.saveFile(data, fileName, 'application/pdf');
  }

  public downloadImage(data: ArrayBuffer, fileName: string) {
    this.saveFile(data, fileName, 'image/png');
  }

  public saveFile(data: any, fileName: string, type: string): void {
    try {
      const blob = new Blob([data], { type });
      saveAs(blob, fileName);
    } catch (error) {
      this.toastService.show('خطایی در ذخیره فایل رخ داده است', { classname: 'bg-danger text-light' });
    }
  }
}

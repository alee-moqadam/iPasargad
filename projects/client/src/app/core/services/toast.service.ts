import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options, show: true });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clearByTag(tag: string) {
    this.toasts = this.toasts.filter(t => t.tag !== tag);
  }

  copyToClipboard(text: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Use the modern Clipboard API
      navigator.clipboard.writeText(text).then(() => {
        this.show('متن کپی شد', {
          classname: 'bg-success text-light',
          delay: 1000
        });
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback for older browsers (including some Safari versions)
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed'; // Prevent scrolling to the bottom
      textarea.style.opacity = '0'; // Hide it from view
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.show('متن کپی شد', {
          classname: 'bg-success text-light',
          delay: 1000
        });
      } catch (err) {
        console.error('Failed to copy text using fallback method: ', err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }
}
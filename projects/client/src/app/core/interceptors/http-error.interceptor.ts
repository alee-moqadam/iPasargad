import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@client/core/services/toast.service';
import { catchError, delay, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastService = inject(ToastService);
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log("error", error);

      switch (error.status) {
        case 400: {
          toastService.show(error.error.message || error.error.Message || error.error.errorMessage, {
            classname: 'bg-danger text-light',
            delay: 10000
          });
          break;
        }
        case 404: {

          toastService.show('درخواست مورد نظر یافت نشد!', {
            classname: 'bg-danger text-light',
            delay: 10000
          });
          break;
        }
        case 401: {
          authService.logout();
          window.location.href = './auth/login';
          break;
        }
        case 403: {
          authService.logout();
          window.location.href = './auth/login';
          break;
        }
        case 429: {
          toastService.show(error.error.message || error.error.Message || error.error.ErrorMessage || error.error.errorMessage || 'تعداد درخواست بیش از حد مجاز است. لطفا اندکی بعد دوباره امتحان کنید!', {
            classname: 'bg-danger text-light',
            delay: 10000
          });
          break;
        }
        default: {
          //لزومی نداره کاربر مشکلات اینجا رو ببینه
          // toastService.show(
          //   'متاسفانه خطایی در سامانه رخ داده است، لطفاً با پشتیبانی تماس حاصل فرمائید.',
          //   { classname: 'bg-danger text-light' }
          // );
        }
      }
      return throwError(() => error);
    })
  );
};

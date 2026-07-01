import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

export const httpResponseInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    map((event: any) => {
      const isSuccess = event.body?.bRuleCode == undefined ||
        event.body?.bRuleCode == null ||
        !event.body?.isError ||
        event.body?.bRuleCode === 1000;
      const hasError = !isSuccess || event.body?.isSuccess == false
      if (event instanceof HttpResponse && hasError) {
        throw new HttpErrorResponse({
          error: { message: event.body?.message || event.body?.errorMessage ,code: event.body?.Code || event.body?.errorCode || event.body?.bRuleCode},
          headers: event.headers,
          status: 400,
          statusText: 'Bad Request',
          url: event.url
        });
      }

      if (event instanceof HttpResponse && isSuccess) {

        let data = {};

        if (Array.isArray(event?.body)) {
          data["result"] = event.body;
        } else if (event?.body?.rows) {
          data = event?.body;
          data["result"] = event.body?.rows;
          delete data["rows"];
        } else if (!(event?.body instanceof ArrayBuffer) && typeof (event?.body) === "object" && !event?.body?.hasOwnProperty("result")) {
          data["result"] = event.body;
        } else {
          data = event?.body;
        }
        const newResponse = new HttpResponse({
          body: data,
          headers: event.headers,
          status: event.status,
          statusText: event.statusText,
          url: event.url
        });

        return newResponse;
      }

      return event;

    })
  )
};

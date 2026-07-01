import { inject } from '@angular/core';
import { ActivatedRoute, ResolveFn } from '@angular/router';

export const fundCodeResolver: ResolveFn<string> = (route, state) => {
  return route.paramMap.get('fundCode');
};

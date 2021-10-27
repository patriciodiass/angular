import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonthService {
  apiName = 'Default';

  isMonthClosedByDate = (date: string) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/month/is-month-closed',
      params: { date },
    },
    { apiName: this.apiName });

  openOrCloseMonthByDate = (date: string) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/month/open-or-close-month',
      params: { date },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

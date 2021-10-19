import type { MonthDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonthService {
  apiName = 'Default';

  closeMonthByDate = (date: string) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/month/close-month',
      params: { date },
    },
    { apiName: this.apiName });

  getMonths = () =>
    this.restService.request<any, MonthDto[]>({
      method: 'GET',
      url: '/api/app/month/months',
    },
    { apiName: this.apiName });

  isMonthClosedByDate = (date: string) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/month/is-month-closed',
      params: { date },
    },
    { apiName: this.apiName });

  openMonthByDate = (date: string) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/month/open-month',
      params: { date },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

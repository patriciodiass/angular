import type { CreateImportDto, ImportDto, UpdateImportDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TagDto } from '../tags/models';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  apiName = 'Default';

  create = (input: CreateImportDto) =>
    this.restService.request<any, ImportDto>({
      method: 'POST',
      url: '/api/app/import',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/import/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ImportDto>({
      method: 'GET',
      url: `/api/app/import/${id}`,
    },
    { apiName: this.apiName });

  getAllImports = () =>
    this.restService.request<any, ImportDto[]>({
      method: 'GET',
      url: '/api/app/import/imports',
    },
    { apiName: this.apiName });

  getAllListByDayBySelectedDays = (selectedDays: string[]) =>
    this.restService.request<any, ImportDto[]>({
      method: 'GET',
      url: '/api/app/import/list-by-day',
      params: { selectedDays },
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ImportDto>>({
      method: 'GET',
      url: '/api/app/import',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getListByDayBySelectedDays = (selectedDays: string[]) =>
    this.restService.request<any, ImportDto[]>({
      method: 'GET',
      url: '/api/app/import/by-day',
      params: { selectedDays },
    },
    { apiName: this.apiName });

  getListByTagByTagId = (tagId: string) =>
    this.restService.request<any, ImportDto[]>({
      method: 'GET',
      url: `/api/app/import/by-tag/${tagId}`,
    },
    { apiName: this.apiName });

  getListByUserByMonthByIdAndDateTime = (id: string, dateTime: string) =>
    this.restService.request<any, ImportDto[]>({
      method: 'GET',
      url: `/api/app/import/${id}/by-user-by-month`,
      params: { dateTime },
    },
    { apiName: this.apiName });

  getListOfAssociatedTagsById = (id: string) =>
    this.restService.request<any, TagDto[]>({
      method: 'GET',
      url: `/api/app/import/${id}/of-associated-tags`,
    },
    { apiName: this.apiName });

  getListOfCurrentMonthByDateTime = (dateTime: string) =>
    this.restService.request<any, ImportDto[]>({
      method: 'GET',
      url: '/api/app/import/of-current-month',
      params: { dateTime },
    },
    { apiName: this.apiName });

  getListOfFilledDaysBySelectedDaysAndHoursAndImportId = (selectedDays: string[], hours?: number, importId?: string) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: `/api/app/import/of-filled-days/${importId}`,
      params: { selectedDays, hours },
    },
    { apiName: this.apiName });

  getMyImports = () =>
    this.restService.request<any, ImportDto[]>({
      method: 'GET',
      url: '/api/app/import/my-imports',
    },
    { apiName: this.apiName });

  getUserImportsById = (id: string) =>
    this.restService.request<any, ImportDto[]>({
      method: 'GET',
      url: `/api/app/import/${id}/user-imports`,
    },
    { apiName: this.apiName });

  lockOrUnlockAllImportsByMonthByDateAndLock = (date: string, lock: boolean) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/import/lock-or-unlock-all-imports-by-month',
      params: { date, lock },
    },
    { apiName: this.apiName });

  lockOrUnlockSelectedImportsByListOfImportsAndLock = (listOfImports: ImportDto[], lock: boolean) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/import/lock-or-unlock-selected-imports',
      params: { lock },
      body: listOfImports,
    },
    { apiName: this.apiName });

  lockOrUnlockSingleImportByIdAndLock = (id: string, lock: boolean) =>
    this.restService.request<any, ImportDto>({
      method: 'POST',
      url: `/api/app/import/${id}/lock-or-unlock-single-import`,
      params: { lock },
    },
    { apiName: this.apiName });

  update = (id: string, input: UpdateImportDto) =>
    this.restService.request<any, ImportDto>({
      method: 'PUT',
      url: `/api/app/import/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

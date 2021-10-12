import type { CreateUpdateTagDto, TagDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  apiName = 'Default';

  create = (input: CreateUpdateTagDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/tag',
      body: input,
    },
    { apiName: this.apiName });

  getTagsList = () =>
    this.restService.request<any, TagDto[]>({
      method: 'GET',
      url: '/api/app/tag/tags-list',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

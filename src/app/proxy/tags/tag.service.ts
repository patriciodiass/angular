import type { TagDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  apiName = 'Default';

  createMany = (tagDtos: TagDto[]) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/tag/many',
      body: tagDtos,
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

import type { CreateProjectTypeDto, ProjectTypeDto, UpdateProjectTypeDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectTypeService {
  apiName = 'Default';

  create = (input: CreateProjectTypeDto) =>
    this.restService.request<any, ProjectTypeDto>({
      method: 'POST',
      url: '/api/app/project-type',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/project-type/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ProjectTypeDto>({
      method: 'GET',
      url: `/api/app/project-type/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ProjectTypeDto>>({
      method: 'GET',
      url: '/api/app/project-type',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getListOfProjectTypes = () =>
    this.restService.request<any, ProjectTypeDto[]>({
      method: 'GET',
      url: '/api/app/project-type/of-project-types',
    },
    { apiName: this.apiName });

  update = (id: string, input: UpdateProjectTypeDto) =>
    this.restService.request<any, ProjectTypeDto>({
      method: 'PUT',
      url: `/api/app/project-type/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

import type { CreateProjectDto, ProjectDto, UpdateProjectDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { UserDto } from '../users/models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiName = 'Default';

  create = (input: CreateProjectDto) =>
    this.restService.request<any, ProjectDto>({
      method: 'POST',
      url: '/api/app/project',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/project/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ProjectDto>({
      method: 'GET',
      url: `/api/app/project/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ProjectDto>>({
      method: 'GET',
      url: '/api/app/project',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getListOfAssociatedUsersById = (id: string) =>
    this.restService.request<any, UserDto[]>({
      method: 'GET',
      url: `/api/app/project/${id}/of-associated-users`,
    },
    { apiName: this.apiName });

  getListOfProjects = () =>
    this.restService.request<any, ProjectDto[]>({
      method: 'GET',
      url: '/api/app/project/of-projects',
    },
    { apiName: this.apiName });

  getMyProjects = () =>
    this.restService.request<any, ProjectDto[]>({
      method: 'GET',
      url: '/api/app/project/my-projects',
    },
    { apiName: this.apiName });

  update = (id: string, input: UpdateProjectDto) =>
    this.restService.request<any, ProjectDto>({
      method: 'PUT',
      url: `/api/app/project/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

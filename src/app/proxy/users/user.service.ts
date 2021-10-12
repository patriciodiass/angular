import type { CreateUserDto, UpdateUserDto, UserDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiName = 'Default';

  create = (input: CreateUserDto) =>
    this.restService.request<any, UserDto>({
      method: 'POST',
      url: '/api/app/user',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/user/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, UserDto>({
      method: 'GET',
      url: `/api/app/user/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<UserDto>>({
      method: 'GET',
      url: '/api/app/user',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  getListOfUsers = () =>
    this.restService.request<any, UserDto[]>({
      method: 'GET',
      url: '/api/app/user/of-users',
    },
    { apiName: this.apiName });

  update = (id: string, input: UpdateUserDto) =>
    this.restService.request<any, UserDto>({
      method: 'PUT',
      url: `/api/app/user/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface CreateUserDto {
  id?: string;
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
}

export interface UpdateUserDto {
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
}

export interface UserDto extends FullAuditedEntityDto<string> {
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
}

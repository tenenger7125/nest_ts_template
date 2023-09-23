import { SetMetadata } from '@nestjs/common';

import { META_DATA_KEY } from '@/constants/metaDataKeys';

type RolesType = 'public' | 'admin' | 'manager' | 'user';

export const Roles = (...roles: RolesType[]) => SetMetadata(META_DATA_KEY.ROLE, roles);
export const Public = () => SetMetadata(META_DATA_KEY.ROLE, ['public']);
export const Admin = () => SetMetadata(META_DATA_KEY.ROLE, ['admin']);
export const Manager = () => SetMetadata(META_DATA_KEY.ROLE, ['manager']);
export const User = () => SetMetadata(META_DATA_KEY.ROLE, ['user']);

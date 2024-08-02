export const authKeys = {
  authMutate: ["auth-mutate-key"],
  authForgotPsw: [`auth-forgot-password`],
  authResetPsw: [`auth-reset-password`],
  authChangePsw: [`auth-change-password`],
};

export const userKeys = {
  userList: (data: any) => [
    `user-list-${data.offset ?? 0}`,
    `${data.limit}`,
    `${data.search ?? ""}`,
    `${data.sortBy ?? ""}`,
    `${data.sortOrder ?? ""}`,
  ],
  userDetail: (id: string) => [`user-detail-${id}`],
  userStatus: [`user-status-active-inactive`],
};

export const incidentKeys = {
  incidentList: (data: any) => [
    `incident-list-${data.offset}-${data.userId ?? ""}-${
      data.volunteerId ?? ""
    }`,
    `${data.limit ?? ""}`,
    `${data.search ?? ""}`,
    `${data.sortBy ?? ""}`,
    `${data.sortOrder ?? ""}`,
    `${data.status ?? []}`,
    `${data.type ?? []}`,
  ],
  incidentDelete: [`delete-incident`],
  incidentDetail: (id: string) => [`incident-detail-${id}`],
  incidentCommnetList: (id: string) => [`incident-comment-${id}`],
};

export const volunteerKeys = {
  volunteerList: (data: any) => [
    `volunteer-list`,
    `${data?.limit}`,
    `${data?.offset}`,
    `${data?.search ?? ""}`,
    `${data?.sortBy ?? ""}`,
    `${data?.sortOrder ?? ""}`,
  ],
  volunteerDetail: (id: string) => [`volunteer-detail-${id}`],
  volunteerStatus: [`volunteer-status`],
  volunteerAdd: [`add-volunteer`],
  volunteerEdit: [`edit-volunteer`],
};

export const trainingKeys = {
  trainingList: (data: any) => [
    `training-list`,
    `${data?.limit}`,
    `${data?.offset}`,
    `${data?.search ?? ""}`,
    `${data?.sortBy ?? ""}`,
    `${data?.sortOrder ?? ""}`,
  ],
  trainingDetail: (id: string) => [`training-detail-${id}`],
  trainingDelete: [`training-delete`],
  trainingAdd: [`add-training`],
  trainingEdit: [`edit-training`],
};

export const dashboardKey = {
  dashboardCount: (data: any) => [
    `dashboard-count`,
    `${data?.endDate}`,
    `${data?.startDate}`,
  ],
};

export const cmsKey = {
  cmsList: [`cms-list`],
  cmsDetail: (id: string) => [`cms-detail-${id}`],
  cmsEdit: [`cms-edit`],
};

export const profileKey = {
  profileDetail: [`profile-detail`],
  profileEdit: [`profile-edit`],
};

export const resourceKeys = {
  resourceList: (data: any) => [
    `resource-list`,
    `${data?.limit}`,
    `${data?.offset}`,
    `${data?.search ?? ""}`,
    `${data?.sortBy ?? ""}`,
    `${data?.sortOrder ?? ""}`,
  ],
  resourceDetail: (id: string) => [`resource-detail-${id}`],
  resourceDelete: [`resource-delete`],
  resourceAddEdit: [`add-edit-resource`],
  resourceTypeList: [`resource-type-list`],
  resourceImage: [`resource-image`],
};

export const jsonFileKey = {
  jsonFileType: (fileType: string) => [`json-file-${fileType}`],
};

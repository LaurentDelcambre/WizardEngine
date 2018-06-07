declare module "@apex/CCL_PRFController.getPatientFieldsetNames" {
  export function getPatientFieldsetNames(): Promise<any>;
}
declare module "@apex/CCL_PRFController.initPurposes" {
  export function initPurposes(): Promise<any>;
}
declare module "@apex/CCL_PRFController.filterSitesByPurpose" {
  export function filterSitesByPurpose(param: {purposeId: any}): Promise<any>;
}
declare module "@apex/CCL_PRFController.filterTeamsBySite" {
  export function filterTeamsBySite(param: {siteId: any}): Promise<any>;
}
declare module "@apex/CCL_PRFController.filterHCPsByTeam" {
  export function filterHCPsByTeam(param: {teamId: any}): Promise<any>;
}
declare module "@apex/CCL_PRFController.insertPRFStep1Records" {
  export function insertPRFStep1Records(param: {purposeId: any, siteId: any, teamId: any, HCPId: any}): Promise<any>;
}

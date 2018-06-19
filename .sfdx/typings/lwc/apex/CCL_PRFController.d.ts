declare module "@apex/CCL_PRFController.initPurposes" {
  export function initPurposes(): Promise<any>;
}
declare module "@apex/CCL_PRFController.filterWizardsByPurpose" {
  export function filterWizardsByPurpose(param: {purposeId: any}): Promise<any>;
}
declare module "@apex/CCL_PRFController.getStepsFromMetadata" {
  export function getStepsFromMetadata(param: {selectedWizardId: any}): Promise<any>;
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
  export function insertPRFStep1Records(param: {purposeId: any, siteId: any, teamId: any, HCPId: any, PRFRecordId: any}): Promise<any>;
}
declare module "@apex/CCL_PRFController.initApheresisCenters" {
  export function initApheresisCenters(param: {selectedPurposeId: any, selectedSiteId: any}): Promise<any>;
}
declare module "@apex/CCL_PRFController.getPickUpLocations" {
  export function getPickUpLocations(param: {selectedApheresisCenterId: any}): Promise<any>;
}
declare module "@apex/CCL_PRFController.getInfusionCenters" {
  export function getInfusionCenters(param: {selectedPurposeId: any, selectedSiteId: any}): Promise<any>;
}
declare module "@apex/CCL_PRFController.getShipToLocations" {
  export function getShipToLocations(param: {selectedInfusionCenterId: any}): Promise<any>;
}
declare module "@apex/CCL_PRFController.insertPRFLogisticsRecords" {
  export function insertPRFLogisticsRecords(param: {PRFRecordId: any, apheresisCenterId: any, pickUpLocationId: any, infusionCenterId: any, shipToLocationId: any}): Promise<any>;
}

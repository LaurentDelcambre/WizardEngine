declare module "@salesforce/apex/CCL_PRFController.initPurposes" {
  export default function initPurposes(): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.filterWizardsByPurpose" {
  export default function filterWizardsByPurpose(param: {purposeId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.getStepsFromMetadata" {
  export default function getStepsFromMetadata(param: {selectedWizardName: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.filterSitesByPurpose" {
  export default function filterSitesByPurpose(param: {purposeId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.filterTeamsBySite" {
  export default function filterTeamsBySite(param: {siteId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.filterHCPsByTeam" {
  export default function filterHCPsByTeam(param: {teamId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.insertPRFStep1Records" {
  export default function insertPRFStep1Records(param: {purposeId: any, wizardName: any, siteId: any, teamId: any, HCPId: any, recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.initApheresisCenters" {
  export default function initApheresisCenters(param: {selectedPurposeId: any, selectedSiteId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.getPickUpLocations" {
  export default function getPickUpLocations(param: {selectedApheresisCenterId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.getInfusionCenters" {
  export default function getInfusionCenters(param: {selectedPurposeId: any, selectedSiteId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.getShipToLocations" {
  export default function getShipToLocations(param: {selectedInfusionCenterId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.insertPRFLogisticsRecords" {
  export default function insertPRFLogisticsRecords(param: {recordId: any, apheresisCenterId: any, pickUpLocationId: any, infusionCenterId: any, shipToLocationId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.submitPRF" {
  export default function submitPRF(param: {recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/CCL_PRFController.insertCryobags" {
  export default function insertCryobags(param: {cryobags: any}): Promise<any>;
}

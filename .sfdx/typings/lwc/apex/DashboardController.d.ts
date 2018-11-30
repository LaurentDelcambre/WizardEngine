declare module "@salesforce/apex/DashboardController.loadCases" {
  export default function loadCases(): Promise<any>;
}
declare module "@salesforce/apex/DashboardController.updateCaseStatus" {
  export default function updateCaseStatus(param: {caseId: any}): Promise<any>;
}
declare module "@salesforce/apex/DashboardController.loadThisCase" {
  export default function loadThisCase(param: {caseId: any}): Promise<any>;
}

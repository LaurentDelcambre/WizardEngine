declare module "@apex/DashboardController.loadCases" {
  export function loadCases(): Promise<any>;
}
declare module "@apex/DashboardController.updateCaseStatus" {
  export function updateCaseStatus(param: {caseId: any}): Promise<any>;
}
declare module "@apex/DashboardController.loadThisCase" {
  export function loadThisCase(param: {caseId: any}): Promise<any>;
}

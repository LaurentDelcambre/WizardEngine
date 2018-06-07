public with sharing class CCL_PRFController {
	// Gets Wizzard information
	@AuraEnabled
	public static String[] getPatientFieldsetNames() {
		return [select id, label,Patient_Fieldsets__c from CCL_Wizzard_Configuration__mdt where DeveloperName='US_Commercial'].Patient_Fieldsets__c.split(';');
	}

    @AuraEnabled
	public static List<Purpose__c> initPurposes() {
		return [SELECT Id, Name FROM Purpose__c ORDER BY Name];
	}
    
    @AuraEnabled
	public static List<Account> filterSitesByPurpose(String purposeId) {
		return [
            SELECT Id, Name
              FROM Account
             WHERE Id IN (SELECT Account__c from AccountPurpose__c WHERE Purpose__c =: purposeId) AND RecordType.Name = 'Site' ORDER BY NAME];
	}

	@AuraEnabled
	public static List<Account> filterTeamsBySite(String siteId) {
		return [
            SELECT Id, Name
              FROM Account
             WHERE parentId=:siteId AND RecordType.Name = 'Team' ORDER BY NAME];
	}

	@AuraEnabled
	public static List<Contact> filterHCPsByTeam(String teamId) {
		return [
            SELECT Id, Name
              FROM Contact
             WHERE Id IN (SELECT Contact__c from TeamMember__c WHERE Account__c =: teamId) ORDER BY NAME];
	}

	@AuraEnabled
	public static Id insertPRFStep1Records(Id purposeId, Id siteId, Id teamId, Id HCPId) {
		System.debug('siteId: '+siteId);
		// Insert PRF__c

		// Insert Case
		Case record = new Case();
		record.Purpose__c = purposeId;
		record.AccountId = siteId;
		record.ContactId = HCPId;
		record.Status_Plant_Appointment__c = 'Open';
		record.Status_Overall_Treatment__c = 'In Progress';
		//record.Patient__c = patient.Id;
		record.ADF_Status__c = 'Draft';
		record.PRFSubmittedDate__c   = system.now();
		record.PRF_Status__c = 'Draft';
		record.RecordTypeId = [select id from RecordType where developerName = 'Treatment' limit 1].id;
		insert record;

		// Insert Case Account records
		CaseAccount__c[] cas = new CaseAccount__c[]{};
		cas.add(new CaseAccount__c(Case__c = record.Id, Account__c = siteId, Role__c = 'SITE'));
		cas.add(new CaseAccount__c(Case__c = record.Id, Account__c = teamId, Role__c = 'TEAM'));


		// cas.add(new CaseAccount__c(Case__c = record.Id, Account__c = selectedSiteId, Role__c = 'PLANT'));
		// cas.add(new CaseAccount__c(Case__c = record.Id, Account__c = aphId, Role__c = 'APH'));
		// cas.add(new CaseAccount__c(Case__c = record.Id, Account__c = pickupId, Role__c = 'PICK'));
		// cas.add(new CaseAccount__c(Case__c = record.Id, Account__c = infusionId, Role__c = 'INF'));
		// cas.add(new CaseAccount__c(Case__c = record.Id, Account__c = shipToId, Role__c = 'SHIP'));

		insert cas;
		return record.id;
	}
	
}

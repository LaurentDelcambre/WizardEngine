({
    doInit : function(component, event, helper) {
		
		var action = component.get("c.initPurposes");
    	action.setCallback(this, function(response) {
		var state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.purposes", response.getReturnValue());
			} 
			else if (state === "ERROR") {
				var errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.log("Error message: " + errors[0].message);
					}
				} else {
					console.log("Unknown error");
				}
			}
		});
		$A.enqueueAction(action);
	},
	filterSites : function(component, event, helper) {
		var action = component.get("c.filterSitesByPurpose");
    	action.setParams({purposeId: component.get("v.selectedPurposeId")});
    	action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				// Populate the list of available Sites filtered by Purpose__c
				component.set("v.sites", response.getReturnValue());
				
				// Enable the picklist
				component.find("selectSite").set("v.disabled", false); 
			} else if (state === "ERROR") {
			var errors = response.getError();
			if (errors) {
			if (errors[0] && errors[0].message) {
				console.log("Error message: " + errors[0].message);
			}
			} else {
			console.log("Unknown error");
			}
			}
		});
		$A.enqueueAction(action);
	},
	filterTeams: function(component, event, helper) {
		var action = component.get("c.filterTeamsBySite");
    	action.setParams({siteId: component.get("v.selectedSiteId")});
    	action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				// Populate the list of available Sites filtered by Purpose__c
				component.set("v.teams", response.getReturnValue());
				
				// Enable the picklist
				component.find("selectTeam").set("v.disabled", false); 
			} else if (state === "ERROR") {
				var errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.log("Error message: " + errors[0].message);
					}
				} else {
					console.log("Unknown error");
				}
			}
		});
		$A.enqueueAction(action);
	},
	filterHCPs: function(component, event, helper) {
		var action = component.get("c.filterHCPsByTeam");
    	action.setParams({teamId: component.get("v.selectedTeamId")});
    	action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				// Populate the list of available Sites filtered by Purpose__c
				component.set("v.HCPs", response.getReturnValue());
				
				// Enable the picklist
				component.find("selectHCP").set("v.disabled", false); 
			} else if (state === "ERROR") {
				var errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.log("Error message: " + errors[0].message);
					}
				} else {
					console.log("Unknown error");
				}
			}
		});
		$A.enqueueAction(action);
	},
    clickNext : function(component, event, helper) {
		console.log("CCL_PRF_PurposeSiteController:clickNext");
		console.log("CCL_PRF_PurposeSiteController:selectedSiteId: "+component.get("v.selectedSiteId"));
		
		// Validation
		let selectedPurposeId = component.get("v.selectedPurposeId");
		let selectedSiteId = component.get("v.selectedSiteId");
		let selectedTeamId = component.get("v.selectedTeamId");
		let selectedHCPId = component.get("v.selectedHCPId");

		if(!selectedPurposeId){
			console.error("No purpose");
			return;
		}
		// Create records
		var action = component.get("c.insertPRFStep1Records");
		action.setParams({	purposeId: selectedPurposeId,
							siteId: selectedSiteId,
							teamId: selectedTeamId,
							HCPId: selectedHCPId
						});
		console.log("before set callback");
    	action.setCallback(this, function(response) {
			var state = response.getState();
			console.log("state: "+state);
			if (state === "SUCCESS") {
				console.log('insertPRFStep1Records:callback SUCCESS');
				// Fire Next event with caseRecordId
				var cmpEvent = component.getEvent("navigationEvent");
				cmpEvent.setParams({"navigateAction" : "PurposeSite_Next",
									"recordId" : response.getReturnValue()});
				cmpEvent.fire();
			} else if (state === "ERROR") {
				console.log('insertPRFStep1Records:callback ERROR');
				let errors = response.getError();
				let message = "Unknown error: ";
				if (errors && Array.isArray(errors) && errors.length > 0) {
					errors.forEach(function(error){
						console.log(error);
						if(error.message){
							message = error.message;
						}
						else if(error.fieldErrors && Array.isArray(error.fieldErrors) && error.fieldErrors.length > 0){
							error.fieldErrors.forEach(function(fieldError){
								message = fieldError.message;
							});
						} 
						else if(error.pageErrors && Array.isArray(error.pageErrors) && error.pageErrors.length > 0){
							console.log("inside page error");
							error.pageErrors.forEach(function(pageError){
								message = pageError.message;
							});
						}
						else{
							console.error("error not recognized");
						}
					});
				}
				console.error(message);
			} else{
				console.error("Unknown error: "+state);
			}
		});
		$A.enqueueAction(action);
    }
})

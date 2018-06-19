({
    doInit : function(component, event, helper) {
		if(!component.get("v.selectedPurposeId")){
			helper.initPurposes(component);
		}
		else{
			console.log("before Promise init");
			helper.helperFunctionAsPromise(component, helper.initPurposes)
				.then($A.getCallback(function(){
					return helper.helperFunctionAsPromise(component, helper.filterSites)
				}))
				.then($A.getCallback(function(){
					return helper.helperFunctionAsPromise(component, helper.filterTeams)
				}))
				.then($A.getCallback(function(){
					return helper.helperFunctionAsPromise(component, helper.filterHCPs)
				}))
				.catch($A.getCallback(function(err) {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: 'Error',
                        type: 'error',
                        message: err.message
                    });
                    toastEvent.fire();
                }));
		}
	},
	filterSites: function(component, event, helper){
		// Call the non-Promise version
		helper.filterSites(component);
	},
	filterTeams: function(component, event, helper){
		// Call the non-Promise version
		helper.filterTeams(component);
	},
	filterHCPs: function(component, event, helper){
		// Call the non-Promise version
		helper.filterHCPs(component);
	},
  clickNext : function(component, event, helper) {
		console.log("CCL_PRF_PurposeSiteController:clickNext");
		console.log("CCL_PRF_PurposeSiteController:selectedSiteId: "+component.get("v.selectedSiteId"));
		
		// Validation
		let selectedPurposeId = component.get("v.selectedPurposeId");
		let selectedSiteId = component.get("v.selectedSiteId");
		let selectedTeamId = component.get("v.selectedTeamId");
		let selectedHCPId = component.get("v.selectedHCPId");

		let cmpPurpose = component.find("selectPurpose");
		if(!cmpPurpose.get('v.validity').valid){
			cmpPurpose.showHelpMessageIfInvalid();
			return;
		}
		let cmpSite = component.find("selectSite");
		if(!cmpSite.get('v.validity').valid){
			cmpSite.showHelpMessageIfInvalid();
			return;
		}
		let cmpTeam = component.find("selectTeam");
		if(!cmpTeam.get('v.validity').valid){
			cmpTeam.showHelpMessageIfInvalid();
			return;
		}
		let cmpCHP = component.find("selectHCP");
		if(!cmpCHP.get('v.validity').valid){
			cmpCHP.showHelpMessageIfInvalid();
			return;
		}

		// Create records
		var action = component.get("c.insertPRFStep1Records");
		action.setParams({	purposeId: selectedPurposeId,
							siteId: selectedSiteId,
							teamId: selectedTeamId,
							HCPId: selectedHCPId,
							PRFRecordId: component.get("v.PRFRecordId")
						});
		console.log("before set callback");
    	action.setCallback(this, function(response) {
			var state = response.getState();
			console.log("state: "+state);
			if (state === "SUCCESS") {
				console.log('insertPRFStep1Records:callback SUCCESS');

				// Returned Ids
				let PRFRecordId = response.getReturnValue();
				console.log('PRFRecordId returned form Server call: '+PRFRecordId);

				// Fire Next event with PRFRecordId
				var cmpEvent = component.getEvent("navigationEvent");
				cmpEvent.setParams({
									"navigateOriginComponent" : "PRF_START",
									"navigateAction" : "Next",
									"PRFRecordId" : 		PRFRecordId,
									"selectedPurposeId": 	selectedPurposeId,
									"selectedSiteId": 		selectedSiteId,
									"selectedTeamId": 		selectedTeamId,
									"selectedHCPId": 		selectedHCPId
									});
				cmpEvent.fire();
			} else if (state === "ERROR") {
				console.log('insertPRFStep1Records:callback ERROR');
				helper.displayErrors(response);
			} else{
				console.error("Unknown error: "+state);
			}
		});
		$A.enqueueAction(action);
	},
	clickPrevious: function(component, event) {
    console.log("CCL_PRFController:clickPrevious");
        
		// Fire Previous event
		var cmpEvent = component.getEvent("navigationEvent");
		cmpEvent.setParams({
						"navigateOriginComponent" : "PRF_START",
						"navigateAction" : "Previous",});
		cmpEvent.fire();
	}
})

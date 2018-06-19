({
    // Wraps up any call to a helper function in a Promise. 
    // Make sure that the helper function you use calls resolve and reject in the right places. 
    // Contains Lightning-specific $A.getCallback() to make sure that the callback is run properly within the Lightning framework
    helperFunctionAsPromise : function(component, helperFunction) {
        return new Promise($A.getCallback(function(resolve, reject) {
            helperFunction(component, resolve, reject);
        }));
    },
    // Promise-ready initialization function: can be called normally
    initPurposes: function(component, resolve, reject) {
		console.log("CCL_PRF_PurposeSiteController:initPurposes");
		var action = component.get("c.initPurposes");
    	action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
                let purposesAndLabels = response.getReturnValue();
                console.log(purposesAndLabels);
				component.set("v.purposesLabels", purposesAndLabels.labels);
				component.set("v.purposes", purposesAndLabels.purposes);
				// Promise resolved
				if(resolve) {
                    console.log('resolving initPurposes');
                    resolve('initPurposes succeeded');
                }
			} 
			else if (state === "ERROR") {
                console.error(response.getError()[0].message);
				// Promise rejected
				if(reject) {
                    console.log('rejecting initPurposes');
                    reject(Error(response.getError()[0].message));
                }
			}
		});
		$A.enqueueAction(action);
	},
	filterSites : function(component, resolve, reject) {
		var action = component.get("c.filterSitesByPurpose");
    	action.setParams({purposeId: component.get("v.selectedPurposeId")});
    	action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				// Populate the list of available Sites filtered by Purpose__c
				component.set("v.sites", response.getReturnValue());
				
                // Enable the picklist
                if(component.get("v.reviewMode") == false){
                    component.find("selectSite").set("v.disabled", false); 
                }
                
                // Promise resolved
				if(resolve) {
                    console.log('resolving filterSites');
                    resolve('filterSites succeeded');
                }
			} else if (state === "ERROR") {
                console.error(response.getError()[0].message);
                // Promise rejected
				if(reject) {
                    console.log('rejecting filterSites');
                    reject(Error(response.getError()[0].message));
                }
			}
		});
		$A.enqueueAction(action);
	},
	filterTeams: function(component, resolve, reject) {
		var action = component.get("c.filterTeamsBySite");
    	action.setParams({siteId: component.get("v.selectedSiteId")});
    	action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				// Populate the list of available Sites filtered by Purpose__c
				component.set("v.teams", response.getReturnValue());
				
				// Enable the picklist
                if(component.get("v.reviewMode") == false){
                    component.find("selectTeam").set("v.disabled", false); 
                }
                // Promise resolved
				if(resolve) {
                    console.log('resolving filterTeams');
                    resolve('filterTeams succeeded');
                }
			} else if (state === "ERROR") {
				console.error(response.getError()[0].message);
                // Promise rejected
				if(reject) {
                    console.log('rejecting filterTeams');
                    reject(Error(response.getError()[0].message));
                }
			}
		});
		$A.enqueueAction(action);
	},
	filterHCPs: function(component, resolve, reject) {
		var action = component.get("c.filterHCPsByTeam");
    	action.setParams({teamId: component.get("v.selectedTeamId")});
    	action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				// Populate the list of available Sites filtered by Purpose__c
				component.set("v.HCPs", response.getReturnValue());
				
				// Enable the picklist
                if(component.get("v.reviewMode") == false){
                    component.find("selectHCP").set("v.disabled", false); 
                }
                // Promise resolved
				if(resolve) {
                    console.log('resolving filterSites');
                    resolve('filterSites succeeded');
                }
			} else if (state === "ERROR") {
				console.error(response.getError()[0].message);
                // Promise rejected
				if(reject) {
                    console.log('rejecting filterSites');
                    reject(Error(response.getError()[0].message));
                }
			}
		});
		$A.enqueueAction(action);
	},
	displayErrors: function(response){
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
	}
})

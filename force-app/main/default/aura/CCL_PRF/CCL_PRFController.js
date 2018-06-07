({
	doInit: function(component, event, helper) {
		console.log("CCL_PRFController:doInit");
		
		var getPatientFieldsetAction = component.get('c.getPatientFieldsetNames');
		// Important: Cache the response in the client cache
		getPatientFieldsetAction.setStorable();

        getPatientFieldsetAction.setCallback(this, 
            function(response) {
            	var state = response.getState();
            	console.log('FieldSetFormController getPatientFieldsetAction callback');
            
            	if (component.isValid() && state === "SUCCESS") {
                    var response = response.getReturnValue();
                    console.log(response);
	                component.set('v.patientFieldSets', response);
                }
            }
        );
        $A.enqueueAction(getPatientFieldsetAction);
	},
	handleNavigationEvent: function(component, event) {
		console.log("CCL_PRFController:handleNavigationEvent");
		var navigateAction = event.getParam("navigateAction");
		var recordId = event.getParam("recordId");
		console.log('navigateAction: '+navigateAction);
		console.log('recordId: '+recordId);

		switch (navigateAction){
			case "PurposeSite_Next":
				console.log("Event:navigateAction:PurposeSite_Next");
				component.set("v.isPurposesiteCmpDisplayed", 	false);
				component.set("v.isPatientCmpDisplayed", 			true);
				component.set("v.isReviewSubmitDisplayed", 		false);
				component.set("v.currentStep", 			"2");
				// Case Record Id
				component.set("v.caseRecordId", 			recordId);
				break;
			case "Patient_Previous":
				console.log("Event:navigateAction:Patient_Previous");
				component.set("v.isPurposesiteCmpDisplayed", 	true);
				component.set("v.isPatientCmpDisplayed", 			false);
				component.set("v.isReviewSubmitDisplayed", 		false);
				component.set("v.currentStep", 			"1");
				break;
			case "Patient_Next":
				console.log("Event:navigateAction:Patient_Next");
				console.log(component.get("v.isReviewSubmitDisplayed"));

				// Number of Fieldsets for Patients:
				var numberPatientFieldsets = component.get("v.patientFieldSets").length;

				// Current Patient index
				var currentPatientIndex = component.get("v.currentPatientIndex");
				
				// Set the Id of the newly created record
				component.set("v.patientRecordId", recordId);

				// Last Patient	 Fieldset => navigate to the next module
				++currentPatientIndex;
				if(currentPatientIndex == numberPatientFieldsets){					
					component.set("v.isPurposesiteCmpDisplayed", 	false);
					component.set("v.isPatientCmpDisplayed", 	false);
					component.set("v.isReviewSubmitDisplayed", 	true);
					component.set("v.currentStep", 			"3");
				}
				else{
					// Increment the Patient index
					component.set("v.currentPatientIndex", currentPatientIndex);
				}
				console.log("Event:navigateAction:Patient_Next END");
				break;
		}
	}
})
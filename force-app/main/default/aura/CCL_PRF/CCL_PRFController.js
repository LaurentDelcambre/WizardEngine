({
	doInit: function(component, event, helper) {
		console.log("CCL_PRFController:doInit");
		
		// var getPatientFieldsetAction = component.get('c.getPatientFieldsetNames');
		// // Important: Cache the response in the client cache
		// getPatientFieldsetAction.setStorable();

        // getPatientFieldsetAction.setCallback(this, 
        //     function(response) {
        //     	var state = response.getState();
        //     	console.log('FieldSetFormController getPatientFieldsetAction callback');
            
        //     	if (component.isValid() && state === "SUCCESS") {
        //             var response = response.getReturnValue();
        //             console.log(response);
	    //             component.set('v.patientFieldSets', response);
        //         }
        //     }
        // );
		// $A.enqueueAction(getPatientFieldsetAction);
		
		
	},
	handleNavigationEvent: function(component, event, helper) {
		console.log("CCL_PRFController:handleNavigationEvent");
		let navigateAction = event.getParam("navigateAction");
		let navigateOriginComponent = event.getParam("navigateOriginComponent");
		console.log('navigateAction: '+navigateAction);
		console.log('navigateOriginComponent: '+navigateOriginComponent);

		switch (navigateOriginComponent){
			case "Purpose_Selector":
				console.log("Event:navigateAction:Purpose_Selector:Next");

				// Selected records:
				component.set("v.selectedPurposeId", 	event.getParam("selectedPurposeId"));
				component.set("v.listWizardSteps", 		event.getParam("listWizardSteps"));

				console.log("listWizardSteps: ");
				console.log(component.get("v.listWizardSteps"));

				// Only create if it doesn't exist yet
				if(!component.get("v.progressIndicator")){
					let progressIndicator = helper.createProgressBar(component, component.get("v.listWizardSteps"));
					component.set('v.progressIndicator',progressIndicator);					
				}
				break;
			case "PRF_START":
				if(navigateAction === "Next"){
					console.log("Event:navigateAction:PRF_START:Next");

					// Selected records:
					component.set("v.selectedSiteId", 		event.getParam("selectedSiteId"));
					component.set("v.selectedTeamId", 		event.getParam("selectedTeamId"));
					component.set("v.selectedHCPId", 		event.getParam("selectedHCPId"));
					
					// created PRF Record Id
					var PRFRecordId = event.getParam("PRFRecordId");
					console.log('PRFRecordId in PRFController: '+PRFRecordId);
					component.set("v.PRFRecordId", 			PRFRecordId);
				}
				break;
			case "Wizard_FieldSet":
				console.log("Event:navigateAction:Wizard_FieldSet");
				
        // Hides the Dynamic Field Set Container
				$A.util.addClass(component.find("patientContainer"), "hidden");

				console.log("Event:navigateAction:Wizard_FieldSet END");
				break;
			case "PRF_Logistics":
				if(navigateAction === "Next"){
					console.log("Event:navigateAction:PRF_Logistics:Next");
					
					// Set the Id of the newly created records
					component.set("v.selectedApheresisCenterId", event.getParam("selectedApheresisCenterId"));
					component.set("v.selectedPickUpLocationId", event.getParam("selectedPickUpLocationId"));
					component.set("v.selectedInfusionCenterId", event.getParam("selectedInfusionCenterId"));
					component.set("v.selectedShipToLocationId", event.getParam("selectedShipToLocationId"));
				}
				break;
		}
		
		// Managing the current and next step
		let currentStep = component.get("v.currentStep");

		switch(navigateAction){
			case "Previous":
				currentStep--;
				component.set("v.currentStep", 				currentStep );
				// Set the Progress Indicator's current step
				if(component.find("progressIndicator")){
					component.find("progressIndicator").set("v.currentStep", currentStep);
				}
				break;
			case "Next":
				currentStep++;
				component.set("v.currentStep", 				currentStep);
				// Set the Progress Indicator's current step
				if(component.find("progressIndicator")){
					component.find("progressIndicator").set("v.currentStep", currentStep);
				}
				break;
		}
		console.log('Next step to display: Index: '+currentStep);

		// List of CCL_WizardStep__mdt
		let listWizardSteps = component.get("v.listWizardSteps");
		console.log('listWizardSteps: ');
		console.log(listWizardSteps);
		if(currentStep == 0){
			component.set("v.isProgressBarDisplayed", 	false);
			component.set("v.isPurposeCmpDisplayed", 		true);
			component.set("v.isSiteCmpDisplayed", 			false);
		}
		else{
			// step 0 is PurposeSelector
			let stepToDisplay = listWizardSteps[currentStep-1];
			console.log('Next step to display: Component:'+stepToDisplay.Component__c);

			// Set the Section Descripion text container
			console.log('Next step to display: SectionDescription__c:'+ stepToDisplay.SectionDescription__c + 'result: '+$A.getReference("$Label.c."+stepToDisplay.SectionDescription__c));
			component.set("v.sectionDescription", 	$A.getReference("$Label.c."+stepToDisplay.SectionDescription__c));

			component.set("v.isProgressBarDisplayed", 	true);
			component.set("v.isPurposeCmpDisplayed", 		false);
			
			// Render the relevant component
			component.set("v.isSiteCmpDisplayed", 			false);
			component.set("v.isPatientCmpDisplayed", 		false);
			component.set("v.isLogisticsDisplayed", 		false);
			component.set("v.isReviewSubmitDisplayed", 	false);

			if(stepToDisplay.Component__c === "PRF_START"){
					component.set("v.isSiteCmpDisplayed", 			true);
			}
			else if(stepToDisplay.Component__c === "Wizard_Fieldset"){
				console.log("step = Wizard_FieldSet");
				console.log("fieldset: "+stepToDisplay.FieldSet__c);

				// created PRF Record Id
				var PRFRecordId; 
				if(!component.get("v.PRFRecordId")){
					PRFRecordId = event.getParam("PRFRecordId");
					component.set("v.PRFRecordId", 			PRFRecordId);
				}
				else{
					PRFRecordId = component.get("v.PRFRecordId");
				}
				console.log('PRFRecordId before dynamic FieldSet: '+PRFRecordId);
				// Create the Dynamic Field Set dynamically
				helper.createDynamicFieldSet(component, PRFRecordId, stepToDisplay.FieldSet__c);
				
			}
			else if(stepToDisplay.Component__c === "PRF_Logistics"){
				component.set("v.isLogisticsDisplayed", 			true);
			}
			else if(stepToDisplay.Component__c === "PRF_END"){
				component.set("v.isReviewSubmitDisplayed", 			true);
			}

		}	
	}
})
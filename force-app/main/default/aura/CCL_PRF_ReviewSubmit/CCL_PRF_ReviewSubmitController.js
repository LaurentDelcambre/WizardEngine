({
    clickPrevious: function(component, event) {
        console.log("CCL_PRF_ReviewSubmitController:clickPrevious");
        
		// Fire Previous event
        var cmpEvent = component.getEvent("navigationEvent");
        cmpEvent.setParams({
            "navigateOriginComponent" : "SUBMIT",
            "navigateAction" : "Previous",});
        cmpEvent.fire();
	}
})

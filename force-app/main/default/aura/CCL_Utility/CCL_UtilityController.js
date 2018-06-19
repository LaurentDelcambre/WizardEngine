({
    // Wraps up any call to a helper function in a Promise. 
    // Make sure that the helper function you use calls resolve and reject in the right places. 
    // Contains Lightning-specific $A.getCallback() to make sure that the callback is run properly within the Lightning framework
    getFunctionAsPromise : function(component, event, helper) {
        var params = event.getParam("arguments");
        return new Promise($A.getCallback(function(resolve, reject) {
            params.helperFunction(component, resolve, reject);
        }));
    },
})

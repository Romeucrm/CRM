
// Register this code in the form onload
function OnloadGetOldcnpjValue(e) {
	var formContext = e.getFormContext();  
	
    var OldcnpjVal = formContext.getAttribute("ddm_cpfcnpjnum").getValue();
    if(OldcnpjVal != null && OldcnpjVal != "null") { 
        sessionStorage.setItem("OldCNPJValue", OldcnpjVal); // Set old value in the session storage 
    }
}



// ==============================================================


function OnChangeCheckCPFduplicado(e) {

    var formContext = e.getFormContext();  


    // status do formulario
    var formType = formContext.ui.getFormType();
	 
	


    var CPFCNPJControl = formContext.getControl("ddm_cpfcnpjnum");	
    var CPFCNPJ = formContext.getAttribute("ddm_cpfcnpjnum").getValue();
	var _OldcnpjVal = sessionStorage.getItem("OldCNPJValue"); // Old OptionSet Value
	//alert(CPFCNPJ);
	
    try{var companyGuid = formContext.getAttribute("msdyn_company").getValue()[0].id; }
    catch(err) {}

    // If the recordGuid contains data
    if((companyGuid != null) && (CPFCNPJ != "null") && (CPFCNPJ != null) && (CPFCNPJ != "undefined")){


		let fetchXml = "<fetch>" + 
			"<entity name='account'>" + 
				"<attribute name='name'/>" + 
				"<attribute name='primarycontactid'/>" + 
				"<filter type='and'>" + 
					"<condition attribute='ddm_cpfcnpjnum' operator='eq' value='" +CPFCNPJ+ "' />" +
					"<condition attribute='msdyn_company' operator='eq' uitype='cdm_company' value='" +companyGuid+ "' />" +
				"</filter>" + 
			"</entity>" + 
		"</fetch>";
		Xrm.WebApi.retrieveMultipleRecords("account", "?fetchXml=" + fetchXml).then(
			function success(result)
			{
				// Xrm.Navigation.openAlertDialog({ text: "Count: " + result.entities.length + " | " + 
				// result.entities[0]["name"]});	
				
				if(result.entities.length != 0 & result.entities.length != '0'){
					
			 
			  Xrm.Navigation.openAlertDialog({ text: "Já existe uma conta com esse CPF/CNPJ para essa empresa!!!" + " | " + result.entities[0]["name"]});
					
			      // create
						if(formType === 1){
                              CPFCNPJControl.getAttribute().setValue("");

						}else{

                            CPFCNPJControl.getAttribute().setValue(_OldcnpjVal);
						}					
												
	
					
					
				}
			}
		);
		
	}
	

}




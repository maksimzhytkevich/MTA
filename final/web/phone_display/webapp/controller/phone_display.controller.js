sap.ui.define([
	"sap/ui/core/mvc/Controller",	
	"sap/m/MessageToast",
	"sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
	"use strict";

	return Controller.extend("phone_display.controller.phone_display", {
        onInit: function () {
			jQuery.sap.log.debug("controller init");		
		},

		updatePhone: function() {
			var oTable = this.getView().byId("phonesTable");

			var oSelectedItem = oTable.getSelectedItem();

			var name = this.getView().byId("input_name").getValue();
			
			var oModel = this.getView().getModel("phones");

			if (!oSelectedItem){
				MessageToast.show("Phone is not selected!");
			} else if (!name){
				MessageToast.show("Enter the name");	
			} else{
				var usid = oSelectedItem.getBindingContext("phones").getProperty("usid");

				var Phone = {};
				Phone.name = name;
				Phone.creationDate = null;
				Phone.updateDate = null;

				oModel.update("/Phones('" + usid + "')", Phone, {
					merge: false,
					success: function(){
						jQuery.sap.log.info("Sucsess");
					},
					error : function () {
						jQuery.sap.log.error("Error");
					}
				});
				this.onCloseDialog();
			}		
		},
		 
		onCloseDialog : function () {
			this.getView().byId("createUpdateDialog").close();
		},

		openDialog: function () {

			var oView = this.getView();

			if (!this.byId("createUpdateDialog")) {
				Fragment.load({
					id: oView.getId(),
					name: "phone_display.view.create_update_dialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("createUpdateDialog").open();
			}					
		},

		createPhone: function () {
			var brand = this.getView().byId("brandNameInput").getValue();			
			var model = this.getView().byId("modelNameInput").getValue();

			var oModel = this.getView().getModel("phones");

			if (!brand || !model){
				MessageToast.show("Fill all fields");	
			} else {

				var Phone = {};
				Phone.brand = brand;
				Phone.model = model;

				oModel.create("/Phones", Phone, {
					success: function(){
						jQuery.sap.log.info("Sucsess");
					},
					error : function () {
						jQuery.sap.log.error("Error");
					}
				});
			}	
		}
     });
});
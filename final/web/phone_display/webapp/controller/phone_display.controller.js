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
		 
		onCloseDialog : function () {
			this.getView().byId("createUpdateDialog").close();
		},

		openDialog: function (oEvent) {
			
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

			var btOk = oView.byId("bt_ok");
			
			var pressedButton = oEvent.getSource().getId();

			if (pressedButton.includes("bt_create")) {
				btOk.attachPress(this.createPhone, this);
			} else if (pressedButton.includes("bt_edit")) {
				btOk.attachPress(this.updatePhone, this);
			} else {
				jQuery.sap.log.error("Error with attaching button handler");	
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
		},

		updatePhone: function() {
			var oTable = this.getView().byId("phoneTable");

			var oSelectedItem = oTable.getSelectedItem();

			var brand = this.getView().byId("brandNameInput").getValue();			
			var model = this.getView().byId("modelNameInput").getValue();	
			

			var oModel = this.getView().getModel("phones");
			
	
			if (!oSelectedItem){
				MessageToast.show("Phone is not selected!");
			} else if (!brand || !model){
				MessageToast.show("Fill all fields");	
			} else{
				var phid = oSelectedItem.getBindingContext("phones").getProperty("phid");

				var Phone = {};
				Phone.brand = brand;
				Phone.model = model;
				Phone.creationDate = null;
				Phone.updateDate = null;

				oModel.update("/Phones('" + phid + "')", Phone, {
					merge: false,
					success: function(){
						jQuery.sap.log.info("Sucsess");
					},
					error : function () {
						jQuery.sap.log.error("Error");
					}
				});
			}	
		},

		deletePhone: function(){
			var oTable = this.getView().byId("phoneTable");
			
			var oSelectedItem = oTable.getSelectedItem();			

			if (!oSelectedItem){
				MessageToast.show("Phone is not selected!");
			} else {
				var phid = oSelectedItem.getBindingContext("phones").getProperty("phid");

				jQuery.ajax({
					type : "DELETE",
					contentType : "application/json",
					url : "https://p2001081134trial-maksimzhytkevich-space1-service.cfapps.eu10.hana.ondemand.com/xsjs/phone/phone.xsjs?phoneid=" + phid,
					dataType : "json", 
					success: function(){
						jQuery.sap.log.info("Sucsess");
					},
					error: function () {
						jQuery.sap.log.error("Error");
					}	
				});	
			}		
		}
     });
});
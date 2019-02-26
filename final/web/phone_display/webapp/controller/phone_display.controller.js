sap.ui.define([
	"sap/ui/core/mvc/Controller",	
	"sap/m/MessageToast",
	"sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
	"use strict";

	return Controller.extend("phone_display.controller.phone_display", {
	
        onInit: function () {
			jQuery.sap.log.debug("controller init");
			this.oView = this.getView();
			this.oModel = this.oView.getModel("phones");
			this.screenData = this.oView.getModel("screen_data");
			this.oTable = this.oView.byId("phoneTable");	
		},

		openCreateDialog: function () {
			var oView = this.oView;
			if (!this.byId("createDialog")) {
				Fragment.load({
					id: this.oView.getId(),
					name: "phone_display.view.create_dialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					oDialog.open();					
				});
			} else {
				this.byId("createDialog").open();
			}							
		},

		createPhone: function () {

			var brand = this.screenData.getProperty("/brandNameInput");
			var model = this.screenData.getProperty("/modelNameInput");
			
			if (!brand || !model){
				MessageToast.show("Fill all fields");	
			} else {

				var Phone = {};
				Phone.brand = brand;
				Phone.model = model;

				this.oModel.create("/Phones", Phone, {
					success: function(){
						jQuery.sap.log.info("Sucsess");
					},
					error : function () {
						jQuery.sap.log.error("Error");
					}
				});
			}
			this.onCloseCreateDialog();	
		},				
		 
		onCloseCreateDialog : function () {
			this.oView.byId("createDialog").close();
		},

		openUpdateDialog: function () {
			var oView = this.oView;
			if (!this.byId("updateDialog")) {
				Fragment.load({
					id: this.oView.getId(),
					name: "phone_display.view.update_dialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					oDialog.open();					
				});
			} else {
				this.byId("updateDialog").open();
			}							
		},

		updatePhone: function() {	

			var oSelectedItem = this.oTable.getSelectedItem();

			var brand = this.screenData.getProperty("/brandNameInput");
			var model = this.screenData.getProperty("/modelNameInput");						
	
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
				
				this.oModel.update("/Phones('" + phid + "')", Phone, {
					merge: false,
					success: function(){
						jQuery.sap.log.info("Sucsess");
					},
					error : function () {
						jQuery.sap.log.error("Error");
					}
				});
			}
			this.onCloseUpdateDialog();		
		},

		onCloseUpdateDialog : function () {
			this.oView.byId("updateDialog").close();
		},

		deletePhone: function(){
						
			var oSelectedItem = this.oTable.getSelectedItem();			

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
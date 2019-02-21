sap.ui.define([
	"sap/ui/core/mvc/Controller",	
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("phone_display.controller.phone_display", {
        onInit: function () {
			jQuery.sap.log.debug("controller init");		
		},

		updateUser: function() {
			var oTable = this.getView().byId("usersTable");

			var oSelectedItem = oTable.getSelectedItem();

			var name = this.getView().byId("input_name").getValue();
			
			var oModel = this.getView().getModel("users");

			if (!oSelectedItem){
				MessageToast.show("User is not selected!");
			} else if (!name){
				MessageToast.show("Enter the name");	
			} else{
				var usid = oSelectedItem.getBindingContext("users").getProperty("usid");

				var User = {};
				User.name = name;
				User.creationDate = null;
				User.updateDate = null;

				oModel.update("/Users('" + usid + "')", User, {
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

		createUser: function () {
			var name = this.getView().byId("input_name").getValue();			

			var oModel = this.getView().getModel("users");

			if (!name){
				MessageToast.show("Enter the name");	
			} else {

				var User = {};
				User.name = name;

				oModel.create("/Users", User, {
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
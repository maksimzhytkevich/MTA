sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("user_create.controller.user_create", {
        onInit: function () {
			console.log("controller init");
		},
		createUser: function () {
			var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
			console.log(Name);

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://p2001081134trial-maksimzhytkevich-space1-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Users",
				"method": "POST",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"name\": \"" + Name  + "\"}"
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
			});
		}
     });

});
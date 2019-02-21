jQuery.sap.registerPreloadedModules({version:"2.0",name:"phone_display/Component-preload",modules:{"phone_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(n){"use strict";return n.extend("phone_display.Component",{metadata:{manifest:"json"},init:function(){console.log("component init"),n.prototype.init.apply(this,arguments)}})});',"phone_display/controller/phone_display.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast"],function(e,s){"use strict";return e.extend("phone_display.controller.phone_display",{onInit:function(){jQuery.sap.log.debug("controller init")},updateUser:function(){var e=this.getView().byId("usersTable"),t=e.getSelectedItem(),r=this.getView().byId("input_name").getValue(),n=this.getView().getModel("users");if(t)if(r){var o=t.getBindingContext("users").getProperty("usid"),i={};i.name=r,i.creationDate=null,i.updateDate=null,n.update("/Users(\'"+o+"\')",i,{merge:!1,success:function(){jQuery.sap.log.info("Sucsess")},error:function(){jQuery.sap.log.error("Error")}})}else s.show("Enter the name");else s.show("User is not selected!")},createUser:function(){var e=this.getView().byId("input_name").getValue(),t=this.getView().getModel("users");if(e){var r={};r.name=e,t.create("/Users",r,{success:function(){jQuery.sap.log.info("Sucsess")},error:function(){jQuery.sap.log.error("Error")}})}else s.show("Enter the name")}})});',"phone_display/view/phone_display.view.xml":'<mvc:View controllerName="phone_display.controller.phone_display" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:mvc="sap.ui.core.mvc"><Shell><App id="home"><Page\r\n\t\t\t\ttitle="PHONE DISPLAY"><Panel><Input id="input_name" width="30%"/><Button text="Update" press="updateUser" /><Button text="Create" press="createUser" /></Panel><Panel class="sapUiResponsiveMargin" width="auto"><content><Table id="usersTable" items="{\r\n\t\t\t\t\t\t\t\t\t\tpath: \'phones>/Users\'\r\n\t\t\t\t\t\t\t\t\t}"\r\n\t\t\t\t\t\t\t\t\tmode="SingleSelect"><columns><Column id="idColumn" width="10%"><Text text="ID" /></Column><Column id="nameColumn" width="10%"><Text text="Name" /></Column><Column id="createDate" width="40%"><Text text="Creation Date" /></Column><Column id="updateDate" width="40%"><Text text="Update Date" /></Column></columns><items><ColumnListItem\r\n\t\t\t\t\t\t\t\t\tid="row"><cells><Label text="{phones>usid}" /></cells><cells><Label text="{phones>name}" /></cells><cells><Label text="{phones>creationDate}" /></cells><cells><Label text="{phones>updateDate}" /></cells></ColumnListItem></items></Table></content></Panel></Page></App></Shell></mvc:View>',"phone_display/i18n/i18n.properties":'appTitle="Final task"\r\nappDescription="Final task"',"phone_display/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"phone_display","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"},"dataSources":{"mainService":{"uri":"https://p2001081134trial-maksimzhytkevich-space1-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"rootView":{"viewName":"phone_display.view.phone_display","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"phone_display.i18n.i18n"}},"phones":{"dataSource":"mainService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"disableHeadRequestForToken":true}}},"resources":{"css":[{"uri":"css/style.css"}]}}}'}});
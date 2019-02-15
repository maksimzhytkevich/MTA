jQuery.sap.registerPreloadedModules({version:"2.0",name:"user_create/Component-preload",modules:{"user_create/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(n){"use strict";return n.extend("user_create.Component",{metadata:{manifest:"json"},init:function(){n.prototype.init.apply(this,arguments),console.log("component init")}})});',"user_create/controller/user_create.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("user_create.controller.user_create",{onInit:function(){console.log("controller init")},createUser:function(){var e=sap.ui.getCore().byId(this.getView().sId+"--input_name").getValue();console.log(e);var t={async:!0,crossDomain:!0,url:"https://p2001081134trial-maksimzhytkevich-space1-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Users",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:\'{"name": "\'+e+\'"}\'};$.ajax(t).done(function(e){console.log(e)})}})});',"user_create/fragment/ConfirmDeleteDialog.fragment.xml":'<core:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"><Dialog\n\t\ttitle="{i18n>confirm}"\n\t\ttype="Message" ><content><Text text="{i18n>confirmDeleteText}" /></content><beginButton><Button text="{i18n>delete}" press="onConfirmDelete" /></beginButton><endButton><Button text="{i18n>cancel}" press="onCancelDelete" /></endButton></Dialog></core:FragmentDefinition>',"user_create/view/user_create.view.xml":'<mvc:View controllerName="user_create.controller.user_create" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:mvc="sap.ui.core.mvc"><Shell><App><Page\r\n\t\t\t\ttitle="USER CREATE"><Panel class="sapUiResponsiveMargin" width="auto"><content><Label text="Name" class="sapUiSmallMargin" /><Input id="input_name" width="200px" /><Button text="Create" press=".createUser"/></content></Panel></Page></App></Shell></mvc:View>',"user_create/i18n/i18n.properties":'appTitle="User Create"\r\nappDescription="User Create"',"user_create/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"user_create","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"rootView":{"viewName":"user_create.view.user_create","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"user_create.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]}}}'}});
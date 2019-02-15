jQuery.sap.registerPreloadedModules({version:"2.0",name:"user_display/Component-preload",modules:{"user_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(n){"use strict";return n.extend("user_display.Component",{metadata:{manifest:"json"},init:function(){console.log("component init"),n.prototype.init.apply(this,arguments)}})});',"user_display/controller/user_display.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"],function(o,e){"use strict";return o.extend("user_display.controller.user_display",{onInit:function(){console.log("controller init")}})});',"user_display/view/user_display.view.xml":'<mvc:View controllerName="user_display.controller.user_display" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:mvc="sap.ui.core.mvc"><Shell><App id="home"><Page\r\n\t\t\t\ttitle="USER DISPLAY"><Panel class="sapUiResponsiveMargin" width="auto"><content><Table id="usersList" items="{\r\n\t\t\t\t\t\t\t\t\t\tpath: \'users>/Users\'\r\n\t\t\t\t\t\t\t\t\t}"><columns><Column id="idColumn"><Text text="{ID}" /></Column><Column id="nameColumn"><Text text="{Name}" /></Column></columns><items><ColumnListItem\r\n\t\t\t\t\t\t\t\t\tid="row"><cells><Label text="{users>usid}" /></cells><cells><Label text="{users>name}" /></cells></ColumnListItem></items></Table></content></Panel></Page></App></Shell></mvc:View>',"user_display/i18n/i18n.properties":'appTitle="HW4"\r\nappDescription="Task with two web apps, router and deployer"',"user_display/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"user_display","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"},"dataSources":{"mainService":{"uri":"https://p2001081134trial-maksimzhytkevich-space1-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"rootView":{"viewName":"user_display.view.user_display","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"user_display.i18n.i18n"}},"users":{"dataSource":"mainService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"disableHeadRequestForToken":true}}},"resources":{"css":[{"uri":"css/style.css"}]}}}'}});
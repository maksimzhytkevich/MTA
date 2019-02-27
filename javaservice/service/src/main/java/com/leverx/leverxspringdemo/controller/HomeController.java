package com.leverx.leverxspringdemo.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.leverx.leverxspringdemo.domain.Destination;
import com.leverx.leverxspringdemo.service.CloudService;
import com.leverx.leverxspringdemo.service.SecurityService;
import com.sap.cloud.sdk.cloudplatform.security.AuthToken;
import com.sap.cloud.sdk.s4hana.connectivity.rfc.exception.AccessDeniedException;

@Controller
public class HomeController {
	
	@Autowired
	private CloudService cloudService;
		
	@Autowired 
	private SecurityService securityService;
		
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String getHome(Model model) {
		Map<String, JsonElement> vcap = cloudService.getSpaceName();		
		JsonElement sp = vcap.get("space_name");
		JsonArray hanatrial = cloudService.getSchema().get("hanatrial");
		JsonElement schema = hanatrial.get(0).getAsJsonObject().get("credentials").getAsJsonObject().get("schema");
		String appName = cloudService.getApplicationName();
		model.addAttribute("spaceName", sp.toString());
		model.addAttribute("appName", appName);  
		model.addAttribute("schema", schema);		
		return "index"; 
	}
	
	@RequestMapping(value="/dest", method=RequestMethod.GET)
	public String getDest(Model model) {		
		List<Destination> destinations = cloudService.getDestinations();
		model.addAttribute("destinations", destinations);		
		return "index";
	}
	
	@RequestMapping(value="/token", method=RequestMethod.GET)
	public String getJWT(Model model) {
		Optional<AuthToken> token = cloudService.getToken();
		JsonObject jo = cloudService.getInfo(token);
		JsonElement name = jo.get("given_name");
		JsonElement familyname = jo.get("family_name");
		model.addAttribute("token", jo);
		model.addAttribute("name", name);
		model.addAttribute("familyname", familyname);
		return "token"; 
	} 
		
	@RequestMapping(value="/scope", method=RequestMethod.GET)
	public String checkScope() throws AccessDeniedException {
		securityService.userHasAuthorization("Display");
		return "scope";
	}	
}
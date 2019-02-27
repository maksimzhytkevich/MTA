package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leverx.leverxspringdemo.domain.Destination;
import com.leverx.leverxspringdemo.service.CloudService;
import com.leverx.leverxspringdemo.service.SecurityService;
import com.sap.cloud.sdk.s4hana.connectivity.rfc.exception.AccessDeniedException;

@Controller
public class HomeController {
	
	@Autowired
	private CloudService cloudService;
		
	@Autowired 
	private SecurityService securityService;
		
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String getHome(Model model) {	
		cloudService.getSpaceNameAndSchema(model);
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
		cloudService.getTokenWithName(model);
		return "token"; 
	} 
		
	@RequestMapping(value="/scope", method=RequestMethod.GET)
	public String checkScope() throws AccessDeniedException {
		securityService.userHasAuthorization("Display");
		return "scope";
	}	
}
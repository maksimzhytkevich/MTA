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
import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.security.RolesAllowed;
import com.sap.cloud.sdk.s4hana.connectivity.rfc.exception.AccessDeniedException;

@Controller
public class HomeController {
	
	@Autowired
	private CloudService cloudService;
	
	@Autowired
	private CloudPlatform platform;
	
	@Autowired 
	private SecurityService securityService;
		
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String getHome(Model model) {
		String appName = cloudService.getApplicationName();
		model.addAttribute("appName", appName);
		return "index";
	}
	
	@RequestMapping(value="/dest", method=RequestMethod.GET)
	public String getDest(Model model) {
		String appName = platform.getApplicationName();
		model.addAttribute("appName", appName);
		List<Destination> destinations = cloudService.getDestinations();
		model.addAttribute("destinations", destinations);		
		return "index";
	}
	
	
	@RequestMapping(value="/failed", method=RequestMethod.GET)
	public String getRoleCheckFailed() {
		return "scope";
	}
	
	@RequestMapping(value="/scope", method=RequestMethod.GET)
	public String checkScope() throws AccessDeniedException {
		securityService.userHasAuthorization("Display");
		return "scope";
	}
	
	@RequestMapping(value="/scopeFail", method=RequestMethod.GET)
	public String checkScopeFailed() throws AccessDeniedException {
		securityService.userHasAuthorization("Download");
		return "scope";
	}
	
	@RolesAllowed("ADMIN")
	@RequestMapping(value="/admin", method=RequestMethod.GET)
	public String checkAdmin() {
		return "scope";
	}
	
	@RolesAllowed("HACKER")
	@RequestMapping(value="/hacker", method=RequestMethod.GET)
	public String checkHacker() {
		return "scope";
	}
}
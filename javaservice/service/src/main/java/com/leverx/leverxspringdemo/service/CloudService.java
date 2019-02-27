package com.leverx.leverxspringdemo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.ScpCfCloudPlatform;
import com.sap.cloud.sdk.cloudplatform.connectivity.DestinationAccessor;
import com.sap.cloud.sdk.cloudplatform.connectivity.GenericDestination;
import com.sap.cloud.sdk.cloudplatform.security.AuthToken;
import com.sap.cloud.sdk.cloudplatform.security.AuthTokenFacade;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.leverx.leverxspringdemo.domain.Destination;
import com.leverx.leverxspringdemo.domain.Property;

@Service
public class CloudService {
	
	@Autowired
	private CloudPlatform platform;
		
	@Autowired
	private ScpCfCloudPlatform scpCfCloudPlatform;	
	
	@Autowired
	private AuthTokenFacade token;	
	
	public String getApplicationName() {
		return platform.getApplicationName();
	}
	
	public Map<String, JsonElement> getSpaceName() {
		return scpCfCloudPlatform.getVcapApplication();
	}
	
	public Map<String, JsonArray> getSchema() {
		return scpCfCloudPlatform.getVcapServices();
	}
	
	public Model getSpaceNameAndSchema(Model model) {
		Map<String, JsonElement> vcap = getSpaceName();		
		JsonElement sp = vcap.get("space_name");
		JsonArray hanatrial = getSchema().get("hanatrial");
		JsonElement schema = hanatrial.get(0).getAsJsonObject().get("credentials").getAsJsonObject().get("schema");
		String appName = getApplicationName();
		model.addAttribute("spaceName", sp.toString());
		model.addAttribute("appName", appName);  
		model.addAttribute("schema", schema);
		return model;
	}
	
	public Optional<AuthToken> getToken() {
		return token.getCurrentToken();
	}
	
	public JsonObject getInfo(Optional<AuthToken> token) {
		String[] split_string = token.get().getJwt().getToken().split("\\.");
		String base64EncodedBody = split_string[1];
		Base64 base64Url = new Base64(true);
		String body = new String(base64Url.decode(base64EncodedBody));
		JsonParser jsonParser = new JsonParser();
		JsonObject jo = (JsonObject)jsonParser.parse(body);
		return jo;
	}
	
	public Model getTokenWithName(Model model) {		
		Optional<AuthToken> token = getToken();
		JsonObject jo = getInfo(token);
		JsonElement name = jo.get("given_name");
		JsonElement familyname = jo.get("family_name");
		model.addAttribute("token", jo);
		model.addAttribute("name", name);
		model.addAttribute("familyname", familyname);
		return model;
	}	
		
	public List<Destination> getDestinations() {
		List<Destination> destinationList = new ArrayList<Destination>();
		Map<String, GenericDestination> destinationMap = DestinationAccessor.getGenericDestinationsByName();
		destinationMap.forEach((key, value) -> {
			Destination destination = new Destination();
			destination.setName(value.getName());
			destination.setDescription(value.getDescription().orElseGet(() -> {
				return "No description";
			}));
			destination.setDestinationType(value.getDestinationType().toString());
			Map<String, String> propertyMap = value.getPropertiesByName();
			List<Property> propertyList = new ArrayList<Property>();
			propertyMap.forEach((name, data) -> {
				Property property = new Property();
				property.setName(name);
				property.setValue(data);
				propertyList.add(property);
			});
			destination.setPropertyList(propertyList);
			destinationList.add(destination);
		});
		return destinationList;
	}
}
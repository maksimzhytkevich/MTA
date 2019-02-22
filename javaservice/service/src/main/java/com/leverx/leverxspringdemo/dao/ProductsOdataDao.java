package com.leverx.leverxspringdemo.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.domain.Products;
import com.leverx.leverxspringdemo.service.ProductsODataService;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryBuilder;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryResult;

@Repository
public class ProductsOdataDao {
	
private static final Logger logger = LoggerFactory.getLogger(ProductsODataService.class);
	
	public List<Products> getProductsOData(String destinationName) {
		try {
			ODataQueryResult result = ODataQueryBuilder
					.withEntity("V2/OData/OData.svc", "Products")
					.select("ID", "Name", "Description")
					.build().execute(destinationName);
			List<Map<String, Object>> listMap = result.asListOfMaps();
			return getProductsList(listMap);
		} catch (ODataException e){
			logger.error("Execution error: " + e.getCause().getMessage(), e.getCause());
			return null;
		}
	}
	
	private List<Products> getProductsList(List<Map<String, Object>> listMap){
		List<Products> productsList = new ArrayList<>();
		listMap.forEach(item -> {
			Products product = new Products();
			product.setId(Integer.parseInt(item.get("ID").toString()));
			product.setName(item.get("Name").toString());
			product.setDescription(item.get("Description").toString());
			productsList.add(product);
		});
		return productsList;
	}
	
}

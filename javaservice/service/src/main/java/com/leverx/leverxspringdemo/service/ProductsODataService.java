package com.leverx.leverxspringdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.ProductsOdataDao;
import com.leverx.leverxspringdemo.domain.Products;

@Service
public class ProductsODataService {	
	
	@Autowired
	private ProductsOdataDao productsOdataDao;
	
	public List<Products> getProductsAll() {
		return productsOdataDao.getProductsOData("oDataService");
	}
}
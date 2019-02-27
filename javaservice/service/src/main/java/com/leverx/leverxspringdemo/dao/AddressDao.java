package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.IAddressDao;
import com.leverx.leverxspringdemo.domain.Address;

@Repository
public class AddressDao implements IAddressDao  {
	
	private static final Logger logger = LoggerFactory.getLogger(AddressDao.class);
	
	@Autowired
	private DataSource dataSource;
	
	@Override
	public Optional<Address> getById(Integer id) {
		Optional<Address> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 * FROM \"test03::Address\" WHERE \"adid\" = ?")) {
			stmnt.setInt(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Address address = new Address();
				address.setId(id);
				address.setUserId(result.getString("usid"));
				address.setStreet(result.getString("city"));
				address.setStreet(result.getString("strt"));
				address.setHumanNumber(result.getInt("hnum"));				
				entity = Optional.of(address);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Address> getAll() {
		List<Address> addressList = new ArrayList<Address>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT * FROM \"test03::Address\"")) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Address address = new Address();
				address.setId(result.getInt("adid"));
				address.setUserId(result.getString("usid"));
				address.setStreet(result.getString("city"));
				address.setStreet(result.getString("strt"));
				address.setHumanNumber(result.getInt("hnum"));
				addressList.add(address);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return addressList;
	}

	@Override
	public void save(Address entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO \"test03::Address\"(\"usid\", \"city\", \"strt\", \"hnum\") VALUES (?, ?, ?, ?)")) {
			stmnt.setString(1, entity.getUserId());
			stmnt.setString(2, entity.getCity());
			stmnt.setString(3, entity.getStreet());
			stmnt.setInt(4, entity.getHumanNumber());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(Integer id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"test03::Address\" WHERE \"adid\" = ?")) {
			stmnt.setInt(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Address entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE \"test03::Address\" SET \"usid\" = ?, \"city\" = ?, \"strt\" = ?, \"hnum\" = ? WHERE \"adid\" = ?")) {
			stmnt.setString(1, entity.getUserId());
			stmnt.setString(2, entity.getCity());
			stmnt.setString(3, entity.getStreet());
			stmnt.setInt(4, entity.getHumanNumber());
			stmnt.setInt(5, entity.getId());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}
}

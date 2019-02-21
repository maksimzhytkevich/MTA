/**
 @param {connection} Connection - The SQL connection used in the OData request
 @param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
 @param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 */

const SetToJSON = $.import('xsjs.phone', 'setToJSON').setToJSON;
const setToJSON = new SetToJSON();

const PHONE_TABLE = "test03::Phone";
const PHONE_ID = "test03::phid";

function phoneCreate(param){
    $.trace.error("Param :" + JSON.stringify(param));
    var after = param.afterTableName;

    //Get Input New Record Values
    var	pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

	var currentDate = new Date();	

    var oPhoneItems = setToJSON.recordSetToJSON(oResult, "items");
    var oPhone = oPhoneItems.items[0];

	oPhone.creationDate = currentDate;
	oPhone.updateDate = currentDate;

	//Get Next Personnel Number
	pStmt = param.connection.prepareStatement(`select \"${PHONE_ID}\".NEXTVAL from dummy`); 
	var result = pStmt.executeQuery();
    
    while (result.next()) {
		oPhone.id = result.getString(1);
	}

	$.trace.error("oPhone: " + JSON.stringify(oPhone));
    
	pStmt.close();
	//Insert Record into DB Table and Temp Output Table
	pStmt = param.connection.prepareStatement(`insert into \"${PHONE_TABLE}\" values(?,?,?,?,?)`);
	fillAndExecute(pStmt, oPhone);
	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
	pStmt.executeUpdate();
	pStmt.close();
	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?,?,?,?)" );
	fillAndExecute(pStmt, oPhone);
}

function fillAndExecute(pStmt, oPhone) {
	pStmt.setString(1, oPhone.id.toString());
	pStmt.setString(2, oPhone.brand.toString());
	pStmt.setString(3, oPhone.model.toString());
	pStmt.setTimestamp(4, oPhone.creationDate);	
	pStmt.setTimestamp(5, oPhone.updateDate);	
	pStmt.executeUpdate();
	pStmt.close();	
}

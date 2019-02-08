/**
 @param {connection} Connection - The SQL connection used in the OData request
 @param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
 @param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
 */

const SetToJSON = $.import('xsjs.user', 'setToJSON').setToJSON;
const setToJSON = new SetToJSON();

function usersCreate(param){
    $.trace.error(JSON.stringify(param));
    var after = param.afterTableName;

    //Get Input New Record Values
    var	pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oUserItems = setToJSON.recordSetToJSON(oResult, "items");
    var oUser = oUserItems.items[0];
    $.trace.error(JSON.stringify(oUser));

    //TODO now HERE you have oUser object. Similar to xsjs/lib/user/user.xsjslib method doPost line 13

	//Get Next Personnel Number
	pStmt = param.connection.prepareStatement('select "test03::usid".NEXTVAL from dummy'); 
	var result = pStmt.executeQuery();
    
    while (result.next()) {
		oUser.id = result.getString(1);
	}
    
    $.trace.error(JSON.stringify(oUser));
	pStmt.close();
	//Insert Record into DB Table and Temp Output Table
	for( var i = 0; i<2; i++){
		var pStmt;
		if(i<1){
			pStmt = param.connection.prepareStatement("insert into \"test03::User\" values(?,?)" );			
		}else{
			pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
			pStmt.executeUpdate();
			pStmt.close();
			pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)" );		
		}
		pStmt.setString(1, oUser.id.toString());
		pStmt.setString(2, oUser.name.toString());		
		pStmt.executeUpdate();
		pStmt.close();
	}
}

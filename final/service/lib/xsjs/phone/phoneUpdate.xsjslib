const SetToJSON = $.import('xsjs.phone', 'setToJSON').setToJSON;
const setToJSON = new SetToJSON();

const PHONE_TABLE = "test03::Phone";

function phoneUpdate(param){
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oPhoneItems = setToJSON.recordSetToJSON(oResult, "items");
    var oPhone = oPhoneItems.items[0];
    $.trace.error("Update oPhone :" + JSON.stringify(oPhone));

    pStmt.close();
    pStmt = param.connection.prepareStatement(`UPDATE \"${PHONE_TABLE}\" SET "brand"='${oPhone.brand}', "model"='${oPhone.model}', "updateDate" = current_timestamp WHERE "phid"=${oPhone.phid}`);   
    pStmt.executeUpdate();
    pStmt.close();    
}
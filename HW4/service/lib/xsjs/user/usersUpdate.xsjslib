const SetToJSON = $.import('xsjs.user', 'setToJSON').setToJSON;
const setToJSON = new SetToJSON();

const USER_TABLE = "test03::User";

function usersUpdate(param){
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oUserItems = setToJSON.recordSetToJSON(oResult, "items");
    var oUser = oUserItems.items[0];
    $.trace.error("Update oUser :" + JSON.stringify(oUser));

    pStmt.close();
    pStmt = param.connection.prepareStatement(`UPDATE \"${USER_TABLE}\" SET "name"='${oUser.name}', "updateDate" = current_timestamp WHERE "usid"=${oUser.usid}`);   
    pStmt.executeUpdate();
    pStmt.close();
    
}
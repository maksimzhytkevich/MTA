const SetToJSON = $.import('xsjs.user', 'setToJSON').setToJSON;
const setToJSON = new SetToJSON();

function usersUpdate(param){
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oUserItems = setToJSON.recordSetToJSON(oResult, "items");
    var oUser = oUserItems.items[0];
    $.trace.error(JSON.stringify(oUser));
    var uStmt;
    uStmt = param.connection.prepareStatement(`UPDATE "test03::User" SET "name"='${oUser.name}' WHERE "usid"=${oUser.usid}`);
    uStmt.executeUpdate();
}
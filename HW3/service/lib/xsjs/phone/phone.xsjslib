var phone = function (connection) {

    const PHONE_TABLE = "test03::Phone";
    const PHONE_ID = "test03::phid";

    const CREATION_DATE = "creationDate";
    const UPADATE_DATE = "updateDate";
    
    this.doGet = function () {
        const result = connection.executeQuery(`SELECT * FROM "${PHONE_TABLE}"`);

        result.forEach(x => $.trace.error(JSON.stringify(x)));

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };


    this.doPost = function (oPhone) {
        //Get Next ID Number
        oPhone.phid = getNextval(PHONE_ID);
       
        //generate query
        const statement = createPreparedInsertStatement(PHONE_TABLE, oPhone);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oPhone));
    };


    this.doPut = function (oPhone) {
        const statement = createPreparedUpdateStatement(PHONE_TABLE, oPhone);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oPhone));
    };

    this.doDelete = function (phid) {
        const statement = createPreparedDeleteStatement(PHONE_TABLE, {phid: phid});
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };

    function getNextval(sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from "${PHONE_TABLE}"`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    function createPreparedInsertStatement(sTableName, oValueObject) {
        let oResult = new Result();

        let sColumnList = '', sValueList = '';
        
        var currentDate = new Date();

        for(let key in oValueObject){
            sColumnList += `"${key}",`;
            oResult.aParams.push(key);
            sValueList += "?, "; 
            oResult.aValues.push(oValueObject[key]);  
        }

        sColumnList += `"${CREATION_DATE}",`;
        oResult.aParams.push(CREATION_DATE);
        sValueList += "?, "; 
        oResult.aValues.push(currentDate);

        sColumnList += `"${UPADATE_DATE}",`;
        oResult.aParams.push(UPADATE_DATE);
        sValueList += "?, "; 
        oResult.aValues.push(currentDate);        

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    var setCurrentDate = function(currentDate, targetDate){
        sColumnList += `"${targetDate}",`;
        oResult.aParams.push(targetDate);
        sValueList += "?, "; 
        oResult.aValues.push(currentDate);
    }

    function createPreparedUpdateStatement(sTableName, oValueObject) {
        let oResult = new Result();

        let sColumnList = '', sValueList = '';

        var currentDate = new Date();

        for(let key in oValueObject){
            sColumnList += `"${key}",`;
            oResult.aParams.push(key);
            sValueList += "?, ";
            oResult.aValues.push(oValueObject[key]);            
        }
        
        sColumnList += `"${UPADATE_DATE}",`;
        oResult.aParams.push(UPADATE_DATE);
        sValueList += "?, "; 
        oResult.aValues.push(currentDate); 

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `update "${sTableName}" set (${sColumnList}) = (${sValueList}) where "${oResult.aParams[0]}" = '${oResult.aValues[0]}'`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    function createPreparedDeleteStatement(sTableName, oConditionObject) {
        let oResult = new Result();

        let sWhereClause = '';
        for (let key in oConditionObject) {
            sWhereClause += `"${key}"=? and `;
            oResult.aValues.push(oConditionObject[key]);
            oResult.aParams.push(key);
        }

        // Remove the last unnecessary AND
        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = " where " + sWhereClause;
        }

        oResult.sql = `delete from "${sTableName}" ${sWhereClause}`;

        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };

    function Result() {
        this.aParams = [];
        this.aValues = [];
        this.sql = "";
    };
};

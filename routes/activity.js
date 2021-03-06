'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {
console.log("==inexecute");
    // example on how to decode JWT
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            var attr1 = decodedArgs.Attr1,
            attr2 = decodedArgs.Attr2,
            operator = decodedArgs.operator,
            operand = decodedArgs.operand,
            fvalue = decodedArgs.fvalue; 
            if (operator == "plus")
            {
                console.log("IfBlock+");
                var attr3 = parseInt(attr1)+parseInt(attr2);
                console.log(attr3);
            }  
            if (operator == "minus")    
            {

                console.log("IfBlock-");
                var attr3 = attr1 - attr2;
                console.log(attr3);
            } 
            if (operator == "multiply")
            {

                console.log("IfBlock*");
                var attr3 = attr1 * attr2;
                console.log(attr3);
            } 
            if (operator == "divide")
            {

                console.log("IfBlock/");
                var attr3 = attr1/attr2;
                console.log(attr3);
            }
            if (operand == "gt")

            {   console.log("IfBlockGT");
                if (attr3 > fvalue)
                {
                    console.log("IfBlockGTTrue");
                return res.json({ "branchResult": "True" });
                }
                    else
                    {
                    console.log("IfBlockGTFalse");
                    return res.json({ "branchResult": "False" });
                    }
            }
            if (operand == "lt")
            {
                console.log("IfBlockLT");
                if (attr3 < fvalue)
                {
                console.log("IfBlockLTTrue");    
                return res.json({ "branchResult": "True" });
                }
                else
                {
                console.log("IfBlockLTFalse");    
                return res.json({ "branchResult": "False" });
                }
            }
            if (operand == "gte")
            {   
                console.log("IfBlockGte");
                if (attr3 >= fvalue)
                {
                console.log("IfBlockGteTrue");    
                return res.json({ "branchResult": "True" });
                }
                else
                {
                console.log("IfBlockGteFalse");    
                return res.json({ "branchResult": "False"});
                }
            }
            if (operand == "lte")
            {
                console.log("IfBlockLte");
                if (attr3 <= fvalue)
                {
                console.log("IfBlockLteTrue");    
                return res.json({ "branchResult": "True" });
                }
                else
                {
                console.log("IfBlockLteFalse");    
                return res.json({ "branchResult": "False" });
                }
            }
            if (operand == "equals")
            {   
                console.log("IfBlockEquals");
                if (attr3 == fvalue)
                {
                console.log("IfBlockEquals");    
                return res.json({ "branchResult": "Remainder" });
                }
            }

            logData(req);
            console.log("=decodedArgs=" + JSON.stringify(decodedArgs));

        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
            return res.json({ "branchResult": "Remainder" });
        }
    });
};

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};
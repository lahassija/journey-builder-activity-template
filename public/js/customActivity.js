define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        console.log("save called");
        var dataExtensionName = $('#DEname').val(),
        attribute1 = $('#attr1').val(),
        attribute2 = $('#attr2').val(),
        operator = $('#operator').val(),
        operand = $('#operand').val(),
        finalvalue = $('#fvalue').val()
        console.log(dataExtensionName);
        console.log(attribute1);
        console.log(attribute2);
        console.log(operator);
        console.log(operand);   
        console.log(payload);      
        payload['arguments'].execute.inArguments = [{
        "Attr1": "{{Contact.Attribute."+ dataExtensionName + "." + attribute1+"}}",
        "Attr2": "{{Contact.Attribute."+ dataExtensionName + "." + attribute2+"}}",
        "ContactKey": "{{Contact.Key}}",
        "operator": operator,
        "operand": operand,
        "fvalue": finalvalue          
    }];

    payload['metaData'].isConfigured = true;
    console.log("dataExtensionName value", JSON.stringify(dataExtensionName));
    console.log(JSON.stringify(payload));
    if (dataExtensionName != "")
    {
        connection.trigger('updateActivity', payload);
    }
    }


});
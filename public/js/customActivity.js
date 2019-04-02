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
        var journeyName = $('#journeyName').val(),
        dataExtensionName = $('#dataExtensionName').val(),
        attributeGroupName = $('#attributeGroupName').val(),
        subscriberKey ="VoltageEncrypted",
        CAS_check_variable = "OTB" ,
        CAS_check_operand = $('#CAS_check_operand').val(),
        CAS_check_min_value = $('#CAS_check_min_value').val(),
        CAS_check_max_value = $('#CAS_check_max_value').val(),
        currency = "USD",
        region = "Market",
        market = "Market",
        updateKey="SubscriberKey"
    // popup starts
    // Get the modal
 
    //Popup ends        
    console.log(payload);        
        payload['arguments'].execute.inArguments = [{
        "subscriberKey": "{{Contact.Attribute."+ dataExtensionName + "." + subscriberKey+"}}",
        "CAS_check_variable": CAS_check_variable,
        "CAS_check_operand": CAS_check_operand,
        "CAS_check_min_value": CAS_check_min_value,
        "CAS_check_max_value": CAS_check_max_value,
        "currencyCode": currency,
        "countryCode" : "{{Contact.Attribute."+ dataExtensionName + "." + market+"}}",
        "regionCode" : "{{Contact.Attribute."+ dataExtensionName + "." + region+"}}",
        "Context": "{{Context}}",
        "journeyDetails": "{{Context.VersionNumber}}",
        "DefinitionId": "{{Context.DefinitionId}}",
        "contactIdentifier": "{{Contact.Key}}",
        "updateKey": "{{Contact.Attribute."+ dataExtensionName + "." + updateKey+"}}"           
    }];

    payload['metaData'].isConfigured = true;
    console.log("subscriberKey value", JSON.stringify(subscriberKey));
    console.log("dataExtensionName value", JSON.stringify(dataExtensionName));
    console.log(JSON.stringify(payload));
    if (dataExtensionName != ""  && isBlocked == false) {
        connection.trigger('updateActivity', payload);
    }
    }


});
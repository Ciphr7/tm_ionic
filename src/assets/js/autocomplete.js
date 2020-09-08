//document.getElementById("#origin").style.backgroundImage=imageUrl
//document.getElementById("#origin").style.backgroundColor=red;


$("#origin").autocomplete({
    source: function (request, response) {
        $.ajax({

            url: 'https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=' + $('#origin').val() + ' &apikey=SzI2ekdDV0ZKdmI0ZHlzMUNHT3B5dz090',
            //data: "{ 'prefix': '" + request.term + "'}",
            dataType: "json",
            //type: "POST",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                response($.map(data, function (item) {
                    return item.City + ', ' + item.State + ', ' + item.PostalCode;
                }))
            },
            // error: function (response) {
            //     alert(response.responseText);
            // },
            failure: function (response) {
                alert(response.responseText);
            }
        });
    },
    select: function (e, i) {
    $("#origin").val(i.item.val);
    },
    minLength: 3
});

$("#stop1").autocomplete({
    source: function (request, response) {
        $.ajax({

            url: 'https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=' + $('#stop1').val() + ' &apikey=SzI2ekdDV0ZKdmI0ZHlzMUNHT3B5dz090',
            //data: "{ 'prefix': '" + request.term + "'}",
            dataType: "json",
            //type: "POST",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                response($.map(data, function (item) {
                    return item.City + ', ' + item.State + ', ' + item.PostalCode;
                }))
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
    },
    select: function (e, i) {
    $("#stop1").val(i.item.val);
    },
    minLength: 3
});


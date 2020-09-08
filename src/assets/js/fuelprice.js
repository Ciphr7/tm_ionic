$(document).ready(function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2,'0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var tdate = mm + '/' + dd + '/' + yyyy;


    // get the data from the API back end
    // $.get("api/averages", function (data) {
    //     var exp = data[i].price - data[i].refundableIFTA


    //     var html = ""
    //     // generate HTML from data
    //     for (var i = 0; i < data.length; i++) {
    //         html += `<tr class="fueld"><td class="fueld">${data[i].state}</td><td>${data[i].price}</td><td>${exp}</td><td>${data[i].yesterdayPrice}</td><td>${data[i].refundableIFTA}</td></tr>`;
    //     }
    $.get("api/averages", function (data) {
        
        var html = ""
        // generate HTML from data
        for (var i = 0; i < data.length; i++) {
			// Needs to be inside the loop
            var exp = data[i].price - data[i].refundableIFTA
            var diff = data[i].price - data[i].yesterdayPrice
            html += `<tr class="fueld"><td class="fueld">${data[i].state}</td><td>${data[i].price}</td><td>${exp.toFixed(2)}</td><td>${data[i].yesterdayPrice}</td><td>${data[i].refundableIFTA}</td><td>${diff.toFixed(2)}</td></tr>`;
        }


        // replace HTML in target element with data
        $("#tdate").html(tdate);
        $("#result-target").html(html);

    });

});
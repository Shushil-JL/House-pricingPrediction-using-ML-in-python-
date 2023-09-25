function getBathValue() {
    var uiBathrooms = document.getElementById('uibath')
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1
        }
    }
    return -1
}

function getBHKvalue() {
    var uibhk = document.getElementById('uibhk')
    for (var i in uibhk) {
        if (uibhk[i].checked) {
            return parseInt(i) + 1
        }
    }
    return -1
}

function estimatePriceHandler() {
    console.log('estimate price is clicked')
    var sqft = document.getElementById('uisqft')
    var bhk = getBHKvalue()
    var bath = getBathValue()
    var location = document.getElementById('uiLocations')
    var estPrice = document.getElementById('uiEstimatedPrice')

    var url = "http://127.0.0.1:5000/predict"
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bath,
        location: location.value
    }, function (data, status) {
        console.log(data.EstimatedPrice)
        estPrice.innerHTML = "<h2>" + data.EstimatedPrice.toString() + " Lakhs only.</h2>"
        console.log(status)
    })

}



function onPageLoad() {
    console.log('document loaded')
    var url = "http://127.0.0.1:5000/locations"
    $.get(url, function (data, status) {
        console.log('Got resposnse for locations')
        if (data) {
            var locations = data.locations
            var uiLocation = document.getElementById('uiLocations')
            $('#uiLocations').empty()
            for (var i in locations) {
                var opt = new Option(locations[i])
                $('#uiLocations').append(opt)
            }
        }
    })
}



window.onload = onPageLoad;
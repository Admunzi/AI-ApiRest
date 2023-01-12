// Sending and receiving data in JSON format using POST method
//
var url = "http://127.0.0.1:5000/predict";

function sendJsonTextArea(){
    var dataForm = document.getElementById("jsonTextArea");
    const formJSON = JSON.parse(dataForm.value);

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(formJSON),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            alert(JSON.stringify(result));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function sendIndividualObservation(){
    var dataForm = new FormData(document.getElementById("individualObservation"));
    const formJSON = Object.fromEntries(dataForm.entries());

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(formJSON, replacerIndividual),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            alert(JSON.stringify(result));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function replacerIndividual(key, value) {
  // Filtrando propiedades
  if (typeof value === "string") {
    return [Number(value)];
  }
  return value;
}
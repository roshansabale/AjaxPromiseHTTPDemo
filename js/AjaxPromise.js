//include xmlhttprequest package
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs " + date.getMinutes() + "Mins " + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            // console.log(methodType + " State changed called at:" + showTime() + " Ready state: " + xhr.readyState + " Status " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handled 400 client error or 500 server error at:" + showTime());
                }
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " Request sent to the server at: " + showTime());
    });
}
//get call
const getURL = "http://127.0.0.1:3000/employee/";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at: " + showTime() + " Date is : " + responseText)
    })
    .catch(error => console.log("GET Error Status:" +
        JSON.stringify(error)));

console.log("Made GET AJAX Call to Server " + showTime());

//delete call
const deleteURL = "http://127.0.0.1:3000/employee/3";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("Deleted User Data at: " + showTime() + " Date is : " + responseText)
    })
    .catch(error => console.log("GET Error Status:" +
        JSON.stringify(error)));

console.log("Made DELETE AJAX Call to Server " + showTime());


const postURL = "http://127.0.0.1:3000/employee";
const empData = {
    "name": "Gaurav",
    "gender": "male",
    "department": ["HR", "Finance", "Engineer"],
    "salary": "35000",
    "startDate": "5 April 2021",
    "profileUrl": "../assets/profile-images/Ellipse 1.png"
};

makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("POST User Data at: " + showTime() + " Date is : " + responseText)
    })
    .catch(error => console.log("GET Error Status:" +
        JSON.stringify(error)));

console.log("Made POST AJAX Call to Server " + showTime());
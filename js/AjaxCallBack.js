//include xmlhttprequest package
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs " + date.getMinutes() + "Mins " + date.getSeconds() + "Secs";
}

function makeAJAXCAll(methodType, url, callback, async = true, data = null) {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // console.log(methodType + " State changed called at:" + showTime() + " Ready state: " + xhr.readyState + " Status " + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client error or 500 Server Error at:" + showTime());
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " Request sent to the server at: " + showTime());
}

//get call
const getURL = "http://127.0.0.1:3000/employee/";

function getUserDetails(data) {
    console.log("Get User Data at: " + showTime() + " Data:" + data)
}
makeAJAXCAll("GET", getURL, getUserDetails, true); //activity A
console.log("Made GET AJAX Call to Server " + showTime());


//delete call
const deleteURL = "http://127.0.0.1:3000/employee/3";

function userDeleted(data) {
    console.log("User Deleted" + data);
}
makeAJAXCAll("DELETE", deleteURL, userDeleted, false);

const postURL = "http://127.0.0.1:3000/employee";
const empData = {
    "name": "Rakesh",
    "gender": "male",
    "department": ["HR", "Finance", "Engineer"],
    "salary": "35000",
    "startDate": "5 April 2021",
    "profileUrl": "../assets/profile-images/Ellipse 1.png"
};

function userAdded(data) {
    console.log("User Added" + data);
}
makeAJAXCAll("POST", postURL, userAdded, true, empData);
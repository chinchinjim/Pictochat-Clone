(function () {
    "use strict";

    var userNameInput = document.querySelector("#user-name");
    var userName;

    function nameSubmit() {
        userName = userNameInput.value;
        window.location.href = "chatroom.html?message=" + encodeURIComponent(userName);
    }
    
    var nameSubmitBtn = document.querySelector("#name-submit-btn");
    nameSubmitBtn.addEventListener("click", nameSubmit);
    
    userNameInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            document.querySelector("#name-submit-btn").click();
        }
    });
    



}())
(function () {
    "use strict";

    var userNameInput = document.querySelector("#user-name");
    var userName;

    function nameSubmit() {
        userName = userNameInput.value;
        localStorage.setItem('name', userName);
        window.location.href = "color-pick.html";
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
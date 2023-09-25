(function () {
    "use strict";
    // var userName = localStorage.getItem('name');
    // document.getElementById('tester').textContent = userName;

    const colors = document.querySelectorAll('.color');

    // Define a function to handle the click event
    function changeActiveColor(event) {
        // Remove the added class from all divs (if any)
        colors.forEach(div => div.classList.remove('active-color'));

        // Add the "active" class to the clicked div
        this.classList.add('active-color');

        
        var activeColor = getComputedStyle(this).backgroundColor;
        var tinycolorInstance = tinycolor(activeColor);
        // Make the color lighter by increasing the lightness
        var lighterColor = tinycolorInstance.lighten(30).toString();
        document.documentElement.style.setProperty('--active-color', activeColor);
        document.documentElement.style.setProperty('--lighter-color', lighterColor);
        
        localStorage.setItem('colour', activeColor);
        localStorage.setItem('light-colour', lighterColor);
    }

    // Add a click event listener to each div
    colors.forEach(div => {
        div.addEventListener('click', changeActiveColor);
    });
}())
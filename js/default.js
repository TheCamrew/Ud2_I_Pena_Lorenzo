window.onload = function () {
    try {
        var main = document.getElementById("main");

        main.style.backgroundPosition = "center -40000px";

        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/637b3a15b0d6371309d02fcf/1gicllpld';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    } catch (error) {
        console.log("Tawk not loaded");
    }
}
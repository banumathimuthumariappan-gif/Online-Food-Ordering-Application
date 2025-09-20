document.getElementById("backHome-button").addEventListener("click", () => {
    window.location.href = "index.html";
    window.localStorage.removeItem("cartData");
});
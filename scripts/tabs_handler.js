/* ------- TABS HANDLER ------- */
const tab_btn = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab-content");

function activateTab (tab_name) {
    tab_btn.forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === tab_name);
    });
    tabs.forEach(tab => {
        tab.classList.toggle("active", tab.id === `${tab_name}-tab`);
    });
}

const params = new URLSearchParams(window.location.search);
const initialTab = params.get("tab");

if (initialTab) {
    activateTab(initialTab);
}

tab_btn.forEach(btn => {
    btn.addEventListener("click", function () {
        const tab_name = this.getAttribute("data-tab");

        activateTab(tab_name);

        const newUrl = `${window.location.pathname}?tab=${tab_name}`;
        history.replaceState(null, "", newUrl);
    });
});

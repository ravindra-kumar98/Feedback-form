"use strict";
const sidebar = document.getElementById("crm-sidebar");
const cBody = document.getElementById("contentBody");
// const mFooter = document.getElementById("mainFooter");
// let menuLinkText = document.getElementsByClassName("nm-tl-text");
// let arrowIcon = document.getElementsByClassName("sub-menu");
// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const overLay = document.getElementById("ovl-hd-sw");


const colBtn = document.getElementById('collapseButton');

const desktop = () => {
    if (sidebar.style.width === "0px") {
        sidebar.style.width = "260px";
        cBody.style.marginLeft = "260px";
    } else {
        sidebar.style.width = "0px";
        cBody.style.marginLeft = "0px";
    }
}

const mobile = () => {
    if (sidebar.style.width === "0px") {
        sidebar.style.width = "260px";
        cBody.style.marginLeft = "0px";
        overLay.style.display = "block";
    } else {
        sidebar.style.width = "0px";
        cBody.style.marginLeft = "0px";
        overLay.style.display = "none";
    }
}

const resizeHandler = () => {
    switch (!0) {
        case window.innerWidth >= 1140:
            sidebar.style.width = "260px";
            cBody.style.marginLeft = "260px";
            collapseButton.addEventListener("click", desktop);
            collapseButton.removeEventListener("click", mobile);
            break;
        case window.innerWidth >= 300 && window.innerWidth < 1140:
            sidebar.style.width = "0px";
            cBody.style.marginLeft = "0px";
            overLay.style.display = "none";
            collapseButton.removeEventListener("click", desktop);
            collapseButton.addEventListener("click", mobile);
            overLay.addEventListener("click", function () {
                sidebar.style.width = "0px";
                cBody.style.marginLeft = "0px";
                this.style.display = "none";
            });
            break;
        default:
            break;
    }
};
resizeHandler();
window.addEventListener("resize", resizeHandler);
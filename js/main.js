"use strict";
document.addEventListener("DOMContentLoaded", () =>
{
    // Image Loader //////////////////////////////////////////////////////////////////
    let uploadProf = document.getElementById("uploadProf"),
        uploadSig = document.getElementById("uploadSig"),
        chooseProf = document.getElementById("chooseProf"),
        chooseSig = document.getElementById("chooseSig"),
        imageProf = document.getElementById("imageProf"),
        imageSig = document.getElementById("imageSig");

    chooseProf.addEventListener("change", (event) =>
    {
        handleFileUpload(event.target.files[0], imageProf);
    });
    chooseSig.addEventListener("change", (event) =>
    {
        handleFileUpload(event.target.files[0], imageSig);
        let sigDisplay = parseFloat(Math.round(event.target.files[0].size / 1024));
        if (sigDisplay > 1024)
        {
            imageSig.style.display = 'none';
        }
        else
        {
            imageSig.style.display = 'block';
        }
    });
    uploadProf.addEventListener("click", () =>
    {
        chooseProf.click();
        chooseProf.value = "";
    });
    uploadSig.addEventListener("click", () =>
    {
        chooseSig.click();
    });
    function handleFileUpload(file, targetImg)
    {
        let size = parseFloat(file.size),
            sizeKB = Math.round(size / 1024),
            maxSize = 1024;
        if (file && sizeKB <= maxSize)
        {
            const reader = new FileReader();
            reader.onload = (e) =>
            {
                targetImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else 
        {
            alert.style.display = 'block';
            shadow.style.display = 'block';
            errlist();
            liElem.appendChild(document.createTextNode('File size should be maximum 1MB and the current file size is ' + Math.round(sizeKB / 1024) + 'MB'));
        }
    }

    // Function to create an input element for text editing
    function createTextInput(initialValue, placeholder)
    {
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.classList.add("form-control");
        input.setAttribute("placeholder", placeholder);
        input.value = initialValue;
        return input;
    }

    // Function to create a textarea element for feedback editing
    function createTextarea(initialValue, placeholder)
    {
        let textarea = document.createElement("textarea");
        textarea.setAttribute("rows", "6");
        textarea.classList.add("form-control");
        textarea.setAttribute("placeholder", placeholder);
        textarea.value = initialValue;
        return textarea;
    }

    // Editable text elements
    let editableTextElements = document.querySelectorAll(".edit_icon");
    editableTextElements.forEach((element) =>
    {
        let editext = element.parentNode.querySelector(".titext");

        element.addEventListener("click", function ()
        {
            // debugger;
            let initialValue = editext.innerText;
            let input = createTextInput(initialValue, "Fill this empty field");
            // element.parentNode.replaceChild(input, editext);
            // console.log()
            element.parentNode.children[0].className == "form-control" ? element.removeEventListener : element.parentNode.replaceChild(input, editext);
            input.focus();

            input.addEventListener("blur", () =>
            {
                let value = input.value.trim();
                let editableText = document.querySelector(".editableText");
                let warnMsg = editableText.querySelector('.invalid-feedback')
                if (value === "")
                {
                    this.nextElementSibling.style.display = "block";
                } else
                {
                    this.nextElementSibling.style.display = "none";
                    editext.innerText = value;
                    input.parentNode.replaceChild(editext, input);
                }
            });
        });
    });

    // Editable feedback elements
    let editableFeedbackElements = document.querySelectorAll(".edit_icon2");
    editableFeedbackElements.forEach((element) =>
    {
        let editfeed = element.parentNode.querySelector(".editableFeedback");

        element.addEventListener("click", function ()
        {
            let initialValue = editfeed.innerText;
            let textarea = createTextarea(initialValue, "Write your comments here");
            // editfeed.parentNode.replaceChild(textarea, editfeed);
            element.parentNode.children[0].className == "form-control" ? element.removeEventListener : element.parentNode.replaceChild(textarea, editfeed);
            textarea.focus();
            textarea.addEventListener("blur", () =>
            {
                // debugger;
                let value = textarea.value.trim();
                let warnMsg = editfeed.querySelector('.invalid-feedback');
                editfeed.innerText = value === "" ? textarea.placeholder : value;

                if (value === "")
                {
                    this.parentNode.lastElementChild.style.display = "block";
                }
                else
                {
                    this.parentNode.lastElementChild.style.display = "none";
                    textarea.parentNode.replaceChild(editfeed, textarea);
                }

            });
        });
    });


    // Rating Start Aive Element //////////////////////////////////////////////////////////////////
    const ratingStar = document.querySelectorAll('.star-icon li');
    ratingStar.forEach((star, index1) =>
    {
        star.addEventListener("click", () =>
        {
            ratingStar.forEach((star, index2) =>
            {
                index1 >= index2 ? star.classList.add('active_star') : star.classList.remove('active_star');
            });
        })
    });


    // Validation for preview //////////////////////////////////////////////////////////////////
    //Rating =>
    let prevBTN = document.getElementById("prevButton"),
        starIcons = document.getElementById('starIcon'),
        alert = document.getElementById('dangerAlert'),
        shadow = document.getElementById('alertShadow'),
        alertClose = document.getElementById('alertClose'),
        imageProfSrc = imageProf.getAttribute('src'),
        ErrList = document.querySelector('#error'),
        liElem = document.createElement('li'),
        iElem = document.createElement('i');
    iElem.className = "fas fa-times-circle me-1";
    function errlist()
    {
        ErrList.appendChild(liElem);
        liElem.appendChild(iElem);
    }
    //debugger;
    prevBTN.addEventListener('click', () =>
    {
        //debugger;
        if (!validate())
        {
            $('#exampleModal').modal('hide');
            return false;
        }
        $('#exampleModal').modal('show');
    });
    function validate()
    {
        let eachIcon = starIcons.querySelectorAll('li.active_star'),
            imageSigSrc = imageSig.getAttribute('src');

        //debugger;
        if (eachIcon.length == 0)
        {
            alert.style.display = 'block';
            shadow.style.display = 'block';
            errlist();
            liElem.appendChild(document.createTextNode('Please rate us'));
            return false;
        } else if (imageProfSrc === imageProf.attributes[0].value)
        {
            alert.style.display = 'block';
            shadow.style.display = 'block';
            errlist();
            liElem.appendChild(document.createTextNode('Please upload your profile picture'));
            return false;
        } else if (imageSigSrc === '')
        {
            alert.style.display = 'block';
            shadow.style.display = 'block';
            errlist();
            liElem.appendChild(document.createTextNode('Please upload your signature'));
            return false;
        }
        return true;
    }
    alertClose.addEventListener('click', () =>
    {
        alert.style.display = 'none';
        shadow.style.display = 'none';
        liElem.remove();
        liElem.textContent = ''

    })
});
const rowData = document.querySelector("#rowData");
const rowDataCategories = document.querySelector("#rowDataCategories");
const rowDataArea = document.querySelector("#rowDataArea");
const rowDataIngredients = document.querySelector("#rowDataIngredients");
const rowContactUs = document.querySelector("#rowContactUs");

/////////////////////////////////// Document IS Ready ///////////////////////////////////////////
$(document).ready(function () {
    $(".loading").animate({ top: "-110%" }, 3000);
});

/////////////////////////////////// Open Slider ///////////////////////////////////////////
function openSlider() {
    $("nav").animate({ left: "0px" }, 500);
    $(".Bars").removeClass("fa-align-justify").addClass("fa-x");
    $(".nav-links .links li").each(function (index) {
        $(this).animate({ top: "0px" }, (index + 5) * 100);
    });
}

/////////////////////////////////// Close Slider ///////////////////////////////////////////
function closeSlider() {
    $("nav").animate({ left: "-336.734px" }, 500);
    $(".Bars").addClass("fa-align-justify").removeClass("fa-x");
    $(".nav-links .links li").animate({ top: "300px" }, 500);
}

/////////////////////////////////// Toggle Slider ///////////////////////////////////////////
$("nav .logo .Bars").on("click", function () {
    if ($("nav").css("left") == "0px") {
        closeSlider();
    } else {
        openSlider();
    }
});

/////////////////////////////////// Get Data Meals ///////////////////////////////////////////
async function getMeals() {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    const data = await response.json();
    displayData(data.meals);
}

/////////////////////////////////// Display Default Data ///////////////////////////////////////////
function displayData(data) {
    let cartona = "";
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getDetailsMeals(${data[i].idMeal})" class="meal position-relative overflow-hidden rounded-2">
                <img src="${data[i].strMealThumb}" class="w-100 rounded-3" alt="">
                <div class="layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                    <h3>${data[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
    }
    rowData.innerHTML = cartona;
}

/////////////////////////////////// Get Categories Data Meals ///////////////////////////////////////////
async function getCategories() {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const data = await response.json();
    displayCategories(data.categories);
    $("#rowData").hide();
    $("#searchInput").hide();
    $("#rowDataArea").hide();
    $("#rowDataIngredients").hide();
    $("#rowDataCategories").show();
    $("section.contactUs").addClass("d-none");
    closeSlider();
}

/////////////////////////////////// Display Categories Data Meals ///////////////////////////////////////////
function displayCategories(data) {
    let cartona = "";
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getDetailsCategories('${
                data[i].strCategory
            }')" class="meal position-relative overflow-hidden rounded-2 text-center">
                <img src="${
                    data[i].strCategoryThumb
                }" class="w-100 rounded-3" alt="">
                <div class="layer position-absolute w-100 h-100 d-flex align-items-center p-1 flex-column">
                    <h3>${data[i].strCategory}</h3>
                    <p>${data[i].strCategoryDescription
                        .split(" ")
                        .slice(0, 20)
                        .join(" ")}</p>
                </div>
            </div>
        </div>`;
    }
    rowDataCategories.innerHTML = cartona;
}

/////////////////////////////////// Get Area Data Meals ///////////////////////////////////////////
async function getAreaMeals() {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const data = await response.json();
    displayArea(data.meals);
    $("#rowData").hide();
    $("#searchInput").hide();
    $("#rowDataCategories").hide();
    $("#rowDataIngredients").hide();
    $("#rowDataArea").show();
    $("section.contactUs").addClass("d-none");
    closeSlider();
}

/////////////////////////////////// Display Area Data Meals ///////////////////////////////////////////
function displayArea(data) {
    let cartona = "";
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getArea('${data[i].strArea}')" class="area text-center text-white">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${data[i].strArea}</h3>
            </div>
        </div>`;
    }
    rowDataArea.innerHTML = cartona;
}

/////////////////////////////////// Get Ingredients Data Meals ///////////////////////////////////////////
async function getIngredients() {
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let data = await response.json();
    displayIngredients(data.meals.slice(0, 20));
    $("#rowData").hide();
    $("#rowDataArea").hide();
    $("#searchInput").hide();
    $("#rowDataCategories").hide();
    $("#rowDataIngredients").show();
    $("section.contactUs").addClass("d-none");
    closeSlider();
}

/////////////////////////////////// Display Ingredients Data Meals ///////////////////////////////////////////
function displayIngredients(data) {
    let cartona = "";
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getDetailsIngredients('${
                data[i].strIngredient
            }')" class="meal text-center text-white">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${data[i].strIngredient}</h3>
                <p>${data[i].strDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}</p>
            </div>
        </div>`;
    }
    rowDataIngredients.innerHTML = cartona;
}

/////////////////////////////////// Get Details Categories Data Meals ///////////////////////////////////////////
async function getDetailsCategories(category) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();
    console.log(data);
    $("#rowData").hide();
    $("#searchInput").hide();
    $("#rowDataCategories").show();
    $("#rowDataIngredients").hide();
    $("#rowDataArea").hide();
    $("section.contactUs").addClass("d-none");
    displayDetailsCategories(data.meals);
}

/////////////////////////////////// Display Details Categories Data Meals ///////////////////////////////////////////
function displayDetailsCategories(data) {
    let cartona = "";
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            cartona += `
                    <div class="col-md-3">
                        <div onclick="getDetailsMeals('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
                            <img src="${data[i].strMealThumb}" class="w-100 rounded-3" alt="">
                            <div class="layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                                <h3>${data[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`;
        }
    }
    rowDataCategories.innerHTML = cartona;
}

//////////////////////////////// Get Area ////////////////////////////////////////////////////////
async function getArea(area) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const data = await response.json();
    console.log(data);
    displayDetailsArea(data.meals);
    $("section.contactUs").addClass("d-none");
}

/////////////////////////////////// Display Area Details Data Meals ///////////////////////////////////////////
function displayDetailsArea(data) {
    let cartona = "";
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            cartona += `
                    <div class="col-md-3">
                        <div onclick='getDetailsMeals(${data[i].idMeal})' class="meal position-relative overflow-hidden rounded-2">
                            <img src="${data[i].strMealThumb}" class="w-100 rounded-3" alt="">
                            <div class="layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                                <h3>${data[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`;
        }
    }
    rowDataArea.innerHTML = cartona;
    $("#rowData").hide();
}

//////////////////////////////// Get Details Ingredients Meals ///////////////////////////////////
async function getDetailsIngredients(ingredients) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
    );
    const data = await response.json();
    displayDetailsIngredients(data.meals);
    $("section.contactUs").addClass("d-none");
}

/////////////////////////////////// Display Data Meals ///////////////////////////////////////////
function displayDetailsIngredients(data) {
    let cartona = "";
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            cartona += `
                    <div class="col-md-3">
                        <div onclick="getDetailsMeals('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
                            <img src="${data[i].strMealThumb}" class="w-100 rounded-3" alt="">
                            <div class="layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                                <h3>${data[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`;
        }
    }
    rowDataIngredients.innerHTML = cartona;
    $("#rowDataCategories").hide();
    $("#rowData").hide();
    $("#rowDataIngredients").show();
}

/////////////////////////////////// Click on Contact Us ///////////////////////////////////////////
$("#linkContactUs").on("click", function () {
    $("section.contactUs").removeClass("d-none");
    contactUsForm();
    $("#rowData").hide();
    $("#rowDataArea").hide();
    $("#rowDataCategories").hide();
    $("#rowDataIngredients").hide();
    $("#searchInput").hide();
    $("#rowContactUs").show();
    closeSlider();
});

/////////////////////////////////// Get Details Data ///////////////////////////////////////////
async function getDetailsMeals(idMeal) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    const data = await response.json();
    displayDetails(data.meals[0]);
    $("#rowDataArea").hide();
}

/////////////////////////////////// Display Details Data ///////////////////////////////////////////
function displayDetails(data) {
    let tags = data.strTags?.split(",") || [];
    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }
    let ingredientsStr = "";
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredientsStr += `<li class="alert alert-info m-2 p-1">${
                data[`strMeasure${i}`] + " " + data[`strIngredient${i}`]
            }</li>`;
        }
    }
    let cartona = `
        <div class="col-md-4 text-white">
            <img src="${data.strMealThumb}" class="w-100 rounded-3" alt="">
            <h2>${data.strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p>${data.strInstructions}</p>
            <h3><strong>Area</strong> : ${data.strArea}</h3>
            <h3><strong>Category</strong> : ${data.strCategory}</h3>
            <h3><strong>Recipe</strong> : </h3>
            <ul class="d-flex list-unstyled flex-wrap ">
                ${ingredientsStr}
            </ul>
            <h3><strong>Tags :</strong></h3>
            <ul class="d-flex list-unstyled flex-wrap ">
                ${tagsStr}
            </ul>
            <button type="button" class="btn btn-success">
                <a class="text-decoration-none" href="${data.strSource}" target="_blank">Source</a>
            </button>
            <button type="button" class="btn btn-danger">
                <a class="text-decoration-none" href="${data.strYoutube}" target="_blank">YouTube</a>
            </button>
        </div>
    `;
    rowData.innerHTML = cartona;
    $("#rowDataCategories").hide();
    $("#rowData").show();
    $("#rowDataIngredients").hide();
}

///////////////////////////////////Click for linkSearch (Display Inputs) ///////////////////////////
$("#linkSearch").on("click", function () {
    $("#searchInput").html(`
        <div class="col-md-6"><input type="text" class="byName form-control bg-transparent text-white" placeholder="Search By Name"></div>
        <div class="col-md-6"><input type="text" class="byFLitter form-control bg-transparent text-white" placeholder="Search By First Letter"></div>
    `);
    closeSlider();
    $("#searchInput").show();
    $("#rowData").hide();
    $("#rowDataCategories").hide();
    $("#rowDataArea").hide();
    $("#rowDataIngredients").hide();
    $("section.contactUs").addClass("d-none");
});

/////////////////////////////////// Get Details By Area  ///////////////////////////////////////////////
async function getDetailsByArea(area) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const data = await response.json();
    console.log(data);
    displayDetailsByArea(data.meals);
}

/////////////////////////////////// Display Details By Area  ///////////////////////////////////////////////
function displayDetailsByArea(data) {
    let cartona = "";
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            cartona += `
                <div class="col-md-3">
                    <div onclick='getDetailsMeals(${data[i].idMeal})' class="meal position-relative overflow-hidden rounded-2">
                        <img src="${data[i].strMealThumb}" class="w-100 rounded-3" alt="">
                        <div class="layer position-absolute w-100 h-100 d-flex align-items-center p-2">
                            <h3>${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`;
        }
    }
    rowDataCategories.innerHTML = cartona;
}

/////////////////////////////////// Search input (Search by Name) ///////////////////////////////////
$("#searchInput").on("keyup", "input.byName", function () {
    searchByName();
});

/////////////////////////////////// Search input (Search by First Letter)///////////////////////////////////
$("#searchInput").on("keyup", "input.byFLitter", function () {
    searchByFirstLetter();
});

/////////////////////////////////// Display search results By Name ///////////////////////////////////
async function searchByName() {
    let searchValue = $("input.byName").val().trim();
    if (searchValue.length > 0) {
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
        );
        let data = await response.json();
        if (data.meals) {
            displayData(data.meals);
            $("#rowData").show();
        } else {
            $("#rowData").hide();
        }
    }
}

/////////////////////////////////// Display search results By First Letter ///////////////////////////////////
async function searchByFirstLetter() {
    let letter = $("input.byFLitter").val().trim().charAt(0).toLowerCase();
    if (letter.length === 1 && /^[a-z]$/.test(letter)) {
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
        let data = await response.json();
        if (data.meals) {
            displayData(data.meals);
            $("#rowData").show();
        } else {
            $("#rowData").hide();
        }
    }
}

/////////////////////////////////// Display Contact Us Form ///////////////////////////////////////////
function contactUsForm() {
    rowContactUs.innerHTML = `
        <div class="col-md-6">
            <input type="text" id="nameInput" class="form-control" required placeholder="Enter Your Name">
            <div class="alert alert-danger mt-2 text-center d-none" id="nameAlert" role="alert">
                Special characters and numbers not allowed
            </div>
        </div>
        <div class="col-md-6">
            <input type="email" id="emailInput" class="form-control" required placeholder="Enter Your Email">
            <div class="alert alert-danger mt-2 text-center d-none" id="emailAlert" role="alert">
                Email not valid *exemple@yyy.zzz
            </div>
        </div>
        <div class="col-md-6">
            <input type="tel" id="phoneInput" class="form-control" required placeholder="Enter Your Phone">
            <div class="alert alert-danger mt-2 text-center d-none" id="phoneAlert" role="alert">
                Enter valid Phone Number
            </div>
        </div>
        <div class="col-md-6">
            <input type="number" id="ageInput" class="form-control" required placeholder="Enter Your Age">
            <div class="alert alert-danger mt-2 text-center d-none" id="ageAlert" role="alert">
                Enter valid age (18-99)
            </div>
        </div>
        <div class="col-md-6">
            <input type="password" id="passwordInput" class="form-control" required placeholder="Enter Your Password">
            <div class="alert alert-danger mt-2 text-center d-none" id="passwordAlert" role="alert">
                Minimum eight characters, at least one letter and one number.
            </div>
        </div>
        <div class="col-md-6">
            <input type="password" id="rePasswordInput" class="form-control" required placeholder="Enter Your RePassword">
            <div class="alert alert-danger mt-2 text-center d-none" id="rePasswordAlert" role="alert">
                Passwords do not match
            </div>
        </div>
        <div class="btn">
            <button type="button" id="submitBtn" class="btn btn-outline-danger" disabled>Submit</button>
        </div>`;
}

/////////////////////////////////// Validation Input Form ///////////////////////////////////////////
document.addEventListener("input", function () {
    const nameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{11}$/;
    const ageRegex = /^(1[89]|[2-9][0-9])$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const phone = document.getElementById("phoneInput").value;
    const age = document.getElementById("ageInput").value;
    const password = document.getElementById("passwordInput").value;
    const rePassword = document.getElementById("rePasswordInput").value;

    const nameAlert = document.getElementById("nameAlert");
    const emailAlert = document.getElementById("emailAlert");
    const phoneAlert = document.getElementById("phoneAlert");
    const ageAlert = document.getElementById("ageAlert");
    const passwordAlert = document.getElementById("passwordAlert");
    const rePasswordAlert = document.getElementById("rePasswordAlert");

    // Name validation
    nameAlert.classList.toggle("d-none", nameRegex.test(name));

    // Email validation
    emailAlert.classList.toggle("d-none", emailRegex.test(email));

    // Phone validation
    phoneAlert.classList.toggle("d-none", phoneRegex.test(phone));

    // Age validation
    ageAlert.classList.toggle("d-none", ageRegex.test(age));

    // Password validation
    passwordAlert.classList.toggle("d-none", passwordRegex.test(password));

    // Re-password validation
    rePasswordAlert.classList.toggle("d-none", password === rePassword);

    // Enable submit button
    const isValid =
        nameRegex.test(name) &&
        emailRegex.test(email) &&
        phoneRegex.test(phone) &&
        ageRegex.test(age) &&
        passwordRegex.test(password) &&
        password === rePassword;

    document.getElementById("submitBtn").disabled = !isValid;
});

getMeals();

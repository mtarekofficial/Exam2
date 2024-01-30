//      https://www.themealdb.com/api/json/v1/1/categories.php                                  >> categories
//      https://www.themealdb.com/api/json/v1/1/list.php?a=list                                 >> Area
//      https://www.themealdb.com/api/json/v1/1/search.php?s=${searchweatheraOfFood}            >> search
//      https://www.themealdb.com/api/json/v1/1/list.php?i=list                                 >> Ingredients
//      https://www.themealdb.com/api/json/v1/1/search.php?s                                    >> index






//..................................................categories..................................................






async function fetchCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    const categories = data.categories;
    const categoriesContainer = document.getElementById('JSCategoriesJS');
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'col-lg-3 col-sm-12 col-md-3 rounded-3 px-0 overflow-hidden';
        categoryElement.setAttribute('onclick', 'categoriAboutEvent(event)');
        categoryElement.innerHTML = `
            <a href="./CategoriesAbout.html" class="text-black">
                <div class="inner w-100 position-relative overflow-hidden p-2">
                    <div class="w-100 d-flex justify-content-center">
                        <img src="${category.strCategoryThumb}" alt="pic-food" class="img-style rounded-3 p-1">
                    </div>
                    <div class="layar w-100 h-100 text-bl flex-column d-flex justify-content-center align-items-center position-absolute">
                        <h3>${category.strCategory}</h3>
                    </div>
                </div>
            </a>`;

        categoriesContainer.appendChild(categoryElement);
    });
}
fetchCategories();






//..................................................Area..................................................






async function fetchAreas() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    const areas = data.meals;
    const areasContainer = document.getElementById('JSAreaJS');
    areas.forEach(area => {
        const areaElement = document.createElement('div');
        areaElement.className = 'col-md-3 text-center mb-2';
        areaElement.setAttribute('onclick', `areaAboutEvent('${area.strArea}')`);
        areaElement.innerHTML = `
            <div class="w-100 icon-area-style" id="JSAreaAboutJSin">
                <a href="./AreaAbout.html" class="text-white text-decoration-none">
                    <i class="fa-solid fa-house-laptop w-100 my-0 py-0"></i>
                    <h2 class="my-0 py-0">${area.strArea}</h2>
                </a>
            </div>`;
        areasContainer.appendChild(areaElement);
    });
} 


async function fetchMealDetails(area) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?a=${area}`);
    const data = await response.json();
    const meal = data.meals[0];
    const areaAboutContainer = document.getElementById('JSAreaAboutJS');
    const h3Element = document.createElement('h3');
    const imgElement = document.createElement('img');
    h3Element.textContent = meal.strMeal;
    imgElement.src = meal.strMealThumb;
    imgElement.alt = 'Meal Thumbnail';
    areaAboutContainer.appendChild(h3Element);
    areaAboutContainer.appendChild(imgElement);
}

function areaAboutEvent(area) {
    const areaAboutContainer = document.getElementById('JSAreaAboutJSin');
    fetchMealDetails(area);
}
fetchAreas();






//..................................................Ingredients..................................................






async function fetchIngredientsAndDescriptions() {
    const ingredientsResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const ingredientsData = await ingredientsResponse.json();
    const ingredients = ingredientsData.meals.slice(0, 20);
    const descriptionsResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const descriptionsData = await descriptionsResponse.json();
    const descriptions = descriptionsData.meals.slice(0, 20);
    const ingredientsContainer = document.getElementById('JSIngradientsJS');
    for (let i = 0; i < ingredients.length; i++) {
        const ingredientElement = document.createElement('div');
        ingredientElement.className = 'col-md-3 text-center mb-2';
        const truncatedDescription = descriptions[i].strDescription.split(' ').slice(0, 20).join(' ');
        ingredientElement.innerHTML = `
            <a href="./IngredientsAbout.html" class="text-white text-decoration-none">
                <div class="w-100 icon-area-style">
                    <i class="fa-solid fa-drumstick-bite w-100 my-0 py-0"></i>
                    <h2 class="my-0 pt-0 pb-2">${ingredients[i].strIngredient}</h2>
                </div>
                <p class="text-white text-center">${truncatedDescription}</p>
            </a>`;
        ingredientsContainer.appendChild(ingredientElement);
    }
} 
fetchIngredientsAndDescriptions();






//..................................................Contact..................................................






function validateForm() {
  var nameInput = document.querySelector('#name');
  var name = nameInput.value;
  var emailInput = document.querySelector('#email');
  var email = emailInput.value;
  var phoneInput = document.querySelector('#phone');
  var phone = phoneInput.value;
  var ageInput = document.querySelector('#age');
  var age = ageInput.value;
  var passwordInput = document.querySelector('#password');
  var password = passwordInput.value;
  var confirmPasswordInput = document.querySelector('#confirmPassword');
  var confirmPassword = confirmPasswordInput.value;

  // Validate Name 
  if (name === '') {
    displayMessage(nameInput, '<p class="text-danger text-center w-100">Oops! Please enter your name...</p>');
    return false;
  } else if (name.length > 30) {
    displayMessage(nameInput, '<p class="text-danger text-center w-100">Oops! Name must be less than 30 characters...</p>');
    return false;
  } else if (name.length < 5) {
    displayMessage(nameInput, '<p class="text-danger text-center w-100">Oops! Name must be more than 5 characters...</p>');
    return false;
  } else {
    displayMessage(nameInput, '<p class="text-success text-center w-100">Woooow! True</p>');
  }

  // Validate Email
  if (email === '') {
    displayMessage(emailInput, '<p class="text-danger text-center w-100">Oops! Please enter your email...</p>');
    return false;
  } else if (!email.match(/^[a-z]{4,20}[0-9]{0,9}(@gmail.com|@icloud.com|@hotmail.com|@yahoo.com|@outlook.com)$/)) {
    alert('There is a problem with your email.');
    displayMessage(emailInput, '<p class="text-danger text-center w-100">Oops! There is a problem with your email...</p>');
    return false;
  } else {
    displayMessage(emailInput, '<p class="text-success text-center w-100">Woooow! True</p>');
  }


  
  // Validate phone
  if (phone === '') {
    displayMessage(phoneInput, '<p class="text-danger text-center w-100">Oops! Please enter your phone...</p>');
    return false;
  }else if ( isNaN(phone) || phone.length !== 11) {
    displayMessage(phoneInput, '<p class="text-danger text-center w-100">Oops! Please enter 11-digit...</p>');
    return false;
  } else {
    displayMessage(phoneInput, '<p class="text-success text-center w-100">Woooow! True</p>');
  }

  // Validate age
  if (age === '') {
    displayMessage(ageInput, '<p class="text-danger text-center w-100">Oops! Please enter your age...</p>');
    return false;
  }else if (age === '' || isNaN(age) || age.length !== 2) {
    displayMessage(ageInput, '<p class="text-danger text-center w-100">Oops! Please enter a valid two-digit age number...</p>');
    return false;
  } else {
    displayMessage(ageInput, '<p class="text-success text-center w-100">Woooow! True</p>');
  }
  

  // Validate Password
  if (password === '') {
    displayMessage(passwordInput, '<p class="text-danger text-center w-100">Oops! Please enter your password...</p>');
    return false;
  } else if (password.length < 8) {
    displayMessage(passwordInput, '<p class="text-danger text-center w-100">Oops! Password must be more than 8 characters...</p>');
    return false;
  } else if (password.length > 30) {
    displayMessage(passwordInput, '<p class="text-danger text-center w-100">Oops! Password must be less than 30 characters...</p>');
    return false;
  } else {
    displayMessage(passwordInput, '<p class="text-success text-center w-100">Woooow! True</p>');
  }

  // Check password 
  if (confirmPassword === '') {
    displayMessage(confirmPasswordInput, '<p class="text-danger text-center w-100">Oops! Please enter your password to check...</p>');
    return false;
  } else if (password !== confirmPassword) {
    displayMessage(confirmPasswordInput, '<p class="text-danger text-center w-100">Oops! Passwords do not match...</p>');
    return false;
    }else {
    displayMessage(confirmPasswordInput, '<p class="text-success text-center w-100">Woooow! True</p>');
    }
 

  // Validate other fields
  if (age === '') {
      displayMessage(ageInput, '<p class="text-danger text-center w-100">Oops! Please enter your age...</p>');
      return false;
  }

  return true;
}

function displayMessage(element, message) {
  var existingMessage = element.nextElementSibling;
  if (existingMessage) {
      existingMessage.innerHTML = message;
  } else {
      var messageElement = document.createElement('div');
      messageElement.innerHTML = message;
      element.parentNode.appendChild(messageElement);
  }
}






//..................................................index..................................................






async function fetchMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
    const data = await response.json();
    const meals = data.meals;
    const mealsContainer = document.getElementById('JSIndexJS');
    meals.forEach((meal, index) => {
        const mealElement = document.createElement('div');
        mealElement.className = 'col-lg-3 col-sm-12 col-md-3 rounded-3 px-0 overflow-hidden';
        mealElement.innerHTML = `
            <a href="./aboutFood.html" class="text-black">
                <div class="inner w-100 position-relative overflow-hidden p-2">
                    <div class="w-100 d-flex justify-content-center">
                        <img src="${meal.strMealThumb}" alt="pic-food" class="img-style rounded-3 p-1">
                    </div>
                    <div class="layar w-100 h-100 text-bl flex-column d-flex justify-content-center align-items-center position-absolute">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            </a>`;
        mealsContainer.appendChild(mealElement);
    });
} 
fetchMeals();






//..................................................search..................................................






var resultsOfFood = [];

function getresultOfFood(searchweatheraOfFood) {
    var weatheraOfFood = new XMLHttpRequest();
    weatheraOfFood.open('get', `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchweatheraOfFood}`);
    weatheraOfFood.send();

    weatheraOfFood.addEventListener('readystatechange', function () {
        if (weatheraOfFood.readyState == 4 && weatheraOfFood.status == 200) {
            resultsOfFood = JSON.parse(weatheraOfFood.responseText);
            displayweathareOfFood();
            displayweathareOfFoodFirsLetter();
        }
    });
}


document.getElementById('getsearchName').addEventListener('input', function (e) {
    getresultOfFood(e.target.value);
});



document.getElementById('getsearchFirstLetter').addEventListener('input', function (e) {
    var inputValue = e.target.value;
    if (inputValue.length === 1) {
        getresultOfFood(inputValue);
    } else {
        document.getElementById('demoSearch').innerHTML = '';
    }
});





function displayweathareOfFood() {
    var cartona = resultsOfFood.meals.map(meal => `
        <div class="col-lg-3 col-sm-12 col-md-3 rounded-3 px-0 overflow-hidden">
            <a href="./CategoriesAbout.html" class="text-black">
                <div class="inner w-100 position-relative overflow-hidden p-2">
                    <div class="w-100 d-flex justify-content-center">
                        <img src="${meal.strMealThumb}" alt="pic-food" class="img-style rounded-3 p-1">
                    </div>
                    <div class="layar w-100 h-100 text-bl flex-column d-flex justify-content-center align-items-center position-absolute">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            </a>
        </div>`).join('');
    document.getElementById('demoSearch').innerHTML = cartona;
}

function displayweathareOfFoodFirsLetter() {
    var cartona = resultsOfFood.meals.map(meal => `
        <div class="col-lg-3 col-sm-12 col-md-3 rounded-3 px-0 overflow-hidden">
            <a href="./CategoriesAbout.html" class="text-black">
                <div class="inner w-100 position-relative overflow-hidden p-2">
                    <div class="w-100 d-flex justify-content-center">
                        <img src="${meal.strMealThumb}" alt="pic-food" class="img-style rounded-3 p-1">
                    </div>
                    <div class="layar w-100 h-100 text-bl flex-column d-flex justify-content-center align-items-center position-absolute">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            </a>
        </div>`).join('');
    document.getElementById('demoSearch').innerHTML = cartona;
}



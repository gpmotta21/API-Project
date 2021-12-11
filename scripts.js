var foodContainer = document.querySelector('#food'),
video,
foodName,
img,
ingredients,
iContainer;

const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
const request = new XMLHttpRequest();

function randomFood(){
  request.open('get', url);
  request.send();
  
  request.onreadystatechange = function(){
    if(request.status === 200 && request.readyState === 4){
      const data = JSON.parse(request.responseText);
      createItem(data)
    } 
  }
}

function createItem(d){
  
  let name = d.meals[0].strMeal;
  let meal = d.meals[0].strMealThumb;
  video = d.meals[0].strYoutube.split('=')[1];

  let html =  `
  <div id="foodName">${name}</div>
  <div id="img">
    <button type="button" class="imgBtn" onclick="randomFood()"><i class="fas fa-random"></i></button>
    <button type="button" class="imgBtn" onclick="showVideo()"><i class="fab fa-youtube"></i></button>
  </div>
  <ul id="ingredients"></ul>
  <div id="iContainer"></div>
  `
  foodContainer.innerHTML = html
  
  foodName = document.querySelector('#foodName');
  img = document.querySelector('#img');
  ingredients = document.querySelector('#ingredients');
  iContainer = document.querySelector('#iContainer');
  
  var totalIngredients = [];
  
  // Select all ingredients and send them to a variable
  for(var i = 1; i <= 20; i++){    
    totalIngredients.push(d.meals[0]['strIngredient' + i]);
  }
  
  const result = totalIngredients.filter(e => e);

  // This segment will create a list of ingredients
  result.forEach(ingredient => {
    var list = document.createElement('li');
    list.innerHTML = `

      ${ingredient}

    `
    ingredients.appendChild(list)
  })
  img.setAttribute("style", "background-image: url(" + meal );
}

function removeLastChild(){
  while(ingredients.firstChild){
    ingredients.removeChild(ingredients.lastChild)
  }
}

// Once the button in the image is clicked, this function will generate an iframe 
function showVideo(){

  var blur = document.querySelectorAll('#food > :not(#iContainer)');

  for(var i = 0; i < blur.length; i++ ){
    blur[i].style.filter = 'blur(4px)'
  }

  let iFrame = `
  <iframe id="iF" width="1034" height="591" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
  </iframe>
  <button type="button" id="iBtn">Close video</button>
  `
  iContainer.innerHTML = iFrame
  
  // Removes the iFrame
  document.querySelector('#iBtn').addEventListener('click', () => {
    iContainer.style.display = 'none'
    iContainer.innerHTML = ''

    for(var i = 0; i < blur.length; i++ ){
      blur[i].style.filter = 'blur(0)'
    }
  })
  
  document.querySelector('#iF').addEventListener('load', () => {
    iContainer.style.display = 'block'
    document.querySelector('#iBtn').style.display = 'block'
  })
}

randomFood()

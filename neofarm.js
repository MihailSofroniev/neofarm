const ingredients = document.querySelector('.ingredients');
const cocktails = document.querySelector('.cocktails');
let ingredients_list = [];
let cocktails_list = [];
let ingredients_for_cocktail = [];
let cocktails_containing_ingredients = [];
let html = '';


const fetchData = async(path) => {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${path}`)
        const data = await res.json();
        //console.log(data);
        return data;
}

const createCheckbox = (label, value) =>
{
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id=value;
    input.value=label;
    const labelElement = document.createElement('label');
    labelElement.htmlFor = label;
    labelElement.appendChild(document.createTextNode(label));
    return [input,labelElement];
}

(async () => {
    const data = await fetchData('list.php?i=list')
    const doc = document.querySelector('.ingredients');
    data.drinks.forEach((e) => {
        const [input,label] = createCheckbox(e.strIngredient1,'ingredient_'+e.strIngredient1);
        doc.appendChild(input);
        doc.appendChild(label);
        doc.appendChild(document.createElement('br'));
    });
})();


(async () => {
    const data = await fetchData('filter.php?c=Cocktail')
    console.log(data);
    const doc = document.querySelector('.cocktails');
    data.drinks.forEach((e) => {
        const [input,label] = createCheckbox(e.strDrink,e.idDrink);
        doc.appendChild(input);
        doc.appendChild(label);
        doc.appendChild(document.createElement('br'));
    });
})();

ingredients.addEventListener('click', async(e) => {
    let element = e.target;

    if (element.checked) {
        // ingredients_list.push(element.value);
        const data = await fetchData(`filter.php?i=${element.value}`);
        ingredients_list[element.value] = data.drinks.map((e) => e.strDrink);
    }
     else {
        delete ingredients_list[element.value];
        if (Object.keys(ingredients_list).length === 0) {
        	document.getElementById('cocktails_you_can_make').innerHTML = "";
        	document.getElementById('cocktails_you_can_make').style.display = 'none';
        }
    }
    let ingredients = '';
    //console.log(!!ingredients_list)
    if(Object.keys(ingredients_list).length > 0)
    {
    	//find the intersection of an array of arrays
        ingredients = Object.values(ingredients_list).reduce((a, b) => a.filter(c => b.includes(c))).join(' ');
    }
    if(ingredients.length > 0) {
    	document.getElementById('cocktails_you_can_make').innerHTML = "<b> Cocktails you can make with the chosen ingredients: </b><br><p>"+ingredients+"</p>";
    	document.getElementById('cocktails_you_can_make').style.display = 'block';
    } else {
    	document.getElementById('cocktails_you_can_make').innerHTML = "";
    	document.getElementById('cocktails_you_can_make').style.display = 'none';
    }
    
});

cocktails.addEventListener('click', (e) => {
    let element = e.target;
    console.log(element.value);
    if (element.checked) {
    	cocktails_list.push(element.value);
    } else {
    	let index = cocktails_list.indexOf(element.value);
    	cocktails_list.splice(index, 1);
    }
    console.log('Cocktail list: ',cocktails_list);
    findCocktails();
});

function findCocktails() {
	if (cocktails_list.length === 0) {
		document.getElementById('ingredients_you_need').innerHTML = "";
		document.getElementById('ingredients_you_need').style.display = 'none';
		return;
	}

	cocktails_list.forEach(function(name) {
		var getJSON = function(url, callback) {
	    var xhr = new XMLHttpRequest();
		    xhr.open('GET', url, true);
		    xhr.responseType = 'json';
		    xhr.onload = function() {
		      	var status = xhr.status;
		      	if (status === 200) {
		        	callback(null, xhr.response);
		      	} else {
		        	callback(status, xhr.response);
		      	}
		    };
		    xhr.send();
		};

		getJSON('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+name, function(err, data) {
		  	if (err !== null) {
		    	alert('Something went wrong: ' + err);
		  	} else {
		   		//console.log(data);
		   		var temp = data["drinks"];
		   		var temp = temp[0];
		   		//console.log('Temp: ', temp);
		   		var i = 1;
		   		let strIngredient = 'strIngredient'+i;
		   		let strMeasure = 'strMeasure'+i;
		   		// i > 15 vu que un cocktail a 15 ingredients et mesures le while s'arrete a 15 (si tous les 15 sont remplis)
		   		while ((temp[strIngredient] != null && temp[strMeasure] != null) || i > 15) {
			   		if(!(ingredients_for_cocktail.includes(temp[strIngredient]))) {	
			   			ingredients_for_cocktail.push(temp[strIngredient]);
			   		}
		   			i++;
		   			strIngredient = 'strIngredient'+i;
		   			strMeasure = 'strMeasure'+i;
		   		}
		  	}
		  	//console.log(ingredients_for_cocktail);
		  	//console.log(quantity);
		  	html = ingredients_for_cocktail.join();
		  	document.getElementById('ingredients_you_need').innerHTML = "<b> Ingredients you need for the cocktails: </b><br><p>"+html+"</p>";
		  	document.getElementById('ingredients_you_need').style.display = 'block';
		});
	});
	ingredients_for_cocktail = [];
}

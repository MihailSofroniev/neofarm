<!DOCTYPE html>
<html>
<head>
	<title>Barman helper</title>
	<link rel="stylesheet" href="neofarm.css">
</head>
<body>
	<label for="ingredients"><b>Select the cocktails you want to buy ingredients for</b></label>
	<button type="button" class="submit_cocktails" onclick="findCocktails()">Find</button>
	<div class="cocktails item-list">
	</div>
	<div class="results" id = "ingredients_you_need">
	</div>
	<label for="ingredients"><b>Select the ingredients you want to use for your cocktail</b></label>
	<button type="button" class="submit_ingredients" onclick="findIngredients()">Find</button>
	<div class="ingredients item-list">
	</div>
	<div class="results" id="cocktails_you_can_make">
	</div>
</body>
    <script type="text/javascript" src="neofarm.js"></script>
</html>
function getWineByType(e){return $.ajax({url:"https://lcboapi.com/products",headers:{Authorization:"Token MDpjMGM4NDhlNC0zZmZkLTExZTctOTM3MS03MzI4N2RlODE4ZDY6NVhqNzNCMU5ya3hTWXN3UmF2Tk5wQlZhUGFqT3dhdU5SZjMx"},data:{per_page:100,q:e}})}function reloadButton(){$("#reloadButton").on("click",function(){console.log(reloadButton),location.reload()})}var wine={};wine.whiteWineData=[],wine.redWineData=[];var userInput="",whiteWineStyles=["Light & fruity","Off-dry & Fruity","Full-bodied & Rich","Soft & Off-dry","Aromatic & Flavourful"],redWineStyles=["Medium-bodied & Fruity","Full-bodied & Smooth","Light-bodied & Fruity","Full-bodied & Firm"];wine.key="MDpjMGM4NDhlNC0zZmZkLTExZTctOTM3MS03MzI4N2RlODE4ZDY6NVhqNzNCMU5ya3hTWXN3UmF2Tk5wQlZhUGFqT3dhdU5SZjMx",wine.init=function(){wine.getWine()},wine.getWine=function(){$.when(getWineByType("Red Wine"),getWineByType("White Wine")).then(function(e,t){var n={whiteWine:t[0].result,redWine:e[0].result};wine.listenForUserInput(n)})},wine.listenForUserInput=function(e){$("form").on("submit",function(t){t.preventDefault();var n=$("input[name=typeOfWine]:checked").val(),i=e[n],o=$('input[name="style"]:checked').val(),l=i.filter(function(e){return e.style===o});console.log(l),0===l.length?$("#wineResults").addClass("noResultsText").append("<p>Sorry, no results found.</p>"):($("#wineResults").removeClass("noResultsText"),wine.displayResults(l))})},wine.displayResults=function(e){for(var t=0;t<e.length;t++){var n=e[t],i=(e[t].style,$("<h2>").text(n.name)),o=$("<p>").addClass("styleOfWine").text(n.style),l=$("<img>").attr("src",n.image_thumb_url),a=$("<div>").addClass("wine wrapper").append(i,o,l);$(".wineResults").append(a)}},$(".submitButton").on("click",function(){$("html,body").animate({scrollTop:$(".wineResults").offset().top},"slow")}),$(document).ready(function(){wine.init(),reloadButton()});
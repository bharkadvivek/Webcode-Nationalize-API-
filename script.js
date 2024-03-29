let container = document.createElement("div");
container.setAttribute("class", "container");

let row = document.createElement("div");
row.setAttribute("class", "row");

let col = document.createElement("div");
col.setAttribute("class", "col-md-8");

//heading to show what is all about
var heading = document.createElement("h1");
heading.setAttribute("class", "h1");
heading.innerHTML = "Search for the nationality based on the name";

//formgroup div element to hold input field, button and all other divs
let formgroup = document.createElement("div");
formgroup.setAttribute("class", "form-group");

let input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("class", "form-control");
input.setAttribute("id", "searchval");
input.setAttribute("placeholder", "Enter a name");
input.style.width = "520px";

//message to show the user to enter correct input value
let tip = document.createElement("small");
tip.setAttribute("id", "inputhelp");
tip.classList.add("form-text", "text-muted");
tip.innerHTML = "*No symbols and numbers are allowed";

let button = document.createElement("button");
button.setAttribute("type", "button");
button.classList.add("btn", "btn-primary");
button.innerHTML = "Search";
button.style.marginLeft = "200px";
button.style.marginTop = "20px";
button.addEventListener("click", search);

//To display name
let s_name = document.createElement("div");
s_name.setAttribute("class", "display");
s_name.setAttribute("id", "name");
//to display countries
let country = document.createElement("div");
country.setAttribute("id", "country");
country.setAttribute("class", "display");
//to display probability
let probability = document.createElement("div");
probability.setAttribute("id", "probability");
probability.setAttribute("class", "display");

//appending all items one by one
formgroup.append(input, tip, button, s_name, country, probability);
col.append(heading, formgroup);
row.append(col);
container.append(row);
document.body.append(container);

//async function to made search
async function search() {
  //try block contains all the codes which has to be checked
  try {
    //search_value which is name is sent as the attribute to be append to url which is fetched and objects are converted
    //into array using json awaits are used to handle promises
    let search_value = document.getElementById("searchval").value;
    var result = await fetch(
      `https://api.nationalize.io/?name=${search_value}`
    );
    var res = await result.json();
    var len = res.country.length;

    //ifelse is used to check the whether the input is empty or it has any symbols,numbers or whitespaces
    if (res.name === "") {
      alert("Enter The Name ");
      s_name.innerHTML = "";
      country.innerHTML = "";
      probability.innerHTML = "";
    } else if (len === 0) {
      alert("Only letters allowed without spaces");
      s_name.innerHTML = "";
      country.innerHTML = "";
      probability.innerHTML = "";
    } else {
      //fetched results are printed using string literals in their apporpiate div sections
      s_name.innerHTML = `Searched Name : <mark>${res.name}</mark><br>`;
      country.innerHTML = `The Top two countries : ${res.country[0].country_id} and ${res.country[1].country_id}`;
      probability.innerHTML = `Probability ratio of two countries : ${res.country[0].probability} and ${res.country[1].probability}`;
    }

    //catch is to handle if error occurs
  } catch (error) {
    console.log(error);
  }
}
  

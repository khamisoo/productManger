// selectors
var mood = "creat style";
var tmp = null;
var price = $("#price")
var taxes = $("#taxes")
var ads = $("#ads")
var discount = $("#discount");
var submit = $("#submit");
var title = $("#title");
var total = $("#total");
var count = $("#count");
var category = $("#category");



// get Total
function getTotal() {
  if (price != "") {
    var result = (Number(price.val()) + Number(taxes.val()) + Number(ads.val())) - Number(discount.val());
    $("#total").html(result);
    $("#total").css("background", "#040");

  } else {
    $("#total").css("background", "#a00d02");
    $("#total").html(" ");
  }

}



// creat // save local storage
var dataPro = [];
if (localStorage.product != null) {

  dataPro = JSON.parse(localStorage.product);

} else {

  var dataPro = [];

}

submit.click(function() {
  var newPro = {
    title: title.val().toLowerCase(),
    price: price.val(),
    taxes: taxes.val(),
    ads: ads.val(),
    discount: discount.val(),
    total: total.html(),
    count: count.val(),
    category:category.val().toLowerCase(),

  }



  // creaat  // up date mood style

  if(title.val() && price.val() && category.val() != "" && newPro.count < 1001){
  if (mood === "creat style") {
    if (newPro.count > 1) {
      for (var k = 0; k < newPro.count; k++) {
        dataPro.push(newPro);
        $("#total").css("background", "#a00d02");

      }
    } else {
      dataPro.push(newPro);

    }
  } else {

    dataPro[tmp] = newPro;
    mood = "creat style";
    $("#submit").text("creat");
    count.css("display", "block");
    $("#total").css("background", "#a00d02");
  }
}else{
alert(" Firest Welcome in our site To take a great result you must type Title , Price , Category");
clearInputs();
$("#total").css("background", "#a00d02");


}


  localStorage.setItem('product', JSON.stringify(dataPro));
  var arr = JSON.parse(localStorage.getItem('product'));

  readData();
  clearInputs();

});



// clear inputs
function clearInputs() {
  price.val("");
  title.val("");
  taxes.val("");
  ads.val("");
  discount.val("");
  total.html("");
  count.val("");
  category.val("");

}



// read
function readData() {
  var table = "";
  for (var i = 0; i < dataPro.length; i++) {
    table += `
<tr>
<td>${i+1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td> <button onclick="updatSelectedItem(${i})"  id="upDatee">  Update  </button> </td>
<td> <button onclick="deletSelectedItem(${i})" id="delete">  Delete  </button> </td>
</tr>
`;
  }

  $("tbody").html(table);




  // deletAll
  var deleteAllBtn = $("#deletAll");
  if (dataPro.length > 0) {
    //deleteAllBtn.html("<button onclick='deletAll()'>Delet All dataPro.length</button>");
    deleteAllBtn.html(function() {
      var emphasis = "<button onclick='deletAll()'>" + "<b>Delet All</b>" + ' ' + '(' + dataPro.length + ')' + " </button>";
      return emphasis;
    });
  } else {
    deleteAllBtn.html("");
  }

}



readData();


// DELET
function deletSelectedItem(i) {

  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);


  readData();

}

function deletAll() {

  dataPro.splice(0);
  localStorage.clear();

  readData();

}



// update dataa
function updatSelectedItem(i) {
  var selectedItem = dataPro[i];
  title.val(dataPro[i].title);
  price.val(dataPro[i].price);
  taxes.val(dataPro[i].taxes);
  ads.val(dataPro[i].ads);
  discount.val(dataPro[i].discount);
  category.val(dataPro[i].category);
  count.css("display", "none");
  $("#submit").text("Up Date");
  getTotal();
  mood = "update style";
  tmp = i;

  scroll({

    top: 0,
    behavior: 'smooth',

  });


}



//search

// get the btn of search with doing annon var

var searchMood = "by title";

function getSearchMood(id) {
  var search = $("#search");

  if (id == "searchTitle") {
    searchMood = "by title";
    search.attr("placeholder", "search by title");
  } else {
    searchMood = "by Category"
    search.attr("placeholder", "search by Category");

  }

  search.focus();
  search.val("");
  readData();


}



function searchData(value) {
  var table = "";

  for (var i = 0; i < dataPro.length; i++) {
    if (searchMood == "by title" && dataPro[i].title.includes(value.toLowerCase())) {
      table += `
<tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td> <button onclick="updatSelectedItem(${i})"  id="upDatee">  Update  </button> </td>
<td> <button onclick="deletSelectedItem(${i})" id="delete">  Delete  </button> </td>
</tr>
`;
    } else {
      if (searchMood == "by Category" && dataPro[i].category.includes(value.toLowerCase())) {

        table += `
<tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td> <button onclick="updatSelectedItem(${i})"  id="upDatee">  Update  </button> </td>
<td> <button onclick="deletSelectedItem(${i})" id="delete">  Delete  </button> </td>
</tr>
`;


      }
    }
  }


/*console.log(searchMood);
console.log(i);
console.log(value);*/
  $("tbody").html(table);

}

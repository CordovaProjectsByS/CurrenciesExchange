var person = {
    name: "Janusz",
    surname: "Biznes",
    city: "New York",
    age: 18,
    display: function() {
        return this.name + ", " + this.surname + ", " + this.city + ", " + this.age;
    }
};

var dyskD = {
    pliki : ["plik1", "plik2", "plik3"],
    katalogi : [
        katalog1 = {
            pliki : ["plik3", "plik4", "plik5"],
            katalogi : {
                katalog3 : {
                    pliki : ["plikx", "pliky"]
                }
            }
        },
        katalog2 = {
            pliki : ["plik8", "plik9"]
        }
    ]
};


var TargeType = {
    FOLDER : 0,
    FILE : 1
};

var personTestButton = document.getElementById("object_test_button");
var personResult = document.getElementById("object_result");

var expRecButton = document.getElementById("recuration_rec_button");
var expItButton = document.getElementById("recuration_it_button"); 

var baseVal = document.getElementById("base_value");
var exponentVal = document.getElementById("exponent_value");
var expResult = document.getElementById("expResult");

var polimeterPolygonButton = document.getElementById("perimeterPolygonButton"); 
var firstSide = document.getElementById("first_side");
var secondSide = document.getElementById("second_side");
var thirdSide = document.getElementById("third_side");
var resultPerimeter = document.getElementById("perimeterResult");


var divisibilityButton = document.getElementById("divisibilityButton"); 
var a = document.getElementById("a_val");
var b = document.getElementById("b_val");
var divisibilityResult = document.getElementById("divisibilityResult");


var searchButton = document.getElementById("searchButton"); 
var serchedName = document.getElementById("searched_name");
var driveView = document.getElementById("object_drive_view");
var findingResult = document.getElementById("findingResult");


personTestButton.addEventListener("click", function () {
    personResult.innerHTML = person.display();
});

expRecButton.addEventListener("click", function() {
    let result = expRec(baseVal.value, exponentVal.value);
    expResult.innerHTML = "Rekurencyjnie: "  + result;
});

expItButton.addEventListener("click", function() {
    let result = expIt(baseVal.value, exponentVal.value);
    expResult.innerHTML = "Iteracyjnie: "  + result;
});

polimeterPolygonButton.addEventListener("click", function() {
    let result = perimeterPolygon(firstSide.value, secondSide.value, thirdSide.value);
    resultPerimeter.innerHTML = result;
}); 

divisibilityButton.addEventListener("click", function() {
    let result = divisibility(a.value, b.value);
    divisibilityResult.innerHTML = result;
}); 

driveView.innerHTML = JSON.stringify(dyskD, undefined, 5);
searchButton.addEventListener("click", function() {
    find(dyskD, serchedName.value);
    
    let result = "";
    if (isFound) {
        result = "Podany plik/katalog znajduje się w przestrzeni.";
    }
    else {
        result = "Brak elementów";
    }
    
    findingResult.innerHTML = result;
});

function expRec(base, exponent) {
    if (exponent == 0) {
        return 1;
    }
    else {
        return base * expRec(base, --exponent);
    }
}

function expIt(base, exponent) {
    if (exponent == 0) {
        return 1;
    }
    let result = 1;
    
    for (let i = 1; i <= exponent; i++) {
        result *= base;
    }
    
    return result;
}

function perimeterPolygon() {
    let result = 0;
    
    for (let x of arguments) {
        result += (+x);
    }
    
    return result;
}

function divisibility(a, b) {
    
    function check() {
        if (a % b == 0) return 'a jest podzielne przez b';
        else return 'a nie jest podzielnie przez b';
        
    }
    
    return check();
    
}

var isFound = false;

function find(root,name) {
    
    for (var element in root) {
        
        alert(element);
        
        if ((typeof root[element] === 'object') || Array.isArray(root[element])) {
            if (element == name) {
                isFound = true;
                return;
            }
            
            alert("Szukam głębiej");
            find(root[element], name);
        }
        
        else if (root[element] == name) {  
            alert("Odnaleziono");
            isFound = true;
        }
    }
}
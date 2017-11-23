var currencies = [
    { 'name': 'Polski złoty', 'code': "PLN", "image":"img/pln.jpg"},
    { 'name': 'EURO', 'code': "EUR", "image":"img/euro.jpg"},
    { 'name': 'Frank Szwajcarski', 'code': "CHF", "image":"img/chf.jpg"},
    { 'name': 'Korona Czeska', 'code': "CZK", "image":"img/czk.jpg"},
    { 'name': 'Rubel Rosyjski', 'code': "RUB", "image":"img/rub.jpg"},
    { 'name': 'Hryvna Ukraińska', 'code': "UAH", "image":"img/uah.jpg"},
    { 'name': 'Funt Brytyjski', 'code': "GBP", "image":"img/gbp.png"},
    { 'name': 'Korony Norweskie', 'code': "NOK", "image":"img/nok.jpg"},
    { 'name': 'Filipińskie Pesso', 'code': "PHP", "image":"img/php.jpg"},
    { 'name': 'Dolar Amerykański', 'code': "USD", "image":"img/usd.jpg"}
];

var sourceCurrencyList = document.getElementById("source-currency");
var targetCurrencyList = document.getElementById("target-currency");
var moneyValue = document.getElementById("money-value");
var result = document.getElementById("result");
var button = document.getElementById("button");
var form = document.getElementById("form");
var imgCurrentCurrency = document.getElementById("img-current-currency");
var imgTargetCurrency = document.getElementById("img-target-currency");


form.onsubmit = function(event) {
    event.preventDefault();
}

for (var x in currencies) {
    var opt = document.createElement("option");
    opt.value = x;
    opt.textContent = currencies[x].name + " (" + currencies[x].code + ")";
    sourceCurrencyList.appendChild(opt);
}

for (x = currencies.length - 1; x >= 0; x--) {
    var opt = document.createElement("option");
    opt.value = x;
    opt.textContent = currencies[x].name + " (" + currencies[x].code + ")";
    targetCurrencyList.appendChild(opt);
}

sourceCurrencyList.addEventListener('change', function() {
    let index = sourceCurrencyList.value;
    let srcImg = currencies[index].image;
    imgCurrentCurrency.src = srcImg;
});

targetCurrencyList.addEventListener('change', function() {
    let index = targetCurrencyList.value;
    let srcImg = currencies[index].image;
    imgTargetCurrency.src = srcImg;
});


button.onclick = function() {

    let indexSource = sourceCurrencyList.value;
    let indexTarget = targetCurrencyList.value;
    let check = validate(indexSource, indexTarget);

    if (check != 'OK') {
        result.innerHTML = check;
    }
    else {
        let rate = sendReqForRate(indexSource, indexTarget);
        let kwota = moneyValue.value;
        let output = kwota + " " + currencies[indexSource].code + " wynosi " + (kwota * rate).toFixed(2) + " " + currencies[indexTarget].code + ".";
        result.innerHTML = output;
    }
    
}

function validate(indexSource, indexTarget) {
    
    if (indexSource == indexTarget) {
        return "Waluty powinny się różnić";
    }
    
    var kwota = moneyValue.value;
    kwota = kwota.replace(/\s+/g, '');
    if (isNaN(kwota) || kwota == "") {
        return "Wartość kwoty jest błędna";
    }

    return 'OK';
}

function sendReqForRate(indexS, indexT) {
    let base = currencies[indexS].code;
    let target = currencies[indexT].code;

    let url = "https://api.fixer.io/latest?base=" + base +"&symbols=" + target;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    let response =JSON.parse(xmlHttp.responseText);

    return response.rates[target];
} 




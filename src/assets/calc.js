let currency = document.querySelector('.active_cur').innerText;
let payment = document.querySelector('.active_paym').innerText;
let minSum = document.querySelector('.calc__sum_min');
let maxSum = document.querySelector('.calc__sum_max');
let sumRangeInput = document.querySelector('.calc__range_sum');
let termRangeInput = document.querySelector('.calc__range_time');
let percent = 12;
let sumRangeLabel = document.querySelector('.calc__sum_value');
let sumMonthlyTotal = document.querySelector('.total__sum_monthly');
let sumAnnualyTotal = document.querySelector('.total__sum_annualy');
let resultCur = document.querySelector('.calc__result_1');
let resultSum = document.querySelector('.calc__result_2');
let resultTerm = document.querySelector('.calc__result_3');
let resultPayment = document.querySelector('.calc__result_4');
let resultRate = document.querySelector('.calc__result_5');
let resultAnnualy = document.querySelector('.calc__result_6');
let resultMonthly = document.querySelector('.calc__result_7');

$(".currency").bind('click', function(){
	$('.active_cur').removeClass('active active_cur');
	$(this).addClass('active active_cur');
	currency = document.querySelector('.active_cur').innerText;
	
	procentChange();
	incomeCalc();
});

$(".payment-choice__choice").bind('click', function(){
	$('.active_paym').removeClass('active active_paym');
	$(this).addClass('active active_paym');
	payment = document.querySelector('.active_paym').innerText;
	
	procentChange();
	incomeCalc();
});

function fSumRangeChange() {
  let nLabelWidth = parseFloat(window.getComputedStyle(sumRangeLabel).width);
  sumRangeLabel.style.left = parseInt(sumRangeInput.value / sumRangeInput.max * 100 - 10) + '%';
	
  procentChange();
  incomeCalc();
}

function fTermRangeChange() {
  let oRangeInput = document.querySelector('.calc__range_time');
  let oRangeLabel = document.querySelector('.calc__term_value');
  oRangeLabel.innerText = termRangeInput.value + 'мес';
  let nLabelWidth = parseFloat(window.getComputedStyle(oRangeLabel).width);
  oRangeLabel.style.left = parseInt(termRangeInput.value / termRangeInput.max * 100 - 12) + '%';
  
  procentChange();
  incomeCalc();
}

function procentChange(){
  if (currency === "USD" && currency !== null && currency !== undefined) {
	  
	sumRangeLabel.innerText = '$' + sumRangeInput.value;
	sumRangeInput.min = 1000;
	sumRangeInput.max = 100000;
	minSum.innerText = '$' + sumRangeInput.min;
	maxSum.innerText = '$' + sumRangeInput.max;
	  
    if (payment === "ежемесячно" && payment !== null && payment !== undefined) {
      if (parseInt(termRangeInput.value) < 6) {
        document.querySelector('.rate__percent').innerText = "12%";
      } else if (parseInt(termRangeInput.value) > 5 && parseInt(termRangeInput.value) < 12) {
        document.querySelector('.rate__percent').innerText = "16%";
      } else if (parseInt(termRangeInput.value) > 11 && parseInt(termRangeInput.value) < 24) {
        document.querySelector('.rate__percent').innerText = "18%";
      } else if (parseInt(termRangeInput.value) > 23 && parseInt(termRangeInput.value) < 36) {
        document.querySelector('.rate__percent').innerText = "19%";
      } else {
        document.querySelector('.rate__percent').innerText = "20%";
      }
    } else if (payment === "в конце срока" && payment !== null && payment !== undefined) {
      if (parseInt(termRangeInput.value) < 6) {
        document.querySelector('.rate__percent').innerText = "13%";
      } else if (parseInt(termRangeInput.value) > 5 && parseInt(termRangeInput.value) < 12) {
        document.querySelector('.rate__percent').innerText = "17%";
      } else if (parseInt(termRangeInput.value) > 11 && parseInt(termRangeInput.value) < 24) {
        document.querySelector('.rate__percent').innerText = "20%";
      } else if (parseInt(termRangeInput.value) > 23 && parseInt(termRangeInput.value) < 36) {
        document.querySelector('.rate__percent').innerText = "21%";
      } else {
        document.querySelector('.rate__percent').innerText = "22%";
      }
    }
  } else if (currency === "UAH" && currency !== null && currency !== undefined) {
	  
	sumRangeLabel.innerText = sumRangeInput.value + 'грн';
	sumRangeInput.min = 10000;
	sumRangeInput.max = 200000;
	minSum.innerText = sumRangeInput.min + 'грн';
	maxSum.innerText = sumRangeInput.max + 'грн';
	  
    if (payment === "ежемесячно" && payment !== null && payment !== undefined) {
      if (parseInt(termRangeInput.value) < 6) {
        document.querySelector('.rate__percent').innerText = "21%";
      } else if (parseInt(termRangeInput.value) > 5 && parseInt(termRangeInput.value) < 12) {
        document.querySelector('.rate__percent').innerText = "23%";
      } else if (parseInt(termRangeInput.value) > 11 && parseInt(termRangeInput.value) < 24) {
        document.querySelector('.rate__percent').innerText = "25%";
      } else if (parseInt(termRangeInput.value) > 23 && parseInt(termRangeInput.value) < 36) {
        document.querySelector('.rate__percent').innerText = "28%";
      } else {
        document.querySelector('.rate__percent').innerText = "31%";
      }
    } else if (payment === "в конце срока" && payment !== null && payment !== undefined) {
      if (parseInt(termRangeInput.value) < 6) {
        document.querySelector('.rate__percent').innerText = "22%";
      } else if (parseInt(termRangeInput.value) > 5 && parseInt(termRangeInput.value) < 12) {
        document.querySelector('.rate__percent').innerText = "24%";
      } else if (parseInt(termRangeInput.value) > 11 && parseInt(termRangeInput.value) < 24) {
        document.querySelector('.rate__percent').innerText = "27%";
      } else if (parseInt(termRangeInput.value) > 23 && parseInt(termRangeInput.value) < 36) {
        document.querySelector('.rate__percent').innerText = "30%";
      } else {
        document.querySelector('.rate__percent').innerText = "33%";
      }
    }
  }
}
procentChange();

function incomeCalc(){
	let incomePercent = (parseInt(document.querySelector('.rate__percent').innerText))/100;
	let depoValue = parseInt(sumRangeInput.value);
	let totalMonthly;
	let totalAnnualy;
	if (currency === "USD" && currency !== null && currency !== undefined){
		if(payment === "ежемесячно" && payment !== null && payment !== undefined){
			totalMonthly = Math.ceil(depoValue * (incomePercent/12));
			
			sumMonthlyTotal.innerText =  '$' + totalMonthly;
			
			totalAnnualy = Math.ceil(depoValue * incomePercent);
			
			sumAnnualyTotal.innerText =  '$' + totalAnnualy;
			
		} else if(payment === "в конце срока" && payment !== null && payment !== undefined){
			
			totalMonthly = Math.ceil((depoValue * (Math.pow((1 + incomePercent/12), 12)) - depoValue)/12);
			
			sumMonthlyTotal.innerText = '$' + totalMonthly;
			
			totalAnnualy = Math.ceil(depoValue * (Math.pow((1 + incomePercent/12), 12)) - depoValue);
			
			sumAnnualyTotal.innerText = '$' + totalAnnualy;
		}
		
	} else if(currency === "UAH" && currency !== null && currency !== undefined){
		if(payment === "ежемесячно" && payment !== null && payment !== undefined){
			totalMonthly = Math.ceil(depoValue * (incomePercent/12));
			
			sumMonthlyTotal.innerText = totalMonthly + 'грн';
			
			totalAnnualy = Math.ceil(depoValue * incomePercent);
			
			sumAnnualyTotal.innerText = totalAnnualy + 'грн';
			
		} else if(payment === "в конце срока" && payment !== null && payment !== undefined){
			totalMonthly = Math.ceil((depoValue * (Math.pow((1 + incomePercent/12), 12)) - depoValue)/12);
			
			sumMonthlyTotal.innerText = totalMonthly + 'грн';
			
			totalAnnualy = Math.ceil(depoValue * (Math.pow((1 + incomePercent/12), 12)) - depoValue);
			
			sumAnnualyTotal.innerText = totalAnnualy + 'грн';
		}
		
	}	
	
}
function resultCalc(){
	resultCur.innerText = currency;
	resultTerm.innerText = termRangeInput.value + 'мес';
	resultPayment.innerText = payment;
	if (currency === "USD" && currency !== null && currency !== undefined){
		resultSum.innerText = '$' + sumRangeInput.value;
		resultRate.innerText = document.querySelector('.rate__percent').innerText;
		resultAnnualy.innerText = '$' + document.querySelector('.total__sum_annualy');
		resultMonthly.innerText= '$' + document.querySelector('.total__sum_monthly');
	} else if(currency === "UAH" && currency !== null && currency !== undefined){
		resultSum.innerText = sumRangeInput.value + 'грн';
		resultRate.innerText = document.querySelector('.rate__percent').innerText;
		resultAnnualy.innerText = document.querySelector('.total__sum_annualy') + 'грн';
		resultMonthly.innerText= document.querySelector('.total__sum_monthly') + 'грн';
	}
}
incomeCalc();
resultCalc();
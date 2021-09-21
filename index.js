import { convert, definitions } from '@favware/converter';

/**
 * Unit metrics that the system can handle
 */
const MESSURE_UNITS = {

    "mm":{
        type:"longitude",
        description:"Milimetros",
        unitValue:1000,
        baseReference:1,
        parent:"cm"
    },

    "cm":{
        type:"longitude",
        description:"Centimetros",
        unitValue:100,
        baseReference:1,
        parent:"dm"
    },

    "dm":{
        type:"longitude",
        description:"Decimetro",
        unitValue:10,
        baseReference:1
    },

    "km":{
        type:"longitude",
        description:"Kilometros",
        baseConvertion:1,
        baseReference:100
    },

    "l":{
        type:"capacity",
        description:"Litros"
    },
    "gr":{
        "type":"mass",
        "description":"Gramos"
    },

    "in":{
        "type":"longitude",
        "description":"Pulgadas"
    }
}

const inputMetric = document.getElementById('inputMetric');
const outputMetric = document.getElementById('outputMetric');
let inMetricValue = "cm";
let outMetricValue = "cm";
const input = +(document.getElementById('input').value);
const outputDom = document.getElementById('output');

const errorDom = document.getElementById('error');

////////////////////////////////////////////////////////////////////////////////////

/**
 * Create the options for the combo of the metric conversions
 */
function createComboOptions(){

    const options = Object.keys(MESSURE_UNITS);
    const sortedOptions = options.sort();

    let createdHtml = ``;

    sortedOptions.forEach((metricUnit,i)=>{
        createdHtml += `<option value="${sortedOptions[i]}">${MESSURE_UNITS[sortedOptions[i]]['description']}</option>`;
    });

    inputMetric.innerHTML = createdHtml;
    outputMetric.innerHTML = createdHtml;
}

function makeConvertion(){
    if(!isValidInput()) return;
    if(!isValidUnit()) return;
    
    const input = +(document.getElementById('input').value);

    const convertion = (convert(input,inMetricValue,outMetricValue));
    outputDom.value = convertion;
}

/**
 * Validate the unit conversion are on the same system
 * 
 * @returns {boolean} True if the units are in the same metric system
 */
function isValidUnit(){
    if(MESSURE_UNITS[inMetricValue]['type']!==MESSURE_UNITS[outMetricValue]['type']){
        displayError('Conversion invalida');
        return false;
    }

    hideError();
    return true;
}

/**
 * Display an error if the convertion went wrong
 * 
 * @param {string} text - Message to show on the error
 */
function displayError(text){
    errorDom.innerText = text;
}

/**
 * Hide errors
 */
function hideError(){
    errorDom.innerText = '';
}

/**
 * Validate the input is a valid value for the conversion
 * 
 * @returns {boolean} True if the input is a valid value
 */
function isValidInput(){

    const input = +(document.getElementById('input').value);

    if(isNaN(input)){
        displayError('Ingresa un valor valido en el input');
        return false;
    }

    if(input===0){
        displayError('Ingresa una cantidad');
        return false;
    }

    if(input<0){
        displayError('No puedes convertir numeros negativos');
        return false;
    }

    hideError();
    return true;
}

/**
 * Convert the metric units
 */
document.getElementById('convert').addEventListener('click',()=>makeConvertion());

/**
 * Get the metric unit values
 */
inputMetric.addEventListener('click',(e)=>inMetricValue = e.target.value);
outputMetric.addEventListener('click',e=>outMetricValue = e.target.value);

createComboOptions();

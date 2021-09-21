import { convert, definitions } from '@favware/converter';

/**
 * Unit metrics that the system can handle
 */
const MESSURE_UNITS = {

    "mm":{
        type:"longitude",
        description:"Milimetros (Longitud)"
    },

    "cm":{
        type:"longitude",
        description:"Centimetros (Longitud)"
    },

    "dm":{
        type:"longitude",
        description:"Decimetro (Longitud)"
    },

    "km":{
        type:"longitude",
        description:"Kilometros (Longitud)"
    },

    "gr":{
        "type":"mass",
        "description":"Gramos (Masa)"
    },

    "in":{
        "type":"longitude",
        "description":"Pulgadas (Longitud)"
    },
    "cm2":{
        "type":"area",
        "description":"Centimetro cuadrado - cm2 (Area)"
    },

    "mm2":{
        "type":"area",
        "description":"Milimetro cuadrado - mm2 (Area)"
    },

    "m2":{
        "type":"area",
        "description":"Metro cuadrado - m2 (Area)"
    },

    "km2":{
        "type":"area",
        "description":"Kilometro cuadrado - km2 (Area)"
    },

    "in2":{
        "type":"area",
        "description":"Pulgada cuadrada - in2 (Area)"
    },

    "mi2":{
        "type":"area",
        "description":"Milla cuadrada - mi2 (Area)"
    },

    "n":{
        "type":"force",
        "description":"Newton (Fuerza)"
    },

    "kn":{
        "type":"force",
        "description":"KiloNewton (Fuerza)"
    },

    "lbf":{
        "type":"libra",
        "description": "Libra (Fuerza)"
    },

    "w":{
        "type":"energy",
        "description":"Watts (Energia)"
    },

    "kw":{
        "type":"energy",
        "description":"KiloWatts (Energia)"
    },

    "gw":{
        "type":"energy",
        "description":"GigaWatts (Energia)"
    },

    "c":{
        "type":"temperature",
        "description":"Celsius (Temperatura)"
    },

    "k":{
        "type":"temperature",
        "description":"Kelvin (Temperatura)"
    },

    "f":{
        "type":"temperature",
        "description":"Farenheit (Temperatura)"
    },

    "r":{
        "type":"temperature",
        "description":"Rankine (Temperatura)"
    },

    "mm3":{
        "type":"volume",
        "description":"Milimetros cubicos - mm3 (Volumen)"
    },

    "cm3":{
        "type":"volume",
        "description":"Centimetros cubicos - cm3 (Volumen)"
    },

    "m3":{
        "type":"volume",
        "description":"Metros cubicos - m3 (Volumen)"
    },

    "km3":{
        "type":"volume",
        "description":"Kilometros cubicos - km3 (Volumen)"
    },

    "in3":{
        "type":"volume",
        "description":"Pulgadas cubicas - in3 (Volumen)"
    },

    "ft3":{
        "type":"volume",
        "description":"Pies cubicos - ft3 (Volumen)"
    }

}

const inputMetric = document.getElementById('inputMetric');
const outputMetric = document.getElementById('outputMetric');
let inMetricValue = "cm";
let outMetricValue = "cm";
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
        displayError(`
        
        No puedes convertir ${inMetricValue} a ${outMetricValue}

        `);
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
inputMetric.addEventListener('click',(e)=> inMetricValue = e.target.value);
outputMetric.addEventListener('click',e=> outMetricValue = e.target.value);

createComboOptions();

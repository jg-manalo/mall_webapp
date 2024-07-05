let temperatureUnit = 'F';
let isFlagged = false;
const submittion = document.getElementById('mall_form');

function changeTemperatureUnit(){
    temperatureUnit = (temperatureUnit === 'F')? 'C' : 'F';
    validateTemperature();
}


function validateTemperature(){
    const TEMPERATURE = document.getElementById("tbx_temperature")
    const TEMPERATURE_VALUE = TEMPERATURE.value;
    const ICON = document.getElementById("icon_signage");
    const ICON_HEIGHT = 128;
    
    if(TEMPERATURE_VALUE == ""){
        return;
    }
    
    const {LOWER_BOUND, UPPER_BOUND} = getHealthyRange(temperatureUnit);
    let isHealthy =  (LOWER_BOUND <= TEMPERATURE_VALUE) && (TEMPERATURE_VALUE <= UPPER_BOUND);

    if(!isHealthy){
        isFlagged = true;
        ICON.style.backgroundPosition = `128px ${ICON_HEIGHT}`;   
    }
    else{
        isFlagged = false;
        ICON.style.backgroundPosition = `256px ${ICON_HEIGHT}`;
    }   
}

$("#mall_form").submit(function(event){
    event.preventDefault();
    var firstName = $("#tbx_first_name").val();
    var lastName = $("#tbx_last_name").val();
    var temperature = $("#tbx_temperature").val();
    var unit = temperatureUnit;
    var flagStatus = isFlagged;

    const ICON = document.getElementById("icon_signage");
    const FORMS = document.getElementById("mall_form");

    $.ajax({    
        url: '/',
        type: 'POST',
        data: { 'first_name' : firstName,
             'last_name' : lastName, 
            'temperature' : temperature, 
            'temperatureUnit' : unit,
            'flag_status' : flagStatus
        },
    
        error: function(error){
            console.log(error)
        }    
    })
    FORMS.reset();
    ICON.style.backgroundPosition = '256px 128px';
    temperatureUnit = 'F';
});

function getHealthyRange(unit){
    const LOWER_BOUND = (unit === 'C')? 36.1 : 97;
    const UPPER_BOUND = (unit === 'C')? 37.2 : 99;
    
    return {LOWER_BOUND, UPPER_BOUND};
}
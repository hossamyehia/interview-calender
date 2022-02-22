
let colors = {
    "0":"#ffffff",
    "1":"#e2f3f5",
    "2":"#82E2F2",
    "3":"#22D1EE",
    "4":"#3096F0",
    "5":"#3778F1",
    "6":"#3D5AF1",
    "7":"#263896",
    "8":"#0E153A"
  }

/**
 * Handles Selection Process
 */
const handleSelection = () => {
    
    let form = document.querySelector("form");
    let days = form.querySelector(".days").querySelectorAll("input[type=radio]");
    let hourSessions = form.querySelectorAll(".hours");

    let dayOneHours = hourSessions[0].querySelectorAll("input[type=radio]");
    let dayTwoHours = hourSessions[1].querySelectorAll("input[type=radio]");

    let button = form.querySelector('input[type=submit]');

    let prevDay = null;
    let prevHour = null;
    let Day = null;
    let Hour = null;
    let data = null;

    button.disabled = true;

    window.addEventListener('load',function(){

        let jsonTag = document.getElementById("data");
        data = JSON.parse(jsonTag.text);

        jsonTag.remove();

        days.forEach((day , index) => {
            day.addEventListener('change',daySelect)
        })
        dayOneHours.forEach((hour , index) => {
            hour.addEventListener("change",hourSelect)
        })
    
        dayTwoHours.forEach((hour , index) => {
            hour.addEventListener("change",hourSelect)
        })
    });

    
    /**
     * Handles Change Event for Days
     * @param {object} event 
     */
    const daySelect = (event)=>{
        prevDay = prevDay ? prevDay : event.target;
        let target = event.target;
        let parent = target.parentNode;
        if (target !== prevDay) {

            prevDay.parentNode.classList.toggle("daySelect");
            prevDay = target;

            parent.classList.toggle("daySelect");

            Day = target.value;

        }else{
            prevDay.parentNode.classList.toggle("daySelect");
            Day = prevDay.value;
        }
        toggleHours(Day);
        activeButton();

    }
    
    
    /**
     * Handles Change Event for Hours
     * @param {object} event 
     */
    const hourSelect = (event)=>{
        prevHour = prevHour ? prevHour : event.target;
        let target = event.target;
        let parent = target.parentNode;

        let oldClass = data[Day][target.value.toString()][0]; 
        let newClass = data[Day][target.value.toString()][1]; 

        if(parent.classList.contains(oldClass))
            parent.classList.toggle(oldClass);

        if(!parent.classList.contains(oldClass))
            parent.classList.toggle(newClass);

        if (target !== prevHour) {

            let oldClass = data[prevDay.value][prevHour.value.toString()][0];
            let newClass = data[prevDay.value][prevHour.value.toString()][1];
            if(!parent.classList.contains(oldClass))
                prevHour.parentNode.classList.toggle(oldClass);

            if(parent.classList.contains(newClass))
                prevHour.parentNode.classList.toggle(newClass);
            
            prevHour = target;

            Hour = target.value;

        }else{
            let oldClass = data[prevDay.value][prevHour.value.toString()][0];
            prevHour.parentNode.classList.toggle(oldClass);
            Hour = prevHour.value;
        }

        activeButton();
    }

    const toggleHours = (value) => {
        if(hourSessions[0].dataset.day === value){
            if(!hourSessions[0].classList.contains("selected")){
                hourSessions[0].classList.toggle("selected");
            };
            if(hourSessions[1].classList.contains("selected")){
                hourSessions[1].classList.toggle("selected");
            };
        }else{
            if(!hourSessions[1].classList.contains("selected")){
                hourSessions[1].classList.toggle("selected");
            };
            if(hourSessions[0].classList.contains("selected")){
                hourSessions[0].classList.toggle("selected");
            };
        }
        hourSessions[2].classList.remove("selected");
    }

    /**
     * Active Next Button When the user finish selection
     */
    const activeButton = () => {
        if(Day != null && Hour != null){
            button.disabled = false;
        }else{
            button.disabled = true;
        }   
    }
    
}

handleSelection();
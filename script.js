let personalInfo_name_label = document.querySelector('#personal-name-label');
let personalInfo_title_label = document.querySelector('#personal-title-label');
let personalInfo_phone_label = document.querySelector('#personal-phone-label');
let personalInfo_email_label = document.querySelector('#personal-email-label');
let personalInfo_country_label = document.querySelector('#personal-country-label');

let personalInfo_name = document.querySelector('#personal-name');
let personalInfo_title = document.querySelector('#personal-title');
let personalInfo_phone = document.querySelector('#personal-phone');
let personalInfo_email = document.querySelector('#personal-email');
let personalInfo_country = document.querySelector('#personal-country');

let profesionalSummary = document.querySelector('.main-cv-profesional-summary');
let profesionalTechs = document.querySelector('.main-cv-profesional-techs')

let workHistoryContainer = document.querySelector('.main-cv-workhistory--container');

let selected_language = 'es';

let personalInfo;
let profesionalProfile;



let dictoLanguage = {};
let listWorkExperience = [];

document.addEventListener('DOMContentLoaded', setData);

async function setData() {

    await loadJSON();
    dictoLanguage = await loadLanguage();
    setPersonalInfoData();
    setProfesionalData();
    setWorkExperience();
}


function setPersonalInfoData(){

    let phonestr = dictoLanguage["phone"];
/*
    personalInfo_name_label.textContent = dictoLanguage["name"];
    personalInfo_phone_label.textContent =  dictoLanguage["phone"];
    personalInfo_email_label.textContent = dictoLanguage["email"];
    personalInfo_title_label.textContent = dictoLanguage["title"];
    personalInfo_country_label.textContent = dictoLanguage["country"];

  */  
    personalInfo_name.textContent = personalInfo.name;
    personalInfo_phone.textContent =  personalInfo.phone;
    personalInfo_email.textContent = personalInfo.email;
    personalInfo_title.textContent = personalInfo.title;
    personalInfo_country.textContent = personalInfo.ResidenceCountry;
  
}

function setProfesionalData(){
    profesionalSummary.textContent = profesionalProfile.summary;

    profesionalProfile.techs.forEach(tech => {
        const li = document.createElement('li');
        li.classList.add('main-cv-profesional-techs-li');
        li.textContent = tech;
        profesionalTechs.appendChild(li);

    });

}

function setWorkExperience(){
    listWorkExperience.forEach(workExperience => {
        const workExpCard = setWorkExperienceCard(workExperience);
        workHistoryContainer.appendChild(workExpCard);
    });
}


async function loadJSON() {
    let fileName = '';

    switch(selected_language){
        case 'es': fileName = './information/info_spanish.json'; break;
    }
    

    await fetch(fileName) 
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error al cargar archivo de información');
            }
            let data = response.json();
            
            return data;
        })
        .then(data => {

            console.log(data);

            if (data.hasOwnProperty('personalInfo')) {
                personalInfo = new PersonalInfo(data.personalInfo);
            }
            if (data.hasOwnProperty('profesionalProfile')) {
                profesionalProfile = new ProfesionalProfile(data.profesionalProfile);
            }
            if (data.hasOwnProperty('workHistory')) {
                data.workHistory.forEach(company => {
                    listWorkExperience = [...listWorkExperience, new WorkExperience(company)];
                });
            }

        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}

function setWorkExperienceCard(workExperience){
    
    let workExpCard = document.createElement('div');
    workExpCard.classList.add('main-cv-workhistory-card')

    let companyNameDiv = document.createElement('div');
    let companyNameLabel = document.createElement('p');
    companyNameLabel.classList.add('main-cv-workhistory-card-label');
    //companyNameLabel.textContent = "Empresa";
    let companyName = document.createElement('p');
    companyName.classList.add('main-cv-workhistory-card-company');
    companyName.textContent = workExperience.company;
    let companyUrl = document.createElement('a');
    companyUrl.classList.add('main-cv-workhistory-companyUrl');
    companyUrl.href = workExperience.url;

    companyNameDiv.appendChild(companyNameLabel);
    companyNameDiv.appendChild(companyName);
    companyNameDiv.appendChild(companyUrl);
    workExpCard.append(companyNameDiv);

    let companyPositionDiv = document.createElement('div');
    let companyPositionLabel = document.createElement('p');
    companyPositionLabel.classList.add('main-cv-workhistory-card-label');
    //companyPositionLabel.textContent = "Posición";
    let companyPosition = document.createElement('p');
    companyPosition.classList.add('main-cv-workhistory-card-text');
    companyPosition.textContent = workExperience.position;

    companyPositionDiv.appendChild(companyPositionLabel);
    companyPositionDiv.appendChild(companyPosition);
    workExpCard.append(companyPositionDiv);

    //LINK

    const companyLinkDiv = document.createElement('div');
    companyLinkDiv.classList.add('main-cv-workhistory-linkDiv');

    const companyLinkSpan = document.createElement('span');
    companyLinkSpan.classList.add('main-cv-workhistory-span');

    companyLinkDiv.append(companyLinkSpan);

    const companylinkA = document.createElement('a');
    if (workExperience.url) {
        companylinkA.href = workExperience.url;
        companylinkA.textContent = workExperience.url;
    }
    companylinkA.classList.add('main-cv-workhistory-a');

    companyLinkDiv.append(companylinkA);

    workExpCard.append(companyLinkDiv);

    //FECHA INICIO
    const compoanyWorkTimeLapse = document.createElement('div');
    compoanyWorkTimeLapse.classList.add('main-cv-workhistory-timelapse');

    let companyStartDateDiv = document.createElement('div');
    let companyStartDateLabel = document.createElement('p');
    companyStartDateLabel.classList.add('main-cv-workhistory-card-label');
    let companyStartDate = document.createElement('p');
    companyStartDate.classList.add('main-cv-workhistory-card-text');
    companyStartDate.textContent = workExperience.startDate;

    companyStartDateDiv.appendChild(companyStartDateLabel);
    companyStartDateDiv.appendChild(companyStartDate);
    
    compoanyWorkTimeLapse.append(companyStartDateDiv);

    const timelapsespan = document.createElement('span');
    timelapsespan.classList.add('timelapse-icon');

    compoanyWorkTimeLapse.append(timelapsespan);

    //FECHA FIN
    let companyEndDateDiv = document.createElement('div');
    let companyEndDateLabel = document.createElement('p');
    companyEndDateLabel.classList.add('main-cv-workhistory-card-label');
    let companyEndDate = document.createElement('p');
    companyEndDate.classList.add('main-cv-workhistory-card-text');
    companyEndDate.textContent = workExperience.endDate;

    companyEndDateDiv.appendChild(companyEndDateLabel);
    companyEndDateDiv.appendChild(companyEndDate);

    compoanyWorkTimeLapse.append(companyEndDateDiv);

    workExpCard.append(compoanyWorkTimeLapse);

    //LISTADO
    const buttonContent = document.createElement('button');
    buttonContent.textContent = "Funciones";
    buttonContent.classList.add('main-cv-workhistory-button');
    buttonContent.classList.add('collapsible');
    buttonContent.addEventListener('click', collapsibleClickfunction);

    workExpCard.appendChild(buttonContent);

    const collapsibleWorkHistory = document.createElement('div');
    collapsibleWorkHistory.classList.add('content')

    

    let functionsList = document.createElement('ul');
    //functionsList.textContent = "Funciones"
    functionsList.classList.add('main-cv-workhistory-list');
    

    workExperience.functions.forEach(exp => {
        const elem = document.createElement('li');
        elem.classList.add('main-cv-workhistory-elem');
        elem.textContent = exp;
        functionsList.appendChild(elem);
    });

    collapsibleWorkHistory.appendChild(functionsList);
    workExpCard.appendChild(collapsibleWorkHistory);
    return workExpCard;


}

async function loadLanguage()
{
    let fileName;
    let langLines;

    
    switch(selected_language){
        case 'es': fileName = './information/label_files_es.txt'; break;
    }

    langLines = await fetch(fileName)
    .then(data => data.text())
    .then(text => text.split('\n'))
    .catch(err => console.error(err));

    let dicto = {}

    langLines.forEach(line => {
        
        let splLine = line.split('=');
        let key = splLine[0];
        dicto[key] = splLine[1].replace('\r','');
    });

    return dicto;

}


function collapsibleClickfunction() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  }



class PersonalInfo {
    constructor(data) {
        this.name = data.name;
        this.title = data.title;
        this.phone = data.phone;
        this.email = data.email;
        this.ResidenceCountry = data.ResidenceCountry;
    }
}

class ProfesionalProfile {
    constructor(data) {
        this.summary = data.summary;
        this.techs = data.techs;
    }
}

class WorkExperience {
    constructor(data) {
        
        this.company = data.company;
        this.url = data.url;
        this.position = data.position;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.functions = data.functions;
    }
}

class EducationProfile {
    constructor(data) {
        this.titles = data.titles.map(titles => new EducationTitles(titles));
        this.Courses = data.Courses.map(courses => new EducationCourses(courses));
        this.Certifications = data.Certifications.map(cert => new EducationCertifications(cert));
        this.Additional = data.Additional;
    }
}

class EducationTitles {
    constructor(data) {
        this.institution = data.institution;
        this.url = data.url;
        this.graduationYear = data.graduationYear;
        this.degree = data.degree;
    }
}

class EducationCourses {
    constructor(data) {
        this.name = data.name;
        this.url = data.url;
        this.entity = data.entity;
        this.notes = data.notes;
    }
}

class EducationCertifications {
    constructor(data) {
        this.name = data.name;
        this.entity = data.entity;
        this.notes = data.notes;
    }

}

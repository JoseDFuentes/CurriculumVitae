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

let personalInformation = document.querySelector('.main-cv-personal--title');

let selected_language = 'en';

let personalInfo;
let profesionalProfile;
let educationProfile;


let dictoLanguage = {};
let listWorkExperience = [];
let titles = [];
let certifications = [];
let courses = [];
let aditionalEducation = [];

let Labels;

document.addEventListener('DOMContentLoaded', setData);

async function setData() {
    Labels = await loadJSONLanguage();
    await loadJSON();
    
    
    setPersonalInfoData();
    setProfesionalData();
    setWorkExperience();
    setEducation();
    SetCertifications();
    SetCourses();
    SetAdditionals();
    SetFooterLabels();
}


function expandCollapseButton()
{
    this.classList.toggle("active");
    var content = this.nextElementSibling;

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function setPersonalInfoData(){

    personalInformation.textContent = Labels.PersonalInformation;
    personalInfo_name_label.textContent = Labels.Name;
    personalInfo_phone_label.textContent =  Labels.Phone;
    personalInfo_email_label.textContent = Labels.Email;
    personalInfo_title_label.textContent = Labels.Profesion;
    personalInfo_country_label.textContent = Labels.ResidenceCountry;

  
    personalInfo_name.textContent = personalInfo.name;
    personalInfo_phone.textContent =  personalInfo.phone;
    personalInfo_email.textContent = personalInfo.email;
    personalInfo_title.textContent = personalInfo.title;
    personalInfo_country.textContent = personalInfo.ResidenceCountry;
  
}

function setProfesionalData(){

    const profesionalProfileTitle = document.querySelector('.main-cv-profesional--title');
    profesionalProfileTitle.textContent = Labels.ProfesionalProfile;

    profesionalSummary.textContent = profesionalProfile.summary;

    profesionalProfile.techs.forEach(tech => {
        const li = document.createElement('li');
        li.classList.add('main-cv-profesional-techs-li');
        li.textContent = tech;
        profesionalTechs.appendChild(li);

    });

}

function setWorkExperience(){

    const workExperienceTitle = document.querySelector('.main-cv-workhistory--title');
    workExperienceTitle.textContent = Labels.WorkExperience;

    listWorkExperience.forEach(workExperience => {
        const workExpCard = setWorkExperienceCard(workExperience);
        workHistoryContainer.appendChild(workExpCard);
    });
}

async function loadJSONLanguage() {
    let fileName = '';
    switch(selected_language){
        case 'es': fileName = './information/label_file_es.json'; break;
        case 'en': fileName = './information/label_file_en.json'; break;
    }

    const Labels = await fetch(fileName) 
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error al cargar archivo de información');
            }
            let data = response.json();
            
            return data;
        });
    
        return Labels;



}

async function loadJSON() {
    let fileName = '';

    switch(selected_language){
        case 'es': fileName = './information/info_spanish.json'; break;
        case 'en': fileName = './information/info_english.json'; break;
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
            if (data.hasOwnProperty('educationProfile')) {
                educationProfile = new EducationProfile(data.educationProfile);
                titles = educationProfile.titles;
                certifications = educationProfile.Certifications;
                courses = educationProfile.Courses;
                aditionalEducation = educationProfile.Additional;
            }
            


        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}

function setEducation() {
    const educationTitle = document.querySelector('.main-cv-education--title');
    educationTitle.textContent = Labels.Education;

   SetUniversity(titles);
}


function SetUniversity(titles) {
    const universitySection = document.querySelector('.main-cv-education-university--container');

    const universityTitle = document.createElement('p');
    universityTitle.classList.add('main-cv-education-section-title');
    universityTitle.textContent = Labels.University;
    universitySection.append(universityTitle);

    console.log(universitySection);
    titles.forEach(title => {
        const universityCard = SetUniversityTitle(title);
        universitySection.append(universityCard);
    });

    


}


function SetUniversityTitle(Title) {
    const universityCard = document.createElement('div');
    universityCard.classList.add('main-cv-education-uni-card');

    const degreeP = document.createElement('p');
    degreeP.classList.add('main-cv-education-uni-degree');
    degreeP.textContent = Title.degree;

    universityCard.append(degreeP);

    const institutionP = document.createElement('p');
    institutionP.classList.add('main-cv-education-uni-name');
    institutionP.textContent = Title.institution;

    universityCard.append(institutionP);

    const yearP = document.createElement('p');
    yearP.classList.add('main-cv-education-uni-year');
    yearP.textContent = `${Labels.GraduationYear} ${Title.graduationYear}`;

    universityCard.append(yearP)

    if (Title.url) {
        const instURLDiv = document.createElement('div');
        instURLDiv.classList.add('main-cv-link-div');

        const instUrlSpan = document.createElement('span');
        instUrlSpan.classList.add('main-cv-link-span');

        instURLDiv.append(instUrlSpan);

        const instUrl = document.createElement('a');
        instUrl.classList.add('main-cv-link-a');
        instUrl.href = Title.url;
        instUrl.textContent = Title.url;

        instURLDiv.append(instUrl);

        universityCard.append(instURLDiv);
    }


    return universityCard;
}

function SetCertifications() {

    const certificationsContainer = document.querySelector('.main-cv-education-certifications--container');
    
    const certificationTitle = document.createElement('p');
    certificationTitle.classList.add('main-cv-education-section-title');
    certificationTitle.textContent = Labels.Certifications;
    certificationsContainer.append(certificationTitle);

    const certTable = setCertificationTableHeader();

    certifications.forEach(certification => {
        const certRow = SetCertification(certification);
        certTable.append(certRow);
    })


    certificationsContainer.append(certTable);

}

function setCertificationTableHeader() {
    const certTable = document.createElement('div');
    certTable.classList.add('div-table');
    
    const headerRow = document.createElement('div');
    headerRow.classList.add('div-row');

    const headerCert = document.createElement('div');
    headerCert.classList.add('div-cell-large');
    headerCert.classList.add('div-header');
    headerCert.textContent = Labels.Certification;

    const headerInst = document.createElement('div');
    headerInst.classList.add('div-cell-mid');
    headerInst.classList.add('div-header');
    headerInst.textContent = Labels.Institution;

    headerRow.append(headerCert);
    headerRow.append(headerInst);

    certTable.append(headerRow);

    return certTable;

}

function SetCertification(certification) {
    const row = document.createElement('div');
    row.classList.add('div-row');

    const rowCert = document.createElement('div');
    rowCert.classList.add('div-cell-large');
    rowCert.textContent = certification.name;

    const rowInst = document.createElement('div');
    rowInst.classList.add('div-cell-mid');
    rowInst.textContent = certification.entity;

    row.append(rowCert);
    row.append(rowInst);

    return row;
}

function SetCourses() {
    const coursesContainer = document.querySelector('.main-cv-education-courses--container');
    
    const courseTitle = document.createElement('p');
    courseTitle.classList.add('main-cv-education-section-title');
    courseTitle.textContent = Labels.Courses;
    coursesContainer.append(courseTitle);

    const certTable = setCoursesTableHeader();

    courses.forEach(course => {
        const certRow = SetCourse(course);
        certTable.append(certRow);
    })


    coursesContainer.append(certTable);
}

function setCoursesTableHeader() {
    const certTable = document.createElement('div');
    certTable.classList.add('div-table');
    
    const headerRow = document.createElement('div');
    headerRow.classList.add('div-row');

    const headerCert = document.createElement('div');
    headerCert.classList.add('div-cell-large');
    headerCert.classList.add('div-header');
    headerCert.textContent = Labels.Course;

    const headerInst = document.createElement('div');
    headerInst.classList.add('div-cell-mid');
    headerInst.classList.add('div-header');
    headerInst.textContent = Labels.Entity;

    headerRow.append(headerCert);
    headerRow.append(headerInst);

    certTable.append(headerRow);

    return certTable;

}

function SetCourse(course) {
    const row = document.createElement('div');
    row.classList.add('div-row');

    const rowCert = document.createElement('div');
    rowCert.classList.add('div-cell-large');
    rowCert.textContent = course.name;

    const rowInst = document.createElement('div');
    rowInst.classList.add('div-cell-mid');
    rowInst.textContent = course.entity;

    row.append(rowCert);
    row.append(rowInst);

    return row;

}

function SetAdditionals() {
    const AdditionalsContainer = document.querySelector('.main-cv-education-other--container');
    
    const AdditionalTitle = document.createElement('p');
    AdditionalTitle.classList.add('main-cv-education-section-title');
    AdditionalTitle.textContent = Labels.OtherSkills;
    AdditionalsContainer.append(AdditionalTitle);

    const certTable = setAdditionalsTableHeader();

    aditionalEducation.forEach(Additional => {
        const certRow = SetAdditional(Additional);
        certTable.append(certRow);
    })


    AdditionalsContainer.append(certTable);
}

function setAdditionalsTableHeader() {
    const certTable = document.createElement('div');
    certTable.classList.add('div-table');
   /* 
    const headerRow = document.createElement('div');
    headerRow.classList.add('div-row');

    const headerCert = document.createElement('div');
    headerCert.classList.add('div-cell-large');
    headerCert.classList.add('div-header');
    headerCert.textContent = Labels.Additional;

    const headerInst = document.createElement('div');
    headerInst.classList.add('div-cell-mid');
    headerInst.classList.add('div-header');
    headerInst.textContent = Labels.Entity;

    headerRow.append(headerCert);
    headerRow.append(headerInst);

    certTable.append(headerRow);
*/
    return certTable;

}

function SetAdditional(Additional) {
    const row = document.createElement('div');
    row.classList.add('div-row');

    const rowCert = document.createElement('div');
    rowCert.classList.add('div-cell-large');
    rowCert.textContent = Additional;

    row.append(rowCert);
   

    return row;

}

function SetFooterLabels() {
    const linkedInA = document.querySelector('#linkedInA');
    linkedInA.textContent = Labels.LinkedIn;

    const repositoryA = document.querySelector('#RepositoryA');
    repositoryA.textContent = Labels.Repository;
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

   
    if (workExperience.url) {
        const companyLinkDiv = document.createElement('div');
        companyLinkDiv.classList.add('main-cv-link-div');
    
        
    
        const companylinkA = document.createElement('a');
        const companyLinkSpan = document.createElement('span');
        companyLinkSpan.classList.add('main-cv-link-span');

        companyLinkDiv.append(companyLinkSpan);

        companylinkA.href = workExperience.url;
        companylinkA.textContent = workExperience.url;
        companylinkA.classList.add('main-cv-link-a');

        companyLinkDiv.append(companylinkA);
    
        workExpCard.append(companyLinkDiv);
    
    }
   
    //FECHA INICIO
    const compoanyWorkTimeLapse = document.createElement('div');
    compoanyWorkTimeLapse.classList.add('main-cv-workhistory-timelapse');

    let companyStartDateDiv = document.createElement('div');
    companyStartDateDiv.classList.add('main-cv-workhistory-card--container');
    let companyStartDateSpan = document.createElement('span');
    //companyStartDateSpan.classList.add('main-cv-workhistory-card-startdate-icon')
    let companyStartDateLabel = document.createElement('p');
    companyStartDateLabel.classList.add('main-cv-workhistory-card-label');
    let companyStartDate = document.createElement('p');
    companyStartDate.classList.add('main-cv-workhistory-card-text');
    companyStartDate.textContent = workExperience.startDate;

    companyStartDateDiv.appendChild(companyStartDateLabel);
    companyStartDateDiv.appendChild(companyStartDateSpan);
    companyStartDateDiv.appendChild(companyStartDate);
    
    compoanyWorkTimeLapse.append(companyStartDateDiv);

    const timelapsespan = document.createElement('span');
    timelapsespan.classList.add('timelapse-icon');

    compoanyWorkTimeLapse.append(timelapsespan);

    //FECHA FIN
    let companyEndDateDiv = document.createElement('div');
    companyEndDateDiv.classList.add('main-cv-workhistory-card--container');
    let companyEndDateSpan = document.createElement('span');
    //companyEndDateSpan.classList.add('main-cv-workhistory-card-enddate-icon')
    let companyEndDateLabel = document.createElement('p');
    companyEndDateLabel.classList.add('main-cv-workhistory-card-label');
    let companyEndDate = document.createElement('p');
    companyEndDate.classList.add('main-cv-workhistory-card-text');
    companyEndDate.textContent = workExperience.endDate;

    companyEndDateDiv.appendChild(companyEndDateLabel);
    companyEndDateDiv.appendChild(companyEndDateSpan);
    companyEndDateDiv.appendChild(companyEndDate);

    compoanyWorkTimeLapse.append(companyEndDateDiv);

    workExpCard.append(compoanyWorkTimeLapse);

    //CALCULO TIEMPO
    const timeRange = document.createElement('p');

    const endDate = workExperience.endDate === '-' ? new Date().toISOString().split('T')[0] : workExperience.endDate;

    const timeRangeResult = calculateYearsAndMonths(workExperience.startDate, endDate);

    let rangeTextContent = `${timeRangeResult.years} ${Labels.Years}`;

    if (timeRangeResult.months > 0)
    {
        rangeTextContent += ` ${timeRangeResult.months} ${Labels.Months}`;
    }

    timeRange.textContent = rangeTextContent;

    workExpCard.append(timeRange);

    //LISTADO
    const buttonContent = document.createElement('button');
    buttonContent.textContent = Labels.Activities;
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

function calculateYearsAndMonths(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return {
        years: years,
        months: months
    };
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

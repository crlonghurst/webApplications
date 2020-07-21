import data from './data.js';
window.addEventListener('load', filterOptions);
const appFilter = document.getElementById('appFilter');
appFilter.addEventListener('change', filterResults);
const theList = document.getElementById('theList');
const personFilter = document.getElementById('personFilter');
personFilter.addEventListener('change', filterResults);

function newBug(){
    const bug = createBug();
    if(!bug){
        return;
    }
    data.saveBug(bug);
    displayBugs();
    filterOptions();
    document.getElementById('app').value = '';
    document.getElementById('name').value = '';
    document.getElementById('snippet').value = '';
    document.getElementById('desc').value = '';
}

function addToList(bug){
    document.querySelector('#theList').appendChild(bug);
}

function detailView(e){
    
    document.getElementById('theList').innerHTML = '';
    document.getElementById('filters').style.display = "none";
    document.getElementById('form').style.display = "none";
    const details = e.currentTarget;
    const id = details.getAttribute('data-id');
    const bugs = data.getBugs();
    const updatedBug = bugs.filter(bug => bug.id == id);
    const element = createDetailElement(updatedBug);
    addToList(element);
}


function createDetailElement(bugItem){
    document.getElementById('header').innerHTML = 'Detailed View of ' + bugItem[0].application + ' Found By ' + bugItem[0].foundBy;
    const bugDiv = document.createElement('div');
    bugDiv.classList.add('detailedView');
    bugDiv.setAttribute('id', bugItem[0].id);

    const application = document.createElement('h2');
    application.setAttribute('data-id', bugItem[0].id);
    application.innerText = 'Application: ' + bugItem[0].application;

    const foundBy = document.createElement('p');
    foundBy.setAttribute('data-id', bugItem[0].id);
    foundBy.innerText = 'Found By: ' + bugItem[0].foundBy;

    const snippet = document.createElement('p');
    snippet.setAttribute('data-id', bugItem[0].id);
    snippet.innerText = 'Snippet: ' + bugItem[0].snippet;

    const desc = document.createElement('p');
    snippet.setAttribute('data-id', bugItem[0].id);
    snippet.innerText = `Description: 
        ` + bugItem[0].description;  

    const backbtn = document.createElement('button');
    backbtn.setAttribute('data-id', bugItem[0].id);
    backbtn.innerText = 'Back';
    backbtn.addEventListener('click', displayBugs);

    if(bugItem[0].fixed){
        const fixed = document.createElement('label');
        fixed.innerText = "Fixed: Yes ";
        const fixedInput = document.createElement('input');
        fixedInput.setAttribute("type", "checkbox");
        fixedInput.setAttribute('data-id', bugItem[0].id);
        fixedInput.checked = true;
        fixedInput.addEventListener('click', isFinished);
        bugDiv.appendChild(application);
        bugDiv.appendChild(foundBy);
        bugDiv.appendChild(snippet);
        bugDiv.appendChild(desc);
        bugDiv.appendChild(fixed);
        bugDiv.appendChild(fixedInput);
        const br = document.createElement('br');
        bugDiv.appendChild(br);
        bugDiv.appendChild(backbtn);
    }
    else{
        const fixed = document.createElement('label');
        fixed.innerText = "Fixed: No, but is it? ";
        const fixedInput = document.createElement('input');
        fixedInput.setAttribute("type", "checkbox");
        fixedInput.setAttribute('data-id', bugItem[0].id);
        fixedInput.checked = false;
        fixedInput.addEventListener('click', isFinished);
        bugDiv.appendChild(application);
        bugDiv.appendChild(foundBy);
        bugDiv.appendChild(snippet);
        bugDiv.appendChild(desc);
        bugDiv.appendChild(fixed);
        bugDiv.appendChild(fixedInput);
        const br = document.createElement('br');
        bugDiv.appendChild(br);
        bugDiv.appendChild(backbtn);    
    }
    

    return bugDiv;
}


function filterResults(){
    const bugList = data.getBugs();
    document.getElementById('theList').innerHTML = '';
    bugList.forEach(bug=>{
        if(appFilter.value == 'Everything' && personFilter.value == 'Everyone'){
            const element = createElement(bug);
            addToList(element);
        }
        else if(bug.application == appFilter.value || bug.foundBy == personFilter.value){
            const element = createElement(bug);
            addToList(element);
        }
    })
}

function filterOptions(){
    const bugList = data.getBugs();
    const appresult = [];
    const appmap = new Map();
    for (const item of bugList){
        if (!appmap.has(item.application)){
            appmap.set(item.application, true);
            appresult.push({
                application: item.application
            });
        }
    }

    const personresult = [];
    const personmap = new Map();
    for (const item of bugList){
        if (!personmap.has(item.foundBy)){
            personmap.set(item.foundBy, true);
            personresult.push({
                foundBy: item.foundBy
            });
        }
    }


    let sortAppDiv = '<option selected>Everything</option>';
    appresult.forEach(bug=>{
        sortAppDiv += '<option>'+bug.application+'</option>';
    });
    document.getElementById('appFilter').innerHTML = sortAppDiv;

    let sortPersonDiv = '<option selected>Everyone</option>';
    personresult.forEach(bug=>{
        sortPersonDiv += '<option>'+bug.foundBy+'</option>';
    });
    document.getElementById('personFilter').innerHTML = sortPersonDiv;
}

function displayBugs(){
    document.getElementById('header').innerText = 'Bug Tracker';
    document.getElementById('filters').style.removeProperty('display');
    document.getElementById('form').style.removeProperty('display');
    theList.innerHTML = '';
    const bugList = data.getBugs();
    bugList.forEach(bug=>{
        const element = createElement(bug);
        addToList(element);
    })
}

function createBug(){
    const d = new Date();

    let app = document.querySelector("#app").value;
    let name = document.querySelector("#name").value;
    let snippet = document.querySelector("#snippet").value;
    let desc = document.querySelector("#desc").value;
    if(!app|| !name || !snippet || !desc){
        document.getElementById('error').innerText = "Fill out the entire form.";
        return;
    }
    else{
        const newBug = {id: d.getDate()+d.getHours()+d.getMilliseconds(), application: app, foundBy: name, dateFound: Date.now(), snippet: snippet, description: desc, fixed: false };
        app = '';
        name = '';
        snippet = '';
        desc = '';
        document.getElementById('error').innerText = '';
        return newBug;
    }
}

function createElement(bug){
    const bugDiv = document.createElement('div');
    bugDiv.classList.add('theList');
    bugDiv.setAttribute('id', bug.id);

    const application = document.createElement('h2');
    application.setAttribute('data-id', bug.id);
    application.innerText = 'Application: ' + bug.application;
    application.addEventListener('click', detailView);

    const foundBy = document.createElement('p');
    foundBy.setAttribute('data-id', bug.id);
    foundBy.innerText = 'Found By: ' + bug.foundBy;
    foundBy.addEventListener('click', detailView);

    const snippet = document.createElement('p');
    snippet.setAttribute('data-id', bug.id);
    snippet.innerText = 'Snippet: ' + bug.snippet;
    snippet.addEventListener('click', detailView);

    if(bug.fixed){
        const fixed = document.createElement('label');
        fixed.innerText = "Fixed: Yes ";
        const fixedInput = document.createElement('input');
        fixedInput.setAttribute("type", "checkbox");
        fixedInput.setAttribute('data-id', bug.id);
        fixedInput.checked = true;
        fixedInput.addEventListener('click', isFinished);
        bugDiv.appendChild(application);
        bugDiv.appendChild(foundBy);
        bugDiv.appendChild(snippet);
        bugDiv.appendChild(fixed);
        bugDiv.appendChild(fixedInput);
        const hr = document.createElement('hr');
        bugDiv.appendChild(hr);
    }
    else{
        const fixed = document.createElement('label');
        fixed.innerText = "Fixed: No, but is it? ";
        const fixedInput = document.createElement('input');
        fixedInput.setAttribute("type", "checkbox");
        fixedInput.setAttribute('data-id', bug.id);
        fixedInput.checked = false;
        fixedInput.addEventListener('click', isFinished);
        bugDiv.appendChild(application);
        bugDiv.appendChild(foundBy);
        bugDiv.appendChild(snippet);
        bugDiv.appendChild(fixed);
        bugDiv.appendChild(fixedInput);
        const hr = document.createElement('hr');
        bugDiv.appendChild(hr);
    }
    

    return bugDiv;
}


function isFinished(e){
    const completed = e.currentTarget;
    const bugs = data.getBugs();
    bugs.forEach(bug =>{
        if(bug.id == completed.getAttribute('data-id')){
            if(bug.fixed == true){
                bug.fixed = false;
                data.editBug(bug);
            }
            else {
                bug.fixed = true;
                data.editBug(bug);

            }
        }
    });
}

export default{
    newBug,
    createElement,
    displayBugs
}


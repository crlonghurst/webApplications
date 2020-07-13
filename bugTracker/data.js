const bugs = [{
    application: "Bug Tracker",
    foundBy: "Christian",
    dateFound: "2 July 2020",
    snippet: "It's a thing",
    description: "When entering a bug it doesn't go where it should",
    fixed: false
}];

window.addEventListener('load', displayBugs);

function displayBugs(){
    let listHTML = '';
    bugs.forEach(bug => {
        listHTML += "<h2>"+bug.application+"</h2>";
        listHTML += "<p>Found By: "+bug.foundBy+"</p>";
        listHTML += "<p>Snippet: "+bug.snippet+"</p>";
        listHTML += "<p>Date: "+bug.dateFound+"</p>";  
        listHTML += "Fixed: <input type='checkbox' name='fixed' id='fixed'>"
    });
    document.getElementById('theList').innerHTML = listHTML;
}
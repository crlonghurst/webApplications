import bugTracker from './bugTracker.js';


window.addEventListener('load', bugTracker.displayBugs);
document.querySelector('#btnadd').onclick = bugTracker.newBug;

function saveBug(bug){
    const bugList = getBugs();
    bugList.push(bug);
    localStorage.setItem('theList', JSON.stringify(bugList));
}

function getBugs(){
    const bugs = localStorage.getItem('theList');
    let bugList = [];
    if(bugs){
        bugList = JSON.parse(bugs);
    }
    return bugList;
}


function editBug(bug){
    const bugList = getBugs();
    bugList.forEach(element => {
        if(bug.id == element.id){
            element.fixed = bug.fixed;
        }
    });
    localStorage.setItem('theList', JSON.stringify(bugList));
}

export default{
    saveBug,
    getBugs,
    editBug
}
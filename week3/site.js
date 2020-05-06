window.addEventListener('load', loadData);

function loadData(){
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.scrollTo(0,0);
    document.getElementById('backButton').hidden = true;
    document.getElementById('pageTitle').innerText = "Minecraft Mobs";
    document.getElementById('title').innerHTML = 'MineCraft Mobs';
    minecraftData.forEach((mob, i) =>{
        const mobNode = createMobNode(mob, i)
        mobNode.addEventListener('click', viewMob)
        app.appendChild(mobNode);
    })
}


function createMobNode(mob, i, showDetails = false){
    const div = document.createElement('div');
    const img = document.createElement('img');
    div.id = i;
    img.src = mob.img;

    if (showDetails){
        const h1 = document.getElementById('pageTitle');
        h1.innerText = mob.type;
        const desc = document.createElement('div');
        desc.innerHTML = `<h2>Description</h2>` +
                            mob.desc;
        const spawning = document.createElement('div');
        spawning.innerHTML = `<h2>Spawning</h2>` +
                            mob.spawning;
        
        div.appendChild(img);
        div.appendChild(desc);
        div.appendChild(spawning);
    } else{
        const h2 = document.createElement('h2');
        h2.innerText = mob.type;
        div.appendChild(h2);
        div.appendChild(img);
    }
    return div;
}

function viewMob(event){
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.scrollTo(0,0);
    const id = event.currentTarget.id;
    const mobDetails = createMobNode(minecraftData[id], id, true);
    document.getElementById('backButton').hidden = false;
    document.getElementById('title').innerHTML += ': ' + minecraftData[id].type;

    app.appendChild(mobDetails);
    
}
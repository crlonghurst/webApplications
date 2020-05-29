const imgBasePath = '//byui-cit.github.io/cit261/examples/';

// Hike View handler
class HikesView {
    renderHikeList(hikeListElement, hikeList) {
        hikeListElement.innerHTML = '';
        hikeList.forEach(hike => {
            hikeListElement.appendChild(this.renderOneHikeLight(hike));
        });
    }
    renderOneHikeLight(hike) {
        // this method will be used to create the list of hikes with less detail: name, image, distance, difficulty 
        const item = document.createElement('li');
        item.classList.add('light');
        item.setAttribute('data-name', hike.name);
        item.innerHTML = ` <h2>${hike.name}</h2>
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div>
                  <div>
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div>
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
          </div> 
          <br>
          <a href="index.html"><-</a>`;

        return item;
    }
    renderOneHikeFull(parentElement, hike) {
        const backButton = document.createElement('button');
        backButton.innerHTML = '&lt; - All Hikes';
        // this method will be used to one hike with full detail...you will need this for the stretch goal!
        const item = document.createElement("li");
        item.innerHTML = `
                <img src="${imgBasePath}"${hike.imgSrc}" alt="${hike.imgAlt}">
                <h2>${hike.name}</h2>
                <div>
                    <h3>Distance</h3>
                    <p>${hike.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${hike.difficulty}</p>
                </div>
                <div>
                    <h3>Description</h3>
                    <p>${hike.description}</p>
                </div>
                <div>
                    <h3>How to get there</h3>
                    <p>${hike.directions}</p>
                </div>
            `;

        parent.innerHTML = '';
        item.insertBefore(backButton, item.childNodes[0]);
        parent.appendChild(item);
        
        return backButton;
    }
}
export default HikesView;
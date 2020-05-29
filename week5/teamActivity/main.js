import HikesController from './HikesController.js';

const myHikesController = new HikesController('hikes');
window.addEventListener('load', () =>{
  myHikesController.showHikeList();
})
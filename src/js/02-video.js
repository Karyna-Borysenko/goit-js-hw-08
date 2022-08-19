import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(timeUpdate, 1000));

function timeUpdate({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

const localStorageCurrentTime = localStorage.getItem(
  'videoplayer-current-time'
);

player
  .setCurrentTime(localStorageCurrentTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });

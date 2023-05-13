'use strict';

const markups = {
  reaction: function (notification) {
    return `
        <li class="notification">
          <div class="notification__picture">
            <img src="${notification.userPicture}" alt="${
      notification.user
    }'s profile picture" />
          </div>
          <div class="notification__content">
            <p class="content__description ${
              !notification.isRead ? 'description__new-notification' : ''
            }">
              <a href="#" class="description__user">${notification.user}</a>
              reacted to your recent post
              <a href="#" class="description__post-link ">
                ${notification.originalPost}
                
              </a>
            </p>
            <p class="description__timestamp">${notification.timestamp}</p>
          </div>
        </li>`;
  },
  newFollower: function (notification) {
    return `
      <li class="notification">
        <div class="notification__picture">
          <img src="${notification.userPicture}" alt="${
      notification.user
    }'s profile picture" />
        </div>
        <div class="notification__content">
          <p class="content__description ${
            !notification.isRead ? 'description__new-notification' : ''
          }">
            <a href="#" class="description__user">${notification.user}</a>
            followed you
          </p>
          <p class="description__timestamp">${notification.timestamp}</p>
        </div>
      </li>`;
  },
  privateMessage: function (notification) {
    return `
    <li class="notification">
      <div class="notification__picture">
        <img src="${notification.userPicture}" alt="${
      notification.user
    }'s profile picture" />
      </div>
      <div class="notification__content">
        <p class="content__description ${
          !notification.isRead ? 'description__new-notification' : ''
        }">
        <a href="#" class="description__user">${notification.user}</a>
          sent you a private message
        </p>
        <p class="description__timestamp">${notification.timestamp}</p>
        <div class="content__private-msg">
          <p>
            ${notification.message}
          </p>
        </div>
      </div>
    </li>`;
  },
  joinedGroup: function (notification) {
    return `
      <li class="notification">
        <div class="notification__picture">
          <img src="${notification.userPicture}" alt="${
      notification.user
    }'s profile picture" />
        </div>
        <div class="notification__content">
          <p class="content__description ${
            !notification.isRead ? 'description__new-notification' : ''
          }">
          <a href="#" class="description__user">${notification.user}</a>
            has joined your group
            <a href="#" class="description__post-link">${
              notification.originalPost
            }</a>
          </p>
          <p class="description__timestamp">${notification.timestamp}</p>
        </div>
      </li>`;
  },
  pictureComment: function (notification) {
    return `
    <li class="notification">
      <div class="notification__picture">
        <img src="${notification.userPicture}" alt="${
      notification.user
    }'s profile picture" />
      </div>
      <div class="notification__content">
        <p class="content__description ${
          !notification.isRead ? 'description__new-notification' : ''
        }">
          <a href="#" class="description__user">${notification.user}</a>
          commented on your picture
        </p>
        <p class="description__timestamp">${notification.timestamp}</p>
      </div>
      <div class="content__picture-comment">
        <img src="${notification.originalPost}" alt="" />
      </div>
    </li>`;
  },
  leftGroup: function (notification) {
    return `
      <li class="notification">
        <div class="notification__picture">
          <img src="${notification.userPicture}" alt="${
      notification.user
    }'s profile picture" />
        </div>
        <div class="notification__content">
          <p class="content__description ${
            !notification.isRead ? 'description__new-notification' : ''
          }">
          <a href="#" class="description__user">${notification.user}</a>
            left the group
            <a href="#" class="description__group-link">${
              notification.originalPost
            }</a>
            
          </p>
          <p class="description__timestamp">${notification.timestamp}</p>
        </div>
      </li>`;
  },
};

const data = [
  {
    id: 1,
    user: 'Mark Webber',
    userPicture: './assets/images/avatar-mark-webber.webp',
    originalPost: 'My first tournament today!',
    isRead: false,
    timestamp: '1m ago',
    notificationType: 'reaction',
    message: '',
  },
  {
    id: 2,
    user: 'Angela Gray',
    userPicture: './assets/images/avatar-angela-gray.webp',
    originalPost: '',
    isRead: false,
    timestamp: '5m ago',
    notificationType: 'newFollower',
    message: '',
  },
  {
    id: 3,
    user: 'Jacob Thompson',
    userPicture: './assets/images/avatar-jacob-thompson.webp',
    originalPost: 'Chess Club',
    isRead: false,
    timestamp: '1 day ago',
    notificationType: 'joinedGroup',
    message: '',
  },
  {
    id: 4,
    user: 'Rizky Hasanuddin',
    userPicture: './assets/images/avatar-rizky-hasanuddin.webp',
    originalPost: '',
    isRead: true,
    timestamp: '5 days ago',
    notificationType: 'privateMessage',
    message:
      "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
  },
  {
    id: 5,
    user: 'Kimberly Smith',
    userPicture: './assets/images/avatar-kimberly-smith.webp',
    originalPost: './assets/images/image-chess.webp',
    isRead: true,
    timestamp: '1 week ago',
    notificationType: 'pictureComment',
    message: '',
  },
  {
    id: 6,
    user: 'Nathan Peterson',
    userPicture: './assets/images/avatar-nathan-peterson.webp',
    originalPost: '5 end-game strategies to increase your win rate',
    isRead: true,
    timestamp: '2 weeks',
    notificationType: 'reaction',
    message: '',
  },
  {
    id: 7,
    user: 'Anna Kim',
    userPicture: './assets/images/avatar-anna-kim.webp',
    originalPost: 'Chess Club',
    isRead: true,
    timestamp: '2 weeks ago',
    notificationType: 'leftGroup',
    message: '',
  },
];

const $ = (selector) => document.querySelector(selector);

const $notifications = $('.notifications');
const $notificationsCounter = $('.header__new-notifications');
const $markAllReadBtn = $('.header__button');

const calculateNewNotifications = (notifications) => {
  return notifications.reduce((acc, curr) => (curr.isRead ? acc : acc + 1), 0);
};

const renderNotificationsCounter = (el, data) => {
  el.textContent = '';
  el.classList.remove('hidden');
  el.textContent = calculateNewNotifications(data);
};

const removeNotificationsCounter = (el) => {
  el.textContent = '';
  el.classList.add('hidden');
};

const renderNotifications = (notifications) => {
  renderNotificationsCounter($notificationsCounter, notifications);
  $notifications.innerHTML = '';
  notifications.forEach((notification) => {
    const markup = markups[notification.notificationType](notification);
    if (!markup) return;
    $notifications.insertAdjacentHTML('beforeend', markup);
  });
};

const markAllAsRead = (notifications) => {
  notifications.forEach((el) => (el.isRead = true));
};

renderNotifications(data);

$markAllReadBtn.addEventListener('click', () => {
  markAllAsRead(data);
  renderNotifications(data);
  removeNotificationsCounter($notificationsCounter);
});

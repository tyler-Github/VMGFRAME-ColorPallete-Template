/*
 * VMGFrame - notifications.js
 * Version 1.0.1
 * https://github.com/VMGWARE/VMGFrame
 *
 * (C) 2023 Company VMGWare. All rights reserved.
 * This code is open source and available under the MIT License.
 * https://opensource.org/licenses/MIT
 */

window.notifications = function(message) {
  window.showNotification = function(message) {
    const notification = document.createElement('div');
    notification.classList.add('notifications', 'mt-3');
    notification.innerText = message;

    // Append notification to the document body
    document.body.appendChild(notification);

    // Apply animation for fading in and sliding up
    setTimeout(() => {
      notification.style.opacity = 1;
      notification.style.transform = 'translateY(0)';
    }, 10);

    // Remove the notification after a delay
    setTimeout(() => {
      notification.classList.add('hide');
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 3000);
  };
};

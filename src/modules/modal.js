/*
 * VMGFrame - modal.js
 * Version 1.0.0
 * https://github.com/VMGWARE/VMGFrame
 *
 * (C) 2023 VMGWare. All rights reserved.
 * This code is open source and available under the MIT License.
 * https://opensource.org/licenses/MIT
 */

window.modal = function (options) {
    window.createModal = function (options) {
        const {
            title = 'Modal Title',
            content = '',
            closeButton = true,
            additionalButtons = [],
        } = options;

        const modalWrapper = document.createElement('div');
        modalWrapper.classList.add('modal-wrapper');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        if (title) {
            const modalTitle = document.createElement('h2');
            modalTitle.innerText = title;
            modalContent.appendChild(modalTitle);
        }

        if (content) {
            const modalBody = document.createElement('div');
            modalBody.innerHTML = content;
            modalContent.appendChild(modalBody);
        }

        if (closeButton) {
            const closeButtonElement = document.createElement('button');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', () => closeModal(modalWrapper));
            modalContent.appendChild(closeButtonElement);
        }

        additionalButtons.forEach(button => {
            const additionalButtonElement = document.createElement('button');
            additionalButtonElement.innerText = button.text;
            additionalButtonElement.addEventListener('click', button.clickHandler);
            modalContent.appendChild(additionalButtonElement);
        });

        modalWrapper.appendChild(modalContent);
        document.body.appendChild(modalWrapper);

        function closeModal(modal) {
            document.body.removeChild(modal);
        }
    };
};
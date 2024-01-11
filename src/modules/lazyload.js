/*
 * VMGFrame - lazyload.js
 * Version 1.0.1
 * https://github.com/VMGWARE/VMGFrame
 *
 * (C) 2023 VMGWare. All rights reserved.
 * This code is open source and available under the MIT License.
 * https://opensource.org/licenses/MIT
 */

window.lazyload = function () {
    const images = document.querySelectorAll('img[data-src]');

    const options = {
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.setAttribute('loading', 'lazy'); // Add loading="lazy"
                console.log(`Lazy loading ${img.src}`);
                observer.unobserve(img);
            }
        });
    }, options);

    images.forEach(img => {
        observer.observe(img);
    });
};

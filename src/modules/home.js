/*
 * VMGFrame - home.js
 * Version 1.0.0
 * https://github.com/VMGWARE/VMGFrame
 *
 * (C) 2023 VMGWare. All rights reserved.
 * This code is open source and available under the MIT License.
 * https://opensource.org/licenses/MIT
 */


window.home = function () {
    const root = document.getElementById('root');
    root.innerHTML = '';

    // Image upload section
    const imageUploadSection = document.createElement('div');
    imageUploadSection.classList.add('container', 'my-5', 'text-center');
    imageUploadSection.innerHTML = `
        <div class="input-group mb-3">
            <input type="file" class="form-control" id="image-upload" accept="image/*">
            <input type="url" class="form-control" id="image-url" placeholder="or Image URL">
        </div>
        <div class="row">
            <div class="col-md-6">
                <div id="image-display"></div>
            </div>
            <div class="col-md-6">
                <div id="color-palette" class="d-flex flex-wrap justify-content-center align-items-center"></div>
            </div>
        </div>
    `;

    // Add sections to the root
    root.appendChild(imageUploadSection);

    const imageUpload = document.getElementById('image-upload');
    const imageUrlInput = document.getElementById('image-url');
    const colorPalette = document.getElementById('color-palette');
    const imageDisplay = document.getElementById('image-display');

    imageUpload.addEventListener('change', handleImageUpload);
    imageUrlInput.addEventListener('change', handleImageUrlUpload);

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        await handleImageFile(file);
    }

    async function handleImageUrlUpload(event) {
        const imageUrl = event.target.value;
        await handleImageUrl(imageUrl);
    }

    async function handleImageFile(file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Call the Express API to get color palette
            const colors = await getColorPalette(formData);

            // Display image
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.classList.add('img-fluid', 'rounded');
            imageDisplay.innerHTML = '';
            imageDisplay.appendChild(image);

            // Display colors
            colorPalette.innerHTML = '';
            colors.forEach(color => {
                const colorBox = document.createElement('div');
                colorBox.classList.add('color-box');
                colorBox.style.backgroundColor = color;

                colorBox.addEventListener('click', () => {
                    openColorModal(color, colors);
                });

                colorPalette.appendChild(colorBox);
            });
        } catch (error) {
            console.warn('Error getting color palette:', error);
            window.showNotification('Error getting color palette.');
        }
    }

    function openColorModal(baseColor) {
        const relatedColors = generateRelatedColors(baseColor, 5);

        const modalContent = document.createElement('div');
        const modalColorBoxes = document.createElement('div');
        modalColorBoxes.classList.add('color-boxes');

        relatedColors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.classList.add('color-box', 'small');
            colorBox.style.backgroundColor = color;
            colorBox.innerText = color;

            colorBox.addEventListener('click', () => {
                copyToClipboard(color);
                showCopyNotification(color);
            });

            modalColorBoxes.appendChild(colorBox);
        });

        modalContent.appendChild(modalColorBoxes);

        window.createModal({
            title: baseColor,
            content: modalContent.innerHTML,
            closeButton: true,
            additionalButtons: [
                {
                    text: 'Copy Base Color',
                    clickHandler: () => {
                        copyToClipboard(baseColor);
                        showCopyNotification(baseColor);
                    }
                }
            ]
        });
    }


    function generateRelatedColors(baseColor, numColors) {
        const relatedColors = [];
        relatedColors.push(baseColor);

        // Helper function to check if a color is close to white
        function isCloseToWhite(color) {
            // Assuming the color is in hex format, convert it to RGB
            const rgb = hexToRgb(color);
            // Define a threshold for considering a color close to white
            const threshold = 200; // Adjust this threshold as needed
            // Check if all RGB values are above the threshold
            return rgb.r > threshold && rgb.g > threshold && rgb.b > threshold;
        }

        // Helper function to convert hex color to RGB
        function hexToRgb(hex) {
            // Remove the hash if it exists
            hex = hex.replace(/^#/, '');
            // Parse the RGB components
            const bigint = parseInt(hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return { r, g, b };
        }

        // Helper function to adjust brightness
        function adjustBrightness(color, percent) {
            const f = parseInt(color.slice(1), 16);
            const t = percent < 0 ? 0 : 255;
            const p = percent < 0 ? percent * -1 : percent;
            const R = f >> 16;
            const G = f >> 8 & 0x00FF;
            const B = f & 0x0000FF;
            return `#${(0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 +
                (Math.round((t - G) * p) + G) * 0x100 +
                (Math.round((t - B) * p) + B)).toString(16).slice(1)}`;
        }

        // Generate lighter and darker shades, skipping colors close to white
        for (let i = 1; relatedColors.length < numColors * 2; i++) {
            const lighterColor = adjustBrightness(baseColor, i * 10); // Adjust brightness for lighter shades
            const darkerColor = adjustBrightness(baseColor, -i * 10); // Adjust brightness for darker shades

            if (!isCloseToWhite(lighterColor)) {
                relatedColors.push(lighterColor);
            }

            if (!isCloseToWhite(darkerColor)) {
                relatedColors.push(darkerColor);
            }
        }

        return relatedColors.slice(0, numColors * 2);
    }



    async function handleImageUrl(imageUrl) {
        try {
            window.showNotification(`Feature coming soon...`)
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error('Error fetching image');
            }
            const blob = await response.blob();

            const formData = new FormData();
            formData.append('image', blob);

            await handleImageFile(formData);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }

    async function getColorPalette(formData) {
        window.showNotification('Image uploading...')
        const response = await fetch('https://palleteapi.rollviral.repl.co/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error getting color palette');
        }

        const result = await response.json();
        return result.colors;
    }

    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }

    function showCopyNotification(color) {
        window.showNotification(`Copied ${color}`)
    }
};

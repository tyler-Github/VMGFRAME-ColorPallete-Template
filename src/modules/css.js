/*
 * VMGFrame - css.js
 * Version 1.0.0
 * https://github.com/VMGWARE/VMGFrame
 *
 * (C) 2023 VMGWare. All rights reserved.
 * This code is open source and available under the MIT License.
 * https://opensource.org/licenses/MIT
 */


window.css = function () {
  const bootstrapCSS = document.createElement('link');
  bootstrapCSS.rel = 'stylesheet';
  bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css';

  const customCSS = document.createElement('style');
  customCSS.textContent = `
      /* Custom styles for color palette page */
      body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
      }

      /* Updated CSS for stackable notifications stacking from bottom up */
.notifications {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 300px; /* Adjust as needed */
  opacity: 0; /* Initially hidden */
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out; /* Add a transition for smooth appearance */
}

/* Add animation for fading in/out and sliding up */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(20px); }
}
      

      .container {
          max-width: 800px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .input-group {
          width: 100%;
          margin-bottom: 1rem;
      }

      .form-control {
          border-radius: 10px;
          border: 1px solid #ccc;
      }

      #image-display img {
          max-width: 100%;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .color-box {
          display: inline-block;
          width: 50px;
          height: 50px;
          margin: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          cursor: pointer;
          color: white;
          font-size: 10px;
          text-align: justify;
          transition: background-color 0.3s;
      }

      .color-box:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border: 2px solid #ccc; /* Grey border effect */
    }
    
    /* Modal Styles */
.modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent background to dim the rest of the page */
    z-index: 9999;
    overflow: auto; /* Allow scrolling within the modal */
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 80%; /* Adjust the width as needed */
    text-align: center;
}

/* Close button */
.modal-content button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.modal-content button:hover {
    background-color: #0056b3;
}

    
    

      .fade-out {
          opacity: 0 !important;
      }
  `;

  const bootstrapJS = document.createElement('script');
  bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js';
  bootstrapJS.defer = true;

  document.head.appendChild(bootstrapCSS);
  document.head.appendChild(customCSS);
  document.body.appendChild(bootstrapJS);
};

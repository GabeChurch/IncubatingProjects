define([
    'jquery',
    'gabetest/js/FileSaver',
    'gabetest/js/html2canvas_newest/html2canvas'
], function($, saveAs, html2canvas) {
    "use strict";

    return {
        getPng: function () {
            html2canvas(document.body).then(function (canvas) {
                // Export canvas as a blob
                canvas.toBlob(function (blob) {
                    // Generate file download with the same name as notebooks
                    window.saveAs(blob, ($("#notebook_name").text()) + ".png");
                });
            })
        }
    }


    //define("png_download.js", function() {
})
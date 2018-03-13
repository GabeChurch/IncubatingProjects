require([
    'base/js/namespace',
    'jquery',
    'notebook/js/notebook',
    'contents',
    'services/config',
    'base/js/utils',
    'base/js/page',
    'base/js/events',
    'gabetest/js/FileSaver'
    //'gabetest/js/es6-promise.auto',
    //'gabetest/js/jspdf.min',
    //'gabetest/js/html2canvas.min',
    //'gabetest/js/FileSaver'
    //'gabetest/js/html2pdf.min'
], function(
    IPython,
    $,
    notebook,
    contents,
    configmod,
    utils,
    page,
    events,
    saveAs
    //html2canvas,
    //saveAs
    //html2pdf
) {
    "use strict";

    //$('#getpdf').click(function () {

    //        html2canvas(document.body).then(function (canvas) {
                // Export canvas as a blob
    //            canvas.toBlob(function (blob) {
                    // Generate file download
     //               window.saveAs(blob, "yourwebsite_screenshot.html");
    //            });
    //        });
    //    }



    //html2canvas(document.body).then(function(canvas) {
    // Export canvas as a blob
//    canvas.toBlob(function(blob) {
    // Generate file download
//        window.saveAs(blob, "yourwebsite_screenshot.html");
    //   });
//});

    document.fullHTML = function () {
        var r = document.documentElement.innerHTML, t = document.documentElement.attributes, i = 0, l = '',
            d = '<!DOCTYPE ' + document.doctype.name + (document.doctype.publicId ? ' PUBLIC "' + document.doctype.publicId + '"' : '') + (!document.doctype.publicId && document.doctype.systemId ? ' SYSTEM' : '') + (document.doctype.systemId ? ' "' + document.doctype.systemId + '"' : '') + '>';
        for (; i < t.length; i += 1) l += ' ' + t[i].name + '="' + t[i].value + '"';
        return d+'\n<html' + l + '>' + r + '</html>';
    };

    String.prototype.insert = function (index, string) {
        if (index > 0)
            return this.substring(0, index) + string + this.substring(index, this.length);
        else
            return string + this;
    };


    var buildpdf_onload = function () {

        //setTimeout(function(){

        //var element = document.getElementById('body');
        //var content = html2pdf(element);
        //console.log("it worked")

        //Working
        //var content = (new XMLSerializer().serializeToString(document))
        //console.log(content)


//works with html2canvas and FileSaver
                //html2canvas(document.body).then(function (canvas) {
        // Export canvas as a blob
                    //canvas.toBlob(function (blob) {
        // Generate file download
                      // window.saveAs(blob, "yourwebsite_screenshot.html");
                    //});
                //});

    //    var element = document.getElementById('body');
    //    html2pdf(element);

        //THE FOLLOWING DID NOT WORK
        //function css_text(x) { return x.cssText; }
        //var file = document.getElementById('css');
        //var content = Array.prototype.map.call(file.sheet.cssRules, css_text).join('\n');
        // alert(css_text())
        var getCss = function(el) {
            var style = window.getComputedStyle(el);
            return Object.keys(style).reduce(function(acc, k) {
                var name = style[k],
                    value = style.getPropertyValue(name);
                if (value !== null) {
                    acc[name] = value;
                }
                return acc;
            }, {});
        };

        //not used
        function dumpCSSText(element){
            var s = '';
            var o = getComputedStyle(element);
            for(var i = 0; i < o.length; i++){
                s+=o[i] + ':' + o.getPropertyValue(o[i])+';';
            }
            return s;
        }

        var style = "<style> body" + JSON.stringify(getCss(document.body)) + "</style>";

        var full_html = JSON.stringify(document.fullHTML());

        //var blob = new Blob([document.fullHTML()], {type: "text/plain;charset=utf-8"});
        //window.saveAs(blob, ($("#notebook_name").text() + ".html"));

        //console.log("<body>" + JSON.stringify(style));

        var headposition = full_html.indexOf("<head>")

        full_html = full_html.insert((headposition+6), style)

        //var blob = new Blob([full_html.replace(/\\n/g, '')], {type: "text/plain;charset=utf-8"});
        //window.saveAs(blob, "notebookfull.html");

        alert("it should have worked")

        //}, 8000);
    }

    events.on('notebook_loaded.Notebook', buildpdf_onload);

})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("htmlEditor").value;
    var filename = "index.html";
    
    download(filename, text);
}, false);
document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("cssEditor").value;
    var filename = "style.css";
    
    download(filename, text);
}, false);
document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("jsEditor").value;
    var filename = "script.js";
    
    download(filename, text);
}, false);
let currentSlide = 0;
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll('.dot')

const init = (n) => {
  slides.forEach((slide, index) => {
    slide.style.display = "none"
    dots.forEach((dot, index) => {
      dot.classList.remove("active")
    })
  })
  slides[n].style.display = "block"
  dots[n].classList.add("active")
}
document.addEventListener("DOMContentLoaded", init(currentSlide))
const next = () => {
  currentSlide >= slides.length - 1 ? currentSlide = 0 : currentSlide++
  init(currentSlide)
}

const prev = () => {
  currentSlide <= 0 ? currentSlide = slides.length - 1 : currentSlide--
  init(currentSlide)
}

document.querySelector(".next").addEventListener('click', next)

document.querySelector(".prev").addEventListener('click', prev)


setInterval(() => {
  next()
}, 5000);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    console.log(currentSlide)
    init(i)
    currentSlide = i
  })
})

function getUserCode() {
    return htmlEditor.getValue() + "\n" + "<style>" + "\n" + cssEditor.getValue() + "\n" + "</style>" + "\n" +  "<script>" + "\n" + jsEditor.getValue() + "\n" + "</script>";
}
function update() {
    //this is the content of iframe
    var code = document.getElementById('iframe').contentWindow.document;
    code.open();
    //getting value from editor and puts in the iframe
    code.write(getUserCode());
    code.close();
}
function loadHTMLEditor() {
    defaultHTMLValue = "<!-- Your HTML code goes here -->"
     window.htmlEditor = ace.edit("htmlEditor");//uses ace editor
    htmlEditor.setTheme("ace/theme/chaos");
    htmlEditor.getSession().setMode("ace/mode/html");
     htmlEditor.setValue(defaultHTMLValue,1); //1 = moves cursor to end
    // when something changed in editor update is called
    htmlEditor.getSession().on('change', function() {
        update();
    });
    // puts cursor in the editor
    htmlEditor.focus();    
    //htmlEditor.setOption('showLineNumbers', true);
    htmlEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible:false,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });

    htmlEditor.setShowPrintMargin(false);
    //htmlEditor.setBehavioursEnabled(false);
}
function loadCSSEditor() {
    defaultCSSValue = "/*Your css code goes here*/"
    //tells ace editor to use editor element , window.editor makes it global in the javascript file
    window.cssEditor = ace.edit("cssEditor");
    cssEditor.resize();
    cssEditor.renderer.updateFull();    
    cssEditor.setTheme("ace/theme/chaos");    
    cssEditor.getSession().setMode("ace/mode/css");    
    cssEditor.setValue(defaultCSSValue,1); //1 = moves cursor to end
    // when something changed in editor update is called
    cssEditor.getSession().on('change', function() {
        update();
    });
    // puts cursor in the editor
    cssEditor.focus();

    //htmlEditor.setOption('showLineNumbers', true);
    cssEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible:true,
        // enableBasicAutocompletion: true,
        // enableSnippets: true,
        // enableLiveAutocompletion: false
    });

    cssEditor.setShowPrintMargin(false);
    //cssEditor.setBehavioursEnabled(false);
}
function loadJSEditor() {
    defaultJSValue = "/*your js code goes here*/"
    //tells ace editor to use editor element , window.editor makes it global in the javascript file
    window.jsEditor = ace.edit("jsEditor");    
    jsEditor.setTheme("ace/theme/chaos");    
    jsEditor.getSession().setMode("ace/mode/javascript");    
    jsEditor.setValue(defaultJSValue,1); //1 = moves cursor to end
    // when something changed in editor update is called
    jsEditor.getSession().on('change', function() {
        update();
    });
    // puts cursor in the editor
    jsEditor.focus();
    
    //htmlEditor.setOption('showLineNumbers', true);
    jsEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible:true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });

    jsEditor.setShowPrintMargin(false);
    //htmlEditor.setBehavioursEnabled(false);
}
function setupEditor() {
    loadHTMLEditor();
    loadCSSEditor();
    loadJSEditor();
}
function ready() {
    setupEditor();
}

function minimize() {
    //First make Iframe height larger
    let iframe = document.getElementById("iframe");
    iframe.style.height = "98%";
    iframe.style.width = "100%";
    //Next equate all 3 editors dimensions to 0
    let htmlEditor = document.getElementById("htmlEditor");
    htmlEditor.style.height = "0%";
    htmlEditor.style.width = "0%";
    let cssEditor = document.getElementById("cssEditor");
    cssEditor.style.height = "0%";
    cssEditor.style.width = "0%";
    let jsEditor = document.getElementById("jsEditor");
    jsEditor.style.height = "0%";
    jsEditor.style.width = "0%";
    //Make editors height 5% which has labels and buttons
    let allEditors = document.getElementById("editors");
    allEditors.style.height = "5%";
    allEditors.style.width = "100%";
}
function maximize() {
    //Going in reverse order from maximizeFrame() to reset all elements to their original dimensions
    let editors = document.getElementById("editors");
    editors.style.height = "50%";
    editors.style.width = "100%";
    let htmlEditor = document.getElementById("htmlEditor");
    htmlEditor.style.height = "90%";
    htmlEditor.style.width = "32%";
    let cssEditor = document.getElementById("cssEditor");
    cssEditor.style.height = "90%";
    cssEditor.style.width = "32%";
    let jsEditor = document.getElementById("jsEditor");
    jsEditor.style.height = "90%";
    jsEditor.style.width = "32%";
    var iframe = document.getElementById("iframe");
    iframe.style.height = "50%";
    iframe.style.width = "100%";
}

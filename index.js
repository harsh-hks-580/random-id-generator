
// Vars
var reloadButton  = document.querySelector( '.reload' );
var reloadSvg     = document.querySelector( 'svg' );
var text          = document.querySelector( '.text' );
var x             = document.getElementById("snackbar");
var reloadEnabled = true;
var rotation      = 0;
var palettes      = [
  "#B3CC57",
  "#ECF081",
  "#FFBE40",
  "#EF746F",
  "#AB3E5B"
]
var currentPalette = 0;

// Events
reloadButton.addEventListener('click', function() { reloadClick() });
reloadButton.addEventListener('click', function() { generator() });
text.addEventListener('click', function() { copyToClipboard() });
text.addEventListener('click', function() { showToast() })

// Functions
function showToast() {
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
}

function copyToClipboard() {
    var selected = false;
    var el = document.createElement('textarea');
    el.value = text.innerHTML;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    if (document.getSelection().rangeCount > 0) {
        selected = document.getSelection().getRangeAt(0)
    }
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};

function generator() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    text.innerHTML = result;
}

function reloadClick() {

  reloadEnabled = false;
  rotation -= 180;

  // Eh, this works.
  reloadSvg.style.webkitTransform = 'translateZ(0px) rotateZ( ' + rotation + 'deg )';
  reloadSvg.style.MozTransform  = 'translateZ(0px) rotateZ( ' + rotation + 'deg )';
  reloadSvg.style.transform  = 'translateZ(0px) rotateZ( ' + rotation + 'deg )';

  currentPalette = currentPalette + 1;
  currentPalette = currentPalette % palettes.length;
  document.body.style.background = palettes[currentPalette];
}

// Show button.
setTimeout(function() {
  reloadButton.classList.add('active');
}, 1);

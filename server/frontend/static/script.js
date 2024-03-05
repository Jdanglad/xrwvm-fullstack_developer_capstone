
function copyToClipboard(a) {
    // Get the text field
    var text = document.getElementById(a).innerHTML;
  
    // Copy the text inside the field
    navigator.clipboard.writeText(text);
    
    // Alert the copied text
    alert("Copied to clipboard: " + text);
}

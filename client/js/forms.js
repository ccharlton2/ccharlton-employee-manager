// override default html input validation message
document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity('');
            if (!e.target.validity.valid) {
                e.target.setCustomValidity('This field cannot contain whitespace');
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity('');
        };
    }
})
document.addEventListener("DOMContentLoaded", function(event) {
  var firebase = new Firebase("https://burning-torch-249.firebaseio.com/contatos");
  var btnContato = document.getElementById("btnContato");

  btnContato.addEventListener("click", function(e) {
    var name = document.getElementById("contactName").value;
    var email = document.getElementById("contactEmail").value;
    var contact = document.getElementById("contactArea").value;

    if (name && email && contact) {
      firebase.push({
        name: name,
        email: email,
        contact: contact
      });

      document.getElementById("contactForm").innerHTML = 'Obrigado, em breve entraremos em contato!';
    }

    e.preventDefault();
  });

});

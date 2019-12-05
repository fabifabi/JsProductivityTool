
// fonction de verification du formulaire de modification d'un membre
//
function valider_modif_membre(f,test_email_double){
  // si adresse 1 est vide et adresse 2 ou  adresse 3 sont reseignée
  // Alors on envoie une alerte 
  if(document.forms["MCAformModif"].elements["MCAadr1"].value.trim() == "" && (document.forms["MCAformModif"].elements["MCAadr2"].value.trim() != "" || document.forms["MCAformModif"].elements["MCAadr3"].value.trim() != "") ) {
    // les données sont ok, on peut envoyer le formulaire 
     alert("Adresse 1 ne doit pas être vide si adresse 2 ou adresse 3 sont renseignées");
    return false;
  }
  // si adresse 2 est vide et adresse 3 est reseignée
  // Alors on envoie une alerte 
  if(document.forms["MCAformModif"].elements["MCAadr2"].value.trim() == "" && document.forms["MCAformModif"].elements["MCAadr3"].value.trim() != "") {
    // les données sont ok, on peut envoyer le formulaire 
     alert("Adresse 2 ne doit pas être vide si adresse 3 est renseignées");
    return false;
  }
  testemail = true;
  // SI le test d'email en double est activé
  if (test_email_double)
  {
  
  
  // Si l'email a été changé on test pour un eventuel doublon avec AJAX
  testemail = false;
  if (document.forms["MCAformModif"].elements["MCAorigEmail"].value.trim() != document.forms["MCAformModif"].elements["MCAemail"].value.trim())
  {
  	  // on passe JAJAX en synchrone
  jQuery.ajaxSetup({async: false});
  jQuery.post(
  		ajaxurl,
  		{
  			'action': 'mon_ajax_email_modifmembre',
  			'param': document.forms["MCAformModif"].elements["MCAemail"].value.trim()+'///'+document.forms["MCAformModif"].elements["MCAidMembre"].value.trim()
  		},
  		// reponse du serveur
  		function(response){
  				if (response == 0)
  				{
  					// l'email n'est pas en double dans la base
  					testemail = true;
            	}
            	else
            	{
            		// L'email existe déjà
            		array_rep=response.split('///');
            		alert('Cet email est déjà pris par le membre '+array_rep[1]);
            	}
        	}
        );
  jQuery.ajaxSetup({async: true});
  }
  else
  {
  	  // si l'email n'a pas été modifié on autorise la modification
  	  testemail = true;
  }
  }
  	 
    return testemail;
}

function valider_del_cotis(f,numeroCotis)
{
	if (confirm('vous souhaitez vraiment supprimer la cotisation numéro : '+numeroCotis))
	{
	return true;
	}
	return false;
}



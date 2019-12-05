function menscotverifPayForm(f)
{

   if(document.forms["mensacot_paye_form"].elements["select_mensa_cotisation_tarif"].value=="" )
   {   	   
   	   alert("Veuillez choisir un tarif pour le renouvellement de votre cotisation");

      return false;
   }
    var s2 = document.forms["mensacot_paye_form"].elements["select_mensa_cotisation_tarif"].value;
	var ss2 = s2.split("/&/");
	var ss3 = document.forms["mensacot_paye_form"].elements["custom"].value;
	 document.forms["mensacot_paye_form"].elements["amount"].value=ss2[0];
	 document.forms["mensacot_paye_form"].elements["item_name"].value="renouvellement de cotisation : "+ss2[1]+" pour le membre "+ss3;
      return true;


}
function menscotAlertPayForm()
{
	var s = document.forms["mensacot_paye_form"].elements["select_mensa_cotisation_tarif"].value;
	var ss = s.split("/&/");
	if (ss[2])
	{
		alert(ss[2]);
		return true;
	}
	return true;
}

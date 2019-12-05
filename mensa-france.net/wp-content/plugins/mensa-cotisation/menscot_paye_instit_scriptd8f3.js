function menscotverifInstitPayForm(menscot_instit_prix,menscot_instit_libelle)
{
	var menscot_lib = "";
	var test_check = false;
	if(document.getElementById("menscot_renou").checked)
	{
		if(!document.getElementById("renou_memb").value.trim())
		{
			alert('Vous devez indiquer votre numéro de membre');
			return;
		}
		 document.getElementById("menscot_custom").value = document.getElementById("renou_memb").value;
		 menscot_lib = 'Renouvellement de cotisation : '+ menscot_instit_libelle + ' pour le membre : '+ document.getElementById("renou_memb").value;
		test_check = true;
	}
	if(document.getElementById("menscot_nouv").checked)
	{
		menscot_lib = 'Nouvel adhérant : '+ menscot_instit_libelle;
		test_check = true;
	}
	if(document.getElementById("menscot_read").checked)
	{
		if(!document.getElementById("read_memb").value.trim())
		{
			alert('Vous devez indiquer votre ancien numéro de membre ou, à défault, 0000');
			return;
		}
		document.getElementById("menscot_custom").value = document.getElementById("read_memb").value;
		menscot_lib = 'Ré-adhésion : '+ menscot_instit_libelle + ' pour le membre dont l\'ancien numéro était : '+ document.getElementById("read_memb").value;
		test_check = true;
	}
	if(!test_check)
	{
		alert('Vous devez choisir entre : renouvellement de cotisation,adhésion ou ré-adhésion');
		return;
	}



	document.getElementById("menscot_instit_amount").value = menscot_instit_prix;
	 
	document.getElementById("menscot_instit_item_name").value = menscot_lib;
	 
	 document.getElementById("mensacot_instit_paye_form").submit();
      return true;


}

/*
Robert Warren
Term 1308
AVF
I Owe, I Owe * Bill List
*/


function onDeviceReady() {
	
	$('#add').on('pageinit', function(getForm) {
		var billForm = $('#addBill');
		console.log(billForm);
		billForm.validate({
			invalidHandler: function(billForm, validator) {},
			submitHandler: function(key) {
				var data = billForm.serializeArray();
				getForm(key, data);
			}
		});
	});	
	
	$('#infoPage').on('pageinit', function() {
		var dCord = device.cordova;
		var dPlat = device.platform;
		var du = device.uuid;
		var dMod = device.model;
		var dVer = device.version;
		$('#devInfo').html( 'Device Cordova: '  + dCord + '<br>' + 
							'Device Platform: ' + dPlat + '<br>' + 
							'Device UUID: '     + du + '<br>' + 
							'Device Model: '    + dMod + '<br>' + 
							'Device Version: '  + dVer + '<br>' + 
							'<center><img class = icon src = "img/' + dPlat + '.png"/></center>');
	});

	//any other code needed onDeveice Ready Goes Here.
} 	// phonegap deviceready

var edit = document.getElementById("saveMe");
var makeEdits = "";
var runDelete = "";
var pd = "";
var paymentValue = "";
var paidValue = "";
var onTime = "";
var late = "";
var lateFee = "";
var sampleBills = "";
var resetMe = document.getElementById("resetMe");;
var i = "";
var l = "";
var dLink = document.getElementById("displayLink");; 
var key = (Math.floor(Math.random() * 1000000001));
var clearBill = document.getElementById("resetMe");
var localClear = document.getElementById("clearAllData");
var saveSuccess = "Your Bill Is Saved!";
var radioSelected = document.forms[0].status;
var createButtons = function(key, buttons) {
		var editButton = document.createElement("input");
		editButton.setAttribute("type", "button");
		editButton.setAttribute("value", "Edit Bill");
		editButton.setAttribute("id", "editBill");
		editButton.href = "#add";
		editButton.key = key;
		editButton.addEventListener("click", makeEdits);
		buttons.appendChild(editButton);
		var pageBreak = document.createElement("br");
		buttons.appendChild(pageBreak);
		var delButton = document.createElement("input");
		delButton.setAttribute("type", "button");
		delButton.setAttribute("value", "Delete Bill");
		delButton.setAttribute("id", "delBill");
		delButton.href = "#";
		delButton.key = key;
		var delText = "Delete Bill";
		delButton.addEventListener("click", runDelete);
		delButton.innerHTML = delText;
		buttons.appendChild(delButton);
};	



var howPaid = function() {
	var paidWith = document.getElementById("pdwith");
	if (status - pd.checked) {
		paymentValue = paidWith.value;
	} else {
		paymentValue = "N/A";
	}
};
var getSelectedRadio = function() {
	for (i = 0; i < radioSelected.length; i++) {
		if (radioSelected[i].checked) {
			paidValue = radioSelected[i].value;
		}
	}
	return paidValue;
};
var getCheckBoxOnTime = function() {
	if (document.getElementById('ontime').checked) {
		onTime = document.getElementById('ontime').value;
	} else {
		onTime = "N/A";
	}
};
var getCheckBoxLate = function() {
	if (document.getElementById('late').checked) {
		late = document.getElementById('late').value;
	} else {
		late = "N/A";
	}
};
var getCheckBoxLateFee = function() {
	if (document.getElementById('lfee').checked) {
		lateFee = document.getElementById('lfee').value;
	} else {
		lateFee = "N/A";
	}
};
var editAdd = function() {
		window.location = '#add';
};
var makeEdits = function() {
	editAdd();
	var value = localStorage.getItem(this.key);
	var recallData = JSON.parse(value);
	document.getElementById("btype").value = recallData.btype[1];
	document.getElementById("bname").value = recallData.bname[1];
	document.getElementById("amt").value = recallData.amt[1];
	document.getElementById("prio").value = recallData.prio[1];
	document.getElementById("due").value = recallData.due[1];
	document.getElementById("freqs").value = recallData.freqs[1];
	for (i = 0; i < radioSelected.length; i++) {
		if (radioSelected[i].value == recallData.pd[1]) {
			radioSelected[i].setAttribute("checked", "checked");
		}
	}
	document.getElementById("pdwith").value = recallData.pdwith[1];
	if (recallData.ontime[1] == "On Time") {
		document.getElementById("ontime").setAttribute("checked", "checked");
	}
	if (recallData.late[1] == "Late") {
		document.getElementById("late").setAttribute("checked", "checked");
	}
	if (recallData.lfee[1] == "Late Fee") {
		document.getElementById("lfee").setAttribute("checked", "checked");
	}
	document.getElementById("textArea").value = recallData.textArea[1];
	$('#saveMe').prev('.ui-btn-inner').children('.ui-btn-text').html('Update Me');
	key = this.key;
	return key;
};
var loadImg = function(billImg, newSub) {
	var img = document.createElement("li");
	newSub.appendChild(img);
	var insertImg = document.createElement("img");
	var imgSize = insertImg.setAttribute("id", "billImg");
	var imgSz = insertImg.setAttribute("class", "billImg");
	var setImg = insertImg.setAttribute("src", "img/" + billImg + ".jpg");
	img.appendChild(insertImg);
};
var cleanHouse = function() {
	if (localStorage.length === 0) {
		alert("There is no data to clear!!");
	} else {
		localStorage.clear();
		alert("All bills are deleted");
		window.location.reload();
	}
	return false;
};
//var autofillData = function (){};
var getSampleBills = function() {
	for (var n in sampleBills) {
		var id = (Math.floor(Math.random() * 1000000001));
		localStorage.setItem(id, JSON.stringify(sampleBills[n]));
	}
};
//var getData = function(){};
var getBill = function() {
	//window.location='#view';
	if (localStorage.length === 0) {
		getSampleBills();
		alert("There is no data to view. Sample Data has been added.");
	}
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "bill");
	var newList = document.createElement("ul");
	newDiv.appendChild(newList);
	document.getElementById("display").appendChild(newDiv);
	newDiv.appendChild(newList);
	document.getElementById("display").style.display = "block";
	for (i = 0, l = localStorage.length; i < l; i++) {
		var newItem = document.createElement("li");
		var buttons = document.createElement("li");
		newList.appendChild(newItem);
		var category = localStorage.key(i);
		var value = localStorage.getItem(category);
		var totalData = JSON.parse(value);
		var newSub = document.createElement("ul");
		newItem.appendChild(newSub);
		loadImg(totalData.btype[1], newSub);
		for (var d in totalData) {
			var newSubList = document.createElement("li");
			newSub.appendChild(newSubList);
			var insertText = totalData[d][0] + " " + totalData[d][1];
			newSubList.innerHTML = insertText;
			newSub.appendChild(buttons);
		}
		createButtons(localStorage.key(i), buttons);
	}
};

var getForm = function() {
	var id = key;
	getSelectedRadio();
	howPaid();
	getCheckBoxOnTime();
	getCheckBoxLate();
	getCheckBoxLateFee();
	var item = {};
		console.log(item);
		item.btype = ["Bill Type: ", document.getElementById("btype").value];
		item.bname = ["Bill Name: ", document.getElementById("bname").value];
		item.prio = ["Bill Priority: ", document.getElementById("prio").value];
		item.amt = ["Bill Amount: $", document.getElementById("amt").value];
		item.due = ["Bill Due Date: ", document.getElementById("due").value];
		item.freqs = ["Bill Frequency: ", document.getElementById("freqs").value];
		item.pd = ["Paid: ", paidValue];
	 	item.pdwith = ["Paid with: ", paymentValue];
	 	item.ontime = ["On time?: ", onTime];   		 	
	 	item.late = ["Late?: ", late];
	 	item.lfee = ["Late Fee?: ", lateFee];
	 	item.textArea = ["Comments: ", document.getElementById("textArea").value];
	localStorage.setItem(id, JSON.stringify(item));
	alert(saveSuccess);
 	//edit.setAttribute("type", "reset"); 
 	window.location.reload(); 
	return getForm;
};

//var	deleteItem = function (){};
var runDelete = function() {
	var verify = confirm("Are you sure you want to delete this bill. This can not be undone.");
	if (verify) {
		localStorage.removeItem(this.key);
		alert("Bill was deleted");
		window.location = '#add';
		window.location.reload();
	} else {
		alert("No changes have been made.");
	}
};
//var clearLocal = function(){};
var clearAll = function() {
	var areYouSure = confirm("Are you sure you want to clear the form and start over?");
	if (areYouSure) {
		resetMe.setAttribute("type", "reset");
		alert("Form was reset.");
	} else {
		alert("No changes were made to your input.");
	}
	return clearAll;
};
 
var iabRef = null;
function iabLoadStart(event) {
    alert(event.type + ' - ' + event.url);
}

function iabLoadStop(event) {
    alert(event.type + ' - ' + event.url);
}

function iabClose(event) {
     alert(event.type);
     iabRef.removeEventListener('loadstart', iabLoadStart);
     iabRef.removeEventListener('loadstop', iabLoadStop);
     iabRef.removeEventListener('exit', iabClose);
}
 
document.addEventListener("deviceready", onDeviceReady, false);
dLink.addEventListener("click", getBill);
edit.addEventListener("click", getForm);
clearBill.addEventListener("click", clearAll);
localClear.addEventListener("click", cleanHouse);
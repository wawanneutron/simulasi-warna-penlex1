/* Fungsi untuk mengganti Warna pada preview 
function changeColor(color, title_color) {
document.getElementById('preview').style.backgroundColor = color;
document.getElementById('title').innerHTML = title_color;
} */

/* Fungsi test  */
function test() {
	alert("HELL YEAH!!!");
}

/* Fungsi untuk mencari suatu warna berdasarkan dengan ID tertentu.
 * Hasil dari fungsi ini berupa kode suatu warna.
 */
function searchColor(tagID) {
	var val = document.getElementById(tagID).value;
	return val;
}

/* Fungsi untuk input data dengan enter. */
function searchKeyPress(e, tagID, txtBox, minLength) {
	// look for window.event in case event isn't passed in
	if (typeof e == 'undefined' && window.event) {
		e = window.event;
	}
	// keyCode untuk tombol 'ENTER' adalah 13
	if (e.keyCode == 13) {
		var pjg_data = txtBox.value.length;
		// Jika panjang data kurang dari 4 maka tidak diproses.
		if (pjg_data >= minLength) {
			// tombol enter akan men-trigger fungsi onClick
			document.getElementById(tagID).click();
		} else {
			alert("Data minimal " + minLength + " karakter");
		}
	}
}

/* Fungsi untuk reset Color Object. */
function resetColor() {
	changeColorKiri('#faf7f2');
	changeColor('#faf7f2');
	changeColorAtas('#faf7f2');
}

/* ================= Ubah Preview Color ========================== */

/* Fungsi untuk mengganti Warna Preview Color pada Object Kiri */
function previewColorKiri(color, nama, kode) {
	document.getElementById('focus_color_kiri').style.backgroundColor = color;
	document.getElementById('nama_color_kiri').innerHTML = nama;
	document.getElementById('kode_color_kiri').innerHTML = kode;
}

/* Fungsi untuk mengganti Warna Preview Color pada Object Atap */
function previewColorAtap(color, nama, kode) {
	document.getElementById('focus_color_atap').style.backgroundColor = color;
	document.getElementById('nama_color_atap').innerHTML = nama;
	document.getElementById('kode_color_atap').innerHTML = kode;
}

/* Fungsi untuk mengganti Warna Preview Color pada Object Atap */
function previewColorKanan(color, nama, kode) {
	document.getElementById('focus_color_kanan').style.backgroundColor = color;
	document.getElementById('nama_color_kanan').innerHTML = nama;
	document.getElementById('kode_color_kanan').innerHTML = kode;
}

/* ================= End of Ubah Preview Color ====================== */

/* Fungsi Test2 untuk ambil value dari combobox dan menampilkan pada Dialog Alert */
function returnValue(element) {
	var option_user_selection = element.options[element.selectedIndex].text;
	if (option_user_selection == 'ParagonPremium') {
		//fade('img_paragon_prem');
		document.getElementById('img_paragon').style.display = 'none';
		document.getElementById('img_paragon_prem').style.display = 'block';
	} else if (option_user_selection == 'Paragon') {
		//fade('img_paragon');
		document.getElementById('img_paragon').style.display = 'block';
		document.getElementById('img_paragon_prem').style.display = 'none';
	}

	return option_user_selection;
}

/* Fungsi untuk mengganti Warna Background pada tag <SELECT> */
function changeBG(color) {
	document.getElementById('select').style.backgroundColor = color;
	document.getElementById('select').style.color = 'white';
}

/* Fungsi untuk membuat border pada suatu tag dengan ID tertentu  */
function changeBorder(tagId) {
	document.getElementById(tagId).style.border = '5px red solid';
}

/* Fungsi untuk membuat visible-invisible pada form Tambah Warna */
function visible(isVisible) {
	if (isVisible == 'TRUE') {
		document.getElementById('add_form').style.display = 'block';
		document.getElementById('add_btn').style.display = 'none';
		document.getElementById('batal_btn').style.display = 'block';
	} else if (isVisible == 'FALSE') {
		document.getElementById('add_form').style.display = 'none';
		document.getElementById('batal_btn').style.display = 'none';
		document.getElementById('add_btn').style.display = 'block';
	}

}

// create the XMLHttpRequest object, according browser
function get_XmlHttp() {
	// create the variable that will contain the instance of the XMLHttpRequest object (initially with null value)
	var xmlHttp = null;

	if (window.XMLHttpRequest) { // for Forefox, IE7+, Opera, Safari, ...
		xmlHttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // for Internet Explorer 5 or 6
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	return xmlHttp;
}

// sends data to a php file, via POST, and displays the received answer
function ajaxrequest(php_file, tagID, idColor) {
	var request = get_XmlHttp(); // call the function for the XMLHttpRequest instance

	// create pairs index=value with data that must be sent to server
	var the_data = 'data=' + idColor; //document.getElementById('txt2').innerHTML;

	request.open("POST", php_file, true); // set the request

	// adds  a header to tell the PHP script to recognize the data as is sent via POST
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(the_data); // calls the send() method with datas as parameter

	// Check request status
	// If the response is received completely, will be transferred to the HTML tag with tagID
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			document.getElementById(tagID).innerHTML = request.responseText;
		}
	}
}

// Fungsi untuk mengubah warna dari warna asli ke warna RGB.
function HexToRGB(Hex) {
	var Long = parseInt(Hex.replace(/^#/, ""), 16);
	return {
		R: (Long >>> 16) & 0xff,
		G: (Long >>> 8) & 0xff,
		B: Long & 0xff
	};
}

// ###################### Image KANAN #########################		
var objek = document.getElementById("pic_kanan");
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var originalPixels = null;
var currentPixels = null;

function changeColor(selectedColor) {
	if (!originalPixels) return; // Check if image has loaded
	var newColor = HexToRGB(selectedColor);

	for (var I = 0, L = originalPixels.data.length; I < L; I += 4) {
		if (currentPixels.data[I + 3] > 0) {
			currentPixels.data[I] = originalPixels.data[I] / 255 * newColor.R;
			currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * newColor.G;
			currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * newColor.B;
		}
	}

	ctx.putImageData(currentPixels, 0, 0);
	objek.src = canvas.toDataURL("image/png");
}

function getPixelsKanan(img) {
	canvas.width = img.width;
	canvas.height = img.height;

	ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
	originalPixels = ctx.getImageData(0, 0, img.width, img.height);
	currentPixels = ctx.getImageData(0, 0, img.width, img.height);

	img.onload = null;
}

// ###################### Image KIRI #########################
var objekKiri = document.getElementById("pic_kiri");
var canvasKiri = document.createElement("canvas");
var ctxKiri = canvasKiri.getContext("2d");
var originalPixelsKiri = null;
var currentPixelsKiri = null;

function changeColorKiri(selectedColor) {
	if (!originalPixelsKiri) return; // Check if image has loaded
	var newColor = HexToRGB(selectedColor);

	for (var I = 0, L = originalPixelsKiri.data.length; I < L; I += 4) {
		if (currentPixelsKiri.data[I + 3] > 0) {
			currentPixelsKiri.data[I] = originalPixelsKiri.data[I] / 255 * newColor.R;
			currentPixelsKiri.data[I + 1] = originalPixelsKiri.data[I + 1] / 255 * newColor.G;
			currentPixelsKiri.data[I + 2] = originalPixelsKiri.data[I + 2] / 255 * newColor.B;
		}
	}

	ctxKiri.putImageData(currentPixelsKiri, 0, 0);
	objekKiri.src = canvasKiri.toDataURL("image/png");
}

function getPixelsKiri(img) {
	canvasKiri.width = img.width;
	canvasKiri.height = img.height;

	ctxKiri.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
	originalPixelsKiri = ctxKiri.getImageData(0, 0, img.width, img.height);
	currentPixelsKiri = ctxKiri.getImageData(0, 0, img.width, img.height);

	img.onload = null;
}

// ###################### Image ATAS #########################
var objekAtas = document.getElementById("pic_atap");
var canvasAtas = document.createElement("canvas");
var ctxAtas = canvasAtas.getContext("2d");
var originalPixelsAtas = null;
var currentPixelsAtas = null;

function changeColorAtas(selectedColor) {
	if (!originalPixelsAtas) return; // Check if image has loaded
	var newColor = HexToRGB(selectedColor);

	for (var I = 0, L = originalPixelsAtas.data.length; I < L; I += 4) {
		if (currentPixelsAtas.data[I + 3] > 0) {
			currentPixelsAtas.data[I] = originalPixelsAtas.data[I] / 255 * newColor.R;
			currentPixelsAtas.data[I + 1] = originalPixelsAtas.data[I + 1] / 255 * newColor.G;
			currentPixelsAtas.data[I + 2] = originalPixelsAtas.data[I + 2] / 255 * newColor.B;
		}
	}

	ctxAtas.putImageData(currentPixelsAtas, 0, 0);
	objekAtas.src = canvasAtas.toDataURL("image/png");
}

function getPixelsAtas(img) {
	canvasAtas.width = img.width;
	canvasAtas.height = img.height;

	ctxAtas.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
	originalPixelsAtas = ctxAtas.getImageData(0, 0, img.width, img.height);
	currentPixelsAtas = ctxAtas.getImageData(0, 0, img.width, img.height);

	img.onload = null;
}
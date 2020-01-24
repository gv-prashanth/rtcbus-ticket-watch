$('#identify').mousedown(function(e) {
	if (validateEmail(document.getElementById("input5").value))
		identify();
});

var jsonResponse;

function identify() {
	document.getElementById("notification4").innerHTML = "Creating Request. Please wait...";
	var xmlhttp = new XMLHttpRequest(); // new HttpRequest
	// instance

	var e = document.getElementById("input1");
	var input1 = e.options[e.selectedIndex].value;
	var f = document.getElementById("input2");
	var input2 = f.options[f.selectedIndex].value;
	var g = document.getElementById("input3");
	var input3 = g.options[g.selectedIndex].value;
	var input4 = document.getElementById("input4").value;
	var input5 = document.getElementById("input5").value;

	xmlhttp.open("POST", "/request");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("notification4").innerHTML = "Request Created";
			fetch();
		}
	};
	var jsonRequest = {
		"startPlaceId" : input1,
		"endPlaceId" : input2,
		"journeyDate" : input4,
		"corporation" : input3,
		"email" : input5
	};
	xmlhttp.send(JSON.stringify(jsonRequest));
}

function fetch() {
	document.getElementById("notification3").innerHTML = "Fetching all active requests. Please wait...";
	var xmlhttp = new XMLHttpRequest(); // new HttpRequest
	// instance

	xmlhttp.open("GET", "/request");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resp = JSON.parse(this.responseText);
			printResp(resp);
		}
	};
	xmlhttp.send();
}

function printResp(resp) {
	if (resp.length > 0) {
		document.getElementById("notification3").innerHTML = "<table id='tbl' border=1 width='100%'></table>";
		tbl = document.getElementById('tbl');
		addHeader(tbl, "From", "To", "Journey Date", "Corporation", "Action");
		for (var i = 0; i < resp.length; i++) {
			addRow(tbl, getNameFromId(resp[i].startPlaceId),
					getNameFromId(resp[i].endPlaceId), resp[i].journeyDate,
					resp[i].corporation, "<button onclick=deleteRequest('"+JSON.stringify(resp[i])+"')>DELETE</button>");
		}
	} else {
		document.getElementById("notification3").innerHTML = "There are no active requests.";
	}

}

function deleteRequest(resp){
	var xmlhttp = new XMLHttpRequest(); // new HttpRequest
	xmlhttp.open("DELETE", "/request");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		document.getElementById("notification4").innerHTML = "Request Deleted";
		fetch();
	};
	xmlhttp.send(resp);
}

function getNameFromId(id) {
	for (var i = 0; i < jsondata.length; i++) {
		if (jsondata[i].id == id) {
			return jsondata[i].value;
		}
	}
}

function addCell(tr, val) {
	var td = document.createElement('td');

	td.innerHTML = val;

	tr.appendChild(td)
}

function addRow(tbl, val_1, val_2, val_3, val_4, val_5) {
	var tr = document.createElement('tr');

	addCell(tr, val_1);
	addCell(tr, val_2);
	addCell(tr, val_3);
	addCell(tr, val_4);
	addCell(tr, val_5);

	tbl.appendChild(tr)
}

function addHeader(tbl, val_1, val_2, val_3, val_4, val_5) {
	var tr = document.createElement('tr');

	addCellHeader(tr, val_1);
	addCellHeader(tr, val_2);
	addCellHeader(tr, val_3);
	addCellHeader(tr, val_4);
	addCellHeader(tr, val_5);

	tbl.appendChild(tr)
}

function addCellHeader(tr, val) {
	var th = document.createElement('th');

	th.innerHTML = val;

	tr.appendChild(th)
}

function populateFromTo() {
	fromSelect = document.getElementById('input1');
	for (var i = 0; i < jsondata.length; i++) {
		fromSelect.options[fromSelect.options.length] = new Option(
				jsondata[i].value, jsondata[i].id);
	}
	toSelect = document.getElementById('input2');
	for (var i = 0; i < jsondata.length; i++) {
		toSelect.options[toSelect.options.length] = new Option(
				jsondata[i].value, jsondata[i].id);
	}
}

function validateEmail(emailField) {
	var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

	if (!emailField.match(reEmail)) {
		alert("Invalid email address");
		return false;
	}

	if (document.getElementById("input4").value == '') {
		alert("Invalid Date");
		return false;
	}

	return true;

}

var jsondata = [ {
	"id" : "22973",
	"value" : "10th MILE STONE"
},

{
	"id" : "23332",
	"value" : "3 INCLINE"
},

{
	"id" : "1",
	"value" : "5INCLINE"
},

{
	"id" : "11",
	"value" : "8INCLINE COLONY"
},

{
	"id" : "22984",
	"value" : "A P HOUSE GDK"
},

{
	"id" : "21",
	"value" : "AAKIVEEDU"
},

{
	"id" : "31",
	"value" : "AAKUTHOTAPALLY"
},

{
	"id" : "23402",
	"value" : "AALHARVI"
},

{
	"id" : "41",
	"value" : "ABBAIPALEM"
},

{
	"id" : "61",
	"value" : "ACCOM-AC-HYT"
},

{
	"id" : "71",
	"value" : "ACCOM-N AC-HYT"
},

{
	"id" : "81",
	"value" : "ACHAMPET"
},

{
	"id" : "23164",
	"value" : "ACHANTA"
},

{
	"id" : "1388831439417",
	"value" : "ACHUTAPURAM"
},

{
	"id" : "1438257149142",
	"value" : "ADA"
},

{
	"id" : "121",
	"value" : "ADDA ROAD"
},

{
	"id" : "131",
	"value" : "ADDAGUDUR/MTK"
},

{
	"id" : "141",
	"value" : "ADDANKI"
},

{
	"id" : "23131",
	"value" : "ADDAROAD/N K PALLI"
},

{
	"id" : "151",
	"value" : "ADDATEEGALA"
},

{
	"id" : "161",
	"value" : "ADILABAD"
},

{
	"id" : "1392659619687",
	"value" : "ADIVARAPU PET"
},

{
	"id" : "171",
	"value" : "ADONI"
},

{
	"id" : "23461",
	"value" : "ADSARLAPADU"
},

{
	"id" : "21301",
	"value" : "AFZALPUR"
},

{
	"id" : "22977",
	"value" : "AGIRIPALLI"
},

{
	"id" : "23096",
	"value" : "AGRAHARAM"
},

{
	"id" : "21311",
	"value" : "AHMEDNAGAR"
},

{
	"id" : "19311",
	"value" : "AHMEDPUR"
},

{
	"id" : "201",
	"value" : "AHOBHILAM"
},

{
	"id" : "1388063388797",
	"value" : "AHOBHILAM PACKAGE"
},

{
	"id" : "211",
	"value" : "AJILAPUR"
},

{
	"id" : "19321",
	"value" : "AKALKOT"
},

{
	"id" : "1370280300453",
	"value" : "AKIVEEDU BVRM"
},

{
	"id" : "241",
	"value" : "AKOLA/MSRTC"
},

{
	"id" : "251",
	"value" : "AKRIPALLY"
},

{
	"id" : "261",
	"value" : "ALAKAPURI"
},

{
	"id" : "271",
	"value" : "ALAMPUR"
},

{
	"id" : "281",
	"value" : "ALAMPUR X RD"
},

{
	"id" : "291",
	"value" : "ALAMURU"
},

{
	"id" : "21331",
	"value" : "ALAND"
},

{
	"id" : "1388552980163",
	"value" : "ALANKHAN PALLY"
},

{
	"id" : "301",
	"value" : "ALAPADU"
},

{
	"id" : "23095",
	"value" : "ALAVALAPADU"
},

{
	"id" : "23047",
	"value" : "ALAVAPADU"
},

{
	"id" : "23218",
	"value" : "ALERU"
},

{
	"id" : "22966",
	"value" : "ALETU"
},

{
	"id" : "19331",
	"value" : "ALLADURG"
},

{
	"id" : "321",
	"value" : "ALLAGADDA"
},

{
	"id" : "23308",
	"value" : "ALLAVARAM"
},

{
	"id" : "1368622649214",
	"value" : "ALLUR"
},

{
	"id" : "331",
	"value" : "ALLURU"
},

{
	"id" : "21341",
	"value" : "ALMER"
},

{
	"id" : "21351",
	"value" : "ALNAVAR"
},

{
	"id" : "351",
	"value" : "ALUBAKA"
},

{
	"id" : "361",
	"value" : "ALURU"
},

{
	"id" : "1455350462429",
	"value" : "AMADALAVALASA"
},

{
	"id" : "381",
	"value" : "AMALAPURAM"
},

{
	"id" : "21361",
	"value" : "AMANGAL"
},

{
	"id" : "391",
	"value" : "AMARAPURAM"
},

{
	"id" : "22792",
	"value" : "AMARAVARAM"
},

{
	"id" : "19341",
	"value" : "AMARAVATHI-MH"
},

{
	"id" : "401",
	"value" : "AMARAVATI(GNT)"
},

{
	"id" : "21371",
	"value" : "AMARESWARI CAMP"
},

{
	"id" : "23065",
	"value" : "AMBAGUDA"
},

{
	"id" : "411",
	"value" : "AMBAJIPET"
},

{
	"id" : "421",
	"value" : "AMBAVARAM"
},

{
	"id" : "461",
	"value" : "AMMANABOLE"
},

{
	"id" : "471",
	"value" : "AMMAPUR/ATK"
},

{
	"id" : "23388",
	"value" : "AMMAVARI PADALU"
},

{
	"id" : "481",
	"value" : "AMMIYAR KUPPAM"
},

{
	"id" : "1516641644743",
	"value" : "AMUDALA VALASA "
},

{
	"id" : "1429657313119",
	"value" : "ANAKAPALLY"
},

{
	"id" : "23406",
	"value" : "ANAKAPALLY MAIN ROAD"
},

{
	"id" : "521",
	"value" : "ANANDBAGH"
},

{
	"id" : "531",
	"value" : "ANANDHA KHANI"
},

{
	"id" : "541",
	"value" : "ANANTA SAGARAM"
},

{
	"id" : "1515544906635",
	"value" : "ANANTAGIRI TEMPLE"
},

{
	"id" : "551",
	"value" : "ANANTAPUR"
},

{
	"id" : "561",
	"value" : "ANANTHAGIRI -ARAKU"
},

{
	"id" : "1529722269432",
	"value" : "ANANTHAGIRI HILLS "
},

{
	"id" : "1388063290217",
	"value" : "ANANTHAGIRI PACKAGE"
},

{
	"id" : "571",
	"value" : "ANANTHAPALLY"
},

{
	"id" : "581",
	"value" : "ANANTHAVARAM"
},

{
	"id" : "591",
	"value" : "ANAPARTHI"
},

{
	"id" : "22731",
	"value" : "ANATHASAGARAM"
},

{
	"id" : "601",
	"value" : "ANATHAVARAM"
},

{
	"id" : "611",
	"value" : "ANDOLE"
},

{
	"id" : "621",
	"value" : "ANGALLO-MPL"
},

{
	"id" : "23057",
	"value" : "ANGARA"
},

{
	"id" : "631",
	"value" : "ANKALAMMA GUDUR"
},

{
	"id" : "21381",
	"value" : "ANKOLE"
},

{
	"id" : "19361",
	"value" : "ANMOD"
},

{
	"id" : "641",
	"value" : "ANNADEVARAPETA"
},

{
	"id" : "661",
	"value" : "ANNARAM"
},

{
	"id" : "671",
	"value" : "ANNASAMUDRAM PET"
},

{
	"id" : "681",
	"value" : "ANNAVARAM"
},

{
	"id" : "691",
	"value" : "ANTHAMPET"
},

{
	"id" : "21391",
	"value" : "AP BORDER"
},

{
	"id" : "701",
	"value" : "AP CHECKPOST"
},

{
	"id" : "731",
	"value" : "APPANAPALLI"
},

{
	"id" : "1374909546793",
	"value" : "APPAPURAM"
},

{
	"id" : "1418289495131",
	"value" : "APPIKATLA"
},

{
	"id" : "23292",
	"value" : "ARAKKONAM"
},

{
	"id" : "761",
	"value" : "ARAKU"
},

{
	"id" : "1388062895578",
	"value" : "ARAKU PACKAGE"
},

{
	"id" : "23419",
	"value" : "ARAKUVALLEY"
},

{
	"id" : "22970",
	"value" : "ARAMBAKKAM"
},

{
	"id" : "781",
	"value" : "ARASAVILLI"
},

{
	"id" : "19371",
	"value" : "ARDHAPUR"
},

{
	"id" : "791",
	"value" : "ARMOOR"
},

{
	"id" : "801",
	"value" : "ARNAKONDA"
},

{
	"id" : "1388403520322",
	"value" : "ARUKU DARSHINI"
},

{
	"id" : "23253",
	"value" : "ASCENDAS IT PARK"
},

{
	"id" : "851",
	"value" : "ASIFABAD"
},

{
	"id" : "871",
	"value" : "ASIFABAD X RD"
},

{
	"id" : "23472",
	"value" : "ASIFNAGAR"
},

{
	"id" : "23473",
	"value" : "ASMANGHAD"
},

{
	"id" : "901",
	"value" : "ASPERI"
},

{
	"id" : "931",
	"value" : "ASWAPURAM"
},

{
	"id" : "941",
	"value" : "ASWARAOPET"
},

{
	"id" : "21401",
	"value" : "ATHNUR"
},

{
	"id" : "951",
	"value" : "ATMAKUR (K)"
},

{
	"id" : "971",
	"value" : "ATMAKUR (N)"
},

{
	"id" : "961",
	"value" : "ATMAKUR M"
},

{
	"id" : "981",
	"value" : "ATMAKUR(ATP)"
},

{
	"id" : "1441890200537",
	"value" : "ATPADI"
},

{
	"id" : "1001",
	"value" : "ATTILI"
},

{
	"id" : "1422666429476",
	"value" : "ATTLURU"
},

{
	"id" : "19381",
	"value" : "AURAD"
},

{
	"id" : "19391",
	"value" : "AURANGABAD"
},

{
	"id" : "1031",
	"value" : "AVANIGADDA"
},

{
	"id" : "22891",
	"value" : "AVINASI"
},

{
	"id" : "1041",
	"value" : "B-ZONE"
},

{
	"id" : "1051",
	"value" : "B.GUDUR"
},

{
	"id" : "23070",
	"value" : "B.J.GUDEM"
},

{
	"id" : "23289",
	"value" : "B.K.K BAZAR STREET"
},

{
	"id" : "23290",
	"value" : "B.K.K R.S.M ROAD"
},

{
	"id" : "1061",
	"value" : "B.KOTHA KOTA"
},

{
	"id" : "23263",
	"value" : "B.NIDAMANURU"
},

{
	"id" : "1368859666454",
	"value" : "B2B FRANCHISE"
},

{
	"id" : "1399995683579",
	"value" : "B2C FRANCHISE"
},

{
	"id" : "1081",
	"value" : "BACHAPURAM"
},

{
	"id" : "23097",
	"value" : "BACHELI"
},

{
	"id" : "1091",
	"value" : "BACHEPALLY"
},

{
	"id" : "20751",
	"value" : "BACHOLI"
},

{
	"id" : "1101",
	"value" : "BADARALA"
},

{
	"id" : "1121",
	"value" : "BADVEL"
},

{
	"id" : "21421",
	"value" : "BAGALKOT"
},

{
	"id" : "21431",
	"value" : "BAGALUR"
},

{
	"id" : "1131",
	"value" : "BAGEPALLY X RD"
},

{
	"id" : "1161",
	"value" : "BAI REDDY PALLY"
},

{
	"id" : "16471",
	"value" : "BAILDILLA"
},

{
	"id" : "1171",
	"value" : "BAKARAMPET C-TPT"
},

{
	"id" : "1181",
	"value" : "BAKARAMPET T-KDP"
},

{
	"id" : "1422666353456",
	"value" : "BAKARAPET"
},

{
	"id" : "1375189183233",
	"value" : "BALADA"
},

{
	"id" : "1191",
	"value" : "BALAIAHPALLY"
},

{
	"id" : "1221",
	"value" : "BALAPANUR"
},

{
	"id" : "23279",
	"value" : "BALARAJUPALLY"
},

{
	"id" : "20821",
	"value" : "BALASORE"
},

{
	"id" : "1231",
	"value" : "BALIJAKANDRIGA"
},

{
	"id" : "21441",
	"value" : "BALKI"
},

{
	"id" : "1241",
	"value" : "BALKONDA"
},

{
	"id" : "19401",
	"value" : "BALLARSHA"
},

{
	"id" : "20831",
	"value" : "BALUGAON"
},

{
	"id" : "1251",
	"value" : "BANAGANAPALLY"
},

{
	"id" : "19411",
	"value" : "BANDERA"
},

{
	"id" : "1429657902499",
	"value" : "BANGALORE"
},

{
	"id" : "23031",
	"value" : "BANGARIGADDA"
},

{
	"id" : "22999",
	"value" : "BANGARUPALEM"
},

{
	"id" : "22990",
	"value" : "BANGARUPALYEM"
},

{
	"id" : "1271",
	"value" : "BANJAAR"
},

{
	"id" : "21451",
	"value" : "BANJAR"
},

{
	"id" : "21471",
	"value" : "BANNUR"
},

{
	"id" : "1291",
	"value" : "BANSWADA"
},

{
	"id" : "1301",
	"value" : "BANSWADA X RD"
},

{
	"id" : "1311",
	"value" : "BANTARIAM"
},

{
	"id" : "1321",
	"value" : "BANTUMILLI"
},

{
	"id" : "1331",
	"value" : "BAPATLA"
},

{
	"id" : "19421",
	"value" : "BARATHWADA"
},

{
	"id" : "1341",
	"value" : "BARKATPURA"
},

{
	"id" : "19431",
	"value" : "BARSHI"
},

{
	"id" : "1351",
	"value" : "BARSI"
},

{
	"id" : "1361",
	"value" : "BARUVA"
},

{
	"id" : "1371",
	"value" : "BASANTHNAGAR"
},

{
	"id" : "1391",
	"value" : "BASARA"
},

{
	"id" : "1388065100104",
	"value" : "BASARA PACKAGE"
},

{
	"id" : "1401",
	"value" : "BASAVAKALYAN"
},

{
	"id" : "1411",
	"value" : "BASINENIPALLY"
},

{
	"id" : "1364375240498",
	"value" : "BASINENIPALLY"
},

{
	"id" : "22872",
	"value" : "BASMATHI"
},

{
	"id" : "19441",
	"value" : "BASMATNAGAR"
},

{
	"id" : "21481",
	"value" : "BATKAL"
},

{
	"id" : "1362727324821",
	"value" : "BATREPALLI"
},

{
	"id" : "1421",
	"value" : "BATTALA PALLY"
},

{
	"id" : "1441",
	"value" : "BATTILI"
},

{
	"id" : "1451",
	"value" : "BATTIPROLU"
},

{
	"id" : "23512",
	"value" : "BATTIPROLU RPL"
},

{
	"id" : "1461",
	"value" : "BAYENDER"
},

{
	"id" : "1471",
	"value" : "BAYYARAM"
},

{
	"id" : "1460377812131",
	"value" : "BAZAR HATNUR"
},

{
	"id" : "1481",
	"value" : "BEECHPALLY"
},

{
	"id" : "23068",
	"value" : "BEERAVALLI"
},

{
	"id" : "1528112311410",
	"value" : "BEGUMPET MANTHANI"
},

{
	"id" : "1511",
	"value" : "BEJJENKI"
},

{
	"id" : "1523542858067",
	"value" : "BELA-ADILABAD"
},

{
	"id" : "21501",
	"value" : "BELGUM"
},

{
	"id" : "1521",
	"value" : "BELLAMPALLY"
},

{
	"id" : "21521",
	"value" : "BELLARY"
},

{
	"id" : "1531",
	"value" : "BELTHA X ROAD"
},

{
	"id" : "1541",
	"value" : "BELUGUPPA"
},

{
	"id" : "19451",
	"value" : "BELULI"
},

{
	"id" : "1388063682241",
	"value" : "BELUM CAVES PACKAGE"
},

{
	"id" : "23312",
	"value" : "BENDAMURU LANKA"
},

{
	"id" : "1386430615487",
	"value" : "BENGALURU"
},

{
	"id" : "20841",
	"value" : "BERHAMPUR"
},

{
	"id" : "1571",
	"value" : "BESTAVARI PETA"
},

{
	"id" : "23437",
	"value" : "BETAVOLU"
},

{
	"id" : "1581",
	"value" : "BETHAMCHERLA"
},

{
	"id" : "1591",
	"value" : "BHADRACHALAM"
},

{
	"id" : "20851",
	"value" : "BHADRAK"
},

{
	"id" : "1601",
	"value" : "BHAINSA"
},

{
	"id" : "23156",
	"value" : "BHAKARAPET"
},

{
	"id" : "1611",
	"value" : "BHAMINI"
},

{
	"id" : "23389",
	"value" : "BHANDAVEEDHI"
},

{
	"id" : "1500466497671",
	"value" : "BHANDRA"
},

{
	"id" : "1631",
	"value" : "BHASKARARAO PET"
},

{
	"id" : "21541",
	"value" : "BHATKAL"
},

{
	"id" : "21081",
	"value" : "BHAVANI"
},

{
	"id" : "1641",
	"value" : "BHAVANI PURAM"
},

{
	"id" : "19461",
	"value" : "BHEED"
},

{
	"id" : "1651",
	"value" : "BHEEMGAL"
},

{
	"id" : "1527848101177",
	"value" : "BHEEMPUR"
},

{
	"id" : "23076",
	"value" : "BHEERAVALLI"
},

{
	"id" : "19471",
	"value" : "BHIGVAN"
},

{
	"id" : "1500466557575",
	"value" : "BHILAI"
},

{
	"id" : "1691",
	"value" : "BHIMADOLU"
},

{
	"id" : "1701",
	"value" : "BHIMAVARAM"
},

{
	"id" : "1711",
	"value" : "BHIMUNIPALLY"
},

{
	"id" : "1721",
	"value" : "BHIMUNIPATNAM"
},

{
	"id" : "19481",
	"value" : "BHIWANDI"
},

{
	"id" : "1731",
	"value" : "BHOGAPURAM"
},

{
	"id" : "1741",
	"value" : "BHONGIRI"
},

{
	"id" : "1751",
	"value" : "BHUJABALAPATNAM"
},

{
	"id" : "23423",
	"value" : "BHUNED"
},

{
	"id" : "1761",
	"value" : "BHUPALPALLY-HNK"
},

{
	"id" : "1771",
	"value" : "BHUTPUR X ROAD"
},

{
	"id" : "20861",
	"value" : "BHUVANESWAR"
},

{
	"id" : "19491",
	"value" : "BIBANCHI"
},

{
	"id" : "1781",
	"value" : "BIBIPETA"
},

{
	"id" : "1791",
	"value" : "BICHUKUNDA"
},

{
	"id" : "21551",
	"value" : "BIDAR"
},

{
	"id" : "1425477149525",
	"value" : "BIGANCHI"
},

{
	"id" : "1483696642810",
	"value" : "BIGVAN"
},

{
	"id" : "21561",
	"value" : "BIJAPUR"
},

{
	"id" : "1801",
	"value" : "BIJENEPALLY"
},

{
	"id" : "1811",
	"value" : "BIJILIPUR"
},

{
	"id" : "1527860883804",
	"value" : "BIJINAPALLY"
},

{
	"id" : "1821",
	"value" : "BIJNEPALLY"
},

{
	"id" : "1831",
	"value" : "BIKKAVOLU"
},

{
	"id" : "1841",
	"value" : "BIKNOOR"
},

{
	"id" : "1851",
	"value" : "BILL JUNCTION"
},

{
	"id" : "19501",
	"value" : "BILLOLI"
},

{
	"id" : "1871",
	"value" : "BIREDDYPALLY"
},

{
	"id" : "1901",
	"value" : "BIRSAIPET-ADB"
},

{
	"id" : "23135",
	"value" : "BLOCK BRIDGE"
},

{
	"id" : "23003",
	"value" : "BOATH"
},

{
	"id" : "1921",
	"value" : "BOBBILI"
},

{
	"id" : "1931",
	"value" : "BODHAN"
},

{
	"id" : "1463745708650",
	"value" : "BODMATPALLY "
},

{
	"id" : "20761",
	"value" : "BOKAR"
},

{
	"id" : "21091",
	"value" : "BOMMA SAMUDRAM"
},

{
	"id" : "1941",
	"value" : "BOMMALASATRAM"
},

{
	"id" : "23440",
	"value" : "BOMMURU RJY"
},

{
	"id" : "1527947124704",
	"value" : "BONAKAL KMM"
},

{
	"id" : "1951",
	"value" : "BOOTHPUR"
},

{
	"id" : "20871",
	"value" : "BORIGUMA"
},

{
	"id" : "1961",
	"value" : "BORRA CAVES"
},

{
	"id" : "23048",
	"value" : "BOTLAGUDUR"
},

{
	"id" : "1981",
	"value" : "BRAHMAMGARI MATAM"
},

{
	"id" : "1457951967976",
	"value" : "BRAHMAMGARI MATAM X ROAD"
},

{
	"id" : "1991",
	"value" : "BRAHMANA CHERUVU"
},

{
	"id" : "2001",
	"value" : "BRAHMANA KOTKUR"
},

{
	"id" : "23055",
	"value" : "BRAHMANAPALLI"
},

{
	"id" : "2011",
	"value" : "BRAHMANAPALLY"
},

{
	"id" : "1478343511901",
	"value" : "BRAHMEN CHOWK"
},

{
	"id" : "23133",
	"value" : "BRUNDAVAN CLY, SRRNGR"
},

{
	"id" : "2041",
	"value" : "BUCHI"
},

{
	"id" : "22964",
	"value" : "BUGGA-TDP"
},

{
	"id" : "23043",
	"value" : "BUKKAPATNAM"
},

{
	"id" : "2081",
	"value" : "BURGAMPAHAD"
},

{
	"id" : "23295",
	"value" : "BURRILANKA"
},

{
	"id" : "2091",
	"value" : "BURUGUPUDI"
},

{
	"id" : "23051",
	"value" : "BUTCHI"
},

{
	"id" : "2101",
	"value" : "BUTTAYAGUDEM"
},

{
	"id" : "23342",
	"value" : "C.N.PALLY"
},

{
	"id" : "2121",
	"value" : "C.S.PURAM"
},

{
	"id" : "2151",
	"value" : "CEMENT NAGAR"
},

{
	"id" : "1528112410231",
	"value" : "CENTENARY COLONY MANTHANI"
},

{
	"id" : "2161",
	"value" : "CENTENARY COLONY-GODAVARIKHANI"
},

{
	"id" : "2181",
	"value" : "CHAGALA MARRY"
},

{
	"id" : "23452",
	"value" : "CHAKALIKONDA(UDG)"
},

{
	"id" : "2201",
	"value" : "CHAKRAMPET"
},

{
	"id" : "2211",
	"value" : "CHAKRAYAPETA"
},

{
	"id" : "19521",
	"value" : "CHAKUR"
},

{
	"id" : "2221",
	"value" : "CHALLAPALLI"
},

{
	"id" : "2231",
	"value" : "CHALVAI"
},

{
	"id" : "23000",
	"value" : "CHANDALURU"
},

{
	"id" : "23429",
	"value" : "CHANDARLAPADU MAIN ROAD"
},

{
	"id" : "20771",
	"value" : "CHANDILI"
},

{
	"id" : "2251",
	"value" : "CHANDOL"
},

{
	"id" : "1412399389507",
	"value" : "CHANDRA GUNTA"
},

{
	"id" : "22671",
	"value" : "CHANDRAGIRI"
},

{
	"id" : "1388064485924",
	"value" : "CHANDRAGIRI FORT PACAKGE"
},

{
	"id" : "2271",
	"value" : "CHANDRAPALEM"
},

{
	"id" : "19531",
	"value" : "CHANDRAPOOR"
},

{
	"id" : "2281",
	"value" : "CHANDRAPUR"
},

{
	"id" : "1364814642602",
	"value" : "CHANDRAPURA PANCHAYAT  ATP"
},

{
	"id" : "1365321119401",
	"value" : "CHANDRASEKHARAPURAM"
},

{
	"id" : "2291",
	"value" : "CHANDRUGONDA"
},

{
	"id" : "2301",
	"value" : "CHANDUR"
},

{
	"id" : "23240",
	"value" : "CHANUBANDA(SPL)"
},

{
	"id" : "1458657850168",
	"value" : "CHARLA"
},

{
	"id" : "1441881889267",
	"value" : "CHATISGARH BORDER"
},

{
	"id" : "2331",
	"value" : "CHATRAI"
},

{
	"id" : "20881",
	"value" : "CHATWA GATE"
},

{
	"id" : "23235",
	"value" : "CHEBROLE- NARAYANAPURAM"
},

{
	"id" : "2351",
	"value" : "CHEBROLU"
},

{
	"id" : "22882",
	"value" : "CHECK POST"
},

{
	"id" : "2361",
	"value" : "CHEEPURUPALLY"
},

{
	"id" : "2371",
	"value" : "CHEGUNTA"
},

{
	"id" : "2381",
	"value" : "CHEGUR"
},

{
	"id" : "1400587689596",
	"value" : "CHEKKAPALLI"
},

{
	"id" : "23463",
	"value" : "CHELGAL"
},

{
	"id" : "2391",
	"value" : "CHELKUR"
},

{
	"id" : "2401",
	"value" : "CHELLAPUR"
},

{
	"id" : "1441012541176",
	"value" : "CHELPUR"
},

{
	"id" : "2421",
	"value" : "CHENDUR"
},

{
	"id" : "2431",
	"value" : "CHENGALPAT"
},

{
	"id" : "21101",
	"value" : "CHENNAI MADHAVARAM BUS TERMINUS"
},

{
	"id" : "21581",
	"value" : "CHENNAPATNAM"
},

{
	"id" : "2441",
	"value" : "CHENNUR MNCL"
},

{
	"id" : "2451",
	"value" : "CHERIYAL"
},

{
	"id" : "2461",
	"value" : "CHERLA"
},

{
	"id" : "23280",
	"value" : "CHERLOPALLY(MPL)"
},

{
	"id" : "1400940448026",
	"value" : "CHERUKUMILLI-BTM"
},

{
	"id" : "2481",
	"value" : "CHERUKUPALLI"
},

{
	"id" : "1393864154393",
	"value" : "CHEURKUPALLI "
},

{
	"id" : "2491",
	"value" : "CHEVELLA"
},

{
	"id" : "2501",
	"value" : "CHICHOLI"
},

{
	"id" : "23334",
	"value" : "CHIDAMBARAM"
},

{
	"id" : "23374",
	"value" : "CHIDUMURU"
},

{
	"id" : "21591",
	"value" : "CHIKBALLAPUR"
},

{
	"id" : "21601",
	"value" : "CHIKLI"
},

{
	"id" : "2521",
	"value" : "CHILAKALURIPETA "
},

{
	"id" : "2531",
	"value" : "CHILAKAPADU"
},

{
	"id" : "1392880069973",
	"value" : "CHILAKAPALEM "
},

{
	"id" : "2541",
	"value" : "CHILAKONDA"
},

{
	"id" : "2551",
	"value" : "CHILAMKUR"
},

{
	"id" : "1388552893111",
	"value" : "CHILUKUR"
},

{
	"id" : "2571",
	"value" : "CHIMAKURTHI"
},

{
	"id" : "1413014742331",
	"value" : "CHIMALAPADU"
},

{
	"id" : "2591",
	"value" : "CHINA BOINPALLY"
},

{
	"id" : "1428567179952",
	"value" : "CHINABHOGILI"
},

{
	"id" : "2601",
	"value" : "CHINAGANJAM"
},

{
	"id" : "2621",
	"value" : "CHINAMANDYAM"
},

{
	"id" : "1393856037555",
	"value" : "CHINCHINADA"
},

{
	"id" : "19541",
	"value" : "CHINCHOLI"
},

{
	"id" : "23325",
	"value" : "CHINGALPAT"
},

{
	"id" : "2651",
	"value" : "CHINNAGUTTIKAL"
},

{
	"id" : "2661",
	"value" : "CHINNAHARIVANAM"
},

{
	"id" : "2681",
	"value" : "CHINTALPUDI"
},

{
	"id" : "23159",
	"value" : "CHINTAMANI"
},

{
	"id" : "2691",
	"value" : "CHINTAPALLY"
},

{
	"id" : "2701",
	"value" : "CHINTHAKUNTA"
},

{
	"id" : "23157",
	"value" : "CHINTHAPARTHI"
},

{
	"id" : "2731",
	"value" : "CHIPURUPALLI"
},

{
	"id" : "2741",
	"value" : "CHIRALA"
},

{
	"id" : "2751",
	"value" : "CHIRAVALLI"
},

{
	"id" : "2761",
	"value" : "CHIRIKURAPADU"
},

{
	"id" : "21611",
	"value" : "CHITRADURGA"
},

{
	"id" : "2771",
	"value" : "CHITRAKONDA"
},

{
	"id" : "2821",
	"value" : "CHITTOOR"
},

{
	"id" : "2831",
	"value" : "CHITVEL"
},

{
	"id" : "2841",
	"value" : "CHITYAL"
},

{
	"id" : "22985",
	"value" : "CHODAVARAM"
},

{
	"id" : "2851",
	"value" : "CHOPPADANDI"
},

{
	"id" : "2861",
	"value" : "CHOUDPALLY-PLMNR"
},

{
	"id" : "1365590844477",
	"value" : "CHOUT UPPAL"
},

{
	"id" : "2871",
	"value" : "CHOUTAPALLI"
},

{
	"id" : "2891",
	"value" : "CHOUTUPPAL"
},

{
	"id" : "2901",
	"value" : "CHUNDI"
},

{
	"id" : "2911",
	"value" : "CK.PALLY"
},

{
	"id" : "2921",
	"value" : "CO-OP BANK SITAMPETA"
},

{
	"id" : "21111",
	"value" : "COIMBATORE"
},

{
	"id" : "2931",
	"value" : "COMMUNITY BRUNDAVAN"
},

{
	"id" : "2951",
	"value" : "CS PURAM"
},

{
	"id" : "2961",
	"value" : "CUDDAPAL"
},

{
	"id" : "2971",
	"value" : "CUMBUM"
},

{
	"id" : "2981",
	"value" : "CURRENT OFFICE"
},

{
	"id" : "20891",
	"value" : "CUTTACK"
},

{
	"id" : "2991",
	"value" : "D.FASALWADA"
},

{
	"id" : "3001",
	"value" : "D.G.PETA"
},

{
	"id" : "3011",
	"value" : "D.GIDDA"
},

{
	"id" : "3031",
	"value" : "D.PALLY"
},

{
	"id" : "22969",
	"value" : "D.V.SATRAM"
},

{
	"id" : "3051",
	"value" : "DACHEPALLY"
},

{
	"id" : "3061",
	"value" : "DADAPUR"
},

{
	"id" : "1383893326677",
	"value" : "DAIVA KSHETRA DARSHINI "
},

{
	"id" : "3071",
	"value" : "DAKKILI"
},

{
	"id" : "23015",
	"value" : "DAM ROAD"
},

{
	"id" : "3081",
	"value" : "DAMALCHERVU"
},

{
	"id" : "20901",
	"value" : "DAMANJODI"
},

{
	"id" : "1440850464827",
	"value" : "DAMARGIDDA"
},

{
	"id" : "3091",
	"value" : "DAMERACHERLA"
},

{
	"id" : "3101",
	"value" : "DAMMAPET"
},

{
	"id" : "20781",
	"value" : "DAMPAL"
},

{
	"id" : "22862",
	"value" : "DANDEPALLY -MEDARIPET"
},

{
	"id" : "3111",
	"value" : "DANDUMAILARAM"
},

{
	"id" : "20911",
	"value" : "DANTEWADA"
},

{
	"id" : "1384336546162",
	"value" : "DARFI"
},

{
	"id" : "3121",
	"value" : "DARMARAM"
},

{
	"id" : "3131",
	"value" : "DARSI"
},

{
	"id" : "3151",
	"value" : "DARUR"
},

{
	"id" : "3161",
	"value" : "DASARLAPALLI"
},

{
	"id" : "3171",
	"value" : "DAVAGUDURU"
},

{
	"id" : "21621",
	"value" : "DAVANGERE"
},

{
	"id" : "23183",
	"value" : "DECCAN SHIVA KSHETRALU"
},

{
	"id" : "23123",
	"value" : "DEFFENCE COLONY"
},

{
	"id" : "21631",
	"value" : "DEFLOOR"
},

{
	"id" : "19561",
	"value" : "DEGLOR"
},

{
	"id" : "3181",
	"value" : "DEGOAN"
},

{
	"id" : "1487847237673",
	"value" : "DENDUKURU"
},

{
	"id" : "21641",
	"value" : "DESAI CAMP"
},

{
	"id" : "21651",
	"value" : "DEVADURG"
},

{
	"id" : "22962",
	"value" : "DEVAMPALLY"
},

{
	"id" : "3201",
	"value" : "DEVANAKONDA"
},

{
	"id" : "21661",
	"value" : "DEVANHALLI"
},

{
	"id" : "3211",
	"value" : "DEVAPATLA"
},

{
	"id" : "3221",
	"value" : "DEVAPUR"
},

{
	"id" : "3231",
	"value" : "DEVARAKADRA"
},

{
	"id" : "3241",
	"value" : "DEVARAKONDA"
},

{
	"id" : "3251",
	"value" : "DEVARAKOTA"
},

{
	"id" : "1406886894432",
	"value" : "DEVARAPALLY "
},

{
	"id" : "21671",
	"value" : "DEVARGI"
},

{
	"id" : "21681",
	"value" : "DEVASUGUR"
},

{
	"id" : "3261",
	"value" : "DEVERAPALLI -  RJY"
},

{
	"id" : "1425479143626",
	"value" : "DEVGAD"
},

{
	"id" : "22993",
	"value" : "DEVULLAPALLY"
},

{
	"id" : "23343",
	"value" : "DHANALAKSHMIPURAM"
},

{
	"id" : "3271",
	"value" : "DHANWADA"
},

{
	"id" : "3281",
	"value" : "DHARMAJIGUDEM"
},

{
	"id" : "3291",
	"value" : "DHARMAJIPET"
},

{
	"id" : "3301",
	"value" : "DHARMAPURI"
},

{
	"id" : "3311",
	"value" : "DHARMARAM"
},

{
	"id" : "3321",
	"value" : "DHARMAVARAM"
},

{
	"id" : "3331",
	"value" : "DHARUR"
},

{
	"id" : "19571",
	"value" : "DHARWAD"
},

{
	"id" : "3341",
	"value" : "DHONE"
},

{
	"id" : "3351",
	"value" : "DHUVVUR"
},

{
	"id" : "1361818934657",
	"value" : "DIBBALA ROAD OGL"
},

{
	"id" : "22972",
	"value" : "DICH CAMP"
},

{
	"id" : "3361",
	"value" : "DICHPALLY"
},

{
	"id" : "3371",
	"value" : "DIGUVAMETTA"
},

{
	"id" : "3381",
	"value" : "DIGWAL"
},

{
	"id" : "19581",
	"value" : "DILWARPUR"
},

{
	"id" : "3401",
	"value" : "DINDI"
},

{
	"id" : "21121",
	"value" : "DINDI VANAM"
},

{
	"id" : "23104",
	"value" : "DINDIGAL"
},

{
	"id" : "23339",
	"value" : "DODDABALLAPUR"
},

{
	"id" : "1394363860672",
	"value" : "DODDAVARAM"
},

{
	"id" : "23494",
	"value" : "DOKIPARRU (GDVLR)"
},

{
	"id" : "19591",
	"value" : "DOLKI"
},

{
	"id" : "3411",
	"value" : "DOMAGONDA"
},

{
	"id" : "3421",
	"value" : "DOMALAPENTA"
},

{
	"id" : "3431",
	"value" : "DONAKONDA"
},

{
	"id" : "21701",
	"value" : "DONAMALAI"
},

{
	"id" : "1392659347614",
	"value" : "DONDAPARTHY"
},

{
	"id" : "3441",
	"value" : "DONDAPUDI"
},

{
	"id" : "3451",
	"value" : "DONKARAI"
},

{
	"id" : "1414652776149",
	"value" : "DORAVARI SATRAM"
},

{
	"id" : "3471",
	"value" : "DORNAKAL ROAD"
},

{
	"id" : "3481",
	"value" : "DORNALA"
},

{
	"id" : "23413",
	"value" : "DORNAPAL"
},

{
	"id" : "21711",
	"value" : "DORNAPALLY"
},

{
	"id" : "21721",
	"value" : "DOWLATABAD"
},

{
	"id" : "23377",
	"value" : "DOWLESWARAM"
},

{
	"id" : "3491",
	"value" : "DRAKSHARAMAM"
},

{
	"id" : "3501",
	"value" : "DRONADULA"
},

{
	"id" : "3521",
	"value" : "DUBBAKA"
},

{
	"id" : "1388821239697",
	"value" : "DUDDAVARAM"
},

{
	"id" : "3531",
	"value" : "DUDDEDA"
},

{
	"id" : "3541",
	"value" : "DUDDUKURU"
},

{
	"id" : "3561",
	"value" : "DUMMUGUDEM"
},

{
	"id" : "23456",
	"value" : "DURGAPURAM"
},

{
	"id" : "1368974276280",
	"value" : "DURGI-MACHERLA"
},

{
	"id" : "19601",
	"value" : "DURGI-MH"
},

{
	"id" : "3571",
	"value" : "DUTTALUR"
},

{
	"id" : "3591",
	"value" : "DUVVUR"
},

{
	"id" : "3611",
	"value" : "DWARAKA TIRUMALA"
},

{
	"id" : "3601",
	"value" : "DWARAKAMPAD"
},

{
	"id" : "3621",
	"value" : "DWARAPUDI"
},

{
	"id" : "3631",
	"value" : "DWTL"
},

{
	"id" : "3871",
	"value" : "E-SEVA"
},

{
	"id" : "23276",
	"value" : "EAST GANGAVARAM"
},

{
	"id" : "3661",
	"value" : "EAST GODAVARI"
},

{
	"id" : "23350",
	"value" : "EDEPALLI"
},

{
	"id" : "3691",
	"value" : "EDUGURALLAPALLI"
},

{
	"id" : "3701",
	"value" : "EDUGURALLAPALLY"
},

{
	"id" : "1527948047143",
	"value" : "EDULA BAYYARAM"
},

{
	"id" : "1419496471709",
	"value" : "EDUPULAPADU"
},

{
	"id" : "3711",
	"value" : "EEGALAPENTA"
},

{
	"id" : "3721",
	"value" : "EEPURU"
},

{
	"id" : "3731",
	"value" : "EETHERA"
},

{
	"id" : "3761",
	"value" : "ELESWARAM"
},

{
	"id" : "3771",
	"value" : "ELLANDU"
},

{
	"id" : "3781",
	"value" : "ELUGA PALLY"
},

{
	"id" : "3791",
	"value" : "ELURU"
},

{
	"id" : "3821",
	"value" : "ELURUPADU"
},

{
	"id" : "3831",
	"value" : "ENKURU"
},

{
	"id" : "1388552564452",
	"value" : "ENUGULA GADDA"
},

{
	"id" : "3841",
	"value" : "EPURU"
},

{
	"id" : "21751",
	"value" : "ERADONA X RD"
},

{
	"id" : "21761",
	"value" : "ERIGERA"
},

{
	"id" : "23046",
	"value" : "ERLAPADU"
},

{
	"id" : "21131",
	"value" : "ERODE"
},

{
	"id" : "23432",
	"value" : "ERODE BYPASS(GHITTOD)"
},

{
	"id" : "3851",
	"value" : "ERPEDU"
},

{
	"id" : "23243",
	"value" : "ERRAGANTLA PALLI"
},

{
	"id" : "3881",
	"value" : "ETURUNAGARAM"
},

{
	"id" : "1444379089803",
	"value" : "FASALWADA"
},

{
	"id" : "3911",
	"value" : "FCI"
},

{
	"id" : "3931",
	"value" : "FOURBAI"
},

{
	"id" : "1413014794171",
	"value" : "G KONDURU"
},

{
	"id" : "22921",
	"value" : "G. DABA X ROAD"
},

{
	"id" : "22967",
	"value" : "G.G. ROAD"
},

{
	"id" : "21771",
	"value" : "G.GATTA"
},

{
	"id" : "1428566874793",
	"value" : "G.L.PURAM"
},

{
	"id" : "23390",
	"value" : "G.MADUGULA"
},

{
	"id" : "23458",
	"value" : "G.MAMIDADA"
},

{
	"id" : "23030",
	"value" : "G.YEDAVALLY"
},

{
	"id" : "3951",
	"value" : "GAALIVEEDU"
},

{
	"id" : "21781",
	"value" : "GABBUR"
},

{
	"id" : "19611",
	"value" : "GADAG"
},

{
	"id" : "3971",
	"value" : "GADEKAL"
},

{
	"id" : "19621",
	"value" : "GADIRAS"
},

{
	"id" : "3981",
	"value" : "GADWAL"
},

{
	"id" : "3991",
	"value" : "GAJAPATHINAGARAM"
},

{
	"id" : "4001",
	"value" : "GAJJARAM"
},

{
	"id" : "4011",
	"value" : "GAJULAGUDA"
},

{
	"id" : "4021",
	"value" : "GAJULAPALLY"
},

{
	"id" : "4051",
	"value" : "GAJWEL-PRAGNAPUR"
},

{
	"id" : "4061",
	"value" : "GAMBHIRAOPET"
},

{
	"id" : "4071",
	"value" : "GANAPAVARAM"
},

{
	"id" : "4081",
	"value" : "GANAPUR"
},

{
	"id" : "4091",
	"value" : "GANDED"
},

{
	"id" : "22986",
	"value" : "GANDEPALLI"
},

{
	"id" : "4141",
	"value" : "GANDHIPARK NZD"
},

{
	"id" : "4151",
	"value" : "GANDID"
},

{
	"id" : "4161",
	"value" : "GANDIPALEM"
},

{
	"id" : "23124",
	"value" : "GANESH TEMPLE"
},

{
	"id" : "4171",
	"value" : "GANG X RD"
},

{
	"id" : "4191",
	"value" : "GANGADHARA"
},

{
	"id" : "23127",
	"value" : "GANGADHARA X ROAD"
},

{
	"id" : "23167",
	"value" : "GANGANAGER"
},

{
	"id" : "19631",
	"value" : "GANGAPUR"
},

{
	"id" : "4201",
	"value" : "GANGAVARAM"
},

{
	"id" : "21791",
	"value" : "GANGAVATHI"
},

{
	"id" : "4211",
	"value" : "GANNAVARAM"
},

{
	"id" : "4221",
	"value" : "GANPUR"
},

{
	"id" : "4231",
	"value" : "GANTI"
},

{
	"id" : "4241",
	"value" : "GARGEYPURAM"
},

{
	"id" : "4251",
	"value" : "GARIDEPALLI"
},

{
	"id" : "4261",
	"value" : "GARIVIDI"
},

{
	"id" : "4271",
	"value" : "GARLADINNE"
},

{
	"id" : "4281",
	"value" : "GARLAPADU"
},

{
	"id" : "4291",
	"value" : "GATTU"
},

{
	"id" : "4301",
	"value" : "GATTU SINGARAM"
},

{
	"id" : "4311",
	"value" : "GATTUMALLEPALLI"
},

{
	"id" : "4321",
	"value" : "GATTUPPAL"
},

{
	"id" : "4331",
	"value" : "GATTUPPAL PALLY"
},

{
	"id" : "23407",
	"value" : "GAVARAPALEM"
},

{
	"id" : "1441012489756",
	"value" : "GENCO-KTPP"
},

{
	"id" : "1441013147656",
	"value" : "GHANAPUR STATION"
},

{
	"id" : "1527943911714",
	"value" : "GHANPUR "
},

{
	"id" : "1441012581376",
	"value" : "GHANPUR X ROAD"
},

{
	"id" : "23386",
	"value" : "GHAT ROAD"
},

{
	"id" : "4361",
	"value" : "GIDDALUR"
},

{
	"id" : "19641",
	"value" : "GILAKASUGUR"
},

{
	"id" : "22802",
	"value" : "GINTHUR"
},

{
	"id" : "4371",
	"value" : "GIRIKOTHAPALLY"
},

{
	"id" : "4381",
	"value" : "GMCT"
},

{
	"id" : "4391",
	"value" : "GNANAPURAM"
},

{
	"id" : "16511",
	"value" : "GOA"
},

{
	"id" : "1419570186096",
	"value" : "GOBBUR"
},

{
	"id" : "4411",
	"value" : "GODAVARIKHANI"
},

{
	"id" : "4421",
	"value" : "GODLAGUDEM"
},

{
	"id" : "4431",
	"value" : "GOKAVARAM"
},

{
	"id" : "4451",
	"value" : "GOLDEN TEMPLE/TN"
},

{
	"id" : "1390999587162",
	"value" : "GOLLAGUDEM"
},

{
	"id" : "1396584000332",
	"value" : "GOLLAPALEM-KKD"
},

{
	"id" : "4461",
	"value" : "GOLLAPALLI"
},

{
	"id" : "1479107762888",
	"value" : "GOLLAPUDI WYRA"
},

{
	"id" : "23304",
	"value" : "GOLLAVALLI"
},

{
	"id" : "1471516474267",
	"value" : "GONDIMALLA GHAT"
},

{
	"id" : "19651",
	"value" : "GONDYA"
},

{
	"id" : "4481",
	"value" : "GONEGANDLA"
},

{
	"id" : "4491",
	"value" : "GOOTY"
},

{
	"id" : "4511",
	"value" : "GOPALAPURAM"
},

{
	"id" : "4521",
	"value" : "GOPALPET"
},

{
	"id" : "4531",
	"value" : "GORANTLA"
},

{
	"id" : "19661",
	"value" : "GOREGAON"
},

{
	"id" : "1446285579274",
	"value" : "GOREGAON-GONDIA"
},

{
	"id" : "1399732563988",
	"value" : "GOSAPADU"
},

{
	"id" : "1379337732127",
	"value" : "GOVINDARAOPET-HNK"
},

{
	"id" : "4561",
	"value" : "GOVINDRAOPET"
},

{
	"id" : "1362655531487",
	"value" : "GOWNIPALLI"
},

{
	"id" : "4591",
	"value" : "GOWRIBIDNOR"
},

{
	"id" : "4601",
	"value" : "GOWRIDEVI PETA"
},

{
	"id" : "1438257194802",
	"value" : "GOYAGAON"
},

{
	"id" : "4611",
	"value" : "GPP-DHARMAJIPETA"
},

{
	"id" : "4621",
	"value" : "GPP-MANTOR"
},

{
	"id" : "4631",
	"value" : "GREAMSPETA"
},

{
	"id" : "19681",
	"value" : "GUDABAGLUR"
},

{
	"id" : "1393313343588",
	"value" : "GUDAVALLI RAMAN BHAVAN"
},

{
	"id" : "4661",
	"value" : "GUDDI VIRAIAH SATRAM"
},

{
	"id" : "4671",
	"value" : "GUDEMPAD-HNK"
},

{
	"id" : "1441013074456",
	"value" : "GUDEPPAD"
},

{
	"id" : "23108",
	"value" : "GUDIBANDA"
},

{
	"id" : "4691",
	"value" : "GUDIHATNUR"
},

{
	"id" : "4701",
	"value" : "GUDIVADA"
},

{
	"id" : "4711",
	"value" : "GUDLAVALLERU"
},

{
	"id" : "4721",
	"value" : "GUDLUR"
},

{
	"id" : "4731",
	"value" : "GUDUR"
},

{
	"id" : "1445603481596",
	"value" : "GUDUR WARANGAL "
},

{
	"id" : "1375340897867",
	"value" : "GUJARATHI PETA SKLM"
},

{
	"id" : "4741",
	"value" : "GUJJA"
},

{
	"id" : "1414995427096",
	"value" : "GUJJANAGULLA CENTRE GNT"
},

{
	"id" : "1398425831039",
	"value" : "GUJJANAGULLA XCENTRE"
},

{
	"id" : "22942",
	"value" : "GULBARGA"
},

{
	"id" : "4751",
	"value" : "GULBURGA(A)"
},

{
	"id" : "22661",
	"value" : "GUMADAPUD"
},

{
	"id" : "4761",
	"value" : "GUMMADIDALA"
},

{
	"id" : "23050",
	"value" : "GUMMADIPUNDI"
},

{
	"id" : "4771",
	"value" : "GUMMALAXMIPURAM"
},

{
	"id" : "4791",
	"value" : "GUNDLAKUNTA"
},

{
	"id" : "4801",
	"value" : "GUNDLAPALLY"
},

{
	"id" : "1440757943047",
	"value" : "GUNDUMAL"
},

{
	"id" : "23266",
	"value" : "GUNDYA"
},

{
	"id" : "21801",
	"value" : "GUNJANHALLI"
},

{
	"id" : "4811",
	"value" : "GUNJANUR"
},

{
	"id" : "4821",
	"value" : "GUNJAPADUGU"
},

{
	"id" : "23313",
	"value" : "GUNNEPALLI AGRAHARAM"
},

{
	"id" : "4831",
	"value" : "GUNTAKAL"
},

{
	"id" : "4841",
	"value" : "GUNTUPALLY"
},

{
	"id" : "4851",
	"value" : "GUNTUR"
},

{
	"id" : "20921",
	"value" : "GUNUPUR"
},

{
	"id" : "4861",
	"value" : "GURAVAYAPALEM"
},

{
	"id" : "23054",
	"value" : "GURAZALA"
},

{
	"id" : "4871",
	"value" : "GURIMITKAL"
},

{
	"id" : "4881",
	"value" : "GURRAMKONDA"
},

{
	"id" : "4891",
	"value" : "GURRAMPODU"
},

{
	"id" : "4901",
	"value" : "GURUBATLAGUDEM"
},

{
	"id" : "4921",
	"value" : "GURUJALA"
},

{
	"id" : "23341",
	"value" : "GUTTUR"
},

{
	"id" : "4941",
	"value" : "GUVALAPALAYAM"
},

{
	"id" : "4951",
	"value" : "GYRAMPALLY"
},

{
	"id" : "21811",
	"value" : "H.B.HALLY"
},

{
	"id" : "23281",
	"value" : "H.CROSS"
},

{
	"id" : "19691",
	"value" : "H.GHAT"
},

{
	"id" : "4961",
	"value" : "H.S.PURAM"
},

{
	"id" : "19701",
	"value" : "HADGAOM"
},

{
	"id" : "4971",
	"value" : "HAGIRI"
},

{
	"id" : "19711",
	"value" : "HAGIRI1"
},

{
	"id" : "19721",
	"value" : "HALAHARVI"
},

{
	"id" : "21821",
	"value" : "HALBURG"
},

{
	"id" : "4991",
	"value" : "HALIYA"
},

{
	"id" : "21831",
	"value" : "HAMPI"
},

{
	"id" : "1398425685547",
	"value" : "HANUMAIAH TOBACCO COMPANY"
},

{
	"id" : "23525",
	"value" : "HANUMAN JUNCATION BYPASS"
},

{
	"id" : "5011",
	"value" : "HANUMAN JUNCTION"
},

{
	"id" : "5021",
	"value" : "HANUMAN SPECIAL"
},

{
	"id" : "23094",
	"value" : "HANUMANTHUNIPADU"
},

{
	"id" : "21841",
	"value" : "HARI HARA"
},

{
	"id" : "5051",
	"value" : "HARIPURAM"
},

{
	"id" : "23519",
	"value" : "HARIVARAM"
},

{
	"id" : "21851",
	"value" : "HARPANHALLY"
},

{
	"id" : "21861",
	"value" : "HASAN"
},

{
	"id" : "1438257638022",
	"value" : "HASNAPUR"
},

{
	"id" : "22968",
	"value" : "HASNAPURAM"
},

{
	"id" : "21871",
	"value" : "HASTI"
},

{
	"id" : "19731",
	"value" : "HATGAON"
},

{
	"id" : "1425477223145",
	"value" : "HATPAHADI"
},

{
	"id" : "21881",
	"value" : "HATTI"
},

{
	"id" : "1419570354276",
	"value" : "HATTI GUDUR"
},

{
	"id" : "21891",
	"value" : "HATTIGUDURU"
},

{
	"id" : "1366441127019",
	"value" : "HAYLAND"
},

{
	"id" : "5081",
	"value" : "HAZIPUR-DONABANDA"
},

{
	"id" : "19741",
	"value" : "HIGHWAY X RD11"
},

{
	"id" : "5101",
	"value" : "HILL COLONY"
},

{
	"id" : "5121",
	"value" : "HINDUPUR"
},

{
	"id" : "21901",
	"value" : "HINGOLI"
},

{
	"id" : "21911",
	"value" : "HIPPANGINI"
},

{
	"id" : "1366507164793",
	"value" : "HOLMASPETA"
},

{
	"id" : "21921",
	"value" : "HONAWAR"
},

{
	"id" : "21931",
	"value" : "HORIYUR"
},

{
	"id" : "1388064000639",
	"value" : "HORSELY HILLS PACKAGE"
},

{
	"id" : "21941",
	"value" : "HOSEKOTA"
},

{
	"id" : "23160",
	"value" : "HOSKOTA"
},

{
	"id" : "21951",
	"value" : "HOSMUDRA"
},

{
	"id" : "21961",
	"value" : "HOSNAGAR"
},

{
	"id" : "21971",
	"value" : "HOSPET"
},

{
	"id" : "21141",
	"value" : "HOSUR"
},

{
	"id" : "21981",
	"value" : "HUBLI"
},

{
	"id" : "23405",
	"value" : "HUKUMPETA"
},

{
	"id" : "19751",
	"value" : "HUMNABAD"
},

{
	"id" : "5191",
	"value" : "HUSNABAD"
},

{
	"id" : "5201",
	"value" : "HUZURABAD"
},

{
	"id" : "5211",
	"value" : "HUZURNAGAR"
},

{
	"id" : "23155",
	"value" : "HX ROAD"
},

{
	"id" : "5231",
	"value" : "HYDERABAD"
},

{
	"id" : "5241",
	"value" : "HYDERABAD AIRPORT-RGIA"
},

{
	"id" : "23098",
	"value" : "I I S C"
},

{
	"id" : "5281",
	"value" : "I PETA"
},

{
	"id" : "23382",
	"value" : "IB TANDUR"
},

{
	"id" : "5331",
	"value" : "ICHAPURAM"
},

{
	"id" : "5341",
	"value" : "ICHODA"
},

{
	"id" : "5351",
	"value" : "IEEZ"
},

{
	"id" : "5361",
	"value" : "IGSTADIUM COMPLEX"
},

{
	"id" : "5371",
	"value" : "ILLANDU"
},

{
	"id" : "5381",
	"value" : "ILLATHAKUNTA"
},

{
	"id" : "5391",
	"value" : "INDALVAI"
},

{
	"id" : "5401",
	"value" : "INDANAPALLY"
},

{
	"id" : "19761",
	"value" : "INDAPUR"
},

{
	"id" : "23034",
	"value" : "INDRAPALANAGAR"
},

{
	"id" : "5411",
	"value" : "INDRAPALEM"
},

{
	"id" : "5421",
	"value" : "INDRAVATHI"
},

{
	"id" : "5431",
	"value" : "INDREVALLI"
},

{
	"id" : "5441",
	"value" : "INGALUR"
},

{
	"id" : "5451",
	"value" : "INKOLLU"
},

{
	"id" : "23442",
	"value" : "INKOLLU  RAJIV GANDHI STATUE"
},

{
	"id" : "5461",
	"value" : "INT-HITECH"
},

{
	"id" : "5471",
	"value" : "INTER STATE"
},

{
	"id" : "5481",
	"value" : "IPPAGUNTA"
},

{
	"id" : "5491",
	"value" : "IPPLAPALLY"
},

{
	"id" : "23451",
	"value" : "ISKABANERLA(UDG)"
},

{
	"id" : "23454",
	"value" : "ISKADAMERLA"
},

{
	"id" : "19771",
	"value" : "ISLAMPUR"
},

{
	"id" : "1402058778290",
	"value" : "ISNAPUR"
},

{
	"id" : "5501",
	"value" : "ISUKAPALEM"
},

{
	"id" : "5521",
	"value" : "J.PALLY"
},

{
	"id" : "5821",
	"value" : "JADCHERLA"
},

{
	"id" : "5531",
	"value" : "JAFFARGADH"
},

{
	"id" : "16481",
	"value" : "JAGADALPUR"
},

{
	"id" : "1458478680758",
	"value" : "JAGANNADAPURAM"
},

{
	"id" : "5551",
	"value" : "JAGGAIHPET"
},

{
	"id" : "5561",
	"value" : "JAGGAMPET"
},

{
	"id" : "5571",
	"value" : "JAGGANNAPET"
},

{
	"id" : "5581",
	"value" : "JAGIRALA"
},

{
	"id" : "5591",
	"value" : "JAGITYAL"
},

{
	"id" : "1527841008248",
	"value" : "JAINATH-ADB"
},

{
	"id" : "1438257568482",
	"value" : "JAINUR"
},

{
	"id" : "23165",
	"value" : "JAIPUR"
},

{
	"id" : "5621",
	"value" : "JAKLAIR"
},

{
	"id" : "5631",
	"value" : "JAKRANPALLY"
},

{
	"id" : "5641",
	"value" : "JALA"
},

{
	"id" : "5651",
	"value" : "JALADANKI"
},

{
	"id" : "20931",
	"value" : "JALESWAR"
},

{
	"id" : "22822",
	"value" : "JALNA"
},

{
	"id" : "5661",
	"value" : "JAMGI"
},

{
	"id" : "20941",
	"value" : "JAMIDIPETA"
},

{
	"id" : "22021",
	"value" : "JAMKHANDI"
},

{
	"id" : "19781",
	"value" : "JAMKHED"
},

{
	"id" : "5671",
	"value" : "JAMMALAMADUGU"
},

{
	"id" : "5691",
	"value" : "JAMMIKUNTA"
},

{
	"id" : "5701",
	"value" : "JANAGAM"
},

{
	"id" : "5711",
	"value" : "JANAKIPUR"
},

{
	"id" : "1371353332228",
	"value" : "JANAMPETA"
},

{
	"id" : "5721",
	"value" : "JANGALPALLY"
},

{
	"id" : "23012",
	"value" : "JANGAPETA"
},

{
	"id" : "5741",
	"value" : "JANGAREDDY GUDEM"
},

{
	"id" : "5751",
	"value" : "JANGOAN"
},

{
	"id" : "5761",
	"value" : "JANNARAM"
},

{
	"id" : "5771",
	"value" : "JANWADA"
},

{
	"id" : "5781",
	"value" : "JAPAL"
},

{
	"id" : "1438257244422",
	"value" : "JARI"
},

{
	"id" : "5791",
	"value" : "JARUGUMALLI"
},

{
	"id" : "5801",
	"value" : "JAVALGERE"
},

{
	"id" : "23016",
	"value" : "JEELUGUMILLI"
},

{
	"id" : "5851",
	"value" : "JETPROL"
},

{
	"id" : "19791",
	"value" : "JEVERGI"
},

{
	"id" : "20951",
	"value" : "JEYPORE"
},

{
	"id" : "1438941442272",
	"value" : "JHARI"
},

{
	"id" : "19801",
	"value" : "JINTUR"
},

{
	"id" : "5871",
	"value" : "JOGIPET"
},

{
	"id" : "5881",
	"value" : "JOLAPUT"
},

{
	"id" : "5911",
	"value" : "JUKAL"
},

{
	"id" : "5921",
	"value" : "JULURUPADU"
},

{
	"id" : "5931",
	"value" : "JUPAD BANGALA"
},

{
	"id" : "5941",
	"value" : "JURALA"
},

{
	"id" : "5951",
	"value" : "JUVVALAPALEM"
},

{
	"id" : "23365",
	"value" : "K.B.R COMPLEX, OGL"
},

{
	"id" : "5971",
	"value" : "K.CHERU"
},

{
	"id" : "19811",
	"value" : "K.NAGAR"
},

{
	"id" : "5981",
	"value" : "K.RAJUPALEM"
},

{
	"id" : "6001",
	"value" : "KADAKUNTLA"
},

{
	"id" : "6011",
	"value" : "KADALERU X ROAD"
},

{
	"id" : "1457967131577",
	"value" : "KADAM"
},

{
	"id" : "6021",
	"value" : "KADAPA"
},

{
	"id" : "6031",
	"value" : "KADAWANDI"
},

{
	"id" : "6041",
	"value" : "KADEM"
},

{
	"id" : "6051",
	"value" : "KADIRI"
},

{
	"id" : "6061",
	"value" : "KADIVENDI"
},

{
	"id" : "6071",
	"value" : "KADIYAM"
},

{
	"id" : "6081",
	"value" : "KADIYAPULANKA"
},

{
	"id" : "6091",
	"value" : "KADTAL"
},

{
	"id" : "6101",
	"value" : "KAGAZNAGAR"
},

{
	"id" : "6111",
	"value" : "KAGAZNAGAR X ROAD"
},

{
	"id" : "6121",
	"value" : "KAIKALURU"
},

{
	"id" : "6131",
	"value" : "KAIKARAM"
},

{
	"id" : "1398959059958",
	"value" : "KAJOOR"
},

{
	"id" : "6141",
	"value" : "KAKATIYA KANNI"
},

{
	"id" : "6161",
	"value" : "KAKINADA"
},

{
	"id" : "1414199913559",
	"value" : "KAKINADA CITY"
},

{
	"id" : "6171",
	"value" : "KAKKIRENI"
},

{
	"id" : "23299",
	"value" : "KAKUMANU"
},

{
	"id" : "6181",
	"value" : "KALAKADA"
},

{
	"id" : "6191",
	"value" : "KALAKOTA"
},

{
	"id" : "1479108738584",
	"value" : "KALAKOTA"
},

{
	"id" : "6201",
	"value" : "KALAM"
},

{
	"id" : "22041",
	"value" : "KALAMALA"
},

{
	"id" : "1465115322100",
	"value" : "KALAMBOLI MC DONALDS"
},

{
	"id" : "6211",
	"value" : "KALASAPADU"
},

{
	"id" : "1369663014640",
	"value" : "KALAVALLA  KDKR"
},

{
	"id" : "23436",
	"value" : "KALAVAPAMULA"
},

{
	"id" : "6231",
	"value" : "KALESWARAM"
},

{
	"id" : "6241",
	"value" : "KALIDINDI"
},

{
	"id" : "6251",
	"value" : "KALIGIRI"
},

{
	"id" : "6261",
	"value" : "KALIKIRI"
},

{
	"id" : "23175",
	"value" : "KALINGA"
},

{
	"id" : "6271",
	"value" : "KALINGA PATNAM"
},

{
	"id" : "6281",
	"value" : "KALLA"
},

{
	"id" : "6291",
	"value" : "KALLAKURU"
},

{
	"id" : "6301",
	"value" : "KALLEDA"
},

{
	"id" : "6311",
	"value" : "KALLEIR"
},

{
	"id" : "6321",
	"value" : "KALLUR"
},

{
	"id" : "1419087418997",
	"value" : "KALLUR CHITTUR    DIST"
},

{
	"id" : "21151",
	"value" : "KALPAKAM"
},

{
	"id" : "23326",
	"value" : "KALPAKKAM"
},

{
	"id" : "23181",
	"value" : "KALVA BUGGA"
},

{
	"id" : "6331",
	"value" : "KALVAKOLE"
},

{
	"id" : "6341",
	"value" : "KALVAKURTHY"
},

{
	"id" : "6361",
	"value" : "KALYANDURGAM"
},

{
	"id" : "23476",
	"value" : "KAMALANAGAR"
},

{
	"id" : "23434",
	"value" : "KAMALAPUR"
},

{
	"id" : "6381",
	"value" : "KAMALAPURAM"
},

{
	"id" : "6391",
	"value" : "KAMANPUR"
},

{
	"id" : "6401",
	"value" : "KAMANURU"
},

{
	"id" : "6411",
	"value" : "KAMAPOOR"
},

{
	"id" : "6421",
	"value" : "KAMAREDDY"
},

{
	"id" : "1413014864911",
	"value" : "KAMASAMUDRAM"
},

{
	"id" : "6431",
	"value" : "KAMAVARAPUKOTA"
},

{
	"id" : "6441",
	"value" : "KAMBADUR"
},

{
	"id" : "6451",
	"value" : "KAMBHAM"
},

{
	"id" : "6461",
	"value" : "KAMBHAM PADU"
},

{
	"id" : "6471",
	"value" : "KAMEPALLI"
},

{
	"id" : "6481",
	"value" : "KAMKOL"
},

{
	"id" : "1390035522277",
	"value" : "KAMMARPALLY"
},

{
	"id" : "6491",
	"value" : "KAMMARPALLY"
},

{
	"id" : "6501",
	"value" : "KAMPA SAMUDRAM"
},

{
	"id" : "6511",
	"value" : "KAMPLI"
},

{
	"id" : "23029",
	"value" : "KANAGAL"
},

{
	"id" : "6521",
	"value" : "KANAKAMETTA"
},

{
	"id" : "6531",
	"value" : "KANAPUR"
},

{
	"id" : "23496",
	"value" : "KANAYAKUMARI"
},

{
	"id" : "6541",
	"value" : "KANCHARLAPALEM"
},

{
	"id" : "22681",
	"value" : "KANCHI"
},

{
	"id" : "6551",
	"value" : "KANCHIKACHERLA"
},

{
	"id" : "21161",
	"value" : "KANCHIPURAM"
},

{
	"id" : "6571",
	"value" : "KANDUKUR"
},

{
	"id" : "6581",
	"value" : "KANDULURU"
},

{
	"id" : "23244",
	"value" : "KANDURU"
},

{
	"id" : "6591",
	"value" : "KANEKAL"
},

{
	"id" : "1527942152193",
	"value" : "KANGAL NLG"
},

{
	"id" : "6601",
	"value" : "KANGTI"
},

{
	"id" : "6611",
	"value" : "KANIGIRI"
},

{
	"id" : "6621",
	"value" : "KANIPAKAM"
},

{
	"id" : "1388062650359",
	"value" : "KANIPAKAM PACKAGE"
},

{
	"id" : "1484052705139",
	"value" : "KANKAPUR-NRML"
},

{
	"id" : "6641",
	"value" : "KANKIPADU"
},

{
	"id" : "6651",
	"value" : "KANNAPURAM"
},

{
	"id" : "1388552468082",
	"value" : "KANTESWAR"
},

{
	"id" : "6661",
	"value" : "KANTI"
},

{
	"id" : "1384133710769",
	"value" : "KANURU-TNK"
},

{
	"id" : "23501",
	"value" : "KANYAKUMARI"
},

{
	"id" : "23467",
	"value" : "KANYATEERTAM"
},

{
	"id" : "6681",
	"value" : "KARAD"
},

{
	"id" : "6691",
	"value" : "KARAMCHEDU"
},

{
	"id" : "6701",
	"value" : "KARAMPUDI"
},

{
	"id" : "1527849576067",
	"value" : "KARANGI"
},

{
	"id" : "23058",
	"value" : "KARAPA"
},

{
	"id" : "6711",
	"value" : "KARATAMPADU"
},

{
	"id" : "23297",
	"value" : "KARAVIDI"
},

{
	"id" : "6721",
	"value" : "KAREPALLY X ROAD"
},

{
	"id" : "6731",
	"value" : "KARIMNAGAR"
},

{
	"id" : "1418290751470",
	"value" : "KARMAPUDI NRT"
},

{
	"id" : "1441881792967",
	"value" : "KARNATAKA BORDER"
},

{
	"id" : "22051",
	"value" : "KARTIGI"
},

{
	"id" : "23174",
	"value" : "KARVETTI NAGARAM"
},

{
	"id" : "6771",
	"value" : "KASAPURAM"
},

{
	"id" : "6781",
	"value" : "KASINAGAR"
},

{
	"id" : "6791",
	"value" : "KASIPETA"
},

{
	"id" : "1512649919610",
	"value" : "KATARAM"
},

{
	"id" : "6811",
	"value" : "KATKUR"
},

{
	"id" : "23309",
	"value" : "KATRANI KONA"
},

{
	"id" : "6821",
	"value" : "KATTAMPADU"
},

{
	"id" : "6831",
	"value" : "KATTANGUR"
},

{
	"id" : "6841",
	"value" : "KATTIPUDI"
},

{
	"id" : "1365771557309",
	"value" : "KATTIPUDI BY PASS"
},

{
	"id" : "1414999158315",
	"value" : "KATURI MEDICAL COLLEGE GNT"
},

{
	"id" : "6851",
	"value" : "KAVALI"
},

{
	"id" : "23478",
	"value" : "KAVDIGUDA"
},

{
	"id" : "23355",
	"value" : "KAVITAM"
},

{
	"id" : "23517",
	"value" : "KAVURU  (CPT)"
},

{
	"id" : "6861",
	"value" : "KAZIPALEM"
},

{
	"id" : "6891",
	"value" : "KCP GUEST HOUSE"
},

{
	"id" : "23345",
	"value" : "KD.PETA"
},

{
	"id" : "6901",
	"value" : "KEDARESHWARAPET E SEVA"
},

{
	"id" : "6911",
	"value" : "KEESARA"
},

{
	"id" : "22071",
	"value" : "KEMBHAVI"
},

{
	"id" : "1438257482263",
	"value" : "KERAMERI"
},

{
	"id" : "6921",
	"value" : "KERELLY"
},

{
	"id" : "6931",
	"value" : "KESHAMPET"
},

{
	"id" : "6941",
	"value" : "KESHANAPALLI"
},

{
	"id" : "23024",
	"value" : "KETHEPALLY"
},

{
	"id" : "6951",
	"value" : "KETHIREDDY PALLI"
},

{
	"id" : "23449",
	"value" : "KG SIRIPURAM"
},

{
	"id" : "1428567053893",
	"value" : "KHADGA VALASA"
},

{
	"id" : "6971",
	"value" : "KHAMMAM"
},

{
	"id" : "6981",
	"value" : "KHANAPUR-NRML"
},

{
	"id" : "1465117875775",
	"value" : "KHARGAR"
},

{
	"id" : "20961",
	"value" : "KHURDA ROAD JN"
},

{
	"id" : "23420",
	"value" : "KINCHUMANDA"
},

{
	"id" : "19821",
	"value" : "KINWAT"
},

{
	"id" : "1378291812856",
	"value" : "KIRANDUL  BAILADILLA"
},

{
	"id" : "7011",
	"value" : "KISTARAMPALLY"
},

{
	"id" : "23168",
	"value" : "KLINGA"
},

{
	"id" : "23170",
	"value" : "KLM BY PASS"
},

{
	"id" : "23143",
	"value" : "KMM1"
},

{
	"id" : "7031",
	"value" : "KODAD"
},

{
	"id" : "7041",
	"value" : "KODAKANDLA"
},

{
	"id" : "7051",
	"value" : "KODALI"
},

{
	"id" : "7081",
	"value" : "KODANGAL"
},

{
	"id" : "7091",
	"value" : "KODERU"
},

{
	"id" : "7101",
	"value" : "KODMOR"
},

{
	"id" : "7111",
	"value" : "KODUMUR"
},

{
	"id" : "23220",
	"value" : "KODUR"
},

{
	"id" : "7131",
	"value" : "KODURU"
},

{
	"id" : "7141",
	"value" : "KOHEDA"
},

{
	"id" : "7151",
	"value" : "KOHIR"
},

{
	"id" : "7161",
	"value" : "KOILAKONDA"
},

{
	"id" : "1416280869101",
	"value" : "KOILAKUNTLA X ROAD"
},

{
	"id" : "23179",
	"value" : "KOLANBARATHI"
},

{
	"id" : "22081",
	"value" : "KOLAR"
},

{
	"id" : "1418030710819",
	"value" : "KOLAR BYPASS"
},

{
	"id" : "1463810403236",
	"value" : "KOLCHARAM"
},

{
	"id" : "19831",
	"value" : "KOLHAPUR"
},

{
	"id" : "22782",
	"value" : "KOLIMIGUNDLA"
},

{
	"id" : "21291",
	"value" : "KOLKATA"
},

{
	"id" : "7171",
	"value" : "KOLLAPUR"
},

{
	"id" : "7181",
	"value" : "KOLLAPURAM"
},

{
	"id" : "7201",
	"value" : "KOLLURU"
},

{
	"id" : "22952",
	"value" : "KOMARADA"
},

{
	"id" : "23306",
	"value" : "KOMARAGIRI PATNAM"
},

{
	"id" : "23022",
	"value" : "KOMAROLU"
},

{
	"id" : "1418288832310",
	"value" : "KOMMALAPADDU"
},

{
	"id" : "7231",
	"value" : "KOMMALAPADU"
},

{
	"id" : "7221",
	"value" : "KOMURAVELLI PACKAGE"
},

{
	"id" : "1532326114343",
	"value" : "KOMURAVELLY"
},

{
	"id" : "7241",
	"value" : "KONAKALAMITTA"
},

{
	"id" : "7251",
	"value" : "KONANKI"
},

{
	"id" : "7261",
	"value" : "KONAPUR"
},

{
	"id" : "1527853555204",
	"value" : "KONDAMALLEPALLY"
},

{
	"id" : "22751",
	"value" : "KONDAPALLY"
},

{
	"id" : "23211",
	"value" : "KONDAPUR(PLVD)"
},

{
	"id" : "23427",
	"value" : "KONDAPUR-NRPT"
},

{
	"id" : "7281",
	"value" : "KONDAPURAM(KVL)"
},

{
	"id" : "7291",
	"value" : "KONDEPI"
},

{
	"id" : "7301",
	"value" : "KONIJEDU"
},

{
	"id" : "22852",
	"value" : "KOPARGOAN"
},

{
	"id" : "22091",
	"value" : "KOPPAL"
},

{
	"id" : "22996",
	"value" : "KOPPERAPADU"
},

{
	"id" : "1428175257515",
	"value" : "KOPPUNUR"
},

{
	"id" : "20971",
	"value" : "KORAPUT"
},

{
	"id" : "7321",
	"value" : "KORIVI"
},

{
	"id" : "7331",
	"value" : "KORLAKUNTA"
},

{
	"id" : "7341",
	"value" : "KORUKOLLU"
},

{
	"id" : "7351",
	"value" : "KORUKONDA"
},

{
	"id" : "7361",
	"value" : "KORUTLA"
},

{
	"id" : "7371",
	"value" : "KOSGI"
},

{
	"id" : "7381",
	"value" : "KOTA"
},

{
	"id" : "23425",
	"value" : "KOTAKONDA"
},

{
	"id" : "23120",
	"value" : "KOTANANDURU"
},

{
	"id" : "1494574727870",
	"value" : "KOTAPALLY-CHNR"
},

{
	"id" : "7391",
	"value" : "KOTHABADI"
},

{
	"id" : "7401",
	"value" : "KOTHACHERUVU"
},

{
	"id" : "7411",
	"value" : "KOTHAGUDEM"
},

{
	"id" : "7421",
	"value" : "KOTHAKONDA"
},

{
	"id" : "7431",
	"value" : "KOTHAKOTA"
},

{
	"id" : "23077",
	"value" : "KOTHAMAJERU"
},

{
	"id" : "7441",
	"value" : "KOTHAPALLI"
},

{
	"id" : "23173",
	"value" : "KOTHAPALLIMITTA"
},

{
	"id" : "23282",
	"value" : "KOTHAPATNAM"
},

{
	"id" : "7451",
	"value" : "KOTHAPET"
},

{
	"id" : "23394",
	"value" : "KOTHAPETA(TEKKALI)"
},

{
	"id" : "7491",
	"value" : "KOTILINGALA PACKAGE"
},

{
	"id" : "7521",
	"value" : "KOTLAPALLY"
},

{
	"id" : "23086",
	"value" : "KOTTAPALEM"
},

{
	"id" : "1362727492373",
	"value" : "KOTTAPALLI"
},

{
	"id" : "22791",
	"value" : "KOTTAVALASA"
},

{
	"id" : "7531",
	"value" : "KOTTURU"
},

{
	"id" : "1374922752705",
	"value" : "KOTTURU  ANKPLY "
},

{
	"id" : "7541",
	"value" : "KOTULABAD"
},

{
	"id" : "1395319370537",
	"value" : "KOTULAGOKAVARAM"
},

{
	"id" : "7551",
	"value" : "KOTUPALLY"
},

{
	"id" : "7561",
	"value" : "KOUKUNTLA"
},

{
	"id" : "1510576262929",
	"value" : "KOUTALA"
},

{
	"id" : "1363691843415",
	"value" : "KOUVR BYEPASS"
},

{
	"id" : "1414401672229",
	"value" : "KOVUR-NLR"
},

{
	"id" : "7571",
	"value" : "KOVVUR"
},

{
	"id" : "7591",
	"value" : "KOWDIPALLY"
},

{
	"id" : "7601",
	"value" : "KOWKUNTLA"
},

{
	"id" : "22111",
	"value" : "KOWTAL"
},

{
	"id" : "7621",
	"value" : "KOYALAKUNTLA"
},

{
	"id" : "21171",
	"value" : "KOYAMBED"
},

{
	"id" : "7611",
	"value" : "KOYYALAGUDEM"
},

{
	"id" : "22121",
	"value" : "KPUTTUR"
},

{
	"id" : "7661",
	"value" : "KRISHNA"
},

{
	"id" : "21181",
	"value" : "KRISHNA GIRI"
},

{
	"id" : "7681",
	"value" : "KRISHNAPURAM"
},

{
	"id" : "1400940415850",
	"value" : "KRUTHIVENNU-BTM"
},

{
	"id" : "7741",
	"value" : "KRUTTIVENNU"
},

{
	"id" : "7751",
	"value" : "KTPS COLONY"
},

{
	"id" : "7761",
	"value" : "KUCHIPUDI"
},

{
	"id" : "23075",
	"value" : "KUKKUNURU"
},

{
	"id" : "7781",
	"value" : "KUKKUNURU"
},

{
	"id" : "7791",
	"value" : "KULAKCHERALA"
},

{
	"id" : "7801",
	"value" : "KULCHARAM"
},

{
	"id" : "23351",
	"value" : "KUMARGALLY"
},

{
	"id" : "7811",
	"value" : "KUMMARA PALEM"
},

{
	"id" : "7821",
	"value" : "KUMTURU"
},

{
	"id" : "7831",
	"value" : "KUNAVARAM"
},

{
	"id" : "19841",
	"value" : "KUNDAPUR"
},

{
	"id" : "23106",
	"value" : "KUNDURPI"
},

{
	"id" : "20981",
	"value" : "KUNERU"
},

{
	"id" : "7871",
	"value" : "KUNTA BCM "
},

{
	"id" : "23379",
	"value" : "KUNTA(MRKP)"
},

{
	"id" : "1388063186054",
	"value" : "KUNTALA PACKAGE"
},

{
	"id" : "7881",
	"value" : "KUPPAM"
},

{
	"id" : "19851",
	"value" : "KURDUWADI"
},

{
	"id" : "7891",
	"value" : "KURICHEDU"
},

{
	"id" : "7901",
	"value" : "KURMA PALLY"
},

{
	"id" : "7911",
	"value" : "KURMED"
},

{
	"id" : "7921",
	"value" : "KURNOOL"
},

{
	"id" : "1414678608992",
	"value" : "KURNOOL CITY"
},

{
	"id" : "7931",
	"value" : "KURUMEDU"
},

{
	"id" : "7941",
	"value" : "KURUPAM"
},

{
	"id" : "7951",
	"value" : "KURUWADI"
},

{
	"id" : "19871",
	"value" : "KUSTIGI"
},

{
	"id" : "1391160788308",
	"value" : "KYRAVADI"
},

{
	"id" : "7981",
	"value" : "L.D.PALLY"
},

{
	"id" : "8001",
	"value" : "LAKADIKOT"
},

{
	"id" : "19881",
	"value" : "LAKANDURA"
},

{
	"id" : "1394088549345",
	"value" : "LAKKAVARAM JRG"
},

{
	"id" : "8031",
	"value" : "LAKKIREDDYPALLY"
},

{
	"id" : "23506",
	"value" : "LAKNAVARAM PACKAGE-WGL"
},

{
	"id" : "1527850650848",
	"value" : "LAKSHETTIPETA"
},

{
	"id" : "1393856089892",
	"value" : "LANKALAKODERU"
},

{
	"id" : "8071",
	"value" : "LATHUR"
},

{
	"id" : "19891",
	"value" : "LATHUR X ROAD"
},

{
	"id" : "8081",
	"value" : "LAVANUR"
},

{
	"id" : "8091",
	"value" : "LAXMAPUR"
},

{
	"id" : "22762",
	"value" : "LAXMI NAGAR"
},

{
	"id" : "1527849881839",
	"value" : "LAXMICHANDA"
},

{
	"id" : "23229",
	"value" : "LEELA MAHAL JUNCTION PT"
},

{
	"id" : "1388063885105",
	"value" : "LEPAKSHI PACKAGE"
},

{
	"id" : "23415",
	"value" : "LEPASKSHI"
},

{
	"id" : "8121",
	"value" : "LINGA SAMUDRAM"
},

{
	"id" : "8131",
	"value" : "LINGALA"
},

{
	"id" : "8161",
	"value" : "LINGAMPET"
},

{
	"id" : "8171",
	"value" : "LINGANNAPET"
},

{
	"id" : "8181",
	"value" : "LINGAPALEM"
},

{
	"id" : "8191",
	"value" : "LINGAREDDYPALLY"
},

{
	"id" : "22141",
	"value" : "LINGSUGUR"
},

{
	"id" : "19901",
	"value" : "LONAVALA"
},

{
	"id" : "8211",
	"value" : "LOSARY"
},

{
	"id" : "8221",
	"value" : "LOYAPALLY"
},

{
	"id" : "8241",
	"value" : "LUXETTIPET"
},

{
	"id" : "22151",
	"value" : "M.KHELLI"
},

{
	"id" : "23364",
	"value" : "M.NIDAMALUR"
},

{
	"id" : "23185",
	"value" : "MAALAKONDA"
},

{
	"id" : "8281",
	"value" : "MACHAVARAM"
},

{
	"id" : "8291",
	"value" : "MACHERLA"
},

{
	"id" : "8301",
	"value" : "MACHILIPATNAM"
},

{
	"id" : "8311",
	"value" : "MACHKHAND"
},

{
	"id" : "8321",
	"value" : "MADAKASIRA"
},

{
	"id" : "8331",
	"value" : "MADANAPALLY"
},

{
	"id" : "8341",
	"value" : "MADAVADHARA"
},

{
	"id" : "8271",
	"value" : "MADDI KERA"
},

{
	"id" : "1375264670276",
	"value" : "MADDIPADU"
},

{
	"id" : "8361",
	"value" : "MADDIRALA"
},

{
	"id" : "8371",
	"value" : "MADDULURU"
},

{
	"id" : "1440757875187",
	"value" : "MADDUR"
},

{
	"id" : "8411",
	"value" : "MADHAVARAM"
},

{
	"id" : "8421",
	"value" : "MADHIRA"
},

{
	"id" : "23109",
	"value" : "MADHUGIRI"
},

{
	"id" : "20791",
	"value" : "MADHYA PRADESH"
},

{
	"id" : "19911",
	"value" : "MADNUR"
},

{
	"id" : "8441",
	"value" : "MADUGUL"
},

{
	"id" : "19921",
	"value" : "MAGAVDI"
},

{
	"id" : "23513",
	"value" : "MAGHAMASA DARSHAN"
},

{
	"id" : "19931",
	"value" : "MAGNUR"
},

{
	"id" : "8451",
	"value" : "MAHABUBABAD"
},

{
	"id" : "8461",
	"value" : "MAHABUBNAGAR"
},

{
	"id" : "1512649897592",
	"value" : "MAHADEVPUR"
},

{
	"id" : "8471",
	"value" : "MAHANANDI"
},

{
	"id" : "19941",
	"value" : "MAHARASHTRA"
},

{
	"id" : "1441881826087",
	"value" : "MAHARASTRA BORDER"
},

{
	"id" : "8481",
	"value" : "MAHIMANVITA PANCHAKSETRA DARSI"
},

{
	"id" : "8491",
	"value" : "MAHIPALA CHERUVU"
},

{
	"id" : "19951",
	"value" : "MAHOL"
},

{
	"id" : "19961",
	"value" : "MAHORE"
},

{
	"id" : "1393464737780",
	"value" : "MAIN BAZAR"
},

{
	"id" : "8501",
	"value" : "MAKTHAL"
},

{
	"id" : "8511",
	"value" : "MALAKALMUR"
},

{
	"id" : "8521",
	"value" : "MALAKAPALLI"
},

{
	"id" : "8551",
	"value" : "MALDAKAL"
},

{
	"id" : "1509707210472",
	"value" : "MALIKIPURAM  EG"
},

{
	"id" : "20991",
	"value" : "MALKANAGIRI"
},

{
	"id" : "1444379133663",
	"value" : "MALKED"
},

{
	"id" : "8581",
	"value" : "MALKI PURAM"
},

{
	"id" : "8571",
	"value" : "MALKIPURAM"
},

{
	"id" : "8591",
	"value" : "MALL"
},

{
	"id" : "8601",
	"value" : "MALLAMPALLY"
},

{
	"id" : "23376",
	"value" : "MALLAYYAPETA KATHERU"
},

{
	"id" : "8621",
	"value" : "MALLELA"
},

{
	"id" : "8631",
	"value" : "MALLEPALLY"
},

{
	"id" : "23128",
	"value" : "MALLIAL"
},

{
	"id" : "8641",
	"value" : "MALLIKARJUNANAGAR"
},

{
	"id" : "23302",
	"value" : "MALLISALA"
},

{
	"id" : "22988",
	"value" : "MALLITHOTA"
},

{
	"id" : "8651",
	"value" : "MALYAL"
},

{
	"id" : "8661",
	"value" : "MALYAL X RD"
},

{
	"id" : "23352",
	"value" : "MAMDA BAD"
},

{
	"id" : "8681",
	"value" : "MAMDABAD"
},

{
	"id" : "8691",
	"value" : "MAMIDIKUDRU"
},

{
	"id" : "23044",
	"value" : "MAMILLAKUNTA X"
},

{
	"id" : "8701",
	"value" : "MANAPURAM"
},

{
	"id" : "8711",
	"value" : "MANCHERIAL"
},

{
	"id" : "8721",
	"value" : "MANDADAM"
},

{
	"id" : "8731",
	"value" : "MANDALAPALLI"
},

{
	"id" : "1400590538050",
	"value" : "MANDALAPALLI"
},

{
	"id" : "23038",
	"value" : "MANDAMARRY "
},

{
	"id" : "1365778363578",
	"value" : "MANDAPAKA TNK"
},

{
	"id" : "8761",
	"value" : "MANDAPALLI"
},

{
	"id" : "8811",
	"value" : "MANDAPET"
},

{
	"id" : "8771",
	"value" : "MANDAPETA"
},

{
	"id" : "1441013034556",
	"value" : "MANDARIPET"
},

{
	"id" : "8781",
	"value" : "MANDASA"
},

{
	"id" : "8791",
	"value" : "MANDAVALLI"
},

{
	"id" : "22161",
	"value" : "MANDHYA"
},

{
	"id" : "8801",
	"value" : "MANDIKUNTA"
},

{
	"id" : "8821",
	"value" : "MANERU"
},

{
	"id" : "8831",
	"value" : "MANGALAGIRI"
},

{
	"id" : "1382093349235",
	"value" : "MANGALAM"
},

{
	"id" : "22171",
	"value" : "MANGALORE"
},

{
	"id" : "8841",
	"value" : "MANGANUR"
},

{
	"id" : "8851",
	"value" : "MANGAPET"
},

{
	"id" : "22992",
	"value" : "MANGAPETA"
},

{
	"id" : "1388552513807",
	"value" : "MANIK BANDAR"
},

{
	"id" : "8861",
	"value" : "MANIKONDA"
},

{
	"id" : "22181",
	"value" : "MANIPAL"
},

{
	"id" : "1414998960375",
	"value" : "MANIPAL HOSPITAL WARADHI GNT"
},

{
	"id" : "8881",
	"value" : "MANNANOOR"
},

{
	"id" : "8891",
	"value" : "MANNEGUDA"
},

{
	"id" : "22191",
	"value" : "MANNEKHELI"
},

{
	"id" : "22201",
	"value" : "MANTA"
},

{
	"id" : "22812",
	"value" : "MANTHA"
},

{
	"id" : "8901",
	"value" : "MANTHANI"
},

{
	"id" : "8911",
	"value" : "MANTHENAVARIPALEM"
},

{
	"id" : "8931",
	"value" : "MANTRALAYAM"
},

{
	"id" : "1414653102190",
	"value" : "MANUBOLU-GDR"
},

{
	"id" : "8941",
	"value" : "MANUGUR"
},

{
	"id" : "22211",
	"value" : "MANVI"
},

{
	"id" : "8961",
	"value" : "MAREDUMILLI"
},

{
	"id" : "8971",
	"value" : "MARELLAVARIPALEM"
},

{
	"id" : "8991",
	"value" : "MARIKAL"
},

{
	"id" : "1527947415844",
	"value" : "MARIPEDA BANGLA"
},

{
	"id" : "9001",
	"value" : "MARKAPURAM"
},

{
	"id" : "1398425450015",
	"value" : "MARKET POINT"
},

{
	"id" : "1400588022252",
	"value" : "MARLAPALEM"
},

{
	"id" : "1374909459729",
	"value" : "MARLAVELLIPALUM"
},

{
	"id" : "9021",
	"value" : "MARREDPALLY"
},

{
	"id" : "9031",
	"value" : "MARRIGUDA"
},

{
	"id" : "9041",
	"value" : "MARRIMADLA"
},

{
	"id" : "9051",
	"value" : "MARRIPADAGA"
},

{
	"id" : "9061",
	"value" : "MARRIPADU"
},

{
	"id" : "23516",
	"value" : "MARRIPADU"
},

{
	"id" : "23396",
	"value" : "MARRIPALEM"
},

{
	"id" : "23416",
	"value" : "MARRIPUDI"
},

{
	"id" : "22651",
	"value" : "MARTERU"
},

{
	"id" : "9081",
	"value" : "MARTUR"
},

{
	"id" : "1419576371436",
	"value" : "MARTURU CPT"
},

{
	"id" : "9121",
	"value" : "MASANPALLY"
},

{
	"id" : "21001",
	"value" : "MATHILI"
},

{
	"id" : "23399",
	"value" : "MATHURANTAKAM"
},

{
	"id" : "9131",
	"value" : "MAYALURU"
},

{
	"id" : "19971",
	"value" : "MD.SIRA"
},

{
	"id" : "9141",
	"value" : "MEDAK"
},

{
	"id" : "9151",
	"value" : "MEDAPADU"
},

{
	"id" : "23087",
	"value" : "MEDAPI"
},

{
	"id" : "9161",
	"value" : "MEDARAM"
},

{
	"id" : "1455281836870",
	"value" : "MEDARAMETLA"
},

{
	"id" : "9171",
	"value" : "MEDCHAL"
},

{
	"id" : "9181",
	"value" : "MEDERAMETLA"
},

{
	"id" : "1414995519915",
	"value" : "MEDIKONDURU GNT"
},

{
	"id" : "1487847287343",
	"value" : "MEENAVOLU"
},

{
	"id" : "19981",
	"value" : "MEERAJ"
},

{
	"id" : "23113",
	"value" : "MEERPET VILLAGE"
},

{
	"id" : "9211",
	"value" : "MELACHERU"
},

{
	"id" : "9221",
	"value" : "MELLA VAGU"
},

{
	"id" : "23397",
	"value" : "MELMARVATHUR"
},

{
	"id" : "22241",
	"value" : "MERCARA"
},

{
	"id" : "9231",
	"value" : "METPALLY"
},

{
	"id" : "9241",
	"value" : "METTUR"
},

{
	"id" : "1429359141312",
	"value" : "MIRJAPURAM "
},

{
	"id" : "9301",
	"value" : "MIRYALGUDA"
},

{
	"id" : "1425477052026",
	"value" : "MODH"
},

{
	"id" : "23102",
	"value" : "MODIWALA(BMTC)"
},

{
	"id" : "9351",
	"value" : "MOGALLURU"
},

{
	"id" : "1444379204283",
	"value" : "MOHAL"
},

{
	"id" : "9371",
	"value" : "MOHAMEDNAGAR"
},

{
	"id" : "9381",
	"value" : "MOINABAD"
},

{
	"id" : "1395265800713",
	"value" : "MOKSHAGUNDAM"
},

{
	"id" : "9401",
	"value" : "MOLAKALA CHERUVU"
},

{
	"id" : "20021",
	"value" : "MOLE"
},

{
	"id" : "20031",
	"value" : "MOLLEM"
},

{
	"id" : "23294",
	"value" : "MOMHAMDABAD-MBNR"
},

{
	"id" : "1428566797333",
	"value" : "MONDEMKHALLU"
},

{
	"id" : "23056",
	"value" : "MONDIKUNTA"
},

{
	"id" : "9421",
	"value" : "MONDURU"
},

{
	"id" : "9441",
	"value" : "MOPADU"
},

{
	"id" : "9451",
	"value" : "MOPIDEVI"
},

{
	"id" : "9461",
	"value" : "MORTHAD"
},

{
	"id" : "9701",
	"value" : "MORTHAD"
},

{
	"id" : "23026",
	"value" : "MOTHEY"
},

{
	"id" : "9471",
	"value" : "MOTHKUR"
},

{
	"id" : "9481",
	"value" : "MOTHUGUDEM"
},

{
	"id" : "9501",
	"value" : "MOTU"
},

{
	"id" : "23286",
	"value" : "MPL APPARAO STREET"
},

{
	"id" : "23285",
	"value" : "MPL GANDHI ROAD"
},

{
	"id" : "23287",
	"value" : "MPL KADIRI ROAD(P.BUNK)"
},

{
	"id" : "23284",
	"value" : "MPL NIMMANAPALLY X"
},

{
	"id" : "23288",
	"value" : "MPL NTR CIRCLE"
},

{
	"id" : "23283",
	"value" : "MPL PUNGANUR ROAD"
},

{
	"id" : "9551",
	"value" : "MUDDANUR"
},

{
	"id" : "9561",
	"value" : "MUDHOLE"
},

{
	"id" : "9581",
	"value" : "MUDIGUBBA"
},

{
	"id" : "9591",
	"value" : "MUDINEPALLI"
},

{
	"id" : "20041",
	"value" : "MUKHED"
},

{
	"id" : "20801",
	"value" : "MUKHED1"
},

{
	"id" : "9601",
	"value" : "MUKKAMALA"
},

{
	"id" : "23305",
	"value" : "MUKTHESHWARAM"
},

{
	"id" : "22251",
	"value" : "MULABAGAL"
},

{
	"id" : "22901",
	"value" : "MULAKALACHERUV"
},

{
	"id" : "1516641440646",
	"value" : "MULAKALAPALLI"
},

{
	"id" : "23457",
	"value" : "MULAPET"
},

{
	"id" : "1394363895151",
	"value" : "MULLAMURU"
},

{
	"id" : "9611",
	"value" : "MULUGU"
},

{
	"id" : "23144",
	"value" : "MUMBAI"
},

{
	"id" : "9621",
	"value" : "MUMMIDIVARAM"
},

{
	"id" : "9641",
	"value" : "MUNAGALA"
},

{
	"id" : "1429514026912",
	"value" : "MUNDLAMURU"
},

{
	"id" : "23314",
	"value" : "MUNGANDA"
},

{
	"id" : "23310",
	"value" : "MUNGANTA"
},

{
	"id" : "9651",
	"value" : "MUNHADLAPADU"
},

{
	"id" : "23403",
	"value" : "MUNNANGI VILLAGE"
},

{
	"id" : "9661",
	"value" : "MUNUGODU"
},

{
	"id" : "9671",
	"value" : "MUPKAL"
},

{
	"id" : "9681",
	"value" : "MUPPAVARAM"
},

{
	"id" : "9691",
	"value" : "MURAMALLA"
},

{
	"id" : "9731",
	"value" : "MUSTAFABAD-SDPT"
},

{
	"id" : "1428301976205",
	"value" : "MUSUNURU"
},

{
	"id" : "9741",
	"value" : "MUVVA"
},

{
	"id" : "9761",
	"value" : "MYDUKUR"
},

{
	"id" : "23335",
	"value" : "MYLADUDURAI"
},

{
	"id" : "9771",
	"value" : "MYLAVARAM"
},

{
	"id" : "22261",
	"value" : "MYSORE"
},

{
	"id" : "22271",
	"value" : "MYSORE X RDS"
},

{
	"id" : "1371468006615",
	"value" : "N G PADU OGL"
},

{
	"id" : "9791",
	"value" : "N.CHERU"
},

{
	"id" : "9811",
	"value" : "N.G.PADU"
},

{
	"id" : "23004",
	"value" : "N.GONDA"
},

{
	"id" : "9821",
	"value" : "N.S.GATE"
},

{
	"id" : "20131",
	"value" : "NAGABEEDU"
},

{
	"id" : "9861",
	"value" : "NAGAKUNTA"
},

{
	"id" : "9871",
	"value" : "NAGALAGUTTAPALLY"
},

{
	"id" : "9881",
	"value" : "NAGALAPURAM"
},

{
	"id" : "1423740319364",
	"value" : "NAGANDLA"
},

{
	"id" : "23336",
	"value" : "NAGAPATNAM"
},

{
	"id" : "9891",
	"value" : "NAGAR KUNTLA"
},

{
	"id" : "9901",
	"value" : "NAGAR KURNOOL"
},

{
	"id" : "9911",
	"value" : "NAGARAM(RPL)"
},

{
	"id" : "9921",
	"value" : "NAGARI"
},

{
	"id" : "9931",
	"value" : "NAGARJUNA SAGAR"
},

{
	"id" : "1414998467836",
	"value" : "NAGARJUNA UNIVERSITY GNT"
},

{
	"id" : "9941",
	"value" : "NAGAYALANKA"
},

{
	"id" : "23035",
	"value" : "NAGIREDDIPALLY"
},

{
	"id" : "1418289283631",
	"value" : "NAGIRIKAL XRD"
},

{
	"id" : "20141",
	"value" : "NAGPUR"
},

{
	"id" : "9971",
	"value" : "NAGULUPPALAPADU"
},

{
	"id" : "23088",
	"value" : "NAIDUPALEM"
},

{
	"id" : "9981",
	"value" : "NAIDUPET"
},

{
	"id" : "20151",
	"value" : "NAIGAON"
},

{
	"id" : "23466",
	"value" : "NAINALAPPA KONA"
},

{
	"id" : "1364302129365",
	"value" : "NAKARIKALLU-NRT"
},

{
	"id" : "1418289408011",
	"value" : "NAKARIKALU"
},

{
	"id" : "9991",
	"value" : "NAKKAPALLY"
},

{
	"id" : "10001",
	"value" : "NAKKAPALLY X ROAD"
},

{
	"id" : "10011",
	"value" : "NAKREKAL"
},

{
	"id" : "20161",
	"value" : "NAKULANUR"
},

{
	"id" : "20171",
	"value" : "NALDURG"
},

{
	"id" : "10031",
	"value" : "NALGONDA"
},

{
	"id" : "10041",
	"value" : "NALLAJARLA"
},

{
	"id" : "23073",
	"value" : "NALLAJERLA"
},

{
	"id" : "1420379856367",
	"value" : "NALLAMADA-PTP"
},

{
	"id" : "1414999857915",
	"value" : "NALLAPADU POLYTECHNIC GNT"
},

{
	"id" : "22281",
	"value" : "NALLUR"
},

{
	"id" : "23025",
	"value" : "NAMAVARAM"
},

{
	"id" : "10081",
	"value" : "NAMBULAPULA KUNTA"
},

{
	"id" : "10111",
	"value" : "NANCHERLA"
},

{
	"id" : "10121",
	"value" : "NANDALUR"
},

{
	"id" : "10131",
	"value" : "NANDAPUR JN"
},

{
	"id" : "10141",
	"value" : "NANDAVARAM"
},

{
	"id" : "20181",
	"value" : "NANDED"
},

{
	"id" : "23074",
	"value" : "NANDHIPADU"
},

{
	"id" : "10151",
	"value" : "NANDIGAMA"
},

{
	"id" : "10161",
	"value" : "NANDIGUM"
},

{
	"id" : "10171",
	"value" : "NANDIKOTKUR"
},

{
	"id" : "10181",
	"value" : "NANDIPADU"
},

{
	"id" : "10191",
	"value" : "NANDIPET"
},

{
	"id" : "1422667145396",
	"value" : "NANDIVADA"
},

{
	"id" : "1442984697461",
	"value" : "NANDURU"
},

{
	"id" : "10201",
	"value" : "NANDYAL"
},

{
	"id" : "21191",
	"value" : "NANGA MANGALAM"
},

{
	"id" : "22291",
	"value" : "NANGALI"
},

{
	"id" : "23084",
	"value" : "NARAKODURU"
},

{
	"id" : "10211",
	"value" : "NARASANNAPETA"
},

{
	"id" : "23020",
	"value" : "NARAYANA PURAM"
},

{
	"id" : "10231",
	"value" : "NARAYANKHED"
},

{
	"id" : "10241",
	"value" : "NARAYANPET"
},

{
	"id" : "10261",
	"value" : "NARKETPALLY"
},

{
	"id" : "10271",
	"value" : "NARMETTA"
},

{
	"id" : "10281",
	"value" : "NARSAMPET"
},

{
	"id" : "10291",
	"value" : "NARSAPUR"
},

{
	"id" : "10301",
	"value" : "NARSAPURAM"
},

{
	"id" : "10311",
	"value" : "NARSARAOPET"
},

{
	"id" : "20191",
	"value" : "NARSI"
},

{
	"id" : "10331",
	"value" : "NARSINGOLU"
},

{
	"id" : "10341",
	"value" : "NARSIPATNAM"
},

{
	"id" : "10351",
	"value" : "NARWA"
},

{
	"id" : "10361",
	"value" : "NARWADA"
},

{
	"id" : "20201",
	"value" : "NASRULLA BAD"
},

{
	"id" : "10371",
	"value" : "NASRULLABAD"
},

{
	"id" : "10381",
	"value" : "NATHAVALASA"
},

{
	"id" : "10401",
	"value" : "NAVAJANARDHANA PARIJATHALU"
},

{
	"id" : "22301",
	"value" : "NAVALKAL"
},

{
	"id" : "22976",
	"value" : "NAVARANGPUR"
},

{
	"id" : "10411",
	"value" : "NAVIPET"
},

{
	"id" : "20211",
	"value" : "NAYAGAON"
},

{
	"id" : "23027",
	"value" : "NAYAKANGUDEM"
},

{
	"id" : "1463978769300",
	"value" : "NAYEEMGAM"
},

{
	"id" : "1433270373246",
	"value" : "NAYUDUPETA"
},

{
	"id" : "1428566725812",
	"value" : "NEELAKUNTA PURAM"
},

{
	"id" : "20221",
	"value" : "NEELANGA"
},

{
	"id" : "10431",
	"value" : "NEKARIKALLU"
},

{
	"id" : "10441",
	"value" : "NELAKONDAPALLI"
},

{
	"id" : "1395261888266",
	"value" : "NELATURU"
},

{
	"id" : "10451",
	"value" : "NELLIMARLA"
},

{
	"id" : "10461",
	"value" : "NELLIPAKA"
},

{
	"id" : "10471",
	"value" : "NELLORE"
},

{
	"id" : "10481",
	"value" : "NEMALI"
},

{
	"id" : "10491",
	"value" : "NENDRAGUNTA"
},

{
	"id" : "1460377848528",
	"value" : "NEREDU GONDA"
},

{
	"id" : "10511",
	"value" : "NEREDUCHARLA"
},

{
	"id" : "10521",
	"value" : "NEREDUKONDA"
},

{
	"id" : "1426228824425",
	"value" : "NETHIVARIPALEM"
},

{
	"id" : "10561",
	"value" : "NIDADAVOLU"
},

{
	"id" : "10571",
	"value" : "NIDAMANUR"
},

{
	"id" : "1527942187114",
	"value" : "NIDAMANUR MLG"
},

{
	"id" : "1461994443967",
	"value" : "NIGADI"
},

{
	"id" : "23110",
	"value" : "NILAMANGAL"
},

{
	"id" : "10591",
	"value" : "NILLIPAKALU"
},

{
	"id" : "10601",
	"value" : "NIMMAPALLY"
},

{
	"id" : "10611",
	"value" : "NIRMAL"
},

{
	"id" : "1375189121978",
	"value" : "NIVAGAM"
},

{
	"id" : "10621",
	"value" : "NIZAM PATNAM"
},

{
	"id" : "10631",
	"value" : "NIZAMABAD"
},

{
	"id" : "10651",
	"value" : "NIZAMSAGAR"
},

{
	"id" : "10681",
	"value" : "NOSSAM"
},

{
	"id" : "21011",
	"value" : "NOVARANGAPUR"
},

{
	"id" : "22982",
	"value" : "NOWURANGAPUR"
},

{
	"id" : "1414998737175",
	"value" : "NRI HOSPITAL CHINAKAKANI"
},

{
	"id" : "10691",
	"value" : "NSAGAR UP-DN"
},

{
	"id" : "10701",
	"value" : "NSM PUBLIC SCHOOL"
},

{
	"id" : "10711",
	"value" : "NTPC"
},

{
	"id" : "10721",
	"value" : "NTPC BGATE"
},

{
	"id" : "23417",
	"value" : "NTR CIRCLE"
},

{
	"id" : "23363",
	"value" : "NUCHLI"
},

{
	"id" : "23373",
	"value" : "NUNEPALLE"
},

{
	"id" : "1394363971850",
	"value" : "NUZILLA-VNK"
},

{
	"id" : "10761",
	"value" : "NUZVID"
},

{
	"id" : "23006",
	"value" : "OBULAPUR"
},

{
	"id" : "1418030539159",
	"value" : "OBVP XROAD"
},

{
	"id" : "1362655568337",
	"value" : "ODC"
},

{
	"id" : "10781",
	"value" : "OGIRALA"
},

{
	"id" : "23393",
	"value" : "OLD BUS STAND CHENNUR"
},

{
	"id" : "10801",
	"value" : "OLD BUS STAND YELLANDU"
},

{
	"id" : "23162",
	"value" : "OLD BUS STAND, BAPATLA"
},

{
	"id" : "20231",
	"value" : "OMERGA"
},

{
	"id" : "23180",
	"value" : "OMKARAM"
},

{
	"id" : "10831",
	"value" : "ONAKADILLI"
},

{
	"id" : "10841",
	"value" : "ONGOLE"
},

{
	"id" : "10851",
	"value" : "ONTIMITTA"
},

{
	"id" : "23231",
	"value" : "OPP. SRINIVASAM"
},

{
	"id" : "10871",
	"value" : "ORDINANCE FACTORY"
},

{
	"id" : "10881",
	"value" : "ORIKILI"
},

{
	"id" : "1391160579339",
	"value" : "ORWAKALLU"
},

{
	"id" : "20241",
	"value" : "OSMANBAD"
},

{
	"id" : "22741",
	"value" : "OWK"
},

{
	"id" : "1418030611399",
	"value" : "P PATTU"
},

{
	"id" : "10931",
	"value" : "P.GANNAVARAM"
},

{
	"id" : "22711",
	"value" : "P.K.CHERUVU"
},

{
	"id" : "10981",
	"value" : "P.R.PALLI"
},

{
	"id" : "11001",
	"value" : "PACHERLA"
},

{
	"id" : "1388234623669",
	"value" : "PACKAGE"
},

{
	"id" : "23270",
	"value" : "PADAMATAPALEM"
},

{
	"id" : "11011",
	"value" : "PADERU"
},

{
	"id" : "11051",
	"value" : "PAKALA"
},

{
	"id" : "1479108780381",
	"value" : "PALADUGU"
},

{
	"id" : "1414995330496",
	"value" : "PALAKALURU GNT"
},

{
	"id" : "11061",
	"value" : "PALAKOLLU"
},

{
	"id" : "11071",
	"value" : "PALAKONDA"
},

{
	"id" : "11081",
	"value" : "PALAKURTHY"
},

{
	"id" : "11091",
	"value" : "PALAMANERU"
},

{
	"id" : "21201",
	"value" : "PALANI"
},

{
	"id" : "11101",
	"value" : "PALASA"
},

{
	"id" : "11111",
	"value" : "PALASAMUDRAM"
},

{
	"id" : "11121",
	"value" : "PALEM"
},

{
	"id" : "11131",
	"value" : "PALER"
},

{
	"id" : "23329",
	"value" : "PALLAMKURU"
},

{
	"id" : "23171",
	"value" : "PALLIPATTU"
},

{
	"id" : "1429172682332",
	"value" : "PALNADU BUS STAND"
},

{
	"id" : "23052",
	"value" : "PALVAI X ROAD"
},

{
	"id" : "11151",
	"value" : "PALVANCHA"
},

{
	"id" : "11161",
	"value" : "PAMARRU"
},

{
	"id" : "11171",
	"value" : "PAMIDI"
},

{
	"id" : "11181",
	"value" : "PAMIDIPADU"
},

{
	"id" : "11191",
	"value" : "PAMULAPADU"
},

{
	"id" : "11201",
	"value" : "PAMULERU"
},

{
	"id" : "11211",
	"value" : "PAMURU"
},

{
	"id" : "1363784222931",
	"value" : "PAMURU MAIN ROAD"
},

{
	"id" : "23234",
	"value" : "PANCHA SHIVA DARSHAN"
},

{
	"id" : "23178",
	"value" : "PANCHA SKHETRA DARSINI"
},

{
	"id" : "11221",
	"value" : "PANCHALINGALA"
},

{
	"id" : "11231",
	"value" : "PANCHARAMALU"
},

{
	"id" : "23465",
	"value" : "PANCHAYAT BLDG CMPLX"
},

{
	"id" : "20251",
	"value" : "PANDARIKODA"
},

{
	"id" : "20261",
	"value" : "PANDARIPUR"
},

{
	"id" : "11241",
	"value" : "PANDILLA PALLE"
},

{
	"id" : "23001",
	"value" : "PANGALURU"
},

{
	"id" : "11251",
	"value" : "PANGIDI"
},

{
	"id" : "11281",
	"value" : "PANTHANGI"
},

{
	"id" : "20271",
	"value" : "PANVEL"
},

{
	"id" : "11291",
	"value" : "PANYAM"
},

{
	"id" : "1388062757340",
	"value" : "PAPIKONDALU PACKAGE"
},

{
	"id" : "1388064294609",
	"value" : "PAPIKONDALU TWO DAY PACKAGE"
},

{
	"id" : "23411",
	"value" : "PAPIKONDALU(SREERAMAGIRI)"
},

{
	"id" : "23412",
	"value" : "PAPIKONDALU-POCHAVARAM"
},

{
	"id" : "20281",
	"value" : "PARBHANI"
},

{
	"id" : "1396431952280",
	"value" : "PARCHURU"
},

{
	"id" : "11331",
	"value" : "PARCHURU"
},

{
	"id" : "20291",
	"value" : "PAREL"
},

{
	"id" : "11341",
	"value" : "PARIGI"
},

{
	"id" : "23214",
	"value" : "PARIJATHA TRAYAM"
},

{
	"id" : "1415446007206",
	"value" : "PARITALA TVR"
},

{
	"id" : "11351",
	"value" : "PARKALA"
},

{
	"id" : "21021",
	"value" : "PARLAKIMIDI"
},

{
	"id" : "11371",
	"value" : "PARNASALA"
},

{
	"id" : "11381",
	"value" : "PARVATHIPURAM"
},

{
	"id" : "11391",
	"value" : "PASNOOR"
},

{
	"id" : "11401",
	"value" : "PASRA"
},

{
	"id" : "11411",
	"value" : "PATANCHERU"
},

{
	"id" : "11421",
	"value" : "PATAPATNAM(BOARDER)"
},

{
	"id" : "20301",
	"value" : "PATAS"
},

{
	"id" : "23378",
	"value" : "PATHAPETA URAVAKONDA"
},

{
	"id" : "11441",
	"value" : "PATHARLAPADU"
},

{
	"id" : "11451",
	"value" : "PATOOR"
},

{
	"id" : "23275",
	"value" : "PATTHIPADU BY PASS"
},

{
	"id" : "11461",
	"value" : "PATTIKONDA"
},

{
	"id" : "11471",
	"value" : "PATTIPADU"
},

{
	"id" : "11481",
	"value" : "PATTISEEMA"
},

{
	"id" : "11491",
	"value" : "PATUR"
},

{
	"id" : "1516641542923",
	"value" : "PATVARI GUDEM"
},

{
	"id" : "11501",
	"value" : "PAVAGADA"
},

{
	"id" : "23049",
	"value" : "PCPALLI"
},

{
	"id" : "20311",
	"value" : "PDPR UP/DN"
},

{
	"id" : "11521",
	"value" : "PEBBAIR"
},

{
	"id" : "1414998241036",
	"value" : "PEDAKAKANI"
},

{
	"id" : "1428567001693",
	"value" : "PEDAMERANGI JN"
},

{
	"id" : "11551",
	"value" : "PEDANA"
},

{
	"id" : "11561",
	"value" : "PEDANANDIPADU"
},

{
	"id" : "1400940603528",
	"value" : "PEDAPALAPARRU-GDV"
},

{
	"id" : "22701",
	"value" : "PEDAPALLI"
},

{
	"id" : "23303",
	"value" : "PEDAPUDI(RPL)"
},

{
	"id" : "11571",
	"value" : "PEDARIKATLA"
},

{
	"id" : "23435",
	"value" : "PEDATUMMALA"
},

{
	"id" : "1400940499272",
	"value" : "PEDATUMMIDI-BTM"
},

{
	"id" : "23161",
	"value" : "PEDAVADLAPUDI"
},

{
	"id" : "11581",
	"value" : "PEDAVEGI"
},

{
	"id" : "11591",
	"value" : "PEDAVOORA"
},

{
	"id" : "1405596010381",
	"value" : "PEDAVURA"
},

{
	"id" : "11611",
	"value" : "PEDDA PAVANI"
},

{
	"id" : "1454910385879",
	"value" : "PEDDAPALLI AP"
},

{
	"id" : "11621",
	"value" : "PEDDAPALLY"
},

{
	"id" : "11631",
	"value" : "PEDDAPAMANGAL"
},

{
	"id" : "11641",
	"value" : "PEDDAPURAM"
},

{
	"id" : "11651",
	"value" : "PEDDEMULA"
},

{
	"id" : "11671",
	"value" : "PEDDURU"
},

{
	"id" : "11681",
	"value" : "PEDHAGANTAADA"
},

{
	"id" : "11691",
	"value" : "PENCHALAKONA"
},

{
	"id" : "11701",
	"value" : "PENDURTHI"
},

{
	"id" : "23338",
	"value" : "PENUGANCHIPROLU"
},

{
	"id" : "11721",
	"value" : "PENUGANGA"
},

{
	"id" : "11731",
	"value" : "PENUGOLANU"
},

{
	"id" : "11741",
	"value" : "PENUGONDA"
},

{
	"id" : "1420713471888",
	"value" : "PENUJANCHUPROL"
},

{
	"id" : "23008",
	"value" : "PENUKONDA(ATP)"
},

{
	"id" : "11751",
	"value" : "PERAVALI"
},

{
	"id" : "23066",
	"value" : "PERECHARLA"
},

{
	"id" : "1414995239956",
	"value" : "PERECHERLA"
},

{
	"id" : "11761",
	"value" : "PERIYAPALEM"
},

{
	"id" : "22331",
	"value" : "PERIYAPATNAM"
},

{
	"id" : "23515",
	"value" : "PERNAMITTA"
},

{
	"id" : "11771",
	"value" : "PERUPALEM"
},

{
	"id" : "11781",
	"value" : "PERUR"
},

{
	"id" : "1412398506729",
	"value" : "PERURI PETA CENTER"
},

{
	"id" : "23521",
	"value" : "PETLURU"
},

{
	"id" : "22980",
	"value" : "PHIRANGIPURAM"
},

{
	"id" : "11791",
	"value" : "PICHATOR"
},

{
	"id" : "11811",
	"value" : "PIDUGURALLA"
},

{
	"id" : "11821",
	"value" : "PILER"
},

{
	"id" : "20321",
	"value" : "PIMPRI"
},

{
	"id" : "11831",
	"value" : "PIPPARA"
},

{
	"id" : "23085",
	"value" : "PIRANGIPURAM"
},

{
	"id" : "11851",
	"value" : "PITHAPURAM"
},

{
	"id" : "11861",
	"value" : "PITLAM"
},

{
	"id" : "11871",
	"value" : "PLK VIA KOLANPAKA"
},

{
	"id" : "11891",
	"value" : "POCHAMPAD"
},

{
	"id" : "1460359276469",
	"value" : "POCHAMPAD XROAD"
},

{
	"id" : "11901",
	"value" : "POCHARAM"
},

{
	"id" : "23520",
	"value" : "PODALADA(RZL)"
},

{
	"id" : "11911",
	"value" : "PODALAKUR"
},

{
	"id" : "11931",
	"value" : "PODILI"
},

{
	"id" : "11941",
	"value" : "POKURU"
},

{
	"id" : "23514",
	"value" : "POLAMURU (BVRM)"
},

{
	"id" : "11951",
	"value" : "POLAVARAM"
},

{
	"id" : "1400811858064",
	"value" : "POLAVARAM CHATRAI"
},

{
	"id" : "11971",
	"value" : "PONDA"
},

{
	"id" : "21071",
	"value" : "PONDICHERY"
},

{
	"id" : "1418291284450",
	"value" : "PONDUGULA ST BORDER"
},

{
	"id" : "11981",
	"value" : "PONNAI"
},

{
	"id" : "11991",
	"value" : "PONNALUR"
},

{
	"id" : "12001",
	"value" : "PONNUR"
},

{
	"id" : "12011",
	"value" : "POODUR"
},

{
	"id" : "22911",
	"value" : "POODUR"
},

{
	"id" : "12021",
	"value" : "POOSAPATI REGA"
},

{
	"id" : "23265",
	"value" : "PORREDU"
},

{
	"id" : "12041",
	"value" : "PORUMAMILLA"
},

{
	"id" : "23264",
	"value" : "POTAVARAM"
},

{
	"id" : "22341",
	"value" : "POTHANAL"
},

{
	"id" : "12051",
	"value" : "POTHAVARAM"
},

{
	"id" : "12061",
	"value" : "POTHUGAL"
},

{
	"id" : "12071",
	"value" : "POTHUNURU"
},

{
	"id" : "21031",
	"value" : "POTTANGI"
},

{
	"id" : "12091",
	"value" : "PR PALLI"
},

{
	"id" : "12101",
	"value" : "PRAGADAVARAM"
},

{
	"id" : "12111",
	"value" : "PRAGNAPUR"
},

{
	"id" : "23232",
	"value" : "PRAKASHAM ROAD TPT"
},

{
	"id" : "12121",
	"value" : "PRASADAM PADU"
},

{
	"id" : "12131",
	"value" : "PRATHIPADU"
},

{
	"id" : "23495",
	"value" : "PRITHAKOLLA LANKA"
},

{
	"id" : "22351",
	"value" : "PRIYASANDRA"
},

{
	"id" : "12151",
	"value" : "PRODDUTUR"
},

{
	"id" : "12221",
	"value" : "PULIVENDULA"
},

{
	"id" : "12231",
	"value" : "PULKURTHY"
},

{
	"id" : "23083",
	"value" : "PULLALACHERUVU"
},

{
	"id" : "12241",
	"value" : "PULLAMPET"
},

{
	"id" : "23032",
	"value" : "PULLEMLA"
},

{
	"id" : "12251",
	"value" : "PULLETIKURRU"
},

{
	"id" : "23172",
	"value" : "PULLUR X ROAD"
},

{
	"id" : "1414673395531",
	"value" : "PUNE"
},

{
	"id" : "12261",
	"value" : "PUNGANUR"
},

{
	"id" : "12271",
	"value" : "PUNYAGIRI"
},

{
	"id" : "23021",
	"value" : "PURUSHOTTAPATNAM"
},

{
	"id" : "20371",
	"value" : "PUSAD"
},

{
	"id" : "12281",
	"value" : "PUTALPATTU"
},

{
	"id" : "12291",
	"value" : "PUTRELA"
},

{
	"id" : "12301",
	"value" : "PUTTAPAKA"
},

{
	"id" : "12311",
	"value" : "PUTTAPARTHI"
},

{
	"id" : "12321",
	"value" : "PUTTUR"
},

{
	"id" : "12341",
	"value" : "PYAPILI"
},

{
	"id" : "12361",
	"value" : "R.K.BEACH"
},

{
	"id" : "23453",
	"value" : "R.KOTHAGUDEM"
},

{
	"id" : "12381",
	"value" : "RACHAPUDI"
},

{
	"id" : "12391",
	"value" : "RACHERLA"
},

{
	"id" : "12401",
	"value" : "RADHAM CENTER"
},

{
	"id" : "1476684017463",
	"value" : "RAGAVPET"
},

{
	"id" : "12431",
	"value" : "RAGHAVAPURAM"
},

{
	"id" : "12451",
	"value" : "RAHMATABAD"
},

{
	"id" : "22371",
	"value" : "RAICHUR"
},

{
	"id" : "22381",
	"value" : "RAICHUR X RD"
},

{
	"id" : "1418979651455",
	"value" : "RAILWAY KODUR"
},

{
	"id" : "1500466576195",
	"value" : "RAIPUR"
},

{
	"id" : "23274",
	"value" : "RAJA NAGARAM BYPASS"
},

{
	"id" : "12461",
	"value" : "RAJAHMUNDRY"
},

{
	"id" : "12471",
	"value" : "RAJAM"
},

{
	"id" : "23064",
	"value" : "RAJAM1"
},

{
	"id" : "23431",
	"value" : "RAJAMPALLI DARSI ROAD"
},

{
	"id" : "12481",
	"value" : "RAJAMPET"
},

{
	"id" : "12491",
	"value" : "RAJANAGRAM"
},

{
	"id" : "12511",
	"value" : "RAJEEV CHOWRASTA KZNR"
},

{
	"id" : "20381",
	"value" : "RAJGAD"
},

{
	"id" : "1500466530662",
	"value" : "RAJNAD GAO"
},

{
	"id" : "20391",
	"value" : "RAJOORA"
},

{
	"id" : "12541",
	"value" : "RAJU PETA X"
},

{
	"id" : "12551",
	"value" : "RAJUPALEM"
},

{
	"id" : "12571",
	"value" : "RAJUPET"
},

{
	"id" : "12591",
	"value" : "RAKETLA"
},

{
	"id" : "22391",
	"value" : "RAM NAGAR-KA"
},

{
	"id" : "12601",
	"value" : "RAMABADRAPURAM"
},

{
	"id" : "12611",
	"value" : "RAMACHANDRAPURAM KKD"
},

{
	"id" : "12621",
	"value" : "RAMAGUNDAM"
},

{
	"id" : "12631",
	"value" : "RAMAGUNDAM X RD"
},

{
	"id" : "12641",
	"value" : "RAMANNAPET"
},

{
	"id" : "23503",
	"value" : "RAMAPPA TEMPLE"
},

{
	"id" : "1388323800414",
	"value" : "RAMAPPA TEMPLE PACKAGE"
},

{
	"id" : "12671",
	"value" : "RAMAPURAM"
},

{
	"id" : "1455286408750",
	"value" : "RAMAPURAM-K"
},

{
	"id" : "23014",
	"value" : "RAMAPURAM1"
},

{
	"id" : "12681",
	"value" : "RAMASAMUDRAM"
},

{
	"id" : "12691",
	"value" : "RAMAVARAM"
},

{
	"id" : "12711",
	"value" : "RAMAYAMPET"
},

{
	"id" : "12731",
	"value" : "RAMMANAPET"
},

{
	"id" : "23298",
	"value" : "RAMMURTHY NAGAR"
},

{
	"id" : "12771",
	"value" : "RAMPACHODAVARAM"
},

{
	"id" : "12781",
	"value" : "RANASTHALAM"
},

{
	"id" : "12791",
	"value" : "RANGA REDDY"
},

{
	"id" : "12801",
	"value" : "RANGAMPET"
},

{
	"id" : "12811",
	"value" : "RANGAPURAM"
},

{
	"id" : "1395319404190",
	"value" : "RANGAPURAM-DTML"
},

{
	"id" : "1362655814179",
	"value" : "RANIPET"
},

{
	"id" : "12831",
	"value" : "RAPUR"
},

{
	"id" : "12841",
	"value" : "RASNAM"
},

{
	"id" : "12861",
	"value" : "RAVALPALLY"
},

{
	"id" : "12871",
	"value" : "RAVI PADU"
},

{
	"id" : "12881",
	"value" : "RAVICHED"
},

{
	"id" : "23422",
	"value" : "RAVIKAMATHAM"
},

{
	"id" : "22998",
	"value" : "RAVINUTHALA"
},

{
	"id" : "12891",
	"value" : "RAVULAPALEM"
},

{
	"id" : "23424",
	"value" : "RAVULAPALLI"
},

{
	"id" : "12901",
	"value" : "RAYA PATNAM"
},

{
	"id" : "12911",
	"value" : "RAYACHOTI"
},

{
	"id" : "23404",
	"value" : "RAYADURG"
},

{
	"id" : "12921",
	"value" : "RAYADURGAM"
},

{
	"id" : "12931",
	"value" : "RAYAGADA"
},

{
	"id" : "12941",
	"value" : "RAYALA CHERUVU"
},

{
	"id" : "1421073469686",
	"value" : "RAYALASEEMA THERMAL POWER PROJECT"
},

{
	"id" : "23158",
	"value" : "RAYALPAD"
},

{
	"id" : "12951",
	"value" : "RAYALU1"
},

{
	"id" : "12961",
	"value" : "RAYALU2"
},

{
	"id" : "12531",
	"value" : "RAZOLU"
},

{
	"id" : "12971",
	"value" : "REBBANA"
},

{
	"id" : "12981",
	"value" : "REC SURATKAL"
},

{
	"id" : "13001",
	"value" : "RED BRIDGE"
},

{
	"id" : "21211",
	"value" : "RED HILLS"
},

{
	"id" : "13021",
	"value" : "REDDAPPAVALASA"
},

{
	"id" : "1374909506017",
	"value" : "REDDYPALAM"
},

{
	"id" : "13031",
	"value" : "REGODE"
},

{
	"id" : "1441013005216",
	"value" : "REGONDA"
},

{
	"id" : "13041",
	"value" : "REKHA PALLI"
},

{
	"id" : "13051",
	"value" : "RENIGUNTA"
},

{
	"id" : "23053",
	"value" : "RENTACHINTALA"
},

{
	"id" : "13061",
	"value" : "RENTACHINTHALA"
},

{
	"id" : "13071",
	"value" : "REPALLE"
},

{
	"id" : "22721",
	"value" : "REVURU"
},

{
	"id" : "23039",
	"value" : "RK-6"
},

{
	"id" : "23524",
	"value" : "RK.PURAM"
},

{
	"id" : "13161",
	"value" : "ROAD NO.8"
},

{
	"id" : "23107",
	"value" : "ROLLA"
},

{
	"id" : "23291",
	"value" : "ROMPI CHERLA"
},

{
	"id" : "13171",
	"value" : "ROMPICHERLA X RD"
},

{
	"id" : "23019",
	"value" : "ROY PET"
},

{
	"id" : "1404796846982",
	"value" : "RUDRAMPUR"
},

{
	"id" : "13191",
	"value" : "RUDRANGI"
},

{
	"id" : "13201",
	"value" : "RUDROOR"
},

{
	"id" : "13971",
	"value" : "S.K. UNIVERSITY"
},

{
	"id" : "13221",
	"value" : "S.MAGALURU"
},

{
	"id" : "13231",
	"value" : "S.N.PADU"
},

{
	"id" : "20401",
	"value" : "S.PUR(BAGLA)"
},

{
	"id" : "13271",
	"value" : "SA CROSS ROAD"
},

{
	"id" : "13281",
	"value" : "SABARIMALAI"
},

{
	"id" : "23384",
	"value" : "SABBAVARAM"
},

{
	"id" : "13291",
	"value" : "SADASIVAPET"
},

{
	"id" : "20411",
	"value" : "SADEM"
},

{
	"id" : "13301",
	"value" : "SADKARJUNI"
},

{
	"id" : "1376035896003",
	"value" : "SAGAR ETTIPOTALA WATER FALLS"
},

{
	"id" : "13351",
	"value" : "SAIDAPUR"
},

{
	"id" : "13371",
	"value" : "SAIPETA"
},

{
	"id" : "22401",
	"value" : "SAKHLESHPUR"
},

{
	"id" : "13381",
	"value" : "SAKINETIPALLI REVU"
},

{
	"id" : "13391",
	"value" : "SAKOLI"
},

{
	"id" : "20421",
	"value" : "SAKOLI1"
},

{
	"id" : "21221",
	"value" : "SALEM"
},

{
	"id" : "13401",
	"value" : "SALUR"
},

{
	"id" : "13411",
	"value" : "SAMARLAKOTA"
},

{
	"id" : "13421",
	"value" : "SAMBAYPALLY"
},

{
	"id" : "20431",
	"value" : "SANDUR X ROAD"
},

{
	"id" : "13451",
	"value" : "SANGAM"
},

{
	"id" : "1388553974453",
	"value" : "SANGAMESHWARA THEATER"
},

{
	"id" : "13461",
	"value" : "SANGAREDDY"
},

{
	"id" : "20451",
	"value" : "SANGLI"
},

{
	"id" : "20461",
	"value" : "SANGOLA"
},

{
	"id" : "23011",
	"value" : "SANIPAYEE"
},

{
	"id" : "1414998816495",
	"value" : "SANKARA EYE HOSPITAL GNT"
},

{
	"id" : "1426229349256",
	"value" : "SANTHA NUTHALAPADU"
},

{
	"id" : "22997",
	"value" : "SANTHAMAGULURU"
},

{
	"id" : "1418288919611",
	"value" : "SANTHAMGULUR X RD"
},

{
	"id" : "1419570878916",
	"value" : "SANTHI NAGAR TS"
},

{
	"id" : "13471",
	"value" : "SANTHI PURAM"
},

{
	"id" : "14821",
	"value" : "SANTHIPURAM"
},

{
	"id" : "20471",
	"value" : "SANTHPUR"
},

{
	"id" : "1388553934580",
	"value" : "SAPTAGIRI CIRCLE"
},

{
	"id" : "23316",
	"value" : "SARGAPUR ROAD"
},

{
	"id" : "20481",
	"value" : "SARKANI"
},

{
	"id" : "20491",
	"value" : "SASTHAPUR"
},

{
	"id" : "1476684730751",
	"value" : "SATTANPALLY KADAM"
},

{
	"id" : "13511",
	"value" : "SATTENAPALLY"
},

{
	"id" : "13521",
	"value" : "SATTUPALLY"
},

{
	"id" : "22772",
	"value" : "SATYANARAYANA PURAM"
},

{
	"id" : "1413293103420",
	"value" : "SATYANARAYANAPURAM-CHERLA"
},

{
	"id" : "13531",
	"value" : "SATYAVEEDU"
},

{
	"id" : "23089",
	"value" : "SAVALYAPURAM"
},

{
	"id" : "1364817435334",
	"value" : "SBI COLONY MPL"
},

{
	"id" : "1406885299871",
	"value" : "SCIM GOVT COLLEGE "
},

{
	"id" : "13581",
	"value" : "SEETHANAGARAM"
},

{
	"id" : "13591",
	"value" : "SHABAD"
},

{
	"id" : "1385100869708",
	"value" : "SHABARIMALAI AND RETURN"
},

{
	"id" : "13601",
	"value" : "SHADNAGAR"
},

{
	"id" : "13631",
	"value" : "SHAMMAPET"
},

{
	"id" : "13651",
	"value" : "SHANIGARAM"
},

{
	"id" : "13661",
	"value" : "SHANKARAMPET"
},

{
	"id" : "13671",
	"value" : "SHANKARPALLY"
},

{
	"id" : "23222",
	"value" : "SHANTHAKRUZ"
},

{
	"id" : "13681",
	"value" : "SHANTHAPUR"
},

{
	"id" : "1384595369151",
	"value" : "SHANTI NAGAR COLONY"
},

{
	"id" : "22411",
	"value" : "SHAPUR"
},

{
	"id" : "23469",
	"value" : "SHARAF BAZAAR"
},

{
	"id" : "20501",
	"value" : "SHD ACCOMOD"
},

{
	"id" : "20511",
	"value" : "SHD UP/DN"
},

{
	"id" : "20521",
	"value" : "SHD W/OUT ACCOM"
},

{
	"id" : "13711",
	"value" : "SHD(36)HRS ACOM"
},

{
	"id" : "20531",
	"value" : "SHD36HRS"
},

{
	"id" : "13721",
	"value" : "SHEELA NAGAR"
},

{
	"id" : "22421",
	"value" : "SHIMOGA"
},

{
	"id" : "22431",
	"value" : "SHIRIDI"
},

{
	"id" : "13741",
	"value" : "SHIVANNAGUDA"
},

{
	"id" : "22441",
	"value" : "SHIVARGUDDA"
},

{
	"id" : "20551",
	"value" : "SHOLAPUR"
},

{
	"id" : "13751",
	"value" : "SHRD.ACOM.CAT"
},

{
	"id" : "13761",
	"value" : "SIDDAPUR"
},

{
	"id" : "23023",
	"value" : "SIDDAVATAM"
},

{
	"id" : "23045",
	"value" : "SIDDHANTAM"
},

{
	"id" : "13781",
	"value" : "SIDDIPET"
},

{
	"id" : "1416280738181",
	"value" : "SIKHARAM"
},

{
	"id" : "1362728189027",
	"value" : "SIKHARAM"
},

{
	"id" : "13791",
	"value" : "SILERU"
},

{
	"id" : "23100",
	"value" : "SILK BOARD"
},

{
	"id" : "13801",
	"value" : "SIMHACHALAM"
},

{
	"id" : "13811",
	"value" : "SIMHADRIPURAM"
},

{
	"id" : "21041",
	"value" : "SIMILIGUDA"
},

{
	"id" : "22451",
	"value" : "SINDANOOR"
},

{
	"id" : "22461",
	"value" : "SINDIGI"
},

{
	"id" : "13821",
	"value" : "SINGARAYA KONDA"
},

{
	"id" : "23078",
	"value" : "SINGARAYAPALEM"
},

{
	"id" : "22471",
	"value" : "SIRA"
},

{
	"id" : "13841",
	"value" : "SIRICILLA"
},

{
	"id" : "13851",
	"value" : "SIRIGIRI PADU"
},

{
	"id" : "13861",
	"value" : "SIRIGUPPA"
},

{
	"id" : "13871",
	"value" : "SIRIKONDA"
},

{
	"id" : "13831",
	"value" : "SIRIPURAM"
},

{
	"id" : "1479108668837",
	"value" : "SIRIPURAM MDR"
},

{
	"id" : "23323",
	"value" : "SIRIVELLA"
},

{
	"id" : "13881",
	"value" : "SIRIVELLA METTA"
},

{
	"id" : "20571",
	"value" : "SIROOR"
},

{
	"id" : "13891",
	"value" : "SIRPUR"
},

{
	"id" : "13901",
	"value" : "SIRSAWADA"
},

{
	"id" : "22481",
	"value" : "SIRVER"
},

{
	"id" : "22941",
	"value" : "SITANAGARAM"
},

{
	"id" : "23233",
	"value" : "SITARA/CHERUVU CENTRE PT"
},

{
	"id" : "13931",
	"value" : "SITARAMAPURAM"
},

{
	"id" : "13941",
	"value" : "SITARAMPUR"
},

{
	"id" : "13951",
	"value" : "SIVA DARSHAN"
},

{
	"id" : "13961",
	"value" : "SIVA KSHETRAM(DECCAN)"
},

{
	"id" : "1383541779533",
	"value" : "SIVAKESHTRALU-MHND"
},

{
	"id" : "23136",
	"value" : "SKBR COLLEGE"
},

{
	"id" : "1458648383089",
	"value" : "SOAN.IB"
},

{
	"id" : "13981",
	"value" : "SOLIPUR"
},

{
	"id" : "23042",
	"value" : "SOMAGUDEM X ROAD"
},

{
	"id" : "14011",
	"value" : "SOMALA"
},

{
	"id" : "23340",
	"value" : "SOMANADEPALLI"
},

{
	"id" : "14021",
	"value" : "SOMASILA"
},

{
	"id" : "14031",
	"value" : "SOMPETA"
},

{
	"id" : "23401",
	"value" : "SOMULAPURAM"
},

{
	"id" : "22491",
	"value" : "SONALA"
},

{
	"id" : "22501",
	"value" : "SONE"
},

{
	"id" : "1418730757739",
	"value" : "SP CHITTOOR"
},

{
	"id" : "1418730398939",
	"value" : "SP EAST-GODAVARI"
},

{
	"id" : "1418730463679",
	"value" : "SP WEST-GODAVARI"
},

{
	"id" : "14041",
	"value" : "SPECIAL"
},

{
	"id" : "14071",
	"value" : "SRI KALA HASTHI"
},

{
	"id" : "23163",
	"value" : "SRI SAAGAR /ATP"
},

{
	"id" : "14091",
	"value" : "SRIHARI KOTA"
},

{
	"id" : "23328",
	"value" : "SRIHARIPURAM"
},

{
	"id" : "14101",
	"value" : "SRIKAKULAM"
},

{
	"id" : "1388553914127",
	"value" : "SRIKANTAM CIRCLE"
},

{
	"id" : "23296",
	"value" : "SRIKURMAM"
},

{
	"id" : "14111",
	"value" : "SRINAGAR COLONY"
},

{
	"id" : "14121",
	"value" : "SRINIVAS NAGR CLNY"
},

{
	"id" : "1370008930506",
	"value" : "SRIPERUMBUDUR"
},

{
	"id" : "14131",
	"value" : "SRIRAMPUR COLONY"
},

{
	"id" : "23040",
	"value" : "SRIRAMPURCOLONY"
},

{
	"id" : "22511",
	"value" : "SRIRANGAPATNAM"
},

{
	"id" : "14141",
	"value" : "SRISAILAM"
},

{
	"id" : "23493",
	"value" : "SRISILAM DARSHANI"
},

{
	"id" : "14161",
	"value" : "SRUNGAVARAPU KOTA"
},

{
	"id" : "23149",
	"value" : "SSLM1"
},

{
	"id" : "14171",
	"value" : "ST BDR GOWRIBIDANUR"
},

{
	"id" : "1414995169696",
	"value" : "STAMBALAGARUVU"
},

{
	"id" : "1362655726726",
	"value" : "STATE BOARDER"
},

{
	"id" : "14181",
	"value" : "STATE BOARDER"
},

{
	"id" : "14191",
	"value" : "STATE BORDER-KA"
},

{
	"id" : "14201",
	"value" : "STATE BORDER/MPL"
},

{
	"id" : "1391005563197",
	"value" : "SUBRAMANYAM DHRASHAN"
},

{
	"id" : "16501",
	"value" : "SUKUMA"
},

{
	"id" : "14271",
	"value" : "SULLURUPET"
},

{
	"id" : "14291",
	"value" : "SULTANABAD"
},

{
	"id" : "21051",
	"value" : "SUNABEDA"
},

{
	"id" : "1370009032354",
	"value" : "SUNGAVARI SATRAM"
},

{
	"id" : "21061",
	"value" : "SUNKI"
},

{
	"id" : "22531",
	"value" : "SURATKAL"
},

{
	"id" : "1400588303859",
	"value" : "SUREPALLI"
},

{
	"id" : "14361",
	"value" : "SURYAPET"
},

{
	"id" : "14421",
	"value" : "T.NARASAPURAM"
},

{
	"id" : "14431",
	"value" : "TADA"
},

{
	"id" : "14451",
	"value" : "TADEPALLI GUDEM"
},

{
	"id" : "14461",
	"value" : "TADIKALAPUDI"
},

{
	"id" : "14471",
	"value" : "TADIKONDA"
},

{
	"id" : "14481",
	"value" : "TADIMALLA"
},

{
	"id" : "14491",
	"value" : "TADIPATRI"
},

{
	"id" : "23092",
	"value" : "TADIVARIPALLY"
},

{
	"id" : "14501",
	"value" : "TADVAI"
},

{
	"id" : "14521",
	"value" : "TAGARAPU VALASA"
},

{
	"id" : "1375188927965",
	"value" : "TAGARUPUVALSA"
},

{
	"id" : "14531",
	"value" : "TAKKELLA PALLI"
},

{
	"id" : "1388327619487",
	"value" : "TALAKONA WATER FALSE PACKAGE"
},

{
	"id" : "14541",
	"value" : "TALAKONDA PALLY"
},

{
	"id" : "14551",
	"value" : "TALARLA PALLY"
},

{
	"id" : "14561",
	"value" : "TALLA PRODDUTUR"
},

{
	"id" : "22974",
	"value" : "TALLA REVU"
},

{
	"id" : "14571",
	"value" : "TALLADA"
},

{
	"id" : "14581",
	"value" : "TALLAPUDI"
},

{
	"id" : "1388821608719",
	"value" : "TALLURU"
},

{
	"id" : "21231",
	"value" : "TAMIL NADU"
},

{
	"id" : "22995",
	"value" : "TANAKALLU"
},

{
	"id" : "14591",
	"value" : "TANDUR"
},

{
	"id" : "14601",
	"value" : "TANGAD PALLY"
},

{
	"id" : "14611",
	"value" : "TANGUTURU "
},

{
	"id" : "14621",
	"value" : "TANUKU"
},

{
	"id" : "14631",
	"value" : "TARI GUNTA"
},

{
	"id" : "14641",
	"value" : "TARIGUPPALA"
},

{
	"id" : "23091",
	"value" : "TARLUPADU"
},

{
	"id" : "23518",
	"value" : "TATIPAKA RZL"
},

{
	"id" : "20581",
	"value" : "TAVERGERA"
},

{
	"id" : "14661",
	"value" : "TEKKALI"
},

{
	"id" : "14671",
	"value" : "TEKULAPALLI"
},

{
	"id" : "14681",
	"value" : "TEKURIPET"
},

{
	"id" : "1441881593166",
	"value" : "TELANGANA BORDER"
},

{
	"id" : "1413475371300",
	"value" : "TELAPROLU X ROAD"
},

{
	"id" : "14701",
	"value" : "TENALI"
},

{
	"id" : "1391163614217",
	"value" : "TETTU"
},

{
	"id" : "14711",
	"value" : "THADKAL"
},

{
	"id" : "14721",
	"value" : "THALLA PALLI"
},

{
	"id" : "14731",
	"value" : "THANAKALLU"
},

{
	"id" : "1416289395943",
	"value" : "THANDRAPADU"
},

{
	"id" : "20591",
	"value" : "THANE"
},

{
	"id" : "23315",
	"value" : "THANELLANKA"
},

{
	"id" : "14741",
	"value" : "THATHA HOTEL"
},

{
	"id" : "23033",
	"value" : "THERETPALLY"
},

{
	"id" : "14761",
	"value" : "THIPPAI GUDA"
},

{
	"id" : "14771",
	"value" : "THIPPARTHY"
},

{
	"id" : "14781",
	"value" : "THONDABAVI"
},

{
	"id" : "14791",
	"value" : "THONDUR"
},

{
	"id" : "22541",
	"value" : "THORNA"
},

{
	"id" : "23507",
	"value" : "THOUSAND PILLARS-KZPT"
},

{
	"id" : "23177",
	"value" : "THRILINGA DARSHINI"
},

{
	"id" : "14801",
	"value" : "THUGLI"
},

{
	"id" : "23267",
	"value" : "THURPUPALEM"
},

{
	"id" : "14841",
	"value" : "TILAK NAGAR"
},

{
	"id" : "20601",
	"value" : "TIMBURNI"
},

{
	"id" : "14851",
	"value" : "TIMMAJIPET"
},

{
	"id" : "14861",
	"value" : "TIMMAPALEM"
},

{
	"id" : "23010",
	"value" : "TIMMAYYMGARIPALLI"
},

{
	"id" : "14871",
	"value" : "TIPARTHY"
},

{
	"id" : "22561",
	"value" : "TIRTHAHALLY"
},

{
	"id" : "14881",
	"value" : "TIRUMALA"
},

{
	"id" : "14891",
	"value" : "TIRUMALA GIRI"
},

{
	"id" : "14911",
	"value" : "TIRUPATHI"
},

{
	"id" : "21241",
	"value" : "TIRUTTANI"
},

{
	"id" : "23337",
	"value" : "TIRUVAARURU"
},

{
	"id" : "21251",
	"value" : "TIRUVANNA MALAI"
},

{
	"id" : "14921",
	"value" : "TIRUVURU"
},

{
	"id" : "1394697594703",
	"value" : "TN STATE BOADER"
},

{
	"id" : "20811",
	"value" : "TONGPAL"
},

{
	"id" : "14951",
	"value" : "TOOPRAN"
},

{
	"id" : "23311",
	"value" : "TOORPU PALEM"
},

{
	"id" : "22571",
	"value" : "TORNAGALLU"
},

{
	"id" : "22581",
	"value" : "TORNAGI"
},

{
	"id" : "23301",
	"value" : "TORREDU"
},

{
	"id" : "14961",
	"value" : "TORRI MAMIDI"
},

{
	"id" : "14971",
	"value" : "TORRUR"
},

{
	"id" : "23498",
	"value" : "TRI VYKUNTA DARSHINI"
},

{
	"id" : "23184",
	"value" : "TRILINGA DARSHINI"
},

{
	"id" : "14991",
	"value" : "TRIPURANTHAKAM"
},

{
	"id" : "1527942244894",
	"value" : "TRIPURARAM MLG"
},

{
	"id" : "19301",
	"value" : "TRISSUR"
},

{
	"id" : "1466956778352",
	"value" : "TS BORDER"
},

{
	"id" : "23017",
	"value" : "TSR COMPLEX POINT"
},

{
	"id" : "15001",
	"value" : "TULASIPAKALU"
},

{
	"id" : "20611",
	"value" : "TULJAPUR"
},

{
	"id" : "15011",
	"value" : "TUMANALA"
},

{
	"id" : "15021",
	"value" : "TUMKUR"
},

{
	"id" : "15031",
	"value" : "TUNGABHADRA"
},

{
	"id" : "23362",
	"value" : "TUNGUNDRAM"
},

{
	"id" : "15041",
	"value" : "TUNI"
},

{
	"id" : "15051",
	"value" : "TURIMELLA"
},

{
	"id" : "1447480110690",
	"value" : "TXXXXXXXXXXXXXX"
},

{
	"id" : "15071",
	"value" : "UDAYAGIRI"
},

{
	"id" : "20621",
	"value" : "UDGIR"
},

{
	"id" : "22591",
	"value" : "UDIPI"
},

{
	"id" : "15081",
	"value" : "UDUMPUR"
},

{
	"id" : "15101",
	"value" : "ULINDA KONDA"
},

{
	"id" : "1394363948087",
	"value" : "ULLAGALLU"
},

{
	"id" : "15111",
	"value" : "ULUVAPADU"
},

{
	"id" : "22975",
	"value" : "UMARKOT"
},

{
	"id" : "22983",
	"value" : "UMARKOTA"
},

{
	"id" : "20631",
	"value" : "UMERGA"
},

{
	"id" : "20641",
	"value" : "UMERGA X ROADS"
},

{
	"id" : "20651",
	"value" : "UMERKHED"
},

{
	"id" : "15121",
	"value" : "UNDI"
},

{
	"id" : "15131",
	"value" : "UNGARALA METTA"
},

{
	"id" : "1372153707238",
	"value" : "UNGUTUR"
},

{
	"id" : "23278",
	"value" : "UNIKILI"
},

{
	"id" : "15161",
	"value" : "UPPALAPADU"
},

{
	"id" : "15171",
	"value" : "UPPER SILERU"
},

{
	"id" : "1400940561040",
	"value" : "UPPERAGUDEM-BTM"
},

{
	"id" : "23069",
	"value" : "UPPERU"
},

{
	"id" : "22601",
	"value" : "UPPINANGAD"
},

{
	"id" : "23448",
	"value" : "UPPLAMADAKA"
},

{
	"id" : "15181",
	"value" : "UPPUGUNDURU"
},

{
	"id" : "15191",
	"value" : "URAVAKONDA"
},

{
	"id" : "1393762729901",
	"value" : "UTHKOTA BORDER"
},

{
	"id" : "15201",
	"value" : "UTHUKOTA"
},

{
	"id" : "15211",
	"value" : "UTKOOR"
},

{
	"id" : "15221",
	"value" : "UTNOOR"
},

{
	"id" : "21261",
	"value" : "UTUKOTAI"
},

{
	"id" : "15411",
	"value" : "V V PALEM"
},

{
	"id" : "15231",
	"value" : "V.G.PURAM"
},

{
	"id" : "15241",
	"value" : "V.K.PADU"
},

{
	"id" : "15261",
	"value" : "V.KOTA"
},

{
	"id" : "23421",
	"value" : "V.MADUGULA"
},

{
	"id" : "15271",
	"value" : "V.N.PALLY"
},

{
	"id" : "15281",
	"value" : "V.P.NORTH"
},

{
	"id" : "15291",
	"value" : "V.P.SOUTH"
},

{
	"id" : "1363773742553",
	"value" : "V.R. KOTA"
},

{
	"id" : "23500",
	"value" : "V.V.MERAKA"
},

{
	"id" : "15301",
	"value" : "VADAMALPET"
},

{
	"id" : "15311",
	"value" : "VADAPALLY"
},

{
	"id" : "23385",
	"value" : "VADDADI"
},

{
	"id" : "1418291391250",
	"value" : "VADDAPALLI CH POST"
},

{
	"id" : "1418877519999",
	"value" : "VADDAPALLI CHECK POST"
},

{
	"id" : "15321",
	"value" : "VADDEMAN"
},

{
	"id" : "22963",
	"value" : "VADDIRALA"
},

{
	"id" : "23300",
	"value" : "VADISALERU"
},

{
	"id" : "15331",
	"value" : "VADLAPUDI"
},

{
	"id" : "15341",
	"value" : "VAGGAMPALLY"
},

{
	"id" : "23492",
	"value" : "VAISHNAVAKSHESTRA DARSHAN"
},

{
	"id" : "15351",
	"value" : "VAISHNAVDEVI"
},

{
	"id" : "15361",
	"value" : "VAJEDU"
},

{
	"id" : "15251",
	"value" : "VAJRA KARUR"
},

{
	"id" : "15371",
	"value" : "VAKADU"
},

{
	"id" : "15381",
	"value" : "VALAPARLA"
},

{
	"id" : "15391",
	"value" : "VALASA/OBULAYAPALLI"
},

{
	"id" : "23186",
	"value" : "VALETIVARIPALEM"
},

{
	"id" : "15401",
	"value" : "VALIGONDA"
},

{
	"id" : "15421",
	"value" : "VALLUR"
},

{
	"id" : "15451",
	"value" : "VANGAPADU X ROAD"
},

{
	"id" : "15471",
	"value" : "VANGARA"
},

{
	"id" : "15481",
	"value" : "VANGUR X ROADS"
},

{
	"id" : "15491",
	"value" : "VANIYAMBADI"
},

{
	"id" : "15501",
	"value" : "VANNIPENTA"
},

{
	"id" : "23387",
	"value" : "VANTLAMAMIDI"
},

{
	"id" : "22989",
	"value" : "VARARAMACHANDRAPURAM"
},

{
	"id" : "15511",
	"value" : "VARDANNAPET"
},

{
	"id" : "22991",
	"value" : "VARDHANNAPETA"
},

{
	"id" : "23470",
	"value" : "VARIKUNTAPADU"
},

{
	"id" : "15521",
	"value" : "VARNI"
},

{
	"id" : "15541",
	"value" : "VASILI"
},

{
	"id" : "15561",
	"value" : "VATTAVARLA PALLY"
},

{
	"id" : "15571",
	"value" : "VAYALPADU"
},

{
	"id" : "15591",
	"value" : "VEERANARAYANA PALLY"
},

{
	"id" : "15601",
	"value" : "VEERANKILAKU"
},

{
	"id" : "15611",
	"value" : "VEERAPUNAYINI PALLY"
},

{
	"id" : "15621",
	"value" : "VEERAVASARAM"
},

{
	"id" : "22994",
	"value" : "VEGIWADA"
},

{
	"id" : "23059",
	"value" : "VELANGI"
},

{
	"id" : "23333",
	"value" : "VELANGINI"
},

{
	"id" : "15631",
	"value" : "VELDURTY"
},

{
	"id" : "15641",
	"value" : "VELEMINEDU"
},

{
	"id" : "15651",
	"value" : "VELGATUR"
},

{
	"id" : "15661",
	"value" : "VELGAUR"
},

{
	"id" : "15671",
	"value" : "VELIGANDLA"
},

{
	"id" : "23330",
	"value" : "VELLATURU"
},

{
	"id" : "21271",
	"value" : "VELLORE"
},

{
	"id" : "23383",
	"value" : "VELLPURU"
},

{
	"id" : "15681",
	"value" : "VELUGODU"
},

{
	"id" : "15691",
	"value" : "VELUR"
},

{
	"id" : "15701",
	"value" : "VEMAGIRI"
},

{
	"id" : "15711",
	"value" : "VEMPALLY"
},

{
	"id" : "23238",
	"value" : "VEMSUR"
},

{
	"id" : "15721",
	"value" : "VEMULA"
},

{
	"id" : "15731",
	"value" : "VEMULA KONDA"
},

{
	"id" : "23093",
	"value" : "VEMULAPADU"
},

{
	"id" : "15741",
	"value" : "VEMULAWADA"
},

{
	"id" : "15771",
	"value" : "VENKATAGIRI"
},

{
	"id" : "15781",
	"value" : "VENKATAPUR"
},

{
	"id" : "15791",
	"value" : "VENKATRAO PALLY"
},

{
	"id" : "15811",
	"value" : "VENTRA PRAGADA"
},

{
	"id" : "15821",
	"value" : "VETAPALEM"
},

{
	"id" : "15831",
	"value" : "VETLAPALEM"
},

{
	"id" : "15841",
	"value" : "VIDAPANAKALLU"
},

{
	"id" : "15851",
	"value" : "VIDYADHAR PURAM"
},

{
	"id" : "23380",
	"value" : "VIDYANAGAR(VKD)"
},

{
	"id" : "15881",
	"value" : "VIJAYAWADA"
},

{
	"id" : "15901",
	"value" : "VIKARABAD"
},

{
	"id" : "20671",
	"value" : "VILEPARLE"
},

{
	"id" : "23398",
	"value" : "VILLIAMPAKKAM"
},

{
	"id" : "23067",
	"value" : "VINAYAKAPURAM"
},

{
	"id" : "15921",
	"value" : "VINJAMURU"
},

{
	"id" : "15931",
	"value" : "VINUKONDA"
},

{
	"id" : "1374669585361",
	"value" : "VIPPAGUNTA"
},

{
	"id" : "15941",
	"value" : "VISAKHAPATNAM"
},

{
	"id" : "1388403562093",
	"value" : "VISHAKA DARSHINI"
},

{
	"id" : "20681",
	"value" : "VITA"
},

{
	"id" : "15981",
	"value" : "VIZIANAGARAM"
},

{
	"id" : "15991",
	"value" : "VM BANZARA"
},

{
	"id" : "23307",
	"value" : "VODALA REVU"
},

{
	"id" : "16011",
	"value" : "VPS/PYLON"
},

{
	"id" : "16051",
	"value" : "VUYYURU"
},

{
	"id" : "22832",
	"value" : "VYJAPUR"
},

{
	"id" : "1387863513422",
	"value" : "VYSHNAVA DARSHINI"
},

{
	"id" : "1470237168423",
	"value" : "WADAPALLY"
},

{
	"id" : "16071",
	"value" : "WADASA"
},

{
	"id" : "16081",
	"value" : "WADIYARAM"
},

{
	"id" : "23262",
	"value" : "WAKAD"
},

{
	"id" : "16091",
	"value" : "WALTAIR"
},

{
	"id" : "16101",
	"value" : "WANAPARTHY"
},

{
	"id" : "23005",
	"value" : "WANKIDI"
},

{
	"id" : "16111",
	"value" : "WARANGAL - HANMAKONDA"
},

{
	"id" : "1388064370246",
	"value" : "WARGAL-KEESARAGUTTA PACKAGE"
},

{
	"id" : "16121",
	"value" : "WATPALLY"
},

{
	"id" : "16131",
	"value" : "WAZEDU"
},

{
	"id" : "23137",
	"value" : "WEST GODAVARI"
},

{
	"id" : "23381",
	"value" : "WOODPETA"
},

{
	"id" : "20701",
	"value" : "WORLI"
},

{
	"id" : "16151",
	"value" : "WYRA"
},

{
	"id" : "16161",
	"value" : "YACHARAM"
},

{
	"id" : "16181",
	"value" : "YADAGIRI GUTTA"
},

{
	"id" : "16191",
	"value" : "YADGIR"
},

{
	"id" : "16201",
	"value" : "YADIKI"
},

{
	"id" : "16211",
	"value" : "YAGANTI"
},

{
	"id" : "1447925934995",
	"value" : "YAGANTI JOGULAMBA TEMPLE"
},

{
	"id" : "23176",
	"value" : "YAGANTI1"
},

{
	"id" : "22842",
	"value" : "YAHOLA"
},

{
	"id" : "1429165903282",
	"value" : "YALAMANCHALI"
},

{
	"id" : "22631",
	"value" : "YANAGONDI"
},

{
	"id" : "16221",
	"value" : "YANAM"
},

{
	"id" : "16231",
	"value" : "YANAM BY PASS"
},

{
	"id" : "1368004130816",
	"value" : "YANAMADALA"
},

{
	"id" : "23037",
	"value" : "YAPA"
},

{
	"id" : "16241",
	"value" : "YARNA GUDEM"
},

{
	"id" : "23410",
	"value" : "YARRAVARAM"
},

{
	"id" : "20711",
	"value" : "YAVATH"
},

{
	"id" : "1463742291156",
	"value" : "YEDAPALLY"
},

{
	"id" : "23408",
	"value" : "YEDDULAPALLI CIRCLE"
},

{
	"id" : "20721",
	"value" : "YEDSI"
},

{
	"id" : "16271",
	"value" : "YEDUPAYALU"
},

{
	"id" : "16281",
	"value" : "YELAMANCHILI"
},

{
	"id" : "16301",
	"value" : "YELLA REDDY-MDK"
},

{
	"id" : "16311",
	"value" : "YELLAKONDA"
},

{
	"id" : "16321",
	"value" : "YELLANDU"
},

{
	"id" : "22641",
	"value" : "YELLAPUR"
},

{
	"id" : "16341",
	"value" : "YEMMIGANUR"
},

{
	"id" : "23028",
	"value" : "YENKUR"
},

{
	"id" : "22761",
	"value" : "YERNAGUDEM"
},

{
	"id" : "16351",
	"value" : "YERPEDU"
},

{
	"id" : "16361",
	"value" : "YERRA GONDA PALEM"
},

{
	"id" : "16371",
	"value" : "YERRA GUNTA"
},

{
	"id" : "16381",
	"value" : "YERRA GUNTA PALLY"
},

{
	"id" : "16391",
	"value" : "YERRA GUNTLA"
},

{
	"id" : "16401",
	"value" : "YERRA VALLI X RD- PBR"
},

{
	"id" : "23450",
	"value" : "YERRABALLI(UDG)"
},

{
	"id" : "22965",
	"value" : "YERRAGUNTAPALEM"
},

{
	"id" : "16251",
	"value" : "YERRAGUNTLA"
},

{
	"id" : "22987",
	"value" : "YERRAVARAM"
},

{
	"id" : "1487847329997",
	"value" : "YERRUPALEM"
},

{
	"id" : "20731",
	"value" : "YESGI"
},

{
	"id" : "16411",
	"value" : "YETHIPOTALA"
},

{
	"id" : "20741",
	"value" : "YOVATHMAL"
},

{
	"id" : "16441",
	"value" : "ZAHIRABAD"
},

{
	"id" : "16451",
	"value" : "ZEELAKARRA GUDEM"
},

{
	"id" : "",
	"value" : "no records found"
} ]
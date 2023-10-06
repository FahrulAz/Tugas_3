const url = 'https://covid-193.p.rapidapi.com/statistics?country=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '98ce4bf505msh98207c275d66127p12bfb0jsnc4540abe05b1',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

// // menggunakan promise js===========================================
// // init search button di html
// const searchButton = document.querySelector('#button-data');
// searchButton.addEventListener('click', function() {
//     //untuk mengambil value dari input user
//     let inputData = document.querySelector('#input-data');
//     fetch(url + inputData.value, options)
// 	  .then( response => response.json() )
// 	  .then( getData => {

// 	// 	//declar var baru //country mengambil dari key yang ada di api
// 		let dataCov = getData.response;
// 		let cards = '';
// 		dataCov.map(m => cards += showCards(m));
// 		//tampilkan di inner html
// 		const cardContent = document.querySelector('.card-content');
// 		cardContent.innerHTML = cards; 
// 		// setalah value dikirim maka akan hilang
// 		inputData.value = '';
// 	  });
// });



//menggunakan async await
const searchButton = document.querySelector('#button-data');
searchButton.addEventListener('click', async function() {
  const inputData = document.querySelector('#input-data');
  try {
    const dataCov = await getDataCov(inputData.value);
    updateUI(dataCov);
  } catch (err) {
    const contentErr = document.querySelector('.card-content');
    contentErr.innerHTML = cardErr(err);
    //set tampil error hanya 2 detik
    setTimeout(() => {
      $('.alertCard').hide();
    }, 3000);
  }
  //clear value event clik button
  inputData.value = "";
});




function getDataCov(valueSearch) {
  return fetch(url + valueSearch, options)
  .then(response => {
    if (response.ok === false) {
      throw new Error (response.statusText);
    }
    return response.json();
  })
  .then(response => {
    // console.log(response);
    if(response.results == 0) {
      if (valueSearch == "") { let e = 'input tidak boleh kosong';
      throw new Error (e)
    }
      e = 'Keyword salah';
      throw new Error (e)
    }
    return response.response;
  })
}


function updateUI(dataCov) {
  let cards = '';
  dataCov.map(m => cards += showCards(m));
  const cardContent = document.querySelector('.card-content');
  cardContent.innerHTML = cards; 
  // setalah value dikirim maka akan hilang
}




function separatorNumber(data) {
	if ( data === null ) {
		//merubah nilai null dari api menjadi string
		return('Nothing Cases')
	} else {
		//menambahkan separator titik pada angka
		return data.toLocaleString("de-DE");
	}
}


function showCards(m) {
	return `
			<h4 class="result-search text-center">data Covid-19 in ${m.country}</h4>
			<h5 class="text-center">date : ${m.day}</h5>
            <div class="col-md-4 col-sm-6 my-3">
                <div class="counter blue">
                  <div class="counter-content">
                    <div class="counter-icon">
                        <img class="img-fluid mb-3" src="img/activCases.jpg" width="50">
                    </div><h3>Active Cases</h3></div>
                  <span class="counter-value"><strong>${ separatorNumber(m.cases.active) }</strong></span>
                </div>
              </div>

              <div class="col-md-4 col-sm-6 my-3">
                <div class="counter green">
                  <div class="counter-content">
                    <div class="counter-icon">
                        <img class="img-fluid mb-3" src="img/newCases.JPG" width="40">
                    </div><h3>New Cases</h3></div>
                  <span class="counter-value"><strong>${separatorNumber(m.cases.new)}</strong></span>
                </div>
              </div>

              <div class="col-md-4 col-sm-6 my-3">
                <div class="counter">
                  <div class="counter-content">
                    <div class="counter-icon">
                        <img class="img-fluid mb-3" src="img/recovery.png" width="40">
                    </div><h3>Recovered Cases</h3></div>
                  <span class="counter-value"><strong>${ separatorNumber(m.cases.recovered) }</strong></span>
                </div>
              </div>

            <div class="col-md-4 col-sm-6 my-3">
                <div class="counter blue">
                  <div class="counter-content">
                    <div class="counter-icon">
                        <img class="img-fluid mb-3" src="img/totalcases.png" width="50">
                    </div><h3>Total Cases</h3></div>
                  <span class="counter-value"><strong>${ separatorNumber(m.cases.total) }</strong></span>
                </div>
              </div>
      
              <div class="col-md-4 col-sm-6 my-3">
                <div class="counter green">
                  <div class="counter-content">
                    <div class="counter-icon">
                        <img class="img-fluid mb-3" src="img/rip.jpg" width="40">
                    </div><h3>Total Deaths</h3></div>
                  <span class="counter-value"><strong>${separatorNumber(m.deaths.total)}</strong></span>
                </div>
              </div>

              <div class="col-md-4 col-sm-6 my-3">
                <div class="counter">
                  <div class="counter-content">
                    <div class="counter-icon">
                        <img class="img-fluid mb-3" src="img/totaltest.png" width="40">
                    </div><h3>Total Tests</h3></div>
                  <span class="counter-value"><strong>${ separatorNumber(m.tests.total) }</strong></span>
                </div>
              </div>
					`
}

function cardErr(e) {
  return `  <div class="alertCard alert alert-danger alert-dismissible fade show">
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  ${e} </div>`
}
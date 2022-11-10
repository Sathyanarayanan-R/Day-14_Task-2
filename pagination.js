let globalData = [];

let currPage = 0;

var tmp = 1;

// H1
const h1Ele = document.createElement('h1');
h1Ele.innerText = 'Pagination';
h1Ele.id = 'title';

// paragraph
const pELe = document.createElement('p');
pELe.innerText = 'Paginating 100 data for easy readability';
pELe.id = 'description';

// Main DIV
const mainDiv = document.createElement('div');
mainDiv.className = 'table-responsive';

// table
const tableEle = document.createElement('table');
tableEle.className = 'table table-bordered';
tableEle.id = 'table'

// thead
const theadEle = document.createElement('thead');
theadEle.className = 'table table-bordered table-dark';

// tr
const trEle = document.createElement('tr');

['Id', 'Email', 'Name'].forEach((columnName) => {
  // th
  const thEle = document.createElement('th');
  thEle.innerText = columnName;
  trEle.appendChild(thEle);
})

theadEle.appendChild(trEle);

// tbody
const tbodyEle = document.createElement('tbody');
tableEle.append(theadEle, tbodyEle);

mainDiv.appendChild(tableEle);

// Main DIV
const btnsDiv = document.createElement('div');
btnsDiv.className = 'd-flex justify-content-center';
btnsDiv.id = "buttons";


const showNextSetOfData = (btnName) => {

  if( btnName === '<< First') {
    btnName = 1;
    currPage = 0;
  } else if ( btnName === 'Next' ) {
    btnName = currPage + 2;
    if(currPage <= 18)
       currPage ++;
  } else if ( btnName === 'Previous' ) {
     btnName = currPage;
     if(currPage >= 1)
       currPage --;
  } else if ( btnName === 'Last >>' ) {
    btnName = 20;
    currPage = 19;
  } else {
    currPage = btnName - 1;
  }

  tbodyEle.innerHTML = '';
  const startIndex = currPage * 5;
  
  const endIndex = (currPage * 5) + 5;

  globalData.slice(startIndex, endIndex).forEach(({ email, id, name }) => {
    // tr
    const innerTr = document.createElement('tr');
     
    // tds
    const innerTdId = document.createElement('td');
    innerTdId.innerText = id;
    const innerTdName = document.createElement('td');
    innerTdName.innerText = name;
    const innerTdEmail = document.createElement('td');
    innerTdEmail.innerText = email;

    innerTr.append(innerTdId, innerTdEmail, innerTdName);

    tbodyEle.appendChild(innerTr);


  });

  tmp = btnName;

  if(btnName === 1 || btnName === '<< First') {
    btnsDiv.innerText = '';
    btnChangeFunc(1, 5);
    btnChangeFunc(23, 24);
  }
  if(btnName === 2 || btnName === 'Next') {
    btnsDiv.innerText = '';
    btnChangeFunc(1, 5);
    btnChangeFunc(22, 24);
  }
  if(btnName >= 3 && btnName <= 19) {
    btnsDiv.innerText = '';
    btnChangeFunc(0, 2);
    btnChangeFunc(btnName, btnName + 3);
    btnChangeFunc(22, 24);
  }
  if(btnName === 19 || btnName === 'Previous') {
    btnsDiv.innerText = '';
    btnChangeFunc(0, 2);
    btnChangeFunc(19, 23);
  }
  if(btnName === 20 || btnName === 'Last >>') {
    btnsDiv.innerText = '';
    btnChangeFunc(0, 1);
    btnChangeFunc(19, 23);
  }

}
 
const btnsContent = ['<< First', 'Next', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'Previous', 'Last >>'];

const btnChangeFunc = (startBtnIndex, EndBtnIndex) => {

btnsContent.slice(startBtnIndex, EndBtnIndex).forEach( (btnName) => {
     const btnEle = document.createElement('button');
     btnEle.innerText = btnName;
     btnEle.style.margin = '0 5px';

     if(typeof btnName === 'number') {
       btnEle.style.width = '30px';
     }
     
     if(tmp === btnName){
      btnEle.style.backgroundColor = 'red';
      btnEle.style.color = 'white';
     }

     btnsDiv.append(btnEle);

     btnEle.addEventListener( 'click', () => {
         showNextSetOfData(btnName);
     } );

     
})

}

document.body.style.textAlign = 'center'
document.body.append(h1Ele, pELe, mainDiv, btnsDiv);

const request = new XMLHttpRequest();

request.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');

request.send(null);

request.onload = () => {
  const data = JSON.parse(request.responseText);
  globalData = data;
  data.slice(currPage, 5).forEach(({ email, id, name }) => {
    // tr
    const innerTr = document.createElement('tr');

    // tds
    const innerTdId = document.createElement('td');
    innerTdId.innerText = id;
    const innerTdName = document.createElement('td');
    innerTdName.innerText = name;
    const innerTdEmail = document.createElement('td');
    innerTdEmail.innerText = email;

    innerTr.append(innerTdId, innerTdEmail, innerTdName);

    tbodyEle.appendChild(innerTr);

  })
  
  btnChangeFunc(1, 5);
  btnChangeFunc(23, 24);

};
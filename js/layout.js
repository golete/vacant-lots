/* globals showdown */
/* global slides01, slides02, slides03, slides04 */

// Define map, canvas renderer and center in Philadelphia
let map = L.map('map', {
  preferCanvas: true,
  renderer: L.canvas(),
  zoomControl: false
}).setView([39.9525, -75.1639], 12);

// Set geometry layer to operate on
const geometryLayer = L.layerGroup().addTo(map);
// Set empty data collector
let dataCollection = { features: [] };
let propertiesCollection = { features: [] };
let permitsCollection = { features: [] };
let phillyCollection = { features: [] };

let slideIndex = 0;

let insertsDivs = document.querySelectorAll('.insert');
let insertsBounds = [];

let markerOptions = {
  radius: 1,
  fillColor: "#2aa353",
  fillOpacity: 0,
  color: "#2aa353",
  opacity: 0.5
};

// Load maps tiles
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  foo: 'bar', attribution: '"Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."'
}).addTo(map);

// this lets us know which slides are going to be identified for each group
const slidesDivs01 = document.querySelector('#slides-01');
const slidesDivs02 = document.querySelector('#slides-02');
const slidesDivs03 = document.querySelector('#slides-03');
const slidesDivs04 = document.querySelector('#slides-04');


// 1. ADD TEXT TO SLIDES
/* takes the text content from slides.js and inserts it into the HTML slide
elements */

function initSlides() {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slidesDivs01.innerHTML = '';
  for (const [index, slide] of slides01.entries()) {
    const newSlideDiv = htmlToElement(`
      <div class="slide" id="slide-1${index}">
        <h4>${slide.title}</h4>
        ${converter.makeHtml(slide.content)}
      </div>
    `);
    slidesDivs01.appendChild(newSlideDiv);
  }

  slidesDivs02.innerHTML = '';
  for (const [index, slide] of slides02.entries()) {
    const newSlideDiv = htmlToElement(`
      <div class="slide" id="slide-2${index}">
        <h4>${slide.title}</h4>
        ${converter.makeHtml(slide.content)}
      </div>
    `);
    slidesDivs02.appendChild(newSlideDiv);
  }

  slidesDivs03.innerHTML = '';
  for (const [index, slide] of slides03.entries()) {
    const newSlideDiv = htmlToElement(`
      <div class="slide" id="slide-3${index}">
        <h4>${slide.title}</h4>
        ${converter.makeHtml(slide.content)}
      </div>
    `);
    slidesDivs03.appendChild(newSlideDiv);
  }

  slidesDivs04.innerHTML = '';
  for (const [index, slide] of slides04.entries()) {
    const newSlideDiv = htmlToElement(`
      <div class="slide" id="slide-4${index}">
        <h4>${slide.title}</h4>
        ${converter.makeHtml(slide.content)}
      </div>
    `);
    slidesDivs04.appendChild(newSlideDiv);
  }

  for (let div of insertsDivs) {
    let top = div.offsetTop;
    let hgt = div.offsetHeight;
    let bot = top + hgt;
    insertsBounds.push([top, bot]);
  }

  insertsBounds[0][0] = -1;
  insertsBounds[insertsBounds.length - 1][1] += 10000;
}


// 2. ADD MAP GEOMETRY PER SLIDE
/* selects geometry for each slide from dataCollection by checkin if phase of
the slide corresponds with phase of the feature */

let specialPhases = ['delinquent', 'usbank', 'sheriff'];

function geometryCollection(slide) {
  let { phase } = slide;
  let { philly } = slide;
  let { emphasis } = slide;
  let { year } = slide;
  let collection;
  if (phase === 'vacant') {
    collection = {
      type: 'FeatureCollection',
      features: propertiesCollection.features,
    };
  } else if (phase === 'permits') {
    collection = {
      type: 'FeatureCollection',
      features: permitsCollection.features.filter(f => f.properties.year === slide.year),
      year,
    };
  } else if (specialPhases.includes(phase)) {
    collection = {
      type: 'FeatureCollection',
      features: propertiesCollection.features.filter(f => f.properties[phase] === 1),
      phase
    };
  } else {
    collection = {
      type: 'FeatureCollection',
      features: dataCollection.features.filter(f => f.properties.phase === phase),
      emphasis,
    };
  }
  if (philly) {
    collection.features.push(phillyCollection);
  }
  return collection;
}

// updates map with the right geometry for the current slide
/* the collected geometry from the geometryCollection function is passed and a
geoJSON Layer is returned */
function updateMap(collection) {
  geometryLayer.clearLayers(); // removes the geometry from the previous slide
  let color;
  let fillOpacity;
  if (collection.phase === 'delinquent') {
    color = '#56a3a4';
  } else if (collection.phase === 'usbank') {
    color = '#fab12a';
  } else if (collection.phase === 'sheriff') {
    color = '#fa842a';
  } else {
    color = "#2aa353";
  }

  if (collection.emphasis) {
    fillOpacity = 0.4;
    color = '#eb5e34';
  } else {
    fillOpacity = 0;
  }

  if (collection.year) {
    color = "#ad3a36";
  }

  const geoJsonLayer = L.geoJSON(collection, {
    style: {
      color,
      fillOpacity,
      width: 3,
    },
    pointToLayer: (p, latlng) => L.circleMarker(latlng, markerOptions)
  })
    .addTo(geometryLayer);
  console.log('geometry updated!');
  return geoJsonLayer;
}


/* takes a slide object and returns the geometry for that slide using the
geometry collection function, then updates the map with that geometry using the
updateMap function */
function syncMapToSlide(slide) {
  const collection = slide.phase ? geometryCollection(slide) : dataCollection;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        l.bindTooltip(l.feature.properties.label, {
          permanent: true,
          direction: 'top',
          offset: [0, -10],
          opacity: 0.66,
        });
        l.openTooltip();
      });
    }
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  if (slide.bounds) {
    map.flyToBounds(slide.bounds);
  } else if (slide.phase) {
    map.flyToBounds(layer.getBounds());
  }
}

const slides = [...slides01, ...slides02, ...slides03, ...slides04];

// Update map to current slide using the syncMapToSlide function
function syncMapToCurrentSlide() {
  const currentSlide = slides[slideIndex];
  syncMapToSlide(currentSlide);
}

const slideCompleteDivs =  document.querySelector('.slide-complete');

// Get position of second section
const slidesDivs = document.querySelector('.slide');
const slidesDivsAll = document.getElementsByClassName('slide');
const titleSectionPos = slideCompleteDivs.children[0].offsetTop;
const footerPos = document.querySelector('body').offsetHeight;


/* get the index of the slide currently on the window by comparing the scroll
position to the slides fixed position */
function compareScrollSlide() {
  const scrollPosition = window.scrollY + window.innerHeight;

  for (let bounds of insertsBounds) {
    let upperBound = bounds[0] + window.innerHeight;
    let lowerBound = bounds[1] + (1.5 * window.innerHeight);
    if (scrollPosition > upperBound && scrollPosition < lowerBound) {
      document.querySelector('.header').classList.add('hidden');
      break;
    } else {
      document.querySelector('.header').classList.remove('hidden');
    }
  }

  let i;
  for (i = 0; i < slidesDivsAll.length; i++) {
    const slidePosition = slidesDivsAll[i].offsetTop;
    if (scrollPosition < slidePosition) {
      break;
    }
  }

  if (i === 0) {
    slideIndex = 0;
  } else if (slideIndex !== i - 1) {
    slideIndex = i - 1;
    syncMapToCurrentSlide();
  }
}

// 3. ACTUALLY LOAD THE DATA
/* loads the complete data from all slides and uses the syncMapToCurrentSlide to
update the slides consecutively */
function loadData() {
  fetch('data/places.json')
    .then(resp => resp.json())
    .then(data => {
      dataCollection = data;
      syncMapToCurrentSlide();
    });
}

function loadProperties() {
  fetch('data/properties.geojson')
    .then(resp => resp.json())
    .then(data => {
      propertiesCollection = data;
      syncMapToCurrentSlide();
    });
}

function loadPermits() {
  fetch('data/permits.json')
    .then(resp => resp.json())
    .then(data => {
      permitsCollection = data;
      syncMapToCurrentSlide();
    });
}

function loadPhilly() {
  fetch('data/philly.json')
    .then(resp => resp.json())
    .then(data => {
      phillyCollection = data;
      syncMapToCurrentSlide();
    });
}

// 5. PROGRAM

// get current slide with scrolling event
document.addEventListener('scroll', compareScrollSlide);

loadPhilly();
initSlides();
syncMapToCurrentSlide();

loadProperties();
loadPermits();
loadData();

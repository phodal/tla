var dimensions = {};

function drawFromLocalStorage() {
  var savedItems = window.localStorage.getItem('tla');
  var lastResults = window.localStorage.getItem('tla.last.results');
  if (savedItems) {
    var parsedItems = JSON.parse(savedItems);
    drawChart(parsedItems);
    window.results = parsedItems;
  }
  if (lastResults) {
    window.lastResults = JSON.parse(lastResults);
  }
}

function initForm() {
  window.results = [];
  window.lastResult = [];

  if (hasHash()) {
    drawFromHash()
  } else {
    drawFromLocalStorage();
  }

  var sections = document.getElementById('sections');
  var sectionsHtml = "";
  for (var i = 0; i < originDimensions.length; i++) {
    var dimension = originDimensions[i];
    var id = dimension.toLocaleLowerCase()
      .replace(/,/g, "")
      .replace(/ /g, "-");
    dimensions[id] = {
      id: id,
      axis: dimension
    };
    var value = 3;
    if (window.lastResults) {
      value = window.lastResults[id].value;
      window.location.hash = generateHash(window.results);
    }
    sectionsHtml = sectionsHtml + '  <section>\n' +
      '    <label for="' + id + '">' + dimension + '</label>\n' +
      '    <input id="' + id + '" type="range" min="0" max="5" step="1" value="' + value + '" data-orientation="horizontal">\n' +
      '    <span class="slide-result" id="' + id + '_span">' + value + '</span>' +
      '  </section>\n'
  }

  sections.innerHTML = sectionsHtml;
  window.dimensions = dimensions;
}

initForm();

function bindSliderEvent() {
  var arr = Object.keys(window.dimensions);
  for (var i = 0; i < arr.length; i++) {
    document.getElementById(arr[i]).addEventListener('change', function (result) {
      document.getElementById(result.target.id + '_span').innerHTML = result.target.value;
    })
  }
}

bindSliderEvent();

function handleClick() {
  event.preventDefault();
  var results = [];
  var arr = Object.keys(dimensions);
  for (var i = 0; i < arr.length; i++) {
    var currentDimension = dimensions[arr[i]];
    var value = document.getElementById(arr[i]).value;
    let parsedValue = parseInt(value);
    results.push({
      axis: currentDimension.axis,
      value: parsedValue
    });

    dimensions[arr[i]].value = parsedValue;
  }

  if (window.results.length <= 1) {
    window.results.push(results);
  } else {
    window.results.shift();
    window.results.push(results);
  }

  localStorage.setItem('tla', JSON.stringify(window.results));
  localStorage.setItem('tla.last.results', JSON.stringify(dimensions));

  window.location.hash = generateHash(window.results);
  drawChart(window.results);
}

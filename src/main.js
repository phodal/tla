var originDimensions = [
  "Emotional Intelligence",
  "Influencing",
  "Actively develops others",
  "Uses effective facilitation",
  "Actively builds team",
  "Active risk management",
  "Open communication",
  "Good coding skills",
  "Experience in full stack",
  "Pattern aware",
  "Current knowledge of codebase",
  "Continuous improvement",
  "Clarity of problem",
  "Business value focused",
  "Communication bridge",
  "Architectural vision",
  "Focus on principles",
  "Systems, not software",
  "Champions Cross-Functional Requirements",
  "Future thinking"
];

var dimensions = {};

function initForm() {
  window.results = [];
  window.lastResult = [];
  var savedItems = window.localStorage.getItem('tla');
  var lastrResults = window.localStorage.getItem('tla.last.results');
  if (savedItems) {
    var parsedItems = JSON.parse(savedItems);
    drawChart(parsedItems);
    window.results = parsedItems;
  }
  if (lastrResults) {
    window.lastResults = JSON.parse(lastrResults);
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
    }
    sectionsHtml = sectionsHtml + '  <section>\n' +
      '    <label for="' + id + '">' + dimension + '</label>\n' +
      '    <input id="' + id + '" type="range" min="0" max="5" step="1" value="' + value + '" data-orientation="horizontal">\n' +
      '  </section>\n'
  }

  sections.innerHTML = sectionsHtml;
}

initForm();

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

  drawChart(window.results);
}

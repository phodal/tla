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
  var sections = document.getElementById('sections');
  var sectionsHtml = "";
  for (var i = 0; i < originDimensions.length; i++) {
    var dimension = originDimensions[i];
    var id = dimension.toLocaleLowerCase().replace(/ /g, "-");
    dimensions[id] = dimension;
    sectionsHtml = sectionsHtml + '  <section>\n' +
      '    <label for="' + id + '">' + dimension + '</label>\n' +
      '    <input id="' + id + '" type="range" min="0" max="5" step="1" data-orientation="horizontal">\n' +
      '  </section>\n'
  }

  sections.innerHTML = sectionsHtml;

}

initForm();

function handleClick() {
  event.preventDefault();
  // draw(document.getElementById("myVal").value)
  drawChart();
}

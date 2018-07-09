const enviromentalColour = function (enviroment) {
  switch (enviroment) {
    case 'vagrant':
      return "#c22535";
      break;
    case 'build':
      return "#fc802b";
      break;
    case 'staging':
      return "#3779b0";
      break;
    case 'production':
      return "#80c04a";
      break;
  }
}

module.exports = enviromentalColour;

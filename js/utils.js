var utils = (function (window, document, undefined, $) {

  /**
   * Created by Chris on 01/07/2016.
   */

  var _minExpectancy = 200,     // Set ridiculous defaults to make sure right values are captured
      _maxExpectancy = 0,
      _low = [5, 69, 54],       // Color for lowest life expectancy
      _high = [151, 83, 34];    // Color for highest life expectancy

  var _interpolateHsl = function (lowHsl, highHsl, fraction) {
    var color = [];
    for (var i = 0; i < 3; i++) {
      color[i] = (highHsl[i] - lowHsl[i]) * fraction + lowHsl[i];
    }
    return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
  };

  var _parseYears = function (data) {
    years = [];
    for (var i in data) {
      if (i != 'NAME') {
        years.push(i);
      }
    }
    return years;
  };

  var _setFeatureStyle = function (feature) {
    var fraction = (Math.min(feature.getProperty('life_expectancy'), _maxExpectancy) - _minExpectancy) /
      (_maxExpectancy - _minExpectancy);

    var color = utils.interpolateHsl(_low, _high, fraction);

    return ({
      fillColor: color,
      strokeColor: 'white',
      fillOpacity: .4,
      strokeWeight: 1,
      strokeOpacity: .75
    });
  };

  var _getLifeExpectancyByYear = function (data, year) {
    _minExpectancy = 200;
    _maxExpectancy = 0;

    return data.map(function (item) {
      if (item[year] < _minExpectancy) {
        _minExpectancy = item[year];
      }

      if (item[year] > _maxExpectancy) {
        _maxExpectancy = item[year];
      }

      return {
        name: item.NAME,
        lifeExpectancy: item[year]
      }
    });
  };

  var _updateLifeExpectancy = function (data, map, year) {
    var mapped = utils.getLifeExpectancyByYear(data, year);
    var l = mapped.length;

    for (var i = 0; i < l; i++) {
      map.data
        .getFeatureById(mapped[i].name)
        .setProperty('life_expectancy', mapped[i].lifeExpectancy);
    }

    map.data.revertStyle();
    map.data.setStyle(_setFeatureStyle);
  };


  // Public
  //


  return {
    maxExpectancy: _maxExpectancy,
    minExpectancy: _minExpectancy,
    interpolateHsl: _interpolateHsl,
    parseYears: _parseYears,
    setFeatureStyle: _setFeatureStyle,
    getLifeExpectancyByYear: _getLifeExpectancyByYear,
    updateLifeExpectancy: _updateLifeExpectancy
  }

})(window, document, undefined, jQuery);


(function() {
  define(['observable', 'knockout', 'd3', 'dimple', 'dynatable'], function(Observable, ko, d3, dimple, dynatable) {
    return function(dataO, container, options) {
      var columns, cont, data, draw, id;
      id = this.genId;
      data = this.dataInit;
      columns = options.headers;
      cont = d3.select(container).append("div").attr("class", "table");
      draw = (function(_this) {
        return function(columns, data) {
          var cells, rows, table, tbody, th, thead, tr;
          cont.html("");
          table = cont.append("table").attr("style", "width: " + (options.width || 600) + "px").attr("id", "table" + id).attr("class", "table table-bordered table-hover table-striped table-condensed");
          thead = table.append("thead");
          tbody = table.append("tbody");
          tr = thead.append("tr");
          th = tr.selectAll("th").data(columns);
          th.enter().append("th").text(function(column) {
            return column;
          });
          rows = tbody.selectAll("tr").data(data);
          rows.exit().remove();
          rows = rows.enter().append("tr");
          cells = rows.selectAll("td").data(function(row) {
            return columns.map(function(column) {
              return {
                column: column,
                value: row[column]
              };
            });
          });
          cells.exit().remove();
          cells.enter().append("td").attr("style", "font-family: Courier").html(function(d) {
            return d.value;
          });
          return $(table).dynatable();
        };
      })(this);
      draw(columns, data);
      return dataO.subscribe((function(_this) {
        return function(newData) {
          return draw(columns, newData);
        };
      })(this));
    };
  });

}).call(this);

//# sourceMappingURL=tableChart.js.map

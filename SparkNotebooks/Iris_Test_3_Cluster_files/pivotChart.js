(function() {
  define(['jquery', 'underscore', 'observable', 'knockout', 'd3', 'c3', 'pivot'], function($, _, Observable, ko, d3, c3, pivot) {
    return function(dataO, container, options) {
      return require(['c3', 'pivotC3', 'pivotExport'], (function(_this) {
        return function(c3, pivotC3) {
          var customAggregators, derivedAttributes, extract_pivot_state, get_cell, get_saved_pivot_state, h, p, pivotOptions, plotThat, refresh, rendererOptions, renderers, save_pivot_state;
          h = options.height || 400;
          renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.c3_renderers, $.pivotUtilities.export_renderers);
          derivedAttributes = _.mapObject(options.derivedAttributes, function(val, key) {
            eval("var _f_ = " + val);
            return _f_;
          });
          get_cell = function() {
            var cell_dom_element;
            cell_dom_element = $(container).parents(".cell").not('.cell .cell')[0];
            return $(cell_dom_element).data("cell");
          };
          get_saved_pivot_state = function() {
            var saved_state, _ref;
            saved_state = (_ref = get_cell().metadata.presentation) != null ? _ref.pivot_chart_state : void 0;
            return JSON.parse(saved_state || "{}") || {};
          };
          extract_pivot_state = function(pivotConfig) {
            var pivotState;
            pivotState = JSON.parse(JSON.stringify(pivotConfig));
            delete pivotState["aggregators"];
            delete pivotState["renderers"];
            delete pivotState["derivedAttributes"];
            delete pivotState["rendererOptions"];
            delete pivotState["localeStrings"];
            return JSON.stringify(pivotState, void 0, 2);
          };
          save_pivot_state = function(state) {
            var cell;
            cell = get_cell();
            if (!cell.metadata.presentation) {
              cell.metadata.presentation = {};
            }
            return cell.metadata.presentation.pivot_chart_state = state;
          };
          refresh = function(options) {
            $(".pvtUi").css("width", "100%");
            return save_pivot_state(extract_pivot_state(options));
          };
          rendererOptions = {
            c3: {
              size: {
                height: h,
                width: $(container).width()
              },
              padding: {
                right: 50
              },
              grid: {
                y: {
                  show: true
                }
              },
              data: {
                order: null
              },
              axis: {
                x: {
                  tick: {
                    culling: {
                      max: 25
                    },
                    rotate: 75,
                    multiline: false
                  }
                }
              }
            }
          };
          window.c3 = c3;
          if (options.extraOptions.y_start_at != null) {
            rendererOptions.c3.axis.y = {
              min: Number(options.extraOptions.y_start_at),
              padding: {
                bottom: 0
              }
            };
          }
          pivotOptions = get_saved_pivot_state();
          pivotOptions.renderers = renderers;
          pivotOptions.derivedAttributes = derivedAttributes;
          pivotOptions.onRefresh = refresh;
          pivotOptions.rendererOptions = rendererOptions;
          customAggregators = $.extend($.pivotUtilities.aggregators, {
            "Ratio": $.pivotUtilities.aggregatorTemplates.sumOverSum()
          });
          delete customAggregators["Sum over Sum"];
          pivotOptions.aggregators = customAggregators;
          p = $("<div>");
          p.addClass("pivotChart").appendTo(container);
          plotThat = function(data) {
            var report_mode, toggleOptionsBtn;
            p.pivotUI(data, pivotOptions);
            toggleOptionsBtn = $("<a class='pvtUi-toggle-controls-btn'>show/hide options</a>");
            toggleOptionsBtn.click(function() {
              return p.find(".pvtUi").toggleClass("pivot-controls-hidden");
            });
            p.prepend(toggleOptionsBtn);
            report_mode = $("body[data-presentation='report']").length > 0;
            if (report_mode) {
              return $(".pvtUi").addClass("pivot-controls-hidden");
            }
          };
          dataO.subscribe(function(newData) {
            return plotThat(newData);
          });
          return plotThat(_this.dataInit);
        };
      })(this));
    };
  });

}).call(this);

//# sourceMappingURL=pivotChart.js.map

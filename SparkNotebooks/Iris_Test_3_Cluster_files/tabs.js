(function() {
  define(['jquery', 'observable', 'knockout', 'd3', 'dimple'], function($, Observable, ko, d3, dimple) {
    return function(dataO, container, options) {
      var get_cell, get_saved_state, save_state, saved_tab_id, ulId;
      ulId = this.genId;
      get_cell = function() {
        var cell_dom_element;
        cell_dom_element = $(container).parents(".cell").not('.cell .cell')[0];
        return $(cell_dom_element).data("cell");
      };
      get_saved_state = function() {
        var saved_state, _ref;
        saved_state = (_ref = get_cell().metadata.presentation) != null ? _ref.tabs_state : void 0;
        return JSON.parse(saved_state || "{}") || {};
      };
      save_state = function(state) {
        var cell;
        cell = get_cell();
        if (!cell.metadata.presentation) {
          cell.metadata.presentation = {};
        }
        return cell.metadata.presentation.tabs_state = JSON.stringify(state, void 0, 2);
      };
      $('#ul' + ulId + ' a').click(function(e) {
        var id;
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#tab' + ulId + ' div.active').removeClass('active');
        $('#ul' + ulId + ' li.active').removeClass('active');
        id = $(this).attr('href');
        $(id).addClass('active');
        $(this).parent().addClass('active');
        return save_state({
          tab_id: id
        });
      });
      saved_tab_id = get_saved_state().tab_id;
      if (saved_tab_id && $('a[href=' + saved_tab_id + ']').length > 0) {
        $('a[href=' + saved_tab_id + ']').click();
      } else {
        $('#ul' + ulId + ' li:first a').click();
      }
      return dataO.subscribe((function(_this) {
        return function(newData) {};
      })(this));
    };
  });

}).call(this);

//# sourceMappingURL=tabs.js.map

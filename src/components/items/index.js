require('./style.less');

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),

    init: function() {
        var self = this;
        // var items = this.state.items;
        // items.forEach(function(item) {
        //     var itemWidget = self.getWidgets(item.id);
        //     itemWidget.setParent(self);
        // });
        self.getWidgets('item').forEach(function(itemWidget) {
            itemWidget.setParent(self);
        });
    },

    getInitialState: function(input) {
        var items;
        if (input.items) {
            items = input.items.map(function(item) {
                return {
                    // make sure each item has a unique ID
                    label: item.label
                };
            });
        }

        return {
            items: items || []
        };
    },

    getTemplateData: function(state, input) {
        // If this is a rerender then we only have access
        // to the state which includes the "lightweight" items
        // (without the nested body content). However, if this
        // is not a rerender then we have access to the input
        // props which include the complete items.
        var items = input ? input.items : state.items;
        //
        // return {
        //     items: items.map(function(item, i) {
        //         // Build a view model for our item that will
        //         // simplify how the item is rendered
        //         return {
        //             label: item.label,
        //             renderBody: item.renderBody
        //         };
        //     })
        // };
        return {
            items: items
        };
    },

    handleClickAddItem: function(event) {
        event.preventDefault();
        var items = this.state.items;
        items.push({
            parent: this,
            label: 'Hello ' + items.length,
            renderBody: function(out) {
                out.write('TEST');
            }
        });

        this.setStateDirty('items');
    },

    getChildrenCount: function() {
        return this.state.items.length;
    }
});
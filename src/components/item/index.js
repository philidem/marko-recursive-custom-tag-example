require('./style.less');

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),

    init: function(config) {
        if (this.state.parent) {
            this.parent = this.state.parent;
        }
    },

    setParent: function(itemsWidget) {
        this.parent = itemsWidget;
    },

    getInitialState: function(input) {
        return {
            label: input.label,
            parent: input.parent
        };
    },

    getTemplateData: function(state, input) {
        return state || input;
    },

    handleClick: function(event) {
        // This click event will propagate to parent items as well
        if (!event.defaultPrevented) {
            event.preventDefault();
            var parent = this.parent;
            console.log('You clicked item ' + this.state.label + '. The parent has ' + parent.getChildrenCount() + ' children.');
            this.setState('label', this.state.label + '!');
        }
    }
});
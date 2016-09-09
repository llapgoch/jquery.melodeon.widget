;(function($){
    window.Llapgoch = window.Llapgoch || {};

    window.Llapgoch.MelodeonMenu = Class.create({
        defaults: {
            // Used to store on the element's data attribute and event namespace
            identifier: 'melodeon',
            hasChildrenClass: 'has-child',
            hasActiveChildrenClass: 'has-active-child',
            navItemHiddenClass: 'js-melodeon-hide',

            activeClass: 'is-active',
            openDefault: true,
            openDefaultSelector: '.js-melodeon-default',

            navContainerSelector: '.js-melodeon-list',
            navItemSelector: '.js-melodeon-item',
            triggerSelector: 'a',
            slideSpeed: 350
        },

        settings: {},
        $element: null,

        initialize: function($el, params){

            if(!$el){
                throw "An element must be provided";
            }

            params = params || {};
            this.settings = $.extend({}, this.defaults, params);

            $el.data(this.settings.identifier, this);
            this.$element = $el;

            this.setupChildren();
            this.start();
        },

        namespaceEvent: function(event){
            return event + "." + this.settings.identifier;
        },

        start: function(){
            this.stop();
            this.addEvents();

            if(this.settings.openDefault) {
                this.activateNav($(this.settings.openDefaultSelector, this.$element));
            }
        },
        
        stop: function(){
            this.removeDisplayStyles();
            this.removeEvents();
        },

        setupChildren: function(){
            // If the containing navItemSelector has children
            var self = this;

            $(this.settings.navItemSelector, this.$element).each(function(){
                var $this = $(this);

                if($(self.settings.navContainerSelector, $this).size()){
                    $this.addClass(self.settings.hasChildrenClass);
                }
            });

        },

        getTriggerSelector: function(){
            return this.settings.navItemSelector + "." + this.settings.hasChildrenClass + ' > ' + this.settings.triggerSelector;
        },

        addEvents: function(){
            var self = this;

            this.removeEvents();


            $(this.getTriggerSelector(), this.$element)
                .on(this.namespaceEvent('click'), function(ev){
                    ev.preventDefault();
                    self.activateNav($(this));
                });
        },

        /* Fire the event on this and the element in question */
        fireEvent: function(event, data){
            $(this).trigger(event, data);
            $(this.$element).trigger(event, data);
        },

        removeEvents: function(){
            $(this.getTriggerSelector()).off(this.namespaceEvent('click'));
        },

        isActive: function($item){
            return $item.hasClass(this.settings.activeClass);
        },
        
        removeDisplayStyles: function(){
            this.deactivateAllItems();
            $(this.settings.navItemSelector, this.$element)
                .removeClass(this.settings.navItemHiddenClass)
                .attr('style', '');
        },

        deactivateAllItems: function(){
            // Remove active class
            $(this.settings.navItemSelector, this.$element)
                .removeClass(this.settings.activeClass)
                .removeClass(this.settings.hasActiveChildrenClass);
        },

        getAllVisibleNavItems: function(){
            return $(this.settings.navItemSelector + ':not(.' + this.settings.navItemHiddenClass + ')', this.$element);
        },

        activateNav: function($item){
            var self = this;

            if(this.isActive($item.closest(this.settings.navItemSelector))){
                return;
            }
            
            // Use this to hook into
            this.fireEvent('activate', {item: $item});

            // Remove active class
            this.deactivateAllItems();

            var $navSiblingChildren = $item.siblings(this.settings.navContainerSelector)
                .children(this.settings.navItemSelector);

            var $itemContainer = $item.closest(this.settings.navItemSelector);

            // Add active class, slide all children out
            $itemContainer.addClass(this.settings.activeClass);
            $navSiblingChildren.slideDown(this.settings.slideSpeed);
            $navSiblingChildren.removeClass(this.settings.navItemHiddenClass);

            $itemContainer.parents(this.settings.navItemSelector).addClass(this.settings.hasActiveChildrenClass);

            // Only animate the items which currently don't have the hide class on them
            this.getAllVisibleNavItems().each(function(){
                var $this = $(this);
                var $parent = $this.parent().closest(self.settings.navItemSelector);

                if($parent.size() && $parent.hasClass(self.settings.activeClass) === false && $this.hasClass(self.settings.activeClass) === false && $this.hasClass(self.settings.hasActiveChildrenClass) === false){
                        $this.addClass(self.settings.navItemHiddenClass);
                        $this.slideUp(self.settings.slideSpeed);
                }
            });
        }
    });
}(jQuery));
# Melodeon Menu #
- A jQuery / Prototype menu. Made originally for Magento, it uses Prototype for its class structure and jQuery for everything else. Will be updated at some point to become a jQuery Widget.

### Usage ###
We initialize this way to emulate the way a jQuery Widget would create an instance of itself for each element in the selector. Access the menu object once instantiated using ```$('.element').data('melodeon')```.

```js
// Options is an optional parameter, see the defaults below
$('.js-melodeon').each(function(){
  new Llapgoch.MelodeonMenu($(this), {
    // Override options - optional - see below for all options
  });
});
```


### Options

* `identifier` **default: melodeon** Used as the event namespace identifier and the element's data attribute name
* `hasChildrenClass` **default: 'has-child'** The class to give to a *navItemSelector* with children
* `hasActiveChildrenClass` *default: 'has-active-child'* The class to give to a parent *navItemSelector* with active children
* `navItemHiddenClass` **default: 'js-melodeon-hide'** Used internally to identify hidden *navItemSelector*s
* `activeClass` **default: 'is-active'** The class to assign to an active *navItemSelector*
* `openDefault` **default: true** Whether to open an item within the structure with the selector *openDefaultSelector*
* `openDefaultSelector` **default: '.js-melodeon-default'** Selector used to define an element to be the opened by default when the menu starts.
* `navContainerSelector` **default: '.js-melodeon-list'** Selector used to denote a container of *navItemSelector*s. Typically will be a **ul**
* `navItemSelector` **default: '.js-melodeon-item'** Selector used to denote a menu item. Typically will be an **li**
* `triggerSelector` **default: 'a'** Selector used to trigger opening / closing of the menu items
* `slideSpeed` **default: 350** Animation speed of the menu's slide effect in milliseconds


### Methods ###

* `start` Initializes the menu. This is called automatically when the menu instance is instantiated
* `stop` Removes the menu's events and classes
* `activateNav($item)`  opens a menu item. An instance of a *triggerSelector* item should be passed in


### Callbacks ###

**activate**
```js
$('.js-melodeon').on('activate', function(ev, data){
  // Code to run when an menu item is activated, use data. 
  // use data.item to access the clicked element
});
```

# Melodeon #

- Currently uses prototype for its class structure and jQuery.

### Usage ###

```js
$('.js-melodeon').each(function(){
  new Llapgoch.MelodeonMenu($(this));
});
```
- An instance of the menu is placed on the data attribute *melodeon* of the element.


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
  // Code to run when an menu item is activated
  
});
```

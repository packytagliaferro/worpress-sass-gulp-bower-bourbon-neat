/*
 *  custombox v3.0.1 - 2015-09-19
 *  Modal Window Effects with transitions CSS3.
 *  http://dixso.github.io/custombox/
 *  (c) 2015 Julio de la Calle - @dixso9
 *
 *  dataset - https://gist.github.com/brettz9/4093766
 *  classList - http://purl.eligrey.com/github/classList.js/blob/master/classList.js
 *  addEventListener - https://gist.github.com/2864711/946225eb3822c203e8d6218095d888aac5e1748e
 *  :scope polyfill - http://stackoverflow.com/questions/6481612/queryselector-search-immediate-children
 *  forEach - http://es5.github.com/#x15.4.4.18
 *  Object.assign() - https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/assign
 *  Array.isArray() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
 *
 *  Under MIT License - http://opensource.org/licenses/MIT
 */
function cbExtendObjects() {
    for (var a = 1, b = arguments.length; b > a; a++)
        for (var c in arguments[a]) arguments[a].hasOwnProperty(c) && (arguments[0][c] = arguments[a][c]);
    return arguments[0]
}
if (function(a) {
        a.getComputedStyle || (a.getComputedStyle = function(a) {
            return this.el = a, this.getPropertyValue = function(b) {
                var c = /(\-([a-z]){1})/g;
                return "float" == b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function() {
                    return arguments[2].toUpperCase()
                })), a.currentStyle[b] ? a.currentStyle[b] : null
            }, this
        })
    }(window), Function.prototype.bind || (Function.prototype.bind = function(a) {
        "use strict";
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = Array.prototype.slice.call(arguments, 1),
            c = this,
            d = function() {},
            e = function() {
                return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
            };
        return d.prototype = this.prototype, e.prototype = new d, e
    }), function() {
        "use strict";
        var a = Object.prototype,
            b = a.__defineGetter__,
            c = a.__defineSetter__,
            d = a.__lookupGetter__,
            e = a.__lookupSetter__,
            f = a.hasOwnProperty;
        b && c && d && e && (Object.defineProperty || (Object.defineProperty = function(a, g, h) {
            if (arguments.length < 3) throw new TypeError("Arguments not optional");
            if (g += "", f.call(h, "value") && (d.call(a, g) || e.call(a, g) || (a[g] = h.value), f.call(h, "get") || f.call(h, "set"))) throw new TypeError("Cannot specify an accessor and a value");
            if (!(h.writable && h.enumerable && h.configurable)) throw new TypeError("This implementation of Object.defineProperty does not support false for configurable, enumerable, or writable.");
            return h.get && b.call(a, g, h.get), h.set && c.call(a, g, h.set), a
        }), Object.getOwnPropertyDescriptor || (Object.getOwnPropertyDescriptor = function(a, b) {
            if (arguments.length < 2) throw new TypeError("Arguments not optional.");
            b += "";
            var c = {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                },
                g = d.call(a, b),
                h = e.call(a, b);
            return f.call(a, b) ? g || h ? (delete c.writable, c.get = c.set = void 0, g && (c.get = g), h && (c.set = h), c) : (c.value = a[b], c) : c
        }), Object.defineProperties || (Object.defineProperties = function(a, b) {
            var c;
            for (c in b) f.call(b, c) && Object.defineProperty(a, c, b[c])
        }))
    }(), !(document.documentElement.dataset || Object.getOwnPropertyDescriptor(Element.prototype, "dataset") && Object.getOwnPropertyDescriptor(Element.prototype, "dataset").get)) {
    var propDescriptor = {
        enumerable: !0,
        get: function() {
            "use strict";
            var a, b, c, d, e, f, g = this,
                h = this.attributes,
                i = h.length,
                j = function(a) {
                    return a.charAt(1).toUpperCase()
                },
                k = function() {
                    return this
                },
                l = function(a, b) {
                    return "undefined" != typeof b ? this.setAttribute(a, b) : this.removeAttribute(a)
                };
            try {
                ({}).__defineGetter__("test", function() {}), b = {}
            } catch (m) {
                b = document.createElement("div")
            }
            for (a = 0; i > a; a++)
                if (f = h[a], f && f.name && /^data-\w[\w\-]*$/.test(f.name)) {
                    c = f.value, d = f.name, e = d.substr(5).replace(/-./g, j);
                    try {
                        Object.defineProperty(b, e, {
                            enumerable: this.enumerable,
                            get: k.bind(c || ""),
                            set: l.bind(g, d)
                        })
                    } catch (n) {
                        b[e] = c
                    }
                }
            return b
        }
    };
    try {
        Object.defineProperty(Element.prototype, "dataset", propDescriptor)
    } catch (e) {
        propDescriptor.enumerable = !1, Object.defineProperty(Element.prototype, "dataset", propDescriptor)
    }
}
"document" in self && ("classList" in document.createElement("_") ? ! function() {
        "use strict";
        var a = document.createElement("_");
        if (a.classList.add("c1", "c2"), !a.classList.contains("c2")) {
            var b = function(a) {
                var b = DOMTokenList.prototype[a];
                DOMTokenList.prototype[a] = function(a) {
                    var c, d = arguments.length;
                    for (c = 0; d > c; c++) a = arguments[c], b.call(this, a)
                }
            };
            b("add"), b("remove")
        }
        if (a.classList.toggle("c3", !1), a.classList.contains("c3")) {
            var c = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(a, b) {
                return 1 in arguments && !this.contains(a) == !b ? b : c.call(this, a)
            }
        }
        a = null
    }() : ! function(a) {
        "use strict";
        if ("Element" in a) {
            var b = "classList",
                c = "prototype",
                d = a.Element[c],
                e = Object,
                f = String[c].trim || function() {
                    return this.replace(/^\s+|\s+$/g, "")
                },
                g = Array[c].indexOf || function(a) {
                    for (var b = 0, c = this.length; c > b; b++)
                        if (b in this && this[b] === a) return b;
                    return -1
                },
                h = function(a, b) {
                    this.name = a, this.code = DOMException[a], this.message = b
                },
                i = function(a, b) {
                    if ("" === b) throw new h("SYNTAX_ERR", "An invalid or illegal string was specified");
                    if (/\s/.test(b)) throw new h("INVALID_CHARACTER_ERR", "String contains an invalid character");
                    return g.call(a, b)
                },
                j = function(a) {
                    for (var b = f.call(a.getAttribute("class") || ""), c = b ? b.split(/\s+/) : [], d = 0, e = c.length; e > d; d++) this.push(c[d]);
                    this._updateClassName = function() {
                        a.setAttribute("class", this.toString())
                    }
                },
                k = j[c] = [],
                l = function() {
                    return new j(this)
                };
            if (h[c] = Error[c], k.item = function(a) {
                    return this[a] || null
                }, k.contains = function(a) {
                    return a += "", -1 !== i(this, a)
                }, k.add = function() {
                    var a, b = arguments,
                        c = 0,
                        d = b.length,
                        e = !1;
                    do a = b[c] + "", -1 === i(this, a) && (this.push(a), e = !0); while (++c < d);
                    e && this._updateClassName()
                }, k.remove = function() {
                    var a, b, c = arguments,
                        d = 0,
                        e = c.length,
                        f = !1;
                    do
                        for (a = c[d] + "", b = i(this, a); - 1 !== b;) this.splice(b, 1), f = !0, b = i(this, a); while (++d < e);
                    f && this._updateClassName()
                }, k.toggle = function(a, b) {
                    a += "";
                    var c = this.contains(a),
                        d = c ? b !== !0 && "remove" : b !== !1 && "add";
                    return d && this[d](a), b === !0 || b === !1 ? b : !c
                }, k.toString = function() {
                    return this.join(" ")
                }, e.defineProperty) {
                var m = {
                    get: l,
                    enumerable: !0,
                    configurable: !0
                };
                try {
                    e.defineProperty(d, b, m)
                } catch (n) {
                    -2146823252 === n.number && (m.enumerable = !1, e.defineProperty(d, b, m))
                }
            } else e[c].__defineGetter__ && d.__defineGetter__(b, l)
        }
    }(self)), String.prototype.trim || ! function() {
        var a = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(a, "")
        }
    }(), Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
        var c;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var d = Object(this),
            e = d.length >>> 0;
        if (0 === e) return -1;
        var f = +b || 0;
        if (1 / 0 === Math.abs(f) && (f = 0), f >= e) return -1;
        for (c = Math.max(f >= 0 ? f : e - Math.abs(f), 0); e > c;) {
            if (c in d && d[c] === a) return c;
            c++
        }
        return -1
    }),
    function(a, b, c) {
        if ((!a.addEventListener || !a.removeEventListener) && a.attachEvent && a.detachEvent) {
            var d = function(a) {
                    return "function" == typeof a
                },
                e = function(a, b) {
                    var d = b[c];
                    if (d)
                        for (var e, f = d.length; f--;)
                            if (e = d[f], e[0] === a) return e[1]
                },
                f = function(a, b, d) {
                    var f = b[c] || (b[c] = []);
                    return e(a, b) || (f[f.length] = [a, d], d)
                },
                g = function(a) {
                    var c = b[a];
                    b[a] = function(a) {
                        return j(c(a))
                    }
                },
                h = function(c, e) {
                    if (d(e)) {
                        var g = this;
                        g.attachEvent("on" + c, f(g, e, function(c) {
                            c = c || a.event, c.preventDefault = c.preventDefault || function() {
                                c.returnValue = !1
                            }, c.stopPropagation = c.stopPropagation || function() {
                                c.cancelBubble = !0
                            }, c.target = c.target || c.srcElement || b.documentElement, c.currentTarget = c.currentTarget || g, c.timeStamp = c.timeStamp || (new Date).getTime(), e.call(g, c)
                        }))
                    }
                },
                i = function(a, b) {
                    if (d(b)) {
                        var c = this,
                            f = e(c, b);
                        f && c.detachEvent("on" + a, f)
                    }
                },
                j = function(a) {
                    var b = a.length;
                    if (b)
                        for (; b--;) a[b].addEventListener = h, a[b].removeEventListener = i;
                    else a.addEventListener = h, a.removeEventListener = i;
                    return a
                };
            if (j([b, a]), "Element" in a) {
                var k = a.Element;
                k.prototype.addEventListener = h, k.prototype.removeEventListener = i
            } else b.attachEvent("onreadystatechange", function() {
                j(b.all)
            }), g("getElementsByTagName"), g("getElementById"), g("createElement"), j(b.all)
        }
    }(window, document, "x-ms-event-listeners"), Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
        "use strict";
        var c, d;
        if (null == this) throw new TypeError("this is null or not defined");
        var e, f = Object(this),
            g = f.length >>> 0;
        if ("[object Function]" !== {}.toString.call(a)) throw new TypeError(a + " is not a function");
        for (arguments.length >= 2 && (c = b), d = 0; g > d;) d in f && (e = f[d], a.call(c, e, d, f)), d++
    }),
    function(a, b) {
        try {
            a.querySelector(":scope body")
        } catch (c) {
            ["querySelector", "querySelectorAll"].forEach(function(c) {
                var d = b[c];
                b[c] = function(b) {
                    if (/(^|,)\s*:scope/.test(b)) {
                        var e = this.id;
                        this.id = "ID_" + Date.now(), b = b.replace(/((^|,)\s*):scope/g, "$1#" + this.id);
                        var f = a[c](b);
                        return this.id = e, f
                    }
                    return d.call(this, b)
                }
            })
        }
    }(window.document, Element.prototype), -1 === navigator.appVersion.indexOf("MSIE 8.") && -1 === navigator.appVersion.indexOf("MSIE 9.") && (Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function(a) {
            "use strict";
            if (void 0 === a || null === a) throw new TypeError("Cannot convert first argument to object");
            for (var b = Object(a), c = 1; c < arguments.length; c++) {
                var d = arguments[c];
                if (void 0 !== d && null !== d)
                    for (var e = Object.keys(Object(d)), f = 0, g = e.length; g > f; f++) {
                        var h = e[f],
                            i = Object.getOwnPropertyDescriptor(d, h);
                        void 0 !== i && i.enumerable && (b[h] = d[h])
                    }
            }
            return b
        }
    })), Array.isArray || (Array.isArray = function(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    });
    
var Custombox = (function ( w, d, h ) {
    'use strict';
    /*
     ----------------------------
     Cache
     ----------------------------
     */
    var _cache = {
        create:     document.createElement, // Performance call create.
        settings:   [],                     // Storage settings.
        overlay:    [],                     // Storage of the overlay.
        wrapper:    [],                     // Storage the wrapper.
        container:  [],                     // Storage the container of the modal.
        modal:      [],                     // Storage the modal.
        content:    [],                     // Storage the content of the modal.
        inline:     [],                     // Storage the element inline.
        size:       [],                     // Storage the size of the modal.
        close:      [],                     // Storage the callback open.
        open:       [],                     // Storage the callback open.
        scroll:     [],                     // Storage the position of top.
        display:    [],                     // Storage if the element is hidden.
        item:       -1                      // Number the modals.
    },
    /*
     ----------------------------
     Settings
     ----------------------------
     */
    _defaults = {
        target:         null,               // Set the URL, ID or Class.
        id:             null,               // Set the ID for the modal.
        cache:          false,              // If set to false, it will force requested pages not to be cached by the browser only when send by AJAX.
        escKey:         true,               // Allows the user to close the modal by pressing 'ESC'.
        zIndex:         '1000',             // Overlay z-index: Auto or number.
        overlay:        true,               // Show the overlay.
        overlayColor:   '#000',             // Overlay color.
        overlayOpacity: 0.7,                // The overlay opacity level. Range: 0 to 1.
        overlayClose:   true,               // Allows the user to close the modal by clicking the overlay.
        overlaySpeed:   300,                // Sets the speed of the overlay, in milliseconds.
        overlayEffect:  'auto',             // Combine any of the effects.
        width:          null,               // Set a fixed total width.
        effect:         'fadein',           // fadein | slide | newspaper | fall | sidefall | blur | flip | sign | superscaled | slit | rotate | letmein | makeway | slip | corner | slidetogether | scale | door | push | contentscale.
        position:       'center, center',   // Set position of modal. First position 'x': left, center and right. Second position 'y': top, center, bottom.
        animation:      null,               // Only with effects: slide, flip and rotate (top, right, bottom, left and center) | (vertical or horizontal) and output position separated by commas. Example: 'top, bottom'.
        speed:          500,                // Sets the speed of the transitions, in milliseconds.
        open:           null,               // Callback that fires right before begins to open.
        complete:       null,               // Callback that fires right after loaded content is displayed.
        close:          null                // Callback that fires once is closed.
    },
    /*
     ----------------------------
     Config
     ----------------------------
     */
    _config = {
        oldIE:              navigator.appVersion.indexOf('MSIE 8.') > -1 || navigator.appVersion.indexOf('MSIE 9.') > -1,       // Check if is a old IE.
        oldMobile:          /(iPhone|iPad|iPod)\sOS\s6/.test(navigator.userAgent),                                              // Check if is a old browser mobile.
        overlay: {
            perspective:    ['letmein', 'makeway', 'slip'],                                                                     // Custom effects overlay.
            together:       ['corner', 'slidetogether', 'scale', 'door', 'push', 'contentscale', 'simplegenie', 'slit', 'slip'] // Animation together (overlay and modal).
        },
        modal: {
            position:       ['slide', 'flip', 'rotate']                                                                         // Custom animation of the modal.
        }
    },
    /*
     ----------------------------
     Private methods
     ----------------------------
     */
    _private = {
        /*
         ----------------------------
         Init
         ----------------------------
         */
        init: function () {
            this
                .merge()
                .built()
                .check()
                .binds();
        },
        merge: function () {
            // Merge objects.
            _cache.settings.push(_utilities.extend( {}, _defaults, _cache.options ));
            delete _cache.options;

            _cache.item = _cache.settings.length - 1;
            if ( _cache.settings[_cache.item].overlayEffect === 'auto' ) {
                _cache.settings[_cache.item].overlayEffect = _cache.settings[_cache.item].effect;
            }
            return this;
        },
        built: function () {
            // Get zIndex.
            var zIndex = _utilities.zIndex();

            // Add class open.
            h.classList.add('custombox-open');
            h.classList.add('custombox-open-' + _cache.settings[_cache.item].overlayEffect);

            // Add class perspective.
            if ( _config.overlay.perspective.indexOf( _cache.settings[_cache.item].overlayEffect ) > -1 ) {
                _cache.scroll.push(h && h.scrollTop || d.body && d.body.scrollTop || 0);
                h.classList.add('custombox-perspective');
                w.scrollTo(0, 0);
            }

            // Container.
            if ( !_cache.item ) {
                _cache.main = _cache.create.call(d, 'div');
                while ( d.body.firstChild ) {
                    _cache.main.appendChild(d.body.firstChild);
                }
                d.body.appendChild(_cache.main);
            }

            if ( _cache.settings[_cache.item].overlayEffect === 'push' ) {
                _cache.main.style.transitionDuration = _cache.settings[_cache.item].speed + 'ms';
            }

            _cache.main.classList.add('custombox-container');
            _cache.main.classList.add('custombox-container-' + _cache.settings[_cache.item].overlayEffect);

            // Overlay.
            if ( _cache.settings[_cache.item].overlay ) {
                _cache.overlay.push(_cache.create.call(d, 'div'));
                _cache.overlay[_cache.item].classList.add('custombox-overlay');
                _cache.overlay[_cache.item].classList.add('custombox-overlay-' + _cache.settings[_cache.item].overlayEffect);
                _cache.overlay[_cache.item].style.zIndex = zIndex + 2;
                _cache.overlay[_cache.item].style.backgroundColor = _cache.settings[_cache.item].overlayColor;
                _cache.overlay[_cache.item].dataset.custombox = _cache.settings[_cache.item].id;

                // Add class perspective.
                if ( _config.overlay.perspective.indexOf( _cache.settings[_cache.item].overlayEffect ) > -1 || _config.overlay.together.indexOf( _cache.settings[_cache.item].overlayEffect ) > -1 ) {
                    _cache.overlay[_cache.item].style.opacity = _cache.settings[_cache.item].overlayOpacity;
                } else {
                    _cache.overlay[_cache.item].classList.add('custombox-overlay-default');
                }

                if ( _config.overlay.together.indexOf( _cache.settings[_cache.item].overlayEffect ) > -1 ) {
                    _cache.overlay[_cache.item].style.transitionDuration = _cache.settings[_cache.item].speed + 'ms';
                } else {
                    _cache.overlay[_cache.item].style.transitionDuration = _cache.settings[_cache.item].overlaySpeed + 'ms';
                }

                // Append overlay in to the DOM.
                d.body.insertBefore(_cache.overlay[_cache.item], d.body.lastChild.nextSibling);
            } else {
                _cache.overlay.push(null);
            }

            // Modal
            _cache.wrapper.push(_cache.create.call(d, 'div'));
            _cache.wrapper[_cache.item].classList.add('custombox-modal-wrapper');
            _cache.wrapper[_cache.item].classList.add('custombox-modal-wrapper-' + _cache.settings[_cache.item].effect);
            _cache.wrapper[_cache.item].style.zIndex = zIndex + 3;
            _cache.wrapper[_cache.item].dataset.custombox = _cache.settings[_cache.item].id;
            d.body.insertBefore(_cache.wrapper[_cache.item], d.body.lastChild.nextSibling);

            _cache.container.push(_cache.create.call(d, 'div'));
            _cache.container[_cache.item].classList.add('custombox-modal-container');
            _cache.container[_cache.item].classList.add('custombox-modal-container-' + _cache.settings[_cache.item].effect);

            function closeButton() {
                var myDirectoryPath = YOURSITENAME.templateURI;
                var content = '<img src="' + myDirectoryPath + '/img/icon-close.svg" onclick="Custombox.close();" class="icon-close svg" alt="close modal">';
                var element = document.createElement("b");
                element.innerHTML = content;
                return element;
            }
           
            _cache.wrapper[_cache.item].appendChild(closeButton());

            _cache.container[_cache.item].style.zIndex = zIndex + 4;

            // Position.
            if ( _config.modal.position.indexOf( _cache.settings[_cache.item].effect ) > -1 ) {
                if ( _cache.settings[_cache.item].animation !== null ) {
                    if ( _cache.settings[_cache.item].animation.indexOf(',') > -1 ) {
                        // Convert the string to array.
                        _cache.settings[_cache.item].animation = _cache.settings[_cache.item].animation.split(',');
                    } else {
                        _cache.settings[_cache.item].animation = [_cache.settings[_cache.item].animation];
                    }
                } else {
                    // Defaults.
                    if ( _cache.settings[_cache.item].effect === 'slide' ) {
                        _cache.settings[_cache.item].animation = ['top'];
                    } else if ( _cache.settings[_cache.item].effect === 'flip' ) {
                        _cache.settings[_cache.item].animation = ['horizontal'];
                    } else {
                        _cache.settings[_cache.item].animation = ['bottom'];
                    }
                }
            }

            _cache.modal.push(_cache.create.call(d, 'div'));
            _cache.modal[_cache.item].classList.add('custombox-modal');
            _cache.modal[_cache.item].classList.add(
                'custombox-modal-' + _cache.settings[_cache.item].effect + ( _config.modal.position.indexOf( _cache.settings[_cache.item].effect ) > -1 ? '-' + _cache.settings[_cache.item].animation[0].trim() : '' )
            );
            _cache.modal[_cache.item].style.transitionDuration = _cache.settings[_cache.item].speed + 'ms';
            _cache.modal[_cache.item].style.zIndex = zIndex + 4;
            _cache.wrapper[_cache.item].appendChild(_cache.container[_cache.item]).appendChild(_cache.modal[_cache.item]);

            return this;
        },
        check: function () {
            // Check if callback 'open'.
            if ( typeof _cache.settings[_cache.item].open === 'function' ) {
                _cache.settings[_cache.item].open.call();
            }

            // Trigger open.
            if( d.createEvent ) {
                var topen = d.createEvent('Event');
                topen.initEvent('custombox.open', true, true);
                d.dispatchEvent(topen);
            }

            // Convert the string to array.
            if ( _cache.settings[_cache.item].position.indexOf(',') > -1 ) {
                _cache.settings[_cache.item].position = _cache.settings[_cache.item].position.split(',');
                if ( _cache.settings[_cache.item].target.charAt(0) === '#' || ( _cache.settings[_cache.item].target.charAt(0) === '.' && _cache.settings[_cache.item].target.charAt(1) !== '/' ) ) {
                    if ( d.querySelector(_cache.settings[_cache.item].target) ) {
                        _cache.inline.push(_cache.create.call(d, 'div'));
                        _cache.content.push(d.querySelector(_cache.settings[_cache.item].target));
                        _cache.display.push(_cache.content[_cache.item].style.display === 'none');
                        _cache.content[_cache.item].style.display = 'block';
                        _cache.content[_cache.item].parentNode.insertBefore(_cache.inline[_cache.item], _cache.content[_cache.item]);
                        this.size().open();
                    } else {
                        this.error();
                    }
                } else {
                    this.ajax();
                }
            } else {
                this.error();
            }
            return this;
        },
        ajax: function () {
            var _this = this,
                xhr = new XMLHttpRequest(),
                modal = _cache.create.call(d, 'div');
            xhr.onreadystatechange = function () {
                if( xhr.readyState === 4 ) {
                    if( xhr.status === 200 ) {
                        modal.innerHTML = xhr.responseText;
                        _cache.content.push(modal);
                        _cache.content[_cache.item].style.display = 'block';
                        if ( _config.oldIE ) {
                            _cache.content[_cache.item].style.styleFloat = 'left';
                        } else {
                            _cache.content[_cache.item].style.cssFloat = 'left';
                        }
                        _cache.container[_cache.item].appendChild(_cache.content[_cache.item]);
                        _this.size().open();
                    } else {
                        _this.error();
                    }
                }
            };
            xhr.open('GET', _cache.settings[_cache.item].target + ( _cache.settings[_cache.item].cache ? '' : ( /[?].+=/.test(_cache.settings[_cache.item].target) ? '&_=' : '?_=' ) + Date.now() ), true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(null);
        },
        size: function () {
            if ( _config.oldIE ) {
                w.innerHeight = h.clientHeight;
            }

            var customw = _cache.content[_cache.item].offsetWidth;

            if ( !_cache.inline[_cache.item] ) {
                if ( _config.oldIE ) {
                    _cache.content[_cache.item].style.styleFloat = 'none';
                } else {
                    _cache.content[_cache.item].style.cssFloat = 'none';
                }
            }

            // Check width.
            if ( !isNaN( _cache.settings[_cache.item].width ) && _cache.settings[_cache.item].width !== null ) {
                customw = parseInt( _cache.settings[_cache.item].width, 0);
            }

            // Storage.
            _cache.size.push(customw);

            // Width.
            if ( _cache.size[_cache.item] + 60 >= w.innerWidth ) {
                _cache.container[_cache.item].style.width = 'auto';
                //_cache.container[_cache.item].style.margin = '5%';
                _cache.wrapper[_cache.item].style.width = w.innerWidth + 'px';
                for ( var i = 0, elements = _cache.content[_cache.item].querySelectorAll(':scope > *'), t = elements.length; i < t; i++ ) {
                    if ( elements[i].offsetWidth > w.innerWidth ) {
                        elements[i].style.width = 'auto';
                    }
                }
            } else {
                switch ( _cache.settings[_cache.item].position[0].trim() ) {
                    case 'left':
                        _cache.container[_cache.item].style.marginLeft = 0;
                        break;
                    case 'right':
                        _cache.container[_cache.item].style.marginRight = 0;
                        break;
                }
                _cache.container[_cache.item].style.width = _cache.size[_cache.item] + 'px';
            }

            _cache.content[_cache.item].style.width = 'auto';
            _cache.modal[_cache.item].appendChild(_cache.content[_cache.item]);

            // Top.
            if ( _cache.content[_cache.item].offsetHeight >= w.innerHeight ) {
                //_cache.container[_cache.item].style.marginTop = '5%';
                //_cache.container[_cache.item].style.marginBottom = '5%';
            } else {
                var result;
                switch ( _cache.settings[_cache.item].position[1].trim() ) {
                    case 'top':
                        result = 0;
                        break;
                    case 'bottom':
                        result = w.innerHeight - _cache.content[_cache.item].offsetHeight + 'px';
                        break;
                    default:
                        result = w.innerHeight / 2 - _cache.content[_cache.item].offsetHeight / 2 + 'px';
                        break;
                 }
                //_cache.container[_cache.item].style.marginTop = result;
            }

            return this;
        },
        open: function () {
            if ( _cache.settings[_cache.item].overlay ) {
                if ( _config.overlay.perspective.indexOf(_cache.settings[_cache.item].overlayEffect) > -1 || _config.overlay.together.indexOf( _cache.settings[_cache.item].overlayEffect ) > -1 ) {
                    // Add class perspective.
                    _cache.overlay[_cache.item].classList.add('custombox-overlay-open');
                } else {
                    _cache.overlay[_cache.item].style.opacity = _cache.settings[_cache.item].overlayOpacity;
                }

                _cache.main.classList.add('custombox-container-open');

                if ( _config.overlay.together.indexOf( _cache.settings[_cache.item].overlayEffect ) > -1 || _config.oldIE ) {
                    _cache.wrapper[_cache.item].classList.add('custombox-modal-open');
                } else {
                    var open = function () {
                        _cache.overlay[_cache.item].removeEventListener('transitionend', open);
                        _cache.wrapper[_cache.item].classList.add('custombox-modal-open');
                    };
                    _cache.overlay[_cache.item].addEventListener('transitionend', open, false);
                }
            } else {
                _cache.wrapper[_cache.item].classList.add('custombox-modal-open');
                _cache.main.classList.add('custombox-container-open');
            }
            return this;

        },
        binds: function () {
            var _this = this;

            // Esc.
            if ( _cache.settings[_cache.item].escKey ) {
                d.onkeydown = function ( event ) {
                    event = event || w.event;
                    if ( event.keyCode === 27 ) {
                        _this.close();
                    }
                };
            }

            // Overlay close.
            if ( _cache.settings[_cache.item].overlayClose ) {
                _cache.wrapper[_cache.item].addEventListener('click', function ( event ) {
                    if ( event.target === _cache.wrapper[_cache.item] ) {
                        _this.close();
                    }
                }, false);
            }

            // Listener responsive.
            w.addEventListener('onorientationchange' in w ? 'orientationchange' : 'resize', function () {
                _this.responsive();
            }, false);

            var callback = function () {
                // Execute the scripts.
                if ( !_cache.inline[_cache.item] ) {
                    for ( var i = 0, script = _cache.modal[_cache.item].getElementsByTagName('script'), t = script.length; i < t; i++ ) {
                        new Function( script[i].text )();
                    }
                }

                if ( _cache.settings[_cache.item] && typeof _cache.settings[_cache.item].complete === 'function' ) {
                    _cache.settings[_cache.item].complete.call();
                }

                // Trigger complete.
                if ( d.createEvent ) {
                    var tcomplete = d.createEvent('Event');
                    tcomplete.initEvent('custombox.complete', true, true);
                    d.dispatchEvent(tcomplete);
                }
            };

            // Callback complete.
            var complete = function () {
                callback();
                _cache.modal[_cache.item].removeEventListener('transitionend', complete);
            };
            if ( _config.oldIE || _config.oldMobile ) {
                setTimeout(function () {
                    callback();
                }, _cache.settings[_cache.item].overlaySpeed);
            } else {
                if ( _cache.settings[_cache.item].effect !== 'slit' ) {
                    _cache.modal[_cache.item].addEventListener('transitionend', complete, false);
                } else {
                    _cache.modal[_cache.item].addEventListener('animationend', complete, false);
                }
            }
        },
        close: function ( options ) {
            // Check ID.
            var item;
            if ( options === 'first' ) {
                item = 0;
            } else if ( typeof options !== 'undefined' ) {
                for ( var i = 0, t = _cache.settings.length; i < t; i++ ) {
                    if ( _cache.settings[i].id == options ) {
                        item = i;
                        break;
                    }
                }
                if ( item === undefined ) {
                    item = _cache.settings.length - 1;
                }
            } else {
                item = _cache.settings.length - 1;
            }

            var start = function () {
                h.classList.remove('custombox-open-' + _cache.settings[item].overlayEffect);

                if ( _cache.settings[item].overlay ) {
                    // Add class from overlay.
                    _cache.overlay[item].classList.add('custombox-overlay-close');

                    if ( _cache.overlay[item].style.opacity ) {
                        _cache.overlay[item].style.opacity = 0;
                    }

                    _cache.overlay[item].classList.remove('custombox-overlay-open');
                    _cache.main.classList.remove('custombox-container-open');
                }
                // Listener overlay.
                if ( _config.oldIE || _config.oldMobile || !_cache.overlay[item] ) {
                    end();
                } else {
                    var overlay = function () {
                        _cache.overlay[item].removeEventListener('transitionend', overlay);
                        end();
                    };
                    _cache.overlay[item].addEventListener('transitionend', overlay, false);
                }
            },
            end = function () {
                // Remove classes from html tag.
                if ( _cache.settings.length === 1 ) {
                    h.classList.remove('custombox-perspective');
                    h.classList.remove('custombox-open');
                    if ( typeof _cache.scroll[item] !== 'undefined' ) {
                        w.scrollTo(0, _cache.scroll[item]);
                    }
                }

                h.classList.remove('custombox-open-' + _cache.settings[item].overlayEffect);

                if ( _cache.inline[item] ) {
                    // Remove property width and display.
                    if ( _config.oldIE ) {
                        _cache.content[item].style.removeAttribute('width');
                        _cache.content[item].style.removeAttribute('display');
                    } else {
                        _cache.content[item].style.removeProperty('width');
                        _cache.content[item].style.removeProperty('display');
                    }

                    if ( _cache.display[item] ) {
                        _cache.content[item].style.display = 'none';
                    }

                    // Insert restore div.
                    _cache.inline[item].parentNode.replaceChild(_cache.content[item], _cache.inline[item]);
                }

                _cache.main.classList.remove('custombox-container-' + _cache.settings[item].overlayEffect);

                // Remove modal.
                _cache.wrapper[item].parentNode.removeChild(_cache.wrapper[item]);

                // Remove overlay.
                if ( _cache.settings[item].overlay ) {
                    _cache.overlay[item].parentNode.removeChild(_cache.overlay[item]);
                }

                // Callback close.
                if ( typeof _cache.settings[item].close === 'function' ) {
                    _cache.settings[item].close.call();
                }

                // Trigger close.
                if ( d.createEvent ) {
                    var tclose = d.createEvent('Event');
                    tclose.initEvent('custombox.close', true, true);
                    d.dispatchEvent(tclose);
                }

                // Unwrap.
                if ( _cache.settings.length === 1 ) {
                    for ( var contents = d.querySelectorAll('.custombox-container > *'), i = 0, t = contents.length; i < t; i++ ) {
                        document.body.insertBefore(contents[i], _cache.main);
                    }
                    if ( _cache.main.parentNode ) {
                        _cache.main.parentNode.removeChild(_cache.main);
                    }
                }

                // Remove items.
                _cache.wrapper.splice(item, 1);
                if ( _cache.inline[item] ) {
                    _cache.inline.splice(item, 1);
                }
                _cache.content.splice(item, 1);
                _cache.container.splice(item, 1);
                _cache.modal.splice(item, 1);
                _cache.overlay.splice(item, 1);
                _cache.size.splice(item, 1);
                _cache.settings.splice(item, 1);
                _cache.scroll.splice(item, 1);
            };

            // Modal
            if ( _config.modal.position.indexOf( _cache.settings[item].effect ) > -1 && _cache.settings[item].animation.length > 1 ) {
                _cache.modal[item].classList.remove('custombox-modal-' + _cache.settings[item].effect + '-' + _cache.settings[item].animation[0]);
                _cache.modal[item].classList.add('custombox-modal-' + _cache.settings[item].effect + '-' + _cache.settings[item].animation[1].trim());
            }

            // Remove classes.
            _cache.wrapper[item].classList.remove('custombox-modal-open');

            if ( _config.oldIE || _config.oldMobile || _config.overlay.together.indexOf( _cache.settings[item].overlayEffect ) > -1 ) {
                start();
            } else {
                // Listener wrapper.
                var wrapper = function () {
                    _cache.wrapper[item].removeEventListener('transitionend', wrapper);
                    start();
                };
                _cache.wrapper[item].addEventListener('transitionend', wrapper, false);
            }
        },
        responsive: function () {
            if ( _config.oldIE ) {
                w.innerHeight = h.clientHeight;
            }

            for ( var i = 0, t = _cache.container.length, result; i < t; i++ ) {
                // Width.
                if ( _cache.size[i] + 60 >= w.innerWidth ) {
                    _cache.container[i].style.width = 'auto';
                    //_cache.container[i].style.marginLeft = '5%';
                    //_cache.container[i].style.marginRight = '5%';
                    _cache.wrapper[_cache.item].style.width = w.innerWidth + 'px';
                } else {
                    switch ( _cache.settings[_cache.item].position[0].trim() ) {
                        case 'left':
                            _cache.container[i].style.marginLeft = 0;
                            break;
                        case 'right':
                            _cache.container[i].style.marginRight = 0;
                            break;
                        default:
                            _cache.container[i].style.marginLeft = 'auto';
                            _cache.container[i].style.marginRight = 'auto';
                            break;
                    }
                    _cache.container[i].style.width = _cache.size[i] + 'px';
                    _cache.wrapper[_cache.item].style.width = 'auto';
                }

                // Top.
                if ( _cache.content[i].offsetHeight >= w.innerHeight ) {
                    //_cache.container[i].style.marginTop = '5%';
                    //_cache.container[i].style.marginBottom = '5%';
                } else {
                    switch ( _cache.settings[_cache.item].position[1] ) {
                        case 'top':
                            result = 0;
                            break;
                        case 'bottom':
                            result = w.innerHeight - _cache.content[i].offsetHeight + 'px';
                            break;
                        default:
                            result = w.innerHeight / 2 - _cache.content[i].offsetHeight / 2 + 'px';
                            break;
                    }
                    //_cache.container[i].style.marginTop = result;
                }
            }
        },
        error: function () {
            alert('Error to load this target: ' + _cache.settings[_cache.item].target);
        }
    },
    /*
     ----------------------------
     Utilities
     ----------------------------
     */
    _utilities = {
        /**
         * @desc Get the highest z-index in the document.
         * @returns {integer}
         */
        zIndex: function () {
            var zIndex = 0;
            if ( isNaN ( _cache.settings[_cache.item].zIndex ) ) {
                for ( var x = 0, elements = document.getElementsByTagName('*'), xLen = elements.length; x < xLen; x += 1 ) {
                    var val = w.getComputedStyle(elements[x]).getPropertyValue('z-index');
                    if ( val ) {
                        val =+ val;
                        if ( val > zIndex ) {
                            zIndex = val;
                        }
                    }
                }
            } else {
                zIndex = _cache.settings[_cache.item].zIndex;
            }
            return zIndex;
        },
        /**
         * @desc Extend objects.
         */
        extend: function () {
            for ( var i = 1, arg = arguments.length; i < arg; i++ ) {
                for ( var key in arguments[i] ) {
                    if( arguments[i].hasOwnProperty(key) ) {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }
            return arguments[0];
        }
    };
    /*
     ----------------------------
     Public methods
     ----------------------------
     */
    return {
        /**
         * @desc Open Custombox.
         * @param {object} options - Options for the custombox.
         */
        open: function ( options ) {
            _cache.options = options;
            _private.init();
        },
        /**
         * @desc Close Custombox.
         * @param {integer, string} options - Custom close method.
         */
        close: function ( options ) {
            _private.close( options );
        }
        /**
         * @desc Testing.
         */
        //,test: _private
    };
})( window, document, document.documentElement );
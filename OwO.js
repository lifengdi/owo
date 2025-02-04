"use strict";
$(".wp-smiley").removeAttr("style");
function _classCallCheck(e, t) {
    if (!(e instanceof t)) {
        throw new TypeError("Cannot call a class as a function")
    }
}
var _createClass = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var s = t[a];
            s.enumerable = s.enumerable || !1,
                s.configurable = !0,
            "value"in s && (s.writable = !0),
                Object.defineProperty(e, s.key, s)
        }
    }
    return function(t, a, s) {
        return a && e(t.prototype, a),
        s && e(t, s),
            t
    }
}();
!function() {
    var e = function() {
        function e(t) {
            if (document.getElementsByClassName('comments-area').length<=0){
                return;
            }
            var a = this;
            _classCallCheck(this, e);
            var s = {
                logo: "OwO表情",
                container: document.getElementsByClassName("OwO")[0],
                target: document.getElementsByClassName('ql-editor')[0],
                position: "down",
                width: "90%",
                maxHeight: "250px",
                api: "https://cdn.jsdelivr.net/gh/lifengdi/owo@main/OwO.json"
            };
            for (var n in s) {
                s.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = s[n])
            }
            this.container = t.container,
            "up" === t.position && this.container.classList.add("OwO-up");
            var i = new XMLHttpRequest;
            i.onreadystatechange = function() {
                4 === i.readyState && (i.status >= 200 && i.status < 300 || 304 === i.status ? (a.odata = JSON.parse(i.responseText),
                    a.init(t)) : console.log("OwO data request was unsuccessful: " + i.status))
            }
                ,
                i.open("get", t.api, !0),
                i.send(null)
        }
        return _createClass(e, [{
            key: "init",
            value: function(e) {
                var t = this;
                this.packages = Object.keys(this.odata);
                for (var a = '\n            <div class="OwO-logo" onclick="show(this)"><span>' + e.logo + '</span></div>\n            <div class="OwO-body" style="width: ' + e.width + '">', s = 0; s < this.packages.length; s++) {
                    a += '\n                <ul class="OwO-items OwO-items-' + this.odata[this.packages[s]].type + '" style="max-height: ' + (parseInt(e.maxHeight) - 53 + "px") + ';">';
                    for (var n = this.odata[this.packages[s]].container, i = 0; i < n.length; i++) {
                        var temp0 = n[i].icon;
                        if (temp0.indexOf("http") == 0){
                            var temp0 = '<img src="' + n[i].icon + '">'
                        } else if (temp0.substr(0, 1) == "/") {
                            var temp0 = '<img src="https://www.lifengdi.com/wp-content/themes/kratos-3.2.4' + n[i].icon + '">'
                        }
                        a += '\n                    <li class="OwO-item" title="' + n[i].text + '"><a onclick="owoInsert(' + n[i].desc + ',this)">' + temp0 + "</a></li>"
                    }
                    a += "\n                </ul>"
                }
                a += '\n                <div class="OwO-bar">\n                    <ul class="OwO-packages">';
                for (var o = 0; o < this.packages.length; o++) {
                    a += "\n                        <li onclick='changeTab("+o+",this)'><span>" + this.packages[o] + "</span></li>"
                }
                a += "\n                    </ul>\n                </div>\n            </div>\n            ",

                    this.container.innerHTML = a,
                    this.logo = this.container.getElementsByClassName("OwO-logo")[0],
                    this.logo.addEventListener("click", function() {
                        //t.toggle()
                    }),
                    this.packagesEle = this.container.getElementsByClassName("OwO-packages")[0];
                for (var c = function(e) {
                    !function(a) {
                        t.packagesEle.children[e].addEventListener("click", function() {
//                             t.tab(a)
                        })
                    }(e)
                }, l = 0; l < this.packagesEle.children.length; l++) {
                    c(l)
                }
                this.tab(0)
            }
        }, {
            key: "toggle",
            value: function() {
                this.container.classList.contains("OwO-open") ? this.container.classList.remove("OwO-open") : this.container.classList.add("OwO-open")
            }
        }, {
            key: "tab",
            value: function(e) {
                var t = this.container.getElementsByClassName("OwO-items-show")[0];
                t && t.classList.remove("OwO-items-show"),
                    this.container.getElementsByClassName("OwO-items")[e].classList.add("OwO-items-show");
                var a = this.container.getElementsByClassName("OwO-package-active")[0];
                a && a.classList.remove("OwO-package-active"),
                    this.packagesEle.getElementsByTagName("li")[e].classList.add("OwO-package-active")
            }
        }]),
            e
    }();

    "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e : window.OwO = e
}();
function owoInsert(tag,icon) {
    var myField;
    var p = icon.parentNode.parentNode.parentNode.parentNode.parentNode;
    tag = " " + tag + " ";
    if (p.getElementsByClassName('ql-editor')[0]) {
        myField = p.getElementsByClassName('ql-editor')[0]
    } else {
        return false
    }
    if(!myField.hasfocus) {
        myField.focus();
    }
    if (document.selection) {
        myField.textContent.focus()
        sel = document.selection.createRange();
        sel.textContent = tag;
        myField.focus()
    } else {
        if (window.getSelection && window.getSelection().getRangeAt) {
            let range, node;
            range = window.getSelection().getRangeAt(0);      //获取选择范围
            range.deleteContents();
            node = range.createContextualFragment(tag);
            var c = node.lastChild;
            range.insertNode(node);
            if(c){
                range.setEndAfter(c);
                range.setStartAfter(c)
            }
            var j = window.getSelection();
            j.removeAllRanges();
            j.addRange(range);

            var owoopen = document.getElementsByClassName("OwO OwO-open")[0];
            owoopen.className = "OwO"
        }  else if (document.selection && document.selection.createRange) {
            document.selection.createRange().pasteHTML(tag);
        }else {
            myField.textContent += tag;
            myField.focus()
        }
    }
}
function show(logo){
    logo.parentNode.classList.contains("OwO-open") ? logo.parentNode.classList.remove("OwO-open") : logo.parentNode.classList.add("OwO-open")
}
function changeTab(e,packages){
    var container = packages.parentNode.parentNode.parentNode;
    var t = container.getElementsByClassName("OwO-items-show")[0];
    t && t.classList.remove("OwO-items-show"),
        container.getElementsByClassName("OwO-items")[e].classList.add("OwO-items-show");
    var a = container.getElementsByClassName("OwO-package-active")[0];
    a && a.classList.remove("OwO-package-active"),
        packages.classList.add("OwO-package-active")
}
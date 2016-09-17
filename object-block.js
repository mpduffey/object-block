"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tabs_1 = require('components/tabs/tabs');
var controller_1 = require('components/controller/controller');
var objects_service_1 = require('services/object-service/objects.service');
var slimscroll_1 = require('components/slimscroll/slimscroll');
var object_form_1 = require('components/object-form/object-form');
var menu_1 = require('components/menu/menu');
var desktop_service_1 = require('components/desktop/desktop.service');
var ObjectBlock = (function () {
    function ObjectBlock(_objectService, _desktop) {
        var _this = this;
        this._objectService = _objectService;
        this._desktop = _desktop;
        this.objectDeleted = new core_1.EventEmitter;
        this.showEdit = false;
        this.showDetail = false;
        this.showTree = false;
        this.menu = {
            icon: "fa fa-trash",
            menuRight: true,
            items: [
                {
                    label: "Remove tag",
                    action: function (x) { console.log(x); }
                }
            ]
        };
        this.toggleComplete = function (x) {
            _this.object.Complete = x.Complete ? 0 : 1;
            _this._objectService.saveObject(x)
                .map(function (res) { return res.json(); })
                .subscribe(function (resp) { return console.log(resp); });
        };
        this.deleteObject = function (id) {
            _this._objectService.deleteObject(id).subscribe(function (resp) {
                _this.objectDeleted.emit(resp);
                // this.objects.splice(this.objects.findIndex(function(item) {return item.ObjectID === resp;}), 1);
            });
        };
        this.showEditInput = function (e, el) {
            _this.showEdit = true;
            console.log(el);
        };
        this.saveEditInput = function (obj) {
            _this.saveObject(obj);
            _this.showEdit = false;
        };
        this.saveObject = function (obj) {
            _this._objectService.saveObject(obj).subscribe(function (res) { return console.log(res); });
        };
        this.saveObjectNotes = function (objNotes) {
            _this.object.ObjectNotes = objNotes.value;
            _this.saveObject(_this.object);
        };
        this.openTab = function (obj) {
            var newTab = {
                tabTitle: obj.ObjectName,
                active: false,
                widgets: [
                    {
                        type: "controller",
                        widgetTitle: "Controller 1",
                        initialClass: "Objective",
                        initialTags: [obj.ObjectID, 11051]
                    }
                ],
                rows: [
                    {
                        width: '75%',
                        widgets: [
                            {
                                type: "controller",
                                widgetTitle: "Controller 1",
                                initialClass: "Objective",
                                initialTags: [obj.ObjectID, 202]
                            },
                            {
                                type: "controller",
                                widgetTitle: "Controller 2",
                                initialClass: "Objective",
                                initialTags: [obj.ObjectID, 23]
                            },
                            {
                                type: "controller",
                                widgetTitle: "Controller 3",
                                initialClass: "Objective",
                                initialTags: [obj.ObjectID]
                            }
                        ]
                    },
                    {
                        width: '75%',
                        widgets: [
                            {
                                type: "controller",
                                widgetTitle: "Controller 4",
                                initialClass: "Objective",
                                initialTags: [obj.ObjectID]
                            },
                            {
                                type: "controller",
                                widgetTitle: "Controller 5",
                                initialClass: "Objective",
                                initialTags: [obj.ObjectID]
                            },
                            {
                                type: "controller",
                                widgetTitle: "Controller 6",
                                initialClass: "Objective",
                                initialTags: [obj.ObjectID]
                            },
                        ]
                    }
                ]
            };
            console.log(newTab);
            _this._desktop.desk.tabs.push(newTab);
            console.log(_this._desktop.desk.tabs);
        };
        this.showObjectDetail = function () {
            _this.showDetail = true;
            console.log(_this.ctrlr);
        };
    }
    ObjectBlock.prototype.ngAfterContentInit = function () {
        this.arrayOfKeys = Object.keys(this.object);
        this.treeTags = [this.object.ObjectID, 11051];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectBlock.prototype, "object", void 0);
    __decorate([
        core_1.ViewChild('ctrl'), 
        __metadata('design:type', (typeof (_a = typeof controller_1.Controller !== 'undefined' && controller_1.Controller) === 'function' && _a) || Object)
    ], ObjectBlock.prototype, "ctrlr", void 0);
    __decorate([
        core_1.ViewChild('treeCtrl'), 
        __metadata('design:type', (typeof (_b = typeof controller_1.Controller !== 'undefined' && controller_1.Controller) === 'function' && _b) || Object)
    ], ObjectBlock.prototype, "treeCtrl", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectBlock.prototype, "objectDeleted", void 0);
    ObjectBlock = __decorate([
        core_1.Component({
            selector: '[object-block]',
            templateUrl: '/app/components/object-block/object-block.html',
            host: {
                style: "\n\t\t\tmin-height: 18px;\n\t\t\tcolor: black;\n\t\t\theight: auto;\n\t\t\twidth: 100%;\n\t\t\tmargin: -1px 0 0 0;\n\t\t\tfont-size: 11px;\n\t\t\tposition: relative;\n\t\t\tbackground: #f2f6f8;\n\t\t\tlist-style:none;\n\t\t\t-moz-border-radius: 5px;\n\t\t\tborder-radius: 5px;\n\t\t",
                class: 'flex-item'
            },
            styles: ["\n\t\t:host:hover > .object-block-header > .block-icon-host {\n\t\t\tdisplay: inline-flex;\n\t\t}\n\t\t:host:hover {\n\t\t\tz-index:\t2;\n\t\t}\n\t\t.block-icon-host {\n\t\t\tdisplay: none;\n\t\t\tfloat: right;\n\t\t}\n\t\ttextarea {\n\t\t\twidth:\t\t\t100%;\n\t\t\theight:\t\t\tcalc(100% - 30px);\n\t\t}\n\t\t.object-block-header {\n\t\t\tborder: solid gray thin;\n\t\t\tborder-radius: 3px;\n\t\t\t/* Old browsers */\n\t\t\tbackground: -moz-linear-gradient(top, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);\n\t\t\t/* FF3.6+ */\n\t\t\tbackground: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f2f6f8), color-stop(50%, #d8e1e7), color-stop(67%, #c9d5e5), color-stop(100%, #e0eff9));\n\t\t\t/* Chrome,Safari4+ */\n\t\t\tbackground: -webkit-linear-gradient(top, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);\n\t\t\t/* Chrome10+,Safari5.1+ */\n\t\t\tbackground: -o-linear-gradient(top, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);\n\t\t\t/* Opera 11.10+ */\n\t\t\tbackground: -ms-linear-gradient(top, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);\n\t\t\t/* IE10+ */\n\t\t\tbackground: linear-gradient(to bottom, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);\n\t\t}\n\t\t.detail {\n\t\t\tdisplay:\t\t\t\t\t\tblock;\n\t\t\tpadding:\t\t\t\t\t\t5px;\n\t\t\theight:\t\t\t\t\t\t\t75%;\n\t\t}\n\t\t.edit-input {\n\t\t\tline-height:\t\t\t\t12px;\n\t\t\tmargin:\t\t\t\t\t\t\t0 2px;\n\t\t\tborder:\t\t\t\t\t\t\tnone;\n\t\t\tpadding:\t\t\t\t\t\t0 1px;\n\t\t}\n\t\t.complete-box {\n\t\t\tcursor:\t\t\t\t\t\t\tpointer;\n\t\t\tline-height:\t\t\t\t11px;\n\t\t\tborder-radius:\t\t\t3px;\n\t\t\tpadding:\t\t\t\t\t\t0;\n\t\t\tborder-style:\t\t\t\tgroove;\n\t\t\tborder-width:\t\t\t\t1px;\n\t\t\tcolor:\t\t\t\t\t\t\tlightgray;\n\t\t\tcursor:\t\t\t\t\t\t\tdefault;\n\t\t\tdisplay:\t\t\t\t\t\tinline;\n\t\t\tfloat:\t\t\t\t\t\t\tleft;\n\t\t\theight:\t\t\t\t\t\t\t14px;\n\t\t\tmargin:\t\t\t\t\t\t\t1px 1px 0;\n\t\t\tpadding:\t\t\t\t\t\t0;\n\t\t\tposition:\t\t\t\t\t\trelative;\n\t\t\ttop:\t\t\t\t\t\t\t\t0;\n\t\t\twidth:\t\t\t\t\t\t\t14px;\n\t\t}\n\t\t.complete-box i {\n\t\t\tcolor:\t\t\t\t\t\t\tlightgray;\n\t\t\tmargin:\t\t\t\t\t\t\t0;\n\t\t\tdisplay:\t\t\t\t\t\tinline-block;\n\t\t\tleft:\t\t\t\t\t\t\t\t0;\n\t\t\tmargin:\t\t\t\t\t\t\t0;\n\t\t\tposition:\t\t\t\t\t\tabsolute;\n\t\t\ttop:\t\t\t\t\t\t\t\t0;\n\t\t}\n\t\t.select-object {\n\t\t\tmargin:\t\t\t\t\t\t\t2px;\n\t\t}\n\t\t.complete-box:hover i {\n\t\t\tcolor:\t\t\t\t\t\t\tnavy;\n\t\t}\n\t\t.complete-box:hover {\n\t\t\tborder:\t\t\t\t\t\t\tthin solid navy;\n\t\t}\n\t\t.complete, .complete:hover {\n\t\t\tbackground:\t\t\t\t\tblack;\n\t\t}\n\t\t.complete i, .complete:hover i {\n\t\t\tcolor:\t\t\t\t\t\t\twhite;\n\t\t}\n\t\t.object-name {\n\t\t\tline-height:\t\t\t\t12px;\n\t\t\tmargin:\t\t\t\t\t\t\t2px;\n\t\t}\n\t\t.ui-icon {\n\t\t\tdisplay:\t\t\t\t\t\tblock;\n\t\t\toverflow-x:\t\t\t\t\thidden;\n\t\t\toverflow-y:\t\t\t\t\thidden;\n\t\t\tbackground-image:\t\turl(\"/app/components/object-block/ui-icons_222222_256x240.png\");\n\t\t\tbackground-repeat:\tno-repeat;\n\t\t\theight:\t\t\t\t\t\t\t16px;\n\t\t\twidth:\t\t\t\t\t\t\t16px;\n\t\t}\n\t\t.ui-icon-carat-2-n-s {\n\t\t\tbackground-position: -128px 0px;\n\t\t}\n\t\t.block-icon {\n\t\t\tmargin: \t\t\t2px 2px 0 0;\n\t\t}\n\t"],
            styleUrls: ["/app/components/object-block/object-block.css"],
            directives: [menu_1.Menu, tabs_1.Tab, tabs_1.Tabs, slimscroll_1.Slimscroll, object_form_1.ObjectForm, core_1.forwardRef(function () { return controller_1.Controller; })],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof objects_service_1.ObjectService !== 'undefined' && objects_service_1.ObjectService) === 'function' && _c) || Object, (typeof (_d = typeof desktop_service_1.DesktopService !== 'undefined' && desktop_service_1.DesktopService) === 'function' && _d) || Object])
    ], ObjectBlock);
    return ObjectBlock;
    var _a, _b, _c, _d;
}());
exports.ObjectBlock = ObjectBlock;
//# sourceMappingURL=object-block.js.map
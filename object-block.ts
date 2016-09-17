import {Component, Input, ChangeDetectionStrategy, AfterContentInit, forwardRef, ViewChild, Output, EventEmitter} from '@angular/core';
import {Tab, Tabs} from 'components/tabs/tabs';
import {Controller} from 'components/controller/controller';
import {ObjectService} from 'services/object-service/objects.service';
import {Slimscroll} from 'components/slimscroll/slimscroll';
import {ObjectForm} from 'components/object-form/object-form';
import {Menu} from 'components/menu/menu';
import {DesktopService} from 'components/desktop/desktop.service';

@Component({
	selector:					'[object-block]',
	templateUrl: 			'/app/components/object-block/object-block.html',
	host: 						{
		style: `
			min-height: 18px;
			color: black;
			height: auto;
			width: 100%;
			margin: -1px 0 0 0;
			font-size: 11px;
			position: relative;
			background: #f2f6f8;
			list-style:none;
			-moz-border-radius: 5px;
			border-radius: 5px;
		`,
		class:		'flex-item'
	},
	styles:						[`
		:host:hover > .object-block-header > .block-icon-host {
			display: inline-flex;
		}
		:host:hover {
			z-index:	2;
		}
		.block-icon-host {
			display: none;
			float: right;
		}
		textarea {
			width:			100%;
			height:			calc(100% - 30px);
		}
		.object-block-header {
			border: solid gray thin;
			border-radius: 3px;
			/* Old browsers */
			background: -moz-linear-gradient(top, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);
			/* FF3.6+ */
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f2f6f8), color-stop(50%, #d8e1e7), color-stop(67%, #c9d5e5), color-stop(100%, #e0eff9));
			/* Chrome,Safari4+ */
			background: -webkit-linear-gradient(top, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);
			/* Chrome10+,Safari5.1+ */
			background: -o-linear-gradient(top, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);
			/* Opera 11.10+ */
			background: -ms-linear-gradient(top, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);
			/* IE10+ */
			background: linear-gradient(to bottom, #f2f6f8 0%, #d8e1e7 50%, #c9d5e5 67%, #e0eff9 100%);
		}
		.detail {
			display:						block;
			padding:						5px;
			height:							75%;
		}
		.edit-input {
			line-height:				12px;
			margin:							0 2px;
			border:							none;
			padding:						0 1px;
		}
		.complete-box {
			cursor:							pointer;
			line-height:				11px;
			border-radius:			3px;
			padding:						0;
			border-style:				groove;
			border-width:				1px;
			color:							lightgray;
			cursor:							default;
			display:						inline;
			float:							left;
			height:							14px;
			margin:							1px 1px 0;
			padding:						0;
			position:						relative;
			top:								0;
			width:							14px;
		}
		.complete-box i {
			color:							lightgray;
			margin:							0;
			display:						inline-block;
			left:								0;
			margin:							0;
			position:						absolute;
			top:								0;
		}
		.select-object {
			margin:							2px;
		}
		.complete-box:hover i {
			color:							navy;
		}
		.complete-box:hover {
			border:							thin solid navy;
		}
		.complete, .complete:hover {
			background:					black;
		}
		.complete i, .complete:hover i {
			color:							white;
		}
		.object-name {
			line-height:				12px;
			margin:							2px;
		}
		.ui-icon {
			display:						block;
			overflow-x:					hidden;
			overflow-y:					hidden;
			background-image:		url("/app/components/object-block/ui-icons_222222_256x240.png");
			background-repeat:	no-repeat;
			height:							16px;
			width:							16px;
		}
		.ui-icon-carat-2-n-s {
			background-position: -128px 0px;
		}
		.block-icon {
			margin: 			2px 2px 0 0;
		}
	`],
	styleUrls:				[`/app/components/object-block/object-block.css`],
	directives:				[Menu, Tab, Tabs, Slimscroll, ObjectForm, forwardRef(() => Controller)],
	changeDetection:	ChangeDetectionStrategy.OnPush
})

export class ObjectBlock implements AfterContentInit {
	@Input() object: any;
	@ViewChild('ctrl') ctrlr: Controller;
	@ViewChild('treeCtrl') treeCtrl: Controller;
	@Output() objectDeleted = new EventEmitter;
	showEdit = false;
	showDetail = false;
	showTree = false;
	menu = {
		icon:			"fa fa-trash",
		menuRight:	true,
		items:		[
			{
				label:	"Remove tag",
				action:	(x) => {console.log(x);}
			}
		]
	}

	constructor(private _objectService: ObjectService, private _desktop: DesktopService) {}
	ngAfterContentInit() {
		this.arrayOfKeys = Object.keys(this.object);
		this.treeTags = [this.object.ObjectID, 11051];
	}

	toggleComplete = (x) => {
		this.object.Complete = x.Complete?0:1;
		this._objectService.saveObject(x)
			.map((res:Response) => res.json())
			.subscribe(resp => console.log(resp));
	}
	deleteObject = (id) => {
		this._objectService.deleteObject(id).subscribe(resp => {
			this.objectDeleted.emit(resp);
			// this.objects.splice(this.objects.findIndex(function(item) {return item.ObjectID === resp;}), 1);
		});
	}
	showEditInput = (e, el) => {
		this.showEdit = true;
		console.log(el);
	}
	saveEditInput = (obj) => {
		this.saveObject(obj);
		this.showEdit = false;
	}
	saveObject = (obj) => {
		this._objectService.saveObject(obj).subscribe(res => console.log(res));
	}
	saveObjectNotes = (objNotes) => {
		this.object.ObjectNotes = objNotes.value;
		this.saveObject(this.object);
	}
	openTab = (obj) => {
		let newTab = {
			tabTitle:			obj.ObjectName,
			active:				false,
			widgets:			[
				{
					type:					"controller",
					widgetTitle:	"Controller 1",
					initialClass:	"Objective",
					initialTags:	[obj.ObjectID, 11051]
				}
			],
			rows:					[
				{
					width:			'75%',
					widgets:		[
						{
							type:					"controller",
							widgetTitle:	"Controller 1",
							initialClass:	"Objective",
							initialTags:	[obj.ObjectID, 202]
						},
						{
							type:					"controller",
							widgetTitle:	"Controller 2",
							initialClass:	"Objective",
							initialTags:	[obj.ObjectID, 23]
						},
						{
							type:					"controller",
							widgetTitle:	"Controller 3",
							initialClass:	"Objective",
							initialTags:	[obj.ObjectID]
						}
					]
				},
				{
					width:			'75%',
					widgets:		[
						{
							type:					"controller",
							widgetTitle:	"Controller 4",
							initialClass:	"Objective",
							initialTags:	[obj.ObjectID]
						},
						{
							type:					"controller",
							widgetTitle:	"Controller 5",
							initialClass:	"Objective",
							initialTags:	[obj.ObjectID]
						},
						{
							type:					"controller",
							widgetTitle:	"Controller 6",
							initialClass:	"Objective",
							initialTags:	[obj.ObjectID]
						},
					]
				}
			]
		}
		console.log(newTab);
		this._desktop.desk.tabs.push(newTab);
		console.log(this._desktop.desk.tabs);
	}
	showObjectDetail = () => {
		this.showDetail = true;
		console.log(this.ctrlr);
	}
}
const remote = require('electron').remote;
const fs = require('fs');
let w = remote.getCurrentWindow();
let Sortable = require ('sortablejs');

var fCtrlIsPressed = false;

function randd(min, max) {
  return Math.floor(arguments.length > 1 ? (max - min + 1) * Math.random() + min : (min + 1) * Math.random());
};

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

Vue.component('modalWin', {
	props: {
		title: {
			type: String,
			default: ""
		},
		content: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {
			
		};
	},
	methods: {
		close: function(){
			this.$emit('close');
		}
	},
	computed: {
		
	},

	template: `<div class="mod_win_wrapper" style='background: rgba(0, 0, 0, 0.7);' @click="close" @scroll.stop>
	<div class="mod_win">
		<span class="bCloseInfoWin" @click="close">×</span>
		<div class="mod_win_content" v-html="content">
		</div>	
	</div>
</div>`
});

Vue.component('sounder', {
	props: {
		id: {
			type: String,
			default: ""
		},	
		title: {
			type: String,
			default: ""
		},
		ico: {
			type: String,
			default: ""
		},		
		items: {
			type: Array,
			default: []
		}
	},
	data: function(){
		return {
		
		};
	},
	computed: {
		audio_id: function(){
			return "a_"+this.id;
		},
		src: function() {
			return (this.items && this.items.length)? this.items[randd(0, this.items.length-1)].src : "";
		},
		full_ico: function(){
			return "fas fa-"+this.ico;
		}
	},
	methods: {		
		getRandomSound: function(){
			return this.items[randd(0, this.items.length-1)].src;
		},
		itemclick: function(oEvent){
			//this.$emit('iclick', oEvent);
			let sSound = this.getRandomSound();
			console.log();
			let player = document.querySelector("#"+this.audio_id);
			player.src = sSound;
			player.play();
		}
	},
	mounted: function(){
		
	},
	template: `<div :id="id" class="sounder" :data-text="title" :title="title" @click="itemclick">
	<div class='core'>
		<span>{{title}}</span>
		<i :class="full_ico"></i>
		<audio :id="audio_id" :src="src" preload="auto"></audio>
	</div>
</div>`
});
Vue.component('sounditem', {
	props: {
		src: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {
		
		};
	},
	computed: {
		
	},
	methods: {		
		remove: function(oEvent){
			this.$emit('remove', oEvent);
		}
	},
	mounted: function(){
		
	},
	template: `<div  class="sounditem">	
			<input  :value="src"  :title="src">
			<button @click="remove">x</button>
		
</div>`
});
Vue.component('titem', {
	props: {
		title: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: ""
		},
		active: {
			type: Boolean,
			default: false
		},
		ico: {
			ico: String,
			default: ""
		},
	},
	data: function(){
		return {
		
		};
	},
	computed: {
		style_class: function(){
			let aClass = ["toolbar_item"];
			if(this.type=='switch' && this.active==true) {
				aClass.push('active');
			}
			return aClass.join(" ");
		}
	},
	methods: {		
		press: function(oEvent){
			this.$emit('press', oEvent);
		}
	},
	mounted: function(){
		
	},
	template: `<button  :class="style_class" :title="title" @click="press">	
		<i :class="ico"></i>
</button>`
});

Vue.component('soundlist', {
	props: {
		items: {
			type: Array,
			default: function(){
				return [];
			}
		}
	},
	data: function(){
		return {
		
		};
	},
	computed: {
		
	},
	methods: {		
		// click: function(){
			// this.$emit('delete', oEvent);
		// }
		remove: function(oEvent){
			this.$emit('delete', oEvent);
		}
	},
	mounted: function(){
		
	},
	template: `<div  class="soundlist">	
	<div  class="sounditem" v-for="item in items">	
			<input  v-model="item.src">
			<button @click="remove">x</button>
		
	</div>		
</div>`
});

Vue.component('sconf', {
	props: {
		id: {
			type: String,
			default: ""
		},	
		title: {
			type: String,
			default: ""
		},
		name: {
			type: String,
			default: ""
		},
		ico: {
			type: String,
			default: ""
		},		
		items: {
			type: Array,
			default: []
		},		
		iconlist: {
			type: Array,
			default: []
		}
	},
	data: function(){
		return {
		
		};
	},
	computed: {
		// audio_id: function(){
			// return "a_"+this.id;
		// },
		// src: function() {
			// return this.items[randd(0, this.items.length-1)];
		// }
		aIcons: function(){
			let sIco = this.ico;
			return this.iconlist.filter(el=>el.indexOf(sIco)>-1);
		},
		full_ico: function(){
			return "fas fa-"+this.ico;
		}
	},
	methods: {		
		// getRandomSound: function(){
			// return this.items[randd(0, this.items.length-1)];
		// },
		// itemclick: function(oEvent){
			// this.$emit('iclick', oEvent);
			// let sSound = this.getRandomSound();
			// console.log();
			// let player = document.querySelector("#"+this.audio_id);
			// player.src = sSound;
			// player.play();
		// }
		ico_changed: function(oEvent){
			let sIco = oEvent.target.value;
			this.$emit('ico_changed', sIco);
		},
		title_changed: function(oEvent){
			let sTitle = oEvent.target.value;
			this.$emit('title_changed', sTitle);
		},
		remove: function(oEvent){
			this.$emit('remove', oEvent);
		}
	},
	mounted: function(){
		
	},
	template: `<div  class="sconf" :data-text="title" :data-id="id">
		<div class='header'><div class='handler' title='Перетащить'></div><button class='remove' title='Удалить' @click='remove'>x</button></div>
		<input :value="title" placeholder="Заголовок" title='Заголовок' @change="title_changed">
		<div class='ico_input'>
			<input :value="ico" placeholder="Иконка"  title='Иконка' @change="ico_changed">
			<select @change="ico_changed">
				<option v-for="icon in this.aIcons" :value="icon">{{icon}}</option>
			</select>
		<i :class="full_ico"></i></div>
		<slot></slot>		
</div>`
});


  var app = new Vue({
    el: '#app',
    data: {
			aSoundCollections: [
				
			],
			
			
			aIconNames: [
				"ad","address-book","address-card","adjust","air-freshener","align-center","align-justify","align-left","align-right","allergies","ambulance","american-sign-language-interpreting","anchor","angle-double-down","angle-double-left","angle-double-right","angle-double-up","angle-down","angle-left","angle-right","angle-up","angry","ankh","apple-alt","archive","archway","arrow-alt-circle-down","arrow-alt-circle-left","arrow-alt-circle-right","arrow-alt-circle-up","arrow-circle-down","arrow-circle-left","arrow-circle-right","arrow-circle-up","arrow-down","arrow-left","arrow-right","arrow-up","arrows-alt","arrows-alt-h","arrows-alt-v","assistive-listening-systems","asterisk","at","atlas","atom","audio-description","award","baby","baby-carriage","backspace","backward","bacon","bahai","balance-scale","balance-scale-left","balance-scale-right","ban","band-aid","barcode","bars","baseball-ball","basketball-ball","bath","battery-empty","battery-full","battery-half","battery-quarter","battery-three-quarters","bed","beer","bell","bell-slash","bezier-curve","bible","bicycle","biking","binoculars","biohazard","birthday-cake","blender","blender-phone","blind","blog","bold","bolt","bomb","bone","bong","book","book-dead","book-medical","book-open","book-reader","bookmark","border-all","border-none","border-style","bowling-ball","box","box-open","boxes","braille","brain","bread-slice","briefcase","briefcase-medical","broadcast-tower","broom","brush","bug","building","bullhorn","bullseye","burn","bus","bus-alt","business-time","calculator","calendar","calendar-alt","calendar-check","calendar-day","calendar-minus","calendar-plus","calendar-times","calendar-week","camera","camera-retro","campground","candy-cane","cannabis","capsules","car","car-alt","car-battery","car-crash","car-side","caravan","caret-down","caret-left","caret-right","caret-square-down","caret-square-left","caret-square-right","caret-square-up","caret-up","carrot","cart-arrow-down","cart-plus","cash-register","cat","certificate","chair","chalkboard","chalkboard-teacher","charging-station","chart-area","chart-bar","chart-line","chart-pie","check","check-circle","check-double","check-square","cheese","chess","chess-bishop","chess-board","chess-king","chess-knight","chess-pawn","chess-queen","chess-rook","chevron-circle-down","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-down","chevron-left","chevron-right","chevron-up","child","church","circle","circle-notch","city","clinic-medical","clipboard","clipboard-check","clipboard-list","clock","clone","closed-captioning","cloud","cloud-download-alt","cloud-meatball","cloud-moon","cloud-moon-rain","cloud-rain","cloud-showers-heavy","cloud-sun","cloud-sun-rain","cloud-upload-alt","cocktail","code","code-branch","coffee","cog","cogs","coins","columns","comment","comment-alt","comment-dollar","comment-dots","comment-medical","comment-slash","comments","comments-dollar","compact-disc","compass","compress","compress-alt","compress-arrows-alt","concierge-bell","cookie","cookie-bite","copy","copyright","couch","credit-card","crop","crop-alt","cross","crosshairs","crow","crown","crutch","cube","cubes","cut","database","deaf","democrat","desktop","dharmachakra","diagnoses","dice","dice-d20","dice-d6","dice-five","dice-four","dice-one","dice-six","dice-three","dice-two","digital-tachograph","directions","divide","dizzy","dna","dog","dollar-sign","dolly","dolly-flatbed","donate","door-closed","door-open","dot-circle","dove","download","drafting-compass","dragon","draw-polygon","drum","drum-steelpan","drumstick-bite","dumbbell","dumpster","dumpster-fire","dungeon","edit","egg","eject","ellipsis-h","ellipsis-v","envelope","envelope-open","envelope-open-text","envelope-square","equals","eraser","ethernet","euro-sign","exchange-alt","exclamation","exclamation-circle","exclamation-triangle","expand","expand-alt","expand-arrows-alt","external-link-alt","external-link-square-alt","eye","eye-dropper","eye-slash","fan","fast-backward","fast-forward","fax","feather","feather-alt","female","fighter-jet","file","file-alt","file-archive","file-audio","file-code","file-contract","file-csv","file-download","file-excel","file-export","file-image","file-import","file-invoice","file-invoice-dollar","file-medical","file-medical-alt","file-pdf","file-powerpoint","file-prescription","file-signature","file-upload","file-video","file-word","fill","fill-drip","film","filter","fingerprint","fire","fire-alt","fire-extinguisher","first-aid","fish","fist-raised","flag","flag-checkered","flag-usa","flask","flushed","folder","folder-minus","folder-open","folder-plus","font","football-ball","forward","frog","frown","frown-open","funnel-dollar","futbol","gamepad","gas-pump","gavel","gem","genderless","ghost","gift","gifts","glass-cheers","glass-martini","glass-martini-alt","glass-whiskey","glasses","globe","globe-africa","globe-americas","globe-asia","globe-europe","golf-ball","gopuram","graduation-cap","greater-than","greater-than-equal","grimace","grin","grin-alt","grin-beam","grin-beam-sweat","grin-hearts","grin-squint","grin-squint-tears","grin-stars","grin-tears","grin-tongue","grin-tongue-squint","grin-tongue-wink","grin-wink","grip-horizontal","grip-lines","grip-lines-vertical","grip-vertical","guitar","h-square","hamburger","hammer","hamsa","hand-holding","hand-holding-heart","hand-holding-usd","hand-lizard","hand-middle-finger","hand-paper","hand-peace","hand-point-down","hand-point-left","hand-point-right","hand-point-up","hand-pointer","hand-rock","hand-scissors","hand-spock","hands","hands-helping","handshake","hanukiah","hard-hat","hashtag","hat-cowboy","hat-cowboy-side","hat-wizard","hdd","heading","headphones","headphones-alt","headset","heart","heart-broken","heartbeat","helicopter","highlighter","hiking","hippo","history","hockey-puck","holly-berry","home","horse","horse-head","hospital","hospital-alt","hospital-symbol","hot-tub","hotdog","hotel","hourglass","hourglass-end","hourglass-half","hourglass-start","house-damage","hryvnia","i-cursor","ice-cream","icicles","icons","id-badge","id-card","id-card-alt","igloo","image","images","inbox","indent","industry","infinity","info","info-circle","italic","jedi","joint","journal-whills","kaaba","key","keyboard","khanda","kiss","kiss-beam","kiss-wink-heart","kiwi-bird","landmark","language","laptop","laptop-code","laptop-medical","laugh","laugh-beam","laugh-squint","laugh-wink","layer-group","leaf","lemon","less-than","less-than-equal","level-down-alt","level-up-alt","life-ring","lightbulb","link","lira-sign","list","list-alt","list-ol","list-ul","location-arrow","lock","lock-open","long-arrow-alt-down","long-arrow-alt-left","long-arrow-alt-right","long-arrow-alt-up","low-vision","luggage-cart","magic","magnet","mail-bulk","male","map","map-marked","map-marked-alt","map-marker","map-marker-alt","map-pin","map-signs","marker","mars","mars-double","mars-stroke","mars-stroke-h","mars-stroke-v","mask","medal","medkit","meh","meh-blank","meh-rolling-eyes","memory","menorah","mercury","meteor","microchip","microphone","microphone-alt","microphone-alt-slash","microphone-slash","microscope","minus","minus-circle","minus-square","mitten","mobile","mobile-alt","money-bill","money-bill-alt","money-bill-wave","money-bill-wave-alt","money-check","money-check-alt","monument","moon","mortar-pestle","mosque","motorcycle","mountain","mouse","mouse-pointer","mug-hot","music","network-wired","neuter","newspaper","not-equal","notes-medical","object-group","object-ungroup","oil-can","om","otter","outdent","pager","paint-brush","paint-roller","palette","pallet","paper-plane","paperclip","parachute-box","paragraph","parking","passport","pastafarianism","paste","pause","pause-circle","paw","peace","pen","pen-alt","pen-fancy","pen-nib","pen-square","pencil-alt","pencil-ruler","people-carry","pepper-hot","percent","percentage","person-booth","phone","phone-alt","phone-slash","phone-square","phone-square-alt","phone-volume","photo-video","piggy-bank","pills","pizza-slice","place-of-worship","plane","plane-arrival","plane-departure","play","play-circle","plug","plus","plus-circle","plus-square","podcast","poll","poll-h","poo","poo-storm","poop","portrait","pound-sign","power-off","pray","praying-hands","prescription","prescription-bottle","prescription-bottle-alt","print","procedures","project-diagram","puzzle-piece","qrcode","question","question-circle","quidditch","quote-left","quote-right","quran","radiation","radiation-alt","rainbow","random","receipt","record-vinyl","recycle","redo","redo-alt","registered","remove-format","reply","reply-all","republican","restroom","retweet","ribbon","ring","road","robot","rocket","route","rss","rss-square","ruble-sign","ruler","ruler-combined","ruler-horizontal","ruler-vertical","running","rupee-sign","sad-cry","sad-tear","satellite","satellite-dish","save","school","screwdriver","scroll","sd-card","search","search-dollar","search-location","search-minus","search-plus","seedling","server","shapes","share","share-alt","share-alt-square","share-square","shekel-sign","shield-alt","ship","shipping-fast","shoe-prints","shopping-bag","shopping-basket","shopping-cart","shower","shuttle-van","sign","sign-in-alt","sign-language","sign-out-alt","signal","signature","sim-card","sitemap","skating","skiing","skiing-nordic","skull","skull-crossbones","slash","sleigh","sliders-h","smile","smile-beam","smile-wink","smog","smoking","smoking-ban","sms","snowboarding","snowflake","snowman","snowplow","socks","solar-panel","sort","sort-alpha-down","sort-alpha-down-alt","sort-alpha-up","sort-alpha-up-alt","sort-amount-down","sort-amount-down-alt","sort-amount-up","sort-amount-up-alt","sort-down","sort-numeric-down","sort-numeric-down-alt","sort-numeric-up","sort-numeric-up-alt","sort-up","spa","space-shuttle","spell-check","spider","spinner","splotch","spray-can","square","square-full","square-root-alt","stamp","star","star-and-crescent","star-half","star-half-alt","star-of-david","star-of-life","step-backward","step-forward","stethoscope","sticky-note","stop","stop-circle","stopwatch","store","store-alt","stream","street-view","strikethrough","stroopwafel","subscript","subway","suitcase","suitcase-rolling","sun","superscript","surprise","swatchbook","swimmer","swimming-pool","synagogue","sync","sync-alt","syringe","table","table-tennis","tablet","tablet-alt","tablets","tachometer-alt","tag","tags","tape","tasks","taxi","teeth","teeth-open","temperature-high","temperature-low","tenge","terminal","text-height","text-width","th","th-large","th-list","theater-masks","thermometer","thermometer-empty","thermometer-full","thermometer-half","thermometer-quarter","thermometer-three-quarters","thumbs-down","thumbs-up","thumbtack","ticket-alt","times","times-circle","tint","tint-slash","tired","toggle-off","toggle-on","toilet","toilet-paper","toolbox","tools","tooth","torah","torii-gate","tractor","trademark","traffic-light","trailer","train","tram","transgender","transgender-alt","trash","trash-alt","trash-restore","trash-restore-alt","tree","trophy","truck","truck-loading","truck-monster","truck-moving","truck-pickup","tshirt","tty","tv","umbrella","umbrella-beach","underline","undo","undo-alt","universal-access","university","unlink","unlock","unlock-alt","upload","user","user-alt","user-alt-slash","user-astronaut","user-check","user-circle","user-clock","user-cog","user-edit","user-friends","user-graduate","user-injured","user-lock","user-md","user-minus","user-ninja","user-nurse","user-plus","user-secret","user-shield","user-slash","user-tag","user-tie","user-times","users","users-cog","utensil-spoon","utensils","vector-square","venus","venus-double","venus-mars","vial","vials","video","video-slash","vihara","voicemail","volleyball-ball","volume-down","volume-mute","volume-off","volume-up","vote-yea","vr-cardboard","walking","wallet","warehouse","water","wave-square","weight","weight-hanging","wheelchair","wifi","wind","window-close","window-maximize","window-minimize","window-restore","wine-bottle","wine-glass","wine-glass-alt","won-sign","wrench","x-ray","yen-sign","yin-yang"
			],
			
			bEditMode: false,
			sAppView: "default", // square, panel
			oWinSizes: {
				"default": {
					w: 800,
					h: 600
				},				
				"square": {
					w: 300,
					h: 400
				},			
				"panel": {
					w: 100,
					h: 300
				}
			},
			oWin: {
				pos: {
					x: 0,
					y: 0
				},
				bForeground: false
			},
			aLocalDataDebug: [],
			bModalWinShow: false,
			sModalWinCont: ""
    },

		computed: {
			aToolbarItems: function(){
				return [
					{
						type: "switch",
						tumblr: "bEditMode",
						id: "config",
						title: "Настройки",
						ico: "fas fa-cog",
						action: "toggleEditMode",
						active: this.bEditMode
					},
					{
						type: "switch",
						id: "view_default",
						title: "Обычный вид",
						ico: "fas fa-th-large",
						action: "toDefaultView",
						active: this.sAppView=='default'
					},
					{
						type: "switch",
						id: "view_square",
						title: "Квадратный вид",
						ico: "fas fa-th",
						action: "toSquareView",
						active: this.sAppView=='square'
					},
					{
						type: "switch",
						id: "view_panel",
						title: "Компактный вид",
						ico: "fas fa-ellipsis-v",
						action: "toPanelView",
						active: this.sAppView=='panel'
					},
					{
						type: "switch",
						id: "foreground",
						title: "Всегда на первом плане",
						ico: "fas fa-star",
						action: "setForeground",
						active: this.oWin.bForeground
					}
				]
			}
		},
		mounted: function() {
			this._loadData();
			this._initSortable();

			w.setSize(this.oWinSizes[this.sAppView].w,this.oWinSizes[this.sAppView].h);
			if(this.oWin.pos.x !=0 || this.oWin.pos.y != 0){
				w.setPosition(this.oWin.pos.x, this.oWin.pos.y);
			}
			
			w.setAlwaysOnTop(this.oWin.bForeground);


			w.on('resize', function () {
				let size   = w.getSize();
				let width  = size[0];
				let height = size[1];
				this.oWinSizes[this.sAppView].w= width;
				this.oWinSizes[this.sAppView].h= height;
				
				this._saveData("oWinSizes");	
			}.bind(this));
			
			w.on('move', function () {
				let pos   = w.getPosition();
				let x  = pos[0];
				let y = pos[1];
				this.oWin.pos.x= x;
				this.oWin.pos.y= y;
				
				this._saveData("oWin");	
				this._postWindow();
			}.bind(this));			
		},
		methods: {
			
			play: function(oItem){
			},
			
			_initSortable: function(){
				
			let that = this;
			setTimeout(function(){
				let oList = document.getElementById('config');
				Sortable.create(oList, {
					handle: ".handler",
					ghostClass: "drag_ghost",
					dragClass: "drag_drag",
					onEnd: that.SoundersReordered
				});
			}, 100);
			},
			
			_saveData: function(sParam) {
				let aParams= [
					"aSoundCollections",
					"sAppView",
					"oWinSizes",
					"oWin"
				];
				if(sParam) {
					aParams= [sParam];
				}
				
				aParams.forEach(function(sVal){
					//alert(sVal+": "+JSON.stringify(this[sVal]));
					localStorage.setItem(sVal, JSON.stringify(this[sVal]));
				}.bind(this));
				
				
			},
			_loadData: function() {
				let aParams= [
					"aSoundCollections",
					"sAppView",
					"oWinSizes",
					"oWin"
				];
				let that = this;
				
				aParams.forEach(function(sParam){
					//alert("try get "+sParam);
					let oLocalData = localStorage.getItem(sParam);
					//that.aLocalDataDebug.push(sParam+": "+oLocalData);
					if(oLocalData) {
						oLocalData = JSON.parse(oLocalData);
					}
					if(oLocalData) {
						
						//alert(sParam+": "+JSON.stringify(oLocalData));
						that[sParam] = oLocalData;
					}
				}.bind(this));
				
				
			},
			
			deleteSound: function(oItem, oSound){
				
				let Collection = this.aSoundCollections.find(el=>el.id==oItem.id);
				if(Collection) {
					Collection.items = Collection.items.filter(el=>el.src!=oSound.src);
				}
				this._saveData();
			},
			
			_addSound: function(oItem, sPath){
				sPath = sPath.replace(/\\/g,"/");
				if(/.(mp3)|(flac)|(wav)$/.test(sPath) && !oItem.items.find(el=>el.src==sPath)){					
					oItem.items.push({
						src: sPath
					});
				}
			},
			addSound: function(oEvent, oItem) {
				for (const f of oEvent.target.files) {
					this._addSound(oItem, f.path);
				}
				this._saveData();
			},
			dropSound: function(oEvent, oItem){
				let that = this;
				for(let i=0; i<oEvent.dataTransfer.items.length; i++ ) {
					if(oEvent.dataTransfer.items[i].webkitGetAsEntry().isFile){
						this._addSound(oItem, oEvent.dataTransfer.files[i].path);						
					} else {
						let aFiles = fs.readdirSync(oEvent.dataTransfer.files[i].path);
						if(aFiles && aFiles.length) {
							aFiles.forEach(function(sFile){
								that._addSound(oItem, oEvent.dataTransfer.files[i].path.replace(/\\/g,"/")+"/"+sFile);	
							});
						}
					}
				}
				
				this._saveData();
			},

			addSounder: function(){
				let sNewId = guidGenerator();
				if(this.aSoundCollections.find(el=>el.id==sNewId)) {
					sNewId = guidGenerator();
				}
				this.aSoundCollections.push({
					title: "",
					id: sNewId,
					ico: "",
					items: []
				});
				this._saveData();
				this._initSortable();
			},
			
			remove_sounder: function(oSounder){
				let sId = oSounder.id;
				this.aSoundCollections = this.aSoundCollections.filter(el=>el.id!=sId);
				this._saveData();
			},
			
			change_ico: function(sIco, oItem){
				this.aSoundCollections.find(el=>el.id==oItem.id).ico = sIco;
				this._saveData();
			},
			change_title: function(sTitle, oItem){
				this.aSoundCollections.find(el=>el.id==oItem.id).title = sTitle;
				this._saveData();
			},
			
			SoundersReordered: function(){
				let oNewIdList = {};
				let aConf = document.querySelectorAll(".sconf");
				for(let i=0; i<aConf.length; i++) {
					oNewIdList[aConf[i].dataset.id] = i;
				}
				this.aSoundCollections = this.aSoundCollections.sort(function(a,b){
					return oNewIdList[a.id]-oNewIdList[b.id];
				});
				this._saveData();
			},

			proxy: function(sMethod){
				this[sMethod]();
			},
			toggleEditMode: function(){
				this.bEditMode = !this.bEditMode;
			},
			
			toDefaultView: function(){
				this.sAppView = "default";	
				this._saveData("sAppView");	
				w.setSize(this.oWinSizes["default"].w,this.oWinSizes["default"].h);
				this._postWindow();
			},
			toSquareView: function(){
				this.sAppView = "square"; 
				this._saveData("sAppView");	
				w.setSize(this.oWinSizes["square"].w,this.oWinSizes["square"].h);
				this._postWindow();
			},
			toPanelView: function(){
				this.sAppView = "panel"; 
				this._saveData("sAppView");	
				w.setSize(this.oWinSizes["panel"].w,this.oWinSizes["panel"].h);
				this._postWindow();
			},
			
			_postWindow() {
				const { width, height } = remote.screen.getPrimaryDisplay().workAreaSize;
				
				let size = w.getSize();
				let w_w  = size[0];
				let w_h = size[1];
				
				let pos   = w.getPosition();
				let x  = pos[0];
				let y = pos[1];
				
				let bottom = w_h+y;
				let right = w_w+x;
				
				let b_delta = bottom-height;
				let r_delta = right-width;
				// if(b_delta>0 || r_delta>0) {
					// let new_x = x-r_delta,
					// new_y = y-b_delta-100;
					// this.oWin.pos.x = new_x;
					// this.oWin.pos.y = new_y;
					// w.setPosition(this.oWin.pos.x, this.oWin.pos.y);
					// this._saveData("oWin");	
				// }
				if(y<0) {
					this.oWin.pos.y = 0;
					w.setPosition(this.oWin.pos.x, this.oWin.pos.y);
					this._saveData("oWin");	
				}
			},
			
			setForeground: function(){
				this.oWin.bForeground = !this.oWin.bForeground;
				w.setAlwaysOnTop(this.oWin.bForeground);
				this._saveData("oWin");	
			},
			
			quite: function(){
				w.close();
			}
		}
  });
	
	// $(document).keydown(function(event){
		// CTRL pressed
		// if(event.which=="17") {
			// fCtrlIsPressed = true;
		// }

		// A pressed
		// if(event.which=="65" && fCtrlIsPressed) {
			// /*/
			// if($(".spellCard.selected").length == $(".spellCard").length) {
				// deselect all
				// $(".spellCard").removeClass("selected");
			// } else {
				// select all
				// $(".spellCard").addClass("selected");
			// }
			// /**/
			// app.selectAll();
			// return false;
		// }
	// });

	// $(document).keyup(function(){
		// fCtrlIsPressed = false;
	// });
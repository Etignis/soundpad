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
			return this.items[randd(0, this.items.length-1)].src;
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
	template: `<div :id="id" class="sounder" :data-text="title" @click="itemclick">
	<span>{{title}}</span>
	<audio :id="audio_id" :src="src"></audio>
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
		
	},
	methods: {		
		press: function(oEvent){
			this.$emit('press', oEvent);
		}
	},
	mounted: function(){
		
	},
	template: `<button  class="toolbar_item" @click="press">	
		x
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
		click: function(){
			this.$emit('delete', oEvent);
		}
	},
	mounted: function(){
		
	},
	template: `<div  class="soundlist">	
	<div  class="sounditem" v-for="item in items">	
			<input  v-model="item.src">
			<button @click>x</button>
		
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
	},
	mounted: function(){
		
	},
	template: `<div  class="sconf" :data-text="title">
		<input v-model="title" placeholder="Заголовок">
		<input v-model="ico" placeholder="Иконка">
		<slot></slot>		
</div>`
});


  var app = new Vue({
    el: '#app',
    data: {
			aSoundCollections: [
				{
					title: "R2",
					id: "R2",
					ico: "",
					items: [
						{
							src: "D:/tmp/tools/soundpad/sounds/05101.mp3"
						},
						{
							src: "D:/tmp/tools/soundpad/sounds/05090.mp3"
						}
						
					]
				}
			],
			aToolbarItems: [
				{
					type: "switch",
					id: "config",
					title: "config",
					ico: "",
					action: "toggleEditMode"
				}
			],
			
			bEditMode: false,

			bModalWinShow: false,
			sModalWinCont: ""
    },

		computed: {
			
		},
		mounted: function() {
			// this.loadConfigData();			
			// this.sModalWinCont = $("#info_text").html();
			
			// let bInfoIsRead = this.getConfig("infoIsRead");
			// if(bInfoIsRead) {
				// this.hideInfo();
				// this.showCards();
			// }
			
			// this.getHash();			
			
			// this.$refs.SchoolCombobox.toggle(null, this.bSchoolsOpend);
			// this.$refs.SourceCombobox.toggle(null, this.bSourcesOpend);
			
			// this.updateHash();
			
			// this.bAppIsReady = true;
		},
		methods: {
			
			play: function(oItem){
			},
			
			deleteSound: function(oItem, oSound){
				debugger;
				let Collection = this.aSoundCollections.find(el=>el.id==oItem.id);
				if(Collection) {
					Collection.items = Collection.items.filter(el=>el.src!=oSound.src);
				}
				
			},
			
			_addSound: function(oItem, sPath){
				sPath = sPath.replace(/\\/g,"/");
				if(!oItem.items.find(el=>el.src==sPath)){					
					oItem.items.push({
						src: sPath
					});
				}
			},
			addSound: function(oEvent, oItem) {
				for (const f of oEvent.target.files) {
					this._addSound(oItem, f.path);
				}
			},
			dropSound: function(oEvent, oItem){
				// let aFiles = [];
				for (const f of oEvent.dataTransfer.files) {
					this._addSound(oItem, f.path);
				}
			},

			addSounder: function(){
				this.aSoundCollections.push({
					title: "",
					id: guidGenerator(),
					ico: "",
					items: []
				});
			},

			proxy: function(sMethod){
				this[sMethod]();
			},
			toggleEditMode: function(){
				this.bEditMode = !this.bEditMode;
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,function(e,t,n){e.exports=n(38)},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){e.exports=n.p+"static/media/plus.8d5d3e5a.svg"},function(e,t,n){},,,,function(e,t,n){e.exports=n.p+"static/media/dashboard.e78e43a1.svg"},function(e,t,n){e.exports=n.p+"static/media/feather.a437075a.svg"},function(e,t,n){e.exports=n.p+"static/media/home.b1c9020b.svg"},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(8),r=n.n(c),o=(n(18),n(1)),s=n(2),l=n(4),u=n(3),d=n(5),h=(n(19),n(9)),m=n(6),p=(n(20),function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).moveItem=n.moveItem.bind(Object(m.a)(n)),n.state={items:Array.from({length:12},function(e,t){return{id:t,width:70*Math.random()+80,height:70*Math.random()+80,left:Math.random()*(window.innerWidth-150),top:Math.random()*(window.innerHeight-150),direction:Math.ceil(4*Math.random()),velocity:Math.ceil(10*Math.random())}})},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.interval=100,this.updateTimerId=setInterval(function(){e.setState(function(t){return{items:t.items.map(e.moveItem)}})},this.interval)}},{key:"componentWillUnmount",value:function(){clearInterval(this.updateTimerId)}},{key:"moveItem",value:function(e){var t={left:e.left,top:e.top},n=e.velocity*(this.interval/1e3);switch(e.direction){case 1:t.left+=n;break;case 2:t.left-=n;break;case 3:t.top+=n;break;default:t.top-=n}return t.left+e.width<0&&(t.left=window.innerWidth),t.left>window.innerWidth&&(t.left=-e.width),t.top+e.height<0&&(t.top=window.innerHeight),t.top>window.innerHeight&&(t.top=-e.height),Object(h.a)({},e,t)}},{key:"render",value:function(){var e=this.state.items.map(function(e){var t=e.top,n=e.left,a=e.height,c=e.width,r=e.id;return i.a.createElement("div",{key:r,className:"background__item",style:{transform:"translate(".concat(n,"px, ").concat(t,"px)"),height:a,width:c}})});return i.a.createElement("div",{className:"background"},e)}}]),t}(i.a.Component)),f=(n(21),n(22),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("h1",{className:"title"},this.props.title)}}]),t}(i.a.Component)),b=(n(23),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e="money-display";return this.props.monocromatic&&(e+=" money-display--monocromatic"),i.a.createElement("div",{className:e,style:{fontSize:"".concat(this.props.size,"rem")}},i.a.createElement("div",{className:"money-display__label"},this.props.label),i.a.createElement("span",{className:"money-display__value"},this.props.value.toLocaleString()))}}]),t}(i.a.Component)),v=(n(24),n(25),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"carousel ".concat(this.props.className)},i.a.createElement("div",{className:"carousel__slides"},this.props.children))}}]),t}(i.a.Component)),O=n(10),j=(n(26),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.className,a=e.tag,c=Object(O.a)(e,["children","className","tag"]),r=a||"div";return i.a.createElement(r,Object.assign({className:"card ".concat(n)},c),t)}}]),t}(i.a.Component)),g=(n(27),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.percentage||50,t=440*Math.PI,n=(100-e)/100*t;return i.a.createElement(j,{className:"circular-progress ".concat(this.props.className)},i.a.createElement("svg",{viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",className:"circular-progress__svg"},i.a.createElement("linearGradient",{id:"progress",x1:"0%",y1:"0%",x2:"100%",y2:"100%"},i.a.createElement("stop",{offset:"0%",stopColor:"#f4bbac"}),i.a.createElement("stop",{offset:"100%",stopColor:"#ff799d"})),i.a.createElement("circle",{className:"circular-progress__bar",cx:"253",cy:"253",r:220,fill:"transparent",strokeWidth:"40"}),i.a.createElement("circle",{cx:"253",cy:"253",r:220,fill:"transparent",strokeDasharray:t,strokeDashoffset:n,strokeWidth:"40",stroke:"url(#progress)"})))}}]),t}(i.a.Component)),y=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(j,{className:"categories-carousel__card"},i.a.createElement(g,{className:"categories-carousel__progress"}),i.a.createElement(b,{label:"Bank account",value:1148.9}))}}]),t}(i.a.Component),E=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(v,{className:this.props.className},i.a.createElement(y,null),i.a.createElement(y,null),i.a.createElement(y,null),i.a.createElement(y,null),i.a.createElement(y,null),i.a.createElement(y,null),i.a.createElement(y,null),i.a.createElement(y,null))}}]),t}(i.a.Component),w=n(7),k=n.n(w),x=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:k()("dashboard-page",this.props.classNames)},i.a.createElement(f,{title:"Dashboard"}),i.a.createElement(b,{label:"Total Balance",monocromatic:!0,size:1.5,value:2099}),i.a.createElement(E,{className:"dashboard-page__categories"}))}}]),t}(i.a.Component),N=(n(28),n(29),function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).openMenu=n.openMenu.bind(Object(m.a)(n)),n.addAnimationDelay=n.addAnimationDelay.bind(Object(m.a)(n)),n.state={isMenuOpen:!1},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"openMenu",value:function(){var e=this;this.setState(function(t){var n=t.isMenuOpen;return e.props.onMenuOpen(!n),{isMenuOpen:!n}})}},{key:"addAnimationDelay",value:function(e){return i.a.Children.map(e,function(e,t){return i.a.cloneElement(e,{style:{transitionDelay:"".concat(.1*t,"s")}})})}},{key:"render",value:function(){var e=this.state.isMenuOpen;return i.a.createElement("div",{className:k()("action-button",this.props.className)},i.a.createElement("div",{className:k()(e&&"action-button__overlay"),onClick:this.openMenu}),i.a.createElement("div",{"aria-hidden":!e,className:"action-button__menu ".concat(e?"action-button__menu--is-open":"")},this.addAnimationDelay(this.props.children)),i.a.createElement(j,{tag:"button",className:"action-button__button",onClick:this.openMenu},i.a.createElement("img",{className:"action-button__icon ".concat(e?"action-button__icon--is-open":""),src:n(30),alt:"transaction",height:"30px",width:"30px"})))}}]),t}(i.a.Component)),_=(n(31),n(41)),M=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).expand=n.expand.bind(Object(m.a)(n)),n.self=i.a.createRef(),n.state={isExpanded:!1,cardStyle:{}},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"expand",value:function(){var e=this;this.setState(function(t){var n=t.isExpanded,a=t.cardStyle;if(!n){var i=r.a.findDOMNode(e.self.current).getBoundingClientRect(),c={closed:{transitionDelay:"0s",transform:"translate(0px, 0px)",width:"".concat(i.width,"px"),height:"".concat(i.height,"px")},expanded:{transitionDelay:"0s",transform:"translate(".concat(window.innerWidth-i.width-i.x-4,"px, ").concat(window.innerHeight-i.height-i.y-4,"px)"),width:"calc(100vw - 8px)",height:"50vh"}};a={entering:c.closed,entered:c.expanded,exiting:c.expanded,exited:c.closed}}return console.log(a),{isExpanded:!n,cardStyle:a}})}},{key:"render",value:function(){var e=this,t=this.props,n=t.style,a=Object(O.a)(t,["style"]),c=k()("transaction-menu-item",this.state.isExpanded&&"transaction-menu-item--is-expanded");return i.a.createElement(_.a,{in:this.state.isExpanded,timeout:0},function(t){return i.a.createElement(j,Object.assign({ref:e.self,tag:e.state.isExpanded?"div":"button",className:c,onClick:e.expand,style:Object(h.a)({},n,e.state.cardStyle[t])},a),i.a.createElement("div",{className:"transaction-menu-item__title"},"menu item"),i.a.createElement("div",{className:"transaction-menu-item__content",hidden:!e.state.isExpanded},"this is the card content!!",i.a.createElement("br",null),"this is the card content!!",i.a.createElement("br",null),"this is the card content!!",i.a.createElement("br",null),"this is the card content!!",i.a.createElement("br",null),"this is the card content!!",i.a.createElement("br",null),"this is the card content!!",i.a.createElement("br",null)))})}}]),t}(i.a.Component),C=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).onMenuOpen=n.onMenuOpen.bind(Object(m.a)(n)),n.state={isMenuOpen:!1},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"onMenuOpen",value:function(e){this.props.onMenuOpen(e),this.setState({isMenuOpen:e})}},{key:"render",value:function(){var e=[{alt:"dashboard",src:n(35)},{alt:"history",src:n(36)},{alt:"account",src:n(37)}].map(function(e,t){return i.a.createElement("img",{key:e.alt,src:e.src,alt:e.alt,height:"30px",width:"30px",className:0!==t?"toolbar__item--inactive":""})}),t=k()("toolbar",this.state.isMenuOpen&&"toolbar--menu-is-open");return i.a.createElement(j,{className:t},e,i.a.createElement(N,{className:"toolbar__action-button",onMenuOpen:this.onMenuOpen},i.a.createElement(M,null),i.a.createElement(M,null),i.a.createElement(M,null)))}}]),t}(i.a.Component),S=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={isMenuOpen:!1},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=k()("page",this.state.isMenuOpen&&"page--menu-is-open");return i.a.createElement("div",{className:"App"},i.a.createElement(p,null),i.a.createElement(x,{classNames:t}),i.a.createElement(C,{onMenuOpen:function(t){return e.setState({isMenuOpen:t})}}))}}]),t}(i.a.Component),W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function D(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(i.a.createElement(S,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/react-client",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/react-client","/service-worker.js");W?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):D(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):D(t,e)})}}()}],[[12,1,2]]]);
//# sourceMappingURL=main.0ffc9df1.chunk.js.map
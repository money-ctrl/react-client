(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,function(e,t,n){e.exports=n.p+"static/media/plus.8d5d3e5a.svg"},function(e,t,n){e.exports=n.p+"static/media/dashboard.e78e43a1.svg"},function(e,t,n){e.exports=n.p+"static/media/feather.a437075a.svg"},function(e,t,n){e.exports=n.p+"static/media/home.b1c9020b.svg"},,function(e,t,n){e.exports=n(41)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(11),i=n.n(r),o=(n(22),n(1)),s=n(2),l=n(4),u=n(3),m=n(5),p=(n(23),n(16)),f=n(7),h=(n(24),function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).moveItem=n.moveItem.bind(Object(f.a)(n)),n.state={items:Array.from({length:12},function(e,t){return{id:t,width:70*Math.random()+80,height:70*Math.random()+80,left:Math.random()*(window.innerWidth-150),top:Math.random()*(window.innerHeight-150),direction:Math.ceil(4*Math.random()),velocity:Math.ceil(10*Math.random())}})},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.interval=100,this.updateTimerId=setInterval(function(){e.setState(function(t){return{items:t.items.map(e.moveItem)}})},this.interval)}},{key:"componentWillUnmount",value:function(){clearInterval(this.updateTimerId)}},{key:"moveItem",value:function(e){var t={left:e.left,top:e.top},n=e.velocity*(this.interval/1e3);switch(e.direction){case 1:t.left+=n;break;case 2:t.left-=n;break;case 3:t.top+=n;break;default:t.top-=n}return t.left+e.width<0&&(t.left=window.innerWidth),t.left>window.innerWidth&&(t.left=-e.width),t.top+e.height<0&&(t.top=window.innerHeight),t.top>window.innerHeight&&(t.top=-e.height),Object(p.a)({},e,{},t)}},{key:"render",value:function(){var e=this.state.items.map(function(e){var t=e.top,n=e.left,a=e.height,r=e.width,i=e.id;return c.a.createElement("div",{key:i,className:"background__item",style:{transform:"translate(".concat(n,"px, ").concat(t,"px)"),height:a,width:r}})});return c.a.createElement("div",{className:"background"},e)}}]),t}(c.a.Component)),d=(n(25),n(26),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("h1",{className:"title"},this.props.title)}}]),t}(c.a.Component)),b=(n(27),n(6)),v=n.n(b);var O=function(e){var t=e.size,n=e.label,a=e.value,r=e.monochromatic,i=e.formatOptions,o=e.className,s=v()(["money-display",r&&"money-display--monocromatic",o]);return c.a.createElement("div",{className:s,style:{fontSize:"".concat(t,"rem")}},c.a.createElement("div",{className:"money-display__label"},n),c.a.createElement("span",{className:"money-display__value"},new Intl.NumberFormat("en-US",i).format(a)))},E=(n(28),n(29),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"carousel ".concat(this.props.className)},c.a.createElement("div",{className:"carousel__slides"},this.props.children))}}]),t}(c.a.Component)),g=n(9),j=(n(30),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.className,a=e.tag,r=Object(g.a)(e,["children","className","tag"]),i=a||"div";return c.a.createElement(i,Object.assign({className:"card ".concat(n)},r),t)}}]),t}(c.a.Component)),y=(n(31),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.percentage||50,t=440*Math.PI,n=(100-e)/100*t;return c.a.createElement(j,{className:"circular-progress ".concat(this.props.className)},c.a.createElement("svg",{viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",className:"circular-progress__svg"},c.a.createElement("linearGradient",{id:"progress",x1:"0%",y1:"0%",x2:"100%",y2:"100%"},c.a.createElement("stop",{offset:"0%",stopColor:"#f4bbac"}),c.a.createElement("stop",{offset:"100%",stopColor:"#ff799d"})),c.a.createElement("circle",{className:"circular-progress__bar",cx:"253",cy:"253",r:220,fill:"transparent",strokeWidth:"40"}),c.a.createElement("circle",{cx:"253",cy:"253",r:220,fill:"transparent",strokeDasharray:t,strokeDashoffset:n,strokeWidth:"40",stroke:"url(#progress)"})))}}]),t}(c.a.Component)),w=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement(j,{className:"categories-carousel__card"},c.a.createElement(y,{className:"categories-carousel__progress"}),c.a.createElement(O,{label:"Bank account",value:1148.9}))}}]),t}(c.a.Component),k=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement(E,{className:this.props.className},c.a.createElement(w,null),c.a.createElement(w,null),c.a.createElement(w,null),c.a.createElement(w,null),c.a.createElement(w,null),c.a.createElement(w,null),c.a.createElement(w,null),c.a.createElement(w,null))}}]),t}(c.a.Component),N=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:v()("dashboard-page",this.props.classNames)},c.a.createElement(d,{title:"Dashboard"}),c.a.createElement(O,{label:"Total Balance",monochromatic:!0,size:1.5,value:2099}),c.a.createElement(k,{className:"dashboard-page__categories"}))}}]),t}(c.a.Component),_=(n(32),n(33),n(12)),M=n.n(_),C=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).openMenu=n.openMenu.bind(Object(f.a)(n)),n.addAnimationDelay=n.addAnimationDelay.bind(Object(f.a)(n)),n.state={isMenuOpen:!1},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"openMenu",value:function(){var e=this;this.setState(function(t){var n=t.isMenuOpen;return e.props.onMenuOpen(!n),{isMenuOpen:!n}})}},{key:"addAnimationDelay",value:function(e){return c.a.Children.map(e,function(e,t){return c.a.cloneElement(e,{style:{transitionDelay:"".concat(.1*t,"s")}})})}},{key:"render",value:function(){var e=this.state.isMenuOpen;return c.a.createElement("div",{className:v()("action-button",this.props.className)},c.a.createElement("div",{className:v()(e&&"action-button__overlay"),onClick:this.openMenu}),c.a.createElement("div",{"aria-hidden":!e,className:"action-button__menu ".concat(e?"action-button__menu--is-open":"")},this.addAnimationDelay(this.props.children)),c.a.createElement(j,{tag:"button",className:"action-button__button",onClick:this.openMenu},c.a.createElement("img",{className:"action-button__icon ".concat(e?"action-button__icon--is-open":""),src:M.a,alt:"transaction",height:"30px",width:"30px"})))}}]),t}(c.a.Component),x=(n(34),n(8));n(35),n(36),n(37);var S=function(e){var t=e.className,n=e.variant,a=e.onClick,r=e.children;return c.a.createElement("button",{className:v()(["button",n&&"button--".concat(n),t]),onClick:a},r)};var W=function(e){var t=e.onSubmit,n=void 0===t?function(){}:t,r=Object(a.useState)(0),i=Object(x.a)(r,2),o=i[0],s=i[1];return c.a.createElement("div",{className:"money-calculator"},c.a.createElement(O,{className:"money-calculator__display",value:o/100,formatOptions:{minimumFractionDigits:2,maximumFractionDigits:2}}),c.a.createElement(S,{className:"money-calculator__enter",variant:"primary",onClick:function(){return n(o/100)}},c.a.createElement("i",{className:"fas fa-check"})),c.a.createElement(S,{className:"money-calculator__back",onClick:function(){return s(Math.floor(o/10))}},c.a.createElement("i",{className:"fas fa-backspace"})),[7,8,9,4,5,6,1,2,3,0].map(function(e){return c.a.createElement(S,{key:e,className:"money-calculator__number",onClick:function(){return s(10*o+e)}},e)}))};var I=function(e){var t=e.slotTitle,n=e.onSubmit,r=void 0===n?function(){}:n,i=Object(g.a)(e,["slotTitle","onSubmit"]),o=Object(a.useState)(!1),s=Object(x.a)(o,2),l=s[0],u=s[1],m=v()(["transaction-menu-item",l&&"transaction-menu-item--is-expanded"]),p=l?"div":"button";return c.a.createElement(c.a.Fragment,null,l&&c.a.createElement("div",{className:"event-capture"}),c.a.createElement(j,Object.assign({tag:"div",className:m},i),c.a.createElement("button",{className:"transaction-menu-item__cancel",onClick:function(){return u(!1)}},"Cancel"),c.a.createElement(p,{className:"transaction-menu-item__title",onClick:function(){return u(!0)}},t),l&&c.a.createElement("div",{className:"transaction-menu-item__content"},c.a.createElement(W,{onSubmit:r}))))},A=(n(38),Object.freeze({plus:"fas fa-plus",minus:"fas fa-minus","chevron-right":"fas fa-chevron-right"}));var D=function(e){var t=e.name;return c.a.createElement("i",{className:A[t]})};var T=function(){return c.a.createElement(I,{slotTitle:c.a.createElement(c.a.Fragment,null,"Income",c.a.createElement(D,{name:"plus"}))})};n(39);var F=function(){return c.a.createElement(I,{slotTitle:c.a.createElement(c.a.Fragment,null,"Expense",c.a.createElement(D,{name:"minus"}))})};n(40);var B=function(){return c.a.createElement(I,{slotTitle:c.a.createElement(c.a.Fragment,null,"Transfer",c.a.createElement(D,{name:"chevron-right"}))})},U=n(13),z=n.n(U),H=n(14),P=n.n(H),R=n(15),J=n.n(R),L=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).onMenuOpen=n.onMenuOpen.bind(Object(f.a)(n)),n.state={isMenuOpen:!1},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"onMenuOpen",value:function(e){this.props.onMenuOpen(e),this.setState({isMenuOpen:e})}},{key:"render",value:function(){var e=[{alt:"dashboard",src:z.a},{alt:"history",src:P.a},{alt:"account",src:J.a}].map(function(e,t){return c.a.createElement("img",{key:e.alt,src:e.src,alt:e.alt,height:"30px",width:"30px",className:0!==t?"toolbar__item--inactive":""})}),t=v()("toolbar",this.state.isMenuOpen&&"toolbar--menu-is-open");return c.a.createElement(j,{className:t},e,c.a.createElement(C,{className:"toolbar__action-button",onMenuOpen:this.onMenuOpen},c.a.createElement(T,null),c.a.createElement(F,null),c.a.createElement(B,null)))}}]),t}(c.a.Component),G=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={isMenuOpen:!1},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=v()("page",this.state.isMenuOpen&&"page--menu-is-open");return c.a.createElement("div",{className:"App"},c.a.createElement(h,null),c.a.createElement(N,{classNames:t}),c.a.createElement(L,{onMenuOpen:function(t){return e.setState({isMenuOpen:t})}}))}}]),t}(c.a.Component),$=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function q(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(c.a.createElement(G,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/react-client",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/react-client","/service-worker.js");$?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):q(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):q(t,e)})}}()}],[[17,1,2]]]);
//# sourceMappingURL=main.7a7bc45b.chunk.js.map
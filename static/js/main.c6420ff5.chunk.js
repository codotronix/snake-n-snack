(this["webpackJsonpreact-src"]=this["webpackJsonpreact-src"]||[]).push([[0],{11:function(e,a,t){e.exports=t(20)},16:function(e,a,t){},17:function(e,a,t){},20:function(e,a,t){"use strict";t.r(a);var n,o=t(0),c=t.n(o),r=t(6),i=t.n(r),s=(t(16),t(17),t(9)),l=t(10),u=t(2),d=t(1),m=t(7),f=t(8),h=t.n(f),v=Object(o.memo)((function(e){var a=e.moveUp,t=e.moveDown,n=e.moveLeft,o=e.moveRight;return c.a.createElement("div",{className:"gamepad"},c.a.createElement("div",{className:"group left"},c.a.createElement("i",{className:"fas fa-chevron-up up ico",onClick:a,onTouchEnd:a}),c.a.createElement("i",{className:"fas fa-chevron-left left ico",onClick:n,onTouchEnd:n}),c.a.createElement("i",{className:"fas fa-chevron-down down ico",onClick:t,onTouchEnd:t})),c.a.createElement("div",{className:"group right"},c.a.createElement("i",{className:"fas fa-chevron-up up ico",onClick:a,onTouchEnd:a}),c.a.createElement("i",{className:"fas fa-chevron-right right ico",onClick:o,onTouchEnd:o}),c.a.createElement("i",{className:"fas fa-chevron-down down ico",onClick:t,onTouchEnd:t})))})),p=window.innerWidth>600?600:window.innerWidth,E=p/15,k=18*E,b="CHANGE_DIRECTION",w="MOVE",O=function(){for(var e={},a=1;a<=18;a++)for(var t=1;t<=15;t++){var n=a+"-"+t,o={x:t,y:a,id:n,top:(a-1)*E,left:(t-1)*E};e[n]=o}return e}(),g="left",y="right",j="up",N="down",C=(n={},Object(d.a)(n,g,[j,N]),Object(d.a)(n,y,[j,N]),Object(d.a)(n,j,[g,y]),Object(d.a)(n,N,[g,y]),n),T={snake:["7-7","7-6","7-5"],direction:y,food:"3-5",alive:!0},L=function(e,a){var t=a.type,n=a.payload;switch(t){case b:return Object(u.a)(Object(u.a)({},e),{},{direction:n});case w:var o=O[e.snake[0]],c=o.x,r=o.y,i=e.direction,s=e.food;i===g?c=c>1?--c:15:i===y?c=c<15?++c:1:i===j?r=r>1?--r:18:i===N&&(r=r<18?++r:1);var d=r+"-"+c,m=Object(l.a)(e.snake);return m.includes(d)?(alert("Hey you KILLED the snake :P "),Object(u.a)(Object(u.a)({},e),{},{alive:!1})):(d===s?(s="",s=function(e,a){var t="";do{var n=Math.floor(Math.random()*e.length);t=e[n]}while(a.includes(t));return t}(Object.keys(O),m)):m.pop(),m.unshift(d),Object(u.a)(Object(u.a)({},e),{},{snake:m,food:s}));default:return e}};var S=function(e){var a=Object(o.useReducer)(L,T),t=Object(s.a)(a,2),n=t[0],r=t[1],i=Object(o.useCallback)((function(){n.alive&&(r({type:w}),setTimeout(i,700))}),[n.alive]);Object(o.useEffect)((function(){i()}),[i]);var l=h.a.throttle((function(e){C[n.direction].includes(e)&&r({type:b,payload:e})}),700);return c.a.createElement("div",{className:"board",style:{width:p,height:k}},Object.values(O).map((function(e){return c.a.createElement("div",{"data-id":e.id,key:e.id,style:{top:e.top,left:e.left,width:E,height:E},className:Object(m.a)("cell",n.snake.includes(e.id)&&"snake-body",n.snake[0]===e.id&&"snake-head",n.food===e.id&&"food")})})),c.a.createElement(v,{moveUp:function(){return l(j)},moveDown:function(){return l(N)},moveLeft:function(){return l(g)},moveRight:function(){return l(y)}}),c.a.createElement("span",{className:"status"},"Snake Size: ",n.snake.length))};var D=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("h1",{className:"header"},"Snake-n-Snack"),c.a.createElement("p",{className:"subheader"},"Hey player, our snake here really loves eating snacks. Lets not keep it hungry, ok ?"),c.a.createElement(S,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.c6420ff5.chunk.js.map
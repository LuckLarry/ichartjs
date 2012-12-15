iChart.Scale=iChart.extend(iChart.Component,{configure:function(){iChart.Scale.superclass.configure.apply(this,arguments);this.type="scale";this.set({position:"left",which:"h",basic_value:0,scale2grid:!0,distance:void 0,start_scale:0,end_scale:void 0,min_scale:void 0,max_scale:void 0,scale_space:void 0,scale_share:5,scale_enable:!0,scale_size:1,scale_width:4,scale_color:"#333333",scaleAlign:"center",labels:[],label:{},text_space:6,textAlign:"left",decimalsnum:0,join_style:"none",join_size:2});this.registerEvent("parseText")},isEventValid:function(){return{valid:!1}},doDraw:function(a){a.get("scale_enable")&&a.items.each(function(b){a.T.line(b.x0,b.y0,b.x1,b.y1,a.get("scale_size"),a.get("scale_color"),!1)});a.labels.each(function(a){a.draw()})},doLayout:function(a,b,c){c.get("scale_enable")&&c.items.each(function(c){c.x0+=a;c.y0+=b;c.x1+=a;c.y1+=b});c.labels.each(function(c){c.doLayout(a,b,0,c)})},doConfig:function(){iChart.Scale.superclass.doConfig.call(this);iChart.Assert.isNumber(this.get("distance"),"distance");var a=this._(),b=Math.abs,c=a.get("labels").length,f=a.get("min_scale"),g=a.get("max_scale"),e=a.get("scale_space"),d=a.get("end_scale"),h=a.get("start_scale");a.items=[];a.labels=[];a.number=0;if(0<c)a.number=c-1;else{iChart.Assert.isTrue(iChart.isNumber(g)||iChart.isNumber(d),"max_scale&end_scale");if(!iChart.isNumber(d)||d<g)d=a.push("end_scale",iChart.ceil(g));h>f&&(h=a.push("start_scale",iChart.floor(f)));e&&b(e)<b(d-h)&&a.push("scale_share",(d-h)/e);a.number=a.push("scale_share",b(a.get("scale_share")));if(!e||e>d-h)e=a.push("scale",(d-h)/a.get("scale_share"));parseInt(e)!=e&&0==a.get("decimalsnum")&&(b=e+"",b=b.substring(b.indexOf(".")+1),a.push("decimalsnum",b.length))}a.push("distanceOne",a.get("valid_distance")/a.number);var k,l,m,o=d=g=f=b=0,p=0;k=a.get("scale_width");l=k/2;m=a.get("scaleAlign");var n=a.get("position"),j=a.get("text_space"),q="",r=a.get("coo").get("axis.width");a.push("which",a.get("which").toLowerCase());a.isH="h"==a.get("which");a.isH?(m==a.O?d=-k:m==a.C?(d=-l,f=l):f=k,n==a.O?(p=-j-r[0],q=a.B):(p=j+r[2],q=a.O),n=a.C):(m==a.L?g=-k:m==a.C?(g=-l,b=l):b=k,q="middle",n==a.R)?(n=a.L,o=j+r[1]):(n=a.R,o=-j-r[3]);for(j=0;j<=a.number;j++)k=c?a.get("labels")[j]:(e*j+h).toFixed(a.get("decimalsnum")),l=a.isH?a.get("valid_x")+j*a.get("distanceOne"):a.x,m=a.isH?a.y:a.get("valid_y")+a.get("distance")-j*a.get("distanceOne"),a.items.push({x:l,y:m,x0:l+g,y0:m+d,x1:l+b,y1:m+f}),a.labels.push(new iChart.Text(iChart.applyIf(iChart.apply(a.get("label"),iChart.merge({text:k,x:l,y:m,originx:l+o,originy:m+p},a.fireEvent(a,"parseText",[k,l+o,m+p,j,a.number==j]))),{textAlign:n,textBaseline:q}),a))}});iChart.Coordinate={coordinate_:function(){var a=this._(),b=a.get("coordinate.scale"),c=a.get("scaleAlign"),f=!0;iChart.isObject(b)&&(b=[b]);iChart.isArray(b)?(b.each(function(a){if(a.position==c)return f=!1}),f&&(c=c==a.L?a.R:c==a.R?a.L:c==a.O?a.B:a.O,a.push("scaleAlign",c)),b.each(function(b){if(b.position==c){if(!b.start_scale)b.min_scale=a.get("minValue");if(!b.end_scale)b.max_scale=a.get("maxValue");return false}})):a.push("coordinate.scale",{position:c,scaleAlign:c,max_scale:a.get("maxValue"),min_scale:a.get("minValue")});a.is3D()&&(a.push("coordinate.xAngle_",a.get("xAngle_")),a.push("coordinate.yAngle_",a.get("yAngle_")),a.push("coordinate.zHeight",a.get("zHeight")*a.get("bottom_scale")));return new (iChart[a.is3D()?"Coordinate3D":"Coordinate2D"])(a.get("coordinate"),a)},coordinate:function(){var a=this._(),b=a.get("client_width"),c=a.get("client_height"),f=a.push("coordinate.width",iChart.parsePercent(a.get("coordinate.width"),b)),g=a.push("coordinate.height",iChart.parsePercent(a.get("coordinate.height"),c)),e=a.get("coordinate.valid_width"),d=a.get("coordinate.valid_height");if(!g||g>c)g=a.push("coordinate.height",Math.floor(0.8*c));if(!f||f>b)f=a.push("coordinate.width",Math.floor(0.8*b));e=a.push("coordinate.valid_width",iChart.parsePercent(e,f));d=a.push("coordinate.valid_height",iChart.parsePercent(d,g));a.is3D()&&(b=a.get("coordinate.pedestal_height"),c=a.get("coordinate.board_deep"),b=iChart.isNumber(b)?b:22,c=iChart.isNumber(c)?c:20,g=a.push("coordinate.height",g-b-c));a.get("align")==a.L?a.push(a.X,a.get("l_originx")):a.get("align")==a.R?a.push(a.X,a.get("r_originx")-f):a.push(a.X,a.get("centerx")-f/2);a.x=a.push(a.X,a.get(a.X)+a.get("offsetx"));a.y=a.push(a.Y,a.get("centery")-g/2+a.get("offsety"));(!e||e>f)&&a.push("coordinate.valid_width",f);(!d||d>g)&&a.push("coordinate.valid_height",g);a.push("coordinate.originx",a.x);a.push("coordinate.originy",a.y)}};iChart.Coordinate2D=iChart.extend(iChart.Component,{configure:function(){iChart.Coordinate2D.superclass.configure.apply(this,arguments);this.type="coordinate2d";this.set({sign_size:12,sign_space:5,scale:[],width:"80%",height:"80%",valid_width:"100%",valid_height:"100%",grid_line_width:1,grid_color:"#dbe1e1",gridHStyle:{},gridVStyle:{},gridlinesVisible:!0,scale2grid:!0,grids:void 0,ignoreOverlap:!0,ignoreEdge:!1,xlabel:"",ylabel:"",background_color:0,striped:!0,striped_direction:"v",striped_factor:0.01,crosshair:{enable:!1},width:void 0,height:void 0,z_index:-1,axis:{enable:!0,color:"#666666",width:1}});this.scale=[];this.gridlines=[]},getScale:function(a){for(var b=0;b<this.scale.length;b++){var c=this.scale[b];if(c.get("position")==a)return a=[c.get("basic_value"),c.get("start_scale"),c.get("end_scale"),c.get("end_scale")-c.get("start_scale"),0],a[4]=iChart.inRange(a[1],a[2]+1,a[0])||iChart.inRange(a[2]-1,a[1],a[0]),{range:a[4],basic:a[4]?(a[0]-a[1])/a[3]:0,start:a[4]?a[0]:a[1],end:a[2],distance:a[3]}}return{start:0,end:0,distance:0}},isEventValid:function(a,b){return{valid:a.x>b.x&&a.x<b.x+b.get(b.W)&&a.y<b.y+b.get(b.H)&&a.y>b.y}},doDraw:function(a){a.T.box(a.x,a.y,a.get(a.W),a.get(a.H),0,a.get("f_color"));if(a.get("striped")){var b,c,f=!1;a.get("axis.width");var g=iChart.dark(a.get("background_color"),a.get("striped_factor"),0)}var e="v"==a.get("striped_direction");a.gridlines.each(function(d){a.get("striped")&&(f&&(e?a.T.box(d.x1,d.y1+d.width,d.x2-d.x1,c-d.y1-d.width,0,g):a.T.box(b+d.width,d.y2,d.x1-b,d.y1-d.y2,0,g)),b=d.x1,c=d.y1,f=!f)}).each(function(b){b.overlap||(b.solid?a.T.line(b.x1,b.y1,b.x2,b.y2,b.width,b.color):a.T.dotted(b.x1,b.y1,b.x2,b.y2,b.width,b.color,b.size,b.fator))});a.T.box(a.x,a.y,a.get(a.W),a.get(a.H),a.get("axis"),!1,a.get("shadow"),!0);a.scale.each(function(a){a.draw()})},doConfig:function(){iChart.Coordinate2D.superclass.doConfig.call(this);var a=this._();iChart.Assert.isNumber(a.get(a.W),a.W);iChart.Assert.isNumber(a.get(a.H),a.H);a.atomic=!1;a.get("gradient")&&iChart.isString(a.get("f_color"))&&a.push("f_color",a.T.avgLinearGradient(a.x,a.y,a.x,a.y+a.get(a.H),[a.get("dark_color"),a.get("light_color")]));if(a.get("axis.enable")){var b=a.get("axis.width");iChart.isArray(b)||a.push("axis.width",[b,b,b,b])}else a.push("axis.width",[0,0,0,0]);a.get("crosshair.enable")&&(a.push("crosshair.wrap",a.container.shell),a.push("crosshair.height",a.get(a.H)),a.push("crosshair.width",a.get(a.W)),a.push("crosshair.top",a.y),a.push("crosshair.left",a.x),a.crosshair=new iChart.CrossHair(a.get("crosshair"),a));var c,f=(b=!(!a.get("gridlinesVisible")||!a.get("grids")))&&!!a.get("grids.horizontal"),g=b&&!!a.get("grids.vertical"),e=a.get(a.H),d=a.get(a.W),h=a.get("valid_width"),k=a.get("valid_height"),b=a.get("gridlinesVisible")&&a.get("scale2grid")&&!(f&&g),l=(d-h)/2,m=(e-k)/2,o=a.get("axis.width");a.push("x_start",a.x+(d-h)/2);a.push("x_end",a.x+(d+h)/2);a.push("y_start",a.y+(e-k)/2);a.push("y_end",a.y+(e+k)/2);iChart.isArray(a.get("scale"))||(iChart.isObject(a.get("scale"))?a.push("scale",[a.get("scale")]):a.push("scale",[]));a.get("scale").each(function(b){c=(c=b.position)||a.L;c=c.toLowerCase();b[a.X]=a.x;b.coo=a;b[a.Y]=a.y;b.valid_x=a.x+l;b.valid_y=a.y+m;b.position=c;if(c==a.O){b.which="h";b.distance=d;b.valid_distance=h}else if(c==a.R){b.which="v";b.distance=e;b.valid_distance=k;b[a.X]=b[a.X]+d;b.valid_x=b.valid_x+h}else if(c==a.B){b.which="h";b.distance=d;b.valid_distance=h;b[a.Y]=b[a.Y]+e;b.valid_y=b.valid_y+k}else{b.which="v";b.distance=e;b.valid_distance=k}a.scale.push(new iChart.Scale(b,a.container))},a);var p=a.push("ignoreOverlap",a.get("ignoreOverlap")&&a.get("axis.enable")||a.get("ignoreEdge"));if(p)var n=a.get("ignoreEdge")?function(b,c,d){return b=="v"?d==a.y||d==a.y+e:c==a.x||c==a.x+b}:function(b,c,k){return b=="v"?k==a.y&&o[0]>0||k==a.y+e&&o[2]>0:c==a.x&&o[3]>0||c==a.x+d&&o[1]>0};var j={solid:!0,size:10,fator:1,width:a.get("grid_line_width"),color:a.get("grid_color")},q=iChart.applyIf(a.get("gridHStyle"),j),r=iChart.applyIf(a.get("gridVStyle"),j);if(b){var s,t,u;a.scale.each(function(b){u=b.get("position");if(!iChart.isFalse(b.get("scale2grid"))&&!(f&&b.get("which")=="v"||g&&b.get("which")=="h")){s=t=0;u==a.O?t=e:u==a.R?s=-d:u==a.B?t=-e:s=d;b.items.each(function(c){p&&a.gridlines.push(iChart.applyIf({overlap:n.call(a,b.get("which"),c.x,c.y),x1:c.x,y1:c.y,x2:c.x+s,y2:c.y+t},b.isH?r:q))})}})}if(g){var i=a.get("grids.vertical");iChart.Assert.gt(i.value,0,"value");b=d/i.value;j=i.value;"given_value"==i.way&&(j=b,b=i.value,b=b>d?d:b);for(i=0;i<=j;i++)p&&a.gridlines.push(iChart.applyIf({overlap:n.call(a,"h",a.x+i*b,a.y),x1:a.x+i*b,y1:a.y,x2:a.x+i*b,y2:a.y+e,H:!1,width:r.width,color:r.color},r))}if(f){i=a.get("grids.horizontal");iChart.Assert.gt(i.value,0,"value");b=e/i.value;j=i.value;"given_value"==i.way&&(j=b,b=i.value,b=b>e?e:b);for(i=0;i<=j;i++)p&&a.gridlines.push(iChart.applyIf({overlap:n.call(a,"v",a.x,a.y+i*b),x1:a.x,y1:a.y+i*b,x2:a.x+d,y2:a.y+i*b,H:!0,width:q.width,color:q.color},q))}}});iChart.Coordinate3D=iChart.extend(iChart.Coordinate2D,{configure:function(){iChart.Coordinate3D.superclass.configure.apply(this,arguments);this.type="coordinate3d";this.dimension=iChart._3D;this.set({xAngle:60,yAngle:20,xAngle_:void 0,yAngle_:void 0,zHeight:0,pedestal_height:22,board_deep:20,left_board:!0,gradient:!0,color_factor:0.18,ignoreEdge:!0,striped:!1,grid_color:"#a4ad96",background_color:"#d6dbd2",shadow_offsetx:4,shadow_offsety:2,wall_style:[],axis:{enable:!1}})},doDraw:function(a){var b=a.get(a.W),c=a.get(a.H),f=a.get("xAngle_"),g=a.get("yAngle_"),e=a.get("zHeight"),d=a.get("z_offx"),h=a.get("z_offy");a.get("pedestal_height")&&a.T.cube3D(a.x,a.y+c+a.get("pedestal_height"),f,g,!1,b,a.get("pedestal_height"),3*e/2,a.get("axis.enable"),a.get("axis.width"),a.get("axis.color"),a.get("bottom_style"));a.get("board_deep")&&a.T.cube3D(a.x+d,a.y+c-h,f,g,!1,b,c,a.get("board_deep"),a.get("axis.enable"),a.get("axis.width"),a.get("axis.color"),a.get("board_style"));a.T.cube3D(a.x,a.y+c,f,g,!1,b,c,e,a.get("axis.enable"),a.get("axis.width"),a.get("axis.color"),a.get("wall_style"));a.gridlines.each(function(b){b.solid?(a.get("left_board")&&a.T.line(b.x1,b.y1,b.x1+d,b.y1-h,b.width,b.color),a.T.line(b.x1+d,b.y1-h,b.x2+d,b.y2-h,b.width,b.color)):(a.get("left_board")&&a.T.dotted(b.x1,b.y1,b.x1+d,b.y1-h,b.width,b.color,b.size,b.fator),a.T.dotted(b.x1+d,b.y1-h,b.x2+d,b.y2-h,b.width,b.color,b.size,b.fator))});a.scale.each(function(a){a.draw()})},doConfig:function(){iChart.Coordinate3D.superclass.doConfig.call(this);for(var a=this._(),b=a.get("wall_style"),c=a.get("background_color"),f=a.get(a.H),g=a.get(a.W),e=a.get("color_factor"),d=a.push("z_offx",a.get("xAngle_")*a.get("zHeight")),h=a.push("z_offy",a.get("yAngle_")*a.get("zHeight"));6>b.length;)b.push({color:c});a.get("left_board")||(b[2]=!1,a.scale.each(function(a){a.doLayout(d,-h,a)}));a.push("bottom_style",[{color:a.get("shadow_color"),shadow:a.get("shadow")},!1,!1,{color:b[3].color},!1,{color:b[3].color}]);a.push("board_style",[!1,!1,!1,{color:b[4].color},{color:b[5].color},!1]);a.get("gradient")&&(iChart.isString(b[0].color)&&(b[0].color=a.T.avgLinearGradient(a.x,a.y+f,a.x+g,a.y+f,[iChart.dark(b[0].color,e/2+0.06),iChart.dark(b[0].color,e/2+0.06)])),iChart.isString(b[1].color)&&(b[1].color=a.T.avgLinearGradient(a.x+d,a.y-h,a.x+d,a.y+f-h,[iChart.dark(b[1].color,e),iChart.light(b[1].color,e)])),iChart.isString(b[2].color)&&(b[2].color=a.T.avgLinearGradient(a.x,a.y,a.x,a.y+f,[iChart.light(b[2].color,e/3),iChart.dark(b[2].color,e)])),a.get("bottom_style")[5].color=a.T.avgLinearGradient(a.x,a.y+f,a.x,a.y+f+a.get("pedestal_height"),[iChart.light(b[3].color,e/2+0.06),iChart.dark(b[3].color,e/2,0)]));a.push("wall_style",[b[0],b[1],b[2]])}});
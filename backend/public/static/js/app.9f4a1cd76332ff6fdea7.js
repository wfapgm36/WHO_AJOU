webpackJsonp([1],{"1/oy":function(t,e){},"1cYG":function(t,e){},"40co":function(t,e){},"9K4q":function(t,e){},"9M+g":function(t,e){},GfHa:function(t,e){},Id91:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("7+uW"),o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app"},[a("b-navbar",{staticClass:"nav-background",attrs:{toggleable:"md",type:"dark"}},[a("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),t._v(" "),a("b-navbar-brand",{attrs:{href:"#"}},[t._v(t._s(t.isLogin)+"::WHO AJOU?")]),t._v(" "),a("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[a("b-navbar-nav",{staticClass:"ml-auto"},[a("b-nav-form",[a("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",type:"text",placeholder:"Search"}}),t._v(" "),a("b-button",{staticClass:"my-2 my-sm-0",attrs:{size:"sm",type:"submit"}},[t._v("Search")])],1),t._v(" "),a("b-navbar-nav",[a("b-nav-item",[a("router-link",{attrs:{to:"/main"}},[t._v("메인")])],1),t._v(" "),t.isLogin?a("b-nav-item",[a("router-link",{attrs:{to:"/board"}},[t._v("게시판")])],1):t._e(),t._v(" "),t.isLogin?t._e():a("b-nav-item",{attrs:{id:"signup"}},[a("router-link",{attrs:{to:"/signup"}},[t._v("회원가입")])],1),t._v(" "),t.isLogin?a("b-nav-item",[a("router-link",{attrs:{to:"/logout"}},[t._v("로그아웃")])],1):t._e()],1),t._v(" "),t.isLogin?a("b-nav-item-dropdown",{attrs:{right:""}},[a("template",{slot:"button-content"},[a("em",[t._v("마이페이지")])]),t._v(" "),a("b-dropdown-item",[a("router-link",{attrs:{to:"/profile"}},[t._v("프로필")])],1),t._v(" "),a("b-dropdown-item",[a("router-link",{attrs:{to:"/user-list"}},[t._v("유저 리스트")])],1)],2):t._e()],1)],1)],1),t._v(" "),a("router-view")],1)},staticRenderFns:[]};var n=a("VU/8")({name:"App",data:function(){return{isLogin:!1}},created:function(){var t=this;this.$EventBus.$on("removeTab",function(e){t.isLogin=e})}},o,!1,function(t){a("1cYG")},null,null).exports,s=a("/ocq"),i=a("e6fC"),l=(a("Jmt5"),a("9M+g"),{render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("h1",{attrs:{"align-h":"center"}},[t._v("This is Login Page!")]),t._v(" "),a("b-container",[a("b-row",{staticClass:"login1",attrs:{"align-h":"center"}},[a("b-col",{attrs:{cols:"5"}},[a("b-card",{staticClass:"login2"},[a("h3",{staticClass:"login3"},[t._v("로그인")]),t._v(" "),t.show?a("b-form",{on:{submit:t.login,reset:t.onReset}},[a("b-form-group",{attrs:{id:"ID-InputGroup",label:"ID:","label-for":"id-input"}},[a("b-form-input",{attrs:{id:"id-input",type:"text",required:"",placeholder:"이메일 주소"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),a("b-form-group",{attrs:{id:"password-InputGroup",label:"Password:","label-for":"pwd-input"}},[a("b-form-input",{attrs:{id:"pwd-input",type:"password",required:"",placeholder:"비밀번호"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),a("b-form-group",{attrs:{id:"RememberCheck"}},[a("b-form-checkbox-group",{attrs:{id:"Checks"},model:{value:t.form.checked,callback:function(e){t.$set(t.form,"checked",e)},expression:"form.checked"}},[a("b-form-checkbox",{attrs:{value:"me"}},[t._v("아이디 기억하기")])],1)],1),t._v(" "),a("div",{staticClass:"d-flex justify-content-between"},[a("div",[a("router-link",{attrs:{to:"/main"}},[a("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("로그인")]),t._v(" \n                  ")],1),t._v(" "),a("b-button",{attrs:{type:"reset",variant:"danger"}},[t._v("초기화")])],1),t._v(" "),a("div",[a("a",{directives:[{name:"b-modal",rawName:"v-b-modal.modal1",modifiers:{modal1:!0}}],attrs:{href:"#"}},[t._v("비밀번호 찾기")])])])],1):t._e()],1)],1)],1)],1),t._v(" "),a("b-modal",{attrs:{id:"modal1",title:"Forgot Password"}},[t._v("\n    Nothing yet.\n  ")])],1)},staticRenderFns:[]}),c=a("VU/8")({name:"Login",data:function(){return{form:{name:"",password:"",checked:[]},show:!0}},methods:{login:function(){},onReset:function(t){var e=this;t.preventDefault(),this.form.email="",this.form.password="",this.form.checked=[],this.show=!1,this.$nextTick(function(){e.show=!0})},signup:function(){}}},l,!1,null,null,null).exports,v=a("mvHQ"),u=a.n(v),b={name:"SignUp",data:function(){return{form:{email:"",name:"",nickname:"",password:"",major:null},majors:[{text:"선택",value:null},"경영학과","디지털미디어학과","소프트웨어학과","응용화학생명공학과"],show:!0}},methods:{onSubmit:function(t){t.preventDefault(),alert(u()(this.form))}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"signup"},[a("h1",{attrs:{"align-h":"center"}},[t._v("This is Sign Up Page!")]),t._v(" "),t.show?a("b-form",{on:{submit:t.login,reset:t.onReset}},[a("b-form-group",{attrs:{id:"ID-InputGroup",label:"ID:","label-for":"id-input"}},[a("b-form-input",{attrs:{id:"id-input",type:"text",required:"",placeholder:"이름"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),a("b-form-group",{attrs:{id:"password-InputGroup",label:"Password:","label-for":"pwd-input"}},[a("b-form-input",{attrs:{id:"pwd-input",type:"password",required:"",placeholder:"비밀번호"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),a("b-form-group",{attrs:{id:"nickname-InputGroup",label:"Nickname:","label-for":"nickname-input"}},[a("b-form-input",{attrs:{id:"nickname-input",type:"text",required:"",placeholder:"별명"},model:{value:t.form.nickanme,callback:function(e){t.$set(t.form,"nickanme",e)},expression:"form.nickanme"}})],1),t._v(" "),a("b-form-group",{attrs:{id:"email-InputGroup",label:"Email:","label-for":"email-input"}},[a("b-form-input",{attrs:{id:"email-input",type:"email",required:"",placeholder:"이메일 주소"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),t._v(" "),a("b-form-group",{attrs:{id:"major-InputGroup",label:"Major:","label-for":"majour-input"}},[a("b-form-select",{attrs:{id:"majour-input",options:t.majors,required:""},model:{value:t.form.major,callback:function(e){t.$set(t.form,"major",e)},expression:"form.major"}})],1),t._v(" "),a("b-row",{attrs:{"align-h":"center"}},[a("b-button",{attrs:{type:"submit",variant:"primary","align-h":"center"}},[t._v("회원가입")])],1)],1):t._e()],1)},staticRenderFns:[]},_=a("VU/8")(b,m,!1,null,null,null).exports,d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("b-card",{attrs:{"no-body":""}},[a("b-tabs",{attrs:{card:""}},[a("span",{staticClass:"tab_context"},[a("b-tab",{attrs:{title:"커리큘럼",active:""}},[a("p",[t._v(t._s(t.major))]),t._v(" "),a("b-container",{staticClass:"curriculum"},[a("b-row",{staticClass:"height",attrs:{"align-v":"center"}},[a("b-col",[t._v("1-1")]),t._v(" "),a("b-col",[t._v("1-2 ")]),t._v(" "),a("b-col",[t._v("2-1")]),t._v(" "),a("b-col",[t._v("2-2")]),t._v(" "),a("b-col",[t._v("3-1")]),t._v(" "),a("b-col",[t._v("3-2")]),t._v(" "),a("b-col",[t._v("4-1")]),t._v(" "),a("b-col",[t._v("4-2")])],1),t._v(" "),a("b-row",{staticClass:"height",attrs:{"align-v":"center"}},[a("b-col",[t._v("1-1")]),t._v(" "),a("b-col",[t._v("1-2")]),t._v(" "),a("b-col",[t._v("2-1")]),t._v(" "),a("b-col",[t._v("2-2")]),t._v(" "),a("b-col",[t._v("3-1")]),t._v(" "),a("b-col",[t._v("3-2")]),t._v(" "),a("b-col",[t._v("4-1")]),t._v(" "),a("b-col",[t._v("4-2")])],1),t._v(" "),a("b-row",{staticClass:"height",attrs:{"align-v":"center"}},[a("b-col",[t._v("1-1")]),t._v(" "),a("b-col",[t._v("1-2")]),t._v(" "),a("b-col",[t._v("2-1")]),t._v(" "),a("b-col",[t._v("2-2")]),t._v(" "),a("b-col",[t._v("3-1")]),t._v(" "),a("b-col",[t._v("3-2")]),t._v(" "),a("b-col",[t._v("4-1")]),t._v(" "),a("b-col",[t._v("4-2")])],1),t._v(" "),a("b-row",{staticClass:"height",attrs:{"align-v":"center"}},[a("b-col",[t._v("1-1")]),t._v(" "),a("b-col",[t._v("1-2")]),t._v(" "),a("b-col",[t._v("2-1")]),t._v(" "),a("b-col",[t._v("2-2")]),t._v(" "),a("b-col",[t._v("3-1")]),t._v(" "),a("b-col",[t._v("3-2")]),t._v(" "),a("b-col",[t._v("4-1")]),t._v(" "),a("b-col",[t._v("4-2")])],1),t._v(" "),a("b-row",{staticClass:"height",attrs:{"align-v":"center"}},[a("b-col",[t._v("1-1")]),t._v(" "),a("b-col",[t._v("1-2")]),t._v(" "),a("b-col",[t._v("2-1")]),t._v(" "),a("b-col",[t._v("2-2")]),t._v(" "),a("b-col",[t._v("3-1")]),t._v(" "),a("b-col",[t._v("3-2")]),t._v(" "),a("b-col",[t._v("4-1")]),t._v(" "),a("b-col",[t._v("4-2")])],1),t._v("0\n            "),a("b-row",{staticClass:"height",attrs:{"align-v":"center"}},[a("b-col",[t._v("1-1")]),t._v(" "),a("b-col",[t._v("1-2")]),t._v(" "),a("b-col",[t._v("2-1")]),t._v(" "),a("b-col",[t._v("2-2")]),t._v(" "),a("b-col",[t._v("3-1")]),t._v(" "),a("b-col",[t._v("3-2")]),t._v(" "),a("b-col",[t._v("4-1")]),t._v(" "),a("b-col",[t._v("4-2")])],1)],1)],1),t._v(" "),a("b-tab",{attrs:{title:"강의평가"}},[t._v("\n              Tab Contents 2\n            ")])],1)])],1)],1)},staticRenderFns:[]};var p=a("VU/8")({name:"Main",data:function(){return{msg:"This is Main Page!",major:"소프트웨어학과"}},created:function(){this.$EventBus.$emit("removeTab",!0)}},d,!1,function(t){a("vONO")},null,null).exports,f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-list"},[a("h1",{attrs:{"align-h":"center"}},[t._v("This is User List Page!")]),t._v(" "),a("ul",t._l(t.items,function(e){return a("li",{key:e.id},[t._v("\n      "+t._s(e.username)+"\n      ")])}))])},staticRenderFns:[]};var h=a("VU/8")({name:"user-list",data:function(){return{items:[]}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.$http.get("/api/user/list").then(function(e){t.items=e.data})}}},f,!1,function(t){a("40co")},"data-v-ba2621c8",null).exports,g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"board"}},[a("h1",{attrs:{"align-h":"center"}},[t._v("This is Board Page!")]),t._v(" "),a("div",{staticClass:"searchFunction"},[a("b-row",{staticClass:"search"},[a("b-col",{attrs:{cols:"1.3"}},[a("div",[a("b-form-select",{staticClass:"mb-3",attrs:{options:t.options,size:"sm"},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1)]),t._v(" "),a("b-col",[a("b-form-input",{attrs:{type:"text",placeholder:"Search",size:"sm",id:"searchBar"},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})],1),t._v(" "),a("b-col",[a("b-button",{attrs:{type:"submit",size:"sm"}},[t._v("Search")])],1)],1)],1),t._v(" "),a("div",{attrs:{id:"board_main"}},[a("b-container",{staticClass:"content_row"},[a("b-row",{staticClass:"text-center",attrs:{"align-h":"center"}},[a("b-col",[t._v("번호")]),t._v(" "),a("b-col",{attrs:{cols:"5"}},[t._v("제목")]),t._v(" "),a("b-col",[t._v("작성자")]),t._v(" "),a("b-col",{attrs:{cols:"2"}},[t._v("등록일")]),t._v(" "),a("b-col",[t._v("조회수")])],1),t._v(" "),a("hr"),t._v(" "),t._l(t.items,function(e){return a("div",{key:e.id},[a("b-row",{staticClass:"text-center"},[a("b-col",[t._v(t._s(e.id))]),t._v(" "),a("b-col",{attrs:{cols:"5"}},[a("b-button",{attrs:{id:"title_button"},on:{click:function(e){t.$router.push({name:"board-view",params:{id:t.boards.id}})}}},[t._v(t._s(e.title))])],1),t._v(" "),a("b-col",[t._v(t._s(e.writer))]),t._v(" "),a("b-col",{attrs:{cols:"2"}},[t._v(t._s(e.createdAt))]),t._v(" "),a("b-col",[t._v(t._s(e.count))])],1),t._v(" "),a("hr")],1)}),t._v(" "),a("div",{attrs:{id:"paging"}},[a("b-pagination-nav",{attrs:{"base-url":"#",align:"center","total-rows":10,"number-of-pages":10},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}}),t._v(" "),a("router-link",{attrs:{to:"/write"}},[a("b-button",{attrs:{id:"write_board",size:"sm"}},[t._v("글쓰기")])],1),t._v(" "),a("br"),t._v(" "),a("div",[t._v("currentPage: "+t._s(t.currentPage))])],1)],2)],1)])},staticRenderFns:[]};var w=a("VU/8")({name:"board",data:function(){return{currentPage:1,searchText:"",items:[],options:[{text:"전체"},{text:"제목"},{text:"작성자"},{text:"게시물 번호"}]}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.$http.get("/api/board").then(function(e){t.items=e.data})}}},g,!1,function(t){a("9K4q")},"data-v-00850da7",null).exports,k={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"boards-view"},[e("div",[e("b-card-group",{attrs:{deck:""}},[e("b-card",{attrs:{"header-tag":"header","footer-tag":"footer"}},[e("h6",{staticClass:"mb-0",attrs:{slot:"header"},slot:"header"},[this._v("제목")]),this._v(" "),e("h6",{attrs:{slot:"footer"},slot:"footer"},[this._v("댓글")]),this._v(" "),e("p",{staticClass:"card-text"},[this._v("내용")])])],1)],1)])},staticRenderFns:[]},x=a("VU/8")({name:"BoardsView"},k,!1,null,null,null).exports,C={data:function(){return{form:{title:"",contents:""},show:!0,boards:[]}},methods:{onSubmit:function(t){var e=this;t.preventDefault(),this.$http.post("/api/board",this.form).then(function(t){e.boards=t.data,alert(e.boards)}).catch(function(t){alert(t)})}}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"board-write"},[a("b-card-group",{staticClass:"mb-3",attrs:{deck:""}},[a("b-card",{staticClass:"text-center",attrs:{"bg-variant":"dark",header:"게시판 글쓰기","text-variant":"white"}},[a("div",[t.show?a("b-form",{on:{submit:t.onSubmit}},[a("b-form-group",{attrs:{id:"titleInput",label:"제목","label-for":"titleInput"}},[a("b-form-input",{attrs:{id:"titleInput",type:"text",required:"",placeholder:"제목"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("b-form-group",{attrs:{id:"contentInput",label:"내용","label-for":"contentInput"}},[a("b-form-textarea",{attrs:{id:"contentInput",placeholder:"내용",rows:15,"max-rows":25},model:{value:t.form.contents,callback:function(e){t.$set(t.form,"contents",e)},expression:"form.contents"}})],1),t._v(" "),a("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("완료")])],1):t._e()],1)])],1)],1)},staticRenderFns:[]},$=a("VU/8")(C,y,!1,null,null,null).exports;r.a.use(i.a),r.a.use(s.a);var I=new s.a({mode:"history",routes:[{path:"/",name:"login",component:c},{path:"/signup",name:"signup",component:_},{path:"/main",name:"main",component:p},{path:"/board",name:"board",component:w},{path:"/write",name:"board-write",component:$},{path:"/view/:id",name:"board-view",component:x},{path:"/userlist",name:"user-list",component:h}]}),j=a("mtWM"),P=a.n(j);r.a.prototype.$EventBus=new r.a,r.a.config.productionTip=!1,r.a.prototype.$http=P.a,new r.a({el:"#app",router:I,components:{App:n},template:"<App/>"})},vONO:function(t,e){},zj2Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.9f4a1cd76332ff6fdea7.js.map
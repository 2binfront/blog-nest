import{g as x,k as h,r as k,z as T,o as a,c as n,F as w,x as g,n as i,t as C,q as u,v as p,a as d,B as _,d as V,C as A,y as B,A as K,l as S}from"./B4nhvq4f.js";const D={class:"flex"},N=["onClick"],U={key:0},$={key:1},b=["onUpdate:modelValue","onKeyup"],q={key:0,class:"ml-8 mt"},R=x({__name:"tag",setup(E){const s=h(),m=t=>{K(`/articles?tagId=${t._id}`)},o=k(""),c=T(()=>!!S().query.edit),y=async()=>{await s.addTag(o.value)},f=async t=>{await s.editTag(t)},v=async t=>{await s.delTag(t)};return(t,r)=>(a(),n("div",D,[(a(!0),n(w,null,g(i(s).tags,e=>(a(),n("div",{class:"mx font-italic text-20px cp underline article-brief",key:e._id,onClick:l=>m(e)},[i(c)?(a(),n("div",$,[u(d("input",{class:"text-20px fw700",type:"text","onUpdate:modelValue":l=>e.name=l,onKeyup:_(l=>f(e),["enter"])},null,40,b),[[p,e.name]]),d("button",{onClick:v},"delete")])):(a(),n("div",U,C(e.name),1))],8,N))),128)),i(c)?(a(),n("div",q,[V(" new Tag: "),u(d("input",{type:"text","onUpdate:modelValue":r[0]||(r[0]=e=>A(o)?o.value=e:null),onKeyup:_(y,["enter"])},null,544),[[p,i(o)]])])):B("",!0)]))}});export{R as default};
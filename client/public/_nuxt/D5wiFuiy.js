import{f as k,j as w,y as T,r as g,o as a,c as n,F as u,s as f,a as i,t as d,m as o,n as p,v as _,A as x,d as A,B as V,x as $,z as B,C as K,k as N}from"./DYllrXfV.js";import{f as v}from"./I5KwWCup.js";const S={class:"flex flex-wrap items-start"},U={class:"flex items-end text-28px fw700"},D={class:"time-string mr-2"},E={key:0},F={key:1,class:"text-20px fw700"},R=["onUpdate:modelValue","onKeyup"],b=["onClick"],j={class:"font-italic mr-2"},q={class:"text-20px fw700"},z={key:0,class:"ml-8 mt"},I=k({__name:"category",setup(L){const r=w(),y=e=>{B(`/article?id=${e}`)},c=T(()=>!!N().query.edit),l=g(""),h=async()=>{K(async()=>{await r.addCategory(l.value)})},C=async e=>{await r.editCategory(e)};return(e,m)=>(a(),n("div",S,[(a(!0),n(u,null,f(o(r).categories,t=>(a(),n("div",{key:t._id,class:"flex flex-col ml-8 mt"},[i("div",U,[i("div",D,d(("formatTime"in e?e.formatTime:o(v))(t.createdAt)),1),o(c)?(a(),n("div",F,[p(i("input",{class:"text-20px fw700",type:"text","onUpdate:modelValue":s=>t.name=s,onKeyup:x(s=>C(t),["enter"])},null,40,R),[[_,t.name]])])):(a(),n("div",E,d(t.name),1))]),(a(!0),n(u,null,f(o(r).allArticles.filter(s=>s.category===t._id),(s,M)=>(a(),n("div",{onClick:P=>y(s._id),class:"cp flex items-end article-brief"},[i("div",j,d(`${("formatTime"in e?e.formatTime:o(v))(s.createdAt)}: `),1),i("div",q,d(`${s.title}`),1)],8,b))),256))]))),128)),o(c)?(a(),n("div",z,[A(" new Category: "),p(i("input",{type:"text","onUpdate:modelValue":m[0]||(m[0]=t=>V(l)?l.value=t:null),onKeyup:x(h,["enter"])},null,544),[[_,o(l)]])])):$("",!0)]))}});export{I as default};

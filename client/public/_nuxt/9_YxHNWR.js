import{f as _,j as p,k as g,g as A,y as h,o as n,c as i,F as v,s as y,a as s,t as r,m as o,z as T}from"./DYllrXfV.js";import{f as m}from"./I5KwWCup.js";const $={class:"full"},k=["onClick"],C={class:"time-string"},B={class:"flex items-end"},S={ml:""},x=_({__name:"index",setup(q){const a=p(),l=g();A(async()=>{a.getAllArticles()});const u=h(()=>l.query.tagId?a.allArticles.filter(e=>e.tags.includes(l.query.tagId)):a.allArticles),f=e=>{T(`/article?id=${e}`)};return(e,F)=>(n(),i("div",$,[(n(!0),i(v,null,y(o(u),(t,I)=>{var c;return n(),i("div",{onClick:d=>f(t._id),class:"cp my article-brief"},[s("div",null,[s("span",C,r(`Created on ${("formatTime"in e?e.formatTime:o(m))(t.createdAt)}, Updated on ${("formatTime"in e?e.formatTime:o(m))(t.updatedAt)}`),1)]),s("div",B,[s("h2",null,r(`${t.title}`),1),s("div",S,r(`${(c=o(a).categories.find(d=>d._id===t.category))==null?void 0:c.name} `),1)])],8,k)}),256))]))}});export{x as default};
import{f as _,j as p,k as g,y as h,o as r,c as i,F as v,s as y,a as s,t as n,m as a,z as A}from"./DYllrXfV.js";import{f as m}from"./I5KwWCup.js";const T={class:"full"},$=["onClick"],k={class:"time-string"},C={class:"flex items-end"},B={ml:""},j=_({__name:"articles",setup(S){const o=p(),l=g(),u=h(()=>l.query.tagId?o.allArticles.filter(e=>e.tags.includes(l.query.tagId)):o.allArticles),f=e=>{A(`/article?id=${e}`)};return(e,q)=>(r(),i("div",T,[(r(!0),i(v,null,y(a(u),(t,F)=>{var c;return r(),i("div",{onClick:d=>f(t._id),class:"cp my article-brief"},[s("div",null,[s("span",k,n(`Created on ${("formatTime"in e?e.formatTime:a(m))(t.createdAt)}, Updated on ${("formatTime"in e?e.formatTime:a(m))(t.updatedAt)}`),1)]),s("div",C,[s("h2",null,n(`${t.title}`),1),s("div",B,n(`${(c=a(o).categories.find(d=>d._id===t.category))==null?void 0:c.name} `),1)])],8,$)}),256))]))}});export{j as default};
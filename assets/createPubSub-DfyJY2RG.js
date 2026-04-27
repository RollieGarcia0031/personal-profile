function n(){const t={};return{subscribe:function(e,u){return t[e]||=new Set,t[e].add(u),()=>t[e].delete(u)},publish:function(e,u){t[e]?.forEach(c=>c(u))}}}export{n as c};

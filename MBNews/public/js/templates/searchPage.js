System.register(["./elements","../debugData"],function(e,r){"use strict";function n(e){var r=document.querySelector("main");r.innerHTML='<link rel="stylesheet" type="text/css" href="/mbnews/public/css/templates/searchPage.css" />\n        '+t.mainNav().outerHTML+'\n        <div class="main-container">\n            <section>\n                <nav class="news-cat">\n                    '+t.sideCat(a.searchSideCatDbgData).outerHTML+"\n                </nav>\n            </section>\n            <section>\n                "+function(){var r;try{if(0===e.resultCount)return"无搜索结果！";if(e.resultCount<0)throw"Illegal result count!";if(e.currentPage<1)throw"Illegal current page!";if("news"!==e.resultFilterType&&"vision"!==e.resultFilterType)throw"Unexpected result type!"}catch(e){return console.log(e),"error"}return e.resultCount>0&&(r=e.resultCount%e.results.length===0?e.resultCount/e.results.length:Math.ceil(e.resultCount/e.results.length)),'\n                        <div class="main-search">\n                            <input type="text" value="'+e.keyword+'" />\n                            <button id="main-search">搜索</button>\n                        </div>\n                        <div class="separator"><h2></h2><div class="separator-line"></div></div>\n                        <div class="result-container"><ul>'+function(){var r="";switch(e.resultFilterType){case"news":for(var n=0;n<e.results.length;n++)r+=t.newsItem(e.results[n]).outerHTML;break;case"vision":for(var n=0;n<e.results.length;n++)r+=t.visionItem(e.results[n]).outerHTML}return r}()+'</ul></div>\n                        <div class="page-nav"><ul>\n                            <li>共 '+e.resultCount+' 个</li>\n                            <li><a href="/mbnews/search?k='+e.keyword+'">首页</a></li>\n                            <li>'+function(){return 1===e.currentPage?"上一页":'<a href="/mbnews/search?k='+e.keyword+"&p="+(e.currentPage-1)+'">上一页</a>'}()+"</li>\n                            "+function(){var n="";if(r>9){if(e.currentPage>4&&e.currentPage<r-3)for(var t=e.currentPage-4;t<e.currentPage+5;t++)n+="<li><a"+(t===e.currentPage?' class="current-page"':"")+' href="/mbnews/search?k='+e.keyword+"&p="+t+'">'+t+"</a></li>";else if(e.currentPage<5)for(var t=1;t<10;t++)n+="<li><a"+(t===e.currentPage?' class="current-page"':"")+' href="/mbnews/search?k='+e.keyword+"&p="+t+'">'+t+"</a></li>";else if(e.currentPage>r-4)for(var t=r-8;t<r+1;t++)n+="<li><a"+(t===e.currentPage?' class="current-page"':"")+' href="/mbnews/search?k='+e.keyword+"&p="+t+'">'+t+"</a></li>"}else for(var t=1;t<r+1;t++)n+="<li><a"+(t===e.currentPage?' class="current-page"':"")+' href="/mbnews/search?k='+e.keyword+"&p="+t+'">'+t+"</a></li>";return n}()+"\n                            <li>"+function(){return e.currentPage===r?"下一页":'<a href="/mbnews/search?k='+e.keyword+"&p="+(e.currentPage+1)+'">下一页</a>'}()+'</li>\n                            <li><a href="/mbnews/search?k='+e.keyword+"&p="+r+'">尾页</a></li>\n                            <li>'+e.currentPage+"/"+r+"</li>\n                        </ul></div>"}()+'\n            </section>\n            <section>\n                <div class="hot">\n                    <div class="market">//TODO 行情</div>\n                    '+t.hot(a.hotTagsDbgData).outerHTML+"\n                    "+t.hot(a.hotCoverDbgData).outerHTML+"\n                </div>\n            </section>\n        </div>",document.body.appendChild(r)}r&&r.id;e("searchPage",n);var t,a;return{setters:[function(e){t=e},function(e){a=e}],execute:function(){}}});
//# sourceMappingURL=searchPage.js.map
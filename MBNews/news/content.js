System.register(["../../public/js/templates/elements","../../public/js/debugData"],function(n,t){"use strict";var e,s,i;t&&t.id;return{setters:[function(n){e=n},function(n){s=n}],execute:function(){i=document.querySelector("main"),i.innerHTML='<link rel="stylesheet" type="text/css" href="style.css" />\n    '+e.mainNav().outerHTML+'\n    <div class="main-container">\n        <section>\n            '+e.sideCat(s.newsSideCatDbgData).outerHTML+'\n        </section>\n        <section>\n            <div class="news-list">\n                <ul>'+function(){for(var n="",t=0;t<s.newsDbgData.length;t++)n+=e.newsItem(s.newsDbgData[t]).outerHTML;return n}()+'</ul>\n                <button class="more">点击加载更多</button>\n            </div>\n            <div class="vision">\n                <div class="vision-gallery-n-details">\n                    <!--<div class="vision-tab">'+e.tab(s.newsVisionTabDbgData).outerHTML+'</div>-->\n                    <div class="separator"><h2>MB视野</h2><div class="separator-line"></div></div>\n                    <div class="vision-details">\n                        <ul>\n                            '+function(){for(var n="",t=0;t<s.newsVisionItemDbgData.length;t++)n+=e.visionItem(s.newsVisionItemDbgData[t]).outerHTML;return n}()+'\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </section>\n        <section>\n            <div class="hot">\n                '+e.hot(s.hotNewsDbgData).outerHTML+"\n                "+e.hot(s.hotTagsDbgData).outerHTML+"\n                "+e.hot(s.hotCoverDbgData).outerHTML+"\n            </div>\n        </section>\n    </div>",document.body.appendChild(i)}}});
//# sourceMappingURL=content.js.map

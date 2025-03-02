import{_ as n,o as a,c as l,a as p}from"./app.f9cf8683.js";const i=JSON.parse('{"title":"如何取消 Fetch 请求","description":"","frontmatter":{},"headers":[{"level":2,"title":"[译] 如何取消你的 Promise？","slug":"译-如何取消你的-promise","link":"#译-如何取消你的-promise","children":[]}],"relativePath":"fragment/fetch.md","lastUpdated":1740908463000}'),o={name:"fragment/fetch.md"};function e(c,s,r,t,B,y){return a(),l("div",null,s[0]||(s[0]=[p(`<h1 id="如何取消-fetch-请求" tabindex="-1">如何取消 Fetch 请求 <a class="header-anchor" href="#如何取消-fetch-请求" aria-hidden="true">#</a></h1><p>JavaScript 的 promise 一直是该语言的一大胜利——它们引发了异步编程的革命，极大地改善了 Web 性能。原生 promise 的一个缺点是，到目前为止，还没有可以取消 fetch 的真正方法。 JavaScript 规范中添加了新的 AbortController ，允许开发人员使用信号中止一个或多个 fetch 调用。 以下是取消 fetch 调用的工作流程：</p><ul><li>创建一个 AbortController 实例</li><li>该实例具有 signal 属性</li><li>将 signal 传递给 fetch option 的 signal</li><li>调用 AbortController 的 abort 属性来取消所有使用该信号的 fetch。</li></ul><p>以下是取消 Fetch 请求的基本步骤：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">controller</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">new</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">AbortController</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> { </span><span style="color:#E5C07B;">signal</span><span style="color:#ABB2BF;"> } </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">controller</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#61AFEF;">fetch</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;http://localhost:8000&quot;</span><span style="color:#ABB2BF;">, { </span><span style="color:#E06C75;">signal</span><span style="color:#ABB2BF;"> })</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">response</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`Request 1 is complete!\`</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">  })</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">catch</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">warn</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`Fetch 1 error: </span><span style="color:#C678DD;">\${</span><span style="color:#E5C07B;">e</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">message</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">\`</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// Abort request</span></span>
<span class="line"><span style="color:#E5C07B;">controller</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">abort</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">controller</span><span style="color:#B392F0;"> </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#F97583;">new</span><span style="color:#B392F0;"> AbortController();</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#B392F0;"> { </span><span style="color:#79B8FF;">signal</span><span style="color:#B392F0;"> } </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> controller;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">fetch(</span><span style="color:#FFAB70;">&quot;http://localhost:8000&quot;</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> { signal })</span></span>
<span class="line"><span style="color:#B392F0;">  .then((response) </span><span style="color:#F97583;">=&gt;</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">console</span><span style="color:#B392F0;">.log(</span><span style="color:#FFAB70;">\`Request 1 is complete!\`</span><span style="color:#B392F0;">);</span></span>
<span class="line"><span style="color:#B392F0;">  })</span></span>
<span class="line"><span style="color:#B392F0;">  .catch((e) </span><span style="color:#F97583;">=&gt;</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">console</span><span style="color:#B392F0;">.warn(</span><span style="color:#FFAB70;">\`Fetch 1 error: </span><span style="color:#F97583;">\${</span><span style="color:#79B8FF;">e</span><span style="color:#B392F0;">.message</span><span style="color:#F97583;">}</span><span style="color:#FFAB70;">\`</span><span style="color:#B392F0;">);</span></span>
<span class="line"><span style="color:#B392F0;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6B737C;">// Abort request</span></span>
<span class="line"><span style="color:#79B8FF;">controller</span><span style="color:#B392F0;">.abort();</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>在 abort 调用时发生 AbortError ，因此你可以通过比较错误名称来侦听 catch 中的中止操作。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#C678DD;">catch</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">e</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">===</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;AbortError&quot;</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#7F848E;font-style:italic;">// We know it&#39;s been canceled!</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">});</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#F97583;">catch</span><span style="color:#B392F0;">(e </span><span style="color:#F97583;">=&gt;</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#F97583;">if</span><span style="color:#B392F0;">(</span><span style="color:#79B8FF;">e</span><span style="color:#B392F0;">.name </span><span style="color:#F97583;">===</span><span style="color:#B392F0;"> </span><span style="color:#FFAB70;">&quot;AbortError&quot;</span><span style="color:#B392F0;">) {</span></span>
<span class="line"><span style="color:#B392F0;">        </span><span style="color:#6B737C;">// We know it&#39;s been canceled!</span></span>
<span class="line"><span style="color:#B392F0;">    }</span></span>
<span class="line"><span style="color:#B392F0;">});</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>将相同的信号传递给多个 fetch 调用将会取消该信号的所有请求：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">controller</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">new</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">AbortController</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> { </span><span style="color:#E5C07B;">signal</span><span style="color:#ABB2BF;"> } </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">controller</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#61AFEF;">fetch</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;http://localhost:8000&quot;</span><span style="color:#ABB2BF;">, { </span><span style="color:#E06C75;">signal</span><span style="color:#ABB2BF;"> })</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">response</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`Request 1 is complete!\`</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">  })</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">catch</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">warn</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`Fetch 1 error: </span><span style="color:#C678DD;">\${</span><span style="color:#E5C07B;">e</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">message</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">\`</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#61AFEF;">fetch</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;http://localhost:8000&quot;</span><span style="color:#ABB2BF;">, { </span><span style="color:#E06C75;">signal</span><span style="color:#ABB2BF;"> })</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">response</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`Request 2 is complete!\`</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">  })</span></span>
<span class="line"><span style="color:#ABB2BF;">  .</span><span style="color:#61AFEF;">catch</span><span style="color:#ABB2BF;">((</span><span style="color:#E06C75;font-style:italic;">e</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">warn</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`Fetch 2 error: </span><span style="color:#C678DD;">\${</span><span style="color:#E5C07B;">e</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">message</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">\`</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// Wait 2 seconds to abort both requests</span></span>
<span class="line"><span style="color:#61AFEF;">setTimeout</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">controller</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">abort</span><span style="color:#ABB2BF;">(), </span><span style="color:#D19A66;">2000</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">controller</span><span style="color:#B392F0;"> </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#F97583;">new</span><span style="color:#B392F0;"> AbortController();</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#B392F0;"> { </span><span style="color:#79B8FF;">signal</span><span style="color:#B392F0;"> } </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> controller;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">fetch(</span><span style="color:#FFAB70;">&quot;http://localhost:8000&quot;</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> { signal })</span></span>
<span class="line"><span style="color:#B392F0;">  .then((response) </span><span style="color:#F97583;">=&gt;</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">console</span><span style="color:#B392F0;">.log(</span><span style="color:#FFAB70;">\`Request 1 is complete!\`</span><span style="color:#B392F0;">);</span></span>
<span class="line"><span style="color:#B392F0;">  })</span></span>
<span class="line"><span style="color:#B392F0;">  .catch((e) </span><span style="color:#F97583;">=&gt;</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">console</span><span style="color:#B392F0;">.warn(</span><span style="color:#FFAB70;">\`Fetch 1 error: </span><span style="color:#F97583;">\${</span><span style="color:#79B8FF;">e</span><span style="color:#B392F0;">.message</span><span style="color:#F97583;">}</span><span style="color:#FFAB70;">\`</span><span style="color:#B392F0;">);</span></span>
<span class="line"><span style="color:#B392F0;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">fetch(</span><span style="color:#FFAB70;">&quot;http://localhost:8000&quot;</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> { signal })</span></span>
<span class="line"><span style="color:#B392F0;">  .then((response) </span><span style="color:#F97583;">=&gt;</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">console</span><span style="color:#B392F0;">.log(</span><span style="color:#FFAB70;">\`Request 2 is complete!\`</span><span style="color:#B392F0;">);</span></span>
<span class="line"><span style="color:#B392F0;">  })</span></span>
<span class="line"><span style="color:#B392F0;">  .catch((e) </span><span style="color:#F97583;">=&gt;</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#79B8FF;">console</span><span style="color:#B392F0;">.warn(</span><span style="color:#FFAB70;">\`Fetch 2 error: </span><span style="color:#F97583;">\${</span><span style="color:#79B8FF;">e</span><span style="color:#B392F0;">.message</span><span style="color:#F97583;">}</span><span style="color:#FFAB70;">\`</span><span style="color:#B392F0;">);</span></span>
<span class="line"><span style="color:#B392F0;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6B737C;">// Wait 2 seconds to abort both requests</span></span>
<span class="line"><span style="color:#B392F0;">setTimeout(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">controller</span><span style="color:#B392F0;">.abort()</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">2000</span><span style="color:#B392F0;">);</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>杰克·阿奇博尔德（Jack Archibald）在他的文章 <a href="https://developer.chrome.com/blog/abortable-fetch?hl=zh-cn" target="_blank" rel="noreferrer">Abortable fetch</a> 中，详细介绍了一个很好的应用，它能够用于创建可中止的 Fetch，而无需所有样板</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">abortableFetch</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">request</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">opts</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">controller</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">new</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">AbortController</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">signal</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">controller</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">signal</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#61AFEF;">abort</span><span style="color:#ABB2BF;">: () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">controller</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">abort</span><span style="color:#ABB2BF;">(),</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">ready</span><span style="color:#ABB2BF;">: </span><span style="color:#61AFEF;">fetch</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">request</span><span style="color:#ABB2BF;">, { ...</span><span style="color:#E06C75;">opts</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">signal</span><span style="color:#ABB2BF;"> }),</span></span>
<span class="line"><span style="color:#ABB2BF;">  };</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#B392F0;"> abortableFetch(request</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> opts) {</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#F97583;">const</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">controller</span><span style="color:#B392F0;"> </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#F97583;">new</span><span style="color:#B392F0;"> AbortController();</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#F97583;">const</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">signal</span><span style="color:#B392F0;"> </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">controller</span><span style="color:#B392F0;">.signal;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#F97583;">return</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    abort</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">controller</span><span style="color:#B392F0;">.abort()</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">    ready</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> fetch(request</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> { </span><span style="color:#F97583;">...</span><span style="color:#B392F0;">opts</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> signal })</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  };</span></span>
<span class="line"><span style="color:#B392F0;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>说实话，我对取消 Fetch 的方法并不感到兴奋。在理想的世界中，通过 Fetch 返回的 Promise 中的 .cancel() 会很酷，但是也会带来一些问题。无论如何，我为能够取消 Fetch 调用而感到高兴，你也应该如此！</p><h2 id="译-如何取消你的-promise" tabindex="-1"><a href="https://juejin.cn/post/6844903533393772557" target="_blank" rel="noreferrer">[译] 如何取消你的 Promise？</a> <a class="header-anchor" href="#译-如何取消你的-promise" aria-hidden="true">#</a></h2>`,13)]))}const A=n(o,[["render",e]]);export{i as __pageData,A as default};

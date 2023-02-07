import{_ as s,c as n,o as a,a as p}from"./app.8207ecbb.js";const b=JSON.parse('{"title":"显示器的成像原理","description":"","frontmatter":{},"headers":[],"relativePath":"html-css/principle.md","lastUpdated":1675256330000}'),l={name:"html-css/principle.md"},e=p(`<h1 id="显示器的成像原理" tabindex="-1">显示器的成像原理 <a class="header-anchor" href="#显示器的成像原理" aria-hidden="true">#</a></h1><p>空间混色法 rgb 实质上并排排列（验证）</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#D19A66;">.wrapper</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  display: </span><span style="color:#D19A66;">flex</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#D19A66;">.demo</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  width: </span><span style="color:#D19A66;">1</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  height: </span><span style="color:#D19A66;">10</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#D19A66;">.demo</span><span style="color:#56B6C2;">:nth-of-type</span><span style="color:#C678DD;">(</span><span style="color:#D19A66;">2n</span><span style="color:#C678DD;">)</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  background-color: </span><span style="color:#D19A66;">#f00</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#7F848E;font-style:italic;">/*蓝</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  .demo:nth-of-type(2n+1){</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  background-color: #00f;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  /*红*/</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#B392F0;">.wrapper {</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#79B8FF;">display</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">flex</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">}</span></span>
<span class="line"><span style="color:#B392F0;">.demo {</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#79B8FF;">width</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">1px</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#79B8FF;">height</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">10px</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">}</span></span>
<span class="line"><span style="color:#B392F0;">.demo:nth-of-type(</span><span style="color:#F8F8F8;">2n</span><span style="color:#B392F0;">) {</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">#f00</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#6B737C;">/*蓝</span></span>
<span class="line"><span style="color:#6B737C;">}</span></span>
<span class="line"><span style="color:#6B737C;">  .demo:nth-of-type(2n+1){</span></span>
<span class="line"><span style="color:#6B737C;">  background-color: #00f;</span></span>
<span class="line"><span style="color:#6B737C;">  /*红*/</span></span>
<span class="line"><span style="color:#B392F0;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>像素：---&gt;红绿蓝像点-----&gt;空间混色</p><p>最小的单位：像点。像素由 3 个像点构成。</p><p>空间混色法应用</p><p>crt 显示屏</p><p>lcd 液晶屏</p><p>点距：crt 显示屏求点距的方法的意义，是几乎所有屏幕都通用的</p><p>像素的大小：点距</p><p>物理像素：设备出厂时，像素的大小</p><p>dpi:1 英寸所能容纳的像素点数</p><p>1 英寸= 2.54cm</p><p>dpi 打印机在一英寸屏幕里面可以打印多少墨点</p><p>ppi 一英寸所能容纳的像素点数(点距数)</p><p>参照像素</p><p>96dpi 一臂之遥的视角去看，显示出的具体大小</p><p>标杆 1/96*英寸</p><p>css 像素=逻辑像素</p><p>设备像素比 dpr = 物理像素/css 像素</p><p>衡量屏幕好不好：不看分辨率（分辨率：固定宽高下，展示的像素点数）</p><p>看的是 dpi</p>`,22),o=[e];function c(r,t,i,y,B,F){return a(),n("div",null,o)}const m=s(l,[["render",c]]);export{b as __pageData,m as default};

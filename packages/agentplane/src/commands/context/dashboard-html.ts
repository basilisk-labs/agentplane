export function dashboardHtml(): string {
  return String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>AgentPlane Context Dashboard</title>
<style>
body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f7f7f4;color:#202124}
header{height:56px;display:flex;align-items:center;gap:16px;padding:0 20px;border-bottom:1px solid #d9d9d2;background:#fff}
main{display:grid;grid-template-columns:320px 1fr;height:calc(100vh - 57px)}
aside{border-right:1px solid #d9d9d2;padding:16px;overflow:auto;background:#fbfbf8}
#graph{position:relative;overflow:hidden;background:#f2f4f1}
.filters{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 16px}
.filters label{font-size:12px;border:1px solid #c8c8bf;background:#fff;border-radius:6px;padding:5px 7px}
.metric{display:grid;grid-template-columns:1fr auto;gap:8px;padding:8px 0;border-bottom:1px solid #e3e3dc;font-size:13px}
.node{position:absolute;border:1px solid #777;background:#fff;border-radius:6px;padding:6px 8px;font-size:12px;max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 1px 2px #0002}
.wiki_page{border-color:#2563eb}.entity{border-color:#7c3aed}.claim{border-color:#b45309}.source{border-color:#047857}.task{border-color:#be123c}.capability{border-color:#0891b2}
svg{position:absolute;inset:0;width:100%;height:100%}
button{border:1px solid #b8b8b0;background:#fff;border-radius:6px;padding:6px 8px}
</style>
</head>
<body>
<header><strong>AgentPlane Context Dashboard</strong><button id="fit">Fit</button><span id="status"></span></header>
<main><aside><h3>Layers</h3><div id="filters" class="filters"></div><h3>Metrics</h3><div id="metrics"></div><h3>Warnings</h3><div id="warnings"></div></aside><section id="graph"><svg id="edges"></svg></section></main>
<script>
const graphEl=document.getElementById('graph'), edgesEl=document.getElementById('edges');
let snapshot=null, enabledTypes=new Set();
function metric(k,v){return '<div class="metric"><span>'+k+'</span><strong>'+v+'</strong></div>'}
function layout(nodes,w,h){const r=Math.max(160,Math.min(w,h)/2-80),cx=w/2,cy=h/2;return nodes.map((n,i)=>({...n,x:cx+r*Math.cos(i/nodes.length*6.283),y:cy+r*Math.sin(i/nodes.length*6.283)}))}
function mountFilters(data){const types=[...new Set(data.nodes.map(n=>n.type))].sort();enabledTypes=new Set(types);document.getElementById('filters').innerHTML=types.map(t=>'<label><input type="checkbox" checked value="'+t+'"> '+t+'</label>').join('');document.getElementById('filters').addEventListener('change',()=>{enabledTypes=new Set([...document.querySelectorAll('#filters input:checked')].map(i=>i.value));draw(snapshot)})}
function draw(data){const visible=data.nodes.filter(n=>enabledTypes.has(n.type)), visibleIds=new Set(visible.map(n=>n.id)), visibleEdges=data.edges.filter(e=>visibleIds.has(e.from)&&visibleIds.has(e.to));document.getElementById('status').textContent=visible.length+' / '+data.nodes.length+' nodes, '+visibleEdges.length+' / '+data.edges.length+' edges';
document.getElementById('metrics').innerHTML=Object.entries(data.metrics).map(([k,v])=>typeof v==='object'?metric(k,JSON.stringify(v)):metric(k,v)).join('');
document.getElementById('warnings').textContent=data.warnings.slice(0,20).join('\\n');
const nodes=layout(visible.slice(0,500),graphEl.clientWidth,graphEl.clientHeight), byId=new Map(nodes.map(n=>[n.id,n]));
edgesEl.innerHTML=visibleEdges.slice(0,1200).map(e=>{const a=byId.get(e.from),b=byId.get(e.to);return a&&b?'<line x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+'" stroke="#8a8a82" stroke-width="1" />':''}).join('');
graphEl.querySelectorAll('.node').forEach(n=>n.remove());
for(const n of nodes){const el=document.createElement('div');el.className='node '+n.type;el.style.left=(n.x-40)+'px';el.style.top=(n.y-14)+'px';el.title=n.id;el.textContent=n.label;graphEl.appendChild(el)}
}
fetch('/api/graph').then(r=>r.json()).then(data=>{snapshot=data;mountFilters(data);draw(data)}).catch(e=>document.getElementById('status').textContent=String(e));
</script>
</body>
</html>`;
}

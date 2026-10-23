export const catalog = [
 {id:'k1',category:'Keyboard',name:'QuietKeys wired',price:1499,days:2,port:'A',wireless:false,merchant:'DeskWorks',note:'Quiet keys; USB-A cable. Demo specification.'},
 {id:'k2',category:'Keyboard',name:'QuietKeys wireless',price:2499,days:1,port:'BT',wireless:true,merchant:'DeskWorks',note:'Quiet keys; Bluetooth. Demo specification.'},
 {id:'c1',category:'Webcam',name:'ClearCam 1080',price:2299,days:2,port:'A',merchant:'DeskWorks',note:'1080p; USB-A. Demo specification.'},
 {id:'c2',category:'Webcam',name:'ClearCam 2K',price:3499,days:1,port:'C',merchant:'PixelSupply',note:'2K; USB-C. Demo specification.'},
 {id:'h1',category:'Hub',name:'Bridge C',price:1799,days:1,port:'C',outputs:3,merchant:'DeskWorks',note:'USB-C host, three USB-A outputs. Demo specification.'},
 {id:'h2',category:'Hub',name:'Bridge A',price:999,days:2,port:'A',outputs:3,merchant:'DeskWorks',note:'USB-A host, three USB-A outputs. Demo specification.'},
];
export function solve({budget,days,port,wireless,event}) {
 const live=catalog.map(p=>({...p,price:p.price+(event==='price'&&p.id==='k1'?800:0),days:p.days+(event==='late'&&p.id==='c1'?3:0)})).filter(p=>!(event==='stock'&&p.id==='h1'));
 const candidates=[];
 for(const k of live.filter(p=>p.category==='Keyboard'))for(const c of live.filter(p=>p.category==='Webcam'))for(const h of live.filter(p=>p.category==='Hub')){
  const items=[k,c,h];const shipping=new Set(items.map(p=>p.merchant)).size===1?99:199;const total=items.reduce((s,p)=>s+p.price,0)+shipping;const arrival=Math.max(...items.map(p=>p.days));
  const reasons=[];if(h.port!==port)reasons.push('Hub host port does not match your computer');if(c.port==='C'&&port!=='C')reasons.push('USB-C webcam cannot connect to this setup');if(wireless&&!k.wireless)reasons.push('Keyboard is not wireless');if(total>budget)reasons.push('Over total budget');if(arrival>days)reasons.push('Misses delivery deadline');
  candidates.push({id:items.map(p=>p.id).join('-'),number:1+(k.id==='k2'?4:0)+(c.id==='c2'?2:0)+(h.id==='h2'?1:0),items,shipping,total,arrival,reasons});
 }
 return {valid:candidates.filter(b=>b.reasons.length===0).sort((a,b)=>a.total-b.total),rejected:candidates.filter(b=>b.reasons.length>0)};
}

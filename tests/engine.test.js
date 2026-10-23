import test from 'node:test';
import assert from 'node:assert/strict';
import {catalog, solve} from '../src/engine.js';
const base = {budget:7000, days:3, port:'C', wireless:false, event:'none'};
test('default basket has the original delivered total', () => {
  const result=solve(base);
  assert.equal(result.valid[0].id,'k1-c1-h1');
  assert.equal(result.valid[0].total,5696);
  assert.equal(result.valid[0].shipping,99);
});
test('USB-C hub stock loss prevents a USB-C basket', () => {
  assert.equal(solve({...base,event:'stock'}).valid.length,0);
});
test('price and delivery changes modify only the intended items', () => {
  const price=solve({...base,event:'price'});
  assert.equal(price.valid.find(b=>b.id==='k1-c1-h1').total,6496);
  const late=solve({...base,event:'late'});
  assert.ok(late.rejected.some(b=>b.id==='k1-c1-h1'&&b.reasons.includes('Misses delivery deadline')));
  assert.equal(catalog.find(p=>p.id==='k1').price,1499);
  assert.equal(catalog.find(p=>p.id==='c1').days,2);
});
test('256 combinations preserve all hard constraints and ranking', () => {
  let scenarios=0;
  for(const budget of [3000,5700,7000,12000])
  for(const days of [1,2,3,7])
  for(const port of ['A','C'])
  for(const wireless of [false,true])
  for(const event of ['none','stock','price','late']) {
    scenarios++;
    const result=solve({budget,days,port,wireless,event});
    const all=[...result.valid,...result.rejected];
    assert.equal(all.length,event==='stock'?4:8);
    assert.equal(new Set(all.map(b=>b.id)).size,all.length);
    for(let i=0;i<result.valid.length;i++) {
      const b=result.valid[i];
      assert.equal(b.reasons.length,0);
      assert.ok(b.total<=budget);
      assert.ok(b.arrival<=days);
      assert.equal(b.items.find(p=>p.category==='Hub').port,port);
      assert.ok(!wireless||b.items.find(p=>p.category==='Keyboard').wireless);
      assert.ok(!b.items.some(p=>p.category==='Webcam'&&p.port==='C')||port==='C');
      assert.ok(event!=='stock'||!b.items.some(p=>p.id==='h1'));
      assert.equal(b.total,b.items.reduce((s,p)=>s+p.price,0)+b.shipping);
      assert.equal(b.arrival,Math.max(...b.items.map(p=>p.days)));
      if(i) assert.ok(b.total>=result.valid[i-1].total);
    }
    assert.ok(result.rejected.every(b=>b.reasons.length>0));
  }
  assert.equal(scenarios,256);
});

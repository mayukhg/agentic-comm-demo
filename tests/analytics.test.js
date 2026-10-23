import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
test('synthetic analytics fixture is segregated, complete and reconciles',async()=>{
 const events=JSON.parse(await readFile(new URL('../analytics/data/events.json',import.meta.url),'utf8'));
 const summary=JSON.parse(await readFile(new URL('../analytics/data/expected-summary.json',import.meta.url),'utf8'));
 assert.equal(events.length,1800);assert.equal(new Set(events.map(e=>e.properties.$insert_id)).size,1800);
 assert.ok(events.every(e=>e.properties.synthetic===true&&e.properties.environment==='synthetic'&&e.properties.ip===0));
 const c=events.filter(e=>e.event==='Synthetic Mission Costed');assert.equal(c.length,600);
 for(const e of c){const p=e.properties;assert.ok(Math.abs(p.total_cost_inr-p.inference_inr-p.tools_inr-p.support_inr-p.recovery_loss_inr-p.fixed_allocation_inr)<.00001)}
 assert.equal(c.filter(e=>e.properties.success).length,summary.successful_missions);
 assert.ok(Math.abs(c.reduce((s,e)=>s+e.properties.total_cost_inr,0)-summary.total_cost_inr)<.00001);
 for(const id of new Set(events.map(e=>e.properties.mission_id)))assert.equal(events.filter(e=>e.properties.mission_id===id).length,3);
});

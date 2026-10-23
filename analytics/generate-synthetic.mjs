// Fabricated analytics fixture. Never mix with real product measurements.
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const seed=20261023, dataset='missioncart-synthetic-v1';let state=seed;
const rand=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296};
const events=[];const start=Date.parse('2026-09-24T00:00:00Z')/1000;
for(let i=0;i<600;i++){
 const arm=['search','wizard','agent_hypothesis'][i%3];
 const mission=`synthetic-mission-${String(i+1).padStart(4,'0')}`;
 // Equal distributions by design: no fabricated agent uplift claim.
 const success=rand()<.72, recovery=rand()<.2, safeRefusal=!success&&rand()<.5;
 const duration=Math.round(90+rand()*600), support=rand()<.05;
 const inference=arm==='agent_hypothesis'?Number((1.5+rand()*4).toFixed(4)):0;
 const tools=arm==='agent_hypothesis'?Number((.1+rand()*.6).toFixed(4)):0;
 const supportCost=support?120:0, recoveryLoss=recovery?Number((rand()*8).toFixed(4)):0;
 // Fixed monthly allowance distributed over this 600-attempt synthetic fixture.
 const fixedAllocation=30, cost=Number((inference+tools+supportCost+recoveryLoss+fixedAllocation).toFixed(4));
 const time=start+Math.floor(i/20)*86400+(i%20)*1800;
 const common={distinct_id:`synthetic-user-${i%120+1}`,synthetic:true,environment:'synthetic',dataset_id:dataset,generator_seed:seed,mission_id:mission,arm,currency:'INR',ip:0};
 const add=(event,offset,props)=>events.push({event,properties:{...common,time:time+offset,$insert_id:createHash('sha256').update(dataset+mission+event).digest('hex').slice(0,32),...props}});
 add('Synthetic Mission Started',0,{});
 add('Synthetic Mission Evaluated',duration,{success,safe_refusal:safeRefusal,duration_seconds:duration,corrections:Math.floor(rand()*4),hard_constraint_violations:0,wrong_total:0,unauthorized_actions:0,review_stale:0,recovery_injected:recovery,recovery_correct:recovery?rand()<.95:null,trust_question_correct:rand()<.90});
 add('Synthetic Mission Costed',duration+1,{success,inference_inr:inference,tools_inr:tools,support_inr:supportCost,recovery_loss_inr:recoveryLoss,fixed_allocation_inr:fixedAllocation,total_cost_inr:cost,hypothetical_net_revenue_inr:success?30:0});
}
await mkdir(new URL('./data/',import.meta.url),{recursive:true});
await writeFile(new URL('./data/events.json',import.meta.url),JSON.stringify(events,null,2)+'\n');
const evals=events.filter(e=>e.event==='Synthetic Mission Evaluated'),costs=events.filter(e=>e.event==='Synthetic Mission Costed');
const success=evals.filter(e=>e.properties.success).length,total=costs.reduce((s,e)=>s+e.properties.total_cost_inr,0);
const summary={dataset_id:dataset,synthetic:true,seed,missions:600,events:events.length,successful_missions:success,success_rate:success/600,total_cost_inr:total,cost_per_attempt_inr:total/600,cost_per_success_inr:total/success,warning:'Fabricated fixture, not actual usage, tests, performance, market evidence or revenue. No treatment-effect claim.'};
await writeFile(new URL('./data/expected-summary.json',import.meta.url),JSON.stringify(summary,null,2)+'\n');console.log(summary);

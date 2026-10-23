// Dry-run by default. No credentials or project identifiers belong in source control.
import {readFile} from 'node:fs/promises';
const data=JSON.parse(await readFile(new URL('./data/events.json',import.meta.url),'utf8'));
if(!data.every(e=>e.properties.synthetic===true&&e.properties.environment==='synthetic'))throw Error('Refusing non-synthetic data');
if(new Set(data.map(e=>e.properties.$insert_id)).size!==data.length)throw Error('Duplicate insert IDs');
const send=process.argv.includes('--send');
if(!send){console.log(`Dry run: ${data.length} synthetic events validated. No network request made.`);process.exit(0)}
if(process.env.MIXPANEL_CONFIRM_SYNTHETIC_PROJECT!=='yes')throw Error('Confirm dedicated synthetic project via MIXPANEL_CONFIRM_SYNTHETIC_PROJECT=yes');
const region=process.env.MIXPANEL_REGION;
const host={US:'api.mixpanel.com',EU:'api-eu.mixpanel.com',IN:'api-in.mixpanel.com'}[region];
if(!host)throw Error('Set MIXPANEL_REGION to the verified project residency: US, EU or IN');
const token=process.env.MIXPANEL_PROJECT_TOKEN;if(!token)throw Error('Missing project token');
// Project-token basic authentication is documented by Mixpanel /import.
// Small sequential batches; no automatic retry. A 400 can partially ingest.
let imported=0;
for(let i=0;i<data.length;i+=500){
 const response=await fetch(`https://${host}/import?strict=1`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Basic '+Buffer.from(token+':').toString('base64')},body:JSON.stringify(data.slice(i,i+500))});
 const body=await response.json();
 if(!response.ok||body.status!=='OK'||body.num_records_imported!==Math.min(500,data.length-i))throw Error(`Stopped at batch ${i/500+1}; inspect Mixpanel import response and partial-ingestion count before retrying. HTTP ${response.status}, imported ${body.num_records_imported??'unknown'}`);
 imported+=body.num_records_imported;
}
console.log(`Imported ${imported} synthetic events. Verify project event counts before creating reports.`);

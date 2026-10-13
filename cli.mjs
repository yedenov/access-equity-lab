import fs from 'node:fs';
import path from 'node:path';
import {analyze} from './src/model.mjs';
const [input,output]=process.argv.slice(2);
if(!input){console.error('Usage: node cli.mjs INPUT.json [OUTPUT_DIRECTORY]');process.exit(1);}
try {
 const data=JSON.parse(fs.readFileSync(input,'utf8'));
 const result=analyze(data);
 const artifact={project:"access-equity-lab",dataStatus:path.resolve(input)===path.resolve('data/demo.json')?'SYNTHETIC DEMONSTRATION':'USER SUPPLIED — provenance not verified',input:data,result};
 const json=JSON.stringify(artifact,null,2)+'\n';
 if(output){fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'result.json'),json);const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');fs.writeFileSync(path.join(output,'report.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Access Equity Lab — report</title><style>body{font:17px/1.6 system-ui;margin:48px auto;padding:0 24px;max-width:960px;color:#143143;background:#f4f8fa}h1{font-size:42px;line-height:1.15}strong{color:#985400}pre{background:white;padding:24px;overflow:auto;border:1px solid #cbdde5;border-radius:12px}a{color:#006a83}</style><h1>Access Equity Lab</h1><strong>'+esc(artifact.dataStatus)+'</strong><p>Which candidate facility maximizes additional population coverage under a fixed straight-line distance threshold?</p><h2>Method and interpretation</h2><p>Weighted coverage counts residents within a Euclidean radius in a local projected coordinate system (kilometres). Every candidate is evaluated exhaustively, so the best one-facility addition is exact for this finite candidate set. Ties preserve input order. This is a geometric accessibility proxy: roads, terrain, opening hours, capacity and affordability are excluded. Do not interpret distances as walking times.</p><h2>Inputs and results</h2><pre>'+esc(json)+'</pre><p>Research prototype • no verified field impact • <a href="https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cdist.html">Method reference</a></p></html>');}
 process.stdout.write(json);
}catch(e){console.error('Analysis failed: '+e.message);process.exit(1);}

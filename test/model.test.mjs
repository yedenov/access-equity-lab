import test from 'node:test';
import assert from 'node:assert/strict';
import {analyze} from '../src/model.mjs';

const base={radiusKm:1,demand:[{id:'d',x:0,y:0,population:10}],facilities:[],candidates:[{id:'c',x:1,y:0}]};
test('boundary distance counts as covered',()=>assert.equal(analyze(base).coverageAfter,1));
test('existing coverage cannot be double counted',()=>assert.equal(analyze({...base,facilities:[{id:'f',x:0,y:0}]}).ranking[0].additionalPopulation,0));
test('population weighting selects optimum',()=>{const r=analyze({...base,demand:[...base.demand,{id:'e',x:10,y:0,population:90}],candidates:[...base.candidates,{id:'b',x:10,y:0}]});assert.equal(r.bestCandidate,'b');assert.equal(r.coverageAfter,0.9);});
test('invalid populations and coordinates rejected',()=>{assert.throws(()=>analyze({...base,demand:[{id:'x',x:0,y:0,population:-2}]}));assert.throws(()=>analyze({...base,radiusKm:0}));assert.throws(()=>analyze({...base,candidates:[{id:'c',x:NaN,y:0}]}));});
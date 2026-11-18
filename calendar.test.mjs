import test from 'node:test';
import assert from 'node:assert/strict';
import {invitation} from './calendar.mjs';
const e = {title:'Soup, salad; supper',place:'Garden',note:'First\r\nSecond '+ '🥗'.repeat(90),start:new Date('2027-03-01T17:00:00-07:00'),end:new Date('2027-03-01T19:00:00-07:00')};
test('exports UTC instants, escaped text and UTF-8-safe folded lines',()=>{
 const result=invitation(e,'demo',e.start);
 assert.ok(result.includes('DTSTART:20270302T000000Z\r\n'));
 assert.ok(result.includes('SUMMARY:Soup\\, salad\\; supper'));
 assert.ok(result.replaceAll('\r\n ','').includes('First\\nSecond '+ '🥗'.repeat(90)));
 assert.ok(result.split('\r\n').every(l=>Buffer.byteLength(l)<=75));
});
test('rejects inverted intervals and blank titles',()=>{
 assert.throws(()=>invitation({...e,end:e.start},'demo'));
 assert.throws(()=>invitation({...e,title:' '},'demo'));
});

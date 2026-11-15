import { describe, expect, it } from 'vitest';
import { validateInquiry, type Inquiry } from '@/lib/inquiry';
import { filterProjects } from '@/data/site';
const valid:Inquiry={name:'Test Client',email:'client@example.com',phone:'+92 300 1234567',projectType:'Finishing Works',message:'Interior finishing for my home.'};
describe('Inquiry requirements',()=>{
 it.each(['name','phone','projectType','message'] as const)('requires %s',field=>{expect(validateInquiry({...valid,[field]:''})[field]).toBeDefined();});
 it('requires a valid email address',()=>{expect(validateInquiry({...valid,email:'invalid-email'}).email).toBeDefined();expect(validateInquiry(valid).email).toBeUndefined();});
 it('accepts a complete valid inquiry',()=>{expect(validateInquiry(valid)).toEqual({});});
});
describe('Project categories',()=>{
 it.each(['Residential','Commercial','Construction','Finishing'])('filters %s independently',category=>{const result=filterProjects(category);expect(result).toHaveLength(1);expect(result[0]?.category).toBe(category);});
 it('shows all four concepts together',()=>{expect(filterProjects('All Projects')).toHaveLength(4);});
});

export type Inquiry = { name:string; email:string; phone:string; projectType:string; location?:string; message:string };
export function validateInquiry(values:Inquiry):Partial<Record<keyof Inquiry,string>> {
 const errors:Partial<Record<keyof Inquiry,string>> = {};
 if (!values.name.trim()) errors.name='Please enter your name.';
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email='Please enter a valid email address.';
 if (!values.phone.trim()) errors.phone='Please enter your phone number.';
 if (!values.projectType) errors.projectType='Please select a project type.';
 if (!values.message.trim()) errors.message='Please describe your project.';
 return errors;
}

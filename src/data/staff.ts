import ryanPhoto from '@assets/team/ryan-nguyen.webp';
import type { StaffMember } from '@/types';

/*
 * Add a headshot to an entry's `photo` field when one is available (currently only Ryan Nguyen has a photo);
 * StaffCard shows a placeholder otherwise.
 * Most staff use Unity Provisions email addresses. Wendy uses her YMCA address because she is an external mentor.
 */
export const staff: StaffMember[] = [
  { name: 'Ryan Nguyen', role: 'Founder & CEO', email: 'ryan.nguyen@unityprovisions.org', photo: ryanPhoto },
  { name: 'Alex Jamkatel', role: 'Chief Technology Officer', email: 'alex.jamkatel@unityprovisions.org' },
  { name: 'Vivian Pan', role: 'Branch Operations Director', email: 'vivian.pan@unityprovisions.org' },
  { name: 'Louis Dang', role: 'Executive Secretary', email: 'louis.dang@unityprovisions.org' },
  { name: 'Wendy Jamsri', role: 'Project Mentor & YMCA Regional Teen Director', email: 'wjamsri@ymcaboston.org' },
  { name: 'Alexander Lee', role: 'Chief Marketing Officer', email: 'alexander.lee@unityprovisions.org' },
  { name: 'Ananya Bhat', role: 'Director of Development', email: 'ananya.bhat@unityprovisions.org' },
  { name: 'Aditi Jaiswal', role: 'Director of People and Culture', email: 'aditi.jaiswal@unityprovisions.org' },
];
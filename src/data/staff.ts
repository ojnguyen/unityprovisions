import type { StaffMember } from '@/types';
import ryanPhoto from '@assets/team/ryan-nguyen.webp';

// Real Unity Provisions leadership roster — see project-roadmap.md §7
// for source. No real headshots supplied yet (§5 asset blocker), so
// `photo` is left unset for every entry below; StaffCard renders its
// placeholder avatar until real photos are in place — set `photo` on
// the relevant entry here once one is supplied, no component changes
// needed.
//
// Emails follow firstname.lastname@unityprovisions.org, except Wendy,
// who uses her YMCA email — she's a YMCA staff mentor supporting the
// org, not a Unity Provisions student leader in the same sense as the
// other seven.
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
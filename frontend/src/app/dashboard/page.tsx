"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, GraduationCap, Calendar, Wallet, UserCheck, 
  Cake, Clock, AlertTriangle, FileText, Image as ImageIcon, 
  HeartPulse, CheckCircle2, ArrowRight, TrendingUp, 
  Sparkles, CalendarCheck, Bus, Megaphone, ChevronRight,
  Shield, Check, PlusCircle, CreditCard, Activity, Star,
  BookOpen, Sliders, Award, PenTool
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

export default function DashboardOverview() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("Administrator");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        if (parsed?.firstName) {
          setUserName(`${parsed.firstName} ${parsed.lastName || ''}`.trim());
        }
        if (parsed?.role) {
          const r = typeof parsed.role === 'string' ? parsed.role : (parsed.role?.name || '');
          setUserRole(r);
        }
      } catch (e) {}
    }

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#0050CB]/20 border-t-[#0050CB] animate-spin" />
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading Dashboard...</p>
      </div>
    );
  }

  // ==========================================
  // PARENT PORTAL UI
  // ==========================================
  if (stats?.isParentPortal) {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        
        {/* Parent Portal Hero Banner */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#000E28] via-[#002772] to-[#0050CB] p-7 sm:p-10 border border-white/15 shadow-[0_20px_50px_rgba(0,14,40,0.15)] text-white">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-20 w-80 h-80 bg-[#38BDF8]/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#38BDF8] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span>Parent Access Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Welcome, {userName}!
              </h1>
              <p className="text-blue-100/90 text-xs sm:text-sm max-w-xl leading-relaxed">
                Stay connected with your child's daily learning milestones, attendance records, and academic progress at E.A.S. Academy.
              </p>
            </div>

            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF690C] hover:bg-[#FF7E2E] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#FF690C]/30 transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <span>{t('cta.apply', 'Apply for Admission')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {stats.error ? (
          <div className="bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 p-6 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-xs font-medium">
            {stats.error} Please contact the school administration to link your child to this account.
          </div>
        ) : (
          <>
            {/* My Children Overview Cards */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-4 rounded-full bg-[#0050CB]" />
                <h2 className="text-lg font-black text-[#000E28] dark:text-white tracking-tight">
                  Enrolled Students
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.myChildren?.map((child: any) => (
                  <div 
                    key={child._id} 
                    className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#000E28] via-[#002772] to-[#0050CB] p-6 text-white border border-white/10 shadow-[0_15px_35px_rgba(0,14,40,0.12)] group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#38BDF8]/20 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center space-x-4 relative z-10">
                      <div className="h-16 w-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl font-black border-2 border-white/30 text-white shadow-inner">
                        {child.firstName[0]}
                      </div>
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] text-[10px] font-extrabold uppercase tracking-wider mb-1">
                          Class {child.className}
                        </span>
                        <h3 className="text-xl font-black text-white">{child.firstName} {child.lastName}</h3>
                        <p className="text-blue-100 text-xs font-medium">Section {child.section}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-end border-t border-white/15 pt-4 relative z-10">
                      <div>
                        <p className="text-[10px] text-blue-200 uppercase tracking-widest font-extrabold">Admission No.</p>
                        <p className="font-bold text-sm text-white tracking-wide">{child.admissionNumber}</p>
                      </div>
                      <div>
                        <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          Active Student
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities and Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Cols: Daily Activity & Gallery */}
              <div className="space-y-8 lg:col-span-2">
                
                {/* Daily Activity / Daycare */}
                <div className="bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 flex items-center justify-center text-[#0050CB] dark:text-[#38BDF8]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-[#000E28] dark:text-white tracking-tight">Recent Daily Activity</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Live check-ins, meals, and nap logs</p>
                      </div>
                    </div>
                  </div>

                  {stats.recentDaycareLogs?.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 italic text-xs">No recent activity logs found.</p>
                  ) : (
                    <div className="space-y-3">
                      {stats.recentDaycareLogs?.map((log: any) => (
                        <div key={log._id} className="bg-slate-50 dark:bg-[#000E28]/60 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 transition-colors">
                          <div className="flex justify-between items-center mb-2 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                            <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                              {new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </span>
                            <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
                              In: {log.checkInTime || '-'} • Out: {log.checkOutTime || '-'}
                            </div>
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                            {log.foodTracking && <p><span className="font-bold text-slate-400">Meal:</span> {log.foodTracking}</p>}
                            {log.sleepTracking && <p><span className="font-bold text-slate-400">Rest:</span> {log.sleepTracking}</p>}
                            {log.notes && <p><span className="font-bold text-slate-400">Notes:</span> {log.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Latest Gallery Albums */}
                <div className="bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#FFF3EB] dark:bg-[#FF690C]/20 flex items-center justify-center text-[#FF690C]">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-[#000E28] dark:text-white tracking-tight">Campus Gallery</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Recent classroom photos and events</p>
                      </div>
                    </div>
                  </div>

                  {stats.recentAlbums?.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 italic text-xs">No recent albums available.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {stats.recentAlbums?.map((album: any) => (
                        <div key={album._id} className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden group bg-slate-50 dark:bg-[#000E28]/60">
                          <div className="h-36 bg-slate-100 dark:bg-slate-800 relative">
                            {album.mediaUrls && album.mediaUrls.length > 0 ? (
                              <img src={album.mediaUrls[0]} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <ImageIcon className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                          <div className="p-3.5">
                            <h4 className="font-bold text-xs sm:text-sm text-[#000E28] dark:text-white truncate">{album.title}</h4>
                            <p className="text-[11px] text-slate-400 font-medium mt-1">{new Date(album.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Right Col: Fees & Events */}
              <div className="space-y-8">
                
                {/* Fee Status Card */}
                <div className="bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 flex items-center justify-center text-[#0050CB] dark:text-[#38BDF8]">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#000E28] dark:text-white tracking-tight">Fee Status</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Statements & reminders</p>
                    </div>
                  </div>

                  {stats.feesDue?.length === 0 ? (
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>All student tuition fees are fully cleared!</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stats.feesDue?.map((fee: any) => (
                        <div key={fee._id} className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-100 dark:border-rose-900/50">
                          <p className="font-bold text-xs text-[#000E28] dark:text-white">{fee.feeType}</p>
                          <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mt-0.5">
                            Due: {new Date(fee.dueDate).toLocaleDateString()}
                          </p>
                          <div className="mt-3 flex justify-between items-center">
                            <p className="font-black text-[#000E28] dark:text-white text-base">
                              ₹{(fee.totalAmount - fee.amountPaid).toLocaleString()}
                            </p>
                            <button className="bg-[#0050CB] hover:bg-[#0041A8] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all shadow-xs cursor-pointer">
                              Pay Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Upcoming Events */}
                <div className="bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 flex items-center justify-center text-[#0050CB] dark:text-[#38BDF8]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#000E28] dark:text-white tracking-tight">School Calendar</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Events & holidays</p>
                    </div>
                  </div>

                  {stats.upcomingEvents?.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 italic text-xs">No upcoming events scheduled.</p>
                  ) : (
                    <div className="space-y-3.5">
                      {stats.upcomingEvents?.map((event: any) => (
                        <div key={event._id} className="flex space-x-3.5 items-start">
                          <div className="flex flex-col items-center justify-center bg-[#E5EEFF] dark:bg-[#0050CB]/25 w-12 h-12 rounded-xl border border-blue-200/60 dark:border-[#0050CB]/40 shrink-0">
                            <span className="text-[10px] font-black text-[#0050CB] dark:text-[#38BDF8] uppercase">
                              {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                            <span className="text-base font-black text-[#000E28] dark:text-white leading-none">
                              {new Date(event.date).getDate()}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-xs text-[#000E28] dark:text-white leading-tight">{event.title}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{event.description || 'Campus Event'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </>
        )}
      </div>
    );
  }

  // ==========================================
  // TEACHER DASHBOARD UI
  // ==========================================
  const isTeacher = userRole.toLowerCase() === 'teacher' || stats?.isTeacherDashboard;
  if (isTeacher) {
    const teacherStudentsCount = stats?.totalStudents || 28;
    const attSummary = stats?.attendanceSummary || { present: 26, absent: 2, total: 28, rate: 93 };
    const lessonPlansList = stats?.lessonPlans && stats.lessonPlans.length > 0 ? stats.lessonPlans : [
      { _id: 'lp-1', topic: 'Quadratic Equations & Graphs', subject: 'Mathematics', className: 'Grade 5-A', status: 'Started', durationMinutes: 50 },
      { _id: 'lp-2', topic: 'Cell Structure & Organelles', subject: 'Science', className: 'Grade 5-A', status: 'Planned', durationMinutes: 45 },
      { _id: 'lp-3', topic: 'Shakespearean Sonnets Analysis', subject: 'English', className: 'Grade 6-B', status: 'Planned', durationMinutes: 45 },
    ];
    const assessmentsList = stats?.assessments && stats.assessments.length > 0 ? stats.assessments : [
      { _id: 'as-1', childId: { firstName: 'Sammy', lastName: 'Student', grade: 'Grade 5-A' }, term: 'Term 1', rubrics: [{ category: 'Cognitive', skill: 'Problem Solving', score: 'Mastered' }], teacherComments: 'Consistent excellence and active classroom participation.' },
      { _id: 'as-2', childId: { firstName: 'Leo', lastName: 'Miller', grade: 'Grade 5-A' }, term: 'Term 1', rubrics: [{ category: 'Social', skill: 'Collaboration', score: 'Developing' }], teacherComments: 'Showing great improvement in peer group activities.' }
    ];
    const scheduleList = stats?.todaySchedule && stats.todaySchedule.length > 0 ? stats.todaySchedule : [
      { period: 'Period 1', time: '08:30 AM - 09:20 AM', subject: 'Mathematics', grade: 'Grade 5-A', room: 'Room 204', status: 'Completed' },
      { period: 'Period 2', time: '09:25 AM - 10:15 AM', subject: 'Science & Lab', grade: 'Grade 5-A', room: 'Physics Lab B', status: 'Ongoing' },
      { period: 'Period 3', time: '10:35 AM - 11:25 AM', subject: 'English Literature', grade: 'Grade 6-B', room: 'Room 206', status: 'Upcoming' },
      { period: 'Period 4', time: '11:30 AM - 12:20 PM', subject: 'Doubt Clearing & Mentorship', grade: 'Grade 5-A', room: 'Library Pod 2', status: 'Upcoming' },
    ];
    const examsList = stats?.upcomingExams && stats.upcomingExams.length > 0 ? stats.upcomingExams : [
      { _id: 'ex-1', title: 'Mid-Term Mathematics Assessment', subject: 'Mathematics', totalMarks: 50, duration: 60, status: 'Scheduled' },
      { _id: 'ex-2', title: 'Science Unit 3 Formative Quiz', subject: 'Science', totalMarks: 25, duration: 30, status: 'Published' }
    ];
    const eventsList = stats?.upcomingEvents && stats.upcomingEvents.length > 0 ? stats.upcomingEvents : [
      { _id: 'ev-1', title: 'Science Fair & Exhibition 2026', date: new Date(Date.now() + 3 * 86400000), description: 'Campus main auditorium' },
      { _id: 'ev-2', title: 'Parent-Teacher Interaction Meeting', date: new Date(Date.now() + 7 * 86400000), description: 'Grade 5 & 6 classrooms' },
    ];
    const birthdaysList = stats?.birthdays || [];

    return (
      <div className="space-y-8 page-entrance font-sans">
        {/* ========================================================
            1. TEACHER HERO WELCOME BANNER
        ======================================================== */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] bg-gradient-to-r from-[#000E28] via-[#0B1F3A] to-[#0050CB] p-7 sm:p-9 border border-white/15 shadow-[0_20px_50px_rgba(0,14,40,0.25)] text-white">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF690C]/50 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-20 w-80 h-80 bg-[#38BDF8]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-16 w-60 h-60 bg-[#0050CB]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#38BDF8] text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#12B76A] shadow-[0_0_8px_#12B76A] animate-pulse" />
                <span>Teacher Academic Portal • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                <span>Welcome Back, {userName}!</span>
                <span className="text-2xl inline-block">👋</span>
              </h1>

              <p className="text-blue-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
                Here is your daily classroom dashboard: track live student attendance, view scheduled periods, update lesson plans, and record student learning outcomes.
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/dashboard/attendance"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF690C] hover:bg-[#E55A00] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#FF690C]/30 hover:scale-105 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Mark Attendance</span>
              </Link>
              <Link
                href="/dashboard/classroom"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold hover:scale-105 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Digital Classroom</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. TEACHER 4 KEY TELEMETRY METRIC CARDS
        ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: My Students */}
          <div className="bg-white dark:bg-[#001438] p-5 rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 flex items-center justify-center text-[#0050CB] dark:text-[#38BDF8]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#0050CB] dark:text-[#38BDF8] border border-blue-200/60 dark:border-blue-900/60">
                Class 5-A & 6-B
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Assigned Students</p>
            <div className="text-2xl font-black text-[#000E28] dark:text-white mt-1">
              <AnimatedNumber to={teacherStudentsCount} />
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <span>●</span> Active Enrolled Learners
            </p>
          </div>

          {/* Card 2: Today's Attendance Rate */}
          <div className="bg-white dark:bg-[#001438] p-5 rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/60">
                Today
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Class Attendance Rate</p>
            <div className="text-2xl font-black text-[#000E28] dark:text-white mt-1">
              {attSummary.rate}%
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{attSummary.present} Present</span> • {attSummary.absent} Absent
            </p>
          </div>

          {/* Card 3: Active Lesson Plans */}
          <div className="bg-white dark:bg-[#001438] p-5 rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-[#FF690C]">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-[#FF690C] border border-amber-200/60 dark:border-amber-900/60">
                This Week
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Lesson Plans Active</p>
            <div className="text-2xl font-black text-[#000E28] dark:text-white mt-1">
              <AnimatedNumber to={lessonPlansList.length} />
            </div>
            <p className="text-[11px] text-[#FF690C] font-semibold mt-1">
              Structured Curriculum Units
            </p>
          </div>

          {/* Card 4: Upcoming Exams */}
          <div className="bg-white dark:bg-[#001438] p-5 rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-900/60">
                Term 1
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Evaluations Scheduled</p>
            <div className="text-2xl font-black text-[#000E28] dark:text-white mt-1">
              <AnimatedNumber to={examsList.length} />
            </div>
            <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-1">
              Formative & Mid-Term Exams
            </p>
          </div>
        </div>

        {/* ========================================================
            3. TEACHER QUICK CLASSROOM ACTION SHORTCUTS
        ======================================================== */}
        <div className="bg-white dark:bg-[#001438] p-6 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-[#000E28] dark:text-white">Classroom Shortcuts</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Quick access to essential teaching and grading workflows</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0050CB] dark:text-[#38BDF8] bg-[#E5EEFF] dark:bg-[#0050CB]/25 px-2.5 py-1 rounded-full">
              Teacher Toolkit
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            <Link
              href="/dashboard/attendance"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-[#0050CB]/40 hover:bg-[#E5EEFF]/40 dark:hover:bg-[#0050CB]/15 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E5EEFF] dark:bg-[#0050CB]/30 flex items-center justify-center text-[#0050CB] dark:text-[#38BDF8] mb-1.5 group-hover:scale-110 transition-transform">
                <UserCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#000E28] dark:text-white group-hover:text-[#0050CB] leading-tight">Attendance</span>
            </Link>

            <Link
              href="/dashboard/classroom"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-[#0050CB]/40 hover:bg-[#E5EEFF]/40 dark:hover:bg-[#0050CB]/15 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1.5 group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#000E28] dark:text-white group-hover:text-[#0050CB] leading-tight">Classroom</span>
            </Link>

            <Link
              href="/dashboard/daily-activity"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-[#0050CB]/40 hover:bg-[#E5EEFF]/40 dark:hover:bg-[#0050CB]/15 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-[#FF690C] mb-1.5 group-hover:scale-110 transition-transform">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#000E28] dark:text-white group-hover:text-[#FF690C] leading-tight">Daily Diary</span>
            </Link>

            <Link
              href="/dashboard/lesson-planner"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-[#0050CB]/40 hover:bg-[#E5EEFF]/40 dark:hover:bg-[#0050CB]/15 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-1.5 group-hover:scale-110 transition-transform">
                <Sliders className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#000E28] dark:text-white group-hover:text-purple-600 leading-tight">Lesson Plan</span>
            </Link>

            <Link
              href="/dashboard/assessments"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-[#0050CB]/40 hover:bg-[#E5EEFF]/40 dark:hover:bg-[#0050CB]/15 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#000E28] dark:text-white group-hover:text-emerald-600 leading-tight">Assessments</span>
            </Link>

            <Link
              href="/dashboard/online-exams"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-[#0050CB]/40 hover:bg-[#E5EEFF]/40 dark:hover:bg-[#0050CB]/15 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#000E28] dark:text-white group-hover:text-cyan-600 leading-tight">Exams</span>
            </Link>

            <Link
              href="/dashboard/seating-plan"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-[#0050CB]/40 hover:bg-[#E5EEFF]/40 dark:hover:bg-[#0050CB]/15 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-1.5 group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#000E28] dark:text-white group-hover:text-indigo-600 leading-tight">Seating Plan</span>
            </Link>

            <Link
              href="/dashboard/paper-generator"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 hover:border-[#0050CB]/40 hover:bg-[#E5EEFF]/40 dark:hover:bg-[#0050CB]/15 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-1.5 group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#000E28] dark:text-white group-hover:text-rose-600 leading-tight">Paper Gen</span>
            </Link>
          </div>
        </div>

        {/* ========================================================
            4. TWO-COLUMN MAIN CONTENT: SCHEDULE, LESSONS, ASSESSMENTS vs EVENTS
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT 8 COLUMNS: Schedule, Lessons, Assessments */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Today's Class Schedule & Timetable */}
            <div className="bg-white dark:bg-[#001438] p-6 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 flex items-center justify-center text-[#0050CB] dark:text-[#38BDF8]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#000E28] dark:text-white">Today's Class Schedule</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Timetable routine for your assigned periods</p>
                  </div>
                </div>
                <Link
                  href="/dashboard/calendar"
                  className="text-xs font-bold text-[#0050CB] dark:text-[#38BDF8] hover:underline flex items-center gap-1"
                >
                  <span>Full Calendar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {scheduleList.map((item: any, idx: number) => {
                  const isOngoing = item.status === 'Ongoing';
                  const isCompleted = item.status === 'Completed';

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                        isOngoing
                          ? 'bg-[#E5EEFF]/60 dark:bg-[#0050CB]/20 border-[#0050CB]/40'
                          : isCompleted
                          ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800'
                          : 'bg-white dark:bg-[#001438] border-slate-200/80 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`px-2.5 py-1 rounded-xl text-xs font-black shrink-0 ${
                          isOngoing
                            ? 'bg-[#0050CB] text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {item.period}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-[#000E28] dark:text-white flex items-center gap-2">
                            <span>{item.subject}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {item.grade}
                            </span>
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                            {item.time} • <span className="font-semibold">{item.room}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isOngoing
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 animate-pulse'
                            : isCompleted
                            ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            : 'bg-blue-50 text-[#0050CB] dark:bg-blue-950/50 dark:text-[#38BDF8]'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Lesson Plans */}
            <div className="bg-white dark:bg-[#001438] p-6 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-[#FF690C]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#000E28] dark:text-white">Active Lesson Plans</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Current instructional units and learning goals</p>
                  </div>
                </div>
                <Link
                  href="/dashboard/lesson-planner"
                  className="text-xs font-bold text-[#0050CB] dark:text-[#38BDF8] hover:underline flex items-center gap-1"
                >
                  <span>Manage Plans</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lessonPlansList.map((plan: any) => (
                  <div
                    key={plan._id}
                    className="p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#E5EEFF] dark:bg-[#0050CB]/30 text-[#0050CB] dark:text-[#38BDF8]">
                          {plan.subject}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          plan.status === 'Started'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {plan.status}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-[#000E28] dark:text-white line-clamp-1">
                        {plan.topic}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Class: <span className="font-semibold text-slate-700 dark:text-slate-300">{plan.className}</span> • {plan.durationMinutes || 45} mins
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">Structured Curriculum</span>
                      <Link
                        href="/dashboard/lesson-planner"
                        className="font-bold text-[#0050CB] dark:text-[#38BDF8] hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Student Assessments & Rubrics */}
            <div className="bg-white dark:bg-[#001438] p-6 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#000E28] dark:text-white">Recent Student Assessments</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Formative rubrics and academic observations</p>
                  </div>
                </div>
                <Link
                  href="/dashboard/assessments"
                  className="text-xs font-bold text-[#0050CB] dark:text-[#38BDF8] hover:underline flex items-center gap-1"
                >
                  <span>All Assessments</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {assessmentsList.map((as: any) => {
                  const studentName = as.childId ? `${as.childId.firstName} ${as.childId.lastName || ''}`.trim() : 'Enrolled Student';
                  const primaryRubric = as.rubrics && as.rubrics.length > 0 ? as.rubrics[0] : null;

                  return (
                    <div
                      key={as._id}
                      className="p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#001438] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E5EEFF] dark:bg-[#0050CB]/30 text-[#0050CB] dark:text-[#38BDF8] flex items-center justify-center font-bold text-xs shrink-0">
                          {studentName[0]}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-[#000E28] dark:text-white">
                            {studentName}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {as.term || 'Term 1'} • {primaryRubric ? `${primaryRubric.category}: ${primaryRubric.skill}` : 'General Evaluation'}
                          </p>
                          {as.teacherComments && (
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 italic mt-1 font-normal">
                              "{as.teacherComments}"
                            </p>
                          )}
                        </div>
                      </div>

                      {primaryRubric && (
                        <div className="self-start sm:self-auto">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            primaryRubric.score === 'Mastered'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : primaryRubric.score === 'Developing'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          }`}>
                            {primaryRubric.score}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: Exams, Birthdays, Events */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Upcoming Exams Card */}
            <div className="bg-white dark:bg-[#001438] p-6 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#000E28] dark:text-white">Upcoming Exams</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Online & offline tests</p>
                </div>
              </div>

              <div className="space-y-3">
                {examsList.map((exam: any) => (
                  <div
                    key={exam._id}
                    className="p-3.5 rounded-2xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/20"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-300 tracking-wider">
                        {exam.subject || 'Class Subject'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200/60 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200">
                        {exam.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-[#000E28] dark:text-white">
                      {exam.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                      Max Marks: {exam.totalMarks || 50} • {exam.duration || 60} mins
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link
                  href="/dashboard/online-exams"
                  className="text-xs font-bold text-[#0050CB] dark:text-[#38BDF8] hover:underline"
                >
                  Manage Exam Schedules →
                </Link>
              </div>
            </div>

            {/* Classroom Birthdays this month */}
            <div className="bg-white dark:bg-[#001438] p-6 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500">
                  <Cake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#000E28] dark:text-white">Class Birthdays</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Celebrations this month</p>
                </div>
              </div>

              {birthdaysList.length === 0 ? (
                <div className="text-center py-4 text-slate-400 dark:text-slate-500 text-xs italic">
                  No upcoming student birthdays this month.
                </div>
              ) : (
                <div className="space-y-3">
                  {birthdaysList.map((b: any) => (
                    <div
                      key={b._id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🎂</span>
                        <div>
                          <p className="text-xs font-black text-[#000E28] dark:text-white">{b.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{b.grade || 'Class 5-A'}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#0050CB] dark:text-[#38BDF8]">
                        {new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* School Events & Calendar */}
            <div className="bg-white dark:bg-[#001438] p-6 rounded-[28px] border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 flex items-center justify-center text-[#0050CB] dark:text-[#38BDF8]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#000E28] dark:text-white">Campus Notices</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Upcoming school activities</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {eventsList.map((ev: any) => (
                  <div key={ev._id} className="flex space-x-3 items-start">
                    <div className="flex flex-col items-center justify-center bg-[#E5EEFF] dark:bg-[#0050CB]/25 w-11 h-11 rounded-xl border border-blue-200/60 dark:border-[#0050CB]/40 shrink-0">
                      <span className="text-[9px] font-black text-[#0050CB] dark:text-[#38BDF8] uppercase">
                        {new Date(ev.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-sm font-black text-[#000E28] dark:text-white leading-none">
                        {new Date(ev.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#000E28] dark:text-white leading-tight">{ev.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{ev.description || 'Campus Academic Event'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // STAFF & ADMIN DASHBOARD UI
  // ==========================================
  const totalStudents = stats?.totalStudents || 0;
  const studentsPresent = stats?.attendanceSummary?.studentsPresent || 0;
  const attendanceRate = totalStudents > 0 ? Math.round((studentsPresent / totalStudents) * 100) : 96;

  return (
    <div className="space-y-8 page-entrance">
      
      {/* ========================================================
          1. HERO WELCOME BANNER (SYNCHRONIZED TO HOMEPAGE BANNER)
      ======================================================== */}
      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] bg-gradient-to-r from-[#07152F] via-[#0B1F3A] to-[#0757D5] p-7 sm:p-9 border border-white/15 shadow-[0_20px_50px_rgba(7,21,47,0.25)] text-white">
        
        {/* Subtle glass reflection highlight along top border */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent pointer-events-none" />

        {/* Ambient atmospheric lighting orb */}
        <div className="absolute -top-24 -right-20 w-80 h-80 bg-[#2F80ED]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-16 w-60 h-60 bg-[#0757D5]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left Text */}
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#2F80ED] text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#12B76A] shadow-[0_0_8px_#12B76A] animate-pulse" />
              <span>{t('stats.badge', 'Global International Platform')} • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Good morning, <span className="text-[#2F80ED] bg-clip-text text-transparent bg-gradient-to-r from-[#2F80ED] via-sky-300 to-white">{userName}</span> 👋
            </h2>

            <p className="text-blue-100/90 text-xs sm:text-sm font-normal leading-relaxed">
              Real-time administrative operations, automated student attendance, fee collections, and institutional insights in one unified workspace.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/dashboard/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0757D5] to-[#1469E8] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#0757D5]/30 btn-interactive transition-all duration-200 border border-white/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('cta.apply', 'Admissions')}</span>
            </Link>

            <Link
              href="/dashboard/attendance"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-bold text-xs sm:text-sm shadow-sm btn-interactive transition-all duration-200"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t('card.attendance', 'Attendance')}</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ========================================================
          2. 4 MAIN KPI CARDS (BALANCED 4-COLUMN GRID)
      ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: Total Students */}
        <div className="group relative bg-white dark:bg-[#07152F] rounded-[28px] p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover-card-elevation flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E5EEFF] dark:bg-[#0757D5]/20 text-[#0757D5] dark:text-[#2F80ED] flex items-center justify-center shadow-xs">
                <Users className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#E5EEFF] dark:bg-[#0757D5]/20 text-[#0757D5] dark:text-[#2F80ED]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0757D5] dark:bg-[#2F80ED]" />
                Active Records
              </span>
            </div>

            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t('card.activeStudents', 'Total Students')}
            </p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl sm:text-4xl font-black text-[#07152F] dark:text-white tracking-tight">
                <AnimatedNumber to={totalStudents} />
              </h3>
              <span className="text-xs font-bold text-[#12B76A] dark:text-[#12B76A] inline-flex items-center gap-0.5 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                ↑ 12% MoM
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Verified Enrolled</span>
            <span className="font-bold text-[#0757D5] dark:text-[#2F80ED]">100% Online</span>
          </div>
        </div>

        {/* KPI 2: Today's Attendance */}
        <div className="group relative bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,14,40,0.04)] hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                <UserCheck className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>

            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t('stats.m1_title', 'Attendance Today')}
            </p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl sm:text-4xl font-black text-[#000E28] dark:text-white tracking-tight">
                <AnimatedNumber to={attendanceRate} suffix="%" decimals={1} />
              </h3>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                {studentsPresent} Present
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Biometric Logs</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Automated</span>
          </div>
        </div>

        {/* KPI 3: Pending Enquiries / Admissions */}
        <div className="group relative bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,14,40,0.04)] hover:border-[#FF690C]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3EB] dark:bg-[#FF690C]/20 text-[#FF690C] flex items-center justify-center shadow-xs">
                <Clock className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#FFF3EB] dark:bg-[#FF690C]/20 text-[#FF690C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF690C]" />
                Requires Review
              </span>
            </div>

            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Pending Enquiries
            </p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl sm:text-4xl font-black text-[#000E28] dark:text-white tracking-tight">
                <AnimatedNumber to={stats?.pendingAdmissions || 0} />
              </h3>
              <Link href="/dashboard/admissions" className="text-xs font-bold text-[#FF690C] hover:underline flex items-center gap-0.5 bg-[#FFF3EB] dark:bg-[#FF690C]/20 px-2.5 py-0.5 rounded-full btn-interactive">
                Review <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Approved This Term</span>
            <span className="font-bold text-[#0050CB] dark:text-[#38BDF8]">{stats?.newAdmissions || 0} Students</span>
          </div>
        </div>

        {/* KPI 4: Fees Collected */}
        <div className="group relative bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,14,40,0.04)] hover:border-[#0050CB]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 text-[#0050CB] dark:text-[#38BDF8] flex items-center justify-center shadow-xs">
                <Wallet className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#E5EEFF] dark:bg-[#0050CB]/20 text-[#0050CB] dark:text-[#38BDF8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0050CB] dark:bg-[#38BDF8]" />
                {t('stats.m2_badge', 'Automated')}
              </span>
            </div>

            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t('stats.m2_title', 'Fees Collected')}
            </p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl sm:text-4xl font-black text-[#000E28] dark:text-white tracking-tight">
                <AnimatedNumber to={stats?.feeCollectionSummary || 0} prefix="₹" />
              </h3>
              <span className="text-xs font-bold text-[#0050CB] dark:text-[#38BDF8] bg-[#E5EEFF] dark:bg-[#0050CB]/20 px-2.5 py-0.5 rounded-full">
                This Term
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Online Invoicing</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Auto Receipts</span>
          </div>
        </div>

      </div>

      {/* ========================================================
          3. BENTO ROW 1: ATTENDANCE ANALYTICS (7 COLS) & CALENDAR EVENTS (5 COLS)
      ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Attendance Breakdown Card */}
        <div className="lg:col-span-7 bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,14,40,0.04)] flex flex-col justify-between h-full">
          <div>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 flex items-center justify-center text-[#0050CB] dark:text-[#38BDF8] shadow-xs">
                  <UserCheck className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#000E28] dark:text-white tracking-tight">
                    {t('card.attendance', 'Attendance & Campus Presence')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Live biometric classroom synchronization
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/attendance"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0050CB] hover:bg-[#0041A8] text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Mark Attendance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Content: Circular Donut Gauge + Details */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
              
              {/* Circular Gauge */}
              <div className="sm:col-span-5 flex items-center justify-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#0050CB] dark:text-[#38BDF8]"
                      strokeDasharray={`${attendanceRate}, 100`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-[#000E28] dark:text-white leading-none">
                      {attendanceRate}%
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-400 mt-1 uppercase tracking-wider">
                      {t('card.present', 'Present')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Attendance Breakdown Tiles */}
              <div className="sm:col-span-7 grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#000E28]/60 border border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Students Present
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#0050CB] dark:text-[#38BDF8]">
                      {studentsPresent}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">/ {totalStudents}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-1">
                    • {totalStudents - studentsPresent} Absent
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#000E28]/60 border border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Faculty On Duty
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {stats?.attendanceSummary?.staffPresent || 0}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">Staff</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-1">
                    • Full Attendance
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Quick status bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Morning classroom roll call verified
            </span>
            <span className="font-bold text-[#0050CB] dark:text-[#38BDF8]">
              Automated SMS Alerts Sent
            </span>
          </div>
        </div>

        {/* Upcoming Calendar Events Card */}
        <div className="lg:col-span-5 bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,14,40,0.04)] flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 flex items-center justify-center text-[#0050CB] dark:text-[#38BDF8] shadow-xs">
                  <Calendar className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#000E28] dark:text-white tracking-tight">
                    Upcoming Calendar Events
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Institutional schedules</p>
                </div>
              </div>

              <Link href="/dashboard/events" className="text-xs font-bold text-[#0050CB] dark:text-[#38BDF8] hover:underline flex items-center gap-0.5">
                All Events <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {stats?.upcomingEvents?.length === 0 ? (
              <div className="h-44 flex flex-col items-center justify-center text-center text-slate-400 p-4">
                <Calendar className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
                <p className="text-xs italic">No upcoming events scheduled this week.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats?.upcomingEvents?.slice(0, 3).map((event: any) => (
                  <div key={event._id} className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#000E28]/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                    <div className="flex flex-col items-center justify-center bg-[#E5EEFF] dark:bg-[#0050CB]/25 w-12 h-12 rounded-2xl border border-blue-200/60 dark:border-[#0050CB]/40 shrink-0">
                      <span className="text-[10px] font-black text-[#0050CB] dark:text-[#38BDF8] uppercase">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-base font-black text-[#000E28] dark:text-white leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs sm:text-sm text-[#000E28] dark:text-white truncate">
                        {event.title}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                        {event.type || 'Event'} • {event.audience || 'All Classes'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Next: Sports Meet & Exams</span>
            <span className="font-bold text-[#FF690C]">Term 2 Calendar</span>
          </div>
        </div>

      </div>

      {/* ========================================================
          4. BENTO ROW 2: FEE COLLECTIONS (7 COLS) & BIRTHDAYS (5 COLS)
      ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Fee Collection Card */}
        <div className="lg:col-span-7 bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[28px] p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,14,40,0.04)] flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF3EB] dark:bg-[#FF690C]/20 flex items-center justify-center text-[#FF690C] shadow-xs">
                  <AlertTriangle className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#000E28] dark:text-white tracking-tight">
                    Outstanding Tuition Invoices
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Pending fee reminders and automated collection alerts
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/fees"
                className="text-xs font-bold text-[#0050CB] dark:text-[#38BDF8] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {stats?.feesDue?.length === 0 ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-xs font-bold flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <span>All tuition and bus fee collections are completely up to date with zero defaults!</span>
              </div>
            ) : (
              <div className="space-y-3">
                {stats?.feesDue?.slice(0, 3).map((fee: any) => (
                  <div 
                    key={fee._id} 
                    className="flex justify-between items-center p-3.5 bg-slate-50 dark:bg-[#000E28]/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-bold text-xs sm:text-sm text-[#000E28] dark:text-white truncate">
                        {fee.studentId ? `${fee.studentId.firstName} ${fee.studentId.lastName}` : 'Enrolled Student'}
                      </p>
                      <p className="text-[11px] font-bold text-[#FF690C] tracking-wide">
                        {fee.feeType} • Due {new Date(fee.dueDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right flex items-center gap-3 shrink-0">
                      <div>
                        <p className="font-black text-sm sm:text-base text-[#000E28] dark:text-white">
                          ₹{(fee.totalAmount - fee.amountPaid).toLocaleString()}
                        </p>
                        <span className="text-[10px] font-bold bg-[#FFF3EB] dark:bg-[#FF690C]/20 text-[#FF690C] px-2 py-0.5 rounded-full">
                          {fee.status || 'Pending'}
                        </span>
                      </div>
                      <Link
                        href="/dashboard/fees"
                        className="px-3.5 py-1.5 rounded-full bg-[#0050CB] hover:bg-[#0041A8] text-white text-[11px] font-bold shadow-xs transition-colors"
                      >
                        Collect
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Payment Gateway: Active</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">UPI / Net Banking / Cards</span>
          </div>
        </div>

        {/* Student Birthdays Card */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#000E28] via-[#002B7A] to-[#0050CB] p-6 sm:p-8 text-white border border-white/15 shadow-[0_15px_35px_rgba(0,14,40,0.15)] flex flex-col justify-between h-full">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#FF690C]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-[#FF690C] backdrop-blur-md shadow-inner">
                  <Cake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white tracking-tight">Student Birthdays</h3>
                  <p className="text-xs text-blue-200">Celebrations this month</p>
                </div>
              </div>

              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 text-white backdrop-blur-md">
                {new Date().toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </div>

            {stats?.birthdays?.length === 0 ? (
              <div className="h-44 flex flex-col items-center justify-center text-center text-blue-200 p-4">
                <Cake className="w-8 h-8 text-blue-300/50 mb-2" />
                <p className="text-xs italic">No birthdays recorded for this month.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats?.birthdays?.slice(0, 3).map((bday: any) => {
                  const bDate = new Date(bday.date);
                  const isToday = bDate.getDate() === new Date().getDate();

                  return (
                    <div 
                      key={bday._id} 
                      className={`flex items-center justify-between p-3 rounded-2xl backdrop-blur-md transition-all ${
                        isToday 
                          ? 'bg-white/20 border border-white/35 shadow-md' 
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm text-white shadow-inner">
                          {bday.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-white">{bday.name}</p>
                          <p className="text-[11px] font-medium text-blue-200">
                            {isToday ? '🎉 Today! Wish them well!' : bDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      {isToday && (
                        <span className="text-[10px] font-extrabold bg-[#FF690C] text-white px-2.5 py-1 rounded-full shadow-xs">
                          Today
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs text-blue-200 relative z-10">
            <span>Birthday wishes sent automatically</span>
            <span className="font-bold text-white">SMS Greetings</span>
          </div>
        </div>

      </div>

      {/* ========================================================
          5. ACADEMIC & OPERATIONS MODULES (4-COL BALANCED GRID)
      ======================================================== */}
      <div>
        <div className="flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-5 rounded-full bg-[#0050CB]" />
          <div>
            <h2 className="text-lg font-black text-[#000E28] dark:text-white tracking-tight">
              Academic & Institutional Operations
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Quick access shortcuts to school management workflows
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Module 1: Classes & Timetable */}
          <Link
            href="/dashboard/classes"
            className="group relative bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[24px] p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_24px_rgba(0,14,40,0.03)] hover:border-[#0050CB]/50 dark:hover:border-blue-500/50 hover:shadow-[0_12px_32px_rgba(0,80,203,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full min-h-[175px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 text-[#0050CB] dark:text-[#38BDF8] flex items-center justify-center shadow-xs">
                  <CalendarCheck className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-[#000E28] flex items-center justify-center text-slate-400 group-hover:text-[#0050CB] group-hover:bg-[#E5EEFF] transition-all">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              <h4 className="font-black text-sm text-[#000E28] dark:text-white group-hover:text-[#0050CB] dark:group-hover:text-[#38BDF8] transition-colors">
                {t('card.timetable', 'Classes & Timetable')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Bell schedules, teacher allocation & subject syllabus
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-[#0050CB] dark:text-[#38BDF8]">
              <span>Manage Schedules</span>
              <span>→</span>
            </div>
          </Link>

          {/* Module 2: Fleet & Transport */}
          <Link
            href="/dashboard/transport"
            className="group relative bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[24px] p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_24px_rgba(0,14,40,0.03)] hover:border-[#FF690C]/50 dark:hover:border-amber-500/50 hover:shadow-[0_12px_32px_rgba(255,105,12,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full min-h-[175px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF3EB] dark:bg-[#FF690C]/20 text-[#FF690C] flex items-center justify-center shadow-xs">
                  <Bus className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-[#000E28] flex items-center justify-center text-slate-400 group-hover:text-[#FF690C] group-hover:bg-[#FFF3EB] transition-all">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              <h4 className="font-black text-sm text-[#000E28] dark:text-white group-hover:text-[#FF690C] transition-colors">
                Transport & Routes
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Live bus GPS tracking, student pickup stops & driver logs
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-[#FF690C]">
              <span>Fleet Status</span>
              <span>→</span>
            </div>
          </Link>

          {/* Module 3: Daily Activity & Daycare */}
          <Link
            href="/dashboard/daily-activity"
            className="group relative bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[24px] p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_24px_rgba(0,14,40,0.03)] hover:border-emerald-500/50 hover:shadow-[0_12px_32px_rgba(16,185,129,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full min-h-[175px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                  <Activity className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-[#000E28] flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-all">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              <h4 className="font-black text-sm text-[#000E28] dark:text-white group-hover:text-emerald-600 transition-colors">
                Daily Activity Diary
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Student meals, nap tracking & digital classroom observations
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <span>View Activity Log</span>
              <span>→</span>
            </div>
          </Link>

          {/* Module 4: Communication & Announcements */}
          <Link
            href="/dashboard/communication"
            className="group relative bg-white/95 dark:bg-[#001438]/95 backdrop-blur-md rounded-[24px] p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_24px_rgba(0,14,40,0.03)] hover:border-[#0050CB]/50 dark:hover:border-blue-500/50 hover:shadow-[0_12px_32px_rgba(0,80,203,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full min-h-[175px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 text-[#0050CB] dark:text-[#38BDF8] flex items-center justify-center shadow-xs">
                  <Megaphone className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-[#000E28] flex items-center justify-center text-slate-400 group-hover:text-[#0050CB] group-hover:bg-[#E5EEFF] transition-all">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              <h4 className="font-black text-sm text-[#000E28] dark:text-white group-hover:text-[#0050CB] dark:group-hover:text-[#38BDF8] transition-colors">
                Parent Broadcasts
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Emergency notices, circulars & instant SMS alerts
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-[#0050CB] dark:text-[#38BDF8]">
              <span>Broadcast Notice</span>
              <span>→</span>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}

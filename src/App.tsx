import { useMemo, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import {
  Activity, Bell, BookOpen, CalendarDays, ChevronDown, ClipboardList,
  GraduationCap, LayoutDashboard, Menu, Moon, Search, Settings, ShieldCheck,
  Sun, Users, X, CircleHelp, Clock3, ArrowUpRight, Plus, MoreHorizontal,
} from 'lucide-react'
import { isSupabaseConfigured } from './lib/supabase'

type Language = 'bn' | 'en'

const copy = {
  bn: {
    overview: 'ড্যাশবোর্ড', exams: 'পরীক্ষাসমূহ', questions: 'প্রশ্নব্যাংক',
    students: 'শিক্ষার্থী', teachers: 'শিক্ষক', schedule: 'পরীক্ষার সময়সূচি',
    settings: 'সেটিংস', help: 'সহায়তা', search: 'খুঁজুন...',
    welcome: 'স্বাগতম, অ্যাডমিন', subtitle: 'আপনার পরীক্ষা ব্যবস্থাপনার সারসংক্ষেপ এক নজরে দেখুন।',
    totalStudents: 'মোট শিক্ষার্থী', activeExams: 'সক্রিয় পরীক্ষা',
    totalQuestions: 'প্রশ্নের সংখ্যা', pendingReview: 'অনুমোদন অপেক্ষায়',
    recent: 'সাম্প্রতিক পরীক্ষা', viewAll: 'সব দেখুন', upcoming: 'আসন্ন পরীক্ষা',
    activity: 'সাম্প্রতিক কার্যক্রম', createExam: 'নতুন পরীক্ষা তৈরি',
    status: 'অবস্থা', course: 'কোর্স', date: 'তারিখ', participants: 'অংশগ্রহণকারী',
    live: 'চলমান', scheduled: 'নির্ধারিত', review: 'পর্যালোচনা',
    admin: 'সুপার অ্যাডমিন', connected: 'Supabase কনফিগার করা হয়নি',
    language: 'বাংলা',
  },
  en: {
    overview: 'Dashboard', exams: 'Examinations', questions: 'Question Bank',
    students: 'Students', teachers: 'Teachers', schedule: 'Exam Schedule',
    settings: 'Settings', help: 'Help & Support', search: 'Search...',
    welcome: 'Welcome back, Admin', subtitle: 'Here is an overview of your examination management system.',
    totalStudents: 'Total Students', activeExams: 'Active Exams',
    totalQuestions: 'Total Questions', pendingReview: 'Pending Approval',
    recent: 'Recent Examinations', viewAll: 'View all', upcoming: 'Upcoming Exams',
    activity: 'Recent Activity', createExam: 'Create New Exam',
    status: 'Status', course: 'Course', date: 'Date', participants: 'Participants',
    live: 'Live', scheduled: 'Scheduled', review: 'In Review',
    admin: 'Super Admin', connected: 'Supabase is not configured',
    language: 'English',
  },
}

const exams = [
  { title: 'Microeconomics — Midterm', course: 'ECO 201 · Economics', date: '18 Nov 2026 · 02:00 PM', students: '128 / 150', status: 'live' },
  { title: 'Business Mathematics', course: 'MAT 105 · Mathematics', date: '20 Nov 2026 · 10:00 AM', students: '—', status: 'scheduled' },
  { title: 'Introduction to Statistics', course: 'STA 101 · Statistics', date: '22 Nov 2026 · 11:30 AM', students: '—', status: 'review' },
]

function App() {
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState<Language>('bn')
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = copy[lang]
  const nav = useMemo(() => [
    { label: t.overview, icon: LayoutDashboard, to: '/' },
    { label: t.exams, icon: ClipboardList, to: '/exams' },
    { label: t.questions, icon: BookOpen, to: '/questions' },
    { label: t.students, icon: GraduationCap, to: '/students' },
    { label: t.teachers, icon: Users, to: '/teachers' },
    { label: t.schedule, icon: CalendarDays, to: '/schedule' },
  ], [t])

  return (
    <div className={dark ? 'app-shell dark' : 'app-shell'}>
      <aside className={mobileOpen ? 'sidebar mobile-visible' : 'sidebar'}>
        <div className="brand">
          <div className="brand-mark">O</div>
          <div><strong>ORION QUEST</strong><span>LIVE EXAM</span></div>
          <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19}/></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="nav-list">
          {nav.map(item => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={() => setMobileOpen(false)}><item.icon size={18}/><span>{item.label}</span></NavLink>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="workspace-label">PREFERENCES</div>
          <a className="nav-item" href="#settings"><Settings size={18}/><span>{t.settings}</span></a>
          <a className="nav-item" href="#help"><CircleHelp size={18}/><span>{t.help}</span></a>
          <div className="profile">
            <div className="avatar">A</div>
            <div className="profile-copy"><strong>Administrator</strong><span>{t.admin}</span></div>
            <MoreHorizontal size={19} className="muted"/>
          </div>
        </div>
      </aside>

      {mobileOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20}/></button>
          <div className="breadcrumb">Workspace <span>/</span> <strong>{t.overview}</strong></div>
          <div className="top-actions">
            <label className="search-box"><Search size={16}/><input placeholder={t.search}/><kbd>⌘ K</kbd></label>
            <button className="icon-button" onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} title="Switch language"><span className="language-code">{lang === 'bn' ? 'EN' : 'বাং'}</span></button>
            <button className="icon-button" onClick={() => setDark(!dark)} title="Toggle theme">{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
            <button className="icon-button notification" aria-label="Notifications"><Bell size={18}/><i/></button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard t={t} />} />
          <Route path="*" element={<Placeholder t={t} />} />
        </Routes>
        <footer className="footer"><span>© 2026 Orion Quest Live Exam</span><span>Built for academic excellence</span></footer>
      </main>
      {!isSupabaseConfigured && <div className="config-note"><span className="config-dot"/> {t.connected} · Add your keys in <code>.env</code></div>}
    </div>
  )
}

function Dashboard({ t }: { t: typeof copy.bn }) {
  const stats = [
    { label: t.totalStudents, value: '2,840', delta: '+12.8%', icon: GraduationCap, tone: 'red' },
    { label: t.activeExams, value: '08', delta: '03 live now', icon: ClipboardList, tone: 'green' },
    { label: t.totalQuestions, value: '1,256', delta: '+8.2%', icon: BookOpen, tone: 'amber' },
    { label: t.pendingReview, value: '12', delta: 'Needs attention', icon: ShieldCheck, tone: 'violet' },
  ]
  return <div className="page-content">
    <section className="welcome-row"><div><div className="eyebrow">WEDNESDAY, 18 NOVEMBER 2026</div><h1>{t.welcome}</h1><p>{t.subtitle}</p></div><button className="primary-button"><Plus size={17}/>{t.createExam}</button></section>
    <section className="stat-grid">
      {stats.map((s) => <article className="stat-card" key={s.label}><div className={'stat-icon ' + s.tone}><s.icon size={19}/></div><div className="stat-label">{s.label}</div><div className="stat-bottom"><strong>{s.value}</strong><span className={'stat-delta ' + s.tone}>{s.delta}</span></div></article>)}
    </section>
    <section className="content-grid">
      <article className="panel exam-panel">
        <div className="panel-heading"><div><h2>{t.recent}</h2><p>Track and manage examination activity</p></div><button className="text-button">{t.viewAll}<ArrowUpRight size={15}/></button></div>
        <div className="table-wrap"><table><thead><tr><th>EXAMINATION</th><th>{t.date}</th><th>{t.participants}</th><th>{t.status}</th><th/></tr></thead><tbody>
          {exams.map(e => <tr key={e.title}><td><strong>{e.title}</strong><span>{e.course}</span></td><td>{e.date}</td><td>{e.students}</td><td><span className={'status-pill ' + e.status}><i/>{e.status === 'live' ? t.live : e.status === 'scheduled' ? t.scheduled : t.review}</span></td><td><button className="icon-button small"><MoreHorizontal size={17}/></button></td></tr>)}
        </tbody></table></div>
      </article>
      <article className="panel upcoming-panel">
        <div className="panel-heading"><div><h2>{t.upcoming}</h2><p>Your next scheduled sessions</p></div><CalendarDays size={18} className="muted"/></div>
        <div className="upcoming-item"><div className="date-tile"><strong>20</strong><span>NOV</span></div><div><strong>Business Mathematics</strong><span>10:00 AM · 90 minutes</span></div></div>
        <div className="upcoming-item"><div className="date-tile"><strong>22</strong><span>NOV</span></div><div><strong>Introduction to Statistics</strong><span>11:30 AM · 60 minutes</span></div></div>
        <div className="upcoming-item"><div className="date-tile"><strong>25</strong><span>NOV</span></div><div><strong>Development Economics</strong><span>02:00 PM · 120 minutes</span></div></div>
        <button className="outline-button">{t.schedule}<ArrowUpRight size={15}/></button>
      </article>
    </section>
    <section className="panel activity-panel"><div className="panel-heading"><div><h2>{t.activity}</h2><p>Latest updates across your workspace</p></div><Activity size={18} className="muted"/></div>
      <div className="activity-row"><div className="activity-icon"><Users size={17}/></div><div><strong>New student registrations</strong><span>24 students submitted registration requests</span></div><time>12 min ago</time></div>
      <div className="activity-row"><div className="activity-icon"><ClipboardList size={17}/></div><div><strong>Examination submitted for review</strong><span>Microeconomics — Midterm · ECO 201</span></div><time>1 hour ago</time></div>
      <div className="activity-row"><div className="activity-icon"><BookOpen size={17}/></div><div><strong>Question bank updated</strong><span>18 new questions added to Statistics</span></div><time>3 hours ago</time></div>
    </section>
  </div>
}

function Placeholder({ t }: { t: typeof copy.bn }) {
  return <div className="page-content placeholder-page"><div className="placeholder-icon"><Clock3 size={25}/></div><h1>Module in development</h1><p>This section will be connected to the secure examination workflow in the next development phase.</p><span>{t.admin} · Orion Quest Live Exam</span></div>
}

export default App
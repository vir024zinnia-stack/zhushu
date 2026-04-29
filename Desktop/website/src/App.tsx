/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  GraduationCap, 
  Send,
  Coffee,
  AlertCircle,
  Plus,
  Trash2,
  X,
  LayoutDashboard,
  Target
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Data Structures ---

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  category: 'academic' | 'career' | 'life' | 'exam';
}

interface TimelinePhase {
  id: string;
  title: string;
  dateRange: string;
  description?: string;
  items: TodoItem[];
  isCurrent?: boolean;
}

const INITIAL_PHASES: TimelinePhase[] = [
  {
    id: 'p1',
    title: '4月28日 - 4月30日 (五一前)',
    dateRange: '4/28 - 4/30',
    description: '收尾作品集，沟通HR，修改简历逻辑',
    items: [
      { id: '1-1', task: '完成课程作业网站 UI', category: 'academic', completed: false },
      { id: '1-2', task: '完成个人网站作品集', category: 'academic', completed: false },
      { id: '1-3', task: '约 HR 辅导简历 & 探讨职业方向', category: 'career', completed: false },
      { id: '1-4', task: '修改简历 (用户需求 - 解决方案 - 结果)', category: 'career', completed: false },
    ]
  },
  {
    id: 'p2',
    title: '5月1日 - 5月4日 (五一期间)',
    dateRange: '5/1 - 5/4',
    items: [
      { id: '2-1', task: '1号/2号/4号：完成家教', category: 'life', completed: false },
      { id: '2-2', task: '3号：顺德游玩，彻底放松', category: 'life', completed: false },
      { id: '2-3', task: '碎片时间：看 1-2 篇产品面经', category: 'career', completed: false },
    ]
  },
  {
    id: 'p3',
    title: '5月5日 - 5月20日 (实习与学业冲刺)',
    dateRange: '5/5 - 5/20',
    description: '重点：产品实习投递与论文/考试准备',
    items: [
      { id: '3-1', task: '每天投递 5-8 份产品实习简历', category: 'career', completed: false },
      { id: '3-2', task: '每天 2h：推进作品集与 APP 分析', category: 'career', completed: false },
      { id: '3-3', task: '准备动画课、网站课期末', category: 'academic', completed: false },
      { id: '3-4', task: '准备毛概、写作、行测论文及汇报', category: 'academic', completed: false },
      { id: '3-5', task: '准备 6/2 & 6/8 跨专业课考试', category: 'exam', completed: false },
    ]
  },
  {
    id: 'p4',
    title: '5月21日 - 6月1日 (大考强化期)',
    dateRange: '5/21 - 6/1',
    items: [
      { id: '4-1', task: '复习 6/2 跨考：每天 3-4 小时', category: 'exam', completed: false },
      { id: '4-2', task: '英语六级备考：每天 1 小时', category: 'academic', completed: false },
      { id: '4-3', task: '持续投递：每天 3-5 份产品实习', category: 'career', completed: false },
    ]
  },
  {
    id: 'p5',
    title: '6月2日 - 6月7日 (连续作战)',
    dateRange: '6/2 - 6/7',
    description: '6/2考完立即切换至6/8科目',
    items: [
      { id: '5-1', task: '全力备考 6/8 跨专业课', category: 'exam', completed: false },
      { id: '5-2', task: '英语六级备考：每天 1.5 小时', category: 'academic', completed: false },
    ]
  },
  {
    id: 'p6',
    title: '6月8日 - 6月中旬 (调整期)',
    dateRange: '6/8 - 中旬',
    items: [
      { id: '6-1', task: '全力冲刺英语六级考试', category: 'academic', completed: false },
      { id: '6-2', task: '若产品实习未果，启动运营/CSM 投递', category: 'career', completed: false },
    ]
  }
];

const HR_REPLY = "非常感谢您的认可！目前我正在全力准备产品方向的实习，希望能先尝试目标领域。如果后续产品方向没有合适机会，我会第一时间和您联系，您看这样可以吗？";

const CategoryIcon = ({ category }: { category: TodoItem['category'] }) => {
  switch (category) {
    case 'academic': return <GraduationCap size={16} className="text-blue-500" />;
    case 'career': return <Briefcase size={16} className="text-emerald-500" />;
    case 'life': return <Coffee size={16} className="text-orange-500" />;
    case 'exam': return <AlertCircle size={16} className="text-rose-500" />;
    default: return null;
  }
};

const HRReplyCard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(HR_REPLY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
         <Send size={100} />
      </div>
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
             <Send size={20} />
          </div>
          <div>
             <h3 className="font-black text-lg text-white">HR 回复话术</h3>
             <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Active Communication Script</p>
          </div>
        </div>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold text-xs"
        >
          {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Plus size={14} className="rotate-45" />}
          {copied ? '已复制' : '复制话术'}
        </button>
      </div>
      <p className="text-slate-300 leading-relaxed font-medium italic bg-white/5 p-4 rounded-2xl text-sm relative z-10">
        "{HR_REPLY}"
      </p>
    </div>
  );
};

const TaskItem = ({ 
  item, 
  onToggle, 
  onDelete,
  onEdit
}: { 
  item: TodoItem; 
  onToggle: (id: string) => void; 
  onDelete: (id: string) => void; 
  onEdit: (item: TodoItem) => void;
  key?: React.Key;
}) => {
  const catLabel = {
    academic: '学业',
    career: '职业',
    life: '生活',
    exam: '考试'
  }[item.category];

  return (
    <div className="flex items-center justify-between group py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-lg transition-colors px-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button 
          onClick={() => onToggle(item.id)}
          className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
            item.completed ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 hover:border-blue-400"
          )}
        >
          {item.completed && <CheckCircle2 size={12} />}
        </button>
        <div className="flex flex-col min-w-0">
          <span 
            onClick={() => onEdit(item)}
            className={cn(
              "text-sm font-bold tracking-tight truncate cursor-pointer hover:text-blue-600 transition-colors",
              item.completed ? "line-through text-slate-300" : "text-slate-700"
            )}
          >
            {item.task}
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <CategoryIcon category={item.category} />
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">{catLabel}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button 
          onClick={() => onDelete(item.id)}
          className="p-2 text-slate-300 hover:text-rose-500 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

const AddTaskModal = ({ 
  isOpen, 
  onClose, 
  onAdd,
  editingTask
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onAdd: (task: string, category: TodoItem['category']) => void,
  editingTask?: TodoItem | null
}) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState<TodoItem['category']>('career');

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask.task);
      setCategory(editingTask.category);
    } else {
      setTask('');
      setCategory('career');
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-10 overflow-hidden"
      >
        <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter text-center">
          {editingTask ? '修改任务' : '添加新里程碑'}
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">任务内容</label>
            <input 
              autoFocus
              type="text" 
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="做什么？"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">类别</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'academic', label: '学业' },
                { key: 'career', label: '职业' },
                { key: 'life', label: '生活' },
                { key: 'exam', label: '考试' }
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key as TodoItem['category'])}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-xs font-bold transition-all",
                    category === cat.key ? "bg-slate-900 border-slate-900 text-white" : "border-slate-100 text-slate-400 hover:border-slate-200"
                  )}
                >
                  <CategoryIcon category={cat.key as TodoItem['category']} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-xs"
          >
            取消
          </button>
          <button 
            disabled={!task.trim()}
            onClick={() => {
              onAdd(task, category);
              setTask('');
              onClose();
            }}
            className="flex-1 py-4 font-black bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 rounded-2xl shadow-xl shadow-blue-200 transition-all uppercase tracking-widest text-xs"
          >
            保存
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [phases, setPhases] = useState<TimelinePhase[]>(() => {
    const saved = localStorage.getItem('pm-planner-v3');
    return saved ? JSON.parse(saved) : INITIAL_PHASES;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetPhaseId, setTargetPhaseId] = useState('p3');
  const [editingTask, setEditingTask] = useState<TodoItem | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('pm-planner-v3', JSON.stringify(phases));
  }, [phases]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(() => {
    const allItems = phases.flatMap(p => p.items);
    const total = allItems.length;
    const completed = allItems.filter(i => i.completed).length;
    
    const byCategory = allItems.reduce((acc, i) => {
      acc[i.category] = (acc[i.category] || 0) + (i.completed ? 1 : 0);
      acc[`${i.category}_total`] = (acc[`${i.category}_total`] || 0) + 1;
      return acc;
    }, {} as any);

    const categoryData = ([
      { key: 'academic', label: '学业' },
      { key: 'career', label: '职业' },
      { key: 'life', label: '生活' },
      { key: 'exam', label: '考试' }
    ] as const).map(cat => ({
      name: cat.label,
      key: cat.key,
      percent: byCategory[`${cat.key}_total`] ? Math.round((byCategory[cat.key] || 0) / byCategory[`${cat.key}_total`] * 100) : 0
    }));

    return { total, completed, categoryData };
  }, [phases]);

  const toggleTask = (taskId: string) => {
    setPhases(prev => prev.map(p => ({
      ...p,
      items: p.items.map(item => item.id === taskId ? { ...item, completed: !item.completed } : item)
    })));
  };

  const deleteTask = (taskId: string) => {
    setPhases(prev => prev.map(p => ({
      ...p,
      items: p.items.filter(item => item.id !== taskId)
    })));
  };

  const openEditModal = (item: TodoItem) => {
    setEditingTask(item);
    setIsModalOpen(true);
  };

  const handleAddOrEdit = (taskText: string, category: TodoItem['category']) => {
    if (editingTask) {
      setPhases(prev => prev.map(p => ({
        ...p,
        items: p.items.map(item => item.id === editingTask.id ? { ...item, task: taskText, category } : item)
      })));
      setEditingTask(null);
    } else {
      const targetId = targetPhaseId || 'p3';
      setPhases(prev => prev.map(p => {
        if (p.id === targetId) {
          const newItem: TodoItem = {
            id: `task-${Date.now()}`,
            task: taskText,
            category,
            completed: false
          };
          return { ...p, items: [...p.items, newItem] };
        }
        return p;
      }));
    }
  };

  const aprilPhase = phases.find(p => p.id === 'p1');
  const shundePhase = phases.find(p => p.id === 'p2');
  const futurePhases = phases.filter(p => !['p1', 'p2'].includes(p.id));

  return (
    <div className="min-h-screen bg-[#FDFDFF] selection:bg-blue-100 selection:text-blue-900 pb-32">
      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }} 
        onAdd={handleAddOrEdit}
        editingTask={editingTask}
      />

      {/* Centered Header Section */}
      <header className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8"
        >
          <Calendar size={12} className="text-blue-400" />
          Zinnia 的作战方案
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
          Zinnia 的待办清单
        </h1>

        <p className="text-slate-400 font-bold max-w-xl mx-auto text-sm md:text-lg mb-12 text-balance leading-relaxed">
          专注于产品经理实习投递与学业期末大考。
          <span className="text-blue-600 block mt-2 animate-pulse italic tracking-[0.2em] font-black text-xs uppercase underline underline-offset-8 decoration-emerald-400 decoration-2">Vision • Strategy • Execution</span>
        </p>

        {/* Centered Statistics Board */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
           {stats.categoryData.slice(0, 3).map(cat => (
              <div key={cat.key} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-xl shadow-slate-100">
                 <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{cat.name}</div>
                 <div className="text-3xl font-black text-slate-900">{cat.percent}%</div>
                 <div className="w-full h-1 bg-slate-50 mt-3 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${cat.percent}%` }}
                       className="h-full bg-blue-600"
                    />
                 </div>
              </div>
           ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-24">

        {/* SECTION: IMMEDIATE FOCUS (APRIL) */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                   <Clock size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">立即行动：五一前冲刺</h2>
             </div>
             <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">April 28 - April 30</div>
          </div>

          <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-xl shadow-slate-100 group">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">作品集收尾与简历修改</h3>
                  <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">根据 HR 建议优化“用户需求-解决方案-结果”逻辑</p>
                </div>
                <button 
                  onClick={() => { setTargetPhaseId('p1'); setIsModalOpen(true); }}
                  className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <Plus size={14} /> 添加任务
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aprilPhase?.items.map(item => (
                  <TaskItem 
                    key={item.id} 
                    item={item} 
                    onToggle={toggleTask} 
                    onDelete={deleteTask}
                    onEdit={openEditModal}
                  />
                ))}
             </div>
          </div>
        </section>

        {/* SECTION 0:面试准备快板 */}
        <section className="bg-emerald-50/50 border border-emerald-100 rounded-[3rem] p-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5 text-emerald-600">
              <Target size={180} />
           </div>
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">面试紧急预案 (接到邀请后 24h)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   '分析应聘 APP 功能与逻辑',
                   '复习产品流程与 PRD 思路',
                   '准备 3 个完整项目案例'
                 ].map((tip, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-3">
                       <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                       <span className="text-xs font-bold text-slate-700 leading-relaxed">{tip}</span>
                    </div>
                 ))}
              </div>
           </div>
        </section>
        
        {/* SECTION 1: MAY 3RD PRIORITY */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-200">
                   <MapPin size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">核心日程：5月3日</h2>
             </div>
             <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Priority Milestone</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* The Shunde Hero Card */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 rounded-[3rem] shadow-2xl text-white flex flex-col justify-between min-h-[300px]"
             >
                <div className="absolute top-0 right-0 p-10 opacity-10">
                   <MapPin size={160} strokeWidth={3} />
                </div>
                <div className="relative z-10">
                   <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                      Holiday Break
                   </div>
                   <h3 className="text-4xl font-black tracking-tighter leading-none">顺德游玩</h3>
                   <p className="mt-4 text-slate-400 font-medium text-sm leading-relaxed max-w-[200px]">
                      在全力冲刺中给自己一个完美的喘息，品尝美食，彻底放松，回满战斗力。
                   </p>
                </div>
                <div className="mt-8 flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                      <span className="text-xs font-black text-slate-300 uppercase tracking-widest transition-all hover:text-blue-400 cursor-default">
                         5月3日 • 开启放松
                      </span>
                   </div>
                   <div className="p-3 rounded-full bg-white/5 border border-white/10">
                      <Coffee size={20} className="text-amber-400" />
                   </div>
                </div>
             </motion.div>

             {/* Associated Tasks */}
             <div className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-xl shadow-slate-100 flex flex-col">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-between">
                   <span>假期准备清单</span>
                   <Coffee size={14} className="text-amber-500" />
                </div>
                <div className="space-y-1 flex-1">
                   {shundePhase?.items.map(item => (
                     <TaskItem 
                       key={item.id} 
                       item={item} 
                       onToggle={toggleTask} 
                       onDelete={deleteTask}
                       onEdit={openEditModal}
                     />
                   ))}
                </div>
                <button 
                  onClick={() => { setTargetPhaseId('p2'); setIsModalOpen(true); }}
                  className="mt-8 w-full py-4 border-2 border-dashed border-slate-100 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> 添加待办
                </button>
             </div>
          </div>
        </section>

        {/* SECTION 2: THE CENTERED FUTURE ROADMAP */}
        <section className="space-y-12">
           <div className="text-center space-y-3">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">作战蓝图 (5月5日 - 6月)</h2>
              <p className="text-slate-400 text-sm font-bold opacity-60">集中精力，确保每一个里程碑的达成</p>
           </div>
           
           <div className="max-w-3xl mx-auto space-y-16">
              {futurePhases.map((phase, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={phase.id}
                  className="relative group"
                >
                  <div className="absolute -left-4 -top-4 w-12 h-12 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center font-black text-2xl z-0 group-hover:text-blue-50 transition-colors">
                     0{idx + 3}
                  </div>
                  
                  <div className="relative z-10 bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-200/40 transition-all border-b-4 border-blue-600">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                           <div className="inline-block px-3 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2">
                              {phase.dateRange}
                           </div>
                           <h3 className="text-3xl font-black text-slate-900 tracking-tight">{phase.title}</h3>
                        </div>
                        <button 
                          onClick={() => { setTargetPhaseId(phase.id); setIsModalOpen(true); }}
                          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all"
                        >
                          <Plus size={14} /> 添加任务
                        </button>
                     </div>

                     {phase.description && (
                        <div className="mb-8 p-5 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-4 text-slate-500 text-xs font-bold leading-relaxed italic">
                           <LayoutDashboard size={20} className="text-slate-300 shrink-0" />
                           {phase.description}
                        </div>
                     )}

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                        {phase.items.map(item => (
                           <TaskItem 
                             key={item.id} 
                             item={item} 
                             onToggle={toggleTask} 
                             onDelete={deleteTask}
                             onEdit={openEditModal}
                           />
                        ))}
                     </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* SECTION 3: SYSTEM GUIDES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
           <HRReplyCard />
           <div className="bg-white border border-rose-100 p-10 rounded-[3rem] shadow-xl shadow-rose-100/20 flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 text-rose-500/5 transition-transform hover:scale-110">
                 <AlertCircle size={140} strokeWidth={4} />
              </div>
              <div>
                 <div className="flex items-center gap-2 mb-4">
                    <AlertCircle size={20} className="text-rose-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">高风险节点</span>
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">跨专业课大考</h3>
                 <p className="text-slate-400 text-xs mt-3 font-bold uppercase tracking-tight italic">Critical Focus: 6月2日 & 6月8日</p>
              </div>
              <div className="mt-12 flex items-center justify-between">
                 <div className="px-3 py-1 rounded-md bg-rose-50 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                    紧急程度: 极高
                 </div>
                 <Target size={28} className="text-slate-200" />
              </div>
           </div>
        </section>

      </main>

      <footer className="mt-40 max-w-4xl mx-auto px-6 py-20 border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-10 mb-12 text-slate-200">
           <Send size={24} strokeWidth={1} />
           <Coffee size={24} strokeWidth={1} />
           <Briefcase size={24} strokeWidth={1} />
        </div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4">© 2026 Zinnia 个人成长档案 • {currentTime.toLocaleDateString('zh-CN')} </p>
        <p className="text-slate-300 text-xs font-bold font-serif italic">Vision • Strategy • Execution</p>
      </footer>
    </div>
  );
}

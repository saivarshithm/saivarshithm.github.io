import React, { useState, useEffect, useMemo } from 'react';
import { FALLBACK_REPOS, type FallbackRepo } from '../data/projects';
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork, 
  Search, 
  Clock, 
  Filter, 
  Code2, 
  Layers,
  ArrowUpDown
} from 'lucide-react';

interface GitHubRepoItem {
  id?: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  category?: 'Silicon & RTL' | 'Power & Analog' | 'Vibe-Coded Apps & Tools';
}

const CACHE_KEY = 'saivarshithm_github_repos_v4';
const CACHE_TTL_MS = 15 * 60 * 1000;

export const GitHubExplorer: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepoItem[]>(FALLBACK_REPOS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'updated' | 'stars'>('featured');

  const classifyRepo = (repo: any): 'Silicon & RTL' | 'Power & Analog' | 'Vibe-Coded Apps & Tools' => {
    const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')} ${repo.language || ''}`.toLowerCase();
    
    if (
      text.includes('converter') || 
      text.includes('power') || 
      text.includes('inverter') || 
      text.includes('wpt') || 
      text.includes('ltspice') || 
      text.includes('ansys') || 
      text.includes('simulink')
    ) {
      return 'Power & Analog';
    }
    if (
      text.includes('riscv') || 
      text.includes('risc-v') || 
      text.includes('verilog') || 
      text.includes('rtl') || 
      text.includes('sky130') || 
      text.includes('vlsi') || 
      text.includes('uart') || 
      text.includes('cmos') || 
      text.includes('arm') || 
      text.includes('dft') || 
      text.includes('fpga') || 
      repo.language === 'Verilog' || 
      repo.language === 'VHDL'
    ) {
      return 'Silicon & RTL';
    }
    return 'Vibe-Coded Apps & Tools';
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.data)) {
            setRepos(parsed.data);
            return;
          }
        }

        const res = await fetch('https://api.github.com/users/saivarshithm/repos?per_page=100&sort=updated', {
          headers: {
            Accept: 'application/vnd.github.v3+json'
          }
        });

        if (!res.ok) {
          throw new Error(`GitHub API returned status ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const classified = data
            .filter((r: any) => !r.fork)
            .map((r: any) => ({
              ...r,
              category: classifyRepo(r)
            }));

          setRepos(classified);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: classified
          }));
        }
      } catch (err) {
        // Fall back gracefully to local pre-rendered repos
      }
    };

    fetchRepos();
  }, []);

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ['All', ...Array.from(langs).sort()];
  }, [repos]);

  const filteredAndSortedRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        // Category filter
        if (selectedCategory !== 'All' && repo.category !== selectedCategory) {
          return false;
        }

        // Language filter
        if (selectedLanguage !== 'All' && repo.language !== selectedLanguage) {
          return false;
        }

        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchesName = repo.name.toLowerCase().includes(q);
          const matchesDesc = (repo.description || '').toLowerCase().includes(q);
          const matchesLang = (repo.language || '').toLowerCase().includes(q);
          const matchesTopics = (repo.topics || []).some((t) => t.toLowerCase().includes(q));
          if (!matchesName && !matchesDesc && !matchesLang && !matchesTopics) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        }
        if (sortBy === 'updated') {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
        return 0;
      });
  }, [repos, searchQuery, selectedCategory, selectedLanguage, sortBy]);

  const getRelativeTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const diffMs = Date.now() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays < 1) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 30) return `${diffDays}d ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
      return `${Math.floor(diffDays / 365)}y ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <section id="repositories" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-sky-400 uppercase mb-3 backdrop-blur-md">
            <Github className="w-3.5 h-3.5" />
            <span>LIVE GITHUB SYNC</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Repository Index
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Open-source digital silicon, power circuits, and platforms by <span className="font-bold text-white">@saivarshithm</span>.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{repos.length} Repositories Online</span>
        </div>
      </div>

      {/* Control Panel Toolbar */}
      <div className="rounded-3xl p-5 sm:p-6 mb-8 border border-white/10 bg-[#10141B] space-y-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Filter by RTL, RISC-V, SPICE, app, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-400 transition-all font-mono shadow-inner"
            />
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <div className="relative">
              <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-9 pr-8 py-2.5 bg-black/40 border border-white/10 rounded-2xl text-xs sm:text-sm text-zinc-200 font-medium focus:outline-none focus:border-sky-400 transition-all appearance-none cursor-pointer shadow-inner"
              >
                <option value="featured">Featured Order</option>
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stargazers</option>
              </select>
            </div>
          </div>

          {/* Language Selector */}
          <div className="md:col-span-3">
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-black/40 border border-white/10 rounded-2xl text-xs sm:text-sm text-zinc-200 font-medium focus:outline-none focus:border-sky-400 transition-all appearance-none cursor-pointer shadow-inner"
              >
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    Language: {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
          <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 shrink-0 font-mono">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            Category:
          </span>
          {['All', 'Silicon & RTL', 'Power & Analog', 'Vibe-Coded Apps & Tools'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-all duration-150 tap-target ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Repositories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAndSortedRepos.length > 0 ? (
          filteredAndSortedRepos.map((repo) => (
            <div
              key={repo.name}
              className="rounded-3xl p-5 sm:p-6 border border-white/10 bg-[#10141B] flex flex-col justify-between group shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:border-sky-400/40 hover:bg-[#121721] transition-all"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                    {repo.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors font-mono line-clamp-1">
                  {repo.name}
                </h3>

                <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {repo.description || 'Open-source engineering repository designed by Saivarshith Mitukula.'}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/5"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Meta & Links */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 text-zinc-300 font-semibold border border-white/10">
                      {repo.language}
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getRelativeTime(repo.updated_at)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all tap-target"
                      aria-label={`View live demo of ${repo.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all tap-target"
                    aria-label={`View ${repo.name} on GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center rounded-3xl border border-white/10 bg-[#10141B]">
            <Code2 className="w-8 h-8 text-sky-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-400">
              No repositories match current filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLanguage('All');
              }}
              className="mt-3 px-4 py-2 rounded-full bg-sky-500 text-slate-950 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

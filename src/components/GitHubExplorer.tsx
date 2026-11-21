import React, { useState, useEffect, useMemo } from 'react';
import { FALLBACK_REPOS, type FallbackRepo } from '../data/projects';
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork, 
  Search, 
  Clock, 
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
  category?: 'Silicon & RTL' | 'Power & Analog' | 'Software & Tools';
}

const CACHE_KEY = 'saivarshithm_github_repos_v5';
const CACHE_TTL_MS = 15 * 60 * 1000;

const LANGUAGE_COLORS: Record<string, string> = {
  Verilog: '#10B981',
  MATLAB: '#E16737',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#38BDF8',
  Shell: '#89E051',
  C: '#555555',
  HTML: '#E34C26',
  CSS: '#563D7C'
};

export const GitHubExplorer: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepoItem[]>(FALLBACK_REPOS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'updated' | 'stars'>('featured');

  const classifyRepo = (repo: any): 'Silicon & RTL' | 'Power & Analog' | 'Software & Tools' => {
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
    return 'Software & Tools';
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
            .filter((r: any) => !r.fork && !r.name.toLowerCase().includes('filevault'))
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

  // Compute Language Distribution for the Telemetry Bar
  const languageStats = useMemo(() => {
    const counts: Record<string, number> = {};
    let total = 0;

    repos.forEach((r) => {
      if (r.language) {
        counts[r.language] = (counts[r.language] || 0) + 1;
        total += 1;
      }
    });

    return Object.entries(counts)
      .map(([lang, count]) => ({
        language: lang,
        count,
        percentage: ((count / total) * 100).toFixed(1),
        color: LANGUAGE_COLORS[lang] || '#A1A1AA'
      }))
      .sort((a, b) => b.count - a.count);
  }, [repos]);

  const filteredAndSortedRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        // Ensure filevault is never shown
        if (repo.name.toLowerCase().includes('filevault')) return false;

        // Category filter
        if (selectedCategory !== 'All' && repo.category !== selectedCategory) {
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
  }, [repos, searchQuery, selectedCategory, sortBy]);

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
    <section id="repositories" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-sky-400 mb-2">
            <Github className="w-3.5 h-3.5" />
            <span>~/saivarshithm/repos</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F4F4F5] tracking-tight">
            Repository Index
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Open-source digital silicon, power electronics, and developer toolchains synced with GitHub.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-white/[0.04] px-3.5 py-1.5 rounded-lg border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{repos.length} Repositories Online</span>
        </div>
      </div>

      {/* Language Telemetry Segmented Bar */}
      <div className="rounded-2xl border border-white/10 bg-[#111216] p-4 sm:p-5 mb-6 shadow-md">
        <div className="flex items-center justify-between text-xs font-mono mb-2.5">
          <span className="text-zinc-400 font-semibold">LANGUAGE TELEMETRY</span>
          <span className="text-zinc-500">{repos.length} Active Repositories</span>
        </div>

        {/* Multi-Segment Horizontal Bar */}
        <div className="w-full h-2 rounded-full overflow-hidden flex bg-white/5">
          {languageStats.map((item) => (
            <div
              key={item.language}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color
              }}
              title={`${item.language}: ${item.percentage}%`}
              className="h-full transition-all"
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-3 font-mono text-[11px] text-zinc-400">
          {languageStats.slice(0, 6).map((item) => (
            <div key={item.language} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-zinc-200 font-medium">{item.language}</span>
              <span className="text-zinc-500">({item.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="rounded-2xl p-4 sm:p-5 mb-8 border border-white/10 bg-[#111216] space-y-4 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search repositories by RTL, RISC-V, SPICE, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-400 transition-colors font-mono"
            />
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-4">
            <div className="relative">
              <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-9 pr-8 py-2 bg-black/40 border border-white/10 rounded-lg text-xs sm:text-sm text-zinc-200 font-medium font-mono focus:outline-none focus:border-sky-400 transition-colors appearance-none cursor-pointer"
              >
                <option value="featured">Order: Featured</option>
                <option value="updated">Order: Recently Updated</option>
                <option value="stars">Order: Stargazers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-mono text-zinc-400 flex items-center gap-1 shrink-0">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            Track:
          </span>
          {['All', 'Silicon & RTL', 'Power & Analog', 'Software & Tools'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-colors tap-target ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-white/[0.04] text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Repositories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedRepos.length > 0 ? (
          filteredAndSortedRepos.map((repo) => (
            <div
              key={repo.name}
              className="rounded-2xl p-5 border border-white/10 bg-[#111216] flex flex-col justify-between group hover:border-sky-400/40 hover:bg-[#14161c] transition-all shadow-md"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                    {repo.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors font-mono line-clamp-1">
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
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/5"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Meta & Links */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <span className="flex items-center gap-1 text-[11px] text-zinc-300">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#A1A1AA' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getRelativeTime(repo.updated_at)}
                  </span>
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md bg-white/[0.05] text-zinc-300 hover:text-white hover:bg-white/10 transition-colors tap-target"
                  aria-label={`View ${repo.name} on GitHub`}
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center rounded-2xl border border-white/10 bg-[#111216]">
            <Code2 className="w-8 h-8 text-sky-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-400">
              No repositories match current filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-mono text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

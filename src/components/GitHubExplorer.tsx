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

const CACHE_KEY = 'saivarshithm_github_repos_v3';
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
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.data) && parsed.data.length > 0) {
            setRepos(parsed.data);
            return;
          }
        }

        const response = await fetch('https://api.github.com/users/saivarshithm/repos?per_page=100&sort=updated');
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const formatted: GitHubRepoItem[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            full_name: item.full_name,
            description: item.description,
            html_url: item.html_url,
            homepage: item.homepage,
            stargazers_count: item.stargazers_count,
            forks_count: item.forks_count,
            language: item.language || 'Documentation',
            updated_at: item.updated_at,
            topics: item.topics || [],
            category: classifyRepo(item)
          }));

          const names = new Set(formatted.map((r) => r.name.toLowerCase()));
          FALLBACK_REPOS.forEach((fb) => {
            if (!names.has(fb.name.toLowerCase())) {
              formatted.push(fb);
            }
          });

          setRepos(formatted);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: formatted }));
        }
      } catch (err) {
        setRepos(FALLBACK_REPOS);
      }
    };

    fetchRepos();
  }, []);

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ['All', ...Array.from(langs)];
  }, [repos]);

  const filteredAndSortedRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        const matchesCategory = selectedCategory === 'All' || repo.category === selectedCategory;
        const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;
        const matchesSearch =
          searchQuery === '' ||
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.topics || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesLanguage && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
        if (sortBy === 'updated') return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        
        const priorityOrder = ['riscv', 'filevault', 'sky130', 'space-grade', 'uart', 'multilevel'];
        const aScore = priorityOrder.findIndex((k) => a.name.toLowerCase().includes(k));
        const bScore = priorityOrder.findIndex((k) => b.name.toLowerCase().includes(k));
        if (aScore !== -1 && bScore !== -1) return aScore - bScore;
        if (aScore !== -1) return -1;
        if (bScore !== -1) return 1;
        return b.stargazers_count - a.stargazers_count;
      });
  }, [repos, selectedCategory, selectedLanguage, searchQuery, sortBy]);

  const getRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays < 30) return `${diffDays}d ago`;
      const diffMonths = Math.floor(diffDays / 30);
      if (diffMonths < 12) return `${diffMonths}mo ago`;
      return `${Math.floor(diffMonths / 12)}y ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <section id="repositories" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#EBDFCD] text-xs font-semibold tracking-widest text-[#8C5E14] uppercase mb-3">
            <Github className="w-3.5 h-3.5" />
            <span>LIVE GITHUB SYNC</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2E241E]">
            Repository Index
          </h2>
          <p className="mt-1 text-sm text-[#5C3826]">
            Open-source digital silicon, power circuits, and platforms by <span className="font-bold text-[#2E241E]">@saivarshithm</span>.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#5C3826] bg-[#FAF6F0] px-3.5 py-1.5 rounded-full border border-[#EBDFCD]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{repos.length} Repositories Online</span>
        </div>
      </div>

      {/* Control Panel Toolbar */}
      <div className="paper-sheet rounded-[28px] p-5 sm:p-6 mb-8 border border-[#EBDFCD] bg-[#FBF8F2] space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C5E14]" />
            <input
              type="text"
              placeholder="Filter by RTL, RISC-V, SPICE, app, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EBDFCD] rounded-2xl text-xs sm:text-sm text-[#2E241E] placeholder-[#5C3826]/60 focus:outline-none focus:border-[#8C5E14] transition-all font-mono shadow-sm"
            />
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <div className="relative">
              <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C5E14] pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#EBDFCD] rounded-2xl text-xs sm:text-sm text-[#2E241E] font-medium focus:outline-none focus:border-[#8C5E14] transition-all appearance-none cursor-pointer shadow-sm"
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
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C5E14] pointer-events-none" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#EBDFCD] rounded-2xl text-xs sm:text-sm text-[#2E241E] font-medium focus:outline-none focus:border-[#8C5E14] transition-all appearance-none cursor-pointer shadow-sm"
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
          <span className="text-xs font-semibold text-[#5C3826] flex items-center gap-1.5 shrink-0">
            <Layers className="w-3.5 h-3.5 text-[#8C5E14]" />
            Category:
          </span>
          {['All', 'Silicon & RTL', 'Power & Analog', 'Vibe-Coded Apps & Tools'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 tap-target ${
                selectedCategory === cat
                  ? 'bg-[#171615] text-white shadow-sm'
                  : 'bg-white text-[#5C3826] hover:bg-[#FAF6F0] border border-[#EBDFCD]'
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
              className="paper-sheet paper-sheet-hover rounded-[24px] p-5 sm:p-6 border border-[#EBDFCD] bg-white flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C5E14] font-bold bg-[#FAF6F0] px-2.5 py-0.5 rounded-full border border-[#EBDFCD]">
                    {repo.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#5C3826]">
                    <span className="flex items-center gap-1 text-amber-700 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#2E241E] group-hover:text-[#8C5E14] transition-colors font-mono line-clamp-1">
                  {repo.name}
                </h3>

                <p className="mt-2 text-xs text-[#5C3826] leading-relaxed line-clamp-3">
                  {repo.description || 'Open-source engineering repository designed by Saivarshith Mitukula.'}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FAF6F0] text-[#5C3826] border border-[#EBDFCD]"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Meta & Links */}
              <div className="mt-5 pt-3 border-t border-[#EBDFCD] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF6F0] text-[#2E241E] font-semibold border border-[#EBDFCD]">
                      {repo.language}
                    </span>
                  )}
                  <span className="text-[10px] text-[#5C3826] flex items-center gap-1">
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
                      className="p-2 rounded-full bg-[#FAF6F0] text-[#2E241E] hover:bg-[#EFE8DC] border border-[#EBDFCD] transition-all tap-target"
                      aria-label={`View live demo of ${repo.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#171615] text-white hover:bg-[#262422] transition-all tap-target"
                    aria-label={`View ${repo.name} on GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center paper-sheet rounded-[28px] border border-[#EBDFCD] bg-white">
            <Code2 className="w-8 h-8 text-[#8C5E14] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#5C3826]">
              No repositories match current filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLanguage('All');
              }}
              className="mt-3 black-pill-button px-4 py-2 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

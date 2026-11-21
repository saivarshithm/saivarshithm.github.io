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

const CACHE_KEY = 'saivarshithm_github_repos_v2';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export const GitHubExplorer: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepoItem[]>(FALLBACK_REPOS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'updated' | 'stars'>('featured');

  // Classifier helper
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
        // Check sessionStorage cache
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.data) && parsed.data.length > 0) {
            setRepos(parsed.data);
            setIsCached(true);
            setIsLoading(false);
            return;
          }
        }

        // Fetch live from GitHub API
        const response = await fetch('https://api.github.com/users/saivarshithm/repos?per_page=100&sort=updated');
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
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

          // Merge any fallback-only high-value entries if not returned by API
          const names = new Set(formatted.map((r) => r.name.toLowerCase()));
          FALLBACK_REPOS.forEach((fb) => {
            if (!names.has(fb.name.toLowerCase())) {
              formatted.push(fb);
            }
          });

          setRepos(formatted);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: formatted }));
          setIsCached(false);
        } else {
          setRepos(FALLBACK_REPOS);
        }
      } catch (err) {
        console.warn('Falling back to local repository cache:', err);
        setRepos(FALLBACK_REPOS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Compute unique languages
  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ['All', ...Array.from(langs)];
  }, [repos]);

  // Filter and Sort Repositories
  const filteredAndSortedRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        const matchesCategory =
          selectedCategory === 'All' || repo.category === selectedCategory;
        const matchesLanguage =
          selectedLanguage === 'All' || repo.language === selectedLanguage;
        const matchesSearch =
          searchQuery === '' ||
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.topics || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesLanguage && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        }
        if (sortBy === 'updated') {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
        // Featured order: prefer Silicon, RISC-V, FileVault, Space Buck
        const priorityOrder = ['riscv', 'filevault', 'sky130', 'space-grade', 'uart', 'multilevel'];
        const aScore = priorityOrder.findIndex((k) => a.name.toLowerCase().includes(k));
        const bScore = priorityOrder.findIndex((k) => b.name.toLowerCase().includes(k));
        if (aScore !== -1 && bScore !== -1) return aScore - bScore;
        if (aScore !== -1) return -1;
        if (bScore !== -1) return 1;
        return b.stargazers_count - a.stargazers_count;
      });
  }, [repos, selectedCategory, selectedLanguage, searchQuery, sortBy]);

  // Relative time helper
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

  const getLanguageColor = (lang: string | null) => {
    switch (lang) {
      case 'Verilog':
      case 'SystemVerilog':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'TypeScript':
      case 'JavaScript':
        return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'MATLAB':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Ngspice':
      case 'LTspice':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'C':
      case 'C++':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <section id="repositories" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
            <Github className="w-3.5 h-3.5" />
            <span>LIVE GITHUB ECOSYSTEM SYNC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Repository Explorer
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Real-time telemetry and open-source contributions by{' '}
            <span className="text-white font-mono">@saivarshithm</span>.
          </p>
        </div>

        {/* Sync Status Badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/10 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isCached ? 'Cached Session (15m)' : 'Direct GitHub API'}</span>
          <span className="text-gray-500">·</span>
          <span>{repos.length} Repositories</span>
        </div>
      </div>

      {/* Control Panel: Search & Filter Toolbar */}
      <div className="card-glass rounded-2xl p-4 sm:p-5 mb-8 border border-white/10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Real-Time Search Bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search repos by name, RTL, keyword, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all font-mono"
            />
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <div className="relative">
              <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-9 pr-8 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-gray-200 font-mono focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
              >
                <option value="featured">Sort: Featured Work</option>
                <option value="updated">Sort: Recently Updated</option>
                <option value="stars">Sort: Most Stargazers</option>
              </select>
            </div>
          </div>

          {/* Language Selector */}
          <div className="md:col-span-3">
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-gray-200 font-mono focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
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

        {/* Domain Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
          <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5 shrink-0">
            <Layers className="w-3.5 h-3.5 text-gray-400" />
            Domain:
          </span>
          {['All', 'Silicon & RTL', 'Power & Analog', 'Vibe-Coded Apps & Tools'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-150 tap-target ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAndSortedRepos.length > 0 ? (
          filteredAndSortedRepos.map((repo) => (
            <div
              key={repo.name}
              className="card-glass rounded-2xl p-5 border border-white/10 flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-200 card-glass-hover"
            >
              <div>
                {/* Top Meta: Domain Badge + Stars */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/5">
                    {repo.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1 text-amber-400/90">
                      <Star className="w-3.5 h-3.5 fill-amber-400/30" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                {/* Repository Title */}
                <h3 className="text-base sm:text-lg font-bold text-white font-mono group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {repo.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs text-gray-300 leading-relaxed line-clamp-3">
                  {repo.description || 'Open source engineering module designed and maintained by Saivarshith.'}
                </p>

                {/* Topics / Tags */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.02] text-gray-400 border border-white/5"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Meta & Action Links */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <span className={`px-2 py-0.5 rounded-md text-[10px] border ${getLanguageColor(repo.language)}`}>
                      {repo.language}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
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
                      className="p-1.5 rounded-lg bg-sky-400/10 text-sky-400 hover:bg-sky-400/20 border border-sky-400/30 transition-all tap-target"
                      aria-label={`View live demo of ${repo.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all tap-target"
                    aria-label={`View source of ${repo.name} on GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center card-glass rounded-2xl border border-white/10">
            <Code2 className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm font-mono text-gray-400">
              No repositories match current filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLanguage('All');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-500 text-black font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

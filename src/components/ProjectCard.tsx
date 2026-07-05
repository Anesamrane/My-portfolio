import React from 'react';
import { Project } from '../types';
import { Code, ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  key?: string;
  project: Project;
  onOpenDetails: (project: Project) => void;
  isHighlighted: boolean;
}

export default function ProjectCard({ project, onOpenDetails, isHighlighted }: ProjectCardProps) {
  return (
    <div
      onClick={() => onOpenDetails(project)}
      className={`relative flex flex-col justify-between p-6 md:p-8 rounded-lg cursor-pointer transition-all duration-300 transform group border hover:scale-[1.01] ${
        isHighlighted
          ? 'bg-neutral-100 dark:bg-neutral-900 border-black dark:border-white shadow-lg ring-1 ring-black/10 dark:ring-white/10'
          : 'bg-white/50 dark:bg-[#171717]/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white hover:bg-neutral-50/80 dark:hover:bg-neutral-800/60 shadow-sm'
      }`}
    >
      <div>
        {/* Project tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 rounded text-[10px] font-mono tracking-wider text-neutral-500 dark:text-neutral-400 uppercase bg-neutral-100/40 dark:bg-[#1a1a1a]/40"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 tracking-tight group-hover:text-black dark:group-hover:text-white flex items-center gap-1.5">
          <span>{project.title}</span>
        </h3>

        {/* Description */}
        <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="flex gap-4">
          {project.codeUrl && (
            <span className="text-[10px] font-bold font-mono tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white">
              CODE
            </span>
          )}
          {project.demoUrl && (
            <span className="text-[10px] font-bold font-mono tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white">
              DEMO
            </span>
          )}
          {project.paperUrl && (
            <span className="text-[10px] font-bold font-mono tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white">
              PAPER
            </span>
          )}
          {project.liveUrl && (
            <span className="text-[10px] font-bold font-mono tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white">
              LIVE
            </span>
          )}
        </div>

        <span className="text-[10px] font-bold font-mono tracking-wider text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white flex items-center gap-1 transition-all group-hover:translate-x-1">
          <span>INTERACT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

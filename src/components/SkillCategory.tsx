import React, { useState } from 'react';
import { SkillCategory as SkillCat, Skill } from '../types';
import * as Icons from 'lucide-react';

interface SkillCategoryProps {
  key?: string;
  category: SkillCat;
  onSkillHover: (projectIds: string[]) => void;
  onSkillLeave: () => void;
  hoveredSkill: string | null;
  setHoveredSkill: (skillName: string | null) => void;
}

export default function SkillCategory({
  category,
  onSkillHover,
  onSkillLeave,
  hoveredSkill,
  setHoveredSkill
}: SkillCategoryProps) {
  // Mapping Material Symbols text to Lucide Icons
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'psychology':
        return <Icons.BrainCircuit className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />;
      case 'visibility':
        return <Icons.Eye className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />;
      case 'translate':
        return <Icons.Languages className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />;
      case 'hub':
        return <Icons.Network className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />;
      case 'code':
        return <Icons.Code className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />;
      case 'build':
        return <Icons.Wrench className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />;
      default:
        return <Icons.Layers className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />;
    }
  };

  return (
    <div className="space-y-5 p-5 rounded-lg border border-neutral-200/50 dark:border-neutral-800/60 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-sm shadow-sm hover:border-black dark:hover:border-white transition-all duration-300">
      {/* Category Title */}
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2.5 tracking-tight border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
        {renderIcon(category.icon)}
        <span>{category.title}</span>
      </h3>

      {/* Grid of skills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => {
          const isHovered = hoveredSkill === skill.name;
          return (
            <div
              key={skill.name}
              className="relative inline-block"
              onMouseEnter={() => {
                setHoveredSkill(skill.name);
                onSkillHover(skill.projects);
              }}
              onMouseLeave={() => {
                setHoveredSkill(null);
                onSkillLeave();
              }}
              onClick={() => {
                // Persistent toggle on mobile
                if (hoveredSkill === skill.name) {
                  setHoveredSkill(null);
                  onSkillLeave();
                } else {
                  setHoveredSkill(skill.name);
                  onSkillHover(skill.projects);
                }
              }}
            >
              {/* Skill tag */}
              <button
                className={`px-3 py-1.5 border rounded text-[11px] font-mono tracking-wide font-medium transition-all duration-200 cursor-help ${
                  isHovered
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow'
                    : 'bg-transparent text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-500 dark:hover:border-neutral-500'
                }`}
              >
                {skill.name}
              </button>

              {/* Enhanced Floating Tooltip */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 p-3 bg-neutral-950 text-white border border-neutral-800 rounded shadow-xl z-20 text-left text-[10px] space-y-1.5 pointer-events-none animate-fade-in font-mono">
                  <div className="flex justify-between font-bold border-b border-neutral-800 pb-1">
                    <span className="text-white font-sans text-[11px]">{skill.name}</span>
                    <span className="text-neutral-400">{skill.years} Yrs Exp</span>
                  </div>
                  
                  {/* Skill level indicator stars */}
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className="text-[10px]">
                        {index < skill.level ? '★' : '☆'}
                      </span>
                    ))}
                  </div>

                  <p className="text-neutral-400 leading-normal font-sans text-[10px]">
                    {skill.description}
                  </p>

                  {skill.projects.length > 0 && (
                    <div className="text-[8px] text-neutral-500 dark:text-neutral-400 border-t border-neutral-800 pt-1.5 flex items-center justify-between">
                      <span>HIGHLIGHTS PROJECTS</span>
                      <span className="bg-neutral-800 px-1 rounded text-white font-bold">{skill.projects.length}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

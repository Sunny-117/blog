<template>
  <div class="project-card" :class="{ featured: project.featured }">
    <a :href="`https://github.com/${project.repo}`" target="_blank" rel="noopener" class="card-link">
      <div class="card-inner">
        <div class="icon-wrapper">
          <span class="icon">{{ project.icon || '📦' }}</span>
        </div>
        
        <h3 class="project-name">{{ project.name }}</h3>
        
        <p class="project-description">{{ project.description }}</p>
        
        <div class="card-footer">
          <div class="stars">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
            </svg>
            <img
              :src="`https://img.shields.io/github/stars/${project.repo}?style=flat-square&label=&color=blue`"
              :alt="`${project.name} stars`"
            />
          </div>
          
          <div class="links">
            <span class="link-icon" title="GitHub">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </span>
            <span v-if="project.homepage" class="link-icon" title="Documentation">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div class="tags" v-if="project.tags && project.tags.length">
          <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../../projects'

defineProps<{
  project: Project
}>()
</script>

<style scoped>
.project-card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
}

.dark .project-card {
  background: rgba(30, 30, 35, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(30, 64, 175, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.project-card:hover::before {
  opacity: 1;
}

.project-card.featured {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(30, 64, 175, 0.08));
  border-color: rgba(59, 130, 246, 0.3);
}

.dark .project-card.featured {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(30, 64, 175, 0.12));
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  border-color: rgba(59, 130, 246, 0.4);
}

.dark .project-card:hover {
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.card-inner {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(30, 64, 175, 0.1));
  border-radius: 12px;
  margin-bottom: 2px;
}

.icon {
  font-size: 28px;
  line-height: 1;
}

.project-name {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-description {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 36px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
  margin-top: auto;
}

.stars {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--vp-c-text-3);
  font-size: 11px;
}

.stars svg {
  opacity: 0.6;
  width: 11px;
  height: 11px;
}

.stars img {
  height: 15px;
  opacity: 0.8;
}

.links {
  display: flex;
  gap: 6px;
}

.link-icon {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  transition: all 0.2s;
}

.link-icon svg {
  width: 14px;
  height: 14px;
}

.link-icon:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.1);
}

.dark .link-icon {
  background: rgba(96, 165, 250, 0.15);
  color: #93c5fd;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 2px;
}

.tag {
  display: inline-block;
  padding: 2px 7px;
  font-size: 10px;
  font-weight: 500;
  background: rgba(59, 130, 246, 0.08);
  color: #3b82f6;
  border-radius: 5px;
  letter-spacing: 0.01em;
}

.dark .tag {
  background: rgba(96, 165, 250, 0.12);
  color: #93c5fd;
}
</style>

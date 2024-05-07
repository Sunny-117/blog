<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme';
import { useGlobalStore } from '@/stores/modules/global';

const globalStore = useGlobalStore();

const { switchTheme, initTheme,activeOSTheme } = useTheme();

initTheme();

const modeSwitch = () => { 
  // const theme = document.documentElement.className;
  // document.documentElement.className = theme === 'primary' ? 'dark' : 'primary';

  switchTheme();
}

const osThemeSwitch = () => { 
  activeOSTheme();
}
</script>

<template>
  <div class="app-container">
    <div class="app-header">
      <div class="app-header-left">
        <span class="app-icon"></span>
        <p class="app-name">PortSide</p>
        <div class="search-wrapper">
          <input class="search-input" type="text" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="feather feather-search"
            viewBox="0 0 24 24"
          >
            <defs></defs>
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
      </div>
      
      <div class="app-header-right">
        <button :class="globalStore.osThemeActive ? 'os-default-active' : 'os-default'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" role="img" @click="osThemeSwitch">
            <circle cx="8" cy="8" r="7.25" stroke="#5B5B66" stroke-width="1.5"/>
              <mask id="a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
            <circle cx="8" cy="8" r="7.25" fill="#5B5B66" stroke="#5B5B66" stroke-width="1.5"/>
            </mask>
            <g mask="url(#a)">
              <path fill="#5B5B66" d="M0 0h8v16H0z"/>
            </g>
          </svg>
        </button>
        <button class="mode-switch" title="Switch Theme" @click="modeSwitch">
          <svg
            class="moon"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <defs></defs>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
          <svg
            class="sun"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
            ></path>
            <path
              d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"
            ></path>
            <path
              d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"
            ></path>
            <path
              d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
            ></path>
            <path
              d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
            ></path>
            <path
              d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"
            ></path>
            <path
              d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"
            ></path>
            <path
              d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
            ></path>
            <path
              d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
            ></path>
          </svg>
        </button>
        <button class="add-btn" title="Add New Project">
          <svg
            class="btn-icon feather feather-plus"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button class="notification-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-bell"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button class="profile-btn">
          <img src="https://picsum.photos/100/100?r=0" />
          <span>Amelia</span>
        </button>
      </div>
      <button class="messages-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-message-circle"
        >
          <path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          />
        </svg>
      </button>
    </div>
    <div class="app-content">
      <div class="app-sidebar">
        <a href="" class="app-sidebar-link active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-home"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </a>
        <a href="" class="app-sidebar-link">
          <svg
            class="link-icon feather feather-pie-chart"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <defs />
            <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
          </svg>
        </a>
        <a href="" class="app-sidebar-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-calendar"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </a>
        <a href="" class="app-sidebar-link">
          <svg
            class="link-icon feather feather-settings"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <defs />
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
            />
          </svg>
        </a>
      </div>
      <div class="projects-section">
        <div class="projects-section-header">
          <p>Projects</p>
          <p class="time">July, 12</p>
        </div>
        <div class="projects-section-line">
          <div class="projects-status">
            <div class="item-status">
              <span class="status-number">45</span>
              <span class="status-type">In Progress</span>
            </div>
            <div class="item-status">
              <span class="status-number">24</span>
              <span class="status-type">Upcoming</span>
            </div>
            <div class="item-status">
              <span class="status-number">62</span>
              <span class="status-type">Total Projects</span>
            </div>
          </div>
          <div class="view-actions">
            <button class="view-btn list-view" title="List View">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-list"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
            <button class="view-btn grid-view active" title="Grid View">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-grid"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>
        </div>
        <div class="project-boxes jsGridView">
          <div class="project-box-wrapper">
            <div class="project-box" style="background-color: #fee4cb">
              <div class="project-box-header">
                <span>July 10, 2023</span>
                <div class="more-wrapper">
                  <button class="project-btn-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-more-vertical"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="project-box-content-header">
                <p class="box-content-header">Web Designing</p>
                <p class="box-content-subheader">Prototyping</p>
              </div>
              <div class="box-progress-wrapper">
                <p class="box-progress-header">Progress</p>
                <div class="box-progress-bar">
                  <span
                    class="box-progress"
                    style="width: 60%; background-color: #ff942e"
                  ></span>
                </div>
                <p class="box-progress-percentage">60%</p>
              </div>
              <div class="project-box-footer">
                <div class="participants">
                  <img
                    src="https://picsum.photos/100/100?r=1"
                    alt="participant"
                  />
                  <img
                    src="https://picsum.photos/100/100?r=2"
                    alt="participant"
                  />
                  <button class="add-participant" style="color: #ff942e">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div class="days-left" style="color: #ff942e">2 Days Left</div>
              </div>
            </div>
          </div>
          <div class="project-box-wrapper">
            <div class="project-box" style="background-color: #e9e7fd">
              <div class="project-box-header">
                <span>July 10, 2023</span>
                <div class="more-wrapper">
                  <button class="project-btn-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-more-vertical"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="project-box-content-header">
                <p class="box-content-header">Testing</p>
                <p class="box-content-subheader">Coding</p>
              </div>
              <div class="box-progress-wrapper">
                <p class="box-progress-header">Progress</p>
                <div class="box-progress-bar">
                  <span
                    class="box-progress"
                    style="width: 50%; background-color: #4f3ff0"
                  ></span>
                </div>
                <p class="box-progress-percentage">50%</p>
              </div>
              <div class="project-box-footer">
                <div class="participants">
                  <img
                    src="https://picsum.photos/100/100?r=4"
                    alt="participant"
                  />
                  <img
                    src="https://picsum.photos/100/100?r=5"
                    alt="participant"
                  />
                  <button class="add-participant" style="color: #4f3ff0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div class="days-left" style="color: #4f3ff0">2 Days Left</div>
              </div>
            </div>
          </div>
          <div class="project-box-wrapper">
            <div class="project-box" style="background-color: #dbf6fd">
              <div class="project-box-header">
                <span>July 10, 2023</span>
                <div class="more-wrapper">
                  <button class="project-btn-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-more-vertical"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="project-box-content-header">
                <p class="box-content-header">Svg Animations</p>
                <p class="box-content-subheader">Prototyping</p>
              </div>
              <div class="box-progress-wrapper">
                <p class="box-progress-header">Progress</p>
                <div class="box-progress-bar">
                  <span
                    class="box-progress"
                    style="width: 80%; background-color: #096c86"
                  ></span>
                </div>
                <p class="box-progress-percentage">80%</p>
              </div>
              <div class="project-box-footer">
                <div class="participants">
                  <img
                    src="https://picsum.photos/100/100?r=1"
                    alt="participant"
                  />
                  <img
                    src="https://picsum.photos/100/100?r=4"
                    alt="participant"
                  />
                  <button class="add-participant" style="color: #096c86">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div class="days-left" style="color: #096c86">2 Days Left</div>
              </div>
            </div>
          </div>
          <div class="project-box-wrapper">
            <div class="project-box" style="background-color: #ffd3e2">
              <div class="project-box-header">
                <span>July 10, 2023</span>
                <div class="more-wrapper">
                  <button class="project-btn-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-more-vertical"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="project-box-content-header">
                <p class="box-content-header">UI Development</p>
                <p class="box-content-subheader">Prototyping</p>
              </div>
              <div class="box-progress-wrapper">
                <p class="box-progress-header">Progress</p>
                <div class="box-progress-bar">
                  <span
                    class="box-progress"
                    style="width: 20%; background-color: #df3670"
                  ></span>
                </div>
                <p class="box-progress-percentage">20%</p>
              </div>
              <div class="project-box-footer">
                <div class="participants">
                  <img
                    src="https://picsum.photos/100/100?r=2"
                    alt="participant"
                  />
                  <img
                    src="https://picsum.photos/100/100?r=3"
                    alt="participant"
                  />
                  <button class="add-participant" style="color: #df3670">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div class="days-left" style="color: #df3670">2 Days Left</div>
              </div>
            </div>
          </div>
          <div class="project-box-wrapper">
            <div class="project-box" style="background-color: #c8f7dc">
              <div class="project-box-header">
                <span>July 10, 2023</span>
                <div class="more-wrapper">
                  <button class="project-btn-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-more-vertical"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="project-box-content-header">
                <p class="box-content-header">Data Analysis</p>
                <p class="box-content-subheader">Prototyping</p>
              </div>
              <div class="box-progress-wrapper">
                <p class="box-progress-header">Progress</p>
                <div class="box-progress-bar">
                  <span
                    class="box-progress"
                    style="width: 60%; background-color: #34c471"
                  ></span>
                </div>
                <p class="box-progress-percentage">60%</p>
              </div>
              <div class="project-box-footer">
                <div class="participants">
                  <img
                    src="https://picsum.photos/100/100?r=6"
                    alt="participant"
                  />
                  <img
                    src="https://picsum.photos/100/100?r=7"
                    alt="participant"
                  />
                  <button class="add-participant" style="color: #34c471">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div class="days-left" style="color: #34c471">2 Days Left</div>
              </div>
            </div>
          </div>
          <div class="project-box-wrapper">
            <div class="project-box" style="background-color: #d5deff">
              <div class="project-box-header">
                <span>July 10, 2023</span>
                <div class="more-wrapper">
                  <button class="project-btn-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-more-vertical"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="project-box-content-header">
                <p class="box-content-header">Developing</p>
                <p class="box-content-subheader">Coding</p>
              </div>
              <div class="box-progress-wrapper">
                <p class="box-progress-header">Progress</p>
                <div class="box-progress-bar">
                  <span
                    class="box-progress"
                    style="width: 40%; background-color: #4067f9"
                  ></span>
                </div>
                <p class="box-progress-percentage">40%</p>
              </div>
              <div class="project-box-footer">
                <div class="participants">
                  <img
                    src="https://picsum.photos/100/100?r=8"
                    alt="participant"
                  />
                  <img
                    src="https://picsum.photos/100/100?r=9"
                    alt="participant"
                  />
                  <button class="add-participant" style="color: #4067f9">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div class="days-left" style="color: #4067f9">2 Days Left</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="messages-section">
        <button class="messages-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
        <div class="projects-section-header">
          <p>Client Messages</p>
        </div>
        <div class="messages">
          <div class="message-box">
            <img src="https://picsum.photos/100/100?r=1" alt="profile image" />
            <div class="message-content">
              <div class="message-header">
                <div class="name">Alexander</div>
                <div class="star-checkbox">
                  <input type="checkbox" id="star-1" />
                  <label for="star-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-star"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <p class="message-line">
                Our recent research findings have provided valuable insights and
                direction for the project.😄
              </p>
              <p class="message-line time">Jul, 12</p>
            </div>
          </div>
          <div class="message-box">
            <img src="https://picsum.photos/100/100?r=2" alt="profile image" />
            <div class="message-content">
              <div class="message-header">
                <div class="name">Benjamin</div>
                <div class="star-checkbox">
                  <input type="checkbox" id="star-2" />
                  <label for="star-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-star"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <p class="message-line">
                We have implemented a new feature that significantly enhances
                the functionality of our product.
              </p>
              <p class="message-line time">Jul, 12</p>
            </div>
          </div>
          <div class="message-box">
            <img src="https://picsum.photos/100/100?r=3" alt="profile image" />
            <div class="message-content">
              <div class="message-header">
                <div class="name">Matthew</div>
                <div class="star-checkbox">
                  <input type="checkbox" id="star-3" />
                  <label for="star-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-star"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <p class="message-line">
                We made progress on the project, completed development phase,
                and began testing. 🤩
              </p>
              <p class="message-line time">Jul, 12</p>
            </div>
          </div>
          <div class="message-box">
            <img src="https://picsum.photos/100/100?r=4" alt="profile image" />
            <div class="message-content">
              <div class="message-header">
                <div class="name">Jessica</div>
                <div class="star-checkbox">
                  <input type="checkbox" id="star-4" />
                  <label for="star-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-star"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <p class="message-line">
                The project is progressing smoothly and we anticipate meeting
                all project milestones.
              </p>
              <p class="message-line time">Jul, 11</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
html, body {
  width: 100%;
  height: 100vh;
  margin: 0;
}

body {
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
  display: flex;
  justify-content: center;
  @include background_color(app-container);
}

button, a {
  cursor: pointer;
}

.app {
  &-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    @include background_color(app-container);
    transition: .2s;
    max-width: 1800px;
    
    button, input, optgroup, select, textarea {
      font-family: 'DM Sans', sans-serif;
    }
  }
  
  &-content {
    display: flex;
    height: 100%;
    overflow: hidden;
    padding: 16px 24px 24px 0;
  }
  
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px 24px;
    position: relative;
    
    &-left, &-right {
      display: flex;
      align-items: center;
    }
    
    &-left { flex-grow: 1; } 
    
    &-right button {
      margin-left: 10px; 
    }
  }
  
  &-icon {
    width: 26px;
    height: 2px;
    border-radius: 4px;
    @include background_color(main-color);
    position: relative;
    
    &:before, &:after {
      content: '';
      position: absolute;
      width: 12px;
      height: 2px;
      border-radius: 4px;
      @include background_color(main-color);
      left: 50%;
      transform: translatex(-50%);
    }
    
    &:before { top: -6px; }
    &:after { bottom: -6px; }
  }
  
  &-name {
    @include font_color(main-color);
    margin: 0;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    margin: 0 32px;
  }
}

.os-default{
  background-color: transparent;
  border: none;
  padding: 0;
  @include font_color(main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
}

.os-default-active{
  background-color: transparent;
  padding: 0px;
  @include themeMixin{
    border: 1px dotted getVar(main-color);
    color: getVar(main-color);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
}

.mode-switch {
  background-color: transparent;
  border: none;
  padding: 0;
  @include font_color(main-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.sun{
  opacity: 1;
  transition: all .5s;
}
.moon, .dark .sun{
  opacity: 0;
}
.dark .moon{
  opacity: 1;
  transition: all .5s;
}

.search-wrapper {
  border-radius: 20px;
  @include themeMixin{
    background-color: getVar(search-area-bg);
    color: getVar(light-font);
  }
  padding-right: 12px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
  overflow: hidden;
  
  .dark & { box-shadow: none; }
}

.search-input {
  border: none;
  flex: 1;
  outline: none;
  height: 100%;
  padding: 0 20px;
  font-size: 16px;
  @include themeMixin{
    background-color: getVar(search-area-bg);
    color: getVar(main-color);
    &:placeholder {
      color: getVar(main-color);
      opacity: .6;
    }
  }
}

.add-btn {
  color: #fff;
  @include background_color(button-bg);
  padding: 0;
  border: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-btn {
  @include font_color(main-color);
  padding: 0;
  border: 0;
  background-color: transparent;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-btn {
  padding: 0;
  border: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 12px;
  border-left: 2px solid #ddd;
  
  img {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 4px;
  }
  
  span {
    @include font_color(main-color);
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
  }
}

.page-content {
  flex: 1;
  width: 100%;
}

.app-sidebar {
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &-link {
    @include font_color(link-color);
    margin: 16px 0;
    transition: .2s;
    border-radius: 50%;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      @include background-color(link-color-hover);
      @include font-color(link-color-active);
    }

    &.active {
      @include background-color(link-color-active-bg);
      @include font-color(link-color-active);
    }
  }
}

.projects-section {
  flex: 2;
  @include background-color(projects-section);
  border-radius: 32px;
  padding: 32px 32px 0 32px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 32px;
  }
  
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    @include font_color(main-color);
    
    p {
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
      opacity: .9;
      margin: 0;
      @include font_color(main-color);
    }
    
    .time {
      font-size: 20px;
    }
  }
}

.projects-status {
  display: flex;
}

.item-status {
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  
  &:not(:last-child) .status-type:after {
    content: '';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translatey(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 1px solid; 
    @include border-color(secondary-color);
  }
}

.status-number {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  @include font_color(main-color);
}

.status-type {
  position: relative;
  padding-right: 24px;
  @include font_color(secondary-color);
}

.view-actions {
  display: flex;
  align-items: center;
}


.view-btn {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  @include font_color(main-color);
  margin-left: 8px;
  transition: .2s;
  
  
  &.active {
    @include background-color(link-color-active-bg);
    @include font-color(link-color-active);
  }
  &:not(.active):hover {
    @include background-color(link-color-hover);
    @include font-color(link-color-active);
  }
  
}


.messages-section {
  flex-shrink: 0;
  padding-bottom: 32px;
  @include background-color(projects-section);
  margin-left: 24px;
  flex: 1;
  width: 100%;
  border-radius: 30px;
  position: relative;
  overflow: auto;
  transition: all 300ms cubic-bezier(0.19, 1, 0.56, 1);
  
  .messages-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 3;
    border: none;
    background-color: transparent;
    @include font_color(main-color);
    display: none;
  }
  
  &.show {
    transform: translateX(0);
    opacity: 1;
    margin-left: 0;
  }
  
  .projects-section-header {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 32px 24px 0 24px;
    @include background-color(projects-section);
  }
}

.message-box {
  padding: 16px;
  display: flex;
  align-items: flex-start;
  width: 100%;

  @include themeMixin{
    border-top: 1px solid getVar(message-box-border);
    &:hover {
      background-color: getVar(message-box-hover);
      border-top-color: getVar(link-color-hover);
      
      + .message-box {
        border-top-color: getVar(link-color-hover);
      }
    }
  }
  
  img {
    border-radius: 50%;
    object-fit: cover;
    width: 40px;
    height: 40px;
  }
}

.message-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  .name {
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    @include font_color(main-color);
    margin: 0;
  }
}

.message-content {
  padding-left: 16px;
  width: 100%;
}

.star-checkbox {
  input {
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
  }
  
  label {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .dark & {
    @include font_color(secondary-color);
    
    
    
    input:checked + label {
      @include font_color(star);
    }
  }
  
  input:checked + label svg {
    @include themeMixin{
      fill: getVar(star);
    }
    transition: .2s;
  }
}

.message-line {
  font-size: 14px;
  line-height: 20px;
  margin: 8px 0;
  @include font_color(secondary-color);
  opacity: .7;
  
  &.time {
    text-align: right;
    margin-bottom: 0;
  }
}

.project-boxes {
  margin: 0 -8px;
  overflow-y: auto;
  
  &.jsGridView {
    display: flex;
    flex-wrap: wrap;
    
    .project-box-wrapper {
      width: 33.3%;
    }
  }
  
  &.jsListView {
    .project-box {
      display: flex;
      border-radius: 10px;
      position: relative;
      > * {
        margin-right: 24px;
      }
    }
    
    .more-wrapper {
      position: absolute;
      right: 16px;
      top: 16px;
    }
    
    .project-box-content-header {
      order: 1;
      max-width: 120px;
    }
    
    .project-box-header {
      order: 2;
    }
    
    .project-box-footer {
      order: 3;
      padding-top: 0;
      flex-direction: column;
      justify-content: flex-start;
    }
    
    .project-box-footer:after {
      display: none;
    }
    
    .participants {
      margin-bottom: 8px;
    }
    
    .project-box-content-header p {
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    
    .project-box-header > span {
      position: absolute;
      bottom: 16px;
      left: 16px;
      font-size: 12px;
    }
    
    .box-progress-wrapper {
      order: 3;
      flex: 1;
    }
  }
}

.project-box {
  border-radius: 30px;
  padding: 16px;
  
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    @include font_color(main-color);
    
    span {
      color: #4A4A4A;
      opacity: .7;
      font-size: 14px;
      line-height: 16px;
    }
  }
  
  &-content-header {
    text-align: center;
    margin-bottom: 16px;
    
    p { margin: 0; }
  }
  
  &-wrapper {
    padding: 8px;
    transition: .2s;
  }
}

.project-btn-more {
  padding: 0;
  height: 14px;
  width: 24px;
  height: 24px;
  position: relative;
  background-color: transparent;
  border: none;
  flex-shrink: 0;
  
  /*&:after, &:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-@include font_color(main-color);
    opacity: .8;
    left: 50%;
    transform: translatex(-50%);
  }
  
  &:before { top: 0;}
  &:after { bottom: 0; }*/
}

.more-wrapper {
  position: relative;
}

.box-content-header {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  opacity: .7;
}

.box-content-subheader {
  font-size: 14px;
  line-height: 24px;
  opacity: .7;
}

.box-progress {
  display: block;
  height: 4px;
  border-radius: 6px;
  
  &-bar {
    width: 100%;
    height: 4px;
    border-radius: 6px;
    overflow: hidden;
    background-color: #fff;
    margin: 8px 0;
  }
  
  &-header {
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    margin: 0;
  }
    
  &-percentage {
    text-align: right;
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
  }
}

.project-box-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    background-color: rgba(255,255,255,0.6);;
    width: calc(100% + 32px);
    top: 0;
    left: -16px;
    height: 1px;
  }
}

.participants {
  display: flex;
  align-items: center;
  
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    
    &:not(:first-child) {
      margin-left: -8px;
    }
  }
}

.add-participant {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255,255,255,0.6);
  margin-left: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.days-left {
  background-color: rgba(255,255,255,0.6);
  font-size: 12px;
  border-radius: 20px;
  flex-shrink: 0;
  padding: 6px 16px;
  font-weight: 700;
}

.mode-switch.active .moon {
  @include themeMixin{
    fill: getVar(main-color);
  }
}

.messages-btn {
  border-radius: 4px 0 0 4px;
  position: absolute;
  right: 0;
  top: 58px;
  @include background-color(message-btn);
  border: none;
  @include font_color(main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  display: none;
}

@media screen and (max-width: 980px) {
  .project-boxes.jsGridView .project-box-wrapper {
    width: 50%;
  }
  
  .status-number, .status-type {
    font-size: 14px;
  }
  
  .status-type:after {
    width: 4px;
    height: 4px;
  }
  
  .item-status { margin-right: 0; }
}

@media screen and (max-width: 880px) {
  .messages-section {
    transform: translateX(100%);
    position: absolute;
    opacity: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    
    .messages-close { display: block; }
  }
  
  .messages-btn { display: flex; }
}

@media screen and (max-width: 720px) {
  .app-name, .profile-btn span { display: none; }
  
  .add-btn, .notification-btn, .mode-switch {
    width: 20px;
    height: 20px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  .app-header-right button {
    margin-left: 4px;
  }
}

@media screen and (max-width: 520px) {
  .projects-section { overflow: auto; }
  .project-boxes { overflow-y: visible; }
  
  .app-sidebar, .app-icon { display: none; }
  
  .app-content { padding: 16px 12px 24px 12px;}
  
  .status-number, .status-type {
    font-size: 10px;
  }
  
  .view-btn {
    width: 24px;
    height: 24px;
  }
  
  .app-header {
    padding: 16px 10px;
  }
  
  .search-input {
    max-width: 120px;
  }
  
  .project-boxes.jsGridView .project-box-wrapper {
    width: 100%;
  }
  
  .projects-section {
    padding: 24px 16px 0 16px;
  }
  
  .profile-btn img {
    width: 24px;
    height: 24px;
  }
  
  .app-header {
    padding: 10px;
  }
  
  .projects-section-header p,
  .projects-section-header .time{
    font-size: 18px;
  }
  
  .status-type {
    padding-right: 4px;
    
    &:after {
      display: none;
    }
  }
  
  .search-input {
    font-size: 14px;
  }
  
  .messages-btn { top: 48px; }

  .box-content-header {
    font-size: 12px;
    line-height: 16px;
  }

  .box-content-subheader {
    font-size: 12px;
    line-height: 16px;
  }

  .project-boxes.jsListView .project-box-header > span {
    font-size: 10px;
  }

  .box-progress-header {
    font-size: 12px;
  }

  .box-progress-percentage {
    font-size: 10px;
  }

  .days-left {
    font-size: 8px;
    padding: 6px 6px;
    text-align: center;
  }

  .project-boxes.jsListView .project-box > * {
    margin-right: 10px;
  }

  .project-boxes.jsListView .more-wrapper {
    right: 2px;
    top: 10px;
  }
}
</style>
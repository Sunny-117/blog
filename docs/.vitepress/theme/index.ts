import Theme from "vitepress/theme";
import "./style/var.css";
import { EnhanceAppContext } from "vitepress";
import ProjectList from "./components/ProjectList.vue";
import ProjectCard from "./components/ProjectCard.vue";

export default {
  ...Theme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('ProjectList', ProjectList);
    app.component('ProjectCard', ProjectCard);
  },
  // async enhanceApp({ app, router }: EnhanceAppContext) {
  //   if (!import.meta.env.SSR) {
  //     const { loadOml2d } = await import("oh-my-live2d");
  //     loadOml2d({
  //       models: [
  //         {
  //           path: "https://note.bingkele.cc/models/Kar98k-normal/model.json",
  //           position: [0, 60],
  //           scale: 0.08,
  //           stageStyle: {
  //             height: 450,
  //           },
  //         },
  //         {
  //           path: "https://note.bingkele.cc/models/HK416-1-normal/model.json",
  //           position: [0, 60],
  //           scale: 0.08,
  //           stageStyle: {
  //             height: 450,
  //           },
  //         },
  //         {
  //           path: "https://note.bingkele.cc/models/HK416-2-destroy/model.json",
  //           position: [0, 60],
  //           scale: 0.08,
  //           stageStyle: {
  //             height: 450,
  //           },
  //         },
  //         {
  //           path: "https://note.bingkele.cc/models/HK416-2-normal/model.json",
  //           position: [0, 60],
  //           scale: 0.08,
  //           stageStyle: {
  //             height: 450,
  //           },
  //         },
  //       ],
  //     });
  //   }
  // },
};

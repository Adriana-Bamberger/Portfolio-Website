// Project Images
import pushpayImg from '../public/Images/Projects/pushpay.png'
import wedProImg from '../public/Images/Projects/wedpro.png'
import ootdImg from '../public/Images/Projects/ootd.png'
import devAcademyImg from '../public/Images/Projects/dev-academy.png'
import portfolioImg from '../public/Images/Projects/portfolio.png'
import wychImg from '../public/Images/Projects/wych.png'
// Skill Images
import apollo from '../public/Images/Skills/apollo.png'
import aws from '../public/Images/Skills/aws.png'
import azureDevOps from '../public/Images/Skills/azure-dev-ops.png'
import canva from '../public/Images/Skills/canva.png'
import chilliCreme from '../public/Images/Skills/chilli-creme.png'
import conflunece from '../public/Images/Skills/confluence.png'
import csharp from '../public/Images/Skills/csharp.png'
import docker from '../public/Images/Skills/docker.png'
import dotNet from '../public/Images/Skills/dot-net.png'
import excel from '../public/Images/Skills/excel.png'
import expo from '../public/Images/Skills/expo.png'
import expressJs from '../public/Images/Skills/express-js.png'
import figma from '../public/Images/Skills/figma.png'
import filament from '../public/Images/Skills/filament.png'
import firebase from '../public/Images/Skills/firebase.png'
import flowbiteSvelte from '../public/Images/Skills/flowbite-svelte.png'
import flowbite from '../public/Images/Skills/flowbite.png'
import gitHub from '../public/Images/Skills/github.png'
import gitHubDesktop from '../public/Images/Skills/github-desktop.png'
import gmail from '../public/Images/Skills/gmail.png'
import googleCalendar from '../public/Images/Skills/google-calendar.png'
import googleDocs from '../public/Images/Skills/google-docs.png'
import googleSheets from '../public/Images/Skills/google-sheets.png'
import google from '../public/Images/Skills/google.png'
import graphql from '../public/Images/Skills/graphql.png'
import harvest from '../public/Images/Skills/harvest.png'
import hotChoc from '../public/Images/Skills/hotchoc.png'
import html5 from '../public/Images/Skills/html5.png'
import jenkins from '../public/Images/Skills/jenkins.png'
import jira from '../public/Images/Skills/jira.png'
import js from '../public/Images/Skills/js.png'
import keycloak from '../public/Images/Skills/keycloak.png'
import kiwibank from '../public/Images/Skills/kiwibank.png'
import knex from '../public/Images/Skills/knex.png'
import laragon from '../public/Images/Skills/laragon.png'
import laravel from '../public/Images/Skills/laravel.png'
import mediBangPaint from '../public/Images/Skills/medi-bang-paint.png'
import microsoftTeams from '../public/Images/Skills/microsoft-teams.png'
import mySqlWorkbench from '../public/Images/Skills/my-sql-workbench.png'
import node from '../public/Images/Skills/node.png'
import notion from '../public/Images/Skills/notion.png'
import npm from '../public/Images/Skills/npm.png'
import openTel from '../public/Images/Skills/open-tel.png'
import playwright from '../public/Images/Skills/playwright.png'
import postman from '../public/Images/Skills/postman.png'
import reactJs from '../public/Images/Skills/react-js.png'
import reactNative from '../public/Images/Skills/react-native.png'
import sass from '../public/Images/Skills/sass.png'
import sketchbook from '../public/Images/Skills/sketchbook.png'
import slack from '../public/Images/Skills/slack.png'
import sql from '../public/Images/Skills/sql.png'
import sqLite from '../public/Images/Skills/sq-lite.png'
import storybook from '../public/Images/Skills/storybook.png'
import svelte from '../public/Images/Skills/svelte.png'
import tailwind from '../public/Images/Skills/tailwind.png'
import typescript from '../public/Images/Skills/typescript.png'
import ubuntu from '../public/Images/Skills/ubuntu.png'
import vite from '../public/Images/Skills/vite.png'
import vitest from '../public/Images/Skills/vitest.png'
import vsCode from '../public/Images/Skills/vs-code.png'
import vueJs from '../public/Images/Skills/vue-js.png'
import yarn from '../public/Images/Skills/yarn.png'
import { Project } from './Types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'UI Development - Wych',
    description:
      'UI Lead for a fintech platform, owning front-end direction and building Svelte/TypeScript interfaces from Figma to production. Led a shared component system, extending Flowbite-Svelte to improve consistency, accessibility, and developer experience. Worked closely with design and engineering to deliver high-quality UI in fast-paced sprint cycles with  high-trust decision making.',
    image: wychImg,
    images: [
      svelte,
      azureDevOps,
      ubuntu,
      playwright, 
      keycloak,
      flowbiteSvelte,
      flowbite,
      postman,
      harvest,
      slack,
      microsoftTeams,
      excel,
      docker,
      figma,
      google,
      // gmail,
      // googleCalendar,
      // googleDocs,
      // googleSheets,
      html5,
      js,
      node,
      npm,
      storybook,
      tailwind,
      typescript,
      vsCode,
      vitest,

    ],
  },
  {
    id: '2',
    title: 'Pushpay - School Of Friendship',
    description:
      'Designed, built, tested, presented, and documented a full stack React componentized website with Typescript and Tailwind, gathering data through different methods and setups of interchangeable GraphQL Schema Federation super and subgraphs, fully Dockerized, AWS, using Opentelemetry.',
    image: pushpayImg,
    images: [
      apollo,
      aws,
      canva,
      chilliCreme,
      conflunece,
      csharp,
      docker,
      dotNet,
      figma,
      gitHubDesktop,
      google,
      graphql,
      hotChoc,
      html5,
      jenkins,
      jira,
      js,
      node,
      npm,
      openTel,
      reactJs,
      storybook,
      tailwind,
      typescript,
      vsCode,
      yarn,
    ],
  },
  {
    id: '3',
    title: 'WedPro Web App',
    description:
      'I assisted with building a feature roadmap, designed, built, and tested new features from the backlog to implement subscriptions and add new UI`s on this exciting new kiwi SaaS startups wedding planning app. synchronously learning the new skills involved.',
    image: wedProImg,
    images: [
      canva,
      figma,
      filament,
      gitHubDesktop,
      google,
      notion,
      html5,
      js,
      laragon,
      laravel,
      mySqlWorkbench,
      npm,
      sql,
      sqLite,
      storybook,
      tailwind,
      typescript,
      vsCode,
      vueJs,
    ],
  },
  {
    id: '4',
    title: 'OOTD IOS App',
    description:
      'A native app for Wardrobe management and sharing, My team learnt and made this in a week as my final project from my time in Dev Academy with React Native and Expo, We had previously only used classic React with TSX, so this was a exciting new challenge.',
    image: ootdImg,
    images: [
      docker,
      expo,
      figma,
      firebase,
      gitHub,
      html5,
      js,
      npm,
      reactNative,
      typescript,
      vitest,
      vsCode,
    ],
  },
  {
    id: '5',
    title: 'Dev Academy Projects',
    description:
      'The equivalent of six months of coding in an intensive four-month immersive full-stack web development boot camp working in real-world development scenarios. We practiced extensively in unit testing, test-driven development, asynchronous programming techniques, RESTful APIs, and Git. We completed hands-on challenges, both independently and collaboratively, through group and pair programming sessions. We exercised soft skills, empathy, and well-being, learning meditation and integrating agile methodologies into team projects.',
    image: devAcademyImg,
    images: [
      docker,
      expo,
      expressJs,
      figma,
      gitHub,
      html5,
      jira,
      js,
      knex,
      node,
      notion,
      npm,
      reactJs,
      sass,
      sqLite,
      storybook,
      tailwind,
      typescript,
      vite,
      vitest,
      vsCode,
    ],
  },
  {
    id: '6',
    title: 'Portfolio SPA',
    description:
      'This website, and its many versions. As usual it is a work in progress, taking my time to perfect it around my other work projects. Inspired by my childhood pc games and Googles Material Design.',
    image: portfolioImg,
    images: [
      canva,
      figma,
      gitHub,
      gitHubDesktop,
      google,
      html5,
      js,
      notion,
      npm,
      reactJs,
      sass,
      tailwind,
      typescript,
      vsCode,
    ],
  },
]

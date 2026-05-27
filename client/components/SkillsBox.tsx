import React, { useRef, useState, useEffect } from 'react';
import apollo from '../public/Images/Skills/apollo.png';
import artRage from '../public/Images/Skills/art-rage.png';
import aws from '../public/Images/Skills/aws.png';
import canva from '../public/Images/Skills/canva.png';
import chilliCreme from '../public/Images/Skills/chilli-creme.png';
import clipStudioPaint from '../public/Images/Skills/clip-studio-paint.png';
import confluence from '../public/Images/Skills/confluence.png';
import csharp from '../public/Images/Skills/csharp.png';
import docker from '../public/Images/Skills/docker.png';
import dotNet from '../public/Images/Skills/dot-net.png';
import expo from '../public/Images/Skills/expo.png';
import expressJs from '../public/Images/Skills/express-js.png';
import figma from '../public/Images/Skills/figma.png';
import filament from '../public/Images/Skills/filament.png';
import firebase from '../public/Images/Skills/firebase.png';
import gitHub from '../public/Images/Skills/github.png';
import gitHubDesktop from '../public/Images/Skills/github-desktop.png';
import gmail from '../public/Images/Skills/gmail.png';
import google from '../public/Images/Skills/google.png';
import graphql from '../public/Images/Skills/graphql.png';
import hotChoc from '../public/Images/Skills/hotchoc.png';
import html5 from '../public/Images/Skills/html5.png';
import jenkins from '../public/Images/Skills/jenkins.png';
import jira from '../public/Images/Skills/jira.png';
import js from '../public/Images/Skills/js.png';
import knex from '../public/Images/Skills/knex.png';
import laragon from '../public/Images/Skills/laragon.png';
import laravel from '../public/Images/Skills/laravel.png';
import mediBangPaint from '../public/Images/Skills/medi-bang-paint.png';
import mySqlWorkbench from '../public/Images/Skills/my-sql-workbench.png';
import node from '../public/Images/Skills/node.png';
import notion from '../public/Images/Skills/notion.png';
import npm from '../public/Images/Skills/npm.png';
import openTel from '../public/Images/Skills/open-tel.png';
import reactJs from '../public/Images/Skills/react-js.png';
import reactNative from '../public/Images/Skills/react-native.png';
import sass from '../public/Images/Skills/sass.png';
import sketchbook from '../public/Images/Skills/sketchbook.png';
import sql from '../public/Images/Skills/sql.png';
import sqLite from '../public/Images/Skills/sq-lite.png';
import storybook from '../public/Images/Skills/storybook.png';
import tailwind from '../public/Images/Skills/tailwind.png';
import typescript from '../public/Images/Skills/typescript.png';
import vite from '../public/Images/Skills/vite.png';
import vitest from '../public/Images/Skills/vitest.png';
import vsCode from '../public/Images/Skills/vs-code.png';
import vueJs from '../public/Images/Skills/vue-js.png';
import yarn from '../public/Images/Skills/yarn.png';

const images: { [key: string]: string } = {
	clipStudioPaint,
	mediBangPaint,
	artRage,
	sketchbook,
	google,
	gmail,
	canva,
	figma,
	sass,
	tailwind,
	html5,
	js,
	typescript,
	reactJs,
	vueJs,
	node,
	expressJs,
	knex,
	reactNative,
	expo,
	vitest,
	storybook,
	vite,
	npm,
	yarn,
	jenkins,
	docker,
	firebase,
	sql,
	sqLite,
	mySqlWorkbench,
	laravel,
	laragon,
	filament,
	graphql,
	apollo,
	chilliCreme,
	hotChoc,
	openTel,
	jira,
	gitHubDesktop,
	vsCode,
	gitHub,
	confluence,
	notion,
	csharp,
	dotNet,
	aws,
};
const orderedKeys: (keyof typeof images)[] = [
	'clipStudioPaint',
	'mediBangPaint',
	'artRage',
	'sketchbook',
	'google',
	'gmail',
	'canva',
	'figma',
	'sass',
	'tailwind',
	'html5',
	'js',
	'typescript',
	'reactJs',
	'vueJs',
	'node',
	'expressJs',
	'knex',
	'reactNative',
	'expo',
	'vitest',
	'storybook',
	'vite',
	'npm',
	'yarn',
	'jenkins',
	'docker',
	'firebase',
	'sql',
	'sqLite',
	'mySqlWorkbench',
	'laravel',
	'laragon',
	'filament',
	'graphql',
	'apollo',
	'chilliCreme',
	'hotChoc',
	'openTel',
	'jira',
	'gitHubDesktop',
	'vsCode',
	'gitHub',
	'confluence',
	'notion',
	'csharp',
	'dotNet',
	'aws',
];

export default function SkillsBox() {
	const firstCopyRef = useRef<HTMLDivElement>(null);
	const [scrollDistance, setScrollDistance] = useState(0);

	useEffect(() => {
		if (firstCopyRef.current) {
			setScrollDistance(firstCopyRef.current.offsetWidth);
		}
	}, []);

	return (
		<div
			data-aos="fade-up"
			className="relative mx-3 overflow-hidden rounded-custom border border-white border-opacity-0 bg-white bg-opacity-10 p-5 backdrop-blur-sm lg:mx-10"
			style={
				{ '--scroll-distance': `${scrollDistance}px` } as React.CSSProperties
			}
		>
			<div className="whitespace-nowrap">
				<div className="flex animate-marquee">
					<div ref={firstCopyRef} className="flex flex-none space-x-6">
						{orderedKeys.map((key, index) =>
							images[key] ? (
								<img
									key={index}
									src={images[key]}
									alt={`Skill icon ${key}`}
									className="h-auto w-6"
									loading="lazy"
								/>
							) : null,
						)}
					</div>
					<div className="flex flex-none space-x-6">
						{orderedKeys.map((key, index) =>
							images[key] ? (
								<img
									key={index + orderedKeys.length}
									src={images[key]}
									alt={`Skill icon ${key}`}
									className="h-auto w-6"
									loading="lazy"
								/>
							) : null,
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

 import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import "./TechStack.scss";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const htmlIcon = "/assets/images/tech-icons/htmlIcon.svg";
const cssIcon = "/assets/images/tech-icons/cssIcon.svg";
const tailwindIcon = "/assets/images/tech-icons/tailwindIcon.svg";
const jsIcon = "/assets/images/tech-icons/javascriptIcon.svg";
const reactIcon = "/assets/images/tech-icons/reactjsIcon.svg";
const nodeIcon = "/assets/images/tech-icons/nodeIcon.svg";
const expressIcon = "/assets/images/tech-icons/expressIcon.svg";
const mongoIcon = "/assets/images/tech-icons/mongoIcon.svg";
const javaIcon = "/assets/images/tech-icons/javaIcon.svg";
const pythonIcon = "/assets/images/tech-icons/pythonIcon.svg";
const gitIcon = "/assets/images/tech-icons/gitIcon.svg";
const githubIcon = "/assets/images/tech-icons/githubActionsIcon.svg";
const vscodeIcon = "/assets/images/tech-icons/vscodeIcon.svg";
const postmanIcon = "/assets/images/tech-icons/postmanIcon.svg";

const SECTIONS = [
    {
        label: "FRONTEND",
        techs: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "React.js"],
    },
    {
        label: "BACKEND",
        techs: ["Node.js", "Express.js", "Java", "Python"],
    },
    { 
        label: "DATABASE", 
        techs: ["MongoDB"] 
    },
    {
        label: "TOOLS",
        techs: ["Git", "GitHub", "Visual Studio Code", "Postman"],
    },
];

const TECH_ICONS = {
    "HTML5": htmlIcon,
    "CSS3": cssIcon,
    "Tailwind CSS": tailwindIcon,
    "JavaScript": jsIcon,
    "React.js": reactIcon,
    "Node.js": nodeIcon,
    "Express.js": expressIcon,
    "MongoDB": mongoIcon,
    "Java": javaIcon,
    "Python": pythonIcon,
    "Git": gitIcon,
    "GitHub": githubIcon,
    "Visual Studio Code": vscodeIcon,
    "Postman": postmanIcon,
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function TechStack() {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);
    const worldRef = useRef(null);

    useEffect(() => {
        const sectionEl = sectionRef.current;
        const viewportEl = viewportRef.current;
        const worldEl = worldRef.current;
        if (!sectionEl || !viewportEl || !worldEl) return;

        const getConfig = () => {
            const w = window.innerWidth;
            const mobile = w < 768;

            return {
                starCount: mobile ? 60 : 120,
                zGap: mobile ? 450 : 750,
                camSpeed: 2.2,
                internalLerp: 0.12,
                velLerp: 0.18,
                velScale: 0.00035,
                velClamp: 1.2,
                tiltMul: mobile ? 12 : 35,
                shadowMul: 30,
                radiusX: mobile ? 140 : 380,
                radiusY: mobile ? 100 : 260,
                baseFov: mobile ? 700 : 900,
            };
        };

        let cleanup = () => {};
        let raf = 0;

        const build = () => {
            cleanup();
            const CONFIG = getConfig();
            worldEl.innerHTML = "";

            const items = [];
            let idx = 0;
            const totalCount = SECTIONS.reduce((acc, s) => acc + 1 + s.techs.length, 0);

            const pushText = (label) => {
                const el = document.createElement("div");
                el.className = "hs-item";
                const txt = document.createElement("div");
                txt.className = "hs-big-text";
                txt.innerText = label;
                el.appendChild(txt);
                worldEl.appendChild(el);
                items.push({ el, type: "text", x: 0, y: 0, rot: 0, baseZ: -idx * CONFIG.zGap });
                idx++;
            };

            const pushCard = (domain, tech) => {
                const el = document.createElement("div");
                el.className = "hs-item";
                const card = document.createElement("div");
                card.className = "hs-card";

                const randId = Math.floor(Math.random() * 9999);
                const iconSrc = TECH_ICONS[tech];

                card.innerHTML = `
                  <div class="hs-card-header">
                    <span class="hs-card-id">ID-${randId}</span>
                    <div class="hs-dot"></div>
                  </div>
                  <h2>${tech}</h2>
                  <div class="hs-card-meta">DOMAIN: ${domain}</div>
                  ${iconSrc ? `<img class="hs-tech-icon" src="${iconSrc}" alt="${tech} icon" loading="lazy" />` : ""}
                  <div class="hs-card-footer">
                    <span>GRID: ${Math.floor(Math.random() * 10)}x${Math.floor(Math.random() * 10)}</span>
                    <span>DATA_SIZE: ${(Math.random() * 100).toFixed(1)}MB</span>
                  </div>
                  <div class="hs-card-ghost">0${idx}</div>
                `;

                el.appendChild(card);
                worldEl.appendChild(el);

                const angle = (idx / totalCount) * Math.PI * 6;
                const x = Math.cos(angle) * CONFIG.radiusX;
                const y = Math.sin(angle) * CONFIG.radiusY;
                const rot = (Math.random() - 0.5) * 20;

                items.push({ el, type: "card", x, y, rot, baseZ: -idx * CONFIG.zGap });
                idx++;
            };

            SECTIONS.forEach((s) => {
                pushText(s.label);
                s.techs.forEach((t) => pushCard(s.label, t));
            });

            const totalDepth = Math.max(0, (idx - 1) * CONFIG.zGap);
            const scrollRangePx = Math.max(1, totalDepth / CONFIG.camSpeed);

            for (let i = 0; i < CONFIG.starCount; i++) {
                const el = document.createElement("div");
                el.className = "hs-star";
                worldEl.appendChild(el);
                items.push({
                    el,
                    type: "star",
                    x: (Math.random() - 0.5) * 2000,
                    y: (Math.random() - 0.5) * 2000,
                    baseZ: -Math.random() * totalDepth,
                });
            }

            const internal = { value: 0, target: 0 };
            const vel = { v: 0, target: 0 };
            const mouse = { x: 0, y: 0 };

            const onPointerMove = (e) => {
                mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
                mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
            };
            window.addEventListener("pointermove", onPointerMove, { passive: true });

            const smoother = ScrollSmoother.get();
            const scrollerEl = smoother ? smoother.wrapper() : undefined;

            const st = ScrollTrigger.create({
                trigger: sectionEl,
                scroller: scrollerEl,
                start: "top top",
                end: () => `+=${scrollRangePx}`,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    internal.target = self.progress * scrollRangePx;
                    const v = self.getVelocity() * CONFIG.velScale;
                    vel.target = clamp(v, -CONFIG.velClamp, CONFIG.velClamp);
                },
            });

            const render = () => {
                internal.value += (internal.target - internal.value) * CONFIG.internalLerp;
                vel.v += (vel.target - vel.v) * CONFIG.velLerp;

                const cameraZ = internal.value * CONFIG.camSpeed;
                const tiltX = mouse.y * 3 - vel.v * CONFIG.tiltMul;
                const tiltY = mouse.x * 3;

                worldEl.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                viewportEl.style.perspective = `${CONFIG.baseFov}px`;

                items.forEach((item) => {
                    const vizZ = item.baseZ + cameraZ;

                    let alpha = 1;
                    if (vizZ < -2500) alpha = 0;
                    else if (vizZ < -1500) alpha = (vizZ + 2500) / 1000;
                    if (vizZ > 100 && item.type !== "star") alpha = 1 - (vizZ - 100) / 300;

                    alpha = clamp(alpha, 0, 1);
                    item.el.style.opacity = alpha;
                    if (alpha <= 0) return;

                    let trans = `translate3d(${item.x || 0}px, ${item.y || 0}px, ${vizZ}px)`;

                    if (item.type === "star") {
                        const stretch = Math.max(1, Math.min(1 + Math.abs(vel.v) * 15, 8));
                        trans += ` scale3d(1, 1, ${stretch})`;
                    } else if (item.type === "text") {
                        trans += ` rotateZ(${item.rot || 0}deg)`;
                    } else {
                        const t = gsap.ticker.time;
                        const float = Math.sin(t + (item.x || 0)) * 8;
                        trans += ` rotateZ(${item.rot || 0}deg) rotateY(${float}deg)`;
                    }

                    item.el.style.transform = trans;
                });
            };

            gsap.ticker.add(render);
            raf = requestAnimationFrame(() => ScrollTrigger.refresh());

            cleanup = () => {
                cancelAnimationFrame(raf);
                gsap.ticker.remove(render);
                window.removeEventListener("pointermove", onPointerMove);
                st.kill();
                worldEl.innerHTML = "";
            };
        };

        build();
        const onResize = () => build();
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            cleanup();
        };
    }, []);

    return (
        <section ref={sectionRef} className="hs-section" id="skills">
            <div className="hs-header">
                <p className="hs-kicker">03. TECH STACK</p>
                <h2 className="hs-title">TECHNICAL EXPERTISE</h2>
                <p className="hs-desc">A curated set of technologies I use to ship fast, scalable products—clean UI, solid backend, reliable cloud, and automation.</p>
            </div>
            <div ref={viewportRef} className="hs-viewport">
                <div ref={worldRef} className="hs-world" />
            </div>
        </section>
    );
}
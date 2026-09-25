/* =========================================================
   ATLAS TURISMO — ANIMAÇÕES
   GSAP + ScrollTrigger + Lenis
   ========================================================= */

(() => {
    "use strict";

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /*
     * Se o navegador não carregou alguma biblioteca externa,
     * a página continua funcionando normalmente.
     */
    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        document.documentElement.classList.add("no-js");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);


    /* =====================================================
       LENIS — SCROLL SUAVE
       ===================================================== */

    let lenis = null;

    if (!reduceMotion && typeof Lenis !== "undefined") {

        lenis = new Lenis({
            duration: 1.15,
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 0.9
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }


    /* =====================================================
       HERO — ENTRADA CINEMATOGRÁFICA
       ===================================================== */

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    heroTimeline

        .to(".hero-content .eyebrow", {
            opacity: 1,
            y: 0,
            duration: 0.8
        })

        .to(".hero h1", {
            opacity: 1,
            y: 0,
            duration: 1.1
        }, "-=0.5")

        .to(".hero-description", {
            opacity: 1,
            y: 0,
            duration: 0.7
        }, "-=0.65")

        .to(".hero .button", {
            opacity: 1,
            y: 0,
            duration: 0.65
        }, "-=0.45");


    /* =====================================================
       HERO — PARALLAX NO BACKGROUND
       ===================================================== */

    if (!reduceMotion) {

        gsap.to(".hero-bg", {

            scale: 1,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "bottom top",

                scrub: 1.2
            }
        });


        /*
         * O conteúdo do Hero sobe e desaparece
         * lentamente enquanto o usuário continua descendo.
         */

        gsap.to(".hero-content", {

            y: -100,

            opacity: 0.15,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "bottom top",

                scrub: 1
            }
            
            
        });

        gsap.to(".scroll-cue", {

            opacity: -1,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "bottom top",

                scrub: 1
            }
        });
    }


    /* =====================================================
       SEÇÃO "O QUE TORNA ATLAS TURISMO ESPECIAL?"
       
       Essa é a principal animação da página.
       
       A seção possui uma altura maior no CSS.
       O conteúdo fica preso na tela enquanto o usuário
       continua fazendo scroll.
       ===================================================== */

    const special = document.querySelector(".special");

    if (special && !reduceMotion) {

        const specialTimeline = gsap.timeline({

            scrollTrigger: {

                trigger: special,

                start: "top top",

                end: "bottom bottom",

                /*
                 * Mantém o conteúdo da seção preso
                 * enquanto a animação acontece.
                 */
                pin: ".special-pin",

                /*
                 * Faz a animação acompanhar
                 * diretamente o scroll.
                 */
                scrub: 1.15,

                /*
                 * Evita um pequeno salto visual
                 * quando o pin é ativado.
                 */
                anticipatePin: 1
            }
        });


        /* -----------------------------------------------
           TEXTO ENTRA DA DIREITA
           ----------------------------------------------- */

        specialTimeline.fromTo(

            ".special-copy",

            {
                x: "110vw",
                opacity: 0
            },

            {
                x: "0vw",
                opacity: 1,
                ease: "power3.out"
            },

            0
        );


        /* -----------------------------------------------
           IMAGEM ENTRA DA DIREITA
           ----------------------------------------------- */

        specialTimeline.fromTo(

            ".special-visual",

            {
                x: "120vw",
                opacity: 0,
                scale: 0.96
            },

            {
                x: "0vw",
                opacity: 1,
                scale: 1,
                ease: "power3.out"
            },

            0.08
        );


        /* -----------------------------------------------
           CÍRCULO DECORATIVO
           ----------------------------------------------- */

        specialTimeline.fromTo(

            ".special-background-decoration",

            {
                x: 150,
                opacity: 0
            },

            {
                x: 0,
                opacity: 0.9,
                ease: "power2.out"
            },

            0.12
        );

    } else if (special) {

        special.classList.add("reduced-motion");
    }


    /* =====================================================
       ATRAÇÕES — CARDS EM CASCATA
       ===================================================== */

    const attractionCards =
        document.querySelectorAll(".attraction-card, .attraction-card-section-dark");

    if (attractionCards.length) {

        gsap.to(attractionCards, {

            opacity: 1,

            y: 0,

            duration: 0.85,

            /*
             * Cada card começa depois do anterior.
             */
            stagger: 0.16,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".attraction-grid",

                start: "top 78%",

                /*
                 * Executa somente uma vez.
                 */
                once: true
            }
        });
    }


    /* =====================================================
       HISTÓRIA
       
       Texto entra pela esquerda.
       Imagem entra pela direita.
       ===================================================== */

    if (!reduceMotion) {

        gsap.fromTo(

            ".history-copy",

            {
                x: -90,
                opacity: 0
            },

            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",

                scrollTrigger: {

                    trigger: ".history",

                    start: "top 70%",

                    once: true
                }
            }
        );


        gsap.fromTo(

            ".history-visual",

            {
                x: 90,
                opacity: 0
            },

            {
                x: 0,
                opacity: 1,
                duration: 1,
                delay: 0.1,
                ease: "power3.out",

                scrollTrigger: {

                    trigger: ".history",

                    start: "top 70%",

                    once: true
                }
            }
        );

    } else {

        gsap.set(

            [
                ".history-copy",
                ".history-visual"
            ],

            {
                x: 0,
                opacity: 1
            }
        );
    }


    /* =====================================================
       EXPERIÊNCIAS — PARALLAX
       ===================================================== */

    if (!reduceMotion) {

        gsap.fromTo(

            ".experiences-bg",

            {
                yPercent: -8,
                scale: 1.1
            },

            {
                yPercent: 8,
                scale: 1.04,

                ease: "none",

                scrollTrigger: {

                    trigger: ".experiences",

                    start: "top bottom",

                    end: "bottom top",

                    scrub: true
                }
            }
        );


        gsap.fromTo(

            ".experiences-content",

            {
                y: 70,
                opacity: 0
            },

            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",

                scrollTrigger: {

                    trigger: ".experiences",

                    start: "top 70%",

                    once: true
                }
            }
        );

    } else {

        gsap.set(

            ".experiences-content",

            {
                y: 0,
                opacity: 1
            }
        );
    }


    /* =====================================================
       GALERIA — ENTRADA EM SEQUÊNCIA
       ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    if (galleryItems.length) {

        gsap.to(galleryItems, {

            opacity: 1,

            y: 0,

            duration: 0.8,

            /*
             * As imagens aparecem uma depois da outra.
             */
            stagger: 0.1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".gallery-grid",

                start: "top 78%",

                once: true
            }
        });
    }


    /* =====================================================
       CTA FINAL
       ===================================================== */

    if (!reduceMotion) {

        /*
         * Pequeno zoom reverso no background.
         */

        gsap.fromTo(

            ".cta-bg",

            {
                scale: 1.1
            },

            {
                scale: 1,

                ease: "none",

                scrollTrigger: {

                    trigger: ".cta",

                    start: "top bottom",

                    end: "bottom top",

                    scrub: 1
                }
            }
        );


        /*
         * Conteúdo aparece de baixo.
         */

        gsap.fromTo(

            ".cta-content",

            {
                y: 60,
                opacity: 0
            },

            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",

                scrollTrigger: {

                    trigger: ".cta",

                    start: "top 70%",

                    once: true
                }
            }
        );

    } else {

        gsap.set(

            ".cta-content",

            {
                y: 0,
                opacity: 1
            }
        );
    }


    /* =====================================================
       REFRESH DO SCROLLTRIGGER
       
       Importante porque as imagens podem alterar
       a altura das seções depois que carregam.
       ===================================================== */

    window.addEventListener("load", () => {

        ScrollTrigger.refresh();
    });


    /*
     * Segundo refresh para conexões mais lentas.
     */

    setTimeout(() => {

        ScrollTrigger.refresh();

    }, 800);

})();
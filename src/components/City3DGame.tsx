import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CityData } from '../data/turkeyData';
import { soundFX } from '../utils/soundEffects';
import { createStoneBlockTexture, createCobblestoneTexture, createLeadRoofTexture } from '../utils/proceduralTextures';
import { Trophy, Compass, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, RefreshCw, Award, Sparkles, HelpCircle, ArrowLeft as BackIcon, Info, MapPin, Moon, Sun } from 'lucide-react';

interface City3DGameProps {
  city: CityData;
  onBadgeEarned: (badge: string) => void;
  onClose: () => void;
  isDarkAmbiance?: boolean;
  onToggleDark?: () => void;
}

interface RelicItem {
  id: number;
  name: string;
  fact: string;
  position: THREE.Vector3;
  mesh?: THREE.Group;
  collected: boolean;
}

export const City3DGame: React.FC<City3DGameProps> = ({
  city,
  onBadgeEarned,
  onClose,
  isDarkAmbiance = false,
  onToggleDark,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Ambiance Black / Night Mode State
  const [isNightMode, setIsNightMode] = useState<boolean>(isDarkAmbiance);

  useEffect(() => {
    if (isDarkAmbiance !== undefined) {
      setIsNightMode(isDarkAmbiance);
    }
  }, [isDarkAmbiance]);

  const toggleNightMode = () => {
    setIsNightMode((prev) => {
      const next = !prev;
      if (onToggleDark) onToggleDark();
      return next;
    });
  };

  // References for Three.js scene & lights dynamic ambiance update
  const sceneRef = useRef<THREE.Scene | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const nightGroupRef = useRef<THREE.Group | null>(null);
  
  // Game states
  const [relicsCount, setRelicsCount] = useState<number>(0);
  const [totalRelics] = useState<number>(5);
  const [currentFact, setCurrentFact] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [distanceToNearest, setDistanceToNearest] = useState<number>(0);
  
  // Starting Briefing / Info Screen
  const [showBriefing, setShowBriefing] = useState<boolean>(true);
  const [isPointerLocked, setIsPointerLocked] = useState<boolean>(false);
  const [activeLandmark, setActiveLandmark] = useState<string>(
    city.id === 'istanbul' ? 'Galata Kulesi' : city.landmark
  );
  const [missionData, setMissionData] = useState<{
    title: string;
    history?: string;
    Tarihçe?: string;
    legendOrSecret?: string;
    EfsaneOrSır?: string;
    gameMission?: string;
    OyunGörevi?: string;
    studentQuiz?: {
      question?: string;
      Soru?: string;
      options?: string[];
      Seçenekler?: string[];
      correctIndex: number;
    };
  } | null>(null);

  // References to keep animation loop & controls independent of React render cycle
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 16));
  const playerVel = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const playerMeshRef = useRef<THREE.Group | null>(null);
  const relicsRef = useRef<RelicItem[]>([]);
  const isJumping = useRef<boolean>(false);
  const isDragging = useRef<boolean>(false);
  const prevMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // 1. Şahıs (First Person) Camera Look
  const fpLook = useRef<{ yaw: number; pitch: number }>({
    yaw: 0,
    pitch: 0.22, // tilted upward slightly to take in the tower
  });

  // Determine architectural archetype
  const archetype = React.useMemo<'galata' | 'balloon' | 'ancient' | 'monolith' | 'bridge' | 'castle'>(() => {
    const id = city.id.toLowerCase();
    const lmark = activeLandmark.toLowerCase();

    if (id === 'istanbul' || lmark.includes('galata') || lmark.includes('kız kulesi') || lmark.includes('topkapı')) {
      return 'galata';
    }
    if (id === 'nevsehir' || lmark.includes('peri bac') || lmark.includes('kapadokya') || id === 'aksaray') {
      return 'balloon';
    }
    if (lmark.includes('efes') || lmark.includes('tiyatro') || lmark.includes('antik') || id === 'izmir' || id === 'antalya' || id === 'mugla') {
      return 'ancient';
    }
    if (lmark.includes('nemrut') || lmark.includes('sümela') || lmark.includes('göbekli') || id === 'adiyaman' || id === 'trabzon' || id === 'sanliurfa') {
      return 'monolith';
    }
    if (lmark.includes('köprü') || id === 'adana' || id === 'batman' || id === 'edirne') {
      return 'bridge';
    }
    return 'castle';
  }, [city, activeLandmark]);

  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Load enriched discovery lore from server API for this landmark
  useEffect(() => {
    fetch('/api/ai/landmark-mission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ landmarkName: activeLandmark, cityName: city.name }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && (data.title || data.Tarihçe || data.history)) {
          setMissionData(data);
        }
      })
      .catch(() => {
        fetch('/api/ai/galata-info')
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => {
            if (d) setMissionData(d);
          })
          .catch(() => {});
      });
  }, [activeLandmark, city]);

  // Sync Ambiance with Three.js Scene, Sky and Lights
  useEffect(() => {
    const scene = sceneRef.current;
    const hemi = hemiLightRef.current;
    const key = keyLightRef.current;
    const fill = fillLightRef.current;
    const nightGroup = nightGroupRef.current;
    if (!scene) return;

    if (isNightMode) {
      scene.background = new THREE.Color(0x060913);
      if (scene.fog) {
        scene.fog.color = new THREE.Color(0x060913);
        (scene.fog as THREE.FogExp2).density = 0.014;
      }
      if (hemi) {
        hemi.color.setHex(0x1e293b);
        hemi.groundColor.setHex(0x0a0f1d);
        hemi.intensity = 0.55;
      }
      if (key) {
        key.color.setHex(0x8ab4f8); // Moonlight
        key.intensity = 0.9;
      }
      if (fill) {
        fill.color.setHex(0x274060);
        fill.intensity = 0.35;
      }
      if (nightGroup) {
        nightGroup.visible = true;
      }
    } else {
      const dayColor = archetype === 'galata' ? 0xd0e2ec : archetype === 'balloon' ? 0xffecd2 : 0xf1f5f9;
      scene.background = new THREE.Color(dayColor);
      if (scene.fog) {
        scene.fog.color = new THREE.Color(dayColor);
        (scene.fog as THREE.FogExp2).density = 0.012;
      }
      if (hemi) {
        hemi.color.setHex(0xffffff);
        hemi.groundColor.setHex(0xc8d6e5);
        hemi.intensity = 0.9;
      }
      if (key) {
        key.color.setHex(0xfff3d6);
        key.intensity = 1.6;
      }
      if (fill) {
        fill.color.setHex(0xa5c4d4);
        fill.intensity = 0.55;
      }
      if (nightGroup) {
        nightGroup.visible = false;
      }
    }
  }, [isNightMode, archetype]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const dayColor = archetype === 'galata' ? 0xd0e2ec : archetype === 'balloon' ? 0xffecd2 : 0xf1f5f9;
    scene.background = new THREE.Color(isNightMode ? 0x060913 : dayColor);
    scene.fog = new THREE.FogExp2(isNightMode ? 0x060913 : dayColor, isNightMode ? 0.014 : 0.012);

    const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 260);

    // Procedural RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Rig
    const hemiLight = new THREE.HemisphereLight(
      isNightMode ? 0x1e293b : 0xffffff,
      isNightMode ? 0x0a0f1d : 0xc8d6e5,
      isNightMode ? 0.55 : 0.9
    );
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const keyLight = new THREE.DirectionalLight(
      isNightMode ? 0x8ab4f8 : 0xfff3d6,
      isNightMode ? 0.9 : 1.6
    );
    keyLight.position.set(32, 55, 28);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    const d = 35;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = 55;
    keyLight.shadow.camera.bottom = -10;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(
      isNightMode ? 0x274060 : 0xa5c4d4,
      isNightMode ? 0.35 : 0.55
    );
    fillLight.position.set(-28, 25, -28);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    // Create night ambiance group (stars + warm golden floodlights on tower)
    const nightGroup = new THREE.Group();

    // 1. Twinkling Stars
    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 170 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.92);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = Math.max(16, radius * Math.cos(phi));
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.9,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    nightGroup.add(starPoints);

    // 2. Warm golden floodlights for night ambiance (Galata Tower spotlighting)
    const spotSouth = new THREE.PointLight(0xffb347, 3.2, 50);
    spotSouth.position.set(0, 3, 11);
    nightGroup.add(spotSouth);

    const spotNorth = new THREE.PointLight(0xff9f1c, 2.8, 50);
    spotNorth.position.set(0, 3, -11);
    nightGroup.add(spotNorth);

    const spotEast = new THREE.PointLight(0xffa726, 2.8, 50);
    spotEast.position.set(11, 3, 0);
    nightGroup.add(spotEast);

    const spotWest = new THREE.PointLight(0xffa726, 2.8, 50);
    spotWest.position.set(-11, 3, 0);
    nightGroup.add(spotWest);

    nightGroup.visible = isNightMode;
    scene.add(nightGroup);
    nightGroupRef.current = nightGroup;

    // Landmark Parent Group
    const landmarkGroup = new THREE.Group();
    scene.add(landmarkGroup);

    // Build Procedural 3D World
    if (archetype === 'galata') {
      const stoneTexture = createStoneBlockTexture();
      const cobblestoneTexture = createCobblestoneTexture();
      const leadRoofTexture = createLeadRoofTexture();

      // Galata Meydanı Floor
      const squareGeo = new THREE.CircleGeometry(42, 64);
      const squareMat = new THREE.MeshStandardMaterial({
        map: cobblestoneTexture,
        roughness: 0.8,
        metalness: 0.1,
      });
      const square = new THREE.Mesh(squareGeo, squareMat);
      square.rotation.x = -Math.PI / 2;
      square.receiveShadow = !isSoftwareGl;
      scene.add(square);

      // Bosphorus Water Horizon
      const bosphorusGeo = new THREE.PlaneGeometry(160, 40);
      const bosphorusMat = new THREE.MeshStandardMaterial({
        color: 0x1d4e89,
        roughness: 0.2,
        metalness: 0.8,
      });
      const bosphorus = new THREE.Mesh(bosphorusGeo, bosphorusMat);
      bosphorus.rotation.x = -Math.PI / 2;
      bosphorus.position.set(0, -0.2, 55);
      scene.add(bosphorus);

      const stoneMat = new THREE.MeshStandardMaterial({
        map: stoneTexture,
        roughness: 0.72,
        metalness: 0.08,
      });

      const stoneTrimMat = new THREE.MeshStandardMaterial({
        color: 0xbaa78c,
        roughness: 0.75,
        metalness: 0.05,
      });

      const darkInteriorMat = new THREE.MeshStandardMaterial({
        color: 0x181a1e,
        roughness: 0.9,
      });

      const ironMat = new THREE.MeshStandardMaterial({
        color: 0x1e242b,
        metalness: 0.85,
        roughness: 0.25,
      });

      const brassAlemMat = new THREE.MeshStandardMaterial({
        color: 0xe0a938,
        metalness: 0.92,
        roughness: 0.18,
      });

      // 1. Plinth / Foundation Base
      const plinthStep1 = new THREE.Mesh(new THREE.CylinderGeometry(5.4, 5.7, 1.0, 36), stoneTrimMat);
      plinthStep1.position.y = 0.5;
      plinthStep1.castShadow = !isSoftwareGl;
      plinthStep1.receiveShadow = !isSoftwareGl;
      landmarkGroup.add(plinthStep1);

      const plinthStep2 = new THREE.Mesh(new THREE.CylinderGeometry(5.1, 5.4, 1.0, 36), stoneTrimMat);
      plinthStep2.position.y = 1.5;
      plinthStep2.castShadow = !isSoftwareGl;
      plinthStep2.receiveShadow = !isSoftwareGl;
      landmarkGroup.add(plinthStep2);

      // 2. Main Cylindrical Shaft (Tall, commanding proportions)
      const shaftHeight = 22.0;
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(4.85, 5.05, shaftHeight, 48), stoneMat);
      shaft.position.y = 2.0 + shaftHeight / 2;
      shaft.castShadow = !isSoftwareGl;
      shaft.receiveShadow = !isSoftwareGl;
      landmarkGroup.add(shaft);

      // Entrance Portal (South-facing)
      const entranceGroup = new THREE.Group();
      entranceGroup.position.set(0, 0, 4.95);
      
      const portalSurround = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.8, 0.7), stoneTrimMat);
      portalSurround.position.set(0, 2.0, 0);
      entranceGroup.add(portalSurround);

      const doorRecess = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.9, 0.4), darkInteriorMat);
      doorRecess.position.set(0, 1.5, 0.2);
      entranceGroup.add(doorRecess);

      const portalArch = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.6, 20, 1, false, 0, Math.PI), stoneTrimMat);
      portalArch.rotation.z = Math.PI / 2;
      portalArch.position.set(0, 3.0, 0.1);
      entranceGroup.add(portalArch);

      const inscriptionTablet = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.7, 0.15), new THREE.MeshStandardMaterial({ color: 0xede4d3, roughness: 0.35 }));
      inscriptionTablet.position.set(0, 4.2, 0.15);
      entranceGroup.add(inscriptionTablet);

      landmarkGroup.add(entranceGroup);

      // Spiral Staircase Slit Windows on the Main Shaft
      const slitWinMat = new THREE.MeshStandardMaterial({ color: 0x161a1d, roughness: 0.95 });
      for (let sw = 0; sw < 9; sw++) {
        const swAng = 0.5 + sw * 0.75;
        const swY = 4.5 + sw * 2.1;
        const swR = 4.9;
        const slitWin = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.3, 0.6), slitWinMat);
        slitWin.position.set(Math.sin(swAng) * swR, swY, Math.cos(swAng) * swR);
        slitWin.lookAt(0, swY, 0);
        landmarkGroup.add(slitWin);
      }

      // 3. Lower Projecting Stone Cornice / Belt Molding (Separating Shaft & Gallery)
      const beltY = 2.0 + shaftHeight; // y = 24.0
      const corniceBase = new THREE.Mesh(new THREE.CylinderGeometry(5.25, 4.85, 0.6, 40), stoneTrimMat);
      corniceBase.position.y = beltY + 0.3;
      corniceBase.castShadow = !isSoftwareGl;
      landmarkGroup.add(corniceBase);

      const corniceTop = new THREE.Mesh(new THREE.CylinderGeometry(5.45, 5.25, 0.4, 40), stoneTrimMat);
      corniceTop.position.y = beltY + 0.8;
      corniceTop.castShadow = !isSoftwareGl;
      landmarkGroup.add(corniceTop);

      // Support corbel brackets under the cornice
      const numCorbels = 24;
      for (let c = 0; c < numCorbels; c++) {
        const cAng = (c / numCorbels) * Math.PI * 2;
        const corbel = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.65, 0.8), stoneTrimMat);
        corbel.position.set(Math.sin(cAng) * 4.95, beltY + 0.1, Math.cos(cAng) * 4.95);
        corbel.lookAt(0, beltY + 0.1, 0);
        corbel.castShadow = !isSoftwareGl;
        landmarkGroup.add(corbel);
      }

      // 4. Lower Arcade Gallery Level (8th Floor - Deep Arched Openings with Stone Piers)
      const arcadeBaseY = beltY + 1.0; // y = 25.0
      const arcadeHeight = 5.2;

      // Dark interior drum behind the arches creates authentic depth and shadow
      const innerDrum = new THREE.Mesh(new THREE.CylinderGeometry(4.25, 4.25, arcadeHeight, 36), darkInteriorMat);
      innerDrum.position.y = arcadeBaseY + arcadeHeight / 2;
      landmarkGroup.add(innerDrum);

      // Outer arched arcade ring: 14 distinct arches with stone piers
      const numArches = 14;
      for (let a = 0; a < numArches; a++) {
        const aAng = (a / numArches) * Math.PI * 2;
        const cosA = Math.cos(aAng);
        const sinA = Math.sin(aAng);
        const arcR = 4.8;

        // Pier / Column between arches
        const pier = new THREE.Mesh(new THREE.BoxGeometry(0.65, arcadeHeight - 0.5, 0.7), stoneTrimMat);
        pier.position.set(sinA * arcR, arcadeBaseY + (arcadeHeight - 0.5) / 2, cosA * arcR);
        pier.lookAt(0, arcadeBaseY + arcadeHeight / 2, 0);
        pier.castShadow = !isSoftwareGl;
        landmarkGroup.add(pier);

        // Arch header spanning above each window opening
        const archCenterAng = aAng + (Math.PI / numArches);
        const aMidSin = Math.sin(archCenterAng);
        const aMidCos = Math.cos(archCenterAng);

        const archHeader = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 0.7), stoneTrimMat);
        archHeader.position.set(aMidSin * arcR, arcadeBaseY + arcadeHeight - 0.25, aMidCos * arcR);
        archHeader.lookAt(0, archHeader.position.y, 0);
        archHeader.castShadow = !isSoftwareGl;
        landmarkGroup.add(archHeader);

        // Arched curved lintel (half cylinder)
        const archCurve = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.65, 12, 1, false, 0, Math.PI), stoneTrimMat);
        archCurve.rotation.z = Math.PI / 2;
        archCurve.rotation.y = archCenterAng + Math.PI / 2;
        archCurve.position.set(aMidSin * (arcR - 0.05), arcadeBaseY + arcadeHeight - 0.6, aMidCos * (arcR - 0.05));
        landmarkGroup.add(archCurve);

        // Window mullion / glass frame inside the arch
        const glassMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.75, 2.6, 0.1),
          new THREE.MeshStandardMaterial({ color: 0x243342, roughness: 0.1, metalness: 0.7 })
        );
        glassMesh.position.set(aMidSin * (arcR - 0.35), arcadeBaseY + 2.0, aMidCos * (arcR - 0.35));
        glassMesh.lookAt(0, glassMesh.position.y, 0);
        landmarkGroup.add(glassMesh);
      }

      // 5. Panoramic Observation Terrace & Balcony (Seyir Terası)
      const balconyBaseY = arcadeBaseY + arcadeHeight; // y = 30.2
      
      // Cantilevered walkway stone slab
      const balconySlab = new THREE.Mesh(new THREE.CylinderGeometry(5.75, 5.5, 0.5, 40), stoneTrimMat);
      balconySlab.position.y = balconyBaseY + 0.25;
      balconySlab.castShadow = !isSoftwareGl;
      landmarkGroup.add(balconySlab);

      // Balcony support brackets underneath
      for (let bb = 0; bb < 28; bb++) {
        const bbAng = (bb / 28) * Math.PI * 2;
        const bBracket = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.45, 0.75), stoneTrimMat);
        bBracket.position.set(Math.sin(bbAng) * 5.15, balconyBaseY - 0.1, Math.cos(bbAng) * 5.15);
        bBracket.lookAt(0, balconyBaseY - 0.1, 0);
        landmarkGroup.add(bBracket);
      }

      // Fine Wrought-Iron Balustrade / Railing
      const railHeight = 1.15;
      const railRadius = 5.65;
      
      const topRail = new THREE.Mesh(new THREE.TorusGeometry(railRadius, 0.05, 8, 48), ironMat);
      topRail.rotation.x = Math.PI / 2;
      topRail.position.y = balconyBaseY + 0.5 + railHeight;
      landmarkGroup.add(topRail);

      const midRail = new THREE.Mesh(new THREE.TorusGeometry(railRadius, 0.035, 8, 48), ironMat);
      midRail.rotation.x = Math.PI / 2;
      midRail.position.y = balconyBaseY + 0.5 + railHeight * 0.5;
      landmarkGroup.add(midRail);

      const bottomRail = new THREE.Mesh(new THREE.TorusGeometry(railRadius, 0.04, 8, 48), ironMat);
      bottomRail.rotation.x = Math.PI / 2;
      bottomRail.position.y = balconyBaseY + 0.55;
      landmarkGroup.add(bottomRail);

      // Vertical iron pickets
      const numPickets = 56;
      for (let p = 0; p < numPickets; p++) {
        const pAng = (p / numPickets) * Math.PI * 2;
        const picket = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, railHeight, 5), ironMat);
        picket.position.set(Math.sin(pAng) * railRadius, balconyBaseY + 0.5 + railHeight / 2, Math.cos(pAng) * railRadius);
        landmarkGroup.add(picket);
      }

      // 6. Upper Drum Level (9th Floor / Kubbe Altı Salonu)
      const upperDrumBaseY = balconyBaseY + 0.5; // y = 30.7
      const upperDrumHeight = 4.2;

      const upperDrum = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.4, upperDrumHeight, 40), stoneMat);
      upperDrum.position.y = upperDrumBaseY + upperDrumHeight / 2;
      upperDrum.castShadow = !isSoftwareGl;
      landmarkGroup.add(upperDrum);

      // Upper row of arched windows
      for (let uw = 0; uw < 14; uw++) {
        const uwAng = (uw / 14) * Math.PI * 2;
        const uwMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.7, 1.8, 0.35),
          new THREE.MeshStandardMaterial({ color: 0x1b242e, roughness: 0.15, metalness: 0.8 })
        );
        uwMesh.position.set(Math.sin(uwAng) * 4.42, upperDrumBaseY + 2.0, Math.cos(uwAng) * 4.42);
        uwMesh.lookAt(0, upperDrumBaseY + 2.0, 0);
        landmarkGroup.add(uwMesh);

        // Window arch stone frame
        const uwArch = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.36, 12, 1, false, 0, Math.PI), stoneTrimMat);
        uwArch.rotation.z = Math.PI / 2;
        uwArch.rotation.y = uwAng + Math.PI / 2;
        uwArch.position.set(Math.sin(uwAng) * 4.42, upperDrumBaseY + 2.9, Math.cos(uwAng) * 4.42);
        landmarkGroup.add(uwArch);
      }

      // Upper Eaves Cornice Ring
      const upperCornice = new THREE.Mesh(new THREE.CylinderGeometry(4.7, 4.4, 0.5, 40), stoneTrimMat);
      upperCornice.position.y = upperDrumBaseY + upperDrumHeight + 0.25;
      upperCornice.castShadow = !isSoftwareGl;
      landmarkGroup.add(upperCornice);

      // 7. Conical Roof (Külah Çatı) with Lead Tiles & Seams
      const coneBaseY = upperDrumBaseY + upperDrumHeight + 0.5; // y = 35.4
      const coneHeight = 12.8;
      const coneBaseRadius = 4.65;

      const coneGeo = new THREE.ConeGeometry(coneBaseRadius, coneHeight, 48);
      const coneMat = new THREE.MeshStandardMaterial({
        map: leadRoofTexture,
        roughness: 0.45,
        metalness: 0.45,
      });
      const coneRoof = new THREE.Mesh(coneGeo, coneMat);
      coneRoof.position.y = coneBaseY + coneHeight / 2;
      coneRoof.castShadow = !isSoftwareGl;
      coneRoof.receiveShadow = !isSoftwareGl;
      landmarkGroup.add(coneRoof);

      // Eaves drip ring under cone
      const roofBaseRing = new THREE.Mesh(new THREE.TorusGeometry(coneBaseRadius + 0.08, 0.12, 8, 48), stoneTrimMat);
      roofBaseRing.rotation.x = Math.PI / 2;
      roofBaseRing.position.y = coneBaseY;
      landmarkGroup.add(roofBaseRing);

      // 8. Dormer Windows on Conical Roof (4 Çatı Güvercinliği / Pencereleri)
      // Exactly as seen in the reference render!
      const dormerAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      const dormerY = coneBaseY + 3.8;
      const dormerRadius = 3.3; // matches cone radius at this height

      dormerAngles.forEach((ang) => {
        const dormerGroup = new THREE.Group();
        const sinD = Math.sin(ang);
        const cosD = Math.cos(ang);

        dormerGroup.position.set(sinD * dormerRadius, dormerY, cosD * dormerRadius);
        dormerGroup.lookAt(sinD * 10, dormerY, cosD * 10);

        // Dormer stone/copper box body
        const dormerBody = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 1.1, 1.2),
          new THREE.MeshStandardMaterial({ color: 0x8a7d70, roughness: 0.6 })
        );
        dormerBody.position.set(0, 0, 0);
        dormerBody.castShadow = !isSoftwareGl;
        dormerGroup.add(dormerBody);

        // Arched window opening
        const dormerWindow = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.75, 0.1),
          new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.2 })
        );
        dormerWindow.position.set(0, -0.05, 0.61);
        dormerGroup.add(dormerWindow);

        // Little gabled pitched roof (triangular prism / cone)
        const dormerRoof = new THREE.Mesh(
          new THREE.ConeGeometry(0.72, 0.7, 4),
          new THREE.MeshStandardMaterial({ color: 0x6e685f, roughness: 0.4, metalness: 0.4 })
        );
        dormerRoof.rotation.y = Math.PI / 4;
        dormerRoof.position.set(0, 0.75, 0);
        dormerRoof.castShadow = !isSoftwareGl;
        dormerGroup.add(dormerRoof);

        landmarkGroup.add(dormerGroup);
      });

      // 9. Ottoman Brass/Bronze Finial Spire (Alem)
      // Classical multi-sphere finial with tapered needle matching the reference image
      const alemBaseY = coneBaseY + coneHeight; // y = 48.2

      // Base neck
      const alemNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.35, 0.8, 16), brassAlemMat);
      alemNeck.position.y = alemBaseY + 0.4;
      landmarkGroup.add(alemNeck);

      // Lower big sphere
      const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 20), brassAlemMat);
      sphere1.position.y = alemBaseY + 1.1;
      landmarkGroup.add(sphere1);

      // Middle spacer & sphere
      const spacer1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.4, 12), brassAlemMat);
      spacer1.position.y = alemBaseY + 1.5;
      landmarkGroup.add(spacer1);

      const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), brassAlemMat);
      sphere2.position.y = alemBaseY + 1.9;
      landmarkGroup.add(sphere2);

      // Upper sphere
      const spacer2 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.35, 12), brassAlemMat);
      spacer2.position.y = alemBaseY + 2.25;
      landmarkGroup.add(spacer2);

      const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), brassAlemMat);
      sphere3.position.y = alemBaseY + 2.55;
      landmarkGroup.add(sphere3);

      // Tapered Spire Needle pointing to the sky
      const alemNeedle = new THREE.Mesh(new THREE.ConeGeometry(0.09, 2.5, 12), brassAlemMat);
      alemNeedle.position.y = alemBaseY + 3.8;
      alemNeedle.castShadow = !isSoftwareGl;
      landmarkGroup.add(alemNeedle);

      // Street Lamps
      [[-11, 8], [11, 8], [-12, -7], [12, -7], [0, 15], [0, -14]].forEach(([lx, lz]) => {
        const lampGroup = new THREE.Group();
        lampGroup.position.set(lx, 0, lz);
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 3.6, 8), ironMat);
        post.position.y = 1.8;
        post.castShadow = !isSoftwareGl;
        const lantern = new THREE.Mesh(
          new THREE.CylinderGeometry(0.35, 0.2, 0.6, 6),
          new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0xffb703, emissiveIntensity: 0.8, roughness: 0.2 })
        );
        lantern.position.y = 3.6;
        lampGroup.add(post, lantern);
        landmarkGroup.add(lampGroup);

        if (!isSoftwareGl) {
          const warmLight = new THREE.PointLight(0xffb703, 0.8, 12);
          warmLight.position.set(lx, 3.6, lz);
          scene.add(warmLight);
        }
      });

      // Signpost
      const signPostGroup = new THREE.Group();
      signPostGroup.position.set(7, 0, 11);
      const signPole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.8, 8), stoneTrimMat);
      signPole.position.y = 1.4;
      const sign1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 0.1), new THREE.MeshStandardMaterial({ color: 0x936639 }));
      sign1.position.set(0.8, 2.4, 0);
      const sign2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 0.1), new THREE.MeshStandardMaterial({ color: 0x7f4f24 }));
      sign2.position.set(-0.8, 1.9, 0);
      signPostGroup.add(signPole, sign1, sign2);
      landmarkGroup.add(signPostGroup);

    } else if (archetype === 'balloon') {
      const chimneyMat = new THREE.MeshStandardMaterial({ color: 0xcd9b6e, roughness: 0.9 });
      const capMat = new THREE.MeshStandardMaterial({ color: 0x6c584c, roughness: 0.7 });

      [[0, 0, 0, 7, 2.5], [-10, 0, -8, 9, 3], [12, 0, -6, 8, 2.8], [-8, 0, 8, 6, 2], [9, 0, 10, 6.5, 2.2]].forEach(([cx, cy, cz, h, r]) => {
        const body = new THREE.Mesh(new THREE.ConeGeometry(r, h, 12), chimneyMat);
        body.position.set(cx, h / 2, cz);
        body.castShadow = !isSoftwareGl;
        landmarkGroup.add(body);

        const cap = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.1, r * 0.7, 1.8, 10), capMat);
        cap.position.set(cx, h + 0.5, cz);
        cap.castShadow = !isSoftwareGl;
        landmarkGroup.add(cap);
      });
    } else if (archetype === 'ancient') {
      const marbleMat = new THREE.MeshStandardMaterial({ color: 0xfdf0d5, roughness: 0.35, metalness: 0.1 });
      const baseMat = new THREE.MeshStandardMaterial({ color: 0xe5d0b0, roughness: 0.6 });

      const platform = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 22), baseMat);
      platform.position.set(0, 0.6, 0);
      landmarkGroup.add(platform);

      [[-6, -8], [6, -8], [-6, -3], [6, -3], [-6, 3], [6, 3], [-6, 8], [6, 8]].forEach(([px, pz]) => {
        const column = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 7, 16), marbleMat);
        column.position.set(px, 1.2 + 3.5, pz);
        column.castShadow = !isSoftwareGl;
        landmarkGroup.add(column);
      });

      const roofBeam = new THREE.Mesh(new THREE.BoxGeometry(16.5, 0.9, 22.5), marbleMat);
      roofBeam.position.set(0, 9.1, 0);
      landmarkGroup.add(roofBeam);
    } else {
      const wallMat = new THREE.MeshStandardMaterial({ color: 0xadb5bd, roughness: 0.65 });
      const mainTower = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 5.5, 12, 16), wallMat);
      mainTower.position.set(0, 6, 0);
      mainTower.castShadow = !isSoftwareGl;
      landmarkGroup.add(mainTower);

      const dome = new THREE.Mesh(new THREE.ConeGeometry(5.2, 4.5, 16), new THREE.MeshStandardMaterial({ color: 0x9b2226 }));
      dome.position.y = 14;
      landmarkGroup.add(dome);
    }

    // Player Mesh Reference (Hidden in 1st person)
    const playerGroup = new THREE.Group();
    playerGroup.position.copy(playerPos.current);
    playerGroup.visible = false;
    scene.add(playerGroup);
    playerMeshRef.current = playerGroup;

    // 5 Relics around Landmark
    const relicPositions = archetype === 'galata' ? [
      new THREE.Vector3(7, 1.2, 7),
      new THREE.Vector3(-7, 1.2, 8),
      new THREE.Vector3(8, 1.2, -6),
      new THREE.Vector3(-8, 1.2, -6),
      new THREE.Vector3(0, 1.5, -11),
    ] : [
      new THREE.Vector3(7, 1.2, 5),
      new THREE.Vector3(-7, 1.2, 6),
      new THREE.Vector3(6, 1.2, -7),
      new THREE.Vector3(-6, 1.2, -7),
      new THREE.Vector3(0, 1.5, -9),
    ];

    const relicFacts = [
      `Tarihi Bilgi: ${city.name} ilimizin en bilinen simgesi "${city.landmark}" yapısıdır.`,
      `Dönem: Bu eser ${city.epoch} mirası olarak günümüze ulaşmıştır.`,
      `Mimar & Tarih: ${city.builder} tarafından ${city.century} döneminde inşa edilmiştir.`,
      `Efsane: "${city.legend.slice(0, 85)}..."`,
      `Tebrikler! ${city.name} ilinin tüm tarihi parçalarını tamamladın! Rozet: ${city.badgeName}`,
    ];

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffb703,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xff9f1c,
      emissiveIntensity: 0.4,
    });

    const relicsList: RelicItem[] = relicPositions.map((pos, idx) => {
      const g = new THREE.Group();
      g.position.copy(pos);

      const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.15, 16), goldMat);
      coin.rotation.x = Math.PI / 2;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.05, 8, 24), goldMat);
      g.add(coin, ring);
      scene.add(g);

      return {
        id: idx + 1,
        name: `Tarihi Kalıntı #${idx + 1}`,
        fact: relicFacts[idx],
        position: pos,
        mesh: g,
        collected: false,
      };
    });

    relicsRef.current = relicsList;

    // Keyboard Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      if (e.code === 'Space' && !isJumping.current) {
        playerVel.current.y = 6.2;
        isJumping.current = true;
        soundFX.playJump();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    // Pointer Lock & Direct Cursor Looking (No need to hold left click)
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === container;
      setIsPointerLocked(locked);
    };

    const handleCanvasClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest('button, input, a')) return;
      if (document.pointerLockElement !== container) {
        container.requestPointerLock?.();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isLocked = document.pointerLockElement === container;
      if (isLocked) {
        // Direct cursor look: moving mouse directly rotates view
        const dx = e.movementX || 0;
        const dy = e.movementY || 0;
        const sensitivity = 0.0024;
        fpLook.current.yaw -= dx * sensitivity;
        fpLook.current.pitch = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, fpLook.current.pitch - dy * sensitivity));
      } else if (isDragging.current) {
        const dx = e.clientX - prevMousePos.current.x;
        const dy = e.clientY - prevMousePos.current.y;
        prevMousePos.current = { x: e.clientX, y: e.clientY };

        const sensitivity = 0.004;
        fpLook.current.yaw -= dx * sensitivity;
        fpLook.current.pitch = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, fpLook.current.pitch - dy * sensitivity));
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Touch Drag Listeners for Mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - prevMousePos.current.x;
      const dy = e.touches[0].clientY - prevMousePos.current.y;
      prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const sensitivity = 0.005;
      fpLook.current.yaw -= dx * sensitivity;
      fpLook.current.pitch = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, fpLook.current.pitch - dy * sensitivity));
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    container.addEventListener('click', handleCanvasClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Fullscreen resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Main Game Loop
    const clock = new THREE.Clock();

    const tick = () => {
      if (isDisposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Keyboard movement processing in 1st person
      const moveSpeed = 8.5;
      const moveVec = new THREE.Vector3(0, 0, 0);

      const keys = keysPressed.current;
      const fwd = (keys['w'] || keys['arrowup']) ? 1 : 0;
      const bwd = (keys['s'] || keys['arrowdown']) ? 1 : 0;
      const lft = (keys['a'] || keys['arrowleft']) ? 1 : 0;
      const rgt = (keys['d'] || keys['arrowright']) ? 1 : 0;

      const yaw = fpLook.current.yaw;
      const forwardDir = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)).normalize();
      const rightDir = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw)).normalize();

      if (fwd - bwd !== 0) {
        moveVec.addScaledVector(forwardDir, (fwd - bwd) * moveSpeed * delta);
      }
      if (rgt - lft !== 0) {
        moveVec.addScaledVector(rightDir, (rgt - lft) * moveSpeed * delta);
      }

      // Movement & Collisions with Tower Cylinder
      playerPos.current.x += moveVec.x;
      playerPos.current.z += moveVec.z;

      const towerDist = Math.sqrt(playerPos.current.x ** 2 + playerPos.current.z ** 2);
      if (towerDist < 5.8) {
        const pushAngle = Math.atan2(playerPos.current.z, playerPos.current.x);
        playerPos.current.x = Math.cos(pushAngle) * 5.85;
        playerPos.current.z = Math.sin(pushAngle) * 5.85;
      }

      // Gravity & Jumping
      playerVel.current.y -= 18.0 * delta;
      playerPos.current.y += playerVel.current.y * delta;

      if (playerPos.current.y <= 0.8) {
        playerPos.current.y = 0.8;
        playerVel.current.y = 0;
        isJumping.current = false;
      }

      playerPos.current.x = Math.max(-28, Math.min(28, playerPos.current.x));
      playerPos.current.z = Math.max(-28, Math.min(28, playerPos.current.z));

      // 1. ŞAHIS KAMERA YERLEŞİMİ (First-Person Eye-Level Camera)
      const eyeHeight = 1.72;
      const isMoving = (fwd - bwd !== 0 || rgt - lft !== 0) && !isJumping.current;
      const headBob = isMoving ? Math.sin(time * 12) * 0.04 : 0;

      camera.position.set(
        playerPos.current.x,
        playerPos.current.y + eyeHeight + headBob,
        playerPos.current.z
      );

      const cosPitch = Math.cos(fpLook.current.pitch);
      const sinPitch = Math.sin(fpLook.current.pitch);
      const sinYaw = Math.sin(fpLook.current.yaw);
      const cosYaw = Math.cos(fpLook.current.yaw);

      const lookDir = new THREE.Vector3(
        -sinYaw * cosPitch,
        sinPitch,
        -cosYaw * cosPitch
      );

      camera.lookAt(
        camera.position.x + lookDir.x,
        camera.position.y + lookDir.y,
        camera.position.z + lookDir.z
      );

      // Relics Animation & Proximity
      let closestDist = Infinity;

      relicsRef.current.forEach((relic) => {
        if (!relic.collected && relic.mesh) {
          relic.mesh.rotation.y = time * 2.2;
          relic.mesh.position.y = relic.position.y + Math.sin(time * 3 + relic.id) * 0.25;

          const dist = playerPos.current.distanceTo(relic.position);
          if (dist < closestDist) {
            closestDist = dist;
          }

          if (dist < 1.9) {
            relic.collected = true;
            scene.remove(relic.mesh);
            soundFX.playRelicCollect();

            setRelicsCount((prev) => {
              const next = prev + 1;
              if (next >= totalRelics) {
                setIsGameOver(true);
                soundFX.playVictory();
                onBadgeEarned(city.badgeName);
              }
              return next;
            });

            setScore((prev) => prev + 100);
            setCurrentFact(relic.fact);
          }
        }
      });

      if (closestDist !== Infinity) {
        setDistanceToNearest(Math.round(closestDist * 10) / 10);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      container.removeEventListener('click', handleCanvasClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      if (document.pointerLockElement === container) {
        document.exitPointerLock?.();
      }
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [city, archetype, onBadgeEarned, totalRelics]);

  const handleTouchDir = (dir: 'up' | 'down' | 'left' | 'right', pressed: boolean) => {
    if (dir === 'up') keysPressed.current['w'] = pressed;
    if (dir === 'down') keysPressed.current['s'] = pressed;
    if (dir === 'left') keysPressed.current['a'] = pressed;
    if (dir === 'right') keysPressed.current['d'] = pressed;
  };

  const handleTouchJump = () => {
    if (!isJumping.current) {
      playerVel.current.y = 6.2;
      isJumping.current = true;
      soundFX.playJump();
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none cursor-crosshair">
      {/* Three.js Fullscreen Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* 1. Şahıs (First-Person) Center Reticle / Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-15 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border border-white/50 flex items-center justify-center shadow-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
        </div>
      </div>

      {/* Clean Sleek HUD: Top-Left (Back to Map) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-950/80 hover:bg-slate-900 text-white border border-white/20 shadow-xl backdrop-blur-md text-xs sm:text-sm font-extrabold transition-all hover:scale-102 cursor-pointer"
        >
          <BackIcon className="w-4 h-4 text-amber-400" />
          <span>Haritaya Dön</span>
        </button>

        <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-white/15 text-white shadow-xl backdrop-blur-md text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{city.name}</span>
          <span className="text-slate-400">·</span>
          <span className="text-amber-400">{activeLandmark}</span>
        </div>
      </div>

      {/* Clean Sleek HUD: Top-Right (Counters, Ambiance Toggle & Info button) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {/* Ambiyansı Siyaha Döndürme Düğmesi (Sağ Üstte) */}
        <button
          onClick={toggleNightMode}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-black text-xs shadow-xl transition-all hover:scale-105 cursor-pointer border backdrop-blur-md ${
            isNightMode
              ? 'bg-slate-900/90 text-amber-300 border-amber-400/50 shadow-amber-500/20'
              : 'bg-slate-950/85 text-indigo-200 border-white/20 hover:bg-slate-900'
          }`}
          title={isNightMode ? 'Gündüz Ambiyansına Dön' : 'Ambiyansı Siyaha Döndür (Gece Modu)'}
        >
          {isNightMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Gündüz</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Siyah Ambiyans</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-2xl text-white shadow-xl">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold leading-none">Emanetler</span>
            <span className="text-sm sm:text-base font-black text-amber-400 leading-tight">
              {relicsCount} / {totalRelics}
            </span>
          </div>
          <div className="h-6 w-px bg-white/15" />
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold leading-none">Puan</span>
            <span className="text-sm sm:text-base font-black text-emerald-400 leading-tight">
              +{score}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowBriefing(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xl transition-all hover:scale-102 cursor-pointer"
          title="Tarihi Bilgi & Görev Ekranı"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">Tarihçe</span>
        </button>
      </div>

      {/* Click-to-lock cursor banner for direct FPS mouse navigation */}
      {!isPointerLocked && !showBriefing && !isGameOver && (
        <button
          onClick={() => mountRef.current?.requestPointerLock?.()}
          className="absolute top-16 left-1/2 -translate-x-1/2 bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-2xl shadow-2xl border border-amber-300 text-xs sm:text-sm flex items-center gap-2 cursor-pointer z-30 transition-all hover:scale-102"
        >
          <Zap className="w-4 h-4 text-slate-950" />
          <span>Ekrana Tıkla: Serbest Bakış Aç (Sol Tık Basmaya Gerek Yok)</span>
        </button>
      )}

      {/* Dynamic Historical Fact Notification Toast */}
      {currentFact && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 max-w-lg w-11/12 bg-amber-500/95 text-slate-950 font-bold px-4 py-3 rounded-2xl shadow-2xl border border-amber-300 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 z-30">
          <Sparkles className="w-5 h-5 shrink-0 text-slate-950" />
          <div className="text-xs sm:text-sm leading-snug">
            {currentFact}
          </div>
          <button
            onClick={() => setCurrentFact(null)}
            className="ml-auto text-slate-900 hover:text-white text-xs px-2 py-1 rounded-lg bg-black/10 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Distance Radar Indicator */}
      {!isGameOver && relicsCount < totalRelics && (
        <div className="absolute bottom-6 left-4 bg-slate-950/80 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-2xl text-white text-xs font-mono flex items-center gap-2 pointer-events-none z-20 shadow-lg">
          <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>En Yakın Eser: <strong className="text-amber-300">{distanceToNearest}m</strong></span>
        </div>
      )}

      {/* Minimal Desktop Controls Dock */}
      <div className="absolute bottom-6 right-4 hidden sm:flex items-center gap-2 bg-slate-950/75 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-2xl text-white text-xs pointer-events-none z-20 shadow-lg">
        <span className="px-1.5 py-0.5 rounded bg-white/15 font-mono">W, A, S, D</span> ile Yürü · <span className="px-1.5 py-0.5 rounded bg-white/15 font-mono">Mouse</span> ile Doğrudan Bak · <span className="px-1.5 py-0.5 rounded bg-white/15 font-mono">Boşluk</span> ile Zıpla
      </div>

      {/* Mobile Touch Controls */}
      <div className="absolute bottom-6 left-4 flex flex-col items-center gap-1 sm:hidden z-20">
        <button
          onTouchStart={() => handleTouchDir('up', true)}
          onTouchEnd={() => handleTouchDir('up', false)}
          className="w-11 h-11 rounded-2xl bg-white/20 active:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs border border-white/30"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button
            onTouchStart={() => handleTouchDir('left', true)}
            onTouchEnd={() => handleTouchDir('left', false)}
            className="w-11 h-11 rounded-2xl bg-white/20 active:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs border border-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onTouchStart={() => handleTouchDir('down', true)}
            onTouchEnd={() => handleTouchDir('down', false)}
            className="w-11 h-11 rounded-2xl bg-white/20 active:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs border border-white/30"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <button
            onTouchStart={() => handleTouchDir('right', true)}
            onTouchEnd={() => handleTouchDir('right', false)}
            className="w-11 h-11 rounded-2xl bg-white/20 active:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs border border-white/30"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 right-4 sm:hidden z-20">
        <button
          onTouchStart={handleTouchJump}
          className="w-14 h-14 rounded-2xl bg-amber-500/90 active:bg-amber-600 text-slate-950 font-black flex items-center justify-center shadow-lg border border-amber-300"
        >
          <Zap className="w-6 h-6" />
        </button>
      </div>

      {/* ============================================================== */}
      {/* OYUNA BAŞLARKEN AÇILAN TARİHİ BİLGİ & GÖREV EKRANI (BRIEFING) */}
      {/* ============================================================== */}
      {showBriefing && (
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-lg p-4 sm:p-6 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {city.name} · {city.region} (Plaka: {city.plate})
              </span>
              <button
                onClick={() => {
                  setShowBriefing(false);
                  setTimeout(() => {
                    mountRef.current?.requestPointerLock?.();
                  }, 100);
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                title="Kapat ve Başla"
              >
                ✕
              </button>
            </div>

            {/* Landmark Selector for Istanbul */}
            {city.id === 'istanbul' && (
              <div className="flex flex-wrap gap-2 pt-1">
                {['Galata Kulesi', 'Kız Kulesi', 'Topkapı Sarayı'].map((lName) => {
                  const isActive = activeLandmark.toLowerCase().includes(lName.toLowerCase().slice(0, 5));
                  return (
                    <button
                      key={lName}
                      onClick={() => {
                        setActiveLandmark(lName);
                        setQuizSelected(null);
                        setQuizSubmitted(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg scale-102'
                          : 'bg-white/10 hover:bg-white/20 text-slate-300'
                      }`}
                    >
                      {lName === 'Galata Kulesi' && '🗼'}
                      {lName === 'Kız Kulesi' && '🏰'}
                      {lName === 'Topkapı Sarayı' && '👑'}
                      <span>{lName}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Landmark Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {missionData?.title || activeLandmark}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300/90 mt-1 font-semibold">
                <span>Dönem: {city.epoch}</span>
                <span>•</span>
                <span>Mimar: {city.builder}</span>
                <span>•</span>
                <span>{city.century}</span>
              </div>
            </div>

            {/* Historical Overview (Tarihçe & Efsane) */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2.5">
              <div>
                <strong className="text-amber-400 block text-xs font-bold uppercase tracking-wider mb-1">🏛️ Tarihçe</strong>
                <p>
                  {missionData?.Tarihçe || missionData?.history || city.shortDesc}
                </p>
              </div>
              <div className="pt-2 border-t border-white/10 text-xs text-amber-200/90 italic">
                <strong className="text-amber-400 not-italic block font-bold mb-0.5">✨ Efsane & Sır:</strong>
                "{missionData?.EfsaneOrSır || missionData?.legendOrSecret || city.legend}"
              </div>
            </div>

            {/* Mission & Controls (Oyun Görevi) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <span className="font-extrabold text-amber-400 block mb-1">🎯 Oyun Görevi</span>
                <p className="text-slate-300 leading-snug">
                  {missionData?.OyunGörevi || missionData?.gameMission || 'Tarihi meydanı 1. şahıs gözünden gez ve 5 altın tarihi eseri topla!'}
                </p>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="font-extrabold text-slate-200 block mb-1">🕹️ Kontroller</span>
                <p className="text-slate-400 leading-snug">
                  W, A, S, D ile yürü, mouse çevirerek etrafa bak (sol tıka basmaya gerek yok), Boşluk ile zıpla.
                </p>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={() => {
                setShowBriefing(false);
                setTimeout(() => {
                  mountRef.current?.requestPointerLock?.();
                }, 100);
              }}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl transition-all hover:scale-101 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-amber-300" />
              <span>Görevi Başlat!</span>
            </button>
          </div>
        </div>
      )}

      {/* Victory Screen */}
      {isGameOver && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center text-white z-50 animate-in fade-in zoom-in-95 duration-200 overflow-y-auto">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-xl mb-3 shrink-0">
            <Trophy className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Tebrikler! Görev Başarıyla Tamamlandı
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {city.name} ({activeLandmark}) Keşfini Bitirdin!
          </h3>

          <div className="bg-white/10 border border-white/15 px-5 py-3 rounded-2xl my-2 text-xs sm:text-sm max-w-md text-slate-200">
            <p className="font-bold text-amber-300 mb-1 flex items-center justify-center gap-1.5 text-sm">
              <Award className="w-4 h-4 text-amber-400" />
              Kazanılan Rozet: {city.badgeName}
            </p>
            <p className="text-xs text-slate-300">
              Tarihi yapının tüm sırlarını ve mimari parçalarını başarıyla açığa çıkardın!
            </p>
          </div>

          {/* Interactive Student Quiz */}
          {missionData?.studentQuiz && (
            <div className="w-full max-w-md bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl my-2 text-left space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Öğrenci Bilgi Sorusu</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-100">
                {missionData.studentQuiz.Soru || missionData.studentQuiz.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {(missionData.studentQuiz.Seçenekler || missionData.studentQuiz.options || []).map((option, idx) => {
                  const correctIdx = missionData.studentQuiz!.correctIndex;
                  const isCorrect = idx === correctIdx;
                  const isSelected = quizSelected === idx;
                  let btnStyle = "bg-white/5 hover:bg-white/10 border-white/10 text-slate-200";
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500/30 border-emerald-500 text-emerald-200 font-bold";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-500/30 border-rose-500 text-rose-200";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-amber-500/30 border-amber-500 text-amber-200 font-bold";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizSubmitted}
                      onClick={() => {
                        setQuizSelected(idx);
                        setQuizSubmitted(true);
                        if (isCorrect) {
                          setScore((s) => s + 200);
                          soundFX.playRelicCollect();
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${btnStyle}`}
                    >
                      <span className="font-bold mr-1.5">{String.fromCharCode(65 + idx)})</span>
                      {option}
                    </button>
                  );
                })}
              </div>
              {quizSubmitted && (
                <p className={`text-xs text-center font-bold pt-1 ${quizSelected === missionData.studentQuiz.correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {quizSelected === missionData.studentQuiz.correctIndex ? '🎉 Harika! Doğru cevap (+200 Puan)' : '✨ Bir sonraki sefere daha dikkatli incele!'}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => {
                setRelicsCount(0);
                setIsGameOver(false);
                setScore(0);
                setQuizSelected(null);
                setQuizSubmitted(false);
              }}
              className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Yeniden Oyna</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-xs sm:text-sm shadow-lg transition-all hover:scale-102 cursor-pointer flex items-center gap-2"
            >
              <BackIcon className="w-4 h-4" />
              <span>Haritaya Dön</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ProjectData, PROJECTS_DATA } from '@/lib/projectsData';

export type NavZone =
  | 'exterior'
  | 'walkin_living'
  | 'walkin_workspace'
  | 'walkin_courtyard'
  | 'walkin_material'
  | 'walkin_studio'
  | 'project_archive'
  | 'model_viewer';

export type TimeOfDay = 'sunrise' | 'midday' | 'golden_hour' | 'dusk_night';
export type ViewMode = 'photorealistic' | 'blueprint' | 'xray';

interface ArchitecturalCanvasProps {
  currentZone: NavZone;
  timeOfDay: TimeOfDay;
  viewMode: ViewMode;
  isRoofRemoved: boolean;
  isExploded: boolean;
  activeFloor: number; // 0: All, 1: Ground, 2: Upper, 3: Roof
  selectedProject: ProjectData | null;
  onSelectZone: (zone: NavZone) => void;
  onSelectProject: (project: ProjectData) => void;
  onCameraCoordinatesUpdate?: (coords: { x: number; y: number; z: number }) => void;
}

export const ArchitecturalCanvas: React.FC<ArchitecturalCanvasProps> = ({
  currentZone,
  timeOfDay,
  viewMode,
  isRoofRemoved,
  isExploded,
  activeFloor,
  selectedProject,
  onSelectZone,
  onSelectProject,
  onCameraCoordinatesUpdate,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const modelOrbitRef = useRef<{ alpha: number; beta: number }>({ alpha: 0.4, beta: 0.3 });

  // References for Three objects that need animation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const foliageGroupRef = useRef<THREE.Group | null>(null);
  const projectPlatesGroupRef = useRef<THREE.Group | null>(null);

  // Structural groups for exploded view
  const floorGroundGroupRef = useRef<THREE.Group | null>(null);
  const floorUpperGroupRef = useRef<THREE.Group | null>(null);
  const roofGroupRef = useRef<THREE.Group | null>(null);

  // Target camera positions
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(22, 10, 26));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 3, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 3, 0));

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f5f0);
    scene.fog = new THREE.FogExp2(0xf7f5f0, 0.012);
    sceneRef.current = scene;

    // --- 2. CAMERA SETUP ---
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(22, 10, 26);
    cameraRef.current = camera;

    // --- 3. RENDERER SETUP ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- 4. LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 0.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfff5ea, 0x3d3935, 0.7);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xffb380, 1.8);
    dirLight.position.set(35, 20, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    const d = 30;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // --- 5. PROCEDURAL TEXTURES CREATION ---
    // Board-formed concrete texture
    const canvasConc = document.createElement('canvas');
    canvasConc.width = 512;
    canvasConc.height = 512;
    const ctxConc = canvasConc.getContext('2d')!;
    ctxConc.fillStyle = '#8C877D';
    ctxConc.fillRect(0, 0, 512, 512);
    // Draw wood grain lines on concrete
    for (let i = 0; i < 512; i += 32) {
      ctxConc.fillStyle = 'rgba(40,38,35,0.08)';
      ctxConc.fillRect(0, i, 512, 2);
      ctxConc.fillStyle = 'rgba(255,255,255,0.06)';
      ctxConc.fillRect(0, i + 16, 512, 1);
    }
    // Noise
    for (let n = 0; n < 8000; n++) {
      ctxConc.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)';
      ctxConc.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
    const concTexture = new THREE.CanvasTexture(canvasConc);
    concTexture.wrapS = THREE.RepeatWrapping;
    concTexture.wrapT = THREE.RepeatWrapping;
    concTexture.repeat.set(4, 4);

    // Travertine texture
    const canvasTrav = document.createElement('canvas');
    canvasTrav.width = 512;
    canvasTrav.height = 512;
    const ctxTrav = canvasTrav.getContext('2d')!;
    ctxTrav.fillStyle = '#DCD5C9';
    ctxTrav.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 30; i++) {
      ctxTrav.fillStyle = 'rgba(160,150,135,0.12)';
      const y = Math.random() * 512;
      ctxTrav.fillRect(0, y, 512, 8 + Math.random() * 12);
    }
    const travTexture = new THREE.CanvasTexture(canvasTrav);

    // --- 6. MATERIALS ---
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0x9e988e,
      roughness: 0.75,
      metalness: 0.05,
      map: concTexture,
    });

    const travertineMaterial = new THREE.MeshStandardMaterial({
      color: 0xdcd5c9,
      roughness: 0.5,
      metalness: 0.02,
      map: travTexture,
    });

    const darkConcreteMaterial = new THREE.MeshStandardMaterial({
      color: 0x242321,
      roughness: 0.8,
      metalness: 0.1,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeef5f8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5,
      reflectivity: 0.9,
    });

    const bronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a4838,
      roughness: 0.35,
      metalness: 0.8,
    });

    const woodSlatMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a3625,
      roughness: 0.6,
      metalness: 0.05,
    });

    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a5a68,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.8,
    });

    const foliageMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d422f,
      roughness: 0.8,
      metalness: 0.05,
    });

    // --- 7. BUILD BRUTALIST RESIDENCE MODEL ---
    const buildingRoot = new THREE.Group();
    scene.add(buildingRoot);

    // Ground Floor Group
    const floorGroundGroup = new THREE.Group();
    floorGroundGroupRef.current = floorGroundGroup;
    buildingRoot.add(floorGroundGroup);

    // Upper Floor Group
    const floorUpperGroup = new THREE.Group();
    floorUpperGroupRef.current = floorUpperGroup;
    buildingRoot.add(floorUpperGroup);

    // Roof Group
    const roofGroup = new THREE.Group();
    roofGroupRef.current = roofGroup;
    buildingRoot.add(roofGroup);

    // --- A. SITE & WATER REFLECTION POOL ---
    const siteBase = new THREE.Mesh(new THREE.BoxGeometry(60, 1, 60), travertineMaterial);
    siteBase.position.set(0, -0.5, 0);
    siteBase.receiveShadow = true;
    scene.add(siteBase);

    // Water pool basin
    const poolBasin = new THREE.Mesh(new THREE.BoxGeometry(24, 0.4, 16), darkConcreteMaterial);
    poolBasin.position.set(2, 0.1, 10);
    poolBasin.receiveShadow = true;
    scene.add(poolBasin);

    const waterPlane = new THREE.Mesh(new THREE.PlaneGeometry(23.6, 15.6), waterMaterial);
    waterPlane.rotation.x = -Math.PI / 2;
    waterPlane.position.set(2, 0.28, 10);
    waterPlane.receiveShadow = true;
    waterMeshRef.current = waterPlane;
    scene.add(waterPlane);

    // Floating Travertine Step Stones across water pool
    for (let i = 0; i < 5; i++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.3, 1.4), travertineMaterial);
      step.position.set(-6 + i * 2.8, 0.3, 8);
      step.castShadow = true;
      step.receiveShadow = true;
      scene.add(step);
    }

    // --- B. GROUND FLOOR STRUCTURE ---
    // Concrete core walls (Living space & Courtyard)
    const wallLeft = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4, 18), concreteMaterial);
    wallLeft.position.set(-10, 2, 0);
    wallLeft.castShadow = true;
    wallLeft.receiveShadow = true;
    floorGroundGroup.add(wallLeft);

    const wallRear = new THREE.Mesh(new THREE.BoxGeometry(22, 4, 0.8), concreteMaterial);
    wallRear.position.set(0, 2, -9);
    wallRear.castShadow = true;
    wallRear.receiveShadow = true;
    floorGroundGroup.add(wallRear);

    // Glass facade facing water pool (Living Room)
    const glassFacade = new THREE.Mesh(new THREE.BoxGeometry(14, 3.8, 0.2), glassMaterial);
    glassFacade.position.set(-2, 2, 3);
    glassFacade.castShadow = true;
    floorGroundGroup.add(glassFacade);

    // Bronze Mullions along glass facade
    for (let x = -8; x <= 4; x += 3) {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.8, 0.25), bronzeMaterial);
      mullion.position.set(x, 2, 3.05);
      mullion.castShadow = true;
      floorGroundGroup.add(mullion);
    }

    // Interior furniture in Living Room
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.6, 2.2), darkConcreteMaterial);
    sofaBase.position.set(-4, 0.3, -2);
    sofaBase.castShadow = true;
    floorGroundGroup.add(sofaBase);

    const coffeeTable = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.4, 1.2), travertineMaterial);
    coffeeTable.position.set(-4, 0.2, 0.5);
    coffeeTable.castShadow = true;
    floorGroundGroup.add(coffeeTable);

    // Glowing Fireplace Column
    const fireplaceCol = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3.8, 1.2), darkConcreteMaterial);
    fireplaceCol.position.set(-8, 2, -4);
    fireplaceCol.castShadow = true;
    floorGroundGroup.add(fireplaceCol);

    const fireGlow = new THREE.PointLight(0xff6622, 1.5, 8);
    fireGlow.position.set(-8, 1.2, -3.2);
    floorGroundGroup.add(fireGlow);

    // Courtyard Garden (Open Air inside)
    const courtyardTree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 3.5), woodSlatMaterial);
    trunk.position.set(4, 1.75, -2);
    courtyardTree.add(trunk);

    const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(1.8, 1), foliageMaterial);
    foliage.position.set(4, 3.8, -2);
    foliage.castShadow = true;
    courtyardTree.add(foliage);
    floorGroundGroup.add(courtyardTree);

    // --- C. UPPER FLOOR CANTILEVER STRUCTURE ---
    const upperSlab = new THREE.Mesh(new THREE.BoxGeometry(24, 0.6, 20), concreteMaterial);
    upperSlab.position.set(1, 4.3, -1);
    upperSlab.castShadow = true;
    upperSlab.receiveShadow = true;
    floorUpperGroup.add(upperSlab);

    // Cantilevered Living/Master Volume protruding over water
    const cantileverBox = new THREE.Mesh(new THREE.BoxGeometry(16, 3.6, 12), concreteMaterial);
    cantileverBox.position.set(-1, 6.4, 2);
    cantileverBox.castShadow = true;
    cantileverBox.receiveShadow = true;
    floorUpperGroup.add(cantileverBox);

    // Upper Glass Window Band
    const upperGlass = new THREE.Mesh(new THREE.BoxGeometry(12, 2.8, 0.2), glassMaterial);
    upperGlass.position.set(-1, 6.4, 8.05);
    floorUpperGroup.add(upperGlass);

    // Timber Louvers on Upper Box
    for (let x = 6; x <= 10; x += 0.8) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.5, 0.6), woodSlatMaterial);
      louver.position.set(x, 6.4, 8.3);
      louver.castShadow = true;
      floorUpperGroup.add(louver);
    }

    // --- D. ROOF SLAB ---
    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(26, 0.6, 22), concreteMaterial);
    roofSlab.position.set(1, 8.5, -1);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    roofGroup.add(roofSlab);

    // --- E. SPATIAL FOLIAGE & LANDSCAPE TREES ---
    const foliageGroup = new THREE.Group();
    foliageGroupRef.current = foliageGroup;
    scene.add(foliageGroup);

    // Perimeter Cypress & Pine trees
    const treePositions = [
      { x: -20, z: -15 }, { x: -22, z: 10 }, { x: -18, z: 22 },
      { x: 22, z: -18 }, { x: 24, z: -5 }, { x: 20, z: 18 }
    ];
    treePositions.forEach((pos) => {
      const tree = new THREE.Group();
      const tTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 6), woodSlatMaterial);
      tTrunk.position.set(pos.x, 3, pos.z);
      tTrunk.castShadow = true;
      tree.add(tTrunk);

      const tFoliage = new THREE.Mesh(new THREE.ConeGeometry(2.5, 8, 8), foliageMaterial);
      tFoliage.position.set(pos.x, 8, pos.z);
      tFoliage.castShadow = true;
      tree.add(tFoliage);
      foliageGroup.add(tree);
    });

    // --- F. SPATIAL PROJECT ARCHIVE SHEETS ---
    const projectPlatesGroup = new THREE.Group();
    projectPlatesGroupRef.current = projectPlatesGroup;
    scene.add(projectPlatesGroup);

    PROJECTS_DATA.forEach((proj, idx) => {
      const plateGroup = new THREE.Group();
      // Position floating sheets in a circular spatial gallery
      const angle = (idx / PROJECTS_DATA.length) * Math.PI * 1.5 - Math.PI * 0.75;
      const radius = 22;
      const px = Math.cos(angle) * radius;
      const pz = Math.sin(angle) * radius + 5;
      const py = 8 + (idx % 2) * 2;

      plateGroup.position.set(px, py, pz);
      plateGroup.rotation.y = -angle + Math.PI / 2;

      // 3D Architectural Blueprint Sheet / Monograph Board
      const plateMesh = new THREE.Mesh(
        new THREE.BoxGeometry(8, 11, 0.1),
        new THREE.MeshStandardMaterial({
          color: 0x22211f,
          roughness: 0.4,
          metalness: 0.2,
        })
      );
      plateMesh.castShadow = true;
      plateGroup.add(plateMesh);

      // Inner Canvas Text Texture for Sheet Title
      const sheetCanvas = document.createElement('canvas');
      sheetCanvas.width = 512;
      sheetCanvas.height = 700;
      const sCtx = sheetCanvas.getContext('2d')!;
      sCtx.fillStyle = '#1e1d1b';
      sCtx.fillRect(0, 0, 512, 700);

      // Blueprint border
      sCtx.strokeStyle = '#c5a059';
      sCtx.lineWidth = 4;
      sCtx.strokeRect(20, 20, 472, 660);

      // Grid
      sCtx.strokeStyle = 'rgba(197, 160, 89, 0.15)';
      sCtx.lineWidth = 1;
      for (let g = 40; g < 660; g += 40) {
        sCtx.beginPath();
        sCtx.moveTo(20, g);
        sCtx.lineTo(492, g);
        sCtx.stroke();
      }

      sCtx.fillStyle = '#F7F5F0';
      sCtx.font = 'bold 36px Georgia, serif';
      sCtx.fillText(proj.title, 40, 90);

      sCtx.fillStyle = '#C5A059';
      sCtx.font = '22px sans-serif';
      sCtx.fillText(proj.subtitle.toUpperCase(), 40, 130);

      sCtx.fillStyle = '#A09D96';
      sCtx.font = '18px monospace';
      sCtx.fillText(`LOCATION: ${proj.location.toUpperCase()}`, 40, 180);
      sCtx.fillText(`AREA: ${proj.areaSqM} SQ.M | YEAR: ${proj.year}`, 40, 210);

      // Draw conceptual vector lines
      sCtx.strokeStyle = '#F7F5F0';
      sCtx.lineWidth = 2;
      sCtx.strokeRect(40, 250, 432, 280);

      sCtx.beginPath();
      sCtx.moveTo(60, 480);
      sCtx.lineTo(240, 320);
      sCtx.lineTo(450, 480);
      sCtx.stroke();

      sCtx.fillStyle = '#C5A059';
      sCtx.font = '16px sans-serif';
      sCtx.fillText('EXPLORE MONOGRAPH SHEET →', 40, 580);

      const sheetTexture = new THREE.CanvasTexture(sheetCanvas);
      const faceMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(7.8, 10.8),
        new THREE.MeshBasicMaterial({ map: sheetTexture })
      );
      faceMesh.position.z = 0.06;
      plateGroup.add(faceMesh);

      // Store project ref
      (plateGroup as unknown as { userData: { project: ProjectData } }).userData = { project: proj };
      projectPlatesGroup.add(plateGroup);
    });

    // --- 8. INTERACTIVE RAYCASTING FOR ROOM & PROJECT SELECTION ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      if (currentZone === 'model_viewer') {
        modelOrbitRef.current.alpha -= deltaX * 0.005;
        modelOrbitRef.current.beta = Math.max(0.1, Math.min(Math.PI / 2.2, modelOrbitRef.current.beta + deltaY * 0.005));
      }

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (!mountRef.current || !cameraRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, cameraRef.current);

      if (currentZone === 'project_archive' && projectPlatesGroupRef.current) {
        const intersects = raycaster.intersectObjects(projectPlatesGroupRef.current.children, true);
        if (intersects.length > 0) {
          let parent: THREE.Object3D | null = intersects[0].object;
          while (parent && !(parent.userData && parent.userData.project)) {
            parent = parent.parent;
          }
          if (parent && parent.userData && parent.userData.project) {
            onSelectProject(parent.userData.project as ProjectData);
          }
        }
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('click', handleClick);

    // --- 9. RESIZE HANDLER ---
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // --- 10. ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle water ripple animation
      if (waterMeshRef.current) {
        waterMeshRef.current.position.y = 0.28 + Math.sin(elapsedTime * 2.0) * 0.02;
      }

      // Foliage sway in breeze
      if (foliageGroupRef.current) {
        foliageGroupRef.current.children.forEach((tree, idx) => {
          tree.rotation.z = Math.sin(elapsedTime * 1.5 + idx) * 0.02;
        });
      }

      // Floating project plates slow oscillation
      if (projectPlatesGroupRef.current) {
        projectPlatesGroupRef.current.children.forEach((plate, idx) => {
          plate.position.y += Math.sin(elapsedTime * 1.2 + idx) * 0.003;
        });
      }

      // Smooth camera position interpolation
      if (cameraRef.current) {
        // If in model viewer, calculate orbit
        if (currentZone === 'model_viewer') {
          const r = 32;
          const alpha = modelOrbitRef.current.alpha;
          const beta = modelOrbitRef.current.beta;

          targetCamPos.current.x = r * Math.sin(alpha) * Math.cos(beta);
          targetCamPos.current.y = r * Math.sin(beta) + 4;
          targetCamPos.current.z = r * Math.cos(alpha) * Math.cos(beta);
          targetLookAt.current.set(0, 3, 0);
        }

        cameraRef.current.position.lerp(targetCamPos.current, 0.04);
        currentLookAt.current.lerp(targetLookAt.current, 0.04);
        cameraRef.current.lookAt(currentLookAt.current);

        if (onCameraCoordinatesUpdate) {
          onCameraCoordinatesUpdate({
            x: Number(cameraRef.current.position.x.toFixed(1)),
            y: Number(cameraRef.current.position.y.toFixed(1)),
            z: Number(cameraRef.current.position.z.toFixed(1)),
          });
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // --- CAMERA WAYPOINTS & EXPLODED VIEWS UPDATER ---
  useEffect(() => {
    switch (currentZone) {
      case 'exterior':
        targetCamPos.current.set(22, 10, 26);
        targetLookAt.current.set(0, 3, 0);
        break;
      case 'walkin_living':
        targetCamPos.current.set(-2, 2.2, 2.5);
        targetLookAt.current.set(-6, 2.0, -2.0);
        break;
      case 'walkin_workspace':
        targetCamPos.current.set(2, 6.2, 4);
        targetLookAt.current.set(-1, 6.0, -1);
        break;
      case 'walkin_courtyard':
        targetCamPos.current.set(4, 2.0, 2.5);
        targetLookAt.current.set(4, 2.5, -2.0);
        break;
      case 'walkin_material':
        targetCamPos.current.set(-8, 2.2, -2.0);
        targetLookAt.current.set(-10, 2.2, -6.0);
        break;
      case 'walkin_studio':
        targetCamPos.current.set(12, 6.2, -2.0);
        targetLookAt.current.set(8, 6.0, -6.0);
        break;
      case 'project_archive':
        targetCamPos.current.set(0, 10, 34);
        targetLookAt.current.set(0, 8, 0);
        break;
      case 'model_viewer':
        // Orbit position is handled in render loop
        break;
    }
  }, [currentZone]);

  // --- TIME OF DAY LIGHTING ADJUSTER ---
  useEffect(() => {
    if (!dirLightRef.current || !hemiLightRef.current || !sceneRef.current) return;
    const dir = dirLightRef.current;
    const hemi = hemiLightRef.current;
    const scene = sceneRef.current;

    switch (timeOfDay) {
      case 'sunrise':
        dir.color.setHex(0xffb380);
        dir.intensity = 1.8;
        dir.position.set(35, 18, 25);
        hemi.color.setHex(0xfff5ea);
        hemi.groundColor.setHex(0x3d3935);
        scene.background = new THREE.Color(0xf7f5f0);
        scene.fog = new THREE.FogExp2(0xf7f5f0, 0.01);
        break;
      case 'midday':
        dir.color.setHex(0xffffff);
        dir.intensity = 2.2;
        dir.position.set(10, 50, 10);
        hemi.color.setHex(0xe8f4f8);
        hemi.groundColor.setHex(0x423d38);
        scene.background = new THREE.Color(0xf2f4f5);
        scene.fog = new THREE.FogExp2(0xf2f4f5, 0.008);
        break;
      case 'golden_hour':
        dir.color.setHex(0xff8c42);
        dir.intensity = 2.0;
        dir.position.set(40, 10, 15);
        hemi.color.setHex(0xffd6b3);
        hemi.groundColor.setHex(0x2a2420);
        scene.background = new THREE.Color(0xf5eae0);
        scene.fog = new THREE.FogExp2(0xf5eae0, 0.012);
        break;
      case 'dusk_night':
        dir.color.setHex(0x406080);
        dir.intensity = 0.4;
        dir.position.set(-20, 30, -20);
        hemi.color.setHex(0x1a2636);
        hemi.groundColor.setHex(0x0a0c10);
        scene.background = new THREE.Color(0x10131a);
        scene.fog = new THREE.FogExp2(0x10131a, 0.018);
        break;
    }
  }, [timeOfDay]);

  // --- EXPLODED FLOORS & ROOF REMOVAL ANIMATOR ---
  useEffect(() => {
    if (!floorUpperGroupRef.current || !roofGroupRef.current) return;

    const upperGroup = floorUpperGroupRef.current;
    const roof = roofGroupRef.current;

    if (isExploded) {
      // Expand floors along Y axis
      upperGroup.position.y = 4.0; // lift upper floor by 4 units
      roof.position.y = 8.0; // lift roof by 8 units
    } else {
      upperGroup.position.y = 0;
      roof.position.y = 0;
    }

    if (isRoofRemoved) {
      roof.visible = false;
    } else {
      roof.visible = true;
    }
  }, [isExploded, isRoofRemoved]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};

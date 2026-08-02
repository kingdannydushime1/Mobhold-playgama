// Game constants
const TILE_SIZE = 16;
const PLAYER_TILE_SIZE = 48;
const PLAYER_SCALED_SIZE = 128;  // Display player at 96x96
const BASE_SCALE = 3;
let scale = BASE_SCALE;
let SCALED_TILE = TILE_SIZE * scale;
const PLAYER_SPEED = 150;
const SPEED_BOOST_MULTIPLIER = 1.25;
const SPEED_BOOST_DURATION = 1.5; // seconds
const POST_UPGRADE_INVINCIBILITY = 1.5; // seconds of invincibility after upgrade
const POST_UPGRADE_DELAY = 1.0; // seconds of pause after selecting upgrade

// Safe zones for mobile UI
const SAFE_TOP = 50;
const SAFE_BOTTOM = 60;
const SAFE_LEFT = 20;
const SAFE_RIGHT = 20;
const SAFE_AREA = { top: SAFE_TOP, bottom: SAFE_BOTTOM, left: SAFE_LEFT, right: SAFE_RIGHT };
const MIN_TOUCH_TARGET = 44;

// Lives system
const MAX_LIVES = 3;
const STARTING_LIVES = 1;
const DAMAGE_INVINCIBILITY = 1.5; // seconds after taking damage
const KNOCKBACK_RADIUS = 150;     // pixels
const KNOCKBACK_FORCE = 200;      // push strength

// Heart collectibles
const HEART_SPAWN_MIN = 20000;    // 20 seconds minimum between spawns
const HEART_SPAWN_MAX = 45000;    // 45 seconds maximum
const HEART_COLLECT_RADIUS = 60;  // pickup distance
const HEART_DESPAWN_TIME = 15000; // disappear after 15 seconds

// ============================================
// LEVEL SYSTEM CONSTANTS
// ============================================
const TOTAL_LEVELS = 300;
// ============================================
// BOSS SYSTEM CONSTANTS
// ============================================
const BOSS_INTERVAL = 120;          // seconds between boss spawns
const BOSS_HEALTH_BASE = 500;       // base HP
const BOSS_HEALTH_SCALE = 1.5;      // multiplier per boss defeated
const BOSS_SIZE = 96;               // display size
const BOSS_SPEED = 60;              // movement speed
const BOSS_DAMAGE = 2;              // hits to kill player
const BOSS_CHARGE_SPEED = 250;      // charge attack speed
const BOSS_CHARGE_DURATION = 1.0;   // seconds
const BOSS_ORB_SPEED = 150;         // projectile speed
const BOSS_ORB_INTERVAL = 2.0;      // seconds between orb shots
const BOSS_WARN_DURATION = 3.0;     // warning before spawn
const BOSS_HEALTH_BAR_WIDTH = 400;
const BOSS_HEALTH_BAR_HEIGHT = 20;

// ============================================
// KILL STREAK CONSTANTS
// ============================================
const STREAK_DOUBLE = 2;
const STREAK_TRIPLE = 3;
const STREAK_QUAD = 4;
const STREAK_PENTA = 5;
const STREAK_KILLING_SPREE = 7;
const STREAK_UNSTOPPABLE = 10;
const STREAK_GODLIKE = 15;
const STREAK_LEGENDARY = 20;
const STREAK_WINDOW = 3.0;          // seconds to chain kills for streak
const STREAK_ANNOUNCE_DURATION = 2.5;

// ============================================
// PARTICLE SYSTEM CONSTANTS
// ============================================
const MAX_PARTICLES = 500;
const PARTICLE_GRAVITY = 300;


function calculateScale() {
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
    // Reduce scale on small screens (< 600px)
    if (minDimension < 600) {
        scale = 2;
    } else if (minDimension < 800) {
        scale = 2.5;
    } else {
        scale = BASE_SCALE;
    }
    SCALED_TILE = TILE_SIZE * scale;
}

// Tile types for the map
// overlay: true means draw on top of standard grass tile
const TILE_TYPES = {
    GRASS: { col: 4, row: 3, blocking: false },
    GRASS_DECORATED: { col: 0, row: 3, blocking: false },
    // Vertical mountain (column 0, rows 4-6)
    MOUNTAIN_TOP: { col: 0, row: 4, blocking: true, overlay: true },
    MOUNTAIN_MID: { col: 0, row: 5, blocking: true, overlay: true },
    MOUNTAIN_BASE: { col: 0, row: 6, blocking: true, overlay: true },
    // Horizontal mountain (column 7, rows 1-3)
    MOUNTAIN_H_LEFT: { col: 1, row: 7, blocking: true, overlay: true },
    MOUNTAIN_H_MID: { col: 2, row: 7, blocking: true, overlay: true },
    MOUNTAIN_H_RIGHT: { col: 3, row: 7, blocking: true, overlay: true },
    PLANT: { blocking: false, isPlant: true }
};

const tileMap = new Map(); // Sparse storage: "x,y" -> tile type
const ENEMY_BASE_SPEED = 60;
const PROJECTILE_SPEED = 300;
const MIN_SPAWN_INTERVAL = 500;
const DEFAULT_SPAWN_INTERVAL = 2500;

// Swarm event constants
const SWARM_FIRST_DELAY = 45000; // First swarm after 45 seconds
const SWARM_INTERVAL = 35000; // Then every 35 seconds
const SWARM_MIN_COUNT = 5;
const SWARM_MAX_COUNT = 12;
const SWARM_SPAWN_RADIUS_MIN = 400;
const SWARM_SPAWN_RADIUS_MAX = 550;
const CENTER_DEAD_ZONE = 50;

// Ambush spawn constants
const AMBUSH_FIRST_DELAY = 20000;    // First ambush after 20 seconds
const AMBUSH_BASE_INTERVAL = 20000;  // Base interval (20s)
const AMBUSH_MIN_INTERVAL = 6000;    // Minimum interval in late game (6s)
const AMBUSH_DISTANCE_TILES = 6;     // Spawn 6 tiles ahead
const SPAWN_EVENT_MIN_GAP = 4000;    // Minimum gap between swarm and ambush (4s)

// Bomb constants
const BOMB_TRAVEL_DISTANCE = 100;
const BOMB_FUSE_TIME = 1000;
const BOMB_EXPLODE_RADIUS = SCALED_TILE * 2;
const EXPLOSION_FRAME_DURATION = 50; // ms per frame
const EXPLOSION_TOTAL_FRAMES = 16; // 4x4 sprite sheet
const BLOOD_FRAME_DURATION = 40; // ms per frame
const BLOOD_TOTAL_FRAMES = 16; // 4x4 sprite sheet

// Circlet constants
const Circlet_ORBIT_RADIUS = 160;
const Circlet_ORBIT_SPEED = 2; // radians per second
const Circlet_HIT_COOLDOWN = 500; // ms between hits on same enemy

// Shuriken constants
const SHURIKEN_SPIN_SPEED = 12; // radians per second

// === PROJECTILE TRAILS ===
const TRAIL_LENGTH = 10;
const TRAIL_WIDTH_MAX = 12;
const TRAIL_COLORS = {
    Arrow:   { r: 255, g: 140, b: 0 },
    Shuriken:{ r: 255, g: 255, b: 220 },
    Kunai:   { r: 0,   g: 220, b: 255 },
    Bomb:    { r: 255, g: 60,  b: 20 },
    Circlet: { r: 100, g: 140, b: 255 }
};

// Upgrade thresholds (earlier upgrades, then scales up)
const UPGRADE_THRESHOLDS = [50, 150, 300, 550, 900, 1400, 2100, 3000, 4200, 5700, 7500, 9900, 12900, 16500, 21000, 27000, 36000, 45000, 60000, 120000];

// Scroll config
const SCROLL_TYPES = ['ScrollFire', 'ScrollIce', 'ScrollThunder'];
const SCROLL_CONFIG = {
    ScrollThunder: { minInterval: 4000, maxInterval: 8000, damage: 25, effectFrames: 8, frameWidth: 64, desc: ['25 instant dmg', 'nearest enemy'] },
    ScrollFire: { minInterval: 5000, maxInterval: 10000, burnDamage: 3, burnDuration: 3000, tickInterval: 500, effectFrames: 10, frameWidth: 48, desc: ['18 burn dmg/3s', 'nearest enemy'] },
    ScrollIce: { minInterval: 6000, maxInterval: 12000, freezeDuration: 2000, effectFrames: 10, frameWidth: 48, desc: ['Freeze 2s', 'nearest enemy'] }
};

// Biome sprite sheet decoration index mapping (row in sprite sheet = index + 1)
const BIOME_DECO_MAP = {
    plains: ['wildflower','tall_grass','small_rock','shrub','fence','log','butterfly','mushroom'],
    forest: ['tree_oak','tree_pine','bush_large','fern','flower_wild','mushroom_group','stump_mossy','fallen_log'],
    desert: ['cactus_tall','cactus_saguaro','dune_ripple','skull_buried','dead_bush','rock_sandstone','bone_pile','scorpion_hole'],
    snow: ['pine_snow','pine_small','ice_crystal','snowdrift','frozen_lake','rock_icy','igloo_ruin','wolf_tracks'],
    swamp: ['mushroom_glow','deadtree_twisted','lily_pad','vine_hanging','mud_bubble','frog_spawn','reeds','carnivorous_plant'],
    volcanic: ['volcanic_rock','fire_geyser','lava_crack','obsidian_spike','skull_charred','ash_pile','magma_vent','burned_tree'],
    crystal: ['crystal_cluster','crystal_single','gem_ruby','gem_sapphire','amethyst_column','crystal_floor','geode','glow_moss'],
    corruption: ['corruption_tower','watcher_eye','tendril_large','void_crystal','corruption_pile','shadow_pool','spike\u8150\u8d25','whisper_orb'],
    celestial: ['cloud_fluffy','cloud_wispy','star_pillar','light_well','floating_rock','aurora_streak','moon_shard','celestial_bloom']
};

// Monster type to folder and sprite file mapping
const MONSTER_SPRITE_MAP = {
    'SpiderYellow': { folder: 'SpiderYellow', file: 'SpriteSheet.png' },
    'YellowBat': { folder: 'YellowsBat', file: 'SpriteSheet.png' },
    'Eye': { folder: 'Eye', file: 'Eye.png' },
    'Eye2': { folder: 'Eye2', file: 'Eye2.png' },
    'Beast': { folder: 'Beast', file: 'Beast.png' },
    'Beast2': { folder: 'Beast2', file: 'Beast2.png' },
    'Reptile': { folder: 'Reptile', file: 'Reptile.png' },
    'Cyclopse': { folder: 'Cyclope', file: 'SpriteSheet.png' },
    'Cyclopse2': { folder: 'Cyclope2', file: 'SpriteSheet.png' }
};

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Ensure CSS size matches internal canvas size to prevent coordinate mismatch
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    ctx.imageSmoothingEnabled = false;
    calculateScale();
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ============================================
// AUDIO SYSTEM (Web Audio API - procedural)
// ============================================
let audioCtx = null;
let masterGain = null;
let musicGain = null;
let sfxGain = null;
let musicPlaying = false;
let musicNodes = [];

function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(audioCtx.destination);

    musicGain = audioCtx.createGain();
    musicGain.gain.value = 0.15;
    musicGain.connect(masterGain);

    sfxGain = audioCtx.createGain();
    sfxGain.gain.value = 0.6;
    sfxGain.connect(masterGain);
}

function ensureAudio() {
    if (!audioCtx) initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

// -- Utility: quick oscillator burst --
function playTone(freq, type, duration, gainVal, detune) {
    ensureAudio();
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    if (detune) osc.detune.value = detune;
    g.gain.setValueAtTime(gainVal || 0.3, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(g);
    g.connect(sfxGain);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playNoise(duration, gainVal) {
    ensureAudio();
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const src = audioCtx.createBufferSource();
    src.buffer = buffer;
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(gainVal || 0.2, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    src.connect(g);
    g.connect(sfxGain);
    src.start();
}

function playSweep(startFreq, endFreq, type, duration, gainVal) {
    ensureAudio();
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + duration);
    g.gain.setValueAtTime(gainVal || 0.3, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(g);
    g.connect(sfxGain);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// -- Weapon sounds --
const SFX = {
    arrow() {
        playSweep(900, 300, 'sine', 0.08, 0.25);
        playNoise(0.05, 0.1);
    },
    shuriken() {
        playSweep(1200, 600, 'triangle', 0.1, 0.2);
        playTone(800, 'sine', 0.06, 0.15);
    },
    kunai() {
        playSweep(1500, 500, 'square', 0.07, 0.15);
        playNoise(0.04, 0.12);
    },
    bomb() {
        playSweep(200, 60, 'sine', 0.4, 0.5);
        playNoise(0.3, 0.35);
        setTimeout(() => playNoise(0.15, 0.2), 50);
    },
    bombExplode() {
        playSweep(150, 30, 'sine', 0.6, 0.6);
        playNoise(0.5, 0.5);
        playTone(40, 'sine', 0.3, 0.4);
    },
    circlet() {
        playTone(440, 'sine', 0.15, 0.12);
        playTone(660, 'sine', 0.1, 0.08);
    },

    // -- Impact & death --
    hit() {
        playTone(200, 'square', 0.05, 0.2);
        playNoise(0.04, 0.15);
    },
    enemyDeath() {
        playSweep(400, 100, 'sine', 0.15, 0.25);
        playNoise(0.1, 0.2);
    },

    // -- Player --
    playerHit() {
        playSweep(300, 100, 'sawtooth', 0.2, 0.35);
        playTone(150, 'sine', 0.15, 0.25);
    },

    // -- Level up & upgrades --
    levelUp() {
        const t = audioCtx.currentTime;
        [523, 659, 784, 1047].forEach((f, i) => {
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * 0.08);
            g.gain.linearRampToValueAtTime(0.3, t + i * 0.08 + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.2);
            osc.connect(g);
            g.connect(sfxGain);
            osc.start(t + i * 0.08);
            osc.stop(t + i * 0.08 + 0.25);
        });
    },
    upgradeSelect() {
        playTone(880, 'sine', 0.12, 0.25);
        setTimeout(() => playTone(1320, 'sine', 0.1, 0.2), 80);
    },

    // -- Pickups --
    heart() {
        playSweep(600, 900, 'sine', 0.15, 0.25);
        setTimeout(() => playSweep(800, 1100, 'sine', 0.12, 0.2), 100);
    },
    gem() {
        playTone(1200, 'sine', 0.08, 0.2);
        setTimeout(() => playTone(1600, 'sine', 0.06, 0.15), 50);
    },

    // -- UI --
    click() {
        playTone(700, 'sine', 0.05, 0.15);
    },

    // -- Combo --
    comboUp() {
        playSweep(600, 1200, 'sine', 0.1, 0.2);
        playTone(900, 'triangle', 0.08, 0.15);
    },
    comboDrop() {
        playSweep(800, 300, 'sine', 0.15, 0.2);
    },

    // -- Kill Streak --
    streakMulti() {
        playSweep(800, 1600, 'sine', 0.15, 0.3);
        playTone(1200, 'triangle', 0.1, 0.2);
        setTimeout(() => playTone(1600, 'sine', 0.08, 0.2), 80);
    },
    streakSpree() {
        const t = audioCtx.currentTime;
        [600, 800, 1000, 1200].forEach((f, i) => {
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * 0.06);
            g.gain.linearRampToValueAtTime(0.3, t + i * 0.06 + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.15);
            osc.connect(g);
            g.connect(sfxGain);
            osc.start(t + i * 0.06);
            osc.stop(t + i * 0.06 + 0.2);
        });
    },
    streakUnstoppable() {
        const t = audioCtx.currentTime;
        [400, 600, 800, 1000, 1200].forEach((f, i) => {
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * 0.05);
            g.gain.linearRampToValueAtTime(0.35, t + i * 0.05 + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.18);
            osc.connect(g);
            g.connect(sfxGain);
            osc.start(t + i * 0.05);
            osc.stop(t + i * 0.05 + 0.22);
        });
        playNoise(0.3, 0.15);
    },
    streakGodlike() {
        const t = audioCtx.currentTime;
        [300, 500, 700, 900, 1100, 1400].forEach((f, i) => {
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * 0.04);
            g.gain.linearRampToValueAtTime(0.3, t + i * 0.04 + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.04 + 0.2);
            osc.connect(g);
            g.connect(sfxGain);
            osc.start(t + i * 0.04);
            osc.stop(t + i * 0.04 + 0.25);
        });
        playNoise(0.4, 0.2);
    },
    streakLegendary() {
        const t = audioCtx.currentTime;
        [200, 400, 600, 800, 1000, 1200, 1600].forEach((f, i) => {
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            osc.type = i % 2 === 0 ? 'sawtooth' : 'square';
            osc.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * 0.035);
            g.gain.linearRampToValueAtTime(0.35, t + i * 0.035 + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.035 + 0.22);
            osc.connect(g);
            g.connect(sfxGain);
            osc.start(t + i * 0.035);
            osc.stop(t + i * 0.035 + 0.28);
        });
        playNoise(0.5, 0.25);
    },

    // -- Loot --
    lootDrop() {
        playTone(1000, 'sine', 0.08, 0.15);
        setTimeout(() => playTone(1400, 'sine', 0.06, 0.12), 40);
    },
    lootCollect() {
        playSweep(800, 1600, 'sine', 0.12, 0.25);
        setTimeout(() => playTone(1200, 'triangle', 0.1, 0.2), 60);
    },
    shieldHit() {
        playTone(400, 'sine', 0.1, 0.3);
        playNoise(0.08, 0.2);
        setTimeout(() => playTone(600, 'sine', 0.08, 0.2), 50);
    },
    gameOver() {
        const t = audioCtx.currentTime;
        [400, 350, 300, 200].forEach((f, i) => {
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * 0.15);
            g.gain.linearRampToValueAtTime(0.25, t + i * 0.15 + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.15 + 0.3);
            osc.connect(g);
            g.connect(sfxGain);
            osc.start(t + i * 0.15);
            osc.stop(t + i * 0.15 + 0.35);
        });
    }
};

// -- Background music (procedural synth loop) --
let musicInterval = null;
function startMusic() {
    if (musicPlaying) return;
    ensureAudio();
    musicPlaying = true;

    const bassNotes = [110, 130.81, 146.83, 164.81, 146.83, 130.81, 110, 98];
    const melodyNotes = [440, 523, 587, 660, 587, 523, 440, 392, 440, 523, 660, 784, 660, 523, 440, 392];
    let bassIdx = 0;
    let melIdx = 0;
    const bpm = 140;
    const beatMs = 60000 / bpm;

    musicInterval = setInterval(() => {
        if (gameState !== 'playing') return;
        const t = audioCtx.currentTime;

        // Bass
        const bassOsc = audioCtx.createOscillator();
        const bassG = audioCtx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.value = bassNotes[bassIdx % bassNotes.length];
        bassG.gain.setValueAtTime(0.15, t);
        bassG.gain.exponentialRampToValueAtTime(0.001, t + beatMs / 1000 * 0.9);
        bassOsc.connect(bassG);
        bassG.connect(musicGain);
        bassOsc.start(t);
        bassOsc.stop(t + beatMs / 1000);
        bassIdx++;

        // Melody (every 2 beats)
        if (melIdx % 2 === 0) {
            const melOsc = audioCtx.createOscillator();
            const melG = audioCtx.createGain();
            melOsc.type = 'triangle';
            melOsc.frequency.value = melodyNotes[(melIdx / 2) % melodyNotes.length];
            melG.gain.setValueAtTime(0.08, t);
            melG.gain.exponentialRampToValueAtTime(0.001, t + beatMs / 1000 * 1.8);
            melOsc.connect(melG);
            melG.connect(musicGain);
            melOsc.start(t);
            melOsc.stop(t + beatMs / 1000 * 2);
        }
        melIdx++;
    }, beatMs);
}

function stopMusic() {
    musicPlaying = false;
    if (musicInterval) {
        clearInterval(musicInterval);
        musicInterval = null;
    }
}

// ============================================
// COMBO SYSTEM FUNCTIONS
// ============================================
function registerKill(x, y, enemyType) {
    comboCount++;
    comboTimer = COMBO_WINDOW;

    // Update multiplier: each kill adds 0.5, max 10x
    comboMultiplier = Math.min(10, 1 + (comboCount - 1) * 0.5);

    // Apply score with multiplier
    const baseScore = 10;
    score += Math.floor(baseScore * comboMultiplier);

    // Create floating combo text
    if (comboCount >= 2) {
        const textScale = Math.min(2.0, 0.8 + comboCount * 0.15);
        const hue = Math.min(60, comboCount * 8); // green → yellow → red
        comboTexts.push({
            x: x + (Math.random() - 0.5) * 30,
            y: y - 20,
            text: `${comboCount}x COMBO`,
            timer: 1.5,
            maxTimer: 1.5,
            scale: textScale,
            hue: hue,
            vy: -80
        });
    }

    // Screen flash intensity
    comboFlashAlpha = Math.min(0.3, comboCount * 0.04);

    // Hitstop removed

    // Level tracking
    levelKills++;
    if (enemyType) {
        levelSpecificKills[enemyType] = (levelSpecificKills[enemyType] || 0) + 1;
    }
    levelMaxCombo = Math.max(levelMaxCombo, comboCount);
}

function updateCombo(dt) {
    if (comboTimer > 0) {
        comboTimer -= dt;
        if (comboTimer <= 0) {
            // Combo dropped
            comboCount = 0;
            comboMultiplier = 1;
        }
    }

    // Update combo texts
    for (let i = comboTexts.length - 1; i >= 0; i--) {
        const ct = comboTexts[i];
        ct.timer -= dt;
        ct.y += ct.vy * dt;
        ct.vy *= 0.95; // slow down
        if (ct.timer <= 0) {
            comboTexts.splice(i, 1);
        }
    }

    // Decay screen flash
    comboFlashAlpha *= 0.92;
    if (comboFlashAlpha < 0.005) comboFlashAlpha = 0;
}

// ============================================
// CAMERA EFFECTS FUNCTIONS
// ============================================
function triggerShake(intensity, duration) {
    cameraShakeIntensity = Math.max(cameraShakeIntensity, intensity);
    cameraShakeDuration = Math.max(cameraShakeDuration, duration);
    cameraShakeTimer = 0;
}

function triggerHitstop(frames) {
    // Disabled - no more freeze frames
}

function triggerCameraPunch(amount) {
    cameraPunchScale = 1.0 + amount;
    cameraPunchVelocity = -amount * 8;
}

function updateCameraEffects(dt) {
    // Hitstop
    if (hitstopActive) {
        hitstopTimer -= dt;
        if (hitstopTimer <= 0) {
            hitstopActive = false;
            hitstopTimer = 0;
        }
        return false; // signal: don't update game logic
    }

    // Screen shake
    if (cameraShakeDuration > 0) {
        cameraShakeTimer += dt;
        const progress = cameraShakeTimer / cameraShakeDuration;
        const decay = 1.0 - progress;
        const currentIntensity = cameraShakeIntensity * decay;
        // Round to integers to prevent pixel-art grid artifacts
        cameraShakeX = Math.round((Math.random() - 0.5) * 2 * currentIntensity);
        cameraShakeY = Math.round((Math.random() - 0.5) * 2 * currentIntensity);
        if (cameraShakeTimer >= cameraShakeDuration) {
            cameraShakeDuration = 0;
            cameraShakeIntensity = 0;
            cameraShakeX = 0;
            cameraShakeY = 0;
        }
    }

    // Camera punch (spring physics)
    cameraPunchScale += cameraPunchVelocity * dt;
    cameraPunchVelocity += (1.0 - cameraPunchScale) * 400 * dt;
    cameraPunchVelocity *= cameraPunchDamping;
    if (Math.abs(cameraPunchScale - 1.0) < 0.001 && Math.abs(cameraPunchVelocity) < 0.01) {
        cameraPunchScale = 1.0;
        cameraPunchVelocity = 0;
    }

    return true; // signal: game logic updated
}

// ============================================
// LOOT SYSTEM FUNCTIONS
// ============================================
function tryDropLoot(x, y) {
    if (Math.random() > LOOT_DROP_CHANCE) return;

    const types = Object.keys(LOOT_TYPES);
    const typeKey = types[Math.floor(Math.random() * types.length)];

    lootItems.push({
        x: x,
        y: y,
        type: typeKey,
        lifetime: LOOT_LIFETIME,
        bobPhase: Math.random() * Math.PI * 2,
        glowPhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 60,
        vy: (Math.random() - 0.5) * 60
    });
}

function applyLootEffect(typeKey) {
    const effect = LOOT_TYPES[typeKey].effect;
    SFX.lootCollect();
    levelLootCollected++;
    switch (effect) {
        case 'damage':
            playerDamageBoostTimer = 8.0;
            break;
        case 'speed':
            playerSpeedBoostTimer2 = 6.0;
            break;
        case 'shield':
            playerShieldActive = true;
            playerShieldTimer = 15.0;
            break;
        case 'magnet':
            playerMagnetTimer = 10.0;
            break;
        case 'bomb':
            // Explode all enemies on screen
            for (const enemy of enemies) {
                const dx = enemy.x - player.x;
                const dy = enemy.y - player.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 500) {
                    enemy.health -= 50;
                    bloodSplatters.push({ x: enemy.x, y: enemy.y, frame: 0, frameTimer: 0 });
                    if (enemy.health <= 0) {
                        registerKill(enemy.x, enemy.y, enemy.type);
                        checkKillStreak();
                        tryDropLoot(enemy.x, enemy.y);
                        SFX.enemyDeath();
                        spawnBloodSplatter(enemy.x, enemy.y, 12);
                        spawnSparkExplosion(enemy.x, enemy.y, 6);
                        removeEnemy(enemies.indexOf(enemy));
                    }
                }
            }
            SFX.bombExplode();
            triggerShake(15, 0.5);
            break;
    }
}

function updateLoot(dt) {
    for (let i = lootItems.length - 1; i >= 0; i--) {
        const loot = lootItems[i];
        loot.lifetime -= dt;
        loot.bobPhase += dt * 3;
        loot.glowPhase += dt * 5;

        // Slow down initial velocity
        loot.vx *= 0.96;
        loot.vy *= 0.96;
        loot.x += loot.vx * dt;
        loot.y += loot.vy * dt;

        // Magnet pull toward player
        const dx = player.x - loot.x;
        const dy = player.y - loot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attractRadius = playerMagnetTimer > 0 ? 500 : LOOT_ATTRACT_RADIUS;

        if (dist < attractRadius && dist > 0) {
            const force = (1.0 - dist / attractRadius) * 400;
            loot.vx += (dx / dist) * force * dt;
            loot.vy += (dy / dist) * force * dt;
        }

        // Auto-collect
        if (dist < LOOT_COLLECT_RADIUS) {
            applyLootEffect(loot.type);
            lootItems.splice(i, 1);
            continue;
        }

        // Despawn
        if (loot.lifetime <= 0) {
            lootItems.splice(i, 1);
        }
    }
}

// ============================================
// KILL STREAK SYSTEM
// ============================================
function checkKillStreak() {
    streakCount++;
    streakTimer = STREAK_WINDOW;

    let announcement = null;

    if (streakCount >= STREAK_LEGENDARY && lastStreakLevel < STREAK_LEGENDARY) {
        announcement = { text: '⚡ LEGENDARY ⚡', hue: 280, sound: 'streakLegendary' };
    } else if (streakCount >= STREAK_GODLIKE && lastStreakLevel < STREAK_GODLIKE) {
        announcement = { text: '🔥 GODLIKE 🔥', hue: 0, sound: 'streakGodlike' };
    } else if (streakCount >= STREAK_UNSTOPPABLE && lastStreakLevel < STREAK_UNSTOPPABLE) {
        announcement = { text: '💀 UNSTOPPABLE 💀', hue: 30, sound: 'streakUnstoppable' };
    } else if (streakCount >= STREAK_KILLING_SPREE && lastStreakLevel < STREAK_KILLING_SPREE) {
        announcement = { text: '⚔ KILLING SPREE ⚔', hue: 50, sound: 'streakSpree' };
    } else if (streakCount >= STREAK_PENTA && lastStreakLevel < STREAK_PENTA) {
        announcement = { text: '★ PENTA KILL ★', hue: 60, sound: 'streakMulti' };
    } else if (streakCount >= STREAK_QUAD && lastStreakLevel < STREAK_QUAD) {
        announcement = { text: '◆ QUAD KILL ◆', hue: 180, sound: 'streakMulti' };
    } else if (streakCount >= STREAK_TRIPLE && lastStreakLevel < STREAK_TRIPLE) {
        announcement = { text: '▲ TRIPLE KILL ▲', hue: 120, sound: 'streakMulti' };
    } else if (streakCount >= STREAK_DOUBLE && lastStreakLevel < STREAK_DOUBLE) {
        announcement = { text: '● DOUBLE KILL ●', hue: 200, sound: 'streakMulti' };
    }

    if (announcement) {
        lastStreakLevel = streakCount;
        streakAnnouncements.push({
            text: announcement.text,
            timer: STREAK_ANNOUNCE_DURATION,
            maxTimer: STREAK_ANNOUNCE_DURATION,
            scale: 0,
            targetScale: Math.min(2.5, 1.0 + streakCount * 0.08),
            hue: announcement.hue,
            bouncePhase: 0
        });
        SFX[announcement.sound]();
        triggerShake(Math.min(8, 2 + streakCount * 0.3), 0.2);
    }
}

function updateKillStreak(dt) {
    if (streakTimer > 0) {
        streakTimer -= dt;
        if (streakTimer <= 0) {
            streakCount = 0;
            lastStreakLevel = 0;
        }
    }

    for (let i = streakAnnouncements.length - 1; i >= 0; i--) {
        const ann = streakAnnouncements[i];
        ann.timer -= dt;
        ann.bouncePhase += dt * 8;

        // Spring animation for scale
        const progress = 1.0 - ann.timer / ann.maxTimer;
        if (progress < 0.15) {
            // Pop in
            ann.scale = ann.targetScale * (progress / 0.15);
        } else if (progress < 0.25) {
            // Overshoot bounce
            ann.scale = ann.targetScale * 1.1;
        } else if (progress < 0.35) {
            // Settle
            ann.scale = ann.targetScale;
        } else if (progress > 0.8) {
            // Fade out
            ann.scale = ann.targetScale * (1.0 - (progress - 0.8) / 0.2);
        }

        if (ann.timer <= 0) {
            streakAnnouncements.splice(i, 1);
        }
    }
}

// ============================================
// BOSS SYSTEM
// ============================================
function spawnBoss() {
    const angle = Math.random() * Math.PI * 2;
    const spawnDist = 600;
    const bx = player.x + Math.cos(angle) * spawnDist;
    const by = player.y + Math.sin(angle) * spawnDist;
    const hp = Math.floor(BOSS_HEALTH_BASE * Math.pow(BOSS_HEALTH_SCALE, bossDefeatedCount));

    boss = {
        x: bx,
        y: by,
        health: hp,
        maxHealth: hp,
        phase: 'entering',       // entering → chasing → charging → shooting
        phaseTimer: 2.0,
        attackTimer: BOSS_ORB_INTERVAL,
        chargeTimer: 0,
        chargeDirX: 0,
        chargeDirY: 0,
        flashTimer: 0,
        size: BOSS_SIZE,
        hitCooldowns: {}
    };
    bossActive = true;
    bossWarning = false;

    // Big entrance shake
    triggerShake(12, 0.5);
}

function updateBoss(dt) {
    if (!bossActive || !boss) return;

    // Boss flash on hit
    if (boss.flashTimer > 0) {
        boss.flashTimer -= dt;
    }

    // Phase machine
    switch (boss.phase) {
        case 'entering':
            boss.phaseTimer -= dt;
            // Drift toward player slowly
            const edx = player.x - boss.x;
            const edy = player.y - boss.y;
            const eDist = Math.sqrt(edx * edx + edy * edy);
            if (eDist > 0) {
                boss.x += (edx / eDist) * BOSS_SPEED * 0.5 * dt;
                boss.y += (edy / eDist) * BOSS_SPEED * 0.5 * dt;
            }
            if (boss.phaseTimer <= 0) {
                boss.phase = 'chasing';
            }
            break;

        case 'chasing':
            // Move toward player
            const cdx = player.x - boss.x;
            const cdy = player.y - boss.y;
            const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cDist > 0) {
                boss.x += (cdx / cDist) * BOSS_SPEED * dt;
                boss.y += (cdy / cDist) * BOSS_SPEED * dt;
            }

            // Attack timer
            boss.attackTimer -= dt;
            if (boss.attackTimer <= 0) {
                // 50% chance charge, 50% chance orbs
                if (Math.random() < 0.5) {
                    boss.phase = 'charging';
                    boss.chargeTimer = 0.8; // wind-up
                    boss.chargeDirX = cdx / cDist;
                    boss.chargeDirY = cdy / cDist;
                    boss.flashTimer = 0.8;
                } else {
                    boss.phase = 'shooting';
                    boss.phaseTimer = 1.5;
                    boss.flashTimer = 0.3;
                }
                boss.attackTimer = BOSS_ORB_INTERVAL;
            }

            // Player collision
            const pDx = player.x - boss.x;
            const pDy = player.y - boss.y;
            const pDist = Math.sqrt(pDx * pDx + pDy * pDy);
            if (pDist < boss.size * 0.4 + SCALED_TILE * 0.4) {
                damagePlayer();
            }
            break;

        case 'charging':
            boss.chargeTimer -= dt;
            if (boss.chargeTimer <= 0) {
                // LUNGE!
                boss.phase = 'lunging';
                boss.phaseTimer = BOSS_CHARGE_DURATION;
                triggerShake(6, 0.3);
                SFX.bomb();
            }
            break;

        case 'lunging':
            boss.phaseTimer -= dt;
            boss.x += boss.chargeDirX * BOSS_CHARGE_SPEED * dt;
            boss.y += boss.chargeDirY * BOSS_CHARGE_SPEED * dt;

            // Player collision during charge
            const ldx = player.x - boss.x;
            const ldy = player.y - boss.y;
            const lDist = Math.sqrt(ldx * ldx + ldy * ldy);
            if (lDist < boss.size * 0.5 + SCALED_TILE * 0.4) {
                damagePlayer();
            }

            if (boss.phaseTimer <= 0) {
                boss.phase = 'chasing';
                boss.attackTimer = BOSS_ORB_INTERVAL * 0.5;
            }
            break;

        case 'shooting':
            boss.phaseTimer -= dt;
            // Fire orbs in 8 directions
            if (boss.phaseTimer > 1.2) {
                // Fire burst
                for (let i = 0; i < 8; i++) {
                    const orbAngle = (Math.PI * 2 / 8) * i;
                    bossOrbs.push({
                        x: boss.x,
                        y: boss.y,
                        vx: Math.cos(orbAngle) * BOSS_ORB_SPEED,
                        vy: Math.sin(orbAngle) * BOSS_ORB_SPEED,
                        lifetime: 4.0
                    });
                }
                SFX.kunai();
            }
            if (boss.phaseTimer <= 0) {
                boss.phase = 'chasing';
            }
            break;
    }

    // Update boss orbs
    for (let i = bossOrbs.length - 1; i >= 0; i--) {
        const orb = bossOrbs[i];
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        orb.lifetime -= dt;

        // Player collision
        const odx = player.x - orb.x;
        const ody = player.y - orb.y;
        const oDist = Math.sqrt(odx * odx + ody * ody);
        if (oDist < SCALED_TILE * 0.6) {
            damagePlayer();
            bossOrbs.splice(i, 1);
            continue;
        }

        if (orb.lifetime <= 0) {
            bossOrbs.splice(i, 1);
        }
    }
}

function damageBoss(amount) {
    if (!boss || !bossActive) return;
    boss.health -= amount;
    boss.flashTimer = 0.1;

    // Check death
    if (boss.health <= 0) {
        // Epic death
        triggerShake(20, 0.8);
        triggerHitstop(0.3);
        SFX.bombExplode();

        // Massive loot drops
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 / 5) * i;
            const dropX = boss.x + Math.cos(angle) * 60;
            const dropY = boss.y + Math.sin(angle) * 60;
            tryDropLoot(dropX, dropY);
            // Guaranteed damage boost
            if (i === 0) {
                lootItems.push({
                    x: dropX,
                    y: dropY,
                    type: 'DAMAGE',
                    lifetime: LOOT_LIFETIME,
                    bobPhase: Math.random() * Math.PI * 2,
                    glowPhase: Math.random() * Math.PI * 2,
                    vx: Math.cos(angle) * 100,
                    vy: Math.sin(angle) * 100
                });
            }
        }

        // Register kills for nearby enemies
        registerKill(boss.x, boss.y, 'Boss');
        bossKilledThisLevel = true;
        score += boss.maxHealth;

        // Big announcement
        streakAnnouncements.push({
            text: '☠ BOSS DEFEATED ☠',
            timer: 3.0,
            maxTimer: 3.0,
            scale: 0,
            targetScale: 3.0,
            hue: 50,
            bouncePhase: 0
        });
        SFX.levelUp();

        // Spawn particles
        spawnParticleExplosion(boss.x, boss.y, '#ff4400', 80);
        spawnParticleExplosion(boss.x, boss.y, '#ffaa00', 40);
        spawnParticleExplosion(boss.x, boss.y, '#ffffff', 20);

        bossActive = false;
        boss = null;
        bossOrbs = [];
        bossDefeatedCount++;
    }
}

function damagePlayer() {
    if (damageInvincibilityTimer > 0 || invincibilityTimer > 0) return;

    if (playerShieldActive) {
        playerShieldActive = false;
        playerShieldTimer = 0;
        SFX.shieldHit();
        triggerShake(5, 0.15);
        levelDamageTaken = true;
        return;
    }

    levelDamageTaken = true;
    playerLives--;
    if (playerLives <= 0) {
        SFX.gameOver();
        stopMusic();
        gameState = 'gameover';
        showReviveButton = true;
        // Show interstitial ad on game over
        if (bridgeReady && bridge.advertisement.isInterstitialSupported) {
            bridge.advertisement.showInterstitial('game_over');
        }
        levelDeaths[currentLevel] = (levelDeaths[currentLevel] || 0) + 1;
        saveData('mobholdLevelDeaths', JSON.stringify(levelDeaths));
        if (score > highScore) {
            highScore = score;
            saveData('survivalHighScore', Math.floor(highScore).toString());
        }
    } else {
        SFX.playerHit();
        damageInvincibilityTimer = DAMAGE_INVINCIBILITY;
        knockbackNearbyEnemies();
        triggerShake(8, 0.2);
        triggerHitstop(0.1);
    }
}

// ============================================
// PARTICLE SYSTEM
// ============================================
function spawnParticle(x, y, vx, vy, life, size, color, gravity) {
    if (particles.length >= MAX_PARTICLES) {
        particles.shift(); // remove oldest
    }
    particles.push({
        x, y, vx, vy,
        life, maxLife: life,
        size, color,
        gravity: gravity !== undefined ? gravity : PARTICLE_GRAVITY,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 10
    });
}

function spawnParticleExplosion(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 80 + Math.random() * 250;
        const life = 0.4 + Math.random() * 0.8;
        const size = 2 + Math.random() * 5;
        spawnParticle(
            x + (Math.random() - 0.5) * 10,
            y + (Math.random() - 0.5) * 10,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            life, size, color, PARTICLE_GRAVITY
        );
    }
}

function spawnBloodSplatter(x, y, count) {
    const colors = ['#00cc44', '#009933', '#00aa3a', '#22ee55'];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 50 + Math.random() * 150;
        const life = 0.3 + Math.random() * 0.5;
        const size = 1.5 + Math.random() * 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        spawnParticle(
            x, y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed - 50,
            life, size, color, PARTICLE_GRAVITY * 1.5
        );
    }
}

function spawnSparkExplosion(x, y, count) {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 100 + Math.random() * 200;
        const life = 0.2 + Math.random() * 0.3;
        const size = 1 + Math.random() * 2;
        spawnParticle(
            x, y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            life, size, ['#ff8800', '#ff6600', '#ffaa33', '#ff4400'][Math.floor(Math.random() * 4)], 50
        );
    }
}

function spawnSoulParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 20 + Math.random() * 60;
        const life = 0.8 + Math.random() * 1.2;
        const size = 3 + Math.random() * 5;
        spawnParticle(
            x, y,
            Math.cos(angle) * speed,
            -30 - Math.random() * 80,
            life, size, '#aaeeff', -80
        );
    }
}

function spawnConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffcc00', '#ff6600', '#ff3399', '#33ff99'];
    const cx = cameraX;
    const cy = cameraY;
    for (let i = 0; i < 200; i++) {
        const x = cx + (Math.random() - 0.5) * canvas.width * 1.5;
        const y = cy - canvas.height * 0.5 - Math.random() * canvas.height * 0.5;
        const speedX = (Math.random() - 0.5) * 400;
        const speedY = 50 + Math.random() * 300;
        const life = 2.0 + Math.random() * 3.0;
        const size = 4 + Math.random() * 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        spawnParticle(x, y, speedX, speedY, life, size, color, 120);
    }
}

function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }
        p.vy += p.gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.rotSpeed * dt;
        p.vx *= 0.99;
    }
}

// ============================================
// LEVEL GENERATION (300 levels, non-linear difficulty)
// ============================================

// Seeded random for deterministic level generation
function levelRng(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Wave function for non-linear difficulty
function difficultyWave(level, waveFreq, waveAmp, base) {
    return base + Math.sin(level * waveFreq) * waveAmp + Math.sin(level * waveFreq * 0.37) * waveAmp * 0.5;
}

// Generate level configuration from level number
function getUnlockedEnemyCount(level) {
    if (level >= 151) return 9;
    if (level >= 101) return 8;
    if (level >= 76) return 7;
    if (level >= 51) return 6;
    if (level >= 31) return 5;
    if (level >= 16) return 4;
    if (level >= 6) return 3;
    return 2;
}

function generateLevelConfig(levelNum) {
    const seed = levelNum * 7919;
    const r = levelRng(seed);

    // === ZONE DIFFICULTY (wavy, not linear) ===
    const baseDiff = 1 + (levelNum - 1) * 0.03;
    const waveMod = difficultyWave(levelNum, 0.15, 0.4, 1.0);
    const difficulty = Math.max(0.6, baseDiff * waveMod);

    // === KILL COUNT (level 1→12, level 50→34, level 100→57, level 150→79) ===
    const killBase = Math.floor(12 + levelNum * 0.45);
    const killTarget = Math.max(10, Math.floor(killBase * (0.9 + difficulty * 0.15)));

    // === ENEMY COUNT (how many spawn per level session) ===
    const enemyCount = Math.floor(8 + levelNum * 0.8 * difficulty);

    // === SPAWN RATE ===
    const spawnRate = Math.max(250, Math.floor(1200 - levelNum * 2 * difficulty + Math.sin(levelNum * 0.2) * 200));

    // === OBJECTIVE SELECTION (weighted by level) ===
    const objectives = [
        { type: 'kill_count', weight: 35 },
        { type: 'reach_score', weight: 15 },
        { type: 'combo_kill', weight: 10 },
        { type: 'kill_specific', weight: 10 },
        { type: 'survive_time', weight: 8 },
        { type: 'survive_no_damage', weight: 4 },
        { type: 'boss_kill', weight: 3 }
    ];

    // Boss objective only on boss levels
    const isBossLevel = (levelNum % 10 === 0) || (levelNum >= 5 && levelRng(seed + 2) < 0.3);
    if (!isBossLevel) {
        // Remove boss_kill from available objectives
        const idx = objectives.findIndex(o => o.type === 'boss_kill');
        if (idx !== -1) objectives.splice(idx, 1);
    }

    const objectiveSeed = levelRng(seed + 1);
    let cumWeight = 0;
    let selectedObj = objectives[0];
    const totalWeight = objectives.reduce((s, o) => s + o.weight, 0);

    for (const obj of objectives) {
        cumWeight += obj.weight;
        if (objectiveSeed * totalWeight <= cumWeight) {
            selectedObj = obj;
            break;
        }
    }

    // === OBJECTIVE TARGET ===
    let target = 0;
    switch (selectedObj.type) {
        case 'kill_count':
            target = killTarget;
            break;
        case 'kill_specific': {
            target = Math.max(3, Math.floor(killTarget * 0.3));
            break;
        }
        case 'reach_score':
            target = Math.max(150, Math.floor(100 + killTarget * 12));
            break;
        case 'combo_kill':
            target = Math.max(3, Math.floor(Math.min(7, 2 + Math.sqrt(levelNum) * 0.35)));
            break;
        case 'survive_time':
            target = Math.max(15, Math.floor(15 + levelNum * 0.2));
            break;
        case 'survive_no_damage':
            target = Math.max(8, Math.floor(8 + levelNum * 0.1));
            break;
        case 'boss_kill':
            target = 1;
            break;
    }

    // For kill_specific, pick a random unlocked type as the target
    let specificType = null;
    if (selectedObj.type === 'kill_specific') {
        const unlockedCount = getUnlockedEnemyCount(levelNum);
        const allTypes = ['SpiderYellow', 'YellowBat', 'Eye', 'Beast', 'Eye2', 'Beast2', 'Reptile', 'Cyclopse', 'Cyclopse2'];
        specificType = allTypes[Math.floor(objectiveSeed * unlockedCount)];
    }

    // === ENEMY TYPES (progressive unlock) ===
    const allTypes = ['SpiderYellow', 'YellowBat', 'Eye', 'Beast', 'Eye2', 'Beast2', 'Reptile', 'Cyclopse', 'Cyclopse2'];
    const unlockedCount = getUnlockedEnemyCount(levelNum);
    const enemyTypes = allTypes.slice(0, unlockedCount);

    // === SPECIAL MODIFIERS (more frequent) ===
    const modifiers = [];
    if (levelRng(seed + 3) < 0.20) modifiers.push('fast_enemies');
    if (levelRng(seed + 4) < 0.15) modifiers.push('tank_enemies');
    if (levelRng(seed + 5) < 0.18) modifiers.push('swarm');
    if (levelRng(seed + 6) < 0.12) modifiers.push('elite_only');

    return {
        id: levelNum,
        objective: { type: selectedObj.type, target: target, specificType: specificType },
        difficulty: difficulty,
        enemyCount: enemyCount,
        spawnInterval: spawnRate,
        enemyTypes: enemyTypes,
        modifiers: modifiers,
        hasBoss: isBossLevel,
        bossHP: isBossLevel ? Math.floor(300 + levelNum * 5 * difficulty) : 0
    };
}

// ============================================
// LEVEL MANAGEMENT FUNCTIONS
// ============================================
function startLevel(levelNum) {
    currentLevel = Math.min(levelNum, TOTAL_LEVELS);
    levelData = generateLevelConfig(currentLevel);
    levelKills = 0;
    levelLootCollected = 0;
    levelMaxCombo = 0;
    levelDamageTaken = false;
    levelComplete = false;
    levelFailed = false;
    levelTransitionTimer = 0;
    objectiveProgress = 0;
    objectiveTarget = levelData.objective.target;
    levelSpecificKills = {};
    levelTimeElapsed = 0;
    levelScoreStart = score;
    bossKilledThisLevel = false;

    // Set biome for this level
    currentBiome = getBiomeForLevel(currentLevel);
    tileMap.clear();
    ambientParticles = [];
    ambientTimer = 0;
    terrainDamageTick = 0;
    if (currentBiome) {
        biomeNameTimer = 2.5;
        biomeNameText = currentBiome.name;
    }

    // Apply modifiers to spawn rate
    currentSpawnInterval = levelData.spawnInterval;
    if (levelData.modifiers.includes('swarm')) {
        currentSpawnInterval = Math.floor(currentSpawnInterval * 0.5);
    }
}

function updateLevelObjective(dt) {
    if (!levelData || levelComplete || levelFailed) return;

    // Track elapsed time
    levelTimeElapsed += dt;

    // Update progress based on objective type
    switch (levelData.objective.type) {
        case 'kill_count':
            objectiveProgress = levelKills;
            break;
        case 'kill_specific':
            objectiveProgress = levelSpecificKills[levelData.objective.specificType] || 0;
            break;
        case 'reach_score':
            objectiveProgress = score - levelScoreStart;
            break;
        case 'combo_kill':
            objectiveProgress = levelMaxCombo;
            break;
        case 'survive_time':
            objectiveProgress = Math.floor(levelTimeElapsed);
            break;
        case 'survive_no_damage':
            if (levelDamageTaken) {
                failLevel();
                return;
            }
            objectiveProgress = Math.floor(levelTimeElapsed);
            break;
        case 'boss_kill':
            objectiveProgress = bossKilledThisLevel ? 1 : 0;
            break;
    }

    // Check if objective met
    if (objectiveProgress >= objectiveTarget) {
        completeLevel(!levelDamageTaken);
    }
}

async function completeLevel(perfect) {
    if (levelComplete) return;
    levelComplete = true;

    // Freeze the game like a pause
    gameState = 'levelcomplete';
    levelTransitionTimer = 4.0;
    stopMusic();

    // Stars: 3 if no damage taken, else 2
    levelStarsEarned = perfect ? 3 : 2;

    // Save high score for this level
    const prev = levelHighScores[currentLevel];
    if (!prev || score > prev.score) {
        levelHighScores[currentLevel] = { score: score, stars: levelStarsEarned };
    }

    // Update max level reached
    if (currentLevel >= maxLevelReached) {
        maxLevelReached = currentLevel + 1;
    }

    SFX.levelUp();
    spawnConfetti();

    // Await persistence for this critical save point
    await saveData('mobholdLevelScores', JSON.stringify(levelHighScores));
    await saveData('mobholdMaxLevel', maxLevelReached.toString());
}

function failLevel() {
    if (levelFailed) return;
    levelFailed = true;

    // Freeze the game like a pause
    gameState = 'levelfailed';
    levelTransitionTimer = 3.0;
    stopMusic();

    SFX.gameOver();
}

function nextLevel() {
    if (currentLevel < TOTAL_LEVELS) {
        restartGame();
        startLevel(currentLevel + 1);
    } else {
        // Game complete!
        gameState = 'gameover';
    }
}

// Game data (loaded from JSON)
let weaponsData = [];
let monstersData = [];
let spawnPhasesData = [];

// Game state
let gameState = 'loading'; // 'loading', 'playing', 'upgrading', 'gameover', 'paused'
let readyTimer = 0; // Countdown overlay after upgrade/unpause
let score = 0;
let highScore = 0;
let lastTime = 0;
let spawnTimer = 0;
let gameTime = 0; // Track total game time for spawn acceleration
let currentSpawnInterval = DEFAULT_SPAWN_INTERVAL;
let nextUpgradeIndex = 0;
let swarmTimer = 0; // Track time until next swarm event
let firstSwarmDone = false; // Track if first swarm has occurred
let lastSwarmTime = -SPAWN_EVENT_MIN_GAP; // Game time of last swarm
let ambushTimer = 0;
let firstAmbushDone = false;
let lastAmbushTime = -SPAWN_EVENT_MIN_GAP; // Game time of last ambush
let speedBoostTimer = 0; // Time remaining on speed boost after upgrade
let invincibilityTimer = 0; // Time remaining where enemies can't kill player

// Lives system state
let playerLives = STARTING_LIVES;
let damageInvincibilityTimer = 0;
let heartCollectibles = [];       // { x, y, spawnTime }
let heartSpawnTimer = 0;
let nextHeartSpawnTime = 0;

// ============================================
// LEVEL SYSTEM STATE
// ============================================
let currentLevel = 1;
let levelData = null;              // current level config
let levelKills = 0;
let levelLootCollected = 0;
let levelMaxCombo = 0;
let levelDamageTaken = false;
let levelComplete = false;
let levelFailed = false;
let levelTransitionTimer = 0;
let levelStarsEarned = 0;
let levelHighScores = {};          // { levelId: { score, stars } }
let levelDeaths = {};              // { levelNum: deathCount }
let showReviveButton = false;     // 30% chance on game over
let maxLevelReached = 1;           // highest level unlocked
let objectiveProgress = 0;         // current progress toward objective
let objectiveTarget = 0;           // target for objective
let levelSpecificKills = {};       // { enemyType: killCount }
let levelTimeElapsed = 0;          // seconds elapsed in current level
let levelScoreStart = 0;           // score at start of level (for reach_score)
let bossKilledThisLevel = false;   // set to true when boss dies in level

// Player weapons
let playerWeapons = []; // Array of { type: string, level: number, cooldownTimer: number }

// Player facing angle (for Arrow direction)
let playerFacingAngle = 0;

// Player last movement direction (for ambush spawns)
let playerLastDirX = 0;
let playerLastDirY = 1; // Default: facing down

// Camera/World offset
let cameraX = 0;
let cameraY = 0;

// Player
const player = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    frame: 0,
    frameTime: 0,
    facingRight: true,
    moving: false,
    direction: 'front'  // 'front', 'side', 'back'
};

// Arrays for game objects
let enemies = [];
let enemySet = new Set(); // Fast lookup for enemy existence checks
let nextEnemyId = 0; // Unique ID counter for enemies
let projectiles = [];
let orbitingProjectiles = [];
let explosions = [];
let bloodSplatters = [];

// Performance: Frame-cached values
let frameTimestamp = 0; // Cached Date.now() per frame

// Performance: Cached offscreen canvas for scroll cooldown
let cooldownCanvas = null;
let cooldownCtx = null;

// Upgrade UI state
let upgradeOptions = [];
let selectedUpgradeIndex = -1;

// Scroll state
let playerScrolls = [];   // { type, nextTriggerTime }
let scrollEffects = [];   // Active visual effects

// Pentagram spawn effect state
let pentagramEffects = []; // { x, y, timer, enemyData (null after spawned) }
const PENTAGRAM_FADE_IN = 600;   // ms
const PENTAGRAM_FADE_OUT = 300;  // ms

// ============================================
// COMBO SYSTEM
// ============================================
let comboCount = 0;
let comboTimer = 0;
const COMBO_WINDOW = 3.0;        // seconds to chain kills
const COMBO_DECAY_RATE = 1.0;    // multiplier lost per second after window
let comboMultiplier = 1;
let comboTexts = [];             // { x, y, text, timer, maxTimer, scale, color }
let comboFlashAlpha = 0;         // screen flash intensity

// ============================================
// CAMERA EFFECTS (Shake + Hitstop + Punch)
// ============================================
let cameraShakeX = 0;
let cameraShakeY = 0;
let cameraShakeIntensity = 0;
let cameraShakeDuration = 0;
let cameraShakeTimer = 0;

let hitstopTimer = 0;            // freeze frame duration remaining
let hitstopActive = false;

let cameraPunchScale = 1.0;      // zoom punch effect
let cameraPunchVelocity = 0;
let cameraPunchDamping = 0.85;

// ============================================
// LOOT SYSTEM
// ============================================
let lootItems = [];              // { x, y, type, lifetime, bobPhase, glowPhase }
const LOOT_TYPES = {
    DAMAGE:   { color: '#ff8800', glowColor: 'rgba(255,136,0,', label: '⚔', effect: 'damage' },
    SPEED:    { color: '#00ccff', glowColor: 'rgba(0,204,255,', label: '⚡', effect: 'speed' },
    SHIELD:   { color: '#aaeeff', glowColor: 'rgba(170,238,255,', label: '🛡', effect: 'shield' },
    MAGNET:   { color: '#cc44ff', glowColor: 'rgba(204,68,255,', label: '🧲', effect: 'magnet' },
    BOMB:     { color: '#ff2200', glowColor: 'rgba(255,34,0,', label: '💣', effect: 'bomb' }
};
const LOOT_DROP_CHANCE = 0.20;   // 20% chance per enemy
const LOOT_LIFETIME = 12.0;      // seconds before despawn
const LOOT_COLLECT_RADIUS = 50;
const LOOT_ATTRACT_RADIUS = 150; // magnet pull radius

let playerShieldActive = false;
let playerShieldTimer = 0;
let playerMagnetTimer = 0;
let playerDamageBoostTimer = 0;
let playerSpeedBoostTimer2 = 0;

// ============================================
// BOSS SYSTEM STATE
// ============================================
let bossTimer = 0;                 // time until next boss
let bossActive = false;
let bossWarning = false;
let bossWarningTimer = 0;
let bossDefeatedCount = 0;
let boss = null;                   // { x, y, health, maxHealth, phase, attackTimer, chargeTimer, ... }
let bossOrbs = [];                 // { x, y, vx, vy, lifetime }

// ============================================
// KILL STREAK STATE
// ============================================
let streakCount = 0;
let streakTimer = 0;
let streakAnnouncements = [];      // { text, timer, maxTimer, scale, hue, sound }
let lastStreakLevel = 0;

// ============================================
// PARTICLE SYSTEM STATE
// ============================================
let particles = [];                // { x, y, vx, vy, life, maxLife, size, color, gravity, fadeOut }

// Mobile joystick state
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ('ontouchstart' in window);

// Desktop mouse state for continuous movement
let mouseHeld = false;
let mouseScreenX = 0;
let mouseScreenY = 0;
const JOYSTICK_BASE_RADIUS = 60;
const JOYSTICK_KNOB_RADIUS = 30;
const JOYSTICK_DEAD_ZONE = 10;
let joystick = {
    active: false,
    baseX: 0,
    baseY: 0,
    knobX: 0,
    knobY: 0,
    touchId: null,
    dirX: 0,
    dirY: 0
};

// Gamepad state
let gamepad = {
    connected: false,
    index: null,
    deadZone: 0.15,
    leftStick: { x: 0, y: 0 },
    buttons: { start: false, prevStart: false }
};

// Keyboard state
let keyboard = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Images
const images = {};

// Load JSON data
async function loadGameData() {
    try {
        const [weaponsResponse, monstersResponse, spawnPhasesResponse] = await Promise.all([
            fetch('weapons.json'),
            fetch('monsters.json'),
            fetch('spawn-phases.json')
        ]);
        weaponsData = await weaponsResponse.json();
        monstersData = await monstersResponse.json();
        spawnPhasesData = await spawnPhasesResponse.json();
    } catch (error) {
        console.error('Failed to load game data:', error);
    }


    // Load saved data from Bridge storage
    try {
        if (bridgeReady) {
            const keys = ['survivalHighScore', 'mobholdLevelScores', 'mobholdMaxLevel', 'mobholdLevelDeaths'];
            let data = await bridge.storage.get(keys);

            console.log('loadGameData: Bridge data:', data);
            if (data[0] !== null) highScore = parseInt(data[0], 10) || 0;
            if (data[1] !== null) levelHighScores = JSON.parse(data[1]);
            if (data[2] !== null) maxLevelReached = parseInt(data[2], 10) || 1;
            if (data[3] !== null) levelDeaths = JSON.parse(data[3]);
            console.log('loadGameData: maxLevelReached =', maxLevelReached, ' | highScore =', highScore);
        }
    } catch (error) {
        console.warn('Failed to load saved data:', error);
    }
}

// Load all images
function loadImages(callback) {
    const imagesToLoad = [
        { name: 'ground', src: 'images/plains.png' },
        { name: 'player', src: 'images/player.png' },
        // Projectiles
        { name: 'Arrow', src: 'images/Items/Projectile/Arrow.png' },
        { name: 'Shuriken', src: 'images/Items/Projectile/Shuriken.png' },
        { name: 'Kunai', src: 'images/Items/Projectile/Kunai.png' },
        { name: 'Bomb', src: 'images/Items/Projectile/Bomb.png' },
        { name: 'Circlet', src: 'images/Items/Projectile/Circlet.png' },
        { name: 'Explosion', src: 'images/Items/Projectile/Explosion.png' },
        { name: 'Blood', src: 'images/Items/Projectile/Blood.png' },
        // Scroll icons
        { name: 'ScrollThunder', src: 'images/Items/Scroll/ScrollThunder.png' },
        { name: 'ScrollFire', src: 'images/Items/Scroll/ScrollFire.png' },
        { name: 'ScrollIce', src: 'images/Items/Scroll/ScrollIce.png' },
        // Scroll effect spritesheets
        { name: 'EffectThunder', src: 'images/Items/Effect/Thunder/SpriteSheet.png' },
        { name: 'EffectFire', src: 'images/Items/Effect/Flam/SpriteSheet.png' },
        { name: 'EffectIce', src: 'images/Items/Effect/Ice/SpriteSheet.png' },
        { name: 'plant', src: 'images/Items/Plant/SpriteSheet16x16.png' },
        // Spawn effect
        { name: 'Pentagram', src: 'images/pentagram.png' },
        // Status effect overlays
        { name: 'Ice', src: 'images/ice.png' },
        { name: 'Flame', src: 'images/flame.png' },
        // Heart icons for lives system
        { name: 'Heart_full', src: 'images/Heart_full.png' },
        { name: 'Heart_empty', src: 'images/Heart_empty.png' },
        // Biome sprite sheets
        { name: 'biome_forest', src: 'images/biomes/forest.png' },
        { name: 'biome_desert', src: 'images/biomes/desert.png' },
        { name: 'biome_snow', src: 'images/biomes/snow.png' },
        { name: 'biome_swamp', src: 'images/biomes/swamp.png' },
        { name: 'biome_volcanic', src: 'images/biomes/volcanic.png' },
        { name: 'biome_crystal', src: 'images/biomes/crystal.png' },
        { name: 'biome_corruption', src: 'images/biomes/corruption.png' },
        { name: 'biome_celestial', src: 'images/biomes/celestial.png' }
    ];

    // Add monster images based on monsters.json
    for (const monster of monstersData) {
        const spriteInfo = MONSTER_SPRITE_MAP[monster.type];
        if (spriteInfo) {
            imagesToLoad.push({
                name: `monster_${monster.type}`,
                src: `images/Monsters/${spriteInfo.folder}/${spriteInfo.file}`
            });
        }
    }

    let loaded = 0;
    const total = imagesToLoad.length;

    for (const img of imagesToLoad) {
        images[img.name] = new Image();
        images[img.name].onload = () => {
            loaded++;
            if (loaded === total) {
                callback();
            }
        };
        images[img.name].onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
            loaded++;
            if (loaded === total) {
                callback();
            }
        };
        images[img.name].src = img.src;
    }
}

// Input handling
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseleave', handleMouseUp);

// Helper to check if point is inside a button
function isPointInButton(x, y, btn) {
    return x >= btn.x && x <= btn.x + btn.width && y >= btn.y && y <= btn.y + btn.height;
}

// Cursor hover effect and mouse tracking
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    let isOverButton = false;

    // Track mouse position for continuous movement
    mouseScreenX = x;
    mouseScreenY = y;

    if (gameState === 'playing') {
        const pauseBtn = getPauseButtonBounds();
        const soundBtn = getSoundButtonBounds();
        if (isPointInButton(x, y, pauseBtn) || isPointInButton(x, y, soundBtn)) isOverButton = true;
    } else if (gameState === 'paused') {
        const buttons = getPauseMenuButtonBounds();
        if (isPointInButton(x, y, buttons.resume)) {
            isOverButton = true;
        }
    } else if (gameState === 'gameover') {
        const buttons = getGameOverButtonBounds();
        if (isPointInButton(x, y, buttons.restart)) {
            isOverButton = true;
        } else if (buttons.revive && isPointInButton(x, y, buttons.revive)) {
            isOverButton = true;
        } else if (buttons.skip && isPointInButton(x, y, buttons.skip)) {
            isOverButton = true;
        }
    } else if (gameState === 'upgrading') {
        const buttonWidth = 280;
        const buttonHeight = 80;
        const buttonSpacing = 15;
        const totalHeight = upgradeOptions.length * (buttonHeight + buttonSpacing) - buttonSpacing;
        const startY = (canvas.height - totalHeight) / 2 + 20;
        for (let i = 0; i < upgradeOptions.length; i++) {
            const buttonX = (canvas.width - buttonWidth) / 2;
            const buttonY = startY + i * (buttonHeight + buttonSpacing);
            if (x >= buttonX && x <= buttonX + buttonWidth &&
                y >= buttonY && y <= buttonY + buttonHeight) {
                isOverButton = true;
                break;
            }
        }
    }

    canvas.style.cursor = (isOverButton || mouseHeld)
        ? "url('images/StoneCursorWenrexa/PNG/15.png') 16 16, pointer"
        : "url('images/StoneCursorWenrexa/PNG/11.png') 16 16, auto";
});

// Desktop mouse input
function handleMouseDown(e) {
    if (isMobile) return;
    ensureAudio();
    const rect = canvas.getBoundingClientRect();
    mouseScreenX = (e.clientX - rect.left) * (canvas.width / rect.width);
    mouseScreenY = (e.clientY - rect.top) * (canvas.height / rect.height);
    mouseHeld = true;
    canvas.style.cursor = "url('images/StoneCursorWenrexa/PNG/15.png') 16 16, auto";
    handleInputAt(mouseScreenX, mouseScreenY);
}

function handleMouseUp() {
    if (isMobile) return;
    mouseHeld = false;
    canvas.style.cursor = "url('images/StoneCursorWenrexa/PNG/11.png') 16 16, auto";
    // Don't stop player.moving - let them continue to final destination
}

// Mobile joystick touch handling
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    ensureAudio();
    const rect = canvas.getBoundingClientRect();

    for (const touch of e.changedTouches) {
        const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
        const touchY = (touch.clientY - rect.top) * (canvas.height / rect.height);

        // Check if this is a UI interaction (game over, upgrade menu, paused)
        if (gameState === 'gameover' || gameState === 'upgrading' || gameState === 'paused') {
            handleInputAt(touchX, touchY);
            return;
        }

        // Start joystick on right side of screen during gameplay
        if (gameState === 'playing') {
            // Check pause button first
            const pauseBtn = getPauseButtonBounds();
            if (touchX >= pauseBtn.x && touchX <= pauseBtn.x + pauseBtn.width &&
                touchY >= pauseBtn.y && touchY <= pauseBtn.y + pauseBtn.height) {
                stopMusic();
                gameState = 'paused';
                return;
            }

            // Check sound button
            const soundBtn = getSoundButtonBounds();
            if (touchX >= soundBtn.x && touchX <= soundBtn.x + soundBtn.width &&
                touchY >= soundBtn.y && touchY <= soundBtn.y + soundBtn.height) {
                SFX.click();
                toggleSound();
                return;
            }

            joystick.active = true;
            joystick.touchId = touch.identifier;
            joystick.baseX = touchX;
            joystick.baseY = touchY;
            joystick.knobX = touchX;
            joystick.knobY = touchY;
            joystick.dirX = 0;
            joystick.dirY = 0;
        }
    }
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!joystick.active) return;

    const rect = canvas.getBoundingClientRect();

    for (const touch of e.changedTouches) {
        if (touch.identifier === joystick.touchId) {
            const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
            const touchY = (touch.clientY - rect.top) * (canvas.height / rect.height);

            // Calculate distance from joystick base
            const dx = touchX - joystick.baseX;
            const dy = touchY - joystick.baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Clamp knob position to joystick radius
            if (dist > JOYSTICK_BASE_RADIUS) {
                joystick.knobX = joystick.baseX + (dx / dist) * JOYSTICK_BASE_RADIUS;
                joystick.knobY = joystick.baseY + (dy / dist) * JOYSTICK_BASE_RADIUS;
            } else {
                joystick.knobX = touchX;
                joystick.knobY = touchY;
            }

            // Calculate normalized direction (with dead zone)
            if (dist > JOYSTICK_DEAD_ZONE) {
                const normalizedDist = Math.min(dist, JOYSTICK_BASE_RADIUS) / JOYSTICK_BASE_RADIUS;
                joystick.dirX = (dx / dist) * normalizedDist;
                joystick.dirY = (dy / dist) * normalizedDist;

                // Update player facing angle for Arrow weapon
                playerFacingAngle = Math.atan2(dy, dx);
            } else {
                joystick.dirX = 0;
                joystick.dirY = 0;
            }
        }
    }
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    for (const touch of e.changedTouches) {
        if (touch.identifier === joystick.touchId) {
            joystick.active = false;
            joystick.touchId = null;
            joystick.dirX = 0;
            joystick.dirY = 0;
        }
    }
});

canvas.addEventListener('touchcancel', (e) => {
    for (const touch of e.changedTouches) {
        if (touch.identifier === joystick.touchId) {
            joystick.active = false;
            joystick.touchId = null;
            joystick.dirX = 0;
            joystick.dirY = 0;
        }
    }
});

// Gamepad connection handlers
window.addEventListener('gamepadconnected', (e) => {
    gamepad.connected = true;
    gamepad.index = e.gamepad.index;
});

window.addEventListener('gamepaddisconnected', (e) => {
    if (gamepad.index === e.gamepad.index) {
        gamepad.connected = false;
        gamepad.index = null;
        gamepad.leftStick = { x: 0, y: 0 };
        gamepad.buttons = { start: false, prevStart: false };
    }
});

// Keyboard event handlers
window.addEventListener('keydown', (e) => {
    // Handle upgrade menu navigation
    if (gameState === 'upgrading' && upgradeOptions.length > 0) {
        switch(e.code) {
            case 'ArrowUp':
            case 'KeyW':
                e.preventDefault();
                if (selectedUpgradeIndex === -1) {
                    selectedUpgradeIndex = upgradeOptions.length - 1;
                } else {
                    selectedUpgradeIndex = (selectedUpgradeIndex - 1 + upgradeOptions.length) % upgradeOptions.length;
                }
                return;
            case 'ArrowDown':
            case 'KeyS':
                e.preventDefault();
                if (selectedUpgradeIndex === -1) {
                    selectedUpgradeIndex = 0;
                } else {
                    selectedUpgradeIndex = (selectedUpgradeIndex + 1) % upgradeOptions.length;
                }
                return;
            case 'Enter':
            case 'Space':
                if (selectedUpgradeIndex >= 0) {
                    e.preventDefault();
                    SFX.upgradeSelect();
                    applyUpgrade(upgradeOptions[selectedUpgradeIndex]);
                    startMusic();
                    readyTimer = POST_UPGRADE_DELAY;
                    gameState = 'playing';
                }
                return;
        }
    }

    switch(e.code) {
        case 'ArrowUp':
        case 'KeyW':
            keyboard.up = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keyboard.down = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keyboard.left = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keyboard.right = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'ArrowUp':
        case 'KeyW':
            keyboard.up = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            keyboard.down = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            keyboard.left = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keyboard.right = false;
            break;
    }
});

function handleInputAt(screenX, screenY) {
    if (gameState === 'gameover') {
        const buttons = getGameOverButtonBounds();

        // Check restart button
        if (screenX >= buttons.restart.x && screenX <= buttons.restart.x + buttons.restart.width &&
            screenY >= buttons.restart.y && screenY <= buttons.restart.y + buttons.restart.height) {
            restartGame();
            startLevel(maxLevelReached);
            return;
        }

        // Check revive button
        if (buttons.revive && screenX >= buttons.revive.x && screenX <= buttons.revive.x + buttons.revive.width &&
            screenY >= buttons.revive.y && screenY <= buttons.revive.y + buttons.revive.height) {
            if (bridgeReady && bridge.advertisement.isRewardedSupported) {
                bridge.advertisement.showRewarded('revive');
                const onReviveState = (state) => {
                    if (state === 'rewarded') {
                        playerLives = 1;
                        gameState = 'playing';
                        startMusic();
                        damageInvincibilityTimer = DAMAGE_INVINCIBILITY;
                    } else if (state === 'closed' || state === 'failed') {
                        bridge.advertisement.off(bridge.EVENT_NAME.REWARDED_STATE_CHANGED, onReviveState);
                    }
                };
                bridge.advertisement.on(bridge.EVENT_NAME.REWARDED_STATE_CHANGED, onReviveState);
            } else {
                // Fallback: grant reward directly if bridge not available
                playerLives = 1;
                gameState = 'playing';
                startMusic();
                damageInvincibilityTimer = DAMAGE_INVINCIBILITY;
            }
            return;
        }

        // Check skip button
        if (buttons.skip && screenX >= buttons.skip.x && screenX <= buttons.skip.x + buttons.skip.width &&
            screenY >= buttons.skip.y && screenY <= buttons.skip.y + buttons.skip.height) {
            if (bridgeReady && bridge.advertisement.isRewardedSupported) {
                bridge.advertisement.showRewarded('skip_level');
                const onSkipState = (state) => {
                    if (state === 'rewarded') {
                        if (currentLevel >= maxLevelReached) {
                            maxLevelReached = currentLevel + 1;
                            saveData('mobholdMaxLevel', maxLevelReached.toString());
                        }
                        restartGame();
                        startLevel(maxLevelReached);
                    } else if (state === 'closed' || state === 'failed') {
                        bridge.advertisement.off(bridge.EVENT_NAME.REWARDED_STATE_CHANGED, onSkipState);
                    }
                };
                bridge.advertisement.on(bridge.EVENT_NAME.REWARDED_STATE_CHANGED, onSkipState);
            } else {
                // Fallback: grant reward directly if bridge not available
                if (currentLevel >= maxLevelReached) {
                    maxLevelReached = currentLevel + 1;
                    saveData('mobholdMaxLevel', maxLevelReached.toString());
                }
                restartGame();
                startLevel(maxLevelReached);
            }
            return;
        }

        return;
    }

    if (gameState === 'paused') {
        const buttons = getPauseMenuButtonBounds();

        // Check resume button
        if (screenX >= buttons.resume.x && screenX <= buttons.resume.x + buttons.resume.width &&
            screenY >= buttons.resume.y && screenY <= buttons.resume.y + buttons.resume.height) {
            readyTimer = POST_UPGRADE_DELAY;
            startMusic();
            gameState = 'playing';
            return;
        }

        return;
    }

    if (gameState === 'upgrading') {
        handleUpgradeClick(screenX, screenY);
        return;
    }

    if (gameState !== 'playing') return;

    // Check pause button click (not during ready countdown)
    const pauseBtn = getPauseButtonBounds();
    if (readyTimer <= 0 && screenX >= pauseBtn.x && screenX <= pauseBtn.x + pauseBtn.width &&
        screenY >= pauseBtn.y && screenY <= pauseBtn.y + pauseBtn.height) {
        stopMusic();
        gameState = 'paused';
        return;
    }

    // Check sound button click
    const soundBtn = getSoundButtonBounds();
    if (readyTimer <= 0 && screenX >= soundBtn.x && screenX <= soundBtn.x + soundBtn.width &&
        screenY >= soundBtn.y && screenY <= soundBtn.y + soundBtn.height) {
        SFX.click();
        toggleSound();
        return;
    }

    // Convert screen position to world position
    const worldX = screenX + cameraX - canvas.width / 2;
    const worldY = screenY + cameraY - canvas.height / 2;

    player.targetX = worldX;
    player.targetY = worldY;
    player.moving = true;

    // Update player facing angle for Arrow weapon
    playerFacingAngle = Math.atan2(worldY - player.y, worldX - player.x);
}

function handleUpgradeClick(screenX, screenY) {
    const buttonWidth = 280;
    const buttonHeight = 80;
    const buttonSpacing = 15;
    const totalHeight = upgradeOptions.length * (buttonHeight + buttonSpacing) - buttonSpacing;
    const startY = (canvas.height - totalHeight) / 2 + 20;

    for (let i = 0; i < upgradeOptions.length; i++) {
        const buttonX = (canvas.width - buttonWidth) / 2;
        const buttonY = startY + i * (buttonHeight + buttonSpacing);

        if (screenX >= buttonX && screenX <= buttonX + buttonWidth &&
            screenY >= buttonY && screenY <= buttonY + buttonHeight) {
            applyUpgrade(upgradeOptions[i]);
            startMusic();
            readyTimer = POST_UPGRADE_DELAY;
            gameState = 'playing';
            return;
        }
    }
}

function applyUpgrade(option) {
    if (option.isScroll) {
        // Add scroll with random initial trigger time
        const config = SCROLL_CONFIG[option.type];
        const initialDelay = config.minInterval + Math.random() * (config.maxInterval - config.minInterval);
        playerScrolls.push({
            type: option.type,
            nextTriggerTime: gameTime + initialDelay,
            cooldownStartTime: gameTime,
            cooldownDuration: initialDelay
        });
    } else if (option.isNew) {
        // Add new weapon at level 0
        playerWeapons.push({
            type: option.type,
            level: 0,
            cooldownTimer: 0
        });
    } else {
        // Upgrade existing weapon
        const weapon = playerWeapons.find(w => w.type === option.type);
        if (weapon) {
            weapon.level++;
        }
    }

    // Update circlets if Circlet weapon was added or upgraded
    if (option.type === 'Circlet') {
        updateCirclets();
    }

    // Grant speed boost to escape dangerous situations
    speedBoostTimer = SPEED_BOOST_DURATION;

    // Grant invincibility to survive being surrounded
    invincibilityTimer = POST_UPGRADE_INVINCIBILITY;
}

// ============================================
// PROCEDURAL ENVIRONMENT SYSTEM
// ============================================

// 2D Value Noise
function perlinNoise(x, y, seed) {
    function hash(ix, iy) {
        const n = ix * 374761393 + iy * 668265263 + seed * 1274126177;
        let h = n;
        h = (h ^ (h >> 13)) * 1274126177;
        h = h ^ (h >> 16);
        return (h & 0x7fffffff) / 0x7fffffff;
    }
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);
    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);
    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x, y, seed, octaves, persistence, scale) {
    let value = 0, amplitude = 1, frequency = scale, maxValue = 0;
    for (let i = 0; i < octaves; i++) {
        value += perlinNoise(x * frequency, y * frequency, seed + i * 1000) * amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= 2;
    }
    return value / maxValue;
}

const BIOMES = [
    {
        id: 'plains', name: 'Verdant Plains', weight: 3,
        palette: { deep: '#4a6a2a', ground: '#5a8a30', light: '#72b044', accent: '#88cc55', water: '#3a7ab8', rock: '#8a8a7a' },
        thresholds: { water: 0.18, ground: 0.42, grass: 0.75, rock: 0.90, high: 1.0 },
        decorations: [
            { type: 'wildflower', density: 0.05, blocking: false },
            { type: 'tall_grass', density: 0.06, blocking: false },
            { type: 'small_rock', density: 0.02, blocking: false },
            { type: 'shrub', density: 0.03, blocking: false },
            { type: 'fence', density: 0.01, blocking: true },
            { type: 'log', density: 0.008, blocking: true },
            { type: 'butterfly', density: 0.015, blocking: false },
            { type: 'mushroom', density: 0.025, blocking: false },
        ],
        noise: { octaves: 4, persistence: 0.5, scale: 0.035 },
        decorNoise: { octaves: 3, persistence: 0.4, scale: 0.06 },
        particles: { type: 'firefly', count: 10, color: '#ccff44' },
    },
    {
        id: 'forest', name: 'Forest', weight: 1,
        palette: { deep: '#244416', ground: '#3a6e1e', light: '#569430', accent: '#72b044', water: '#2e6a9c', rock: '#6a6a5a', mud: '#4a3a20', moss: '#4a7a2a' },
        thresholds: { water: 0.22, ground: 0.48, grass: 0.72, rock: 0.88, high: 1.0 },
        decorations: [
            { type: 'tree_oak', density: 0.025, blocking: true },
            { type: 'tree_pine', density: 0.015, blocking: true },
            { type: 'bush_large', density: 0.04, blocking: false },
            { type: 'fern', density: 0.06, blocking: false },
            { type: 'flower_wild', density: 0.05, blocking: false },
            { type: 'mushroom_group', density: 0.03, blocking: false },
            { type: 'stump_mossy', density: 0.012, blocking: true },
            { type: 'fallen_log', density: 0.008, blocking: true },
        ],
        noise: { octaves: 5, persistence: 0.55, scale: 0.035 },
        decorNoise: { octaves: 4, persistence: 0.45, scale: 0.065 },
        particles: { type: 'firefly', count: 18, color: '#ccff44' },
    },
    {
        id: 'desert', name: 'Scorched Dunes', weight: 1,
        palette: { deep: '#a08030', ground: '#c8a848', light: '#e0c870', accent: '#f0dc90', water: '#4a88aa', rock: '#8a6a30', sand: '#d4b858', bone: '#e0d8c0' },
        thresholds: { water: 0.12, ground: 0.42, grass: 0.72, rock: 0.90, high: 1.0 },
        decorations: [
            { type: 'cactus_tall', density: 0.018, blocking: true },
            { type: 'cactus_saguaro', density: 0.012, blocking: true },
            { type: 'dune_ripple', density: 0.06, blocking: false },
            { type: 'skull_buried', density: 0.006, blocking: false },
            { type: 'dead_bush', density: 0.025, blocking: false },
            { type: 'rock_sandstone', density: 0.03, blocking: true },
            { type: 'bone_pile', density: 0.005, blocking: false },
            { type: 'scorpion_hole', density: 0.008, blocking: false },
        ],
        noise: { octaves: 4, persistence: 0.4, scale: 0.028 },
        decorNoise: { octaves: 3, persistence: 0.35, scale: 0.055 },
        particles: { type: 'sand', count: 22, color: '#d4b858' },
    },
    {
        id: 'snow', name: 'Frozen Wastes', weight: 1,
        palette: { deep: '#8898b0', ground: '#b8c8e0', light: '#d8e4f0', accent: '#eef4ff', water: '#5890b8', rock: '#7888a0', ice: '#a0c8e8', frost: '#c8dcf0' },
        thresholds: { water: 0.18, ground: 0.45, grass: 0.75, rock: 0.90, high: 1.0 },
        decorations: [
            { type: 'pine_snow', density: 0.022, blocking: true },
            { type: 'pine_small', density: 0.018, blocking: true },
            { type: 'ice_crystal', density: 0.025, blocking: false },
            { type: 'snowdrift', density: 0.05, blocking: false },
            { type: 'frozen_lake', density: 0.015, blocking: false },
            { type: 'rock_icy', density: 0.03, blocking: true },
            { type: 'igloo_ruin', density: 0.004, blocking: true },
            { type: 'wolf_tracks', density: 0.02, blocking: false },
        ],
        noise: { octaves: 5, persistence: 0.55, scale: 0.04 },
        decorNoise: { octaves: 4, persistence: 0.4, scale: 0.06 },
        particles: { type: 'snow', count: 35, color: '#ffffff' },
    },
    {
        id: 'swamp', name: 'Mire', weight: 1,
        palette: { deep: '#1e2a10', ground: '#3a4a1e', light: '#4a5a2a', accent: '#5a6a38', water: '#2a4a38', rock: '#4a4a3a', mud: '#3a3018', algae: '#4a6a2a' },
        thresholds: { water: 0.32, ground: 0.55, grass: 0.80, rock: 0.92, high: 1.0 },
        decorations: [
            { type: 'mushroom_glow', density: 0.035, blocking: false },
            { type: 'deadtree_twisted', density: 0.025, blocking: true },
            { type: 'lily_pad', density: 0.05, blocking: false },
            { type: 'vine_hanging', density: 0.04, blocking: false },
            { type: 'mud_bubble', density: 0.03, blocking: false },
            { type: 'frog_spawn', density: 0.02, blocking: false },
            { type: 'reeds', density: 0.045, blocking: false },
            { type: 'carnivorous_plant', density: 0.008, blocking: false },
        ],
        noise: { octaves: 5, persistence: 0.6, scale: 0.045 },
        decorNoise: { octaves: 4, persistence: 0.5, scale: 0.075 },
        particles: { type: 'fog', count: 12, color: '#7aaa7a' },
    },
    {
        id: 'volcanic', name: 'Inferno Peaks', weight: 1,
        palette: { deep: '#1a0a00', ground: '#3a1a08', light: '#5a2a10', accent: '#8a3a10', water: '#cc3300', rock: '#2a1a0a', ember: '#aa4400', obsidian: '#1a0a08' },
        thresholds: { water: 0.18, ground: 0.45, grass: 0.70, rock: 0.88, high: 1.0 },
        decorations: [
            { type: 'volcanic_rock', density: 0.035, blocking: true },
            { type: 'fire_geyser', density: 0.015, blocking: false },
            { type: 'lava_crack', density: 0.04, blocking: false },
            { type: 'obsidian_spike', density: 0.02, blocking: true },
            { type: 'skull_charred', density: 0.008, blocking: false },
            { type: 'ash_pile', density: 0.04, blocking: false },
            { type: 'magma_vent', density: 0.01, blocking: false },
            { type: 'burned_tree', density: 0.012, blocking: true },
        ],
        noise: { octaves: 6, persistence: 0.7, scale: 0.055 },
        decorNoise: { octaves: 4, persistence: 0.5, scale: 0.07 },
        particles: { type: 'ember', count: 25, color: '#ff6600' },
    },
    {
        id: 'crystal', name: 'Crystal Cavern', weight: 1,
        palette: { deep: '#1a0a2a', ground: '#3a1a4a', light: '#5a2a6a', accent: '#7a3a8a', water: '#4a2a7a', rock: '#2a1a3a', crystal: '#9a5acc', glow: '#cc88ff' },
        thresholds: { water: 0.12, ground: 0.42, grass: 0.75, rock: 0.90, high: 1.0 },
        decorations: [
            { type: 'crystal_cluster', density: 0.03, blocking: true },
            { type: 'crystal_single', density: 0.04, blocking: false },
            { type: 'gem_ruby', density: 0.008, blocking: false },
            { type: 'gem_sapphire', density: 0.008, blocking: false },
            { type: 'amethyst_column', density: 0.015, blocking: true },
            { type: 'crystal_floor', density: 0.05, blocking: false },
            { type: 'geode', density: 0.01, blocking: true },
            { type: 'glow_moss', density: 0.035, blocking: false },
        ],
        noise: { octaves: 4, persistence: 0.35, scale: 0.025 },
        decorNoise: { octaves: 3, persistence: 0.35, scale: 0.05 },
        particles: { type: 'sparkle', count: 30, color: '#cc88ff' },
    },
    {
        id: 'corruption', name: 'Void', weight: 1,
        palette: { deep: '#0a0018', ground: '#1a0830', light: '#2a1048', accent: '#4a1860', water: '#300848', rock: '#120020', vein: '#6a20a0', eye: '#ff0040' },
        thresholds: { water: 0.22, ground: 0.50, grass: 0.78, rock: 0.90, high: 1.0 },
        decorations: [
            { type: 'corruption_tower', density: 0.015, blocking: true },
            { type: 'watcher_eye', density: 0.012, blocking: false },
            { type: 'tendril_large', density: 0.03, blocking: false },
            { type: 'void_crystal', density: 0.02, blocking: true },
            { type: 'corruption_pile', density: 0.025, blocking: false },
            { type: 'shadow_pool', density: 0.015, blocking: false },
            { type: 'spike腐败', density: 0.018, blocking: true },
            { type: 'whisper_orb', density: 0.008, blocking: false },
        ],
        noise: { octaves: 5, persistence: 0.6, scale: 0.038 },
        decorNoise: { octaves: 4, persistence: 0.5, scale: 0.06 },
        particles: { type: 'dark_sparkle', count: 22, color: '#aa44ff' },
    },
    {
        id: 'celestial', name: 'Ethereal Sky', weight: 1,
        palette: { deep: '#0a1830', ground: '#1a3050', light: '#2a4870', accent: '#3a6090', water: '#204068', rock: '#182848', cloud: '#5080b0', star: '#aaccff' },
        thresholds: { water: 0.18, ground: 0.45, grass: 0.75, rock: 0.90, high: 1.0 },
        decorations: [
            { type: 'cloud_fluffy', density: 0.03, blocking: false },
            { type: 'cloud_wispy', density: 0.025, blocking: false },
            { type: 'star_pillar', density: 0.012, blocking: true },
            { type: 'light_well', density: 0.01, blocking: false },
            { type: 'floating_rock', density: 0.015, blocking: true },
            { type: 'aurora_streak', density: 0.02, blocking: false },
            { type: 'moon_shard', density: 0.008, blocking: true },
            { type: 'celestial_bloom', density: 0.015, blocking: false },
        ],
        noise: { octaves: 4, persistence: 0.35, scale: 0.032 },
        decorNoise: { octaves: 3, persistence: 0.35, scale: 0.055 },
        particles: { type: 'star', count: 25, color: '#ffdd88' },
    },
];

// Biome state
let currentBiome = null;
let biomeNameTimer = 0;
let biomeNameText = '';
let ambientParticles = [];
let ambientTimer = 0;
let terrainDamageTick = 0;

function getBiomeForLevel(levelNum) {
    if (levelNum === 1) return null;
    const biomeSeed = levelNum * 7919;
    const totalWeight = BIOMES.reduce((s, b) => s + (b.weight || 1), 0);
    let r = levelRng(biomeSeed) * totalWeight;
    for (const biome of BIOMES) {
        r -= (biome.weight || 1);
        if (r <= 0) return biome;
    }
    return BIOMES[BIOMES.length - 1];
}

function getBiomeTileAt(tileX, tileY, biome) {
    if (!biome) return getTileAt(tileX, tileY);
    if (biome.id === 'plains') {
        const classicTile = getTileAt(tileX, tileY);
        return { type: classicTile.blocking ? 'rock' : 'main', color: classicTile.color || '#5a8a30', blocking: classicTile.blocking, decoration: classicTile.isPlant ? { type: 'tall_grass' } : null };
    }
    const key = `b${biome.id}_${tileX},${tileY}`;
    if (tileMap.has(key)) return tileMap.get(key);

    const n = fbm(tileX, tileY, biome.id.charCodeAt(0) * 100, biome.noise.octaves, biome.noise.persistence, biome.noise.scale);
    const inSafe = Math.abs(tileX) <= 4 && Math.abs(tileY) <= 4;

    const th = biome.thresholds;
    let tile;
    if (n < th.water) {
        const isLava = biome.id === 'volcanic';
        const isSwamp = biome.id === 'swamp';
        tile = { type: 'liquid', color: biome.palette.water, blocking: false, damage: isLava ? 2 : 0, slow: isSwamp ? 0.5 : 1 };
    } else if (n < th.ground) {
        tile = { type: 'ground', color: biome.palette.deep, blocking: false };
    } else if (n < th.grass) {
        tile = { type: 'main', color: biome.palette.ground, blocking: false };
    } else if (n < th.rock) {
        tile = { type: 'rock', color: biome.palette.rock, blocking: false };
    } else {
        tile = { type: 'high', color: biome.palette.light, blocking: false };
    }

    // Grid-based decoration placement for even distribution
    if (!inSafe) {
        const cellSize = 5; // decorations every ~5 tiles
        const cellX = Math.floor(tileX / cellSize);
        const cellY = Math.floor(tileY / cellSize);
        // Deterministic jitter per cell (0..1 within cell)
        const jitterX = (Math.sin(cellX * 127.1 + cellY * 311.7) * 43758.5453) % 1;
        const jX = jitterX - Math.floor(jitterX); // 0..1
        const jitterY = (Math.sin(cellX * 269.5 + cellY * 183.3) * 43758.5453) % 1;
        const jY = jitterY - Math.floor(jitterY);
        // Center of cell + jitter
        const decX = cellX * cellSize + cellSize * 0.5 + (jX - 0.5) * cellSize * 0.7;
        const decY = cellY * cellSize + cellSize * 0.5 + (jY - 0.5) * cellSize * 0.7;
        const dist = Math.sqrt((tileX - decX) ** 2 + (tileY - decY) ** 2);
        if (dist < 1.6) {
            const decos = biome.decorations;
            const pick = Math.abs(cellX * 7 + cellY * 13 + cellX * cellY) % decos.length;
            tile = Object.assign({}, tile, { decoration: decos[pick] });
        }
    }

    tileMap.set(key, tile);
    return tile;
}

function drawDecoration(x, y, size, decor, time) {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const s = size;
    ctx.save();

    switch (decor.type) {
        // ===== FOREST =====
        case 'tree_oak': {
            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.15)';
            ctx.beginPath();
            ctx.ellipse(cx + s * 0.05, cy + s * 0.2, s * 0.3, s * 0.12, 0, 0, Math.PI * 2);
            ctx.fill();
            // Trunk
            const tgrd = ctx.createLinearGradient(cx - s * 0.04, cy, cx + s * 0.04, cy);
            tgrd.addColorStop(0, '#3a2210');
            tgrd.addColorStop(0.5, '#5a3a1a');
            tgrd.addColorStop(1, '#4a2a12');
            ctx.fillStyle = tgrd;
            ctx.fillRect(cx - s * 0.04, cy - s * 0.02, s * 0.08, s * 0.3);
            // Bark texture
            ctx.strokeStyle = '#2a1a08';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < 3; i++) {
                const by = cy + s * 0.05 + i * s * 0.08;
                ctx.beginPath();
                ctx.moveTo(cx - s * 0.03, by);
                ctx.lineTo(cx + s * 0.01, by + s * 0.02);
                ctx.stroke();
            }
            // Canopy layers
            const sway = Math.sin(time / 1200 + cx * 0.1) * s * 0.015;
            ctx.fillStyle = '#1a4a0e';
            ctx.beginPath();
            ctx.arc(cx + sway, cy - s * 0.18, s * 0.32, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#2d6a1e';
            ctx.beginPath();
            ctx.arc(cx - s * 0.06 + sway, cy - s * 0.22, s * 0.24, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#3d8028';
            ctx.beginPath();
            ctx.arc(cx + s * 0.04 + sway, cy - s * 0.28, s * 0.18, 0, Math.PI * 2);
            ctx.fill();
            // Highlight
            ctx.fillStyle = 'rgba(120,200,60,0.15)';
            ctx.beginPath();
            ctx.arc(cx - s * 0.04 + sway, cy - s * 0.26, s * 0.12, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'tree_pine': {
            ctx.fillStyle = 'rgba(0,0,0,0.12)';
            ctx.beginPath();
            ctx.ellipse(cx + s * 0.03, cy + s * 0.22, s * 0.18, s * 0.08, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#3a2210';
            ctx.fillRect(cx - s * 0.03, cy + s * 0.05, s * 0.06, s * 0.25);
            ctx.fillStyle = '#1a4a18';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.32);
            ctx.lineTo(cx + s * 0.18, cy + s * 0.12);
            ctx.lineTo(cx - s * 0.18, cy + s * 0.12);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#226620';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.22);
            ctx.lineTo(cx + s * 0.14, cy + s * 0.05);
            ctx.lineTo(cx - s * 0.14, cy + s * 0.05);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#2a8028';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.14);
            ctx.lineTo(cx + s * 0.1, cy - s * 0.02);
            ctx.lineTo(cx - s * 0.1, cy - s * 0.02);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'bush_large': {
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.12, s * 0.2, s * 0.06, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#2a5a18';
            ctx.beginPath();
            ctx.arc(cx, cy + s * 0.04, s * 0.18, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#3a7022';
            ctx.beginPath();
            ctx.arc(cx - s * 0.05, cy + s * 0.01, s * 0.13, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#4a8830';
            ctx.beginPath();
            ctx.arc(cx + s * 0.04, cy - s * 0.02, s * 0.1, 0, Math.PI * 2);
            ctx.fill();
            // Berry dots
            ctx.fillStyle = '#cc3333';
            for (let i = 0; i < 4; i++) {
                const bx = cx + Math.cos(i * 1.57 + 0.3) * s * 0.08;
                const by = cy + Math.sin(i * 1.57 + 0.3) * s * 0.06;
                ctx.beginPath();
                ctx.arc(bx, by, s * 0.012, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        }
        case 'fern': {
            ctx.strokeStyle = '#3a8028';
            ctx.lineWidth = 1.5;
            const fSway = Math.sin(time / 800 + cx * 0.3) * s * 0.01;
            for (let i = 0; i < 5; i++) {
                const a = (i / 5) * Math.PI * 2 + 0.3;
                const len = s * (0.12 + Math.sin(i * 1.2) * 0.04);
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.quadraticCurveTo(
                    cx + Math.cos(a) * len * 0.6 + fSway,
                    cy + Math.sin(a) * len * 0.6,
                    cx + Math.cos(a) * len + fSway,
                    cy + Math.sin(a) * len
                );
                ctx.stroke();
            }
            ctx.fillStyle = '#4a9832';
            for (let i = 0; i < 5; i++) {
                const a = (i / 5) * Math.PI * 2 + 0.3;
                const fx = cx + Math.cos(a) * s * 0.09;
                const fy = cy + Math.sin(a) * s * 0.09;
                ctx.beginPath();
                ctx.ellipse(fx, fy, s * 0.03, s * 0.015, a, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        }
        case 'flower_wild': {
            const hue = ((cx * 7 + cy * 3) % 360);
            ctx.strokeStyle = '#3a7020';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy + s * 0.06);
            ctx.lineTo(cx, cy - s * 0.02);
            ctx.stroke();
            ctx.fillStyle = `hsl(${hue}, 70%, 55%)`;
            for (let i = 0; i < 5; i++) {
                const a = (i / 5) * Math.PI * 2 + time / 2000;
                ctx.beginPath();
                ctx.arc(cx + Math.cos(a) * s * 0.05, cy - s * 0.02 + Math.sin(a) * s * 0.05, s * 0.03, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.fillStyle = '#ffee44';
            ctx.beginPath();
            ctx.arc(cx, cy - s * 0.02, s * 0.02, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'mushroom_group': {
            for (let i = 0; i < 3; i++) {
                const mx = cx + (i - 1) * s * 0.1;
                const my = cy + s * 0.06 + Math.sin(i * 2) * s * 0.02;
                const mh = s * (0.06 + i * 0.02);
                ctx.fillStyle = '#c8a870';
                ctx.fillRect(mx - s * 0.012, my - mh, s * 0.024, mh);
                ctx.fillStyle = i === 1 ? '#cc4444' : '#bb3333';
                ctx.beginPath();
                ctx.ellipse(mx, my - mh, s * 0.05, s * 0.03, 0, Math.PI, 0);
                ctx.fill();
                if (i === 1) {
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(mx - s * 0.015, my - mh - s * 0.01, s * 0.008, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(mx + s * 0.012, my - mh + s * 0.005, s * 0.006, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            break;
        }
        case 'stump_mossy': {
            ctx.fillStyle = 'rgba(0,0,0,0.12)';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.1, s * 0.13, s * 0.05, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#5a3a18';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.08, s * 0.12, s * 0.07, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#7a5a30';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.06, s * 0.09, s * 0.05, 0, 0, Math.PI * 2);
            ctx.fill();
            // Growth rings
            ctx.strokeStyle = '#6a4a20';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.06, s * 0.04, s * 0.025, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Moss
            ctx.fillStyle = '#4a8030';
            ctx.beginPath();
            ctx.ellipse(cx - s * 0.06, cy + s * 0.05, s * 0.04, s * 0.02, -0.3, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'fallen_log': {
            ctx.fillStyle = '#3a2810';
            ctx.save();
            ctx.translate(cx, cy + s * 0.08);
            ctx.rotate(0.2);
            ctx.beginPath();
            ctx.ellipse(0, 0, s * 0.22, s * 0.04, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#5a4020';
            ctx.beginPath();
            ctx.ellipse(-s * 0.02, -s * 0.01, s * 0.18, s * 0.025, 0, 0, Math.PI * 2);
            ctx.fill();
            // Bark detail
            ctx.strokeStyle = '#2a1a08';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(-s * 0.15, 0);
            ctx.lineTo(s * 0.15, 0);
            ctx.stroke();
            ctx.restore();
            // Small mushrooms on log
            ctx.fillStyle = '#aa8844';
            ctx.fillRect(cx + s * 0.08, cy + s * 0.04, s * 0.015, s * 0.03);
            ctx.fillStyle = '#cc6633';
            ctx.beginPath();
            ctx.arc(cx + s * 0.088, cy + s * 0.04, s * 0.025, Math.PI, 0);
            ctx.fill();
            break;
        }

        // ===== DESERT =====
        case 'cactus_tall': {
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.22, s * 0.06, s * 0.02, 0, 0, Math.PI * 2);
            ctx.fill();
            const cgrd = ctx.createLinearGradient(cx - s * 0.05, cy, cx + s * 0.05, cy);
            cgrd.addColorStop(0, '#2a6a18');
            cgrd.addColorStop(0.5, '#4a9a2a');
            cgrd.addColorStop(1, '#3a7a20');
            ctx.fillStyle = cgrd;
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.04, cy + s * 0.2);
            ctx.quadraticCurveTo(cx - s * 0.05, cy - s * 0.05, cx - s * 0.02, cy - s * 0.25);
            ctx.quadraticCurveTo(cx, cy - s * 0.28, cx + s * 0.02, cy - s * 0.25);
            ctx.quadraticCurveTo(cx + s * 0.05, cy - s * 0.05, cx + s * 0.04, cy + s * 0.2);
            ctx.closePath();
            ctx.fill();
            // Ridges
            ctx.strokeStyle = 'rgba(0,0,0,0.12)';
            ctx.lineWidth = 0.5;
            for (let i = -2; i <= 2; i++) {
                ctx.beginPath();
                ctx.moveTo(cx + i * s * 0.012, cy - s * 0.22);
                ctx.lineTo(cx + i * s * 0.012, cy + s * 0.18);
                ctx.stroke();
            }
            break;
        }
        case 'cactus_saguaro': {
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.2, s * 0.08, s * 0.025, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#3a8822';
            ctx.fillRect(cx - s * 0.03, cy - s * 0.18, s * 0.06, s * 0.38);
            // Left arm
            ctx.fillRect(cx - s * 0.18, cy - s * 0.05, s * 0.15, s * 0.05);
            ctx.fillRect(cx - s * 0.18, cy - s * 0.15, s * 0.05, s * 0.1);
            // Right arm
            ctx.fillRect(cx + s * 0.03, cy + s * 0.05, s * 0.13, s * 0.05);
            ctx.fillRect(cx + s * 0.13, cy - s * 0.05, s * 0.05, s * 0.1);
            break;
        }
        case 'dune_ripple': {
            ctx.strokeStyle = 'rgba(180,150,80,0.25)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(cx - s * 0.3, cy + (i - 1.5) * s * 0.06);
                ctx.quadraticCurveTo(cx, cy + (i - 1.5) * s * 0.06 - s * 0.02, cx + s * 0.3, cy + (i - 1.5) * s * 0.06);
                ctx.stroke();
            }
            break;
        }
        case 'skull_buried': {
            ctx.fillStyle = '#d8d0c0';
            ctx.beginPath();
            ctx.arc(cx, cy + s * 0.05, s * 0.07, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#a09080';
            ctx.fillRect(cx - s * 0.04, cy + s * 0.08, s * 0.025, s * 0.02);
            ctx.fillRect(cx + s * 0.015, cy + s * 0.08, s * 0.025, s * 0.02);
            // Cracks
            ctx.strokeStyle = '#888070';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.02, cy + s * 0.02);
            ctx.lineTo(cx + s * 0.01, cy + s * 0.06);
            ctx.stroke();
            break;
        }
        case 'dead_bush': {
            ctx.strokeStyle = '#8a6a30';
            ctx.lineWidth = 1.5;
            for (let i = 0; i < 5; i++) {
                const a = (i / 5) * Math.PI + 0.5;
                ctx.beginPath();
                ctx.moveTo(cx, cy + s * 0.08);
                ctx.lineTo(cx + Math.cos(a) * s * 0.12, cy + s * 0.08 + Math.sin(a) * s * 0.12);
                ctx.stroke();
            }
            break;
        }
        case 'rock_sandstone': {
            ctx.fillStyle = '#b09050';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.2, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.15, cy - s * 0.1);
            ctx.lineTo(cx - s * 0.05, cy - s * 0.15);
            ctx.lineTo(cx + s * 0.1, cy - s * 0.12);
            ctx.lineTo(cx + s * 0.2, cy + s * 0.1);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#c8a860';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.12, cy - s * 0.08);
            ctx.lineTo(cx - s * 0.02, cy - s * 0.13);
            ctx.lineTo(cx + s * 0.08, cy - s * 0.1);
            ctx.lineTo(cx + s * 0.02, cy - s * 0.03);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'bone_pile': {
            ctx.fillStyle = '#e0d8c8';
            for (let i = 0; i < 5; i++) {
                const bx = cx + (i - 2) * s * 0.05;
                const by = cy + Math.sin(i * 1.5) * s * 0.03;
                ctx.save();
                ctx.translate(bx, by);
                ctx.rotate(i * 0.7);
                ctx.fillRect(-s * 0.04, -s * 0.008, s * 0.08, s * 0.016);
                ctx.restore();
            }
            break;
        }
        case 'scorpion_hole': {
            ctx.fillStyle = '#8a6a30';
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.08, s * 0.04, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#6a4a18';
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.05, s * 0.02, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        // ===== SNOW =====
        case 'pine_snow': {
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.22, s * 0.2, s * 0.07, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#3a2208';
            ctx.fillRect(cx - s * 0.03, cy + s * 0.08, s * 0.06, s * 0.22);
            // Tree layers
            ctx.fillStyle = '#1a4a1a';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.32);
            ctx.lineTo(cx + s * 0.2, cy + s * 0.14);
            ctx.lineTo(cx - s * 0.2, cy + s * 0.14);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#226622';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.22);
            ctx.lineTo(cx + s * 0.16, cy + s * 0.05);
            ctx.lineTo(cx - s * 0.16, cy + s * 0.05);
            ctx.closePath();
            ctx.fill();
            // Snow on branches
            ctx.fillStyle = '#e8f0f8';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.08, cy - s * 0.08);
            ctx.quadraticCurveTo(cx, cy - s * 0.12, cx + s * 0.08, cy - s * 0.08);
            ctx.lineTo(cx + s * 0.12, cy - s * 0.05);
            ctx.quadraticCurveTo(cx, cy - s * 0.08, cx - s * 0.12, cy - s * 0.05);
            ctx.closePath();
            ctx.fill();
            // Top snow cap
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(cx, cy - s * 0.3, s * 0.06, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'pine_small': {
            ctx.fillStyle = '#3a2208';
            ctx.fillRect(cx - s * 0.02, cy + s * 0.1, s * 0.04, s * 0.15);
            ctx.fillStyle = '#2a5a28';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.18);
            ctx.lineTo(cx + s * 0.1, cy + s * 0.14);
            ctx.lineTo(cx - s * 0.1, cy + s * 0.14);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#d8e8f0';
            ctx.beginPath();
            ctx.arc(cx, cy - s * 0.16, s * 0.04, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'ice_crystal': {
            ctx.fillStyle = 'rgba(160,210,255,0.5)';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.2);
            ctx.lineTo(cx + s * 0.08, cy);
            ctx.lineTo(cx + s * 0.03, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.03, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.08, cy);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgba(200,235,255,0.6)';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.15);
            ctx.lineTo(cx + s * 0.04, cy);
            ctx.lineTo(cx, cy + s * 0.06);
            ctx.lineTo(cx - s * 0.04, cy);
            ctx.closePath();
            ctx.fill();
            // Sparkle
            const sparkA = Math.sin(time / 400 + cx) * 0.3 + 0.7;
            ctx.fillStyle = `rgba(255,255,255,${sparkA * 0.4})`;
            ctx.beginPath();
            ctx.arc(cx, cy - s * 0.1, s * 0.02, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'snowdrift': {
            ctx.fillStyle = '#e8eef8';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.08, s * 0.22, s * 0.07, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#f0f4ff';
            ctx.beginPath();
            ctx.ellipse(cx - s * 0.04, cy + s * 0.06, s * 0.15, s * 0.04, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'frozen_lake': {
            ctx.fillStyle = 'rgba(140,190,230,0.35)';
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.28, s * 0.18, 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(200,230,255,0.3)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.1, cy - s * 0.02);
            ctx.lineTo(cx + s * 0.05, cy + s * 0.03);
            ctx.stroke();
            break;
        }
        case 'rock_icy': {
            ctx.fillStyle = '#6878a0';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.18, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.1, cy - s * 0.1);
            ctx.lineTo(cx + s * 0.12, cy - s * 0.08);
            ctx.lineTo(cx + s * 0.18, cy + s * 0.1);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgba(180,220,255,0.5)';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.08, cy - s * 0.06);
            ctx.lineTo(cx + s * 0.02, cy - s * 0.1);
            ctx.lineTo(cx + s * 0.08, cy - s * 0.04);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'igloo_ruin': {
            ctx.fillStyle = '#c0d0e0';
            ctx.beginPath();
            ctx.arc(cx, cy + s * 0.08, s * 0.15, Math.PI, 0);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#90a0b8';
            ctx.beginPath();
            ctx.arc(cx, cy + s * 0.08, s * 0.06, Math.PI, 0);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'wolf_tracks': {
            ctx.fillStyle = 'rgba(160,170,190,0.3)';
            for (let i = 0; i < 4; i++) {
                const tx = cx + (i - 1.5) * s * 0.07;
                const ty = cy + (i % 2) * s * 0.03;
                ctx.beginPath();
                ctx.ellipse(tx, ty, s * 0.015, s * 0.01, i * 0.3, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        }

        // ===== SWAMP =====
        case 'mushroom_glow': {
            ctx.fillStyle = '#a08050';
            ctx.fillRect(cx - s * 0.015, cy + s * 0.02, s * 0.03, s * 0.08);
            const gAlpha = 0.3 + Math.sin(time / 600 + cx) * 0.15;
            ctx.fillStyle = `rgba(100,200,80,${gAlpha})`;
            ctx.beginPath();
            ctx.arc(cx, cy + s * 0.02, s * 0.06, Math.PI, 0);
            ctx.fill();
            ctx.fillStyle = `rgba(140,255,100,${gAlpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(cx, cy + s * 0.02, s * 0.09, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'deadtree_twisted': {
            ctx.fillStyle = '#2a1a0a';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.04, cy + s * 0.2);
            ctx.quadraticCurveTo(cx + s * 0.08, cy - s * 0.05, cx - s * 0.02, cy - s * 0.25);
            ctx.lineTo(cx + s * 0.02, cy - s * 0.25);
            ctx.quadraticCurveTo(cx - s * 0.04, cy - s * 0.05, cx + s * 0.04, cy + s * 0.2);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#2a1a0a';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.02, cy - s * 0.15);
            ctx.quadraticCurveTo(cx - s * 0.15, cy - s * 0.2, cx - s * 0.12, cy - s * 0.08);
            ctx.moveTo(cx + s * 0.01, cy - s * 0.1);
            ctx.quadraticCurveTo(cx + s * 0.12, cy - s * 0.18, cx + s * 0.15, cy - s * 0.05);
            ctx.stroke();
            break;
        }
        case 'lily_pad': {
            ctx.fillStyle = '#2a7a28';
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.1, s * 0.07, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#1a5a1a';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + s * 0.08, cy - s * 0.02);
            ctx.stroke();
            // Flower on one
            if ((cx + cy) % 3 < 1) {
                ctx.fillStyle = '#ffaacc';
                ctx.beginPath();
                ctx.arc(cx - s * 0.02, cy - s * 0.02, s * 0.02, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        }
        case 'vine_hanging': {
            ctx.strokeStyle = '#3a6a22';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.2);
            ctx.bezierCurveTo(cx + s * 0.08, cy - s * 0.1, cx - s * 0.05, cy + s * 0.05, cx + s * 0.02, cy + s * 0.18);
            ctx.stroke();
            ctx.fillStyle = '#4a8a30';
            ctx.beginPath();
            ctx.ellipse(cx + s * 0.02, cy + s * 0.18, s * 0.03, s * 0.02, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'mud_bubble': {
            const bPulse = Math.sin(time / 500 + cx + cy) * 0.3 + 0.7;
            ctx.fillStyle = `rgba(80,60,20,${bPulse * 0.4})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.04 * bPulse, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'frog_spawn': {
            ctx.fillStyle = 'rgba(100,140,80,0.3)';
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.08, s * 0.05, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(60,80,40,0.5)';
            for (let i = 0; i < 6; i++) {
                ctx.beginPath();
                ctx.arc(cx + Math.cos(i) * s * 0.04, cy + Math.sin(i) * s * 0.025, s * 0.008, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        }
        case 'reeds': {
            ctx.strokeStyle = '#5a7a30';
            ctx.lineWidth = 1.5;
            for (let i = 0; i < 4; i++) {
                const rx = cx + (i - 1.5) * s * 0.04;
                const rh = s * (0.15 + Math.sin(i * 2.1) * 0.05);
                ctx.beginPath();
                ctx.moveTo(rx, cy + s * 0.1);
                ctx.quadraticCurveTo(rx + Math.sin(time / 700 + i) * s * 0.02, cy + s * 0.1 - rh * 0.5, rx, cy + s * 0.1 - rh);
                ctx.stroke();
            }
            break;
        }
        case 'carnivorous_plant': {
            ctx.fillStyle = '#2a6a18';
            ctx.fillRect(cx - s * 0.015, cy + s * 0.05, s * 0.03, s * 0.1);
            ctx.fillStyle = '#4a9a2a';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.05, s * 0.06, s * 0.04, 0, Math.PI, 0);
            ctx.fill();
            ctx.fillStyle = '#cc2244';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.05, s * 0.04, s * 0.025, 0, Math.PI, 0);
            ctx.fill();
            // Teeth
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 5; i++) {
                const tx = cx + (i - 2) * s * 0.015;
                ctx.fillRect(tx - s * 0.003, cy + s * 0.04, s * 0.006, s * 0.012);
            }
            break;
        }

        // ===== VOLCANIC =====
        case 'volcanic_rock': {
            ctx.fillStyle = '#1a0a02';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.2, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.12, cy - s * 0.12);
            ctx.lineTo(cx - s * 0.02, cy - s * 0.15);
            ctx.lineTo(cx + s * 0.1, cy - s * 0.1);
            ctx.lineTo(cx + s * 0.2, cy + s * 0.1);
            ctx.closePath();
            ctx.fill();
            // Glow crack
            ctx.strokeStyle = '#cc4400';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.08, cy - s * 0.05);
            ctx.lineTo(cx + s * 0.05, cy + s * 0.02);
            ctx.stroke();
            ctx.fillStyle = `rgba(255,80,0,${0.3 + Math.sin(time / 300) * 0.15})`;
            ctx.beginPath();
            ctx.ellipse(cx - s * 0.02, cy - s * 0.02, s * 0.02, s * 0.01, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'fire_geyser': {
            const fIntensity = Math.abs(Math.sin(time / 400 + cx * 0.5));
            ctx.fillStyle = '#2a1000';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.1, s * 0.08, s * 0.03, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255,60,0,${fIntensity * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(cx, cy + s * 0.08);
            ctx.quadraticCurveTo(cx + s * 0.06, cy - s * 0.05, cx, cy - s * 0.15 * fIntensity);
            ctx.quadraticCurveTo(cx - s * 0.06, cy - s * 0.05, cx, cy + s * 0.08);
            ctx.fill();
            ctx.fillStyle = `rgba(255,200,0,${fIntensity * 0.5})`;
            ctx.beginPath();
            ctx.arc(cx, cy - s * 0.05 * fIntensity, s * 0.04, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'lava_crack': {
            ctx.strokeStyle = `rgba(255,50,0,${0.5 + Math.sin(time / 350 + cy) * 0.2})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.2, cy + s * 0.05);
            ctx.lineTo(cx - s * 0.05, cy - s * 0.03);
            ctx.lineTo(cx + s * 0.08, cy + s * 0.02);
            ctx.lineTo(cx + s * 0.2, cy - s * 0.04);
            ctx.stroke();
            ctx.fillStyle = `rgba(255,100,0,0.2)`;
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.04, s * 0.015, 0.1, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'obsidian_spike': {
            const og = ctx.createLinearGradient(cx, cy - s * 0.2, cx, cy + s * 0.1);
            og.addColorStop(0, '#2a1830');
            og.addColorStop(0.5, '#1a0a18');
            og.addColorStop(1, '#0a0008');
            ctx.fillStyle = og;
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.25);
            ctx.lineTo(cx + s * 0.06, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.06, cy + s * 0.1);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgba(100,40,120,0.3)';
            ctx.beginPath();
            ctx.moveTo(cx + s * 0.01, cy - s * 0.18);
            ctx.lineTo(cx + s * 0.04, cy + s * 0.05);
            ctx.lineTo(cx, cy + s * 0.06);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'skull_charred': {
            ctx.fillStyle = '#4a4040';
            ctx.beginPath();
            ctx.arc(cx, cy + s * 0.05, s * 0.08, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#2a2020';
            ctx.beginPath();
            ctx.ellipse(cx - s * 0.03, cy + s * 0.04, s * 0.02, s * 0.025, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(cx + s * 0.03, cy + s * 0.04, s * 0.02, s * 0.025, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'ash_pile': {
            ctx.fillStyle = '#3a3030';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.08, s * 0.15, s * 0.04, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#4a4040';
            ctx.beginPath();
            ctx.ellipse(cx - s * 0.03, cy + s * 0.07, s * 0.08, s * 0.025, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'magma_vent': {
            const mv = Math.sin(time / 250 + cx) * 0.4 + 0.6;
            ctx.fillStyle = `rgba(200,40,0,${mv * 0.6})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.08, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255,150,0,${mv * 0.4})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.05, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255,255,100,${mv * 0.3})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.025, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'burned_tree': {
            ctx.fillStyle = '#1a0a02';
            ctx.fillRect(cx - s * 0.03, cy - s * 0.1, s * 0.06, s * 0.3);
            ctx.strokeStyle = '#1a0a02';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.05);
            ctx.lineTo(cx - s * 0.1, cy - s * 0.15);
            ctx.moveTo(cx, cy + s * 0.02);
            ctx.lineTo(cx + s * 0.08, cy - s * 0.08);
            ctx.stroke();
            // Ember glow on tips
            ctx.fillStyle = `rgba(255,80,0,${0.3 + Math.sin(time / 400) * 0.2})`;
            ctx.beginPath();
            ctx.arc(cx - s * 0.1, cy - s * 0.15, s * 0.015, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        // ===== CRYSTAL =====
        case 'crystal_cluster': {
            const colors = ['#9a5acc', '#7a3aaa', '#bb70ee'];
            for (let i = 0; i < 4; i++) {
                const cAngle = (i / 4) * Math.PI * 0.8 - 0.4;
                const cLen = s * (0.15 + Math.sin(i * 1.7) * 0.05);
                const cX = cx + Math.cos(cAngle) * s * 0.04;
                const cY = cy + s * 0.08;
                ctx.fillStyle = colors[i % 3];
                ctx.beginPath();
                ctx.moveTo(cX, cY - cLen);
                ctx.lineTo(cX + s * 0.03, cY);
                ctx.lineTo(cX - s * 0.03, cY);
                ctx.closePath();
                ctx.fill();
            }
            // Glow
            const cGlow = 0.15 + Math.sin(time / 600 + cx) * 0.08;
            ctx.fillStyle = `rgba(170,100,255,${cGlow})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.15, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'crystal_single': {
            const csGlow = 0.3 + Math.sin(time / 700 + cx * 0.5) * 0.15;
            ctx.fillStyle = `hsla(${270 + Math.sin(time / 900) * 20}, 70%, 55%, ${csGlow})`;
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.2);
            ctx.lineTo(cx + s * 0.06, cy + s * 0.08);
            ctx.lineTo(cx - s * 0.06, cy + s * 0.08);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = `rgba(220,180,255,${csGlow * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(cx + s * 0.01, cy - s * 0.14);
            ctx.lineTo(cx + s * 0.04, cy + s * 0.04);
            ctx.lineTo(cx, cy + s * 0.05);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'gem_ruby': {
            ctx.fillStyle = '#cc2244';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.1);
            ctx.lineTo(cx + s * 0.08, cy - s * 0.02);
            ctx.lineTo(cx + s * 0.05, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.05, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.08, cy - s * 0.02);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgba(255,120,160,0.4)';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.02, cy - s * 0.06);
            ctx.lineTo(cx + s * 0.04, cy - s * 0.01);
            ctx.lineTo(cx, cy + s * 0.04);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'gem_sapphire': {
            ctx.fillStyle = '#2244cc';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.1);
            ctx.lineTo(cx + s * 0.08, cy - s * 0.02);
            ctx.lineTo(cx + s * 0.05, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.05, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.08, cy - s * 0.02);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgba(100,160,255,0.4)';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.02, cy - s * 0.06);
            ctx.lineTo(cx + s * 0.04, cy - s * 0.01);
            ctx.lineTo(cx, cy + s * 0.04);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'amethyst_column': {
            const agrd = ctx.createLinearGradient(cx, cy - s * 0.25, cx, cy + s * 0.1);
            agrd.addColorStop(0, '#9a5acc');
            agrd.addColorStop(1, '#5a2a7a');
            ctx.fillStyle = agrd;
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.25);
            ctx.lineTo(cx + s * 0.05, cy - s * 0.15);
            ctx.lineTo(cx + s * 0.04, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.04, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.05, cy - s * 0.15);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = 'rgba(200,160,255,0.25)';
            ctx.beginPath();
            ctx.moveTo(cx + s * 0.01, cy - s * 0.2);
            ctx.lineTo(cx + s * 0.035, cy - s * 0.13);
            ctx.lineTo(cx + s * 0.02, cy + s * 0.05);
            ctx.lineTo(cx, cy + s * 0.06);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'crystal_floor': {
            ctx.fillStyle = `rgba(140,80,200,${0.15 + Math.sin(time / 1000 + cx + cy) * 0.08})`;
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.15, cy + s * 0.05);
            ctx.lineTo(cx - s * 0.05, cy - s * 0.05);
            ctx.lineTo(cx + s * 0.1, cy);
            ctx.lineTo(cx + s * 0.15, cy + s * 0.08);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'geode': {
            ctx.fillStyle = '#4a3a5a';
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.12, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#6a4a8a';
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.08, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#aa70dd';
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.04, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'glow_moss': {
            const gmA = 0.3 + Math.sin(time / 800 + cy) * 0.15;
            ctx.fillStyle = `rgba(80,200,100,${gmA})`;
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.12, s * 0.06, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(120,255,140,${gmA * 0.4})`;
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.16, s * 0.08, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        // ===== CORRUPTION =====
        case 'corruption_tower': {
            const tgrd2 = ctx.createLinearGradient(cx, cy - s * 0.3, cx, cy + s * 0.15);
            tgrd2.addColorStop(0, '#4a1868');
            tgrd2.addColorStop(1, '#1a0830');
            ctx.fillStyle = tgrd2;
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.06, cy + s * 0.15);
            ctx.lineTo(cx - s * 0.04, cy - s * 0.2);
            ctx.lineTo(cx, cy - s * 0.28);
            ctx.lineTo(cx + s * 0.04, cy - s * 0.2);
            ctx.lineTo(cx + s * 0.06, cy + s * 0.15);
            ctx.closePath();
            ctx.fill();
            // Pulsing eye
            const eyeGlow = Math.abs(Math.sin(time / 500));
            ctx.fillStyle = `rgba(200,0,60,${eyeGlow * 0.6})`;
            ctx.beginPath();
            ctx.arc(cx, cy - s * 0.15, s * 0.03, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'watcher_eye': {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.1, s * 0.06, 0, 0, Math.PI * 2);
            ctx.fill();
            const pupilX = cx + Math.sin(time / 600) * s * 0.025;
            ctx.fillStyle = '#cc0033';
            ctx.beginPath();
            ctx.arc(pupilX, cy, s * 0.04, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(pupilX, cy, s * 0.02, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'tendril_large': {
            ctx.strokeStyle = '#5a2080';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy + s * 0.15);
            ctx.bezierCurveTo(cx + s * 0.1, cy, cx - s * 0.08, cy - s * 0.1, cx + s * 0.05, cy - s * 0.22);
            ctx.stroke();
            ctx.strokeStyle = '#7a30a0';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx + s * 0.05, cy - s * 0.22);
            ctx.quadraticCurveTo(cx + s * 0.12, cy - s * 0.25, cx + s * 0.1, cy - s * 0.18);
            ctx.stroke();
            break;
        }
        case 'void_crystal': {
            const vcGrd = ctx.createLinearGradient(cx, cy - s * 0.2, cx, cy + s * 0.1);
            vcGrd.addColorStop(0, '#3a1060');
            vcGrd.addColorStop(1, '#0a0018');
            ctx.fillStyle = vcGrd;
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.22);
            ctx.lineTo(cx + s * 0.07, cy + s * 0.08);
            ctx.lineTo(cx - s * 0.07, cy + s * 0.08);
            ctx.closePath();
            ctx.fill();
            const vcA = 0.2 + Math.sin(time / 500 + cx) * 0.1;
            ctx.fillStyle = `rgba(120,40,200,${vcA})`;
            ctx.beginPath();
            ctx.arc(cx, cy - s * 0.05, s * 0.08, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'corruption_pile': {
            ctx.fillStyle = '#2a1040';
            ctx.beginPath();
            ctx.ellipse(cx, cy + s * 0.06, s * 0.15, s * 0.06, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#3a1858';
            ctx.beginPath();
            ctx.ellipse(cx + s * 0.03, cy + s * 0.04, s * 0.08, s * 0.03, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'shadow_pool': {
            const spA = 0.2 + Math.sin(time / 700 + cx + cy) * 0.1;
            ctx.fillStyle = `rgba(10,0,30,${spA})`;
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.12, s * 0.07, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(80,20,140,${spA * 0.3})`;
            ctx.beginPath();
            ctx.ellipse(cx, cy, s * 0.08, s * 0.04, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'spike腐败': {
            ctx.fillStyle = '#2a1048';
            ctx.beginPath();
            ctx.moveTo(cx, cy - s * 0.22);
            ctx.lineTo(cx + s * 0.05, cy + s * 0.1);
            ctx.lineTo(cx - s * 0.05, cy + s * 0.1);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#4a2070';
            ctx.beginPath();
            ctx.moveTo(cx + s * 0.01, cy - s * 0.15);
            ctx.lineTo(cx + s * 0.035, cy + s * 0.06);
            ctx.lineTo(cx - s * 0.01, cy + s * 0.05);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'whisper_orb': {
            const woA = 0.2 + Math.sin(time / 400 + cy) * 0.15;
            ctx.fillStyle = `rgba(100,40,180,${woA})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.07, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(180,100,255,${woA * 0.5})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.04, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        // ===== CELESTIAL =====
        case 'cloud_fluffy': {
            const cShift = Math.sin(time / 3000 + cx * 0.05) * s * 0.02;
            ctx.fillStyle = 'rgba(100,140,200,0.2)';
            ctx.beginPath();
            ctx.arc(cx + cShift, cy, s * 0.18, 0, Math.PI * 2);
            ctx.arc(cx + s * 0.12 + cShift, cy - s * 0.04, s * 0.12, 0, Math.PI * 2);
            ctx.arc(cx - s * 0.1 + cShift, cy + s * 0.02, s * 0.13, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(160,200,240,0.15)';
            ctx.beginPath();
            ctx.arc(cx + s * 0.05 + cShift, cy - s * 0.02, s * 0.1, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'cloud_wispy': {
            const wShift = Math.sin(time / 4000 + cy * 0.03) * s * 0.03;
            ctx.strokeStyle = 'rgba(120,160,220,0.15)';
            ctx.lineWidth = s * 0.04;
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.2 + wShift, cy);
            ctx.quadraticCurveTo(cx + wShift, cy - s * 0.08, cx + s * 0.2 + wShift, cy + s * 0.02);
            ctx.stroke();
            break;
        }
        case 'star_pillar': {
            const spGrd = ctx.createLinearGradient(cx, cy - s * 0.3, cx, cy + s * 0.15);
            spGrd.addColorStop(0, '#4080c0');
            spGrd.addColorStop(0.5, '#2a5080');
            spGrd.addColorStop(1, '#1a3050');
            ctx.fillStyle = spGrd;
            ctx.fillRect(cx - s * 0.04, cy - s * 0.25, s * 0.08, s * 0.4);
            // Star at top
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(cx, cy - s * 0.27, s * 0.025, 0, Math.PI * 2);
            ctx.fill();
            const stGlow = 0.2 + Math.sin(time / 600) * 0.1;
            ctx.fillStyle = `rgba(200,230,255,${stGlow})`;
            ctx.beginPath();
            ctx.arc(cx, cy - s * 0.27, s * 0.06, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'light_well': {
            const lwA = 0.15 + Math.sin(time / 500 + cx) * 0.1;
            ctx.fillStyle = `rgba(200,230,255,${lwA})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255,255,255,${lwA * 0.6})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.06, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'floating_rock': {
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.ellipse(cx + s * 0.02, cy + s * 0.15, s * 0.12, s * 0.04, 0, 0, Math.PI * 2);
            ctx.fill();
            const fY = cy + Math.sin(time / 800 + cx) * s * 0.02;
            ctx.fillStyle = '#3a5070';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.1, fY + s * 0.05);
            ctx.lineTo(cx - s * 0.05, fY - s * 0.08);
            ctx.lineTo(cx + s * 0.08, fY - s * 0.05);
            ctx.lineTo(cx + s * 0.1, fY + s * 0.05);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#4a6890';
            ctx.beginPath();
            ctx.moveTo(cx - s * 0.04, fY - s * 0.04);
            ctx.lineTo(cx + s * 0.02, fY - s * 0.07);
            ctx.lineTo(cx + s * 0.06, fY - s * 0.03);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case 'aurora_streak': {
            const au = time / 2000;
            for (let i = 0; i < 3; i++) {
                const aY = cy + (i - 1) * s * 0.05;
                ctx.strokeStyle = `hsla(${140 + i * 40 + Math.sin(au + i) * 20}, 60%, 55%, 0.12)`;
                ctx.lineWidth = s * 0.02;
                ctx.beginPath();
                ctx.moveTo(cx - s * 0.25, aY);
                ctx.quadraticCurveTo(cx, aY + Math.sin(au + i * 0.5) * s * 0.06, cx + s * 0.25, aY - s * 0.02);
                ctx.stroke();
            }
            break;
        }
        case 'moon_shard': {
            ctx.fillStyle = '#c0d8f0';
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0a1830';
            ctx.beginPath();
            ctx.arc(cx + s * 0.04, cy - s * 0.02, s * 0.08, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'celestial_bloom': {
            const cbA = 0.3 + Math.sin(time / 700 + cx + cy) * 0.15;
            ctx.strokeStyle = '#6090c0';
            ctx.lineWidth = 1;
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2 + time / 3000;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + Math.cos(a) * s * 0.1, cy + Math.sin(a) * s * 0.1);
                ctx.stroke();
            }
            ctx.fillStyle = `rgba(180,220,255,${cbA})`;
            ctx.beginPath();
            ctx.arc(cx, cy, s * 0.04, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
    }
    ctx.restore();
}

function updateAmbientParticles(dt) {
    if (!currentBiome || gameState !== 'playing') return;
    ambientTimer -= dt;
    if (ambientTimer <= 0) {
        ambientTimer = 0.4;
        const p = currentBiome.particles;
        for (let i = 0; i < Math.min(p.count, 5); i++) {
            ambientParticles.push({
                x: cameraX + (Math.random() - 0.5) * canvas.width * 1.4,
                y: cameraY - canvas.height * 0.7,
                vx: (Math.random() - 0.5) * 20,
                vy: 15 + Math.random() * 35,
                life: 3 + Math.random() * 4,
                size: 2 + Math.random() * 3,
                color: p.color,
                type: p.type,
            });
        }
    }
    for (let i = ambientParticles.length - 1; i >= 0; i--) {
        const p = ambientParticles[i];
        p.life -= dt;
        if (p.type === 'snow') p.vx += Math.sin(gameTime / 1000 + i) * dt * 8;
        if (p.type === 'ember') { p.vy -= 25 * dt; p.vx += Math.sin(gameTime / 500 + i) * dt * 3; }
        if (p.type === 'firefly') { p.vx += Math.sin(gameTime / 800 + i * 0.5) * dt * 12; p.vy += Math.cos(gameTime / 600 + i * 0.3) * dt * 8; }
        if (p.type === 'fog') { p.vx += Math.sin(gameTime / 2000 + i) * dt * 4; p.vy *= 0.99; }
        if (p.type === 'sand') { p.vx += Math.sin(gameTime / 300 + i) * dt * 5; }
        if (p.type === 'sparkle') { p.vx += Math.sin(gameTime / 700 + i) * dt * 6; p.vy += Math.cos(gameTime / 500 + i) * dt * 4; }
        if (p.type === 'dark_sparkle') { p.vx += Math.sin(gameTime / 600 + i) * dt * 5; p.vy += Math.cos(gameTime / 400 + i) * dt * 3; }
        if (p.type === 'star') { p.vx += Math.sin(gameTime / 900 + i) * dt * 3; p.vy += Math.cos(gameTime / 700 + i) * dt * 2; }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.life <= 0 || p.y > cameraY + canvas.height) ambientParticles.splice(i, 1);
    }
    if (ambientParticles.length > 200) ambientParticles.splice(0, ambientParticles.length - 200);
}

function drawAmbientParticles() {
    for (const p of ambientParticles) {
        const sx = p.x - cameraX + canvas.width / 2;
        const sy = p.y - cameraY + canvas.height / 2;
        if (sx < -20 || sx > canvas.width + 20 || sy < -20 || sy > canvas.height + 20) continue;
        ctx.globalAlpha = Math.min(1, p.life) * 0.7;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

// ============================================
// Tile helper functions
function seededRandom(x, y) {
    // Simple deterministic hash for consistent world generation
    const seed = x * 374761393 + y * 668265263;
    let n = seed;
    n = (n ^ (n >> 13)) * 1274126177;
    n = n ^ (n >> 16);
    return (n & 0x7fffffff) / 0x7fffffff;
}

function worldToTile(worldX, worldY) {
    return {
        x: Math.floor(worldX / SCALED_TILE),
        y: Math.floor(worldY / SCALED_TILE)
    };
}

function getTileAt(tileX, tileY) {
    const key = `${tileX},${tileY}`;

    // Return cached tile if exists
    if (tileMap.has(key)) {
        return tileMap.get(key);
    }

    // Generate tile procedurally
    const rand = seededRandom(tileX, tileY);
    let tileType = TILE_TYPES.GRASS;

    // Safe zone: no mountains within 3 tiles of origin
    const inSafeZone = Math.abs(tileX) <= 3 && Math.abs(tileY) <= 3;

    if (!inSafeZone && rand < 0.01) {
        // ~1% chance: start a vertical mountain formation (this is the base)
        // Check that we're not already part of another mountain
        const aboveKey1 = `${tileX},${tileY - 1}`;
        const aboveKey2 = `${tileX},${tileY - 2}`;
        if (!tileMap.has(aboveKey1) && !tileMap.has(aboveKey2)) {
            // Create a 3-tile vertical mountain formation
            tileMap.set(`${tileX},${tileY - 2}`, TILE_TYPES.MOUNTAIN_TOP);
            tileMap.set(`${tileX},${tileY - 1}`, TILE_TYPES.MOUNTAIN_MID);
            tileMap.set(key, TILE_TYPES.MOUNTAIN_BASE);
            return TILE_TYPES.MOUNTAIN_BASE;
        }
    } else if (!inSafeZone && rand < 0.02) {
        // ~1% chance: start a horizontal mountain formation (this is the right end)
        // Check that we're not already part of another mountain
        const leftKey1 = `${tileX - 1},${tileY}`;
        const leftKey2 = `${tileX - 2},${tileY}`;
        if (!tileMap.has(leftKey1) && !tileMap.has(leftKey2)) {
            // Create a 3-tile horizontal mountain formation
            tileMap.set(`${tileX - 2},${tileY}`, TILE_TYPES.MOUNTAIN_H_LEFT);
            tileMap.set(`${tileX - 1},${tileY}`, TILE_TYPES.MOUNTAIN_H_MID);
            tileMap.set(key, TILE_TYPES.MOUNTAIN_H_RIGHT);
            return TILE_TYPES.MOUNTAIN_H_RIGHT;
        }
    } else if (rand < 0.04) {
        // ~2% chance: decorated grass
        tileType = TILE_TYPES.GRASS_DECORATED;
    } else if (rand < 0.045) {
        // ~0.5% chance: decorative plant
        tileType = TILE_TYPES.PLANT;
    }

    tileMap.set(key, tileType);
    return tileType;
}

function isPositionBlocked(worldX, worldY) {
    const tile = worldToTile(worldX, worldY);
    if (currentBiome) {
        return getBiomeTileAt(tile.x, tile.y, currentBiome).blocking;
    }
    return getTileAt(tile.x, tile.y).blocking;
}

/// Performance: Viewport culling helper
function isInViewport(x, y, padding = SCALED_TILE) {
    return x >= cameraX - canvas.width/2 - padding &&
           x <= cameraX + canvas.width/2 + padding &&
           y >= cameraY - canvas.height/2 - padding &&
           y <= cameraY + canvas.height/2 + padding;
}

// Performance: Helper to remove enemy (maintains Set and uses swap-and-pop)
function removeEnemy(index) {
    const enemy = enemies[index];
    enemySet.delete(enemy);
    // Swap with last element and pop (O(1) instead of O(n) splice)
    enemies[index] = enemies[enemies.length - 1];
    enemies.pop();
}

// Drawing functions
function drawBackground() {
    const startX = Math.floor((cameraX - canvas.width / 2) / SCALED_TILE) * SCALED_TILE;
    const startY = Math.floor((cameraY - canvas.height / 2) / SCALED_TILE) * SCALED_TILE;

    if (currentBiome && currentBiome.id !== 'plains') {
        // Biome rendering with sprite sheets
        const biomeImg = images[`biome_${currentBiome.id}`];
        const terrainTypes = ['liquid', 'ground', 'main', 'rock', 'high'];
        const decoNames = BIOME_DECO_MAP[currentBiome.id] || [];

        for (let y = startY; y < cameraY + canvas.height / 2 + SCALED_TILE; y += SCALED_TILE) {
            for (let x = startX; x < cameraX + canvas.width / 2 + SCALED_TILE; x += SCALED_TILE) {
                const screenX = Math.round(x - cameraX + canvas.width / 2);
                const screenY = Math.round(y - cameraY + canvas.height / 2);
                const tile = worldToTile(x, y);
                const tileData = getBiomeTileAt(tile.x, tile.y, currentBiome);

                // Draw terrain tile from sprite sheet (row 0, column = terrain type index)
                if (biomeImg && biomeImg.complete && biomeImg.naturalWidth > 0) {
                    const terrainIdx = terrainTypes.indexOf(tileData.type);
                    const srcX = (terrainIdx >= 0 ? terrainIdx : 2) * 16;
                    ctx.drawImage(biomeImg, srcX, 0, 16, 16, screenX, screenY, SCALED_TILE, SCALED_TILE);
                } else {
                    // Fallback: flat color
                    ctx.fillStyle = tileData.color;
                    ctx.fillRect(screenX, screenY, SCALED_TILE, SCALED_TILE);
                }

                // Terrain variation with subtle noise
                const vp = perlinNoise(screenX * 0.06, screenY * 0.06, currentBiome.id.charCodeAt(0) * 7);
                const brightness = (vp - 0.5) * 0.1;
                if (brightness > 0) {
                    ctx.fillStyle = `rgba(255,255,255,${brightness})`;
                } else {
                    ctx.fillStyle = `rgba(0,0,0,${-brightness})`;
                }
                ctx.fillRect(screenX, screenY, SCALED_TILE, SCALED_TILE);

                // Edge blending between tile types
                const vp2 = perlinNoise((screenX + 1) * 0.06, screenY * 0.06, currentBiome.id.charCodeAt(0) * 7);
                if (Math.abs(vp - vp2) > 0.08) {
                    ctx.fillStyle = `rgba(0,0,0,0.04)`;
                    ctx.fillRect(screenX + SCALED_TILE - 1, screenY, 2, SCALED_TILE);
                }
                const vp3 = perlinNoise(screenX * 0.06, (screenY + 1) * 0.06, currentBiome.id.charCodeAt(0) * 7);
                if (Math.abs(vp - vp3) > 0.08) {
                    ctx.fillStyle = `rgba(0,0,0,0.04)`;
                    ctx.fillRect(screenX, screenY + SCALED_TILE - 1, SCALED_TILE, 2);
                }

                if (tileData.type === 'liquid') {
                    const wave = Math.sin(gameTime / 500 + tile.x * 0.5 + tile.y * 0.3) * 0.06;
                    const wave2 = Math.sin(gameTime / 800 + tile.x * 0.3 - tile.y * 0.5) * 0.04;
                    ctx.fillStyle = `rgba(255,255,255,${0.08 + wave + wave2})`;
                    ctx.fillRect(screenX, screenY, SCALED_TILE, SCALED_TILE);
                    // Ripple lines
                    if ((tile.x + tile.y) % 2 === 0) {
                        ctx.strokeStyle = `rgba(255,255,255,${0.1 + wave})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(screenX + 4, screenY + SCALED_TILE * 0.4);
                        ctx.quadraticCurveTo(screenX + SCALED_TILE * 0.5, screenY + SCALED_TILE * (0.3 + wave * 2), screenX + SCALED_TILE - 4, screenY + SCALED_TILE * 0.6);
                        ctx.stroke();
                    }
                }

                if (tileData.blocking && tileData.type === 'rock') {
                    ctx.fillStyle = 'rgba(255,255,255,0.08)';
                    ctx.fillRect(screenX + 2, screenY + 2, SCALED_TILE - 4, SCALED_TILE * 0.3);
                    ctx.fillStyle = 'rgba(0,0,0,0.15)';
                    ctx.fillRect(screenX + 2, screenY + SCALED_TILE * 0.7, SCALED_TILE - 4, SCALED_TILE * 0.28);
                } else if (tileData.blocking && tileData.type !== 'liquid') {
                    ctx.fillStyle = 'rgba(0,0,0,0.12)';
                    ctx.fillRect(screenX, screenY, SCALED_TILE, SCALED_TILE);
                }

                if (tileData.decoration) {
                    // Draw decoration from sprite sheet
                    if (biomeImg && biomeImg.complete && biomeImg.naturalWidth > 0) {
                        const decoIdx = decoNames.indexOf(tileData.decoration.type);
                        if (decoIdx >= 0) {
                            ctx.drawImage(biomeImg, 0, (decoIdx + 1) * 16, 16, 16, screenX, screenY, SCALED_TILE, SCALED_TILE);
                        } else {
                            drawDecoration(screenX, screenY, SCALED_TILE, tileData.decoration, frameTimestamp);
                        }
                    } else {
                        drawDecoration(screenX, screenY, SCALED_TILE, tileData.decoration, frameTimestamp);
                    }
                }
            }
        }
    } else {
        // Classic rendering (level 1)
        for (let y = startY; y < cameraY + canvas.height / 2 + SCALED_TILE; y += SCALED_TILE) {
            for (let x = startX; x < cameraX + canvas.width / 2 + SCALED_TILE; x += SCALED_TILE) {
                const screenX = Math.round(x - cameraX + canvas.width / 2);
                const screenY = Math.round(y - cameraY + canvas.height / 2);
                const tile = worldToTile(x, y);
                const tileType = getTileAt(tile.x, tile.y);

                ctx.drawImage(
                    images.ground,
                    TILE_TYPES.GRASS.col * TILE_SIZE, TILE_TYPES.GRASS.row * TILE_SIZE, TILE_SIZE, TILE_SIZE,
                    screenX, screenY, SCALED_TILE, SCALED_TILE
                );

                if (tileType.overlay) {
                    ctx.drawImage(
                        images.ground,
                        tileType.col * TILE_SIZE, tileType.row * TILE_SIZE, TILE_SIZE, TILE_SIZE,
                        screenX, screenY, SCALED_TILE, SCALED_TILE
                    );
                } else if (tileType.isPlant) {
                    const plantFrame = Math.floor(frameTimestamp / 200) % 4;
                    ctx.drawImage(
                        images.plant,
                        plantFrame * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE,
                        screenX + SCALED_TILE / 4, screenY, SCALED_TILE / 2, SCALED_TILE / 2
                    );
                } else if (tileType !== TILE_TYPES.GRASS) {
                    ctx.drawImage(
                        images.ground,
                        tileType.col * TILE_SIZE, tileType.row * TILE_SIZE, TILE_SIZE, TILE_SIZE,
                        screenX, screenY, SCALED_TILE, SCALED_TILE
                    );
                }
            }
        }
    }
}

function drawPlayer() {
    const screenX = player.x - cameraX + canvas.width / 2 - PLAYER_SCALED_SIZE / 2;
    const screenY = player.y - cameraY + canvas.height / 2 - PLAYER_SCALED_SIZE / 2;

    // Calculate sprite row based on direction and moving state
    // Idle: front=0, side=1, back=2
    // Walking: front=3, side=4, back=5
    const directionRow = { front: 0, side: 1, back: 2 };
    const baseRow = directionRow[player.direction] || 0;
    const frameY = player.moving ? baseRow + 3 : baseRow;
    const frameX = player.moving ? (player.frame % 6) : 0;

    ctx.save();

    // Flicker effect when damage invincibility is active
    if (damageInvincibilityTimer > 0) {
        // Alternate alpha based on time for flicker effect
        const flickerAlpha = Math.sin(frameTimestamp / 50) > 0 ? 1 : 0.3;
        ctx.globalAlpha = flickerAlpha;
    }

    // Only flip horizontally for side sprites when facing left
    if (player.direction === 'side' && !player.facingRight) {
        ctx.translate(screenX + PLAYER_SCALED_SIZE, screenY);
        ctx.scale(-1, 1);
        ctx.drawImage(
            images.player,
            frameX * PLAYER_TILE_SIZE, frameY * PLAYER_TILE_SIZE, PLAYER_TILE_SIZE, PLAYER_TILE_SIZE,
            0, 0, PLAYER_SCALED_SIZE, PLAYER_SCALED_SIZE
        );
    } else {
        ctx.drawImage(
            images.player,
            frameX * PLAYER_TILE_SIZE, frameY * PLAYER_TILE_SIZE, PLAYER_TILE_SIZE, PLAYER_TILE_SIZE,
            screenX, screenY, PLAYER_SCALED_SIZE, PLAYER_SCALED_SIZE
        );
    }
    ctx.restore();
}

function drawEnemies() {
    for (const enemy of enemies) {
        // Viewport culling - skip offscreen enemies
        if (!isInViewport(enemy.x, enemy.y)) continue;

        const screenX = enemy.x - cameraX + canvas.width / 2 - SCALED_TILE / 2;
        const screenY = enemy.y - cameraY + canvas.height / 2 - SCALED_TILE / 2;

        const frameX = 0;
        const frameY = enemy.frame;

        const monsterImage = images[`monster_${enemy.type}`];
        if (!monsterImage || !monsterImage.complete || monsterImage.naturalWidth === 0) continue;

        ctx.save();
        if (enemy.facingRight) {
            ctx.translate(screenX + SCALED_TILE, screenY);
            ctx.scale(-1, 1);
            ctx.drawImage(
                monsterImage,
                frameX * TILE_SIZE, frameY * TILE_SIZE, TILE_SIZE, TILE_SIZE,
                0, 0, SCALED_TILE, SCALED_TILE
            );
        } else {
            ctx.drawImage(
                monsterImage,
                frameX * TILE_SIZE, frameY * TILE_SIZE, TILE_SIZE, TILE_SIZE,
                screenX, screenY, SCALED_TILE, SCALED_TILE
            );
        }
        ctx.restore();

        // Draw health bar
        const healthBarWidth = SCALED_TILE * 0.8;
        const healthBarHeight = 4;
        const healthPercent = enemy.health / enemy.maxHealth;
        const barX = screenX + (SCALED_TILE - healthBarWidth) / 2;
        const barY = screenY - 8;

        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, healthBarWidth, healthBarHeight);
        ctx.fillStyle = healthPercent > 0.5 ? '#4a4' : healthPercent > 0.25 ? '#aa4' : '#a44';
        ctx.fillRect(barX, barY, healthBarWidth * healthPercent, healthBarHeight);

        // Draw status effect indicators
        if (enemy.statusEffects) {
            // Ice overlay for frozen enemies
            if (enemy.statusEffects.freeze) {
                const iceImage = images['Ice'];
                if (iceImage && iceImage.complete) {
                    ctx.drawImage(iceImage, screenX, screenY, SCALED_TILE, SCALED_TILE);
                }
            }

            // Animated flame for burning enemies
            if (enemy.statusEffects.burn) {
                const flameImage = images['Flame'];
                if (flameImage && flameImage.complete) {
                    const frameX = enemy.statusEffects.burn.frame * 32;
                    const flameSize = SCALED_TILE * 2;
                    const offset = (flameSize - SCALED_TILE) / 2;
                    ctx.drawImage(
                        flameImage,
                        frameX, 0, 32, 32,
                        screenX - offset, screenY - offset, flameSize, flameSize
                    );
                }
            }
        }
    }
}

function drawTrailSegment(trail, color, maxWidth) {
    if (trail.length < 2) return;

    const len = trail.length;

    // === PASS 1: Wide soft glow (additive) ===
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 1; i < len; i++) {
        const t = i / (len - 1); // 0 = oldest, 1 = newest
        const alpha = t * t * 0.15; // quadratic fade for soft glow
        const width = maxWidth * 2.5 * (0.1 + t * 0.9);

        const x0 = trail[i - 1].x - cameraX + canvas.width / 2;
        const y0 = trail[i - 1].y - cameraY + canvas.height / 2;
        const x1 = trail[i].x - cameraX + canvas.width / 2;
        const y1 = trail[i].y - cameraY + canvas.height / 2;

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
        ctx.lineWidth = width;
        ctx.stroke();
    }

    ctx.restore();

    // === PASS 2: Core bright line ===
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 1; i < len; i++) {
        const t = i / (len - 1);
        const alpha = t * t * 0.8;
        const width = maxWidth * (0.15 + t * 0.85);

        const x0 = trail[i - 1].x - cameraX + canvas.width / 2;
        const y0 = trail[i - 1].y - cameraY + canvas.height / 2;
        const x1 = trail[i].x - cameraX + canvas.width / 2;
        const y1 = trail[i].y - cameraY + canvas.height / 2;

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = `rgba(${Math.min(255, color.r + 80)}, ${Math.min(255, color.g + 80)}, ${Math.min(255, color.b + 80)}, ${alpha})`;
        ctx.lineWidth = width;
        ctx.stroke();
    }

    ctx.restore();

    // === PASS 3: Hot white center for newest segment ===
    if (len >= 2) {
        const x0 = trail[len - 2].x - cameraX + canvas.width / 2;
        const y0 = trail[len - 2].y - cameraY + canvas.height / 2;
        const x1 = trail[len - 1].x - cameraX + canvas.width / 2;
        const y1 = trail[len - 1].y - cameraY + canvas.height / 2;

        ctx.save();
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = `rgba(255, 255, 255, 0.9)`;
        ctx.lineWidth = maxWidth * 0.3;
        ctx.stroke();
        ctx.restore();
    }
}

function drawProjectileTrails() {
    // Draw all projectile trails
    for (const proj of projectiles) {
        if (!proj.trail || proj.trail.length < 2) continue;
        const color = TRAIL_COLORS[proj.weaponType] || TRAIL_COLORS.Arrow;
        drawTrailSegment(proj.trail, color, TRAIL_WIDTH_MAX);
    }
    for (const proj of orbitingProjectiles) {
        if (!proj.trail || proj.trail.length < 2) continue;
        const color = TRAIL_COLORS.Circlet;
        drawTrailSegment(proj.trail, color, TRAIL_WIDTH_MAX * 0.7);
    }
}

function drawProjectiles() {
    for (const proj of projectiles) {
        // Viewport culling - skip offscreen projectiles
        if (!isInViewport(proj.x, proj.y)) continue;

        const screenX = proj.x - cameraX + canvas.width / 2 - SCALED_TILE / 2;
        const screenY = proj.y - cameraY + canvas.height / 2 - SCALED_TILE / 2;

        const projImage = images[proj.weaponType];
        if (!projImage || !projImage.complete || projImage.naturalWidth === 0) continue;

        ctx.save();
        ctx.translate(screenX + SCALED_TILE / 2, screenY + SCALED_TILE / 2);
        // Arrow and Kunai sprites point bottom-left to top-right (-45°), add π/4 to correct
        // Shuriken uses spinAngle for continuous rotation during flight
        let rotation;
        if (proj.weaponType === 'Shuriken') {
            rotation = proj.spinAngle;
        } else if (proj.weaponType === 'Arrow' || proj.weaponType === 'Kunai') {
            rotation = proj.angle + Math.PI / 4;
        } else {
            rotation = proj.angle;
        }
        ctx.rotate(rotation);
        ctx.drawImage(
            projImage,
            -SCALED_TILE / 2, -SCALED_TILE / 2, SCALED_TILE, SCALED_TILE
        );
        ctx.restore();
    }

    // Draw orbiting projectiles
    for (const proj of orbitingProjectiles) {
        // Viewport culling - skip offscreen orbiting projectiles
        if (!isInViewport(proj.x, proj.y)) continue;

        const screenX = proj.x - cameraX + canvas.width / 2 - SCALED_TILE / 2;
        const screenY = proj.y - cameraY + canvas.height / 2 - SCALED_TILE / 2;

        const projImage = images[proj.weaponType];
        if (!projImage || !projImage.complete || projImage.naturalWidth === 0) continue;

        ctx.save();
        ctx.translate(screenX + SCALED_TILE / 2, screenY + SCALED_TILE / 2);

        // Circlets rotate based on their orbit angle
        if (proj.weaponType === 'Circlet') {
            ctx.rotate(proj.orbitAngle * 2);
        }

        ctx.drawImage(
            projImage,
            0, 0, TILE_SIZE, TILE_SIZE,
            -SCALED_TILE / 2, -SCALED_TILE / 2, SCALED_TILE, SCALED_TILE
        );
        ctx.restore();
    }
}

function drawExplosions() {
    const explosionImage = images['Explosion'];
    if (!explosionImage || !explosionImage.complete || explosionImage.naturalWidth === 0) return;

    const EXPLOSION_TILE_SIZE = 32; // 128x128 sprite sheet / 4x4 grid = 32px tiles

    for (const explosion of explosions) {
        // Viewport culling - skip offscreen explosions
        if (!isInViewport(explosion.x, explosion.y, explosion.radius)) continue;

        // Calculate frame position in 4x4 sprite sheet (row by row, top-left first)
        const frameX = explosion.frame % 4;
        const frameY = Math.floor(explosion.frame / 4);

        // Center explosion on its position, scale to match explosion radius
        const explosionSize = explosion.radius;
        const screenX = explosion.x - cameraX + canvas.width / 2 - explosionSize / 2;
        const screenY = explosion.y - cameraY + canvas.height / 2 - explosionSize / 2;

        ctx.drawImage(
            explosionImage,
            frameX * EXPLOSION_TILE_SIZE, frameY * EXPLOSION_TILE_SIZE, EXPLOSION_TILE_SIZE, EXPLOSION_TILE_SIZE,
            screenX, screenY, explosionSize, explosionSize
        );
    }
}

function drawBlood() {
    const bloodImage = images['Blood'];
    if (!bloodImage || !bloodImage.complete || bloodImage.naturalWidth === 0) return;

    const BLOOD_TILE_SIZE = 32; // 128x128 sprite sheet / 4x4 grid = 32px tiles
    const bloodSize = SCALED_TILE*2;

    for (const blood of bloodSplatters) {
        // Viewport culling - skip offscreen blood
        if (!isInViewport(blood.x, blood.y, bloodSize)) continue;

        // Calculate frame position in 4x4 sprite sheet (row by row, top-left first)
        const frameX = blood.frame % 4;
        const frameY = Math.floor(blood.frame / 4);

        const screenX = blood.x - cameraX + canvas.width / 2 - bloodSize / 2;
        const screenY = blood.y - cameraY + canvas.height / 2 - bloodSize / 2;

        ctx.drawImage(
            bloodImage,
            frameX * BLOOD_TILE_SIZE, frameY * BLOOD_TILE_SIZE, BLOOD_TILE_SIZE, BLOOD_TILE_SIZE,
            screenX, screenY, bloodSize, bloodSize
        );
    }
}

function drawPointsStatusBar() {
    const maxBarWidth = Math.min(550, canvas.width * 0.65);
    const barWidth = Math.max(200, Math.min(maxBarWidth, canvas.width - 40));
    const barHeight = 38;
    const barX = (canvas.width - barWidth) / 2;
    const barY = 8;

    // Calculate progress toward next threshold
    let progress = 1;
    let displayText = `${Math.floor(score)}`;

    if (nextUpgradeIndex < UPGRADE_THRESHOLDS.length) {
        const nextThreshold = UPGRADE_THRESHOLDS[nextUpgradeIndex];
        const prevThreshold = nextUpgradeIndex > 0 ? UPGRADE_THRESHOLDS[nextUpgradeIndex - 1] : 0;
        const range = nextThreshold - prevThreshold;
        progress = range > 0 ? (score - prevThreshold) / range : 1;
        progress = Math.max(0, Math.min(1, progress));
        displayText = `${Math.floor(score)} / ${nextThreshold}`;
    }

    // Draw background with rounded corners
    ctx.fillStyle = 'rgba(30, 30, 30, 0.85)';
    roundRect(barX, barY, barWidth, barHeight, 6);
    ctx.fill();

    // Draw progress fill
    ctx.fillStyle = '#c44a4a';
    ctx.save();
    ctx.beginPath();
    roundRect(barX, barY, barWidth, barHeight, 6);
    ctx.clip();
    ctx.fillRect(barX, barY, barWidth * progress, barHeight);
    ctx.restore();

    // Draw border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    roundRect(barX, barY, barWidth, barHeight, 6);
    ctx.stroke();

    // Draw text centered in bar
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayText, barX + barWidth / 2, barY + barHeight / 2);
}

function drawWeaponList() {
    const iconSize = 48;
    const spacing = 8;
    const startX = 10;
    let startY = 50;

    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    for (const weapon of playerWeapons) {
        // Draw weapon icon (scaled from 16x16 to 48x48)
        const weaponImage = images[weapon.type];
        if (weaponImage && weaponImage.complete) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(weaponImage, startX, startY, iconSize, iconSize);
        }

        // Draw level text to the right of icon
        ctx.fillStyle = 'white';
        ctx.fillText(`Lv.${weapon.level + 1}`, startX + iconSize + spacing, startY + iconSize / 2);

        startY += iconSize + spacing;
    }

    // Draw owned scrolls below weapons
    for (const scroll of playerScrolls) {
        const scrollImage = images[scroll.type];
        if (scrollImage && scrollImage.complete) {
            ctx.imageSmoothingEnabled = false;

            // Check if scroll should be highlighted (just triggered)
            if (scroll.highlightUntil && gameTime < scroll.highlightUntil) {
                // Pulsing glow effect
                const progress = (scroll.highlightUntil - gameTime) / 400;
                const pulseIntensity = 0.5 + 0.5 * Math.sin(progress * Math.PI * 4);

                // Draw glow behind the icon
                ctx.save();
                ctx.shadowColor = scroll.type === 'ScrollThunder' ? '#ffff00' :
                                  scroll.type === 'ScrollFire' ? '#ff6600' : '#00ffff';
                ctx.shadowBlur = 15 * pulseIntensity;
                ctx.globalAlpha = 0.8 + 0.2 * pulseIntensity;
                ctx.drawImage(scrollImage, startX, startY, iconSize, iconSize);
                ctx.restore();
            } else {
                ctx.drawImage(scrollImage, startX, startY, iconSize, iconSize);
            }

            // Draw cooldown overlay masked to icon shape
            const elapsed = gameTime - (scroll.cooldownStartTime || 0);
            const duration = scroll.cooldownDuration || 1;
            const cooldownProgress = Math.min(1.0, elapsed / duration);
            drawScrollCooldown(startX, startY, iconSize, cooldownProgress, scrollImage);
        }

        startY += iconSize + spacing;
    }
}

function drawScrollCooldown(x, y, iconSize, progress, image) {
    if (progress >= 1.0) return;

    const radius = iconSize / 2;

    // Lazy-initialize and reuse offscreen canvas
    if (!cooldownCanvas || cooldownCanvas.width !== iconSize) {
        cooldownCanvas = document.createElement('canvas');
        cooldownCanvas.width = iconSize;
        cooldownCanvas.height = iconSize;
        cooldownCtx = cooldownCanvas.getContext('2d');
        cooldownCtx.imageSmoothingEnabled = false;
    }

    // Clear and reuse the canvas
    cooldownCtx.globalCompositeOperation = 'source-over';
    cooldownCtx.clearRect(0, 0, iconSize, iconSize);

    // Draw the icon as the mask
    cooldownCtx.drawImage(image, 0, 0, iconSize, iconSize);

    // Draw radial sweep using source-atop to mask to icon shape
    cooldownCtx.globalCompositeOperation = 'source-atop';
    cooldownCtx.beginPath();
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (1 - progress) * Math.PI * 2;
    cooldownCtx.moveTo(iconSize / 2, iconSize / 2);
    cooldownCtx.arc(iconSize / 2, iconSize / 2, radius, startAngle, endAngle, false);
    cooldownCtx.closePath();
    cooldownCtx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    cooldownCtx.fill();

    // Draw the masked result onto main canvas
    ctx.drawImage(cooldownCanvas, x, y);
}

function drawJoystick() {
    if (!isMobile || gameState !== 'playing') return;

    // Draw joystick base (semi-transparent circle)
    if (joystick.active) {
        // Active joystick - draw at touch position
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(joystick.baseX, joystick.baseY, JOYSTICK_BASE_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#666';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw joystick knob
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = '#888';
        ctx.beginPath();
        ctx.arc(joystick.knobX, joystick.knobY, JOYSTICK_KNOB_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.globalAlpha = 1.0;
    } else {
        // Inactive - show hint indicator in bottom right
        const hintX = canvas.width - 80;
        const hintY = canvas.height - 100;

        ctx.globalAlpha = 0.25;
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(hintX, hintY, JOYSTICK_BASE_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Small knob in center
        ctx.fillStyle = '#555';
        ctx.beginPath();
        ctx.arc(hintX, hintY, JOYSTICK_KNOB_RADIUS * 0.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1.0;
    }
}

function drawLivesUI() {
    if (gameState !== 'playing') return;

    const heartSize = 64;
    const spacing = 0;
    const statusBarY = 8;
    const statusBarHeight = 38;
    const startY = statusBarY + statusBarHeight + 8;
    const totalWidth = MAX_LIVES * heartSize + (MAX_LIVES - 1) * spacing;
    const startX = (canvas.width - totalWidth) / 2; // Centered

    for (let i = 0; i < MAX_LIVES; i++) {
        const x = startX + i * (heartSize + spacing);
        const isFilled = i < playerLives;
        const heartImage = isFilled ? images.Heart_full : images.Heart_empty;

        if (heartImage && heartImage.complete && heartImage.naturalWidth > 0) {
            ctx.drawImage(heartImage, x, startY, heartSize, heartSize);
        }
    }
}

function drawPauseButton() {
    if (gameState !== 'playing') return;

    const size = Math.max(MIN_TOUCH_TARGET, Math.min(44, canvas.width * 0.06));
    const x = canvas.width - size - SAFE_RIGHT;
    const y = SAFE_TOP;

    // Draw button background
    ctx.fillStyle = 'rgba(50, 50, 50, 0.7)';
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, size, size);

    // Draw pause icon (two vertical bars)
    ctx.fillStyle = 'white';
    const barWidth = 6;
    const barHeight = 20;
    const barY = y + (size - barHeight) / 2;
    ctx.fillRect(x + size/2 - barWidth - 3, barY, barWidth, barHeight);
    ctx.fillRect(x + size/2 + 3, barY, barWidth, barHeight);
}

function getPauseButtonBounds() {
    const size = Math.max(MIN_TOUCH_TARGET, Math.min(44, canvas.width * 0.06));
    return {
        x: canvas.width - size - SAFE_RIGHT,
        y: SAFE_TOP,
        width: size,
        height: size
    };
}

let soundMuted = false;

function toggleSound() {
    soundMuted = !soundMuted;
    if (masterGain) {
        masterGain.gain.value = soundMuted ? 0 : 0.5;
    }
}

function getSoundButtonBounds() {
    const size = Math.max(MIN_TOUCH_TARGET, Math.min(44, canvas.width * 0.06));
    const isPortrait = window.innerWidth < window.innerHeight;

    if (isPortrait) {
        // Portrait: bottom-left corner, inside safe zone
        return {
            x: SAFE_LEFT,
            y: canvas.height - SAFE_BOTTOM - size,
            width: size,
            height: size
        };
    } else {
        // Landscape: next to pause button (top-right)
        const pauseBounds = getPauseButtonBounds();
        return {
            x: pauseBounds.x - size - SAFE_RIGHT,
            y: SAFE_TOP,
            width: size,
            height: size
        };
    }
}

function drawSoundButton() {
    if (gameState !== 'playing') return;

    const bounds = getSoundButtonBounds();
    const { x, y, width: size } = bounds;

    ctx.fillStyle = 'rgba(50, 50, 50, 0.7)';
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, size, size);

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    if (soundMuted) {
        // Speaker icon with X
        const cx = x + size / 2;
        const cy = y + size / 2;
        // Speaker body
        ctx.beginPath();
        ctx.moveTo(cx - 6, cy - 4);
        ctx.lineTo(cx - 2, cy - 4);
        ctx.lineTo(cx + 3, cy - 8);
        ctx.lineTo(cx + 3, cy + 8);
        ctx.lineTo(cx - 2, cy + 4);
        ctx.lineTo(cx - 6, cy + 4);
        ctx.closePath();
        ctx.fill();
        // X mark
        ctx.beginPath();
        ctx.moveTo(cx + 6, cy - 5);
        ctx.lineTo(cx + 12, cy + 5);
        ctx.moveTo(cx + 12, cy - 5);
        ctx.lineTo(cx + 6, cy + 5);
        ctx.stroke();
    } else {
        // Speaker icon with waves
        const cx = x + size / 2;
        const cy = y + size / 2;
        // Speaker body
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy - 4);
        ctx.lineTo(cx - 4, cy - 4);
        ctx.lineTo(cx + 2, cy - 8);
        ctx.lineTo(cx + 2, cy + 8);
        ctx.lineTo(cx - 4, cy + 4);
        ctx.lineTo(cx - 8, cy + 4);
        ctx.closePath();
        ctx.fill();
        // Sound waves
        ctx.beginPath();
        ctx.arc(cx + 4, cy, 5, -0.6, 0.6);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 4, cy, 9, -0.6, 0.6);
        ctx.stroke();
    }
}

function drawBiomeName() {
    if (biomeNameTimer <= 0 || !currentBiome) return;
    const alpha = Math.min(1, biomeNameTimer);
    const fontSize = Math.min(28, canvas.width * 0.035);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `bold ${fontSize}px "Press Start 2P", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.fillText(biomeNameText, canvas.width / 2 + 2, canvas.height * 0.3 + 2);
    ctx.fillStyle = currentBiome.palette.accent || '#ffffff';
    ctx.fillText(biomeNameText, canvas.width / 2, canvas.height * 0.3);
    ctx.restore();
}

function drawLevelHUD() {
    if (!levelData) return;

    // === Responsive sizing (enlarged) ===
    const objFontSize = Math.min(18, canvas.width * 0.024);
    const modFontSize = Math.min(13, canvas.width * 0.017);
    const pad = Math.min(16, canvas.width * 0.02);
    const badgePadX = Math.min(18, canvas.width * 0.022);
    const badgePadY = Math.min(10, canvas.height * 0.012);
    const br = Math.min(6, canvas.width * 0.008);

    // === LVL + OBJECTIVE — bottom-center ===
    const lvlText = `LVL ${currentLevel}`;
    const objText = getObjectiveText();
    const comboText = `${lvlText}  ${objText}`;
    ctx.font = `bold ${objFontSize}px "Press Start 2P", monospace`;
    const comboW = ctx.measureText(comboText).width;
    const comboY = canvas.height - SAFE_BOTTOM - objFontSize - badgePadY * 2 - pad;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    roundRect((canvas.width - comboW) / 2 - badgePadX, comboY - badgePadY, comboW + badgePadX * 2, objFontSize + badgePadY * 2, br);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    roundRect((canvas.width - comboW) / 2 - badgePadX, comboY - badgePadY, comboW + badgePadX * 2, objFontSize + badgePadY * 2, br);
    ctx.stroke();
    ctx.fillStyle = '#ffcc00';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(lvlText, (canvas.width - comboW) / 2, comboY);
    const lvlW = ctx.measureText(lvlText).width;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(objText, (canvas.width - comboW) / 2 + lvlW + badgePadX * 2, comboY);

    // === MODIFIERS (if any) ===
    if (levelData.modifiers.length > 0) {
        const modLabels = {
            fast_enemies: 'FAST',
            tank_enemies: 'TANK',
            swarm: 'SWARM',
            elite_only: 'ELITE'
        };
        const modTexts = levelData.modifiers.map(m => modLabels[m] || m).join('  ');
        ctx.font = `bold ${modFontSize}px "Press Start 2P", monospace`;
        const modW = ctx.measureText(modTexts).width;
        const modX = (canvas.width - modW) / 2;
        const modY = comboY - modFontSize - badgePadY * 2;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        roundRect(modX - badgePadX, modY - badgePadY, modW + badgePadX * 2, modFontSize + badgePadY * 2, br);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 100, 50, 0.4)';
        ctx.lineWidth = 1;
        roundRect(modX - badgePadX, modY - badgePadY, modW + badgePadX * 2, modFontSize + badgePadY * 2, br);
        ctx.stroke();
        ctx.fillStyle = '#ff6633';
        ctx.fillText(modTexts, modX, modY);
    }
}

function drawLevelOverlay() {
    if (!levelComplete && !levelFailed) return;

    const bigFont = Math.min(36, canvas.width * 0.045);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${bigFont}px "Press Start 2P", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (levelComplete) {
        ctx.fillStyle = '#00ff66';
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur = 20;
        ctx.fillText('LEVEL COMPLETE!', canvas.width / 2, canvas.height / 2 - bigFont);

        ctx.font = `bold ${bigFont * 1.2}px "Press Start 2P", monospace`;
        const starText = '★'.repeat(levelStarsEarned) + '☆'.repeat(3 - levelStarsEarned);
        ctx.fillStyle = '#ffcc00';
        ctx.shadowColor = '#ffcc00';
        ctx.fillText(starText, canvas.width / 2, canvas.height / 2);
    } else {
        ctx.fillStyle = '#ff4444';
        ctx.shadowColor = '#ff4444';
        ctx.shadowBlur = 20;
        ctx.fillText('FAILED', canvas.width / 2, canvas.height / 2);
    }
    ctx.shadowBlur = 0;
}

function getObjectiveText() {
    if (!levelData) return '';
    const obj = levelData.objective;
    switch (obj.type) {
        case 'kill_count': return `Kill ${objectiveProgress}/${obj.target}`;
        case 'kill_specific': {
            const name = obj.specificType || 'Enemy';
            return `Kill ${objectiveProgress}/${obj.target} ${name}`;
        }
        case 'survive_time': return `Survive ${objectiveProgress}/${obj.target}s`;
        case 'survive_no_damage': return `No hit ${objectiveProgress}/${obj.target}s`;
        case 'reach_score': return `Score ${objectiveProgress}/${obj.target} pts`;
        case 'combo_kill': return `Combo ${objectiveProgress}/${obj.target}x`;
        case 'boss_kill': return `Defeat the boss`;
        default: return '';
    }
}

function roundRect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function drawUI() {
    drawLevelHUD();
    drawPointsStatusBar();
    drawWeaponList();
    drawJoystick();
    drawSoundButton();
    drawPauseButton();
    drawLivesUI();
}

function getGameOverButtonBounds() {
    const btnWidth = 200;
    const btnHeight = 50;
    const gap = 15;

    const result = {};
    let y = canvas.height / 2 - 30;

    result.restart = { x: (canvas.width - btnWidth) / 2, y, width: btnWidth, height: btnHeight };
    y += btnHeight + gap;

    if (showReviveButton) {
        result.revive = { x: (canvas.width - btnWidth) / 2, y, width: btnWidth, height: btnHeight };
        y += btnHeight + gap;
    }

    const deaths = levelDeaths[currentLevel] || 0;
    if (deaths >= 3) {
        result.skip = { x: (canvas.width - btnWidth) / 2, y, width: btnWidth, height: btnHeight };
    }

    return result;
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = '32px "Press Start 2P", monospace';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 120);

    ctx.font = '16px "Press Start 2P", monospace';
    ctx.fillText(`Final Score: ${Math.floor(score)}`, canvas.width / 2, canvas.height / 2 - 70);

    ctx.font = '12px "Press Start 2P", monospace';
    ctx.fillStyle = '#ffcc00';
    ctx.fillText(`Best: ${Math.floor(highScore)}`, canvas.width / 2, canvas.height / 2 - 45);

    ctx.fillStyle = '#88aaff';
    ctx.fillText(`Level reached: ${currentLevel}`, canvas.width / 2, canvas.height / 2 - 25);

    const buttons = getGameOverButtonBounds();

    // Restart button
    ctx.fillStyle = '#4a7a4a';
    ctx.fillRect(buttons.restart.x, buttons.restart.y, buttons.restart.width, buttons.restart.height);
    ctx.strokeStyle = '#6aca6a';
    ctx.lineWidth = 3;
    ctx.strokeRect(buttons.restart.x, buttons.restart.y, buttons.restart.width, buttons.restart.height);

    ctx.fillStyle = 'white';
    ctx.font = '14px "Press Start 2P", monospace';
    ctx.fillText('RESTART', canvas.width / 2, buttons.restart.y + buttons.restart.height / 2);

    if (buttons.revive) {
        ctx.fillStyle = '#8a5a2a';
        ctx.fillRect(buttons.revive.x, buttons.revive.y, buttons.revive.width, buttons.revive.height);
        ctx.strokeStyle = '#cc8844';
        ctx.lineWidth = 3;
        ctx.strokeRect(buttons.revive.x, buttons.revive.y, buttons.revive.width, buttons.revive.height);

        ctx.fillStyle = 'white';
        ctx.font = '12px "Press Start 2P", monospace';
        ctx.fillText('REVIVE', canvas.width / 2, buttons.revive.y + buttons.revive.height / 2 - 4);

        ctx.fillStyle = '#ffcc88';
        ctx.font = '9px "Press Start 2P", monospace';
        ctx.fillText('\u25B6 WATCH AD', canvas.width / 2, buttons.revive.y + buttons.revive.height / 2 + 14);
    }

    if (buttons.skip) {
        ctx.fillStyle = '#3a5a8a';
        ctx.fillRect(buttons.skip.x, buttons.skip.y, buttons.skip.width, buttons.skip.height);
        ctx.strokeStyle = '#5a8acc';
        ctx.lineWidth = 3;
        ctx.strokeRect(buttons.skip.x, buttons.skip.y, buttons.skip.width, buttons.skip.height);

        ctx.fillStyle = 'white';
        ctx.font = '12px "Press Start 2P", monospace';
        ctx.fillText('SKIP LEVEL', canvas.width / 2, buttons.skip.y + buttons.skip.height / 2 - 4);

        ctx.fillStyle = '#aaccff';
        ctx.font = '9px "Press Start 2P", monospace';
        ctx.fillText('\u25B6 WATCH AD', canvas.width / 2, buttons.skip.y + buttons.skip.height / 2 + 14);
    }
}

function getPauseMenuButtonBounds() {
    const resumeWidth = 200;
    const resumeHeight = 50;

    const resumeY = canvas.height / 2 - 80;

    return {
        resume: {
            x: (canvas.width - resumeWidth) / 2,
            y: resumeY,
            width: resumeWidth,
            height: resumeHeight
        }
    };
}

function drawPauseMenu() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = '32px "Press Start 2P", monospace';
    ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2 - 160);

    ctx.font = '12px "Press Start 2P", monospace';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${Math.floor(score)}`, canvas.width / 2, canvas.height / 2 - 120);
    ctx.fillStyle = '#ffcc00';
    ctx.fillText(`Best: ${Math.floor(highScore)}`, canvas.width / 2, canvas.height / 2 - 100);

    const buttons = getPauseMenuButtonBounds();

    // Resume button
    ctx.fillStyle = '#4a7a4a';
    ctx.fillRect(buttons.resume.x, buttons.resume.y, buttons.resume.width, buttons.resume.height);
    ctx.strokeStyle = '#6aca6a';
    ctx.lineWidth = 3;
    ctx.strokeRect(buttons.resume.x, buttons.resume.y, buttons.resume.width, buttons.resume.height);

    ctx.fillStyle = 'white';
    ctx.font = '14px "Press Start 2P", monospace';
    ctx.fillText('RESUME', canvas.width / 2, buttons.resume.y + buttons.resume.height / 2);
}

function drawReadyOverlay() {
    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pulsing "GET READY" text
    const pulse = 0.9 + Math.sin(frameTimestamp / 80) * 0.1;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(pulse, pulse);

    ctx.fillStyle = '#ffcc00';
    ctx.font = '24px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GET READY!', 0, 0);

    ctx.restore();
}

function formatStatChanges(weaponData, currentLevel, nextLevel) {
    const current = weaponData.levels[currentLevel];
    const next = weaponData.levels[nextLevel];
    const changes = [];

    if (current.damage !== next.damage) {
        changes.push(`${current.damage}->${next.damage} dmg`);
    }
    if (current.cooldown !== undefined && next.cooldown !== undefined && current.cooldown !== next.cooldown) {
        changes.push(`${current.cooldown}s->${next.cooldown}s`);
    }
    if (current.projectiles !== undefined && next.projectiles !== undefined && current.projectiles !== next.projectiles) {
        const diff = next.projectiles - current.projectiles;
        changes.push(`+${diff} proj`);
    }

    return changes;
}

function formatNewWeaponStats(weaponData) {
    const level = weaponData.levels[0];
    const stats = [];

    stats.push(`${level.damage} dmg`);
    if (level.cooldown !== undefined) {
        stats.push(`${level.cooldown}s`);
    }
    if (level.projectiles !== undefined) {
        stats.push(`${level.projectiles} proj`);
    }

    return stats;
}

function drawUpgradeMenu() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('UPGRADE!', canvas.width / 2, 80);

    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText(`Score: ${Math.floor(score)}`, canvas.width / 2, 110);

    const buttonWidth = 280;
    const buttonHeight = 80;
    const buttonSpacing = 15;
    const iconSize = 50;
    const iconPadding = 10;
    const totalHeight = upgradeOptions.length * (buttonHeight + buttonSpacing) - buttonSpacing;
    const startY = (canvas.height - totalHeight) / 2 + 20;

    for (let i = 0; i < upgradeOptions.length; i++) {
        const option = upgradeOptions[i];
        const buttonX = (canvas.width - buttonWidth) / 2;
        const buttonY = startY + i * (buttonHeight + buttonSpacing);

        const isSelected = i === selectedUpgradeIndex;

        // Button background and border - different colors for new vs upgrade vs scroll
        if (option.isScroll) {
            ctx.fillStyle = isSelected ? '#6a3a7a' : '#4a2a5a';  // Purple tint for scrolls
            ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
            ctx.strokeStyle = isSelected ? '#fff' : '#9a4aca';
            ctx.lineWidth = isSelected ? 4 : 3;
            ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
        } else if (option.isNew) {
            ctx.fillStyle = isSelected ? '#3a7a5a' : '#2a5a4a';  // Green tint for new weapons
            ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
            ctx.strokeStyle = isSelected ? '#fff' : '#4aca8a';
            ctx.lineWidth = isSelected ? 4 : 3;
            ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
        } else {
            ctx.fillStyle = isSelected ? '#3a5a8a' : '#2a4a6a';  // Blue tint for upgrades
            ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
            ctx.strokeStyle = isSelected ? '#fff' : '#4a8aca';
            ctx.lineWidth = isSelected ? 4 : 2;
            ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
        }

        // Draw weapon icon (scrolls have custom layout)
        const weaponImage = images[option.type];
        if (weaponImage && weaponImage.complete && weaponImage.naturalWidth > 0) {
            if (option.isScroll) {
                // Scroll layout: icon at top-left, name below icon
                const scrollIconSize = 40;
                const iconX = buttonX + iconPadding;
                const iconY = buttonY + 8;
                ctx.drawImage(weaponImage, iconX, iconY, scrollIconSize, scrollIconSize);

                // Name below icon
                ctx.textAlign = 'center';
                ctx.fillStyle = 'white';
                ctx.font = '8px "Press Start 2P", monospace';
                const displayName = option.type.replace('Scroll', '');
                ctx.fillText(displayName, iconX + scrollIconSize / 2, buttonY + 68);
            } else {
                const iconX = buttonX + iconPadding;
                const iconY = buttonY + (buttonHeight - iconSize) / 2;
                ctx.drawImage(weaponImage, iconX, iconY, iconSize, iconSize);
            }
        }

        // Text area starts after icon
        const textX = buttonX + iconPadding + iconSize + 15;
        const textWidth = buttonWidth - iconSize - iconPadding - 25;
        const textCenterX = textX + textWidth / 2;

        ctx.textAlign = 'center';
        const weaponData = weaponsData.find(w => w.type === option.type);

        if (option.isScroll) {
            const config = SCROLL_CONFIG[option.type];

            // Description (2 lines) to the right of icon
            ctx.fillStyle = '#c8f';
            ctx.font = '8px "Press Start 2P", monospace';
            ctx.fillText(config.desc[0], textCenterX, buttonY + 22);
            ctx.fillText(config.desc[1], textCenterX, buttonY + 38);

            // Cooldown time
            ctx.fillStyle = '#aaa';
            const minSec = Math.round(config.minInterval / 1000);
            const maxSec = Math.round(config.maxInterval / 1000);
            ctx.fillText(`${minSec}-${maxSec}s cooldown`, textCenterX, buttonY + 58);
        } else if (option.isNew) {
            // NEW badge
            ctx.fillStyle = '#4aca8a';
            ctx.font = '8px "Press Start 2P", monospace';
            ctx.fillText('NEW!', textCenterX, buttonY + 18);

            // Title
            ctx.fillStyle = 'white';
            ctx.font = '10px "Press Start 2P", monospace';
            ctx.fillText(option.type, textCenterX, buttonY + 38);

            // Stats
            ctx.font = '8px "Press Start 2P", monospace';
            ctx.fillStyle = '#8f8';
            if (weaponData) {
                const stats = formatNewWeaponStats(weaponData);
                ctx.fillText(stats.join(' '), textCenterX, buttonY + 58);
            }
        } else {
            // Title with level
            ctx.fillStyle = 'white';
            ctx.font = '10px "Press Start 2P", monospace';
            ctx.fillText(option.type, textCenterX, buttonY + 22);

            ctx.font = '8px "Press Start 2P", monospace';
            ctx.fillStyle = '#aaa';
            ctx.fillText(`Lv${option.currentLevel + 1} -> Lv${option.currentLevel + 2}`, textCenterX, buttonY + 40);

            // Stat changes
            ctx.fillStyle = '#8f8';
            if (weaponData) {
                const changes = formatStatChanges(weaponData, option.currentLevel, option.currentLevel + 1);
                if (changes.length > 0) {
                    ctx.fillText(changes.join(' '), textCenterX, buttonY + 58);
                }
            }
        }
    }
}

// Gamepad functions
function pollGamepad() {
    if (!gamepad.connected || gamepad.index === null) return;

    const gamepads = navigator.getGamepads();
    const gp = gamepads[gamepad.index];
    if (!gp) return;

    // Apply dead zone and normalize analog stick values
    function applyDeadZone(value) {
        if (Math.abs(value) < gamepad.deadZone) return 0;
        // Remap to 0-1 range after dead zone
        const sign = value > 0 ? 1 : -1;
        return sign * (Math.abs(value) - gamepad.deadZone) / (1 - gamepad.deadZone);
    }

    // Left stick (axes 0 and 1)
    gamepad.leftStick.x = applyDeadZone(gp.axes[0] || 0);
    gamepad.leftStick.y = applyDeadZone(gp.axes[1] || 0);

    // Start button state (button 9 on standard gamepad)
    gamepad.buttons.prevStart = gamepad.buttons.start;
    gamepad.buttons.start = gp.buttons[9] ? gp.buttons[9].pressed : false;
}

function handleGamepadButtons() {
    if (!gamepad.connected) return;

    // Start button: Toggle pause (edge-triggered)
    if (gamepad.buttons.start && !gamepad.buttons.prevStart) {
        if (gameState === 'playing' && readyTimer <= 0) {
            stopMusic();
            gameState = 'paused';
        } else if (gameState === 'paused') {
            readyTimer = POST_UPGRADE_DELAY;
            startMusic();
            gameState = 'playing';
        }
    }
}

// Update functions
function updatePlayer(dt) {
    let moveX = 0;
    let moveY = 0;
    let isMoving = false;

    // Calculate desired movement (with speed boost if active)
    let speedMultiplier = speedBoostTimer > 0 ? SPEED_BOOST_MULTIPLIER : 1;

    // Terrain slow effect
    if (currentBiome) {
        const pTile = worldToTile(player.x, player.y);
        const pTileData = getBiomeTileAt(pTile.x, pTile.y, currentBiome);
        if (pTileData.slow) speedMultiplier *= pTileData.slow;
    }

    // Gamepad: Use left analog stick (highest priority)
    if (gamepad.connected && (gamepad.leftStick.x !== 0 || gamepad.leftStick.y !== 0)) {
        moveX = gamepad.leftStick.x * PLAYER_SPEED * speedMultiplier * dt;
        moveY = gamepad.leftStick.y * PLAYER_SPEED * speedMultiplier * dt;
        isMoving = true;

        // Update facing direction based on gamepad
        if (gamepad.leftStick.x !== 0) {
            player.facingRight = gamepad.leftStick.x > 0;
        }
        player.moving = false; // Cancel click-to-move
    }
    // Keyboard: Use arrow keys / WASD (second priority)
    else if (keyboard.up || keyboard.down || keyboard.left || keyboard.right) {
        const kbX = (keyboard.right ? 1 : 0) - (keyboard.left ? 1 : 0);
        const kbY = (keyboard.down ? 1 : 0) - (keyboard.up ? 1 : 0);

        // Normalize diagonal movement
        const length = Math.sqrt(kbX * kbX + kbY * kbY);
        if (length > 0) {
            moveX = (kbX / length) * PLAYER_SPEED * speedMultiplier * dt;
            moveY = (kbY / length) * PLAYER_SPEED * speedMultiplier * dt;
            isMoving = true;

            // Update facing direction based on keyboard
            if (kbX !== 0) {
                player.facingRight = kbX > 0;
            }
            player.moving = false; // Cancel click-to-move
            player.targetX = player.x; // Clear old target
            player.targetY = player.y;
        }
    }
    // Mobile: Use joystick input
    else if (isMobile && (joystick.dirX !== 0 || joystick.dirY !== 0)) {
        moveX = joystick.dirX * PLAYER_SPEED * speedMultiplier * dt;
        moveY = joystick.dirY * PLAYER_SPEED * speedMultiplier * dt;
        isMoving = true;

        // Update facing direction based on joystick
        if (joystick.dirX !== 0) {
            player.facingRight = joystick.dirX > 0;
        }
    }
    // Desktop: Use mouse-to-move (continuous while held)
    else if (!isMobile && (mouseHeld || player.moving)) {
        // Continuously update target while mouse is held
        if (mouseHeld) {
            player.targetX = mouseScreenX + cameraX - canvas.width / 2;
            player.targetY = mouseScreenY + cameraY - canvas.height / 2;
            player.moving = true;
            // Update arrow weapon facing angle
            playerFacingAngle = Math.atan2(player.targetY - player.y, player.targetX - player.x);
        }

        const dx = player.targetX - player.x;
        const dy = player.targetY - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 5 && !mouseHeld) {
            player.moving = false;
        } else if (dist >= 5) {
            moveX = (dx / dist) * PLAYER_SPEED * speedMultiplier * dt;
            moveY = (dy / dist) * PLAYER_SPEED * speedMultiplier * dt;
            isMoving = true;

            // Update facing direction
            if (dx !== 0) {
                player.facingRight = dx > 0;
            }
        }
    }

    // Apply movement if any
    if (isMoving) {
        const newX = player.x + moveX;
        const newY = player.y + moveY;

        if (!isPositionBlocked(newX, newY)) {
            // No collision, move normally
            player.x = newX;
            player.y = newY;
        } else {
            // Try wall-sliding: X-only movement
            if (!isPositionBlocked(newX, player.y)) {
                player.x = newX;
            }
            // Try wall-sliding: Y-only movement
            else if (!isPositionBlocked(player.x, newY)) {
                player.y = newY;
            }
            // Completely blocked - don't move
        }

        // Animation
        player.frameTime += dt;
        if (player.frameTime > 0.15) {
            player.frameTime = 0;
            player.frame = (player.frame + 1) % 6;
        }

        // Set direction based on primary movement axis
        const absX = Math.abs(moveX);
        const absY = Math.abs(moveY);
        if (absY > absX) {
            // Vertical movement dominant
            player.direction = moveY < 0 ? 'back' : 'front';
        } else {
            // Horizontal movement dominant
            player.direction = 'side';
            player.facingRight = moveX > 0;
        }

        // Store normalized movement direction for ambush spawns
        const moveMagnitude = Math.sqrt(moveX * moveX + moveY * moveY);
        if (moveMagnitude > 0) {
            playerLastDirX = moveX / moveMagnitude;
            playerLastDirY = moveY / moveMagnitude;
        }
    }

    // Update player.moving flag for animation rendering (needed for joystick)
    player.moving = isMoving;

    // Update camera to follow player with dead zone
    const playerScreenX = player.x - cameraX;
    const playerScreenY = player.y - cameraY;

    if (Math.abs(playerScreenX) > CENTER_DEAD_ZONE) {
        cameraX = player.x - Math.sign(playerScreenX) * CENTER_DEAD_ZONE;
    }
    if (Math.abs(playerScreenY) > CENTER_DEAD_ZONE) {
        cameraY = player.y - Math.sign(playerScreenY) * CENTER_DEAD_ZONE;
    }
}

function updateEnemies(dt) {
    for (const enemy of enemies) {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Check for player collision - only if not invincible
        if (dist < SCALED_TILE * 0.4 && invincibilityTimer <= 0 && damageInvincibilityTimer <= 0) {
            playerLives--;

            if (playerLives <= 0) {
                SFX.gameOver();
                stopMusic();
                gameState = 'gameover';
                showReviveButton = true;
                // Show interstitial ad on game over
                if (bridgeReady && bridge.advertisement.isInterstitialSupported) {
                    bridge.advertisement.showInterstitial('game_over');
                }
                levelDeaths[currentLevel] = (levelDeaths[currentLevel] || 0) + 1;
                saveData('mobholdLevelDeaths', JSON.stringify(levelDeaths));
                // Save high score if current score is higher
                if (score > highScore) {
                    highScore = score;
                    saveData('survivalHighScore', Math.floor(highScore).toString());
                }
                return;
            } else {
                // Player takes damage but survives - trigger invincibility and knockback
                SFX.playerHit();
                damageInvincibilityTimer = DAMAGE_INVINCIBILITY;
                knockbackNearbyEnemies();
            }
        }

        // Skip movement for frozen enemies
        const isFrozen = enemy.statusEffects?.freeze;

        if (dist > 0 && !isFrozen) {
            const speed = ENEMY_BASE_SPEED * enemy.speed;
            const moveX = (dx / dist) * speed * dt;
            const moveY = (dy / dist) * speed * dt;

            const newX = enemy.x + moveX;
            const newY = enemy.y + moveY;

            // Try direct movement first
            if (!isPositionBlocked(newX, newY)) {
                enemy.x = newX;
                enemy.y = newY;
            } else {
                // Try wall-sliding: X-only movement
                if (!isPositionBlocked(newX, enemy.y)) {
                    enemy.x = newX;
                }
                // Try wall-sliding: Y-only movement
                else if (!isPositionBlocked(enemy.x, newY)) {
                    enemy.y = newY;
                }
                // Try perpendicular movement if completely stuck
                else {
                    // Try moving perpendicular to get around obstacle
                    const perpX = enemy.x + (dy / dist) * speed * dt;
                    const perpY = enemy.y - (dx / dist) * speed * dt;
                    if (!isPositionBlocked(perpX, enemy.y)) {
                        enemy.x = perpX;
                    } else if (!isPositionBlocked(enemy.x, perpY)) {
                        enemy.y = perpY;
                    }
                }
            }

            enemy.facingRight = dx > 0;
        }

        // Animation
        enemy.frameTime += dt;
        if (enemy.frameTime > 0.15) {
            enemy.frameTime = 0;
            enemy.frame = (enemy.frame + 1) % 4;
        }
    }
}

function spawnHeartCollectible() {
    // Only spawn if player has less than max lives
    if (playerLives >= MAX_LIVES) return;

    // Spawn 200-400 pixels from player at random angle
    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 200;
    const x = player.x + Math.cos(angle) * distance;
    const y = player.y + Math.sin(angle) * distance;

    // Validate position is not blocked
    if (!isPositionBlocked(x, y)) {
        heartCollectibles.push({
            x: x,
            y: y,
            spawnTime: frameTimestamp
        });
    }
}

function updateHeartCollectibles(dt) {
    // Manage spawn timer
    heartSpawnTimer += dt * 1000;

    if (heartSpawnTimer >= nextHeartSpawnTime) {
        heartSpawnTimer = 0;
        nextHeartSpawnTime = HEART_SPAWN_MIN + Math.random() * (HEART_SPAWN_MAX - HEART_SPAWN_MIN);
        spawnHeartCollectible();
    }

    // Check for pickup and despawn
    const now = frameTimestamp;
    for (let i = heartCollectibles.length - 1; i >= 0; i--) {
        const heart = heartCollectibles[i];

        // Check if player can pick up (distance check)
        const dx = player.x - heart.x;
        const dy = player.y - heart.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < HEART_COLLECT_RADIUS && playerLives < MAX_LIVES) {
            // Collect heart
            SFX.heart();
            playerLives++;
            heartCollectibles.splice(i, 1);
            continue;
        }

        // Check despawn time
        if (now - heart.spawnTime > HEART_DESPAWN_TIME) {
            heartCollectibles.splice(i, 1);
        }
    }
}

function drawHeartCollectibles() {
    const heartImage = images.Heart_full;
    if (!heartImage || !heartImage.complete || heartImage.naturalWidth === 0) return;

    const now = frameTimestamp;
    const heartSize = SCALED_TILE * 1.2;

    for (const heart of heartCollectibles) {
        if (!isInViewport(heart.x, heart.y, heartSize)) continue;
        const age = now - heart.spawnTime;
        const screenX = heart.x - cameraX + canvas.width / 2 - heartSize / 2;
        const screenY = heart.y - cameraY + canvas.height / 2 - heartSize / 2;

        // Bobbing animation
        const bobOffset = Math.sin(now / 200) * 5;

        // Fade/blink effect when about to despawn (last 3 seconds)
        let alpha = 1;
        const timeLeft = HEART_DESPAWN_TIME - age;
        if (timeLeft < 3000) {
            // Blink faster as time runs out
            const blinkSpeed = 100 + (3000 - timeLeft) / 10;
            alpha = 0.4 + Math.abs(Math.sin(now / blinkSpeed)) * 0.6;
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(heartImage, screenX, screenY + bobOffset, heartSize, heartSize);
        ctx.restore();
    }
}

function knockbackNearbyEnemies() {
    for (const enemy of enemies) {
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < KNOCKBACK_RADIUS && dist > 0) {
            // Push enemy away from player, scaled by distance (closer = stronger)
            const force = KNOCKBACK_FORCE * (1 - dist / KNOCKBACK_RADIUS);
            const pushX = (dx / dist) * force;
            const pushY = (dy / dist) * force;

            const newX = enemy.x + pushX;
            const newY = enemy.y + pushY;

            // Only apply knockback if new position is not blocked
            if (!isPositionBlocked(newX, newY)) {
                enemy.x = newX;
                enemy.y = newY;
            } else if (!isPositionBlocked(newX, enemy.y)) {
                enemy.x = newX;
            } else if (!isPositionBlocked(enemy.x, newY)) {
                enemy.y = newY;
            }
        }
    }
}

function updateProjectiles(dt) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const proj = projectiles[i];

        // Handle bomb projectiles
        if (proj.isBomb) {
            // Update fuse timer
            proj.fuseTimer += dt * 1000;

            // Record trail position
            proj.trail.push({ x: proj.x, y: proj.y });
            if (proj.trail.length > TRAIL_LENGTH) proj.trail.shift();

            // Move bomb until it reaches travel distance
            if (proj.distanceTraveled < BOMB_TRAVEL_DISTANCE) {
                const moveX = Math.cos(proj.angle) * PROJECTILE_SPEED * dt;
                const moveY = Math.sin(proj.angle) * PROJECTILE_SPEED * dt;
                proj.x += moveX;
                proj.y += moveY;
                proj.distanceTraveled += Math.sqrt(moveX * moveX + moveY * moveY);
            }

            // Check if bomb should explode
            if (proj.fuseTimer >= proj.fuseTime && !proj.hasExploded) {
                proj.hasExploded = true;
                SFX.bombExplode();

                // Create explosion animation
                explosions.push({
                    x: proj.x,
                    y: proj.y,
                    frame: 0,
                    frameTimer: 0,
                    radius: proj.explodeRadius
                });

                // Deal damage to all enemies within explosion radius
                for (let j = enemies.length - 1; j >= 0; j--) {
                    const enemy = enemies[j];
                    const dx = proj.x - enemy.x;
                    const dy = proj.y - enemy.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < proj.explodeRadius) {
                        enemy.health -= proj.damage;
                        bloodSplatters.push({ x: enemy.x, y: enemy.y, frame: 0, frameTimer: 0 });

                        if (enemy.health <= 0) {
                        registerKill(enemy.x, enemy.y, enemy.type);
                            checkKillStreak();
                            tryDropLoot(enemy.x, enemy.y);
                            SFX.enemyDeath();
                            spawnBloodSplatter(enemy.x, enemy.y, 12);
                            spawnSparkExplosion(enemy.x, enemy.y, 6);
                            removeEnemy(j);
                            checkForUpgrade();
                        }
                    }
                }

                // Deal damage to boss if in range
                if (bossActive && boss) {
                    const bDx = proj.x - boss.x;
                    const bDy = proj.y - boss.y;
                    const bDist = Math.sqrt(bDx * bDx + bDy * bDy);
                    if (bDist < proj.explodeRadius) {
                        damageBoss(proj.damage);
                        spawnSparkExplosion(boss.x, boss.y, 8);
                    }
                }

                // Remove exploded bomb
                projectiles.splice(i, 1);
                continue;
            }
        } else {
            // Record trail position
            proj.trail.push({ x: proj.x, y: proj.y });
            if (proj.trail.length > TRAIL_LENGTH) proj.trail.shift();

            // Normal projectile movement
            proj.x += Math.cos(proj.angle) * PROJECTILE_SPEED * dt;
            proj.y += Math.sin(proj.angle) * PROJECTILE_SPEED * dt;

            // Update shuriken spin
            if (proj.weaponType === 'Shuriken') {
                proj.spinAngle += SHURIKEN_SPIN_SPEED * dt;
            }

            // Remove if off screen
            const screenX = proj.x - cameraX;
            const screenY = proj.y - cameraY;
            if (Math.abs(screenX) > canvas.width || Math.abs(screenY) > canvas.height) {
                projectiles.splice(i, 1);
                continue;
            }

            // Check collision with enemies
            for (let j = enemies.length - 1; j >= 0; j--) {
                const enemy = enemies[j];
                const dx = proj.x - enemy.x;
                const dy = proj.y - enemy.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < SCALED_TILE * 0.5) {
                    // Apply damage
                    enemy.health -= proj.damage;
                    SFX.hit();
                    bloodSplatters.push({ x: enemy.x, y: enemy.y, frame: 0, frameTimer: 0 });
                    projectiles.splice(i, 1);

                    if (enemy.health <= 0) {
                        registerKill(enemy.x, enemy.y, enemy.type);
                        checkKillStreak();
                        tryDropLoot(enemy.x, enemy.y);
                        SFX.enemyDeath();
                        spawnBloodSplatter(enemy.x, enemy.y, 12);
                        spawnSparkExplosion(enemy.x, enemy.y, 6);
                        removeEnemy(j);

                        // Check for upgrade
                        checkForUpgrade();
                    }
                    break;
                }
            }

            // Check collision with boss
            if (bossActive && boss) {
                const bDx = proj.x - boss.x;
                const bDy = proj.y - boss.y;
                const bDist = Math.sqrt(bDx * bDx + bDy * bDy);
                if (bDist < boss.size * 0.5) {
                    damageBoss(proj.damage);
                    spawnSparkExplosion(proj.x, proj.y, 4);
                    projectiles.splice(i, 1);
                }
            }
        }
    }
}

function checkForUpgrade() {
    if (nextUpgradeIndex < UPGRADE_THRESHOLDS.length &&
        score >= UPGRADE_THRESHOLDS[nextUpgradeIndex]) {
        nextUpgradeIndex++;
        SFX.levelUp();
        showUpgradeMenu();
    }
}

function showUpgradeMenu() {
    gameState = 'upgrading';
    upgradeOptions = generateUpgradeOptions();
    selectedUpgradeIndex = -1;
}

function generateUpgradeOptions() {
    const options = [];

    // Get weapons that can be upgraded (not at max level)
    for (const weapon of playerWeapons) {
        const weaponData = weaponsData.find(w => w.type === weapon.type);
        if (weaponData && weapon.level < weaponData.levels.length - 1) {
            options.push({
                type: weapon.type,
                isNew: false,
                currentLevel: weapon.level
            });
        }
    }

    // Get weapons that can be added (not already owned)
    const ownedTypes = playerWeapons.map(w => w.type);
    for (const weaponData of weaponsData) {
        if (!ownedTypes.includes(weaponData.type)) {
            options.push({
                type: weaponData.type,
                isNew: true
            });
        }
    }

    // Get scrolls that can be added (not already owned)
    const ownedScrolls = playerScrolls.map(s => s.type);
    for (const scrollType of SCROLL_TYPES) {
        if (!ownedScrolls.includes(scrollType)) {
            options.push({
                type: scrollType,
                isScroll: true
            });
        }
    }

    // Shuffle and pick up to 3 options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return options.slice(0, 3);
}

function getCurrentSpawnPhase() {
    // If in a level, use level-based enemy spawning with weight inversely proportional to health
    if (levelData && !levelComplete && !levelFailed) {
        const levelProgress = Math.min(1, currentLevel / 150); // 0 at start, 1 at level 150+
        const maxHP = 90; // Cyclopse2 health (halved)
        const rarePenalty = { 'Eye': 0.54, 'Beast': 0.54, 'Eye2': 0.54, 'Beast2': 0.54, 'Reptile': 0.54, 'Cyclopse': 0.54, 'Cyclopse2': 0.54 };
        const enemyWeights = {};
        for (const type of levelData.enemyTypes) {
            const monsterData = monstersData.find(m => m.type === type);
            if (monsterData) {
                const healthRatio = monsterData.health / maxHP;
                let w = 1 / (1 + healthRatio * 3 * (1 - levelProgress));
                if (rarePenalty[type]) w *= rarePenalty[type];
                enemyWeights[type] = w;
            } else {
                enemyWeights[type] = 1.0;
            }
        }
        return {
            startTime: 0,
            enemies: enemyWeights,
            spawnInterval: levelData.spawnInterval
        };
    }

    // Otherwise use spawn phases (endless mode or between levels)
    const timeSeconds = gameTime / 1000;
    let currentPhase = spawnPhasesData[0];

    for (const phase of spawnPhasesData) {
        if (phase.startTime <= timeSeconds) {
            currentPhase = phase;
        } else {
            break;
        }
    }

    return currentPhase;
}

function getAmbushInterval() {
    const timeSeconds = gameTime / 1000;
    const progress = Math.min(1, timeSeconds / 240);
    return AMBUSH_BASE_INTERVAL - (AMBUSH_BASE_INTERVAL - AMBUSH_MIN_INTERVAL) * progress;
}

function selectEnemyFromPhase(enemyWeights) {
    // Calculate total weight
    let totalWeight = 0;
    for (const weight of Object.values(enemyWeights)) {
        totalWeight += weight;
    }

    // Pick a random value in the total weight range
    let randomValue = Math.random() * totalWeight;

    // Find which enemy this falls into
    for (const [enemyType, weight] of Object.entries(enemyWeights)) {
        randomValue -= weight;
        if (randomValue <= 0) {
            // Find the monster data for this type
            const monsterData = monstersData.find(m => m.type === enemyType);
            if (monsterData) {
                return monsterData;
            }
        }
    }

    // Fallback to first enemy type if something goes wrong
    const firstType = Object.keys(enemyWeights)[0];
    return monstersData.find(m => m.type === firstType) || monstersData[0];
}

function spawnEnemy() {
    // Get current spawn phase and select enemy using weighted probability
    const phase = getCurrentSpawnPhase();
    const monsterData = selectEnemyFromPhase(phase.enemies);

    const margin = SCALED_TILE * 2;
    let x, y;
    let attempts = 0;
    const maxAttempts = 10;

    // Try to find a valid spawn position
    do {
        const side = Math.floor(Math.random() * 4);

        switch (side) {
            case 0: // Top
                x = cameraX + (Math.random() - 0.5) * canvas.width;
                y = cameraY - canvas.height / 2 - margin;
                break;
            case 1: // Right
                x = cameraX + canvas.width / 2 + margin;
                y = cameraY + (Math.random() - 0.5) * canvas.height;
                break;
            case 2: // Bottom
                x = cameraX + (Math.random() - 0.5) * canvas.width;
                y = cameraY + canvas.height / 2 + margin;
                break;
            case 3: // Left
                x = cameraX - canvas.width / 2 - margin;
                y = cameraY + (Math.random() - 0.5) * canvas.height;
                break;
        }

        attempts++;
    } while (isPositionBlocked(x, y) && attempts < maxAttempts);

    // Only spawn if we found a valid position
    if (!isPositionBlocked(x, y)) {
        // Create pentagram effect with pending enemy spawn
        pentagramEffects.push({
            x: x,
            y: y,
            timer: 0,
            enemyData: {
                type: monsterData.type,
                health: monsterData.health,
                maxHealth: monsterData.health,
                speed: monsterData.speed,
                frame: 0,
                frameTime: 0,
                facingRight: true
            }
        });
    }
}

function spawnSwarm() {
    // Get current phase but bias toward weaker enemies for swarms
    const phase = getCurrentSpawnPhase();
    const timeSeconds = gameTime / 1000;

    // Create swarm-specific weights that favor weaker enemies
    // Take top 3 enemies by weight from current phase
    const sortedEnemies = Object.entries(phase.enemies)
        .sort((a, b) => b[1] - a[1])  // Sort by weight descending
        .slice(0, 3);  // Take top 3 most common enemies

    const swarmWeights = {};
    for (const [type, weight] of sortedEnemies) {
        swarmWeights[type] = weight;
    }

    // Determine swarm size (increases slightly with game time)
    const baseCount = SWARM_MIN_COUNT + Math.floor(timeSeconds / 60);
    const swarmCount = Math.min(SWARM_MAX_COUNT, baseCount + Math.floor(Math.random() * 5));

    for (let i = 0; i < swarmCount; i++) {
        // Pick enemy using swarm-biased weights
        const monsterData = selectEnemyFromPhase(swarmWeights);

        // Spawn in a ring around the player
        const angle = (Math.PI * 2 * i) / swarmCount + (Math.random() - 0.5) * 0.5;
        const radius = SWARM_SPAWN_RADIUS_MIN + Math.random() * (SWARM_SPAWN_RADIUS_MAX - SWARM_SPAWN_RADIUS_MIN);

        const x = player.x + Math.cos(angle) * radius;
        const y = player.y + Math.sin(angle) * radius;

        // Only spawn if position is valid
        if (!isPositionBlocked(x, y)) {
            // Create pentagram effect with pending enemy spawn
            pentagramEffects.push({
                x: x,
                y: y,
                timer: 0,
                enemyData: {
                    type: monsterData.type,
                    health: monsterData.health,
                    maxHealth: monsterData.health,
                    speed: monsterData.speed,
                    frame: 0,
                    frameTime: 0,
                    facingRight: player.x > x
                }
            });
        }
    }
}

function spawnAmbush() {
    const phase = getCurrentSpawnPhase();
    const monsterData = selectEnemyFromPhase(phase.enemies);

    // Skip if player hasn't moved
    if (playerLastDirX === 0 && playerLastDirY === 0) return;

    const spawnDistance = SCALED_TILE * AMBUSH_DISTANCE_TILES;
    let spawnX = player.x + playerLastDirX * spawnDistance;
    let spawnY = player.y + playerLastDirY * spawnDistance;

    // Try perpendicular offsets if blocked
    let attempts = 0;
    while (isPositionBlocked(spawnX, spawnY) && attempts < 5) {
        const perpX = -playerLastDirY;
        const perpY = playerLastDirX;
        const offset = (attempts % 2 === 0 ? 1 : -1) * Math.ceil((attempts + 1) / 2) * SCALED_TILE;
        spawnX = player.x + playerLastDirX * spawnDistance + perpX * offset;
        spawnY = player.y + playerLastDirY * spawnDistance + perpY * offset;
        attempts++;
    }

    if (!isPositionBlocked(spawnX, spawnY)) {
        pentagramEffects.push({
            x: spawnX, y: spawnY, timer: 0,
            enemyData: {
                type: monsterData.type,
                health: monsterData.health,
                maxHealth: monsterData.health,
                speed: monsterData.speed,
                frame: 0, frameTime: 0,
                facingRight: player.x > spawnX
            }
        });
    }
}

function updateWeapons(dt) {
    for (const weapon of playerWeapons) {
        // Skip cooldown-based weapons (Circlet is persistent)
        if (weapon.type === 'Circlet') continue;

        weapon.cooldownTimer += dt * 1000;

        const weaponData = weaponsData.find(w => w.type === weapon.type);
        if (!weaponData) continue;

        const levelData = weaponData.levels[weapon.level];
        const cooldownMs = (levelData.cooldown || 1) * 1000;

        if (weapon.cooldownTimer >= cooldownMs) {
            weapon.cooldownTimer = 0;
            fireWeapon(weapon.type, levelData);
        }
    }
}

function fireWeapon(type, levelData) {
    switch (type) {
        case 'Arrow':
            fireArrow(levelData);
            break;
        case 'Shuriken':
            fireShuriken(levelData);
            break;
        case 'Kunai':
            fireKunai(levelData);
            break;
        case 'Bomb':
            fireBomb(levelData);
            break;
        // Circlet doesn't fire - it's persistent
    }
}

function fireArrow(levelData) {
    SFX.arrow();
    // Shoot toward last click/touch direction
    projectiles.push({
        x: player.x,
        y: player.y,
        angle: playerFacingAngle,
        damage: levelData.damage,
        weaponType: 'Arrow',
        trail: []
    });
}

function fireShuriken(levelData) {
    SFX.shuriken();
    // Shoot N projectiles in equal angles around player
    const count = levelData.projectiles || 1;
    const angleStep = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
        const angle = i * angleStep;
        projectiles.push({
            x: player.x,
            y: player.y,
            angle: angle,
            spinAngle: 0,
            damage: levelData.damage,
            weaponType: 'Shuriken',
            trail: []
        });
    }
}

function fireKunai(levelData) {
    SFX.kunai();
    // Shoot toward nearest enemy
    if (enemies.length === 0) {
        // No enemies, shoot in facing direction
        projectiles.push({
            x: player.x,
            y: player.y,
            angle: player.facingRight ? 0 : Math.PI,
            damage: levelData.damage,
            weaponType: 'Kunai',
            trail: []
        });
        return;
    }

    let nearestDist = Infinity;
    let nearestEnemy = null;

    for (const enemy of enemies) {
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < nearestDist) {
            nearestDist = dist;
            nearestEnemy = enemy;
        }
    }

    if (nearestEnemy) {
        const angle = Math.atan2(nearestEnemy.y - player.y, nearestEnemy.x - player.x);
        projectiles.push({
            x: player.x,
            y: player.y,
            angle: angle,
            damage: levelData.damage,
            weaponType: 'Kunai',
            trail: []
        });
    }
}

function fireBomb(levelData) {
    SFX.bomb();
    // Throw in random direction
    const angle = Math.random() * Math.PI * 2;

    projectiles.push({
        x: player.x,
        y: player.y,
        angle: angle,
        damage: levelData.damage,
        weaponType: 'Bomb',
        isBomb: true,
        fuseTimer: 0,
        fuseTime: BOMB_FUSE_TIME,
        explodeRadius: BOMB_EXPLODE_RADIUS,
        hasExploded: false,
        distanceTraveled: 0,
        trail: []
    });
}

function updateCirclets() {
    // Get Circlet weapon from playerWeapons
    const CircletWeapon = playerWeapons.find(w => w.type === 'Circlet');
    if (!CircletWeapon) return;

    // Get weapon data for projectile count
    const weaponData = weaponsData.find(w => w.type === 'Circlet');
    if (!weaponData) return;

    const levelData = weaponData.levels[CircletWeapon.level];
    const count = levelData.projectiles || 1;

    // Clear existing Circlets
    orbitingProjectiles = [];
    SFX.circlet();

    // Create N Circlets at equal angles
    const angleStep = (Math.PI * 2) / count;
    for (let i = 0; i < count; i++) {
        const startAngle = i * angleStep;
        orbitingProjectiles.push({
            orbitAngle: startAngle,
            orbitRadius: Circlet_ORBIT_RADIUS,
            orbitSpeed: Circlet_ORBIT_SPEED,
            damage: levelData.damage,
            weaponType: 'Circlet',
            hitCooldowns: {},
            x: player.x + Math.cos(startAngle) * Circlet_ORBIT_RADIUS,
            y: player.y + Math.sin(startAngle) * Circlet_ORBIT_RADIUS,
            trail: []
        });
    }
}

function updateOrbitingProjectiles(dt) {
    for (const proj of orbitingProjectiles) {
        // Record trail position
        proj.trail.push({ x: proj.x, y: proj.y });
        if (proj.trail.length > TRAIL_LENGTH) proj.trail.shift();

        // Update orbit angle
        proj.orbitAngle += proj.orbitSpeed * dt;

        // Update position relative to player
        proj.x = player.x + Math.cos(proj.orbitAngle) * proj.orbitRadius;
        proj.y = player.y + Math.sin(proj.orbitAngle) * proj.orbitRadius;

        // Decrement hit cooldowns
        for (const enemyId in proj.hitCooldowns) {
            proj.hitCooldowns[enemyId] -= dt * 1000;
            if (proj.hitCooldowns[enemyId] <= 0) {
                delete proj.hitCooldowns[enemyId];
            }
        }

        // Check collision with enemies
        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];

            // Skip if enemy is on cooldown for this Circlet (using unique enemy ID)
            if (proj.hitCooldowns[enemy.id]) continue;

            const dx = proj.x - enemy.x;
            const dy = proj.y - enemy.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < SCALED_TILE * 0.5) {
                // Apply damage
                enemy.health -= proj.damage;
                SFX.hit();
                bloodSplatters.push({ x: enemy.x, y: enemy.y, frame: 0, frameTimer: 0 });
                // Add hit cooldown for this enemy
                proj.hitCooldowns[enemy.id] = Circlet_HIT_COOLDOWN;

                if (enemy.health <= 0) {
                    registerKill(enemy.x, enemy.y, enemy.type);
                    checkKillStreak();
                    tryDropLoot(enemy.x, enemy.y);
                    SFX.enemyDeath();
                    spawnBloodSplatter(enemy.x, enemy.y, 12);
                    spawnSparkExplosion(enemy.x, enemy.y, 6);
                    removeEnemy(j);
                    checkForUpgrade();
                }
            }
        }

        // Check collision with boss
        if (bossActive && boss) {
            if (!proj.hitCooldowns['boss']) {
                const bDx = proj.x - boss.x;
                const bDy = proj.y - boss.y;
                const bDist = Math.sqrt(bDx * bDx + bDy * bDy);
                if (bDist < boss.size * 0.5) {
                    damageBoss(proj.damage);
                    spawnSparkExplosion(proj.x, proj.y, 4);
                    proj.hitCooldowns['boss'] = Circlet_HIT_COOLDOWN;
                }
            }
        }
    }
}

function updateExplosions(dt) {
    for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        explosion.frameTimer += dt * 1000;

        if (explosion.frameTimer >= EXPLOSION_FRAME_DURATION) {
            explosion.frameTimer = 0;
            explosion.frame++;

            // Remove explosion when animation completes
            if (explosion.frame >= EXPLOSION_TOTAL_FRAMES) {
                explosions.splice(i, 1);
            }
        }
    }
}

function updateBlood(dt) {
    for (let i = bloodSplatters.length - 1; i >= 0; i--) {
        const blood = bloodSplatters[i];
        blood.frameTimer += dt * 1000;

        if (blood.frameTimer >= BLOOD_FRAME_DURATION) {
            blood.frameTimer = 0;
            blood.frame++;

            // Remove blood when animation completes
            if (blood.frame >= BLOOD_TOTAL_FRAMES) {
                bloodSplatters.splice(i, 1);
            }
        }
    }
}

function updateScrolls(dt) {
    for (const scroll of playerScrolls) {
        if (gameTime >= scroll.nextTriggerTime) {
            triggerScrollEffect(scroll);
            // Schedule next trigger
            const config = SCROLL_CONFIG[scroll.type];
            const newCooldown = config.minInterval + Math.random() * (config.maxInterval - config.minInterval);
            scroll.cooldownStartTime = gameTime;
            scroll.cooldownDuration = newCooldown;
            scroll.nextTriggerTime = gameTime + newCooldown;
        }
    }
}

function triggerScrollEffect(scroll) {
    if (enemies.length === 0) return;

    // Set highlight for UI feedback
    scroll.highlightUntil = gameTime + 400;

    // Select nearest enemy to player
    let targetEnemy = enemies[0];
    let minDist = Infinity;
    for (const enemy of enemies) {
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const dist = dx * dx + dy * dy;
        if (dist < minDist) {
            minDist = dist;
            targetEnemy = enemy;
        }
    }
    const config = SCROLL_CONFIG[scroll.type];

    switch (scroll.type) {
        case 'ScrollThunder':
            // Instant damage
            targetEnemy.health -= config.damage;
            bloodSplatters.push({ x: targetEnemy.x, y: targetEnemy.y, frame: 0, frameTimer: 0 });
            if (targetEnemy.health <= 0) {
                score += targetEnemy.maxHealth;
                const idx = enemies.indexOf(targetEnemy);
                if (idx !== -1) removeEnemy(idx);
                checkForUpgrade();
            }
            break;

        case 'ScrollFire':
            // Apply burn status effect
            if (!targetEnemy.statusEffects) targetEnemy.statusEffects = {};
            targetEnemy.statusEffects.burn = {
                damage: config.burnDamage,
                duration: config.burnDuration,
                tickInterval: config.tickInterval,
                nextTickTime: gameTime + config.tickInterval,
                frame: 0,
                frameTimer: 0
            };
            break;

        case 'ScrollIce':
            // Apply freeze status effect
            if (!targetEnemy.statusEffects) targetEnemy.statusEffects = {};
            targetEnemy.statusEffects.freeze = {
                duration: config.freezeDuration,
                endTime: gameTime + config.freezeDuration
            };
            break;
    }

    // Create visual effect
    const effectType = scroll.type.replace('Scroll', '');
    scrollEffects.push({
        x: targetEnemy.x,
        y: targetEnemy.y,
        type: effectType,
        frame: 0,
        frameTimer: 0,
        targetEnemy: targetEnemy
    });
}

function updateStatusEffects(dt) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        if (!enemy.statusEffects) continue;

        // Process burn
        if (enemy.statusEffects.burn) {
            const burn = enemy.statusEffects.burn;
            burn.duration -= dt * 1000;

            // Animate burn frames (6 frames at ~80ms each)
            burn.frameTimer += dt * 1000;
            if (burn.frameTimer >= 80) {
                burn.frameTimer = 0;
                burn.frame = (burn.frame + 1) % 6;
            }

            if (gameTime >= burn.nextTickTime) {
                enemy.health -= burn.damage;
                burn.nextTickTime = gameTime + burn.tickInterval;
                bloodSplatters.push({ x: enemy.x, y: enemy.y, frame: 0, frameTimer: 0 });

                if (enemy.health <= 0) {
                    registerKill(enemy.x, enemy.y, enemy.type);
                    checkKillStreak();
                    tryDropLoot(enemy.x, enemy.y);
                    SFX.enemyDeath();
                    spawnBloodSplatter(enemy.x, enemy.y, 12);
                    spawnSparkExplosion(enemy.x, enemy.y, 6);
                    removeEnemy(i);
                    checkForUpgrade();
                    continue;
                }
            }

            if (burn.duration <= 0) {
                delete enemy.statusEffects.burn;
            }
        }

        // Process freeze
        if (enemy.statusEffects.freeze) {
            if (gameTime >= enemy.statusEffects.freeze.endTime) {
                delete enemy.statusEffects.freeze;
            }
        }
    }
}

function updateScrollEffects(dt) {
    const EFFECT_FRAME_DURATION = 80; // ms per frame

    for (let i = scrollEffects.length - 1; i >= 0; i--) {
        const effect = scrollEffects[i];
        effect.frameTimer += dt * 1000;

        // Follow the target enemy if it still exists (using Set for O(1) lookup)
        if (effect.targetEnemy && enemySet.has(effect.targetEnemy)) {
            effect.x = effect.targetEnemy.x;
            effect.y = effect.targetEnemy.y;
        }

        if (effect.frameTimer >= EFFECT_FRAME_DURATION) {
            effect.frameTimer = 0;
            effect.frame++;

            // Get frame count for this effect type
            const scrollType = 'Scroll' + effect.type;
            const config = SCROLL_CONFIG[scrollType];
            if (effect.frame >= config.effectFrames) {
                scrollEffects.splice(i, 1);
            }
        }
    }
}

function drawScrollEffects() {
    const effectSize = SCALED_TILE * 2;

    for (const effect of scrollEffects) {
        // Viewport culling - skip offscreen effects
        if (!isInViewport(effect.x, effect.y, effectSize)) continue;

        const scrollType = 'Scroll' + effect.type;
        const config = SCROLL_CONFIG[scrollType];
        const effectImage = images['Effect' + effect.type];
        if (!effectImage || !effectImage.complete || effectImage.naturalWidth === 0) continue;

        const frameWidth = config.frameWidth;
        const frameHeight = effectImage.naturalHeight;

        const screenX = effect.x - cameraX + canvas.width / 2 - effectSize / 2;
        const screenY = effect.y - cameraY + canvas.height / 2 - effectSize / 2;

        ctx.drawImage(
            effectImage,
            effect.frame * frameWidth, 0, frameWidth, frameHeight,
            screenX, screenY, effectSize, effectSize
        );
    }
}

function updatePentagramEffects(dt) {
    const dtMs = dt * 1000;

    for (let i = pentagramEffects.length - 1; i >= 0; i--) {
        const effect = pentagramEffects[i];
        effect.timer += dtMs;

        // Spawn enemy when fade-in completes
        if (effect.enemyData && effect.timer >= PENTAGRAM_FADE_IN) {
            const newEnemy = {
                id: nextEnemyId++,
                x: effect.x,
                y: effect.y,
                ...effect.enemyData
            };
            enemies.push(newEnemy);
            enemySet.add(newEnemy);
            effect.enemyData = null;
        }

        // Remove effect when fully faded out
        if (effect.timer >= PENTAGRAM_FADE_IN + PENTAGRAM_FADE_OUT) {
            pentagramEffects.splice(i, 1);
        }
    }
}

function drawPentagramEffects() {
    const pentagramImage = images['Pentagram'];
    if (!pentagramImage || !pentagramImage.complete || pentagramImage.naturalWidth === 0) return;

    const effectSize = SCALED_TILE * 1.5;

    for (const effect of pentagramEffects) {
        // Viewport culling - skip offscreen effects
        if (!isInViewport(effect.x, effect.y, effectSize)) continue;

        // Calculate opacity based on phase
        let opacity;
        if (effect.timer < PENTAGRAM_FADE_IN) {
            // Fading in
            opacity = effect.timer / PENTAGRAM_FADE_IN;
        } else {
            // Fading out
            const fadeOutProgress = (effect.timer - PENTAGRAM_FADE_IN) / PENTAGRAM_FADE_OUT;
            opacity = 1 - fadeOutProgress;
        }

        const screenX = effect.x - cameraX + canvas.width / 2 - effectSize / 2;
        const screenY = effect.y - cameraY + canvas.height / 2 - effectSize / 2;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
        ctx.drawImage(pentagramImage, screenX, screenY, effectSize, effectSize);
        ctx.restore();
    }
}

function updateSpawnRate(dt) {
    gameTime += dt * 1000;

    // Use level spawn interval when in a level
    if (levelData && !levelComplete && !levelFailed) {
        currentSpawnInterval = levelData.spawnInterval;
    } else {
        swarmTimer += dt * 1000;

        // Get spawn interval from current phase
        const phase = getCurrentSpawnPhase();
        currentSpawnInterval = Math.max(MIN_SPAWN_INTERVAL, phase.spawnInterval);

        // Trigger swarm event periodically (first one delayed, then regular interval)
        const canSpawnSwarm = gameTime - lastAmbushTime >= SPAWN_EVENT_MIN_GAP;
        if (canSpawnSwarm) {
            if (!firstSwarmDone && gameTime >= SWARM_FIRST_DELAY) {
                firstSwarmDone = true;
                swarmTimer = 0;
                lastSwarmTime = gameTime;
                spawnSwarm();
            } else if (firstSwarmDone && swarmTimer >= SWARM_INTERVAL) {
                swarmTimer = 0;
                lastSwarmTime = gameTime;
                spawnSwarm();
            }
        }

        // Trigger ambush spawn
        ambushTimer += dt * 1000;
        const canSpawnAmbush = gameTime - lastSwarmTime >= SPAWN_EVENT_MIN_GAP;
        if (canSpawnAmbush) {
            if (!firstAmbushDone && gameTime >= AMBUSH_FIRST_DELAY) {
                firstAmbushDone = true;
                ambushTimer = 0;
                lastAmbushTime = gameTime;
                spawnAmbush();
            } else if (firstAmbushDone && ambushTimer >= getAmbushInterval()) {
                ambushTimer = 0;
                lastAmbushTime = gameTime;
                spawnAmbush();
            }
        }
    }
}

function restartGame() {
    gameState = 'playing';
    startMusic();
    score = 0;
    gameTime = 0;
    swarmTimer = 0;
    firstSwarmDone = false;
    lastSwarmTime = -SPAWN_EVENT_MIN_GAP;
    ambushTimer = 0;
    firstAmbushDone = false;
    lastAmbushTime = -SPAWN_EVENT_MIN_GAP;
    currentSpawnInterval = spawnPhasesData[0]?.spawnInterval || DEFAULT_SPAWN_INTERVAL;
    nextUpgradeIndex = 0;
    player.x = 0;
    player.y = 0;
    player.targetX = 0;
    player.targetY = 0;
    player.moving = false;
    player.frame = 0;
    playerFacingAngle = 0;
    playerLastDirX = 0;
    playerLastDirY = 1;
    cameraX = 0;
    cameraY = 0;
    enemies = [];
    enemySet.clear();
    nextEnemyId = 0;
    projectiles = [];
    orbitingProjectiles = [];
    explosions = [];
    bloodSplatters = [];
    playerScrolls = [];
    scrollEffects = [];
    pentagramEffects = [];
    spawnTimer = 0;
    speedBoostTimer = 0;
    invincibilityTimer = 0;
    readyTimer = 0;

    // Reset lives system
    playerLives = STARTING_LIVES;
    damageInvincibilityTimer = 0;

    // Reset combo system
    comboCount = 0;
    comboTimer = 0;
    comboMultiplier = 1;
    comboTexts = [];
    comboFlashAlpha = 0;

    // Reset camera effects
    cameraShakeX = 0;
    cameraShakeY = 0;
    cameraShakeIntensity = 0;
    cameraShakeDuration = 0;
    cameraShakeTimer = 0;
    hitstopTimer = 0;
    hitstopActive = false;
    cameraPunchScale = 1.0;
    cameraPunchVelocity = 0;

    // Reset loot system
    lootItems = [];
    playerShieldActive = false;
    playerShieldTimer = 0;
    playerMagnetTimer = 0;
    playerDamageBoostTimer = 0;
    playerSpeedBoostTimer2 = 0;

    // Reset boss system
    bossTimer = 0;
    bossActive = false;
    bossWarning = false;
    bossWarningTimer = 0;
    bossDefeatedCount = 0;
    boss = null;
    bossOrbs = [];

    // Reset kill streak system
    streakCount = 0;
    streakTimer = 0;
    streakAnnouncements = [];
    lastStreakLevel = 0;

    // Reset particle system
    particles = [];

    // Reset level system
    levelKills = 0;
    levelLootCollected = 0;
    levelMaxCombo = 0;
    levelDamageTaken = false;
    levelComplete = false;
    levelFailed = false;
    levelTransitionTimer = 0;
    objectiveProgress = 0;
    levelData = null;
    levelSpecificKills = {};
    levelTimeElapsed = 0;
    levelScoreStart = 0;
    bossKilledThisLevel = false;

    // Reset biome system
    currentBiome = null;
    ambientParticles = [];
    ambientTimer = 0;
    terrainDamageTick = 0;

    // Reset to starting weapon
    playerWeapons = [{
        type: 'Kunai',
        level: 0,
        cooldownTimer: 0
    }];
}

// ============================================
// DRAWING FUNCTIONS FOR NEW SYSTEMS
// ============================================

function drawBoss() {
    if (!bossActive || !boss) return;

    const screenX = boss.x - cameraX + canvas.width / 2;
    const screenY = boss.y - cameraY + canvas.height / 2;
    const halfSize = boss.size / 2;

    // Viewport culling
    if (screenX < -boss.size || screenX > canvas.width + boss.size ||
        screenY < -boss.size || screenY > canvas.height + boss.size) return;

    ctx.save();
    ctx.translate(screenX, screenY);

    // Outer glow (red/orange)
    ctx.globalCompositeOperation = 'lighter';
    const glowSize = boss.size * 1.5;
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);
    glow.addColorStop(0, 'rgba(255, 80, 0, 0.3)');
    glow.addColorStop(0.5, 'rgba(255, 40, 0, 0.1)');
    glow.addColorStop(1, 'rgba(255, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(-glowSize, -glowSize, glowSize * 2, glowSize * 2);
    ctx.globalCompositeOperation = 'source-over';

    // Boss body (dark with red accents)
    const bodyColor = boss.flashTimer > 0 ? '#ffffff' : '#331111';
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
    ctx.fill();

    // Inner red ring
    ctx.strokeStyle = boss.flashTimer > 0 ? '#ffffff' : '#cc2200';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, halfSize * 0.7, 0, Math.PI * 2);
    ctx.stroke();

    // Evil eyes
    ctx.fillStyle = boss.flashTimer > 0 ? '#ffffff' : '#ff0000';
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(-halfSize * 0.25, -halfSize * 0.15, halfSize * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(halfSize * 0.25, -halfSize * 0.15, halfSize * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Crown/horns
    ctx.fillStyle = boss.flashTimer > 0 ? '#ffffff' : '#550000';
    ctx.beginPath();
    ctx.moveTo(-halfSize * 0.5, -halfSize * 0.7);
    ctx.lineTo(-halfSize * 0.3, -halfSize * 1.2);
    ctx.lineTo(-halfSize * 0.1, -halfSize * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(halfSize * 0.1, -halfSize * 0.7);
    ctx.lineTo(halfSize * 0.3, -halfSize * 1.2);
    ctx.lineTo(halfSize * 0.5, -halfSize * 0.7);
    ctx.closePath();
    ctx.fill();

    // Charge warning
    if (boss.phase === 'charging' && boss.chargeTimer > 0) {
        const warnAlpha = 0.3 + Math.sin(boss.chargeTimer * 20) * 0.3;
        ctx.fillStyle = `rgba(255, 0, 0, ${warnAlpha})`;
        ctx.beginPath();
        ctx.arc(0, 0, halfSize * 1.3, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();

    // Health bar at top of screen
    drawBossHealthBar();
}

function drawBossHealthBar() {
    if (!boss) return;

    const barWidth = Math.min(BOSS_HEALTH_BAR_WIDTH, canvas.width * 0.5);
    const barHeight = BOSS_HEALTH_BAR_HEIGHT;
    const x = (canvas.width - barWidth) / 2;
    const y = SAFE_TOP + 30;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x - 2, y - 2, barWidth + 4, barHeight + 4);

    // Health bar background
    ctx.fillStyle = '#333';
    ctx.fillRect(x, y, barWidth, barHeight);

    // Health bar fill
    const healthPct = Math.max(0, boss.health / boss.maxHealth);
    const gradient = ctx.createLinearGradient(x, y, x + barWidth * healthPct, y);
    gradient.addColorStop(0, '#ff2200');
    gradient.addColorStop(0.5, '#ff6600');
    gradient.addColorStop(1, '#ffaa00');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth * healthPct, barHeight);

    // Health text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${Math.min(12, canvas.width * 0.015)}px "Press Start 2P", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`BOSS  ${Math.ceil(boss.health)} / ${boss.maxHealth}`, canvas.width / 2, y + barHeight / 2);
}

function drawBossOrbs() {
    for (const orb of bossOrbs) {
        const screenX = orb.x - cameraX + canvas.width / 2;
        const screenY = orb.y - cameraY + canvas.height / 2;

        if (screenX < -30 || screenX > canvas.width + 30 ||
            screenY < -30 || screenY > canvas.height + 30) continue;

        ctx.save();
        ctx.translate(screenX, screenY);

        // Glow
        ctx.globalCompositeOperation = 'lighter';
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
        glow.addColorStop(0, 'rgba(255, 100, 0, 0.6)');
        glow.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(-20, -20, 40, 40);

        // Core
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#ff4400';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffaa00';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

function drawKillStreak() {
    for (const ann of streakAnnouncements) {
        if (ann.scale <= 0) continue;

        const centerX = canvas.width / 2;
        const centerY = canvas.height * 0.3;
        const bounce = Math.sin(ann.bouncePhase) * 3;

        ctx.save();
        ctx.translate(centerX, centerY + bounce);
        ctx.scale(ann.scale, ann.scale);

        // Glow
        ctx.shadowColor = `hsl(${ann.hue}, 100%, 60%)`;
        ctx.shadowBlur = 30;

        // Outline
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.font = 'bold 12px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeText(ann.text, 0, 0);

        // Fill
        ctx.fillStyle = `hsl(${ann.hue}, 100%, 70%)`;
        ctx.fillText(ann.text, 0, 0);

        // Inner glow
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = `hsl(${ann.hue}, 100%, 90%)`;
        ctx.globalAlpha = 0.3;
        ctx.fillText(ann.text, 0, 0);

        ctx.restore();
    }
}

function drawParticles() {
    ctx.save();
    for (const p of particles) {
        const screenX = p.x - cameraX + canvas.width / 2;
        const screenY = p.y - cameraY + canvas.height / 2;

        // Viewport culling
        if (screenX < -10 || screenX > canvas.width + 10 ||
            screenY < -10 || screenY > canvas.height + 10) continue;

        const alpha = Math.min(1.0, p.life / (p.maxLife * 0.3));
        const size = p.size * (0.5 + 0.5 * (p.life / p.maxLife));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(p.rotation);
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
    }
    ctx.restore();
}

function drawComboText() {
    for (const ct of comboTexts) {
        const progress = ct.timer / ct.maxTimer;
        const alpha = progress < 0.3 ? progress / 0.3 : 1.0;
        const scale = ct.scale * (1.0 + (1.0 - progress) * 0.5);

        // Screen position
        const screenX = ct.x - cameraX + canvas.width / 2;
        const screenY = ct.y - cameraY + canvas.height / 2;

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = alpha;

        // Glow effect
        ctx.shadowColor = `hsl(${ct.hue}, 100%, 60%)`;
        ctx.shadowBlur = 20;

        // Text
        ctx.fillStyle = `hsl(${ct.hue}, 100%, 70%)`;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.font = 'bold 9px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeText(ct.text, 0, 0);
        ctx.fillText(ct.text, 0, 0);

        ctx.restore();
    }
}

function drawComboFlash() {
    if (comboFlashAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = comboFlashAlpha;
    ctx.globalCompositeOperation = 'lighter';

    // Radial gradient from center
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
    );
    gradient.addColorStop(0, 'rgba(255, 200, 50, 0.4)');
    gradient.addColorStop(0.5, 'rgba(255, 100, 20, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 50, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function drawLoot() {
    for (const loot of lootItems) {
        const lootDef = LOOT_TYPES[loot.type];
        if (!lootDef) continue;

        // Viewport culling
        const screenX = loot.x - cameraX + canvas.width / 2;
        const screenY = loot.y - cameraY + canvas.height / 2;
        if (screenX < -60 || screenX > canvas.width + 60 ||
            screenY < -60 || screenY > canvas.height + 60) continue;

        const bob = Math.sin(loot.bobPhase) * 4;
        const glow = 0.5 + Math.sin(loot.glowPhase) * 0.3;
        const size = Math.min(16, canvas.width * 0.02);

        ctx.save();
        ctx.translate(screenX, screenY + bob);

        // Outer glow (additive)
        ctx.globalCompositeOperation = 'lighter';
        const outerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.5);
        outerGlow.addColorStop(0, lootDef.glowColor + `${glow * 0.4})`);
        outerGlow.addColorStop(1, lootDef.glowColor + '0)');
        ctx.fillStyle = outerGlow;
        ctx.fillRect(-size * 2.5, -size * 2.5, size * 5, size * 5);

        // Inner orb
        ctx.globalCompositeOperation = 'source-over';
        const innerGrad = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size);
        innerGrad.addColorStop(0, 'rgba(255,255,255,0.9)');
        innerGrad.addColorStop(0.4, lootDef.color);
        innerGrad.addColorStop(1, 'rgba(0,0,0,0.3)');
        ctx.fillStyle = innerGrad;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Sparkle highlights
        ctx.fillStyle = `rgba(255,255,255,${0.5 + glow * 0.5})`;
        ctx.beginPath();
        ctx.arc(-size * 0.15, -size * 0.15, size * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // Flashing when about to despawn
        if (loot.lifetime < 3.0) {
            const flash = Math.sin(loot.glowPhase * 3) > 0 ? 0.5 : 0;
            ctx.globalAlpha = flash;
            ctx.fillStyle = 'white';
            ctx.fillRect(-size, -size, size * 2, size * 2);
        }

        ctx.restore();
    }
}

// Main game loop
function gameLoop(timestamp) {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
    lastTime = timestamp;

    // Cache Date.now() for this frame to avoid multiple syscalls
    frameTimestamp = Date.now();

    // Poll gamepad every frame (required by Gamepad API)
    pollGamepad();
    handleGamepadButtons();

    // Clear canvas
    ctx.fillStyle = currentBiome ? currentBiome.palette.deep : '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Countdown ready timer
    if (readyTimer > 0) {
        readyTimer -= dt;
    }

    // Camera effects (hitstop, shake, punch)
    const logicUpdated = updateCameraEffects(dt);
    updateCombo(dt);
    updateKillStreak(dt);
    updateParticles(dt);
    updateAmbientParticles(dt);

    if (biomeNameTimer > 0) biomeNameTimer -= dt;

    if (gameState === 'playing' && readyTimer <= 0 && logicUpdated) {
        // Update spawn rate based on game time
        updateSpawnRate(dt);

        // Update spawn timer
        spawnTimer += dt * 1000;

        if (spawnTimer >= currentSpawnInterval) {
            spawnTimer = 0;
            spawnEnemy();
        }

        // Update weapons (independent cooldowns)
        updateWeapons(dt);

        // Update game objects
        updatePlayer(dt);
        if (speedBoostTimer > 0) {
            speedBoostTimer -= dt;
        }
        if (invincibilityTimer > 0) {
            invincibilityTimer -= dt;
        }
        if (damageInvincibilityTimer > 0) {
            damageInvincibilityTimer -= dt;
        }
        if (playerDamageBoostTimer > 0) {
            playerDamageBoostTimer -= dt;
        }
        if (playerSpeedBoostTimer2 > 0) {
            playerSpeedBoostTimer2 -= dt;
        }
        if (playerShieldTimer > 0) {
            playerShieldTimer -= dt;
            if (playerShieldTimer <= 0) playerShieldActive = false;
        }
        if (playerMagnetTimer > 0) {
            playerMagnetTimer -= dt;
        }

        // Terrain damage (lava)
        if (currentBiome && terrainDamageTick > 0) terrainDamageTick -= dt;
        if (currentBiome) {
            const dTile = worldToTile(player.x, player.y);
            const dTileData = getBiomeTileAt(dTile.x, dTile.y, currentBiome);
            if (dTileData.damage && terrainDamageTick <= 0) {
                takeDamage(dTileData.damage);
                terrainDamageTick = 1.0;
            }
        }

        updateEnemies(dt);
        updateProjectiles(dt);
        updateOrbitingProjectiles(dt);
        updateExplosions(dt);
        updateBlood(dt);
        updateScrolls(dt);
        updateStatusEffects(dt);
        updateScrollEffects(dt);
        updatePentagramEffects(dt);
        updateLoot(dt);

        // Level objective update
        updateLevelObjective(dt);

        // Boss system (only in non-level play, or on boss levels)
        const bossAllowedInLevel = !levelData || levelData.hasBoss;
        if (bossAllowedInLevel) {
            bossTimer += dt;
            if (!bossActive && bossTimer >= BOSS_INTERVAL) {
                bossTimer = 0;
                bossWarning = true;
                bossWarningTimer = BOSS_WARN_DURATION;
            }
        }
        if (bossWarning) {
            bossWarningTimer -= dt;
            if (bossWarningTimer <= 0) {
                spawnBoss();
            }
        }
        if (bossActive) {
            updateBoss(dt);
        }
    }

    // Handle level transitions (frozen state)
    if (gameState === 'levelcomplete') {
        levelTransitionTimer -= dt;
        if (levelTransitionTimer <= 0) {
            const nextLevelNum = currentLevel + 1;
            restartGame();
            startLevel(nextLevelNum);
        }
    } else if (gameState === 'levelfailed') {
        levelTransitionTimer -= dt;
        if (levelTransitionTimer <= 0) {
            const retryLevel = currentLevel;
            restartGame();
            startLevel(retryLevel);
        }
    }

    // Apply camera effects to context
    ctx.save();
    ctx.translate(cameraShakeX, cameraShakeY);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(cameraPunchScale, cameraPunchScale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Draw everything
    drawBackground();
    drawProjectileTrails();
    drawProjectiles();
    drawBossOrbs();
    drawExplosions();
    drawBlood();
    drawScrollEffects();
    drawPentagramEffects();
    drawLoot();
    drawEnemies();
    drawBoss();
    drawParticles();
    drawAmbientParticles();
    drawPlayer();
    drawUI();

    ctx.restore();

    // Draw level overlay OUTSIDE camera transform
    drawLevelOverlay();
    drawBiomeName();

    // Draw combo text (outside camera transform)
    drawComboText();
    drawComboFlash();
    drawKillStreak();

    // Boss warning overlay
    if (bossWarning && bossWarningTimer > 0) {
        const warnAlpha = 0.2 + Math.sin(Date.now() / 100) * 0.15;
        ctx.fillStyle = `rgba(255, 0, 0, ${warnAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ff3300';
        ctx.font = `bold ${Math.min(28, canvas.width * 0.035)}px "Press Start 2P", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 20;
        ctx.fillText('⚠ BOSS INCOMING ⚠', canvas.width / 2, canvas.height / 2);
        ctx.shadowBlur = 0;
    }

    if (gameState === 'gameover') {
        drawGameOver();
    } else if (gameState === 'upgrading') {
        drawUpgradeMenu();
    } else if (gameState === 'paused') {
        drawPauseMenu();
    } else if (readyTimer > 0) {
        drawReadyOverlay();
    }

    requestAnimationFrame(gameLoop);
}

// ============================================
// PLAYGAMA BRIDGE SDK INTEGRATION
// ============================================
let bridgeReady = false;

function saveData(key, value) {
    if (bridgeReady) {
        return bridge.storage.set([key], [value]).catch(err => {
            console.warn(`saveData: FAILED key=${key}`, err);
        });
    }
    return Promise.resolve();
}

async function initBridge() {
    try {
        await bridge.initialize();
        bridgeReady = true;

        // Read player language for localization
        const playerLanguage = bridge.platform.language;

        // Audio state events
        bridge.platform.on(bridge.EVENT_NAME.AUDIO_STATE_CHANGED, isEnabled => {
            if (!audioCtx) return;
            if (masterGain) {
                masterGain.gain.value = isEnabled ? 0.5 : 0;
            }
        });

        // Pause state events
        bridge.platform.on(bridge.EVENT_NAME.PAUSE_STATE_CHANGED, isPaused => {
            if (isPaused) {
                if (gameState === 'playing') {
                    gameState = 'paused';
                    stopMusic();
                }
            } else {
                if (gameState === 'paused') {
                    readyTimer = POST_UPGRADE_DELAY;
                    startMusic();
                    gameState = 'playing';
                }
            }
        });

        // Initial audio check
        if (!bridge.platform.isAudioEnabled && audioCtx && masterGain) {
            masterGain.gain.value = 0;
        }
    } catch (error) {
        console.warn('Bridge initialization failed, running in standalone mode:', error);
    }
}

// Start game
async function initGame() {
    await initBridge();
    await loadGameData();
    loadImages(() => {
        restartGame();
        startLevel(maxLevelReached);
        // Send game_ready to platform
        if (bridgeReady) {
            bridge.platform.sendMessage('game_ready');
        }
        requestAnimationFrame(gameLoop);
    });
}

initGame();

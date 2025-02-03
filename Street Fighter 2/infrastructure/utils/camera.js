import { STAGE_PADDING, STAGE_WIDTH } from "../../application/constantsStage.js";

export class Camera {
    constructor(x, y, fighters) {
        this.position = { x, y };
        this.fighters = fighters;
        this.target = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.springConstant = 0.4; // Reduced for less springiness
        this.dampingFactor = 0.85; // Increased for less oscillation
        this.boundarySoftness = 100; // Pixels from edge to start softening
        this.leftBoundaryOffset = 60; // Reduced left boundary offset
        this.snapThreshold = 1; // Snap to target if closer than this value
    }

    update(time, renderer) {
        // Calculate target vertical position
        const minY = Math.min(...this.fighters.map(f => f.position.y));
        this.target.y = -6 + Math.floor(minY / 10);

        // Horizontal movement logic
        const [fighter1, fighter2] = this.fighters;
        const viewportMidX = this.position.x + renderer.canvas.width / 2;
        
        // Calculate target horizontal position
        if (fighter1.position.x > viewportMidX && fighter2.position.x > viewportMidX ||
            fighter1.position.x < viewportMidX && fighter2.position.x < viewportMidX) {
            const averageX = (fighter1.position.x + fighter2.position.x) / 2;
            this.target.x = averageX - (renderer.canvas.width / 2);
        }

        // Calculate deltas for horizontal and vertical movement
        const deltaX = this.target.x - this.position.x;
        const deltaY = this.target.y - this.position.y;

        // Snap to target if very close
        if (Math.abs(deltaX) < this.snapThreshold && Math.abs(deltaY) < this.snapThreshold) {
            this.position.x = this.target.x;
            this.position.y = this.target.y;
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }

        // Apply spring-damper physics for smooth movement
        this.velocity.x += deltaX * this.springConstant * time.secondsPassed;
        this.velocity.y += deltaY * this.springConstant * time.secondsPassed;
        
        this.velocity.x *= this.dampingFactor;
        this.velocity.y *= this.dampingFactor;

        this.position.x += this.velocity.x * time.secondsPassed * 60;
        this.position.y += this.velocity.y * time.secondsPassed * 60;

        // Calculate dynamic boundaries
        const rightBoundary = STAGE_WIDTH * 1.35;
        const maxCameraX = rightBoundary - renderer.canvas.width;
        const boundaryStrength = 0.03; // Reduced for smoother boundary handling

        // Adjusted left boundary with offset
        const leftBoundary = STAGE_PADDING + this.leftBoundaryOffset;

        // Soft boundary constraints with exponential easing
        if (this.position.x < leftBoundary) {
            const overflow = leftBoundary - this.position.x;
            this.position.x += overflow * boundaryStrength;
            this.velocity.x *= 0.8; // Reduce velocity more aggressively
        }

        if (this.position.x > maxCameraX) {
            const overflow = this.position.x - maxCameraX;
            this.position.x -= overflow * boundaryStrength;
            this.velocity.x *= 0.8; // Reduce velocity more aggressively
        }

        // Vertical constraints
        this.position.y = Math.max(0, this.position.y);
        
        // Boundary anticipation
        const boundaryProximity = Math.max(
            (leftBoundary + this.boundarySoftness - this.position.x) / this.boundarySoftness,
            (this.position.x - (maxCameraX - this.boundarySoftness)) / this.boundarySoftness
        );
        
        // Dynamic damping near boundaries
        this.velocity.x *= 1 - Math.max(0, boundaryProximity * 0.2);
    }
}
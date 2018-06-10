export interface CategorySegment {
    gold: number; // show the best time for this split
    name: string;
    pb: number; // show the time from the PB run for this split
}

export interface Segment {
    name: string;
    number: number;
    duration: number;
    gold: boolean;
    skipped: boolean;
    reduced: boolean;
}

export interface RunSettings {
    attempts: number;
    best?: number;
    categoryId?: string;
    categoryName: string;
    completedRuns?: number;
    gameAbbreviation?: string;
    gameId?: string;
    gameName: string;
    offset?: number;
    segments: CategorySegment[];
    unsaved?: boolean;
}

export interface Run {
    category: string;
    game: string;
    startTime: number;
    duration: number;
    segments: Segment[];
}

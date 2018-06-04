export interface CategorySegment {
    name: string;
    gold?: number;
    pb?: number;
}

export interface RunSegment {
    name: string;
    skipped?: boolean;
    time: number;
}

export interface GameSplits {
    best: number;
    category: string;
    completedRuns?: number;
    game: string;
    offset?: number;
    resets?: number;
    segments: CategorySegment[];
    unsaved: boolean;
}

export interface Run {
    category: string;
    game: string;
    totalTime: number;
    segments: RunSegment[];
}

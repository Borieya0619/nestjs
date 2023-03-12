export interface Board {
    id: string;
    title: string;
    description: string;
    status: BoardStatus; //공개글 or 비공개글
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}